import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const outputPath = process.env.ANALYTICAL_SQL_PROFILE_OUTPUT
  ? path.resolve(process.env.ANALYTICAL_SQL_PROFILE_OUTPUT)
  : null;

function elapsedSeconds(startedAt) {
  return Number(process.hrtime.bigint() - startedAt) / 1e9;
}

function logicalBytes(value, seen = new Set()) {
  if (value == null) return 0;
  if (typeof value === "number" || typeof value === "bigint") return 8;
  if (typeof value === "boolean") return 1;
  if (typeof value === "string") return Buffer.byteLength(value);
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    return value.byteLength;
  }
  if (typeof value !== "object" || seen.has(value)) return 0;
  seen.add(value);
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + logicalBytes(item, seen), 0);
  }
  return Object.entries(value).reduce(
    (sum, [key, item]) =>
      sum + Buffer.byteLength(key) + logicalBytes(item, seen),
    0,
  );
}

function unquoteIdentifier(value) {
  return value?.replace(/^[`"[]/, "").replace(/[`"\]]$/, "") ?? "unknown";
}

function classify(sql) {
  const normalized = String(sql).trim().replace(/\s+/g, " ");
  const upper = normalized.toUpperCase();
  const patterns = [
    ["insert", /\b(?:INSERT(?:\s+OR\s+\w+)?|REPLACE)\s+INTO\s+([`"\[]?[\w.]+[`"\]]?)/i],
    ["update", /\bUPDATE\s+([`"\[]?[\w.]+[`"\]]?)/i],
    ["delete", /\bDELETE\s+FROM\s+([`"\[]?[\w.]+[`"\]]?)/i],
    ["select", /\bFROM\s+([`"\[]?[\w.]+[`"\]]?)/i],
    ["ddl", /\bCREATE\s+(?:UNIQUE\s+)?INDEX\s+\S+\s+ON\s+([`"\[]?[\w.]+[`"\]]?)/i],
    ["ddl", /\b(?:CREATE|ALTER|DROP)\s+TABLE(?:\s+IF\s+(?:NOT\s+)?EXISTS)?\s+([`"\[]?[\w.]+[`"\]]?)/i],
  ];
  for (const [statementClass, pattern] of patterns) {
    const match = normalized.match(pattern);
    if (match) {
      return {
        statementClass,
        object: unquoteIdentifier(match[1]),
        normalizedSql: normalized,
      };
    }
  }
  if (upper.startsWith("PRAGMA")) {
    return {
      statementClass: "pragma",
      object: normalized.match(/^PRAGMA\s+([\w.]+)/i)?.[1] ?? "pragma",
      normalizedSql: normalized,
    };
  }
  if (/^(BEGIN|COMMIT|ROLLBACK|SAVEPOINT|RELEASE)\b/i.test(normalized)) {
    return {
      statementClass: "transaction",
      object: normalized.split(" ", 1)[0].toLowerCase(),
      normalizedSql: normalized,
    };
  }
  if (/^(CREATE|ALTER|DROP|VACUUM|REINDEX)\b/i.test(normalized)) {
    return { statementClass: "ddl", object: "multiple-or-unknown", normalizedSql: normalized };
  }
  return { statementClass: "other", object: "unknown", normalizedSql: normalized };
}

function freshAggregate(meta) {
  return {
    statementClass: meta.statementClass,
    object: meta.object,
    prepareCalls: 0,
    prepareWallSeconds: 0,
    executionCalls: 0,
    executionWallSeconds: 0,
    iteratorRows: 0,
    changedRows: 0,
    logicalParameterBytes: 0,
  };
}

const profile = {
  schema: "prescribed-record-analytics/sqlite-statement-profile.v1",
  instrument: "node-sqlite-prototype-preload.v1",
  startedAt: new Date().toISOString(),
  pid: process.pid,
  node: process.version,
  sqlite: process.versions.sqlite,
  command: process.argv,
  aggregate: new Map(),
  exec: {
    calls: 0,
    approximateStatementCount: 0,
    wallSeconds: 0,
    logicalSqlBytes: 0,
  },
};

function aggregateFor(meta) {
  const key = `${meta.statementClass}\0${meta.object}`;
  if (!profile.aggregate.has(key)) {
    profile.aggregate.set(key, freshAggregate(meta));
  }
  return profile.aggregate.get(key);
}

function wrapImmediateMethod(statement, method, aggregate) {
  if (typeof statement[method] !== "function") return;
  const original = statement[method].bind(statement);
  statement[method] = (...parameters) => {
    const startedAt = process.hrtime.bigint();
    const result = original(...parameters);
    const seconds = elapsedSeconds(startedAt);
    aggregate.executionCalls += 1;
    aggregate.executionWallSeconds += seconds;
    aggregate.logicalParameterBytes += logicalBytes(parameters);
    if (method === "run" && Number.isSafeInteger(result?.changes)) {
      aggregate.changedRows += Number(result.changes);
    }
    return result;
  };
}

function wrapIteratorMethod(statement, aggregate) {
  if (typeof statement.iterate !== "function") return;
  const original = statement.iterate.bind(statement);
  statement.iterate = (...parameters) => {
    const iterator = original(...parameters);
    aggregate.executionCalls += 1;
    aggregate.logicalParameterBytes += logicalBytes(parameters);
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const startedAt = process.hrtime.bigint();
        const result = iterator.next();
        aggregate.executionWallSeconds += elapsedSeconds(startedAt);
        if (!result.done) aggregate.iteratorRows += 1;
        return result;
      },
      return(value) {
        return typeof iterator.return === "function"
          ? iterator.return(value)
          : { done: true, value };
      },
    };
  };
}

if (outputPath) {
  const originalPrepare = DatabaseSync.prototype.prepare;
  const originalExec = DatabaseSync.prototype.exec;

  DatabaseSync.prototype.prepare = function profiledPrepare(sql) {
    const meta = classify(sql);
    const aggregate = aggregateFor(meta);
    const startedAt = process.hrtime.bigint();
    const statement = originalPrepare.call(this, sql);
    aggregate.prepareCalls += 1;
    aggregate.prepareWallSeconds += elapsedSeconds(startedAt);
    wrapImmediateMethod(statement, "run", aggregate);
    wrapImmediateMethod(statement, "get", aggregate);
    wrapImmediateMethod(statement, "all", aggregate);
    wrapIteratorMethod(statement, aggregate);
    return statement;
  };

  DatabaseSync.prototype.exec = function profiledExec(sql) {
    const startedAt = process.hrtime.bigint();
    const result = originalExec.call(this, sql);
    profile.exec.calls += 1;
    profile.exec.wallSeconds += elapsedSeconds(startedAt);
    profile.exec.logicalSqlBytes += Buffer.byteLength(String(sql));
    profile.exec.approximateStatementCount += String(sql)
      .split(";")
      .filter((statement) => statement.trim().length > 0).length;
    return result;
  };
}

let written = false;
function writeProfile() {
  if (!outputPath || written) return;
  written = true;
  const completed = {
    ...profile,
    completedAt: new Date().toISOString(),
    aggregate: [...profile.aggregate.values()].sort(
      (left, right) =>
        right.executionWallSeconds - left.executionWallSeconds ||
        left.statementClass.localeCompare(right.statementClass) ||
        left.object.localeCompare(right.object),
    ),
  };
  const partialPath = `${outputPath}.partial-${process.pid}`;
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(partialPath, `${JSON.stringify(completed, null, 2)}\n`);
  renameSync(partialPath, outputPath);
}

process.once("beforeExit", writeProfile);
process.once("exit", writeProfile);

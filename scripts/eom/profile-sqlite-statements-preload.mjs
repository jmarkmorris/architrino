import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const outputPath = process.env.ANALYTICAL_SQL_PROFILE_OUTPUT
  ? path.resolve(process.env.ANALYTICAL_SQL_PROFILE_OUTPUT)
  : null;
const processWallStartedAt = process.hrtime.bigint();
const processCpuStartedAt = process.cpuUsage();
let peakRssBytes = process.memoryUsage.rss();
let firstSqlAtSeconds = null;
let lastSqlAtSeconds = null;
const databaseStates = new WeakMap();
const completedTransactions = [];
const activeTransactions = new Set();
const rssSampler = setInterval(() => {
  peakRssBytes = Math.max(peakRssBytes, process.memoryUsage.rss());
}, 25);
rssSampler.unref();

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
    byClass: new Map(),
  },
};

function markSqlActivity() {
  const seconds = elapsedSeconds(processWallStartedAt);
  if (firstSqlAtSeconds === null) firstSqlAtSeconds = seconds;
  lastSqlAtSeconds = seconds;
}

function aggregateFor(meta) {
  const key = `${meta.statementClass}\0${meta.object}`;
  if (!profile.aggregate.has(key)) {
    profile.aggregate.set(key, freshAggregate(meta));
  }
  return profile.aggregate.get(key);
}

function databaseState(database) {
  if (!databaseStates.has(database)) {
    databaseStates.set(database, { activeTransaction: null });
  }
  return databaseStates.get(database);
}

function beginProfiledTransaction(database, sql) {
  const state = databaseState(database);
  if (state.activeTransaction !== null) return;
  state.activeTransaction = {
    ordinal: completedTransactions.length + 1,
    beginSql: String(sql).trim().replace(/\s+/g, " "),
    startedAtSeconds: elapsedSeconds(processWallStartedAt),
    outcome: null,
    executionCalls: 0,
    changedRows: 0,
    logicalParameterBytes: 0,
    byStatement: new Map(),
  };
  activeTransactions.add(state.activeTransaction);
}

function recordTransactionExecution(database, aggregate, changes, parameterBytes) {
  const transaction = databaseState(database).activeTransaction;
  if (transaction === null) return;
  transaction.executionCalls += 1;
  transaction.changedRows += changes;
  transaction.logicalParameterBytes += parameterBytes;
  const key = `${aggregate.statementClass}\0${aggregate.object}`;
  const current = transaction.byStatement.get(key) ?? {
    statementClass: aggregate.statementClass,
    object: aggregate.object,
    executionCalls: 0,
    changedRows: 0,
    logicalParameterBytes: 0,
  };
  current.executionCalls += 1;
  current.changedRows += changes;
  current.logicalParameterBytes += parameterBytes;
  transaction.byStatement.set(key, current);
}

function finishProfiledTransaction(database, outcome) {
  const state = databaseState(database);
  const transaction = state.activeTransaction;
  if (transaction === null) return;
  transaction.outcome = outcome;
  transaction.endedAtSeconds = elapsedSeconds(processWallStartedAt);
  transaction.wallSeconds =
    transaction.endedAtSeconds - transaction.startedAtSeconds;
  transaction.byStatement = [...transaction.byStatement.values()].sort(
    (left, right) =>
      right.executionCalls - left.executionCalls ||
      left.statementClass.localeCompare(right.statementClass) ||
      left.object.localeCompare(right.object),
  );
  completedTransactions.push(transaction);
  activeTransactions.delete(transaction);
  state.activeTransaction = null;
}

function wrapImmediateMethod(statement, method, aggregate, database) {
  if (typeof statement[method] !== "function") return;
  const original = statement[method].bind(statement);
  statement[method] = (...parameters) => {
    markSqlActivity();
    const startedAt = process.hrtime.bigint();
    const result = original(...parameters);
    const seconds = elapsedSeconds(startedAt);
    markSqlActivity();
    aggregate.executionCalls += 1;
    aggregate.executionWallSeconds += seconds;
    const parameterBytes = logicalBytes(parameters);
    aggregate.logicalParameterBytes += parameterBytes;
    const changes = method === "run" && Number.isSafeInteger(result?.changes)
      ? Number(result.changes)
      : 0;
    aggregate.changedRows += changes;
    recordTransactionExecution(database, aggregate, changes, parameterBytes);
    return result;
  };
}

function wrapIteratorMethod(statement, aggregate, database) {
  if (typeof statement.iterate !== "function") return;
  const original = statement.iterate.bind(statement);
  statement.iterate = (...parameters) => {
    markSqlActivity();
    const iterator = original(...parameters);
    aggregate.executionCalls += 1;
    const parameterBytes = logicalBytes(parameters);
    aggregate.logicalParameterBytes += parameterBytes;
    recordTransactionExecution(database, aggregate, 0, parameterBytes);
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        markSqlActivity();
        const startedAt = process.hrtime.bigint();
        const result = iterator.next();
        aggregate.executionWallSeconds += elapsedSeconds(startedAt);
        markSqlActivity();
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
    markSqlActivity();
    const meta = classify(sql);
    const aggregate = aggregateFor(meta);
    const startedAt = process.hrtime.bigint();
    const statement = originalPrepare.call(this, sql);
    aggregate.prepareCalls += 1;
    aggregate.prepareWallSeconds += elapsedSeconds(startedAt);
    wrapImmediateMethod(statement, "run", aggregate, this);
    wrapImmediateMethod(statement, "get", aggregate, this);
    wrapImmediateMethod(statement, "all", aggregate, this);
    wrapIteratorMethod(statement, aggregate, this);
    return statement;
  };

  DatabaseSync.prototype.exec = function profiledExec(sql) {
    markSqlActivity();
    const meta = classify(sql);
    if (meta.statementClass === "transaction" && meta.object === "begin") {
      beginProfiledTransaction(this, sql);
    }
    const startedAt = process.hrtime.bigint();
    let result;
    try {
      result = originalExec.call(this, sql);
    } catch (error) {
      if (meta.statementClass === "transaction") {
        if (meta.object === "begin") {
          finishProfiledTransaction(this, "begin-failed");
        } else if (meta.object === "commit" ||
                   meta.object === "rollback") {
          finishProfiledTransaction(this, `${meta.object}-failed`);
        }
      }
      throw error;
    }
    const seconds = elapsedSeconds(startedAt);
    if (meta.statementClass === "transaction" &&
        (meta.object === "commit" || meta.object === "rollback")) {
      finishProfiledTransaction(this, meta.object);
    }
    profile.exec.calls += 1;
    profile.exec.wallSeconds += seconds;
    profile.exec.logicalSqlBytes += Buffer.byteLength(String(sql));
    const approximateStatementCount = String(sql)
      .split(";")
      .filter((statement) => statement.trim().length > 0).length;
    profile.exec.approximateStatementCount += approximateStatementCount;
    const key = `${meta.statementClass}\0${meta.object}`;
    const current = profile.exec.byClass.get(key) ?? {
      statementClass: meta.statementClass,
      object: meta.object,
      calls: 0,
      approximateStatementCount: 0,
      wallSeconds: 0,
      logicalSqlBytes: 0,
    };
    current.calls += 1;
    current.approximateStatementCount += approximateStatementCount;
    current.wallSeconds += seconds;
    current.logicalSqlBytes += Buffer.byteLength(String(sql));
    profile.exec.byClass.set(key, current);
    return result;
  };
}

let written = false;
function writeProfile() {
  if (!outputPath || written) return;
  written = true;
  clearInterval(rssSampler);
  peakRssBytes = Math.max(peakRssBytes, process.memoryUsage.rss());
  const processWallSeconds = elapsedSeconds(processWallStartedAt);
  const cpu = process.cpuUsage(processCpuStartedAt);
  const completed = {
    ...profile,
    completedAt: new Date().toISOString(),
    processMeasurements: {
      wallSeconds: processWallSeconds,
      userCpuSeconds: cpu.user / 1_000_000,
      systemCpuSeconds: cpu.system / 1_000_000,
      cpuCoreEquivalent:
        (cpu.user + cpu.system) / 1_000_000 / processWallSeconds,
      peakRssBytes,
      secondsBeforeFirstSql: firstSqlAtSeconds,
      secondsFromFirstToLastSql: firstSqlAtSeconds === null ||
          lastSqlAtSeconds === null
        ? null
        : lastSqlAtSeconds - firstSqlAtSeconds,
      secondsAfterLastSql: lastSqlAtSeconds === null
        ? null
        : processWallSeconds - lastSqlAtSeconds,
      preSqlBoundary:
        "process startup, module loading, and importer preflight before the first profiled SQLite operation",
    },
    aggregate: [...profile.aggregate.values()].sort(
      (left, right) =>
        right.executionWallSeconds - left.executionWallSeconds ||
        left.statementClass.localeCompare(right.statementClass) ||
        left.object.localeCompare(right.object),
    ),
    exec: {
      ...profile.exec,
      byClass: [...profile.exec.byClass.values()].sort(
        (left, right) =>
          right.wallSeconds - left.wallSeconds ||
          left.statementClass.localeCompare(right.statementClass) ||
          left.object.localeCompare(right.object),
      ),
    },
    transactions: {
      completed: completedTransactions,
      incomplete: [...activeTransactions].map((transaction) => ({
        ...transaction,
        byStatement: [...transaction.byStatement.values()],
      })),
    },
  };
  const partialPath = `${outputPath}.partial-${process.pid}`;
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(partialPath, `${JSON.stringify(completed, null, 2)}\n`);
  renameSync(partialPath, outputPath);
}

process.once("beforeExit", writeProfile);
process.once("exit", writeProfile);

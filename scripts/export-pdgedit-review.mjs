#!/usr/bin/env node

import process from "node:process";

import {
  createPdgeditReviewExportUrl,
  exportPdgeditReviewPageWithEdge,
  formatPdgeditReviewExportUsage,
  parsePdgeditReviewExportArgs,
  startPdgeditReviewStaticServer,
} from "./pdgedit/ReviewPageExportRuntime.mjs";

async function main() {
  const options = parsePdgeditReviewExportArgs(process.argv.slice(2));
  if (options.help) {
    console.log(formatPdgeditReviewExportUsage());
    return;
  }

  const staticServer = await startPdgeditReviewStaticServer({
    rootDir: process.cwd(),
    host: options.host,
    port: options.port,
  });

  try {
    console.log(`Serving pdgedit review assets from ${staticServer.origin}`);
    const pageUrl = createPdgeditReviewExportUrl({
      origin: staticServer.origin,
      pagePath: options.pagePath,
      query: options.query,
    });

    if (options.pngOutputPath) {
      console.log(`Exporting PNG to ${options.pngOutputPath}`);
    }
    if (options.pdfOutputPath) {
      console.log(`Exporting PDF to ${options.pdfOutputPath}`);
    }

    await exportPdgeditReviewPageWithEdge({
      browserPath: options.browserPath,
      pageUrl,
      pngOutputPath: options.pngOutputPath,
      pdfOutputPath: options.pdfOutputPath,
      width: options.width,
      height: options.height,
      virtualTimeBudgetMs: options.virtualTimeBudgetMs,
    });

    const generatedOutputs = [
      options.pngOutputPath ? `PNG: ${options.pngOutputPath}` : null,
      options.pdfOutputPath ? `PDF: ${options.pdfOutputPath}` : null,
    ].filter(Boolean);
    console.log(`Exported the JS-rendered pdgedit review page from ${pageUrl}`);
    generatedOutputs.forEach((line) => console.log(line));
  } finally {
    await staticServer.close();
  }
}

main().catch((error) => {
  console.error(String(error?.message || error));
  process.exitCode = 1;
});

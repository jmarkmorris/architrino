#!/usr/bin/env node

import process from "node:process";

import {
  createXyzzyReviewExportUrl,
  exportXyzzyReviewPageWithEdge,
  formatXyzzyReviewExportUsage,
  parseXyzzyReviewExportArgs,
  startXyzzyReviewStaticServer,
} from "./xyzzy/ReviewPageExportRuntime.mjs";

async function main() {
  const options = parseXyzzyReviewExportArgs(process.argv.slice(2));
  if (options.help) {
    console.log(formatXyzzyReviewExportUsage());
    return;
  }

  const staticServer = await startXyzzyReviewStaticServer({
    rootDir: process.cwd(),
    host: options.host,
    port: options.port,
  });

  try {
    console.log(`Serving Xyzzy review assets from ${staticServer.origin}`);
    const pageUrl = createXyzzyReviewExportUrl({
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

    await exportXyzzyReviewPageWithEdge({
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
    console.log(`Exported the JS-rendered Xyzzy review page from ${pageUrl}`);
    generatedOutputs.forEach((line) => console.log(line));
  } finally {
    await staticServer.close();
  }
}

main().catch((error) => {
  console.error(String(error?.message || error));
  process.exitCode = 1;
});

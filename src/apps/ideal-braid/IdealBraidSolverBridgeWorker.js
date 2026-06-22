import { installSolverAppWorkerRuntime } from "../../solver/app/SolverAppWorkerRuntime.mjs";
import { createIdealBraidSolverBridgeOptions } from "./IdealBraidSolverBridgeOptions.js";

const workerScope = globalThis.self ?? globalThis;
const solverBridgeOptions = createIdealBraidSolverBridgeOptions(workerScope);

installSolverAppWorkerRuntime(workerScope, solverBridgeOptions);

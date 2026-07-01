import { installSolverAppWorkerRuntime } from "../../solver/app/SolverAppWorkerRuntime.mjs";
import { createBorgSolverBridgeOptions } from "./BorgSolverBridgeOptions.js";

const workerScope = globalThis.self ?? globalThis;
const solverBridgeOptions = createBorgSolverBridgeOptions(workerScope);

installSolverAppWorkerRuntime(workerScope, solverBridgeOptions);

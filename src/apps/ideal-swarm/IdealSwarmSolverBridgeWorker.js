import { installSolverAppWorkerRuntime } from "../../solver/app/SolverAppWorkerRuntime.mjs";
import { createIdealSwarmSolverBridgeOptions } from "./IdealSwarmSolverBridgeOptions.js";

const workerScope = globalThis.self ?? globalThis;
const solverBridgeOptions = createIdealSwarmSolverBridgeOptions(workerScope);

installSolverAppWorkerRuntime(workerScope, solverBridgeOptions);

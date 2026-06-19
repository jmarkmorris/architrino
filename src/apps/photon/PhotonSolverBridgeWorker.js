import { installSolverAppWorkerRuntime } from "../../solver/app/SolverAppWorkerRuntime.mjs";
import { createPhotonSolverBridgeOptions } from "./PhotonSolverBridgeOptions.js";

const workerScope = globalThis.self ?? globalThis;
const solverBridgeOptions = createPhotonSolverBridgeOptions(workerScope);

installSolverAppWorkerRuntime(workerScope, solverBridgeOptions);

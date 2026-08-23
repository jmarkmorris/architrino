import {
  evaluatePrescribedRecordAnalysis,
} from "../../src/prescribed-path-analysis/index.mjs";

// Report-grade prescribed-path diagnostic for the F6b balanced tetrahedral
// edge partition. This does not evolve a path, invoke the EOM solver, or
// establish binding, retention, stability, or particle identity.

const TWO_PI = 2 * Math.PI;
const rho = 0.3;
const h = 0.3;
const axes = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
].map((v) => v.map((x) => x / Math.sqrt(3)));
const signs = [-1, -1, 1, 1];
const phases = [0, Math.PI, 4 * Math.PI / 3, Math.PI / 3];

function vec(a) { return { x: a[0], y: a[1], z: a[2] }; }
function scale(a, s) { return a.map((x) => x * s); }
function sub(a, b) { return { x: a.x-b.x, y: a.y-b.y, z: a.z-b.z }; }
function add(a, b) { return { x: a.x+b.x, y: a.y+b.y, z: a.z+b.z }; }
function mul(a, s) { return { x: a.x*s, y: a.y*s, z: a.z*s }; }
function dot(a, b) { return a.x*b.x+a.y*b.y+a.z*b.z; }
function norm(a) { return Math.sqrt(dot(a,a)); }
function cross(a, b) {
  return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
}
function unit(a) { const n=Math.hypot(...a); return a.map((x)=>x/n); }
function applyMatrix(matrix, vector) {
  return {
    x:matrix[0][0]*vector.x+matrix[0][1]*vector.y+matrix[0][2]*vector.z,
    y:matrix[1][0]*vector.x+matrix[1][1]*vector.y+matrix[1][2]*vector.z,
    z:matrix[2][0]*vector.x+matrix[2][1]*vector.y+matrix[2][2]*vector.z,
  };
}

// The combined spatial/relabeling generator maps module
// 0 -> 3 -> 1 -> 2 -> 0 while preserving each polarity sector.
// It is an improper orthogonal transformation with determinant -1 and order 4.
const cyclicSymmetryGenerator = [
  [-1,0,0],
  [0,0,-1],
  [0,1,0],
];
const cyclicModulePermutation = [3,2,0,1];

const sources = [];
const centers = new Map();
const axesById = new Map();
const signedAxesById = new Map();
for (let i=0; i<4; i++) {
  const n = axes[i];
  const u = unit(cross([0,0,1], n));
  const v = cross(n, u);
  for (const polarity of [1,-1]) {
    const id = `${i}${polarity > 0 ? "+" : "-"}`;
    const center = vec(scale(n, polarity*h));
    centers.set(id, center);
    axesById.set(id, vec(n));
    signedAxesById.set(id, mul(vec(n),polarity));
    sources.push({
      id,
      charge: polarity,
      trajectory: {
        kind: "moving-circular.v1",
        epochTime: 0,
        centerAtEpoch: center,
        centerVelocity: {x:0,y:0,z:0},
        radiusU: vec(scale(u, rho)),
        radiusV: vec(scale(v, rho)),
        angularVelocity: polarity * signs[i],
        angularAcceleration: 0,
        phaseAtEpoch: phases[i],
      },
    });
  }
}

const sampleCount = 128;
const observationTimes = Array.from({length:sampleCount}, (_,i)=>i*TWO_PI/sampleCount);
const probes = sources.map((source)=>({
  id:`receiver-${source.id}`,
  kind:"prescribed-source-endpoint-probe.v1",
  transmitterId:source.id,
  selfHitPolicy:"exclude-same-transmitter-id.v1",
  observationTimes,
  polarities:[source.charge],
}));
const sourceRecord = {
  schema:"prescribed-path-analysis/exact-source-record.v1",
  recordId:"f6b-balanced-tetrahedral-edge-partition-h-rho-0p3-v1",
  engineId:"prescribed-geometry",
  claimGrade:"guessed-prescribed-geometry",
  evidenceStatus:"diagnostic-only",
  history:{start:-1,end:TWO_PI},
  sources,
};
const protocol = {
  schema:"prescribed-path-analysis/analysis-protocol.v1",
  protocolId:"f6b-root-ledger-128x256-v1",
  fieldSpeed:1,
  polarityMagnitude:1,
  coupling:1,
  history:{start:-1,end:TWO_PI,minimumDelay:1e-10},
  returnWindow:{start:0,period:TWO_PI},
  rootPolicy:{id:"all-retained-simple-roots/sub-field-speed-certified.v1",tolerance:1e-12,maxIterations:128},
  tolerances:{cancellationFloor:1e-30,rootTransversalityFloor:0.69,minimumSeparationFloor:1e-4,convergenceAbsolute:1e-9},
  geometry:{minimumSeparationSamples:2048},
  convergence:{rootTolerance:1e-14,maxIterations:192,minimumSeparationSamples:4096},
  probes,
};

const packet = evaluatePrescribedRecordAnalysis({sourceRecord,protocol});
const events = packet.rawLedgers.causalRoots;
const rows = [];
for (const event of events) {
  const id = event.receiverSourceId;
  const state = event.probePosition;
  const center = centers.get(id);
  const radialOffset = sub(state, center);
  const prescribed = mul(radialOffset, -1);
  const evaluated = event.measures.probeResponses[0].acceleration;
  rows.push({
    id,
    polarity:id.endsWith("+")?1:-1,
    time:event.observationTime,
    position:state,
    velocity:event.probeVelocity,
    evaluated,
    prescribed,
    radialUnit:mul(radialOffset,1/rho),
    tangentUnit:mul(event.probeVelocity,1/norm(event.probeVelocity)),
    axialUnit:axesById.get(id),
    signedAxialUnit:signedAxesById.get(id),
  });
}
const lambdaNumerator = rows.reduce((s,r)=>s+dot(r.evaluated,r.prescribed),0);
const lambdaDenominator = rows.reduce((s,r)=>s+dot(r.evaluated,r.evaluated),0);
const bestLambda = lambdaNumerator/lambdaDenominator;
const positiveLambda = Math.max(0,bestLambda);
function residualStats(lambda) {
  const values=rows.map((r)=>norm(sub(mul(r.evaluated,lambda),r.prescribed)));
  return {peak:Math.max(...values),rms:Math.sqrt(values.reduce((s,x)=>s+x*x,0)/values.length)};
}
const alignments=rows.map((r)=>dot(r.evaluated,r.prescribed)/(norm(r.evaluated)*norm(r.prescribed)));
const componentRows=rows.map((r)=>{
  const residual=sub(mul(r.evaluated,positiveLambda),r.prescribed);
  return {
    radial:dot(residual,r.radialUnit),
    tangential:dot(residual,r.tangentUnit),
    axial:dot(residual,r.axialUnit),
  };
});
function componentStats(key) {
  const values=componentRows.map((row)=>row[key]);
  return {
    rms:Math.sqrt(values.reduce((sum,value)=>sum+value*value,0)/values.length),
    peakAbsolute:Math.max(...values.map(Math.abs)),
  };
}
const roots=events.flatMap((e)=>e.roots);
const channelSamples=new Map();
for (const event of events) {
  const receiverId=event.receiverSourceId;
  const radialUnit=mul(sub(event.probePosition,centers.get(receiverId)),1/rho);
  const tangentUnit=mul(event.probeVelocity,1/norm(event.probeVelocity));
  const axialUnit=axesById.get(receiverId);
  for (const root of event.roots) {
    const key=`${receiverId}<-${root.transmitterId}`;
    const acceleration=root.probeAccelerationContributions[0].acceleration;
    const samples=channelSamples.get(key) ?? [];
    samples.push({
      magnitude:norm(acceleration),
      radial:dot(acceleration,radialUnit),
      tangential:dot(acceleration,tangentUnit),
      axial:dot(acceleration,axialUnit),
    });
    channelSamples.set(key,samples);
  }
}
const dominantChannels=[...channelSamples].map(([channel,samples])=>{
  const rms=(key)=>Math.sqrt(samples.reduce((sum,row)=>sum+row[key]*row[key],0)/samples.length);
  return {
    channel,
    magnitudeRms:rms("magnitude"),
    radialMean:samples.reduce((sum,row)=>sum+row.radial,0)/samples.length,
    radialRms:rms("radial"),
    tangentialRms:rms("tangential"),
    axialRms:rms("axial"),
  };
}).sort((left,right)=>right.magnitudeRms-left.magnitudeRms);
const collectiveProjectionRows=[];
let collectiveNormalSquared=0;
let collectiveTotalSquared=0;
for (const time of observationTimes) {
  const at=rows.filter((row)=>row.time===time);
  const projection={
    axial:at.map((row)=>dot(row.evaluated,row.signedAxialUnit)),
    radial:at.map((row)=>dot(row.evaluated,row.radialUnit)),
    phase:at.map((row)=>dot(row.evaluated,row.tangentUnit)),
  };
  const stats={time};
  for (const [key,values] of Object.entries(projection)) {
    const mean=values.reduce((sum,value)=>sum+value,0)/values.length;
    stats[key]={
      mean,
      spread:Math.max(...values)-Math.min(...values),
      dispersion:Math.sqrt(values.reduce((sum,value)=>sum+(value-mean)**2,0)/values.length),
    };
  }
  for (let index=0;index<at.length;index++) {
    const tangentAcceleration=add(
      add(
        mul(at[index].signedAxialUnit,stats.axial.mean),
        mul(at[index].radialUnit,stats.radial.mean),
      ),
      mul(at[index].tangentUnit,stats.phase.mean),
    );
    collectiveNormalSquared+=dot(
      sub(at[index].evaluated,tangentAcceleration),
      sub(at[index].evaluated,tangentAcceleration),
    );
    collectiveTotalSquared+=dot(at[index].evaluated,at[index].evaluated);
  }
  collectiveProjectionRows.push(stats);
}
function collectiveProjectionStats(key) {
  return {
    peakSpread:Math.max(...collectiveProjectionRows.map((row)=>row[key].spread)),
    rmsDispersion:Math.sqrt(collectiveProjectionRows.reduce(
      (sum,row)=>sum+row[key].dispersion**2,0,
    )/collectiveProjectionRows.length),
  };
}
const sectorCompatibility={
  axial:{peakSpread:0,dispersionSquaredSum:0,count:0},
  radial:{peakSpread:0,dispersionSquaredSum:0,count:0},
  phase:{peakSpread:0,dispersionSquaredSum:0,count:0},
};
const sectorCoordinateSeries={
  positive:{axial:[],radial:[],phase:[]},
  negative:{axial:[],radial:[],phase:[]},
};
let sectorNormalSquared=0;
let sectorTotalSquared=0;
for (const time of observationTimes) {
  for (const polarity of [1,-1]) {
    const at=rows.filter((row)=>row.time===time&&row.polarity===polarity);
    const definitions={
      axial:(row)=>dot(row.evaluated,row.signedAxialUnit),
      radial:(row)=>dot(row.evaluated,row.radialUnit),
      phase:(row)=>dot(row.evaluated,row.tangentUnit),
    };
    const means={};
    for (const [key,project] of Object.entries(definitions)) {
      const values=at.map(project);
      const mean=values.reduce((sum,value)=>sum+value,0)/values.length;
      const dispersionSquared=values.reduce(
        (sum,value)=>sum+(value-mean)**2,0,
      )/values.length;
      means[key]=mean;
      sectorCoordinateSeries[polarity===1?"positive":"negative"][key].push(mean);
      sectorCompatibility[key].peakSpread=Math.max(
        sectorCompatibility[key].peakSpread,
        Math.max(...values)-Math.min(...values),
      );
      sectorCompatibility[key].dispersionSquaredSum+=dispersionSquared;
      sectorCompatibility[key].count+=1;
    }
    for (const row of at) {
      const tangentAcceleration=add(
        add(
          mul(row.signedAxialUnit,means.axial),
          mul(row.radialUnit,means.radial),
        ),
        mul(row.tangentUnit,means.phase),
      );
      const normal=sub(row.evaluated,tangentAcceleration);
      sectorNormalSquared+=dot(normal,normal);
      sectorTotalSquared+=dot(row.evaluated,row.evaluated);
    }
  }
}
const sectorCompatibilitySummary=Object.fromEntries(
  Object.entries(sectorCompatibility).map(([key,value])=>[key,{
    peakSpread:value.peakSpread,
    rmsDispersion:Math.sqrt(value.dispersionSquaredSum/value.count),
  }]),
);
function harmonicSummary(values) {
  const harmonics=[];
  for (let harmonic=0;harmonic<=8;harmonic++) {
    let real=0;
    let imaginary=0;
    for (let index=0;index<values.length;index++) {
      const angle=2*Math.PI*harmonic*index/values.length;
      real+=values[index]*Math.cos(angle);
      imaginary-=values[index]*Math.sin(angle);
    }
    real/=values.length;
    imaginary/=values.length;
    harmonics.push({
      harmonic,
      amplitude:(harmonic===0?1:2)*Math.hypot(real,imaginary),
      phaseRadians:Math.atan2(imaginary,real),
    });
  }
  return {
    initialValue:values[0],
    signedMean:values.reduce((sum,value)=>sum+value,0)/values.length,
    rms:Math.sqrt(values.reduce((sum,value)=>sum+value*value,0)/values.length),
    minimum:Math.min(...values),
    maximum:Math.max(...values),
    leadingHarmonics:harmonics.slice(1).sort(
      (left,right)=>right.amplitude-left.amplitude,
    ).slice(0,4),
  };
}
const sectorHarmonicSummary=Object.fromEntries(
  Object.entries(sectorCoordinateSeries).map(([sector,components])=>[
    sector,
    Object.fromEntries(Object.entries(components).map(
      ([component,values])=>[component,harmonicSummary(values)],
    )),
  ]),
);
const sumByTime=[];
for (const time of observationTimes) {
  const at=rows.filter((r)=>r.time===time);
  sumByTime.push(at.reduce((s,r)=>add(s,r.evaluated),{x:0,y:0,z:0}));
}
const memberPeaks={};
for (const source of sources) {
  memberPeaks[source.id]=Math.max(...rows.filter((r)=>r.id===source.id).map((r)=>norm(sub(mul(r.evaluated,positiveLambda),r.prescribed))));
}
const values=(key)=>roots.map((r)=>r[key]);
const range=(xs)=>[Math.min(...xs),Math.max(...xs)];
const rowByTimeAndId=new Map(rows.map((row)=>[`${row.time}|${row.id}`,row]));
const cyclicSymmetryResidual={position:0,velocity:0,acceleration:0};
for (const row of rows) {
  const moduleIndex=Number.parseInt(row.id,10);
  const targetId=`${cyclicModulePermutation[moduleIndex]}${row.polarity>0?"+":"-"}`;
  const target=rowByTimeAndId.get(`${row.time}|${targetId}`);
  cyclicSymmetryResidual.position=Math.max(
    cyclicSymmetryResidual.position,
    norm(sub(applyMatrix(cyclicSymmetryGenerator,row.position),target.position)),
  );
  cyclicSymmetryResidual.velocity=Math.max(
    cyclicSymmetryResidual.velocity,
    norm(sub(applyMatrix(cyclicSymmetryGenerator,row.velocity),target.velocity)),
  );
  cyclicSymmetryResidual.acceleration=Math.max(
    cyclicSymmetryResidual.acceleration,
    norm(sub(applyMatrix(cyclicSymmetryGenerator,row.evaluated),target.evaluated)),
  );
}
console.log(JSON.stringify({
  claimGrade:"measured-report-grade-prescribed-path-diagnostic",
  excludedClaims:["ordinary-evolution","binding","retention","stability","particle-identity"],
  fieldSpeed:1,
  polarityMagnitude:protocol.polarityMagnitude,
  geometry:{h,rho,omega:1,sampleCount},
  sourceHash:packet.source.sourceHash,
  protocolHash:packet.protocolHash,
  resultHash:packet.resultHash,
  status:packet.status,
  validity:packet.reducedMeasures.validity,
  eventCount:events.length,
  rootsPerEvent:range(events.map((e)=>e.rootCount)),
  totalRootRows:roots.length,
  rootDistanceRange:range(values("distance")),
  delayRange:range(values("delay")),
  DtRange:range(values("transmitterSideFactorDt")),
  DrRange:range(values("receiverSideFactorDr")),
  accelerationWeightRange:range(values("accelerationWeight")),
  maximumRootResidual:Math.max(...values("residual").map(Math.abs)),
  sampledSeparation:packet.reducedMeasures.minimumSeparation,
  rawCouplingOneResidual:residualStats(1),
  unconstrainedBestCommonCoupling:bestLambda,
  positiveBestCommonCoupling:positiveLambda,
  bestPositiveCommonCouplingResidual:residualStats(positiveLambda),
  directionAlignmentRange:range(alignments),
  meanDirectionAlignment:alignments.reduce((s,x)=>s+x,0)/alignments.length,
  bestPositiveCommonCouplingResidualComponents:{
    radial:componentStats("radial"),
    tangential:componentStats("tangential"),
    axial:componentStats("axial"),
  },
  dominantUnitCouplingChannels:dominantChannels.slice(0,16),
  commonBreathingCoordinateCompatibility:{
    axial:collectiveProjectionStats("axial"),
    radial:collectiveProjectionStats("radial"),
    phase:collectiveProjectionStats("phase"),
    vectorFieldNormalFraction:Math.sqrt(collectiveNormalSquared/collectiveTotalSquared),
  },
  polarityResolvedBreathingCoordinateCompatibility:{
    ...sectorCompatibilitySummary,
    vectorFieldNormalFraction:Math.sqrt(sectorNormalSquared/sectorTotalSquared),
  },
  polarityResolvedCoordinateHarmonics:sectorHarmonicSummary,
  cyclicImproperSymmetry:{
    generator:cyclicSymmetryGenerator,
    determinant:-1,
    order:4,
    modulePermutation:cyclicModulePermutation,
    maximumResidual:cyclicSymmetryResidual,
  },
  peakSummedEvaluatedAcceleration:Math.max(...sumByTime.map(norm)),
  memberPeakResidualAtBestPositiveCoupling:memberPeaks,
},null,2));

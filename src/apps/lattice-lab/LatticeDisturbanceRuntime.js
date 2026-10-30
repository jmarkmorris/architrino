import { createEomV2HttpClient } from '../shared/EomV2HttpClient.js';
import { createStandaloneAppNavigationRuntime } from '../navigator/StandaloneAppNavigationRuntime.js';
import { createLatticeDisturbanceExperiment, validateLatticePatchRecord, LATTICE_PATCH_RECORD_SCHEMA, LATTICE_PATCH_RECORD_LIMIT } from './LatticeDisturbanceExperiment.js';
import { createLatticeDisturbanceViewer } from './LatticeDisturbanceViewer.js';

export function mountLatticeDisturbance() {
  const $ = id => document.getElementById(`disturbance-${id}`);
  const client = createEomV2HttpClient();
  const navigation = createStandaloneAppNavigationRuntime({ host: $('navigation') }).init();
  let viewer, request, settings, inspection, record, busy = false, dirty = false, controller, playing = false, frame, time = 0, playStart = 0;
  const saved = [];
  const importedRecords = new WeakSet();
  try { viewer = createLatticeDisturbanceViewer($('viewer')); } catch (error) { $('viewer').textContent = 'The 3D view needs WebGL. ' + error.message; }
  const message = text => $('message').textContent = text;
  function stopPlayback() { playing = false; cancelAnimationFrame(frame); $('play').textContent = 'Play accepted motion'; }
  function controls() {
    $('fields').disabled = busy;
    $('prepare').disabled = busy; $('inspect').disabled = busy || dirty || !request;
    $('calculate').disabled = busy || dirty || !inspection || !!record;
    $('stop').disabled = !busy || !controller;
    $('export').disabled = !record; $('import').disabled = busy; $('saved').disabled = busy;
    const hasMotion = record && Number(record.result.acceptedCoverage.end) > 0;
    $('play').disabled = !hasMotion; $('timeline').disabled = !hasMotion;
  }
  function values() { return { side: Number($('side').value), amplitude: $('amplitude').value.trim(), axis: $('axis').value, duration: $('duration').value.trim() }; }
  function showPreparation() {
    const positive = request.paths.filter(p => p.charge === '1').length;
    $('population').textContent = `${request.paths.length} moving members · ${positive} positrinos, ${request.paths.length - positive} electrinos`;
    $('past').textContent = `All members held at their displayed positions from T=${request.paths[0].history.segments[0].start} to 0; zero initial velocity. Release at T=0.`;
    $('request').textContent = JSON.stringify(request, null, 2);
    $('time').textContent = 'T = 0 · prepared positions';
    $('metrics').textContent = 'No future motion calculated.';
    $('timeline').min = '0'; $('timeline').max = request.interval.end; $('timeline').value = '0';
    $('coverage').textContent = 'Preparation only'; $('model').textContent = 'Canonical Master Equation · g = 16 · wake speed = 1 · no surface constraint';
    $('raw').replaceChildren(); viewer?.setPreparation(request);
  }
  function prepare() {
    if (busy) return;
    try {
      const nextSettings = values(), next = createLatticeDisturbanceExperiment(nextSettings);
      stopPlayback(); settings = nextSettings; request = next; inspection = null; record = null; dirty = false; time = 0;
      $('saved').value = ''; showPreparation(); message('Prepared finite patch. Inspect the solver, then calculate its future.');
    } catch (error) { dirty = true; inspection = null; message(error.message); }
    controls();
  }
  function serviceError(error) {
    if (error?.retainedFailure?.recordId) showRaw(error.retainedFailure.recordId);
    if (error?.name === 'TypeError' || /JSON|404|HTTP|fetch|capabilit/i.test(error.message)) return 'The EOM service is unavailable at this address. Live calculation needs the local EOM server; imported run files can be replayed here. ' + error.message;
    return error.message;
  }
  function showRaw(id) {
    $('raw').replaceChildren();
    const link = document.createElement('a'); link.textContent = 'Download complete EOM evidence from this solver host'; link.href = `/api/eom/v2/records/${encodeURIComponent(id)}/raw`; $('raw').append(link);
  }
  function displayTime(next) {
    time = next; $('timeline').value = String(time); $('time').textContent = `T = ${time.toFixed(6)}`;
    const m = viewer?.setTime(time);
    if (m) $('metrics').textContent = `Displayed maximum motion since release: ${m.displacement.toExponential(3)} · maximum speed: ${m.speed.toExponential(3)}. Recorded error bound (largest position/velocity component): ${m.uncertainty.toExponential(2)}.`;
  }
  function loadRecord(next, imported = importedRecords.has(next)) {
    validateLatticePatchRecord(next); stopPlayback(); record = next; request = next.request; settings = next.settings; inspection = null; dirty = false;
    for (const key of ['side', 'amplitude', 'axis', 'duration']) $(key).value = String(settings[key]);
    showPreparation(); viewer?.setRecord(next);
    const end = Number(next.result.acceptedCoverage.end); $('timeline').max = String(end);
    $('coverage').textContent = `Accepted coverage: 0 to ${end} of ${request.interval.end} requested · ${next.result.status}`;
    $('model').textContent = `Canonical Master Equation · g = 16 · wake speed = 1 · model ${next.result.modelDigest.slice(0, 12)}`;
    if (next.result.record?.artifact?.id && !imported) showRaw(next.result.record.artifact.id);
    else if (imported) $('raw').textContent = 'Complete raw evidence remains on the original solver host.';
    displayTime(end);
    const halt = next.result.halt?.reason ?? next.result.halt?.code ?? next.result.stopReason ?? '';
    message(`${imported ? 'Imported producer record; its mathematical correctness is not re-certified by this viewer.' : 'Experimental EOM result; independent trajectory certification remains open.'} ${next.result.status === 'completed' ? '' : `Calculation stopped. ${halt} Only the accepted prefix is shown.`}`);
    controls();
  }
  function remember(next) {
    if (saved.reduce((n, r) => n + new TextEncoder().encode(JSON.stringify(r)).length, 0) + new TextEncoder().encode(JSON.stringify(next)).length > 32 * 1024 * 1024) throw new Error('Saved playback limit reached. Export your runs and reload before another calculation. Complete EOM evidence remains on its host.');
    saved.push(next); const option = document.createElement('option'); option.value = String(saved.length - 1); option.textContent = `${next.settings.side}³ · displacement ${next.settings.amplitude} · T=${next.result.acceptedCoverage.end}`; $('saved').append(option); $('saved').value = option.value;
  }
  $('prepare').onclick = prepare;
  $('fields').addEventListener('input', () => { if (!busy) { dirty = true; inspection = null; stopPlayback(); message('Settings changed. Prepare the patch before inspecting or calculating.'); controls(); } });
  $('inspect').onclick = async () => {
    if (busy || dirty) return; busy = true; inspection = null; controls(); message('Inspecting the preparation and equation on the EOM host…');
    try { inspection = await client.inspect(request); $('model').textContent = `Inspected ${inspection.resolvedModel?.compositionId ?? 'canonical model'} · ${inspection.modelDigest}`; message('Solver inspection returned. Calculate advances the finite patch; inspection alone establishes no motion.'); }
    catch (error) { message(serviceError(error)); }
    finally { busy = false; controls(); }
  };
  $('calculate').onclick = async () => {
    if (busy || dirty || !inspection || record) return;
    if (saved.reduce((n, r) => n + new TextEncoder().encode(JSON.stringify(r)).length, 0) > 20 * 1024 * 1024) { message('Export saved runs and reload before another calculation.'); return; }
    stopPlayback(); busy = true; controller = new AbortController(); controls(); message('Calculating with the EOM solver. Stop requests an accepted-boundary halt.');
    try {
      const result = await client.evolveRecord(request, { expectedModelDigest: inspection.modelDigest, signal: controller.signal, onProgress: p => { $('coverage').textContent = `Solver progress: ${p.acceptedTime ?? 'starting'} · accepted steps ${p.acceptedStepCount ?? 0}`; } });
      const next = validateLatticePatchRecord({ schema: LATTICE_PATCH_RECORD_SCHEMA, settings: structuredClone(settings), request: structuredClone(request), result });
      remember(next); loadRecord(next);
    } catch (error) { message(serviceError(error)); }
    finally { busy = false; controller = null; controls(); }
  };
  $('stop').onclick = () => { controller?.abort(); message('Stopping at an accepted boundary; waiting for the retained prefix.'); };
  $('timeline').oninput = () => { stopPlayback(); displayTime(Number($('timeline').value)); };
  $('play').onclick = () => {
    if (playing) { stopPlayback(); return; }
    const end = Number(record?.result.acceptedCoverage.end); if (!(end > 0)) return;
    if (time >= end) displayTime(0); playing = true; playStart = performance.now() - time / end * 4000; $('play').textContent = 'Pause replay';
    const tick = now => { if (!playing) return; const t = Math.min(end, (now - playStart) / 4000 * end); displayTime(t); if (t >= end) stopPlayback(); else frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick);
  };
  $('saved').onchange = () => { const value = $('saved').value; if (value !== '' && saved[Number(value)]) loadRecord(saved[Number(value)]); };
  $('export').onclick = () => {
    if (!record) return; const url = URL.createObjectURL(new Blob([JSON.stringify(record)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = `${record.request.runId}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  $('import').onchange = async () => {
    const file = $('import').files?.[0]; if (!file || busy) return;
    try { if (file.size > LATTICE_PATCH_RECORD_LIMIT) throw new Error('Choose an exported run no larger than 12 MiB.'); const next = validateLatticePatchRecord(JSON.parse(await file.text())); importedRecords.add(next); remember(next); loadRecord(next); }
    catch (error) { message(error.message); } finally { $('import').value = ''; }
  };
  $('back').onclick = event => { if (busy) { event.preventDefault(); message('Stop the active calculation before switching sections.'); } };
  window.addEventListener('beforeunload', event => { if (busy) { event.preventDefault(); event.returnValue = ''; } });
  window.addEventListener('pagehide', () => { controller?.abort(); stopPlayback(); viewer?.dispose(); navigation.destroy?.(); client.dispose().catch(console.error); }, { once: true });
  prepare();
  return { getRequest: () => request, getRecord: () => record };
}

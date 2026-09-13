import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

// Deliberately narrow: inline local Markdown file targets outside fenced blocks.
// Heading fragments and remote resources are not validated.
function links(text) {
  const found = []; let fence = null;
  for (const [index, line] of text.split('\n').entries()) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      continue;
    }
    if (fence) continue;
    for (const match of line.matchAll(/\[[^\]\n]+\]\(([^)\n]+)\)/g)) {
      const target = match[1];
      if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)) continue;
      found.push({line:index+1, target:target.split('#')[0]});
    }
  }
  assert.equal(fence, null, 'unclosed fenced block');
  return found;
}
const unresolved = (text, directory) => links(text).filter(row => !fs.existsSync(path.resolve(directory, row.target)));
const whitespace = filename => spawnSync('git',['diff','--no-index','--check','/dev/null',filename],{encoding:'utf8'});
if (process.argv[2] === 'controls') {
  const fixture = '[good](hit.md)\n~~~text\n[example](absent.md)\n```\n~~~\n[second](hit.md#heading)\n[web](https://example.invalid/)\n';
  assert.deepEqual(links(fixture), [{line:1,target:'hit.md'},{line:6,target:'hit.md'}]);
  assert.throws(() => links('```\n[hidden](missing.md)'));
  const directory = '.tmp/option-a-validation-rca/link-controls';
  fs.mkdirSync(directory,{recursive:true}); fs.writeFileSync(path.join(directory,'hit.md'),'# Known file\n');
  assert.equal(unresolved(fixture,directory).length,0);
  assert.deepEqual(unresolved('[bad](missing-known-negative.md)',directory),[{line:1,target:'missing-known-negative.md'}]);
  const good=whitespace(path.join(directory,'hit.md')); assert.equal(good.status,1); assert.equal(good.stdout+good.stderr,'');
  fs.writeFileSync(path.join(directory,'whitespace-negative.md'),'bad trailing space \n');
  const bad=whitespace(path.join(directory,'whitespace-negative.md')); assert(bad.status>1); assert.match(bad.stdout+bad.stderr,/trailing whitespace/);
  console.log('PASS before targets: literal links; fragment stripping; fenced exclusion including a different nested marker; remote exclusion; unclosed fence rejection; known existing and missing files.');
  console.log('PASS before targets: Git --no-index --check clean-new-file status 1 with empty output; deliberate trailing-whitespace negative reports error.');
} else if (process.argv[2] === 'check') {
  const base='reference/priorities/development-process-review/';
  const files=['analysis/option-a-validation-root-cause-analysis.md','evidence/option-a-validation-rca/README.md','evidence/option-a-validation-rca/document-coverage.md'];
  for (const short of files) {
    const filename=base+short, text=fs.readFileSync(filename,'utf8');
    assert(text.endsWith('\n')); assert(!text.includes('\r')); assert(!text.includes('\ufffd'));
    assert.deepEqual(unresolved(text,path.dirname(filename)),[],filename);
    console.log(`PASS ${filename}: ${links(text).length} existing local targets; closed fences, LF and final newline. Fragments and remote URLs not checked.`);
  }
  const folder=base+'evidence/option-a-validation-rca/';
  const authored=[base+files[0],...fs.readdirSync(folder).filter(n=>!n.endsWith('.diff')&&n!=='document-check.txt').map(n=>folder+n)];
  for(const filename of authored){const result=whitespace(filename);assert.equal(result.error,undefined);assert([0,1].includes(result.status),filename);assert.equal(result.stdout+result.stderr,'',filename);}
  console.log(`PASS whitespace: ${authored.length} report/evidence files by git diff --no-index --check; historical .diff data and this running output excluded.`);
} else throw new Error('Run controls before check.');

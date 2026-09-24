const fs=require('fs'),crypto=require('crypto'),assert=require('assert');
const tier=p=>/^(foundations|dynamics)\//.test(p)?1:/^(noether-braid|spacetime|quantum|assemblies)\//.test(p)?2:/^validation\//.test(p)?4:3;
function walk(n,out=[]){if(n.markdownPath&&!out.includes(n.markdownPath))out.push(n.markdownPath);for(const c of n.children||[])walk(c,out);return out;}
function enumerate(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?enumerate(d+'/'+e.name):e.name.endsWith('.md')?[d+'/'+e.name]:[]);}
assert.deepStrictEqual(['foundations/a.md','dynamics/a.md','quantum/a.md','archie/a.md','validation/simulations/a.md'].map(tier),[1,1,2,3,4]);
assert.deepStrictEqual(walk({markdownPath:'a',children:[{markdownPath:'b'},{markdownPath:'a'}]}),['a','b']);
assert.equal(crypto.createHash('sha256').update('abc').digest('hex'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known-case classifier, traversal/deduplication and SHA-256 controls passed before target inventory.');
if(process.argv.includes('--controls-only'))process.exit(0);
const root='content/markdown/aaa/',files=enumerate(root.slice(0,-1)).sort(),order=walk(JSON.parse(fs.readFileSync('content/graph/textbook_toc.json')).tocRoot);
const dates={1:'2026-10-13',2:'2026-12-13',3:'2027-03-13',4:'2027-09-13'};
const preferred=['noether-braid/noether-braid.md','spacetime/noether-sea.md','spacetime/observer-framework.md'];
const ranked=files.map(path=>({path,tier:tier(path.slice(root.length)),sha256:crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex'),toc:order.indexOf(path)})).sort((a,b)=>a.tier-b.tier||(a.tier===2?(preferred.indexOf(a.path.slice(root.length))<0?999:preferred.indexOf(a.path.slice(root.length)))-(preferred.indexOf(b.path.slice(root.length))<0?999:preferred.indexOf(b.path.slice(root.length))):0)||(a.toc<0?9999:a.toc)-(b.toc<0?9999:b.toc)||a.path.localeCompare(b.path));
const payload={captured:'2026-09-20',instrument:'.tmp/ops-031/inventory.cjs; known-case controls passed before target',ordering:'Tier then initial priority-2 dependencies then textbook traversal; absent TOC paths follow lexically within tier. Reprioritize confirmed defects and accepted changed dependencies explicitly.',entries:ranked.map((x,i)=>({...x,sequence:i+1,deadline:dates[x.tier],status:'pending'}))};
fs.writeFileSync('reference/priorities/aaa-operations/evidence/ops-031-coverage-inventory-2026-09-20.json',JSON.stringify(payload,null,2)+'\n');
console.log(JSON.stringify({counts:[1,2,3,4].map(t=>({tier:t,count:ranked.filter(x=>x.tier===t).length})),missingFromToc:ranked.filter(x=>x.toc<0).map(x=>x.path),first:ranked.slice(0,20).map(x=>x.path)},null,2));

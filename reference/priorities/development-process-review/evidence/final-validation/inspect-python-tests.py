"""Static discovery only; never imports or executes a repository test module."""
import ast
import hashlib
import json
from pathlib import Path


def inspect_source(source):
    tree = ast.parse(source)
    imports, cases, exclusions, subprocess_calls = set(), [], [], []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            imports.update(alias.name for alias in node.names)
        elif isinstance(node, ast.ImportFrom):
            imports.add('.' * node.level + (node.module or ''))
        elif isinstance(node, ast.ClassDef):
            methods = [n.name for n in node.body if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef)) and n.name.startswith('test')]
            if methods:
                cases.append(dict(className=node.name, bases=[ast.unparse(b) for b in node.bases], declaredTestMethods=len(methods)))
        if isinstance(node, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)):
            for decorator in node.decorator_list:
                expression = ast.unparse(decorator)
                if 'skip' in expression.lower() or 'expectedFailure' in expression:
                    exclusions.append(dict(line=node.lineno, name=node.name, expression=expression))
        if isinstance(node, ast.Call):
            name = ast.unparse(node.func)
            if name in ('subprocess.run', 'subprocess.Popen', 'subprocess.check_call', 'subprocess.check_output'):
                subprocess_calls.append(dict(line=node.lineno, expression=ast.unparse(node)[:500]))
            if name.endswith('skipTest'):
                exclusions.append(dict(line=node.lineno, expression=ast.unparse(node)))
    return dict(imports=sorted(imports), classes=cases, exclusions=exclusions, directSubprocessCalls=subprocess_calls)


known = inspect_source('import unittest\n@unittest.skipIf(False, "known")\nclass C(unittest.TestCase):\n def test_one(self):\n  self.skipTest("conditional")\n')
assert known['imports'] == ['unittest']
assert known['classes'] == [dict(className='C', bases=['unittest.TestCase'], declaredTestMethods=1)]
assert len(known['exclusions']) == 2
assert not known['directSubprocessCalls']
print('Known AST discovery and exclusion cases passed before repository inspection.', flush=True)
root = Path.cwd()
paths = [r['path'] for r in json.loads((root/'reference/priorities/development-process-review/evidence/test-coverage-inventory.json').read_text())['candidates'] if r['kind']=='python-test']
records = []
for path in paths:
    raw = (root/path).read_bytes()
    records.append(dict(path=path, sha256=hashlib.sha256(raw).hexdigest(), status='static-discovery-only', **inspect_source(raw)))
report = dict(boundary='AST-declared methods/imports/exclusions/direct subprocess syntax only; no imports, test execution, dynamic-discovery claim or prerequisite satisfaction.', records=records)
Path('/private/tmp/recovery-python-discovery.json').write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps(dict(modules=len(records), modulesWithExclusions=sum(bool(r['exclusions']) for r in records), modulesWithDirectSubprocessCalls=sum(bool(r['directSubprocessCalls']) for r in records))))

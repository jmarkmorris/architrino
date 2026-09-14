"""Synthetic controls only: no original F6c data or real campaign is loaded."""
from contextlib import contextmanager, ExitStack, redirect_stdout, redirect_stderr
from decimal import Decimal, localcontext, getcontext
from fractions import Fraction as F
import copy
import importlib.util
import io
import json
import os
from pathlib import Path
import signal
import sys
import tempfile
import time
from types import SimpleNamespace as NS
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT/"scripts/eom/prepare-f6c-emission-refinement.py"
spec = importlib.util.spec_from_file_location("emission_subject_controls", PATH)
p = importlib.util.module_from_spec(spec); sys.modules[spec.name] = p; spec.loader.exec_module(p)


class Box:
    def __init__(self, lo, hi, precision=90):
        self.lower, self.upper, self.precision = Decimal(lo), Decimal(hi), precision
    @classmethod
    def bounds(cls, lo, hi, precision=90): return cls(lo, hi, precision)


def decimal(q):
    with localcontext() as c:
        c.prec = 100
        return Decimal(q.numerator)/Decimal(q.denominator)


def known_residual(_rx, _tx, reception, emission):
    # Independently specified g(T,s)=1-T+s, stationary distance exactly one.
    return Box(decimal(1+F(emission.lower)-F(reception.upper)),
               decimal(1+F(emission.upper)-F(reception.lower)))


def fake_modules(residual=known_residual):
    return {"continuous_reception_roots": NS(unrestricted_residual=residual),
            "decimal_interval": NS(DecimalInterval=Box)}


def identities():
    return tuple(NS(history_id=x) for x in p.IDS)


def valid_plan():
    def b(path, digest="1"*64): return dict(path=path, sha256=digest, bytes=1)
    named = dict(producer=b(p.SELF), producerControls=b(p.CONTROLS),
        verifier=b(p.VERIFIER), verifierControls=b(p.VERIFIER_CONTROLS),
        declaration=b(p.DECLARATION,p.DECLARATION_SHA),
        comparisonReference=b(p.COMPARISON,p.COMPARISON_SHA),
        comparisonReferenceControls=b(p.COMPARISON_CONTROLS,p.COMPARISON_CONTROLS_SHA))
    return dict(schema=p.PLAN_SCHEMA, scope=p.SCOPE, **named,
        subjectSourceBindings=[b(k,h) for k,h in p.EXTRA]+[named["producer"],named["producerControls"]],
        runtimeBindings=[b("/synthetic/python")],
        operationalBindings=[b(k,p.OP_PINS.get(k,"1"*64)) for k in p.OPERATIONS]+[b("/synthetic/node")],
        limits=copy.deepcopy(p.LIMITS),
        priorCoverClosure=dict(authority="externally-reviewed-caller-observation",
            ownerSha256=dict((k,h) for k,_,h in p.FIXED)["priorClosureOwner"],
            admissionSha256=dict((k,h) for k,_,h in p.FIXED)["admission"],
            matchingFreshCompletionObserved=True,exitCode=0,elapsedSeconds="8.534247625",
            processesClosed=True,independentAuditAccepted=True))


class Controls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.stack = ExitStack()
        source = cls.stack.enter_context(p.BoundFile(ROOT/p.HELPER,p.HELPER_SHA,collect=True))
        cls.helper = cls.stack.enter_context(p.captured_helper(source))
    @classmethod
    def tearDownClass(cls): cls.stack.close()

    def proposal(self, residual=known_residual):
        queries=[]; progress={}
        result=p.propose(identities(),fake_modules(residual),self.helper,queries.append,progress)
        return result,queries,progress

    def test_known_stationary_exact_grid_endpoints(self):
        restrictions,queries,progress=self.proposal()
        step=F(159,20*2**32)
        lower=-8+(F(7)//step)*step
        # Upper strict whole-face threshold is T_max-1=-999/1000.
        k=-((-F(7001,1000))//step)
        upper=-8+k*step
        self.assertEqual(len(queries),3584);self.assertEqual(len(restrictions),56)
        for r in restrictions:
            self.assertEqual(F(r["lower"]),lower);self.assertEqual(F(r["upper"]),upper)
            self.assertLess(F(r["lower"]),-1);self.assertGreater(F(r["upper"]),F(-999,1000))
        self.assertEqual(progress["completedQueries"],3584)

    def test_receiver_major_reset_order_and_canonical_midpoints(self):
        _,queries,_=self.proposal()
        for pair in range(56):
            self.assertEqual(queries[pair*64]["exploratory"],dict(lower="-8",upper="-0.05",precision=90))
            self.assertEqual(queries[pair*64+32]["exploratory"],dict(lower="-8",upper="-0.05",precision=90))
            for n in range(64):
                q=queries[pair*64+n]
                self.assertEqual(q["queryIndex"],pair*64+n)
                self.assertEqual(q["ordinal"],n%32)
                self.assertEqual(F(q["midpoint"]),(F(q["exploratory"]["lower"])+F(q["exploratory"]["upper"]))/2)
                self.assertNotIn("E",q["midpoint"]);self.assertNotIn("e",q["midpoint"])

    def test_zero_and_indeterminate_never_move_certified_faces(self):
        for residual in (lambda *_:Box("0","0"),lambda *_:Box("-1","1")):
            restrictions,queries,_=self.proposal(residual)
            self.assertTrue(all((r["lower"],r["upper"],r["lowerQueryIndex"],r["upperQueryIndex"])==("-8","-0.05",None,None) for r in restrictions))
            self.assertTrue(all(q["decision"].startswith("explore-") for q in queries))

    def test_fixed_context_independent_of_ambient_precision(self):
        seen=[]
        def residual(*args):
            c=getcontext();seen.append((c.prec,c.Emin,c.Emax));return known_residual(*args)
        with localcontext() as context:
            context.prec=7;context.Emin=-20;context.Emax=20
            low=self.proposal(residual)[:2]
            self.assertEqual((context.prec,context.Emin,context.Emax),(7,-20,20))
        with localcontext() as context:
            context.prec=140;high=self.proposal()[:2]
        self.assertEqual(low,high);self.assertEqual(set(seen),{(90,-999999,999999)})

    def test_failed_query_preserves_completed_prefix(self):
        saved=[]; progress={};count=0
        def broken(*args):
            nonlocal count
            count+=1
            if count==6:raise RuntimeError("synthetic query failure")
            return known_residual(*args)
        with self.assertRaisesRegex(RuntimeError,"synthetic"):
            p.propose(identities(),fake_modules(broken),self.helper,saved.append,progress)
        self.assertEqual(len(saved),5);self.assertEqual(progress["completedQueries"],5)

    def test_nonfinite_and_wrong_precision_rejected(self):
        for result in (Box("NaN","1"),Box("0","Infinity"),Box("-1","1",28),Box("1","0")):
            with self.subTest(result=result.__dict__),self.assertRaises((ValueError,ArithmeticError)):
                self.proposal(lambda *_:result)

    def test_identity_and_crossed_faces_fail_closed(self):
        with self.assertRaisesRegex(ValueError,"ordered"):
            p.propose(identities()[::-1],fake_modules(),self.helper,lambda _:None,{})
        # Inconsistent synthetic observations must never create a clipped box.
        n=0
        def impossible(*_):
            nonlocal n
            n+=1;return Box("-2","-1") if n<=32 else Box("1","2")
        with self.assertRaisesRegex(ValueError,"crossed"):
            self.proposal(impossible)

    def test_write_callback_failure_does_not_advance_prefix(self):
        progress={};saved=[]
        def writer(q):
            if len(saved)==4:raise OSError("disk synthetic")
            saved.append(q)
        with self.assertRaises(OSError):
            p.propose(identities(),fake_modules(),self.helper,writer,progress)
        self.assertEqual(progress["completedQueries"],4)

    def test_exact_fifteen_source_closure_and_fixed_ancestry(self):
        plan=valid_plan();self.assertIs(p.validate_plan(plan,"1"*64),plan)
        self.assertEqual(len(plan["subjectSourceBindings"]),15)
        self.assertEqual(len(p.FIXED),16)
        for change in ("missing","duplicate","altered","extra"):
            q=copy.deepcopy(plan)
            if change=="missing":q["subjectSourceBindings"].pop()
            if change=="duplicate":q["subjectSourceBindings"].append(q["subjectSourceBindings"][0])
            if change=="altered":q["subjectSourceBindings"][0]["sha256"]="2"*64
            if change=="extra":q["other"]=True
            with self.subTest(change=change),self.assertRaises(ValueError):p.validate_plan(q,"1"*64)

    def test_decimal_controls_cannot_be_omitted(self):
        plan=valid_plan()
        plan["subjectSourceBindings"]=[b for b in plan["subjectSourceBindings"] if b["path"]!="tests/test_eom_decimal_interval.py"]
        with self.assertRaises(ValueError):p.validate_plan(plan,"1"*64)

    def test_no_changed_limits_or_boolean_numeric_alias(self):
        for key,value in (("serialWorkers",True),("inclusiveSeconds",1801),("maximumAggregateRssBytes",3*1024**3)):
            plan=valid_plan();plan["limits"][key]=value
            with self.subTest(key=key),self.assertRaises(ValueError):p.validate_plan(plan,"1"*64)
        plan=valid_plan();plan["priorCoverClosure"]["exitCode"]=False
        with self.assertRaises(ValueError):p.validate_plan(plan,"1"*64)

    def test_named_binding_byte_disagreement(self):
        plan=valid_plan();plan["producer"]=dict(plan["producer"],bytes=2)
        with self.assertRaises(ValueError):p.validate_plan(plan,"1"*64)

    def test_wrong_comparison_or_closure_is_rejected(self):
        for field in ("comparisonReference","declaration"):
            plan=valid_plan();plan[field]["sha256"]="2"*64
            with self.assertRaises(ValueError):p.validate_plan(plan,"1"*64)
        plan=valid_plan();plan["priorCoverClosure"]["processesClosed"]=False
        with self.assertRaises(ValueError):p.validate_plan(plan,"1"*64)

    def test_duplicate_json_nonfinite_and_deep_input(self):
        for raw in (b'{"a":1,"a":2}',b'{"x":NaN}',b"["*26+b"0"+b"]"*26):
            with self.assertRaises(ValueError):p.decode(raw)

    def test_exact_json_decimal_lexemes_remain_strings(self):
        obj=p.decode(b'{"token":"0.12345678901234567890123456789","signed":"-0","n":1.25}')
        self.assertEqual(obj["token"],"0.12345678901234567890123456789")
        self.assertEqual(obj["signed"],"-0");self.assertEqual(obj["n"],Decimal("1.25"))

    def test_bound_file_replacement_mutation_and_symlink(self):
        with tempfile.TemporaryDirectory() as d:
            path=Path(d)/"source";path.write_bytes(b"original")
            with p.BoundFile(path,p.sha(b"original"),collect=True) as source:
                self.assertEqual(source.data,b"original")
                replacement=Path(d)/"replacement";replacement.write_bytes(b"original");os.replace(replacement,path)
                with self.assertRaises(ValueError):source.recheck()
            with p.BoundFile(path,p.sha(b"original")) as source:
                path.write_bytes(b"modified")
                with self.assertRaises(ValueError):source.recheck()
            link=Path(d)/"link";link.symlink_to(path)
            with self.assertRaises(OSError):p.BoundFile(link,p.sha(b"modified")).__enter__()

    def test_helper_uses_captured_bytes_not_sysmodule_alias(self):
        with p.BoundFile(ROOT/p.HELPER,p.HELPER_SHA,collect=True) as source:
            with p.captured_helper(source) as helper:
                self.assertIsNot(helper,self.helper)
                name=helper.__name__;self.assertIn(name,sys.modules)
            self.assertNotIn(name,sys.modules)

    def test_changed_helper_bytes_rejected(self):
        source=NS(expected=p.HELPER_SHA,data=b"raise RuntimeError('wrong')",path=PATH)
        with self.assertRaises(ValueError):
            with p.captured_helper(source):pass

    def test_private_publication_exclusive_and_durable(self):
        with tempfile.TemporaryDirectory() as d:
            pub=p.Publication(Path(d)/"attempt",time.monotonic()+10)
            (pub.private/"rows.ndjson").write_bytes(b"{}\n")
            b=pub.publish("rows.ndjson",self.helper)
            self.assertEqual(b["sha256"],p.sha(b"{}\n"));self.assertEqual(b["bytes"],3)
            with self.assertRaises(FileExistsError):pub.publish("rows.ndjson",self.helper)
            pub.reject()
            self.assertFalse((pub.output/"rows.ndjson").exists())
            self.assertEqual((pub.private/"rows.ndjson").read_bytes(),b"{}\n")

    def test_late_publication_retracted_private_preserved(self):
        with tempfile.TemporaryDirectory() as d:
            pub=p.Publication(Path(d)/"attempt",time.monotonic()+10)
            (pub.private/"cover-manifest.json").write_bytes(b'{"accepted":false}\n')
            with patch.object(pub,"sync_directory",side_effect=ValueError("late")):
                with self.assertRaisesRegex(ValueError,"late"):pub.publish("cover-manifest.json",self.helper)
            pub.reject()
            self.assertFalse((pub.output/"cover-manifest.json").exists())
            self.assertTrue((pub.private/"cover-manifest.json").is_file())

    def test_rejection_never_deletes_different_public_inode(self):
        with tempfile.TemporaryDirectory() as d:
            pub=p.Publication(Path(d)/"attempt",time.monotonic()+10)
            (pub.private/"rows.ndjson").write_bytes(b"{}\n");pub.publish("rows.ndjson",self.helper)
            replacement=Path(d)/"other";replacement.write_bytes(b"replacement")
            os.replace(replacement,pub.output/"rows.ndjson")
            pub.reject();self.assertEqual((pub.output/"rows.ndjson").read_bytes(),b"replacement")

    def test_query_stream_flush_retains_prefix_after_interruption(self):
        with tempfile.TemporaryDirectory() as d:
            path=Path(d)/"queries.ndjson"
            with self.assertRaises(KeyboardInterrupt):
                with self.helper.JsonlSink(path,time.monotonic()+10) as sink:
                    for i in range(3):sink.write({"queryIndex":i});sink.flush()
                    raise KeyboardInterrupt()
            self.assertEqual([json.loads(v)["queryIndex"] for v in path.read_text().splitlines()],[0,1,2])

    def test_manifest_contract_shared_scalar_bounds_and_false_claims(self):
        binding=NS(binding=lambda:dict(path="/synthetic/file",sha256="1"*64,bytes=1))
        manifest=p.make_manifest(valid_plan(),binding,binding,{k:binding for k,_,_ in p.FIXED},
                                 [],[],[],[binding.binding()]*3,self.helper)
        self.assertEqual(set(manifest),p.MANIFEST_KEYS)
        self.assertEqual(manifest["speedUpper"],"0.85");self.assertEqual(manifest["clearanceLower"],"0.27")
        self.assertEqual(manifest["algorithm"],dict(lowerQueriesPerPair=32,upperQueriesPerPair=32,order="receiver-major;lower32;reset;upper32"))
        self.assertFalse(manifest["accepted"]);self.assertTrue(all(v is False for v in manifest["claims"].values()))

    def test_tiny_budget_rejected_before_input_capture(self):
        argv=["--repo-root",str(ROOT),"--plan","unused","--plan-sha256","1"*64,
              "--producer-sha256","1"*64,"--out-dir","unused","--budget-seconds","1e-1000","--git-binary","/usr/bin/git"]
        with patch.object(p,"BoundFile") as bound,self.assertRaisesRegex(ValueError,"representable"):
            p.main(argv)
        bound.assert_not_called()

    def test_budget_fraction_syntax_or_huge_exponent_rejected_before_capture(self):
        for token in ("1/2","1e999999999","NaN","-1"):
            argv=["--repo-root",str(ROOT),"--plan","unused","--plan-sha256","1"*64,
                "--producer-sha256","1"*64,"--out-dir","unused","--budget-seconds",token,"--git-binary","/usr/bin/git"]
            with self.subTest(token=token),patch.object(p,"BoundFile") as bound,self.assertRaises(ValueError):p.main(argv)
            bound.assert_not_called()

    def test_completion_flush_error_or_late_deadline_is_not_success(self):
        class Broken:
            def write(self,_):raise BrokenPipeError("synthetic stdout")
            def flush(self):pass
        with redirect_stdout(Broken()),self.assertRaises(BrokenPipeError):
            p.admit_completion({"completed":True},time.monotonic()+10)
        with redirect_stdout(io.StringIO()),patch.object(p.time,"monotonic",side_effect=[0,2]),self.assertRaises(ValueError):
            p.admit_completion({"completed":True},1)

    def test_actual_frozen_library_synthetic_static_cover(self):
        # One exact constant segment/member; not the real1760-piece data.
        with ExitStack() as stack:
            files={name:stack.enter_context(p.BoundFile(ROOT/path,dict(p.EXTRA)[path],collect=True))
                   for name,path in p.MODULE_PATHS.items()}
            captured={name:(str(b.path),b.data,b.expected) for name,b in files.items()}
            with self.helper.captured_package(captured) as modules:
                history=modules["certified_history"]
                histories=tuple(history.PiecewisePolynomialHistory((history.CubicHistorySegment(
                    Decimal("-8"),Decimal("0.13"),((Decimal(i)/2,Decimal(0),Decimal(0),Decimal(0)),
                    (Decimal(0),)*4,(Decimal(0),)*4),Decimal(0),Decimal(0),90),),label)
                    for i,label in enumerate(p.IDS))
                queries=[];progress={};restrictions=p.propose(histories,modules,self.helper,queries.append,progress)
                rows=[];pieces=[];visits=p.emit_cover(histories,restrictions,modules,self.helper,rows.append,pieces.append,progress)
                self.assertEqual((len(queries),len(rows),len(pieces)),(3584,64,112))
                self.assertEqual(visits,112)
                for n,row in enumerate(rows):
                    i,j=divmod(n,8)
                    if i==j:
                        self.assertIsNone(row["emission"]);self.assertIsNone(row["receiverPieceRecord"])
                    else:
                        d=F(abs(i-j),2)
                        self.assertLess(F(row["emission"]["lower"]),-d)
                        self.assertGreater(F(row["emission"]["upper"]),F(1,1000)-d)
                        self.assertLess(-d-F(row["emission"]["lower"]),F(1,10**8))
                        self.assertLess(F(row["emission"]["upper"])-(F(1,1000)-d),F(1,10**8))
                        self.assertNotEqual(row["oldestResidual"],row["lowerFaceResidual"])

    def cli_plumbing(self, failure=None):
        """Real main/serialization/publication; synthetic capture+math only.

        These controls deliberately do NOT authenticate scientific evidence.
        No actual export/proof/row file is opened, and no numerical query runs.
        """
        with tempfile.TemporaryDirectory() as directory:
            base=Path(directory);output=base/"attempt";plan_path=base/"plan.json"
            plan=valid_plan();own_data=PATH.read_bytes();own_sha=p.sha(own_data)
            plan["producer"].update(sha256=own_sha,bytes=len(own_data))
            for b in plan["subjectSourceBindings"]:
                if b["path"]==p.SELF:b.update(sha256=own_sha,bytes=len(own_data))
            git=Path("/usr/bin/git").resolve()
            runtime_paths=[Path(sys.executable).resolve(),Path(sys.executable).parent.parent/"pyvenv.cfg",git]
            plan["runtimeBindings"]=[dict(path=str(x),sha256="1"*64,bytes=1) for x in runtime_paths]
            plan_path.write_bytes(p.encoded(plan));plan_sha=p.sha(plan_path.read_bytes())
            data_by_path={ROOT/p.SELF:own_data,plan_path:plan_path.read_bytes()}
            original_bound=p.BoundFile
            class FixtureBound:
                def __init__(self,path,expected,collect=False,limit=p.MAX_BYTES):
                    self.path=Path(path).absolute();self.expected=expected;self.collect=collect
                    self.delegate=None
                def __enter__(self):
                    if self.path.is_relative_to(output):
                        self.delegate=original_bound(self.path,self.expected,collect=self.collect)
                        return self.delegate.__enter__()
                    self.data=data_by_path.get(self.path,b"{}") if self.collect else None
                    size=len(data_by_path[self.path]) if self.path in data_by_path else 1
                    self.initial=NS(st_size=size);return self
                def __exit__(self,*args):
                    if self.delegate:return self.delegate.__exit__(*args)
                def recheck(self):
                    if failure=="source-change" and self.path==ROOT/p.SELF:
                        raise ValueError("synthetic source replaced")
                def binding(self):return dict(path=str(self.path),sha256=self.expected,bytes=self.initial.st_size)
            originals=[dict(id=x,pathKey=i+1,polarity=1 if i%2==0 else -1,
                charge=p.CHARGE if i%2==0 else "-"+p.CHARGE,historyFingerprint="synthetic-original")
                for i,x in enumerate(p.IDS)]
            histories=tuple(NS(history_id=x,digest=lambda:"synthetic-digest") for x in p.IDS)
            runtime_calls=0
            def runtime(_):
                nonlocal runtime_calls
                runtime_calls+=1
                if failure=="late-runtime" and runtime_calls>1:return {Path("/unreviewed/lazy.py")}
                return set(runtime_paths)
            @contextmanager
            def modules(_):yield {}
            helper=NS(**self.helper.__dict__)
            helper.captured_package=modules
            helper.imported_runtime_paths=runtime
            helper.authenticate_premises=lambda *_:(originals,[(F(0),F(1,1000))])
            helper.build_histories=lambda *_:histories
            @contextmanager
            def captured(_):yield helper
            def proposal(_h,_m,_helper,write,progress):
                for i in range(3584):write({"queryIndex":i});progress["completedQueries"]=i+1
                return [{"synthetic":"plumbing-only"}]*56
            def cover(_h,_r,_m,_helper,row,piece,progress):
                for i in range(64):row({"rowIndex":i});progress["completedRows"]=i+1
                for i in range(112):piece({"recordIndex":i});progress["completedPieces"]=i+1
                return 112
            def completion(value,deadline):
                if failure=="late-completion":raise ValueError("synthetic late completion")
                if failure=="stdout":raise BrokenPipeError("synthetic stdout")
                p.require(time.monotonic()<deadline,"test deadline")
                print(json.dumps(value),flush=True)
            argv=["--repo-root",str(ROOT),"--plan",str(plan_path),"--plan-sha256",plan_sha,
                "--producer-sha256",own_sha,"--out-dir",str(output),"--budget-seconds","10","--git-binary",str(git)]
            stdout,stderr=io.StringIO(),io.StringIO();before=signal.getsignal(signal.SIGALRM)
            with patch.object(p,"BoundFile",FixtureBound),patch.object(p,"captured_helper",captured),\
                 patch.object(p,"authenticate_prior"),patch.object(p,"check_output"),\
                 patch.object(p,"propose",proposal),patch.object(p,"emit_cover",cover),\
                 patch.object(p,"admit_completion",completion),redirect_stdout(stdout),redirect_stderr(stderr):
                if failure:
                    with self.assertRaises((ValueError,BrokenPipeError)):p.main(argv)
                else:p.main(argv)
            self.assertEqual(signal.getitimer(signal.ITIMER_REAL),(0.0,0.0))
            self.assertIs(signal.getsignal(signal.SIGALRM),before)
            private=list(output.glob(".emission-private-*"))
            self.assertEqual(len(private),1)
            self.assertEqual(len((private[0]/"queries.ndjson").read_text().splitlines()),3584)
            if failure:
                self.assertEqual(stdout.getvalue(),"")
                rejected=json.loads(stderr.getvalue().splitlines()[-1])
                self.assertFalse(rejected["completed"]);self.assertFalse(rejected["conditionalCoverPrepared"])
                self.assertFalse((output/"cover-manifest.json").exists())
                self.assertFalse(any((output/name).exists() for name in ("queries.ndjson","rows.ndjson","pieces.ndjson")))
            else:
                result=json.loads(stdout.getvalue())
                self.assertEqual([Path(b["path"]).name for b in result["outputs"]],
                    ["queries.ndjson","rows.ndjson","pieces.ndjson","cover-manifest.json"])
                self.assertTrue(result["completed"]);self.assertFalse(result["accepted"])
                self.assertEqual(result["census"],p.CENSUS)
                for b in result["outputs"]:
                    raw=Path(b["path"]).read_bytes()
                    self.assertEqual((p.sha(raw),len(raw)),(b["sha256"],b["bytes"]))
                manifest=json.loads((output/"cover-manifest.json").read_text())
                self.assertEqual(set(manifest),p.MANIFEST_KEYS)
                self.assertEqual(manifest["members"][1]["charge"],"-"+p.CHARGE)

    def test_main_cli_plumbing_full_private_publication(self):self.cli_plumbing()
    def test_main_late_completion_retracts_public_outputs(self):self.cli_plumbing("late-completion")
    def test_main_failed_stdout_retracts_public_outputs(self):self.cli_plumbing("stdout")
    def test_main_late_runtime_retracts_public_outputs(self):self.cli_plumbing("late-runtime")
    def test_main_changed_source_preserves_private_query_prefix(self):self.cli_plumbing("source-change")


class ReceiptParserControls(unittest.TestCase):
    """Operational metadata only; this class never imports the scientific helper."""

    def test_default_and_receipt_string_boundaries_are_separate(self):
        for mode, limit in (("data",8192),("operational-receipt",65536)):
            raw=json.dumps({"command":"x"*limit}).encode()
            self.assertEqual(len(p.decode(raw,document_type=mode)["command"]),limit)
            with self.assertRaisesRegex(ValueError,"JSON token limit"):
                p.decode(json.dumps({"command":"x"*(limit+1)}).encode(),document_type=mode)
        self.assertEqual(len(p.decode(json.dumps({"token":"x"*8192}).encode())["token"]),8192)
        with self.assertRaisesRegex(ValueError,"JSON token limit"):
            p.decode(json.dumps({"token":"x"*8193}).encode())

    def test_real_shaped_provenance_command_is_receipt_metadata_only(self):
        record={"schema":"synthetic/operational-admission.v1","accepted":False,
                "stages":[{"process":{"gates":[{"requestedArgs":["-e","x"*52671]}]}}]}
        raw=json.dumps(record).encode()
        self.assertEqual(p.decode(raw,document_type="operational-receipt"),record)
        with self.assertRaisesRegex(ValueError,"JSON token limit"):p.decode(raw)
        for mode in ("unknown",None,True,8192,{},[]):
            with self.subTest(mode=mode),self.assertRaises(ValueError):
                p.decode(b"{}",document_type=mode)

    def test_both_document_types_preserve_duplicate_nonfinite_depth_and_key_guards(self):
        invalid=[b'{"a":1,"a":2}',b'{"n":NaN}',b'{"n":Infinity}',b'{"n":-Infinity}',
                 b"["*25+b"0"+b"]"*25,json.dumps({"k"*4097:0}).encode(),b'"\xff"']
        for mode in ("data","operational-receipt"):
            self.assertEqual(p.decode(b"["*24+b"0"+b"]"*24,document_type=mode),json.loads(b"["*24+b"0"+b"]"*24))
            self.assertIn("k"*4096,p.decode(json.dumps({"k"*4096:0}).encode(),document_type=mode))
            for raw in invalid:
                with self.subTest(mode=mode,raw_bytes=len(raw)),self.assertRaises((ValueError,UnicodeError)):
                    p.decode(raw,document_type=mode)

    def test_both_document_types_preserve_array_object_and_whole_file_bounds(self):
        self.assertEqual(p.MAX_BYTES,64*1024**2)
        for mode in ("data","operational-receipt"):
            for length in (20000,20001):
                raw=json.dumps([0]*length).encode()
                if length==20000:self.assertEqual(len(p.decode(raw,document_type=mode)),length)
                else:
                    with self.assertRaisesRegex(ValueError,"JSON array limit"):p.decode(raw,document_type=mode)
            for length in (10000,10001):
                raw=json.dumps({str(n):0 for n in range(length)}).encode()
                if length==10000:self.assertEqual(len(p.decode(raw,document_type=mode)),length)
                else:
                    with self.assertRaisesRegex(ValueError,"JSON object limit"):p.decode(raw,document_type=mode)
            with patch.object(p,"MAX_BYTES",32):
                self.assertEqual(p.decode(b'{"x":1}',document_type=mode),{"x":1})
                with self.assertRaisesRegex(ValueError,"JSON byte limit"):p.decode(b" "*33,document_type=mode)

    def test_synthetic_four_document_chain_is_receipt_mode_role_scoped(self):
        def document(role, value):
            raw=json.dumps(value).encode()
            record=dict(path="/synthetic/"+role+".json",sha256=p.sha(raw),bytes=len(raw))
            return NS(data=raw,binding=lambda:record)
        fixed={}
        for role in ("rows","pieces"):fixed[role]=document(role,{"syntheticOnly":True})
        sources=[dict(path="/synthetic/source.py",sha256="1"*64,bytes=1)]
        plan=dict(schema="braid-program/f6c-cached-root-cover-pilot-launch.v1",scope="pilot-cell-0",
                  comparisonContract=dict(subjectSourceBindings=sources,runtimeBindings=sources))
        fixed["priorPlan"]=document("priorPlan",plan)
        manifest=dict(rows=fixed["rows"].binding(),pieces=fixed["pieces"].binding(),
                      launchPlan=fixed["priorPlan"].binding(),subjectSourceBindings=sources,runtimeBindings=sources)
        fixed["manifest"]=document("manifest",manifest)
        comparison=dict(schema="braid-program/f6c-continuous-reception-root-cover-conformance.v1",
                        accepted=True,scope="pilot-cell-0",analysis=dict(accepted=False,conditionalEnclosuresConformant=True),
                        rows=fixed["rows"].binding(),pieces=fixed["pieces"].binding(),
                        manifest=fixed["manifest"].binding(),launchPlan=fixed["priorPlan"].binding())
        fixed["comparison"]=document("comparison",comparison)
        stages=[]
        for stage in ("consumer","comparison"):
            complete=dict(completed=True,accepted=(stage=="comparison"))
            if stage=="consumer":complete["outputs"]=[fixed[k].binding() for k in ("rows","pieces","manifest")]
            else:complete["output"]=fixed["comparison"].binding()
            stages.append(dict(stage=stage,process=dict(accepted=True,processesClosed=True,
                exit=dict(code=0,signal=None),gates=[dict(retired=True,requestedArgs=["-e","x"*52587,"y"*52671])]),
                admission=dict(accepted=True,completion=complete)))
        admission=dict(schema="braid-program/f6c-cached-root-cover-pilot-admission.v1",
                       accepted=True,scope="pilot-cell-0",processesClosed=True,plan=fixed["priorPlan"].binding(),
                       stages=stages,**{k:False for k in ("eomExecuted","fullRunAuthorized","h3EvidenceEligible",
                                                        "historicalTrajectoryIdentityEstablished","metricsAvailable")})
        fixed["admission"]=document("admission",admission)
        with self.assertRaisesRegex(ValueError,"JSON token limit"):p.decode(fixed["admission"].data)
        forbidden=AssertionError("scientific/helper/import execution forbidden in metadata control")
        with patch.object(p,"captured_helper",side_effect=forbidden) as helper, \
             patch.object(p,"propose",side_effect=forbidden) as propose, \
             patch.object(p,"_propose",side_effect=forbidden) as private_propose, \
             patch.object(p,"emit_cover",side_effect=forbidden) as cover, \
             patch.object(p,"main",side_effect=forbidden) as main, \
             patch.object(p,"decode",wraps=p.decode) as decoder, \
             patch("builtins.compile",side_effect=forbidden), \
             patch("builtins.__import__",side_effect=forbidden):
            p.authenticate_prior(fixed)
        self.assertEqual([call.kwargs.get("document_type","data") for call in decoder.call_args_list],
                         ["data","data","operational-receipt","data"])
        for trap in (helper,propose,private_propose,cover,main):trap.assert_not_called()

if __name__=="__main__":unittest.main()

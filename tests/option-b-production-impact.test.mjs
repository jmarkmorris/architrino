import test from 'node:test';
import assert from 'node:assert/strict';
import {Store,DataFactory} from 'n3';
import {QueryEngine} from '@comunica/query-sparql-rdfjs';
import {NS} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {queryDeclaredImpact} from '../scripts/equation-mapping/current-source-impact.mjs';
const {namedNode:n,quad:q}=DataFactory;
test('known directed cycle, upstream source and disconnected self-loop retain exact declared impact',async()=>{
 const store=new Store([q(n('https://known/a'),n(NS+'input'),n('https://known/b')),q(n('https://known/b'),n(NS+'input'),n('https://known/a')),q(n('https://known/c'),n(NS+'input'),n('https://known/a')),q(n('https://known/d'),n(NS+'input'),n('https://known/d'))]);
 assert.deepEqual([...(await queryDeclaredImpact(new QueryEngine(),store,new Set(['https://known/b'])))].sort(),['https://known/a','https://known/b','https://known/c']);
 assert.deepEqual([...(await queryDeclaredImpact(new QueryEngine(),store,new Set(['https://known/d'])))],['https://known/d']);
 assert.deepEqual([...(await queryDeclaredImpact(new QueryEngine(),store,new Set()))],[]);
 await assert.rejects(queryDeclaredImpact(new QueryEngine(),store,new Set(['https://known/>bad'])),/Unsafe query identity/);
});

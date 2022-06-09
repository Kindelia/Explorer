import { Tagged, V } from './util'

export type Name = Tagged<'Name', string>
export type Hex = Tagged<'Hex', string>
export type Hash = Tagged<'Hash', string>

// Raw API data
// ============

export interface BlockJson {
  time: string
  rand: string
  prev: string
  body: number[]
}

export type BlockContentJson = StatementJson[]

export type StatementJson =
  | V<'Ctr', StmtCtrJson>
  | V<'Fun', StmtFunJson>
  | V<'Run', StmtRunJson>

interface StmtCtrJson {}
interface StmtFunJson {}
interface StmtRunJson {
  body: TermJson
}

type TermJson = V<'Ctr', CtrJson> | V<'Num', NumJson>

export interface VarJson {
  name: string
}

export interface CtrJson {
  name: string
  args: TermJson[]
}

export interface NumJson {
  numb: string
}

// Kindelia Types
// ==============

export interface Block {
  time: Date
  rand: null
  prev: Hash
  body: null
}

type BlockContent = Statement[]

export type Statement =
  | V<'Ctr', StmtCtr>
  | V<'Fun', StmtFun>
  | V<'Run', StmtRun>

interface StmtCtr {}
interface StmtFun {}
interface StmtRun {
  body: Term
}

type Term =
  | V<'Var', Var>
  // | V<'Dup', Dup>
  // | V<'Lam', Lam>
  | V<'Ctr', Ctr>
  | V<'Num', Num>

export interface Var {
  name: Name
}

interface Ctr {
  name: string
  args: Term[]
}

interface Num {
  numb: bigint
}

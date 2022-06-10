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

export const StatementJson_TAGS = ['Ctr', 'Fun', 'Run']

export type StatementJson =
  | V<'Ctr', StmtCtrJson>
  | V<'Fun', StmtFunJson>
  | V<'Run', StmtRunJson>

export interface StmtCtrJson {
  name: string
  args: string[]
}
export interface StmtFunJson {
  name: string
  args: string[]
  func: RuleJson[]
  init: TermJson
}
export interface StmtRunJson {
  body: TermJson
}

export interface RuleJson {
  lhs: TermJson
  rhs: TermJson
}

export const TermJson_TAGS = [
  'Var',
  'Dup',
  'Lam',
  'App',
  'Ctr',
  'Fun',
  'Num',
  'Op2',
]

export type TermJson =
  | V<'Var', VarJson>
  | V<'Dup', DupJson>
  | V<'Lam', LamJson>
  | V<'App', AppJson>
  | V<'Ctr', CtrJson>
  | V<'Fun', FunJson>
  | V<'Num', NumJson>
  | V<'Op2', Op2Json>

export interface VarJson {
  name: string
}

export interface DupJson {
  nam0: string
  nam1: string
  expr: Term
  cont: Term
}

export interface LamJson {
  name: string
  body: TermJson
}

export interface AppJson {
  func: TermJson
  argm: TermJson
}

export interface CtrJson {
  name: string
  args: TermJson[]
}

export interface FunJson {
  name: string
  args: TermJson[]
}

export interface Op2Json {
  oper: string
  val0: TermJson
  val1: TermJson
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

export type BlockContent = Statement[]

export type Statement =
  | V<'Ctr', StmtCtr>
  | V<'Fun', StmtFun>
  | V<'Run', StmtRun>

export interface StmtCtr {
  name: Name
  args: Name[]
}
export interface StmtFun {
  name: Name
  args: Name[]
  func: Rule[]
  init: Term
}
export interface StmtRun {
  body: Term
}

export interface Rule {
  lhs: Term
  rhs: Term
}

export type Term =
  | V<'Var', Var>
  | V<'Dup', Dup>
  | V<'Lam', Lam>
  | V<'App', App>
  | V<'Ctr', Ctr>
  | V<'Fun', Fun>
  | V<'Num', Num>
  | V<'Op2', Op2>

export interface Var {
  name: Name
}

export interface Dup {
  nam0: Name
  nam1: Name
  expr: Term
  body: Term
}

export interface Lam {
  name: Name
  body: Term
}

export interface App {
  func: Term
  argm: Term
}

export interface Ctr {
  name: Name
  args: Term[]
}

export interface Fun {
  name: Name
  args: Term[]
}

export interface Num {
  numb: bigint
}

export interface Op2 {
  oper: Name
  val0: Term
  val1: Term
}

import { Tagged, Enum, FlatEnum, Variant } from './util'
import { Variant as V } from './util'

// TODO: comment
export type StrNum = Tagged<'StrNum', string>
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

export type StatementJson = Enum<StatementJson_Variants>
export interface StatementJson_Variants {
  Ctr: StmtCtrJson
  Fun: StmtFunJson
  Run: StmtRunJson
}

export interface StmtCtrJson {
  name: Name
  args: Name[]
}
export interface StmtFunJson {
  name: Name
  args: Name[]
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

export interface TermJson_Variants {
  Var: VarJson
  Dup: DupJson
  Lam: LamJson
  App: AppJson
  Ctr: CtrJson
  Fun: FunJson
  Num: NumJson
  Op2: Op2Json
}
export type TermJson = Enum<TermJson_Variants>

export interface VarJson {
  name: Name
}

export interface DupJson {
  nam0: Name
  nam1: Name
  expr: TermJson
  body: TermJson
}

export interface LamJson {
  name: Name
  body: TermJson
}

export interface AppJson {
  func: TermJson
  argm: TermJson
}

export interface CtrJson {
  name: Name
  args: TermJson[]
}

export interface FunJson {
  name: Name
  args: TermJson[]
}

export interface Op2Json {
  oper: StrNum
  val0: TermJson
  val1: TermJson
}

export interface NumJson {
  numb: StrNum
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

export interface Statement_Variants {
  Ctr: StmtCtr
  Fun: StmtFun
  Run: StmtRun
}

export type Statement = Enum<Statement_Variants>

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

export interface Term_Variants {
  Var: Var
  Dup: Dup
  Lam: Lam
  App: App
  Ctr: Ctr
  Fun: Fun
  Num: Num
  Op2: Op2
}
export type Term = Enum<Term_Variants>

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
  oper: bigint // TODO: parse this tag
  val0: Term
  val1: Term
}

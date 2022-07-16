import Link from 'next/link'
import { FC } from 'react'

import { flatten_enum, match } from 'kindelia/utils/enum'

import styles from './Statement.module.css'
import { num_to_name, num_to_oper } from '@/lib/hvm'
import * as T from '@/lib/types'

const StmtCtr: FC<T.StmtCtr> = (ctr) => {
  return (
    <div>
      <span className={styles.statement_keyword}>ctr</span>
      <span> </span>
      <span>{`{`}</span>
      <span className={styles.statement_ctr}>{ctr.name}</span>
      <span>{ctr.args.map((arg) => ' ' + arg)}</span>
      <span>{`}`}</span>
    </div>
  )
}

const StmtFun: FC<T.StmtFun> = (fun) => {
  return (
    <div>
      <span className={styles.statement_keyword}>fun</span>
      <span> </span>
      <span>(</span>
      <Link href={`/functions/${fun.name}`}>
        <a className={styles.statement_fun}>{`${fun.name}`}</a>
      </Link>
      <span>{`${fun.args.map((arg) => ' ' + arg)}`}</span>
      <span>)</span>
      <span> </span>
      <span>{`{`}</span>
      <br />
      {fun.func.map((rule, i) => (
        <Indent n={2} key={i}>
          <Rule {...rule} />
          <br />
        </Indent>
      ))}
      <span>{`} `}</span>
      <span className={styles.statement_keyword}>with</span>
      <span>{` {`}</span>
      <br />
      <Indent n={4}>
        <Term {...fun.init} />{' '}
      </Indent>
      <br />
      <span>{`}`}</span>
    </div>
  )
}

const Rule: FC<T.Rule> = (rule) => {
  return (
    <>
      <Term {...rule.lhs} />
      <span> </span>
      <span>=</span>
      <span> </span>
      <br />
      <Indent n={4}>
        <Term {...rule.rhs} />
      </Indent>
    </>
  )
}

export const Term: FC<T.Term> = (term) => {
  let value = flatten_enum<T.Term_Variants>(term)
  switch (value.$) {
    case 'Var':
      return <Var {...value} />
    case 'Ctr':
      return <Ctr {...value} />
    case 'Fun':
      return <Fun {...value} />
    case 'Op2':
      return <Op2 {...value} />
    case 'App':
      return <App {...value} />
    case 'Num':
      return <Num {...value} />
    case 'Lam':
      return <Lam {...value} />
    case 'Dup':
      return <Dup {...value} />
    case 'IO':
      return <IO {...value} />
    default:
      return <span>Another</span>
  }
}

const Var: FC<T.Var> = (kvar) => {
  return <>{kvar.name}</>
}

const Num: FC<T.Num> = (num) => {
  return <>#{num.numb.toString()}</>
}

const Ctr: FC<T.Ctr> = (ctr) => {
  // Default
  return (
    <>
      <span>{`{`}</span>
      <span className={styles.statement_ctr}>{ctr.name}</span>
      {ctr.args.map((arg, i) => (
        <div key={i} className="inline">
          {` `}
          <Term {...arg} />
        </div>
      ))}
      <span>{`}`}</span>
    </>
  )
}

const Fun: FC<T.Fun> = (fun) => {
  return (
    <>
      <span>(</span>
      <Link href={`/functions/${fun.name}`}>
        <a className={styles.statement_fun}>{fun.name}</a>
      </Link>
      {fun.args.map((arg, i) => (
        <div className="inline" key={i}>
          {` `}
          <Term {...arg} />
        </div>
      ))}
      <span>)</span>
    </>
  )
}

const Op2: FC<T.Op2> = (op2) => {
  return (
    <>
      <span>(</span>
      <span className={styles.statement_op2}>{num_to_oper(op2.oper)}</span>
      <span> </span>
      <Term {...op2.val0} />
      <span> </span>
      <Term {...op2.val1} />
      <span>)</span>
    </>
  )
}

const App: FC<T.App> = (app) => {
  return (
    <>
      <span>(!</span>
      <Term {...app.func} />
      <span> </span>
      <Term {...app.argm} />
      <span>)</span>
    </>
  )
}

const Lam: FC<T.Lam> = (lam) => {
  let name = lam.name === '___' ? '~' : lam.name
  return (
    <>
      <span>@</span>
      <span>{name}</span>
      <span> </span>
      <Term {...lam.body} />
    </>
  )
}

const Dup: FC<T.Dup> = (dup) => {
  return (
    <>
      <span className={styles.statement_keyword}>dup</span>
      <span> </span>
      <span>{dup.nam0}</span>
      <span> </span>
      <span>{dup.nam1}</span>
      <span> = </span>
      <Term {...dup.expr} />
      <span>;</span>
      <br />
      <Indent n={4}>
        <Term {...dup.body} />
      </Indent>
    </>
  )
}

const format_varv = (name: T.Name) => (name === '___' ? 'ask' : `ask ${name} =`)

const IO: FC<T.IO> = (io) => {
  return match(io)({
    Call: (call) => <Call {...call} />,
    Take: (take) => <Take {...take} />,
    Done: (done) => <Done {...done} />,
    Load: (load) => <Load {...load} />,
    Save: (save) => <Save {...save} />,
  })
}

const Call: FC<T.Call> = (call) => {
  return (
    <>
      <span>{format_varv(call.varv)}</span>
      <span> </span>
      <span>{'('}</span>
      <Link href={`/functions/Call`}>
        <a className={styles.statement_io}>{`Call`}</a>
      </Link>
      <span> </span>
      <span>{`'`}</span>
      <Link href={`/functions/${call.func}`}>
        <a className={styles.statement_fun}>{`${call.func}`}</a>
      </Link>
      <span>{`'`}</span>
      {call.args.map((arg, i) => (
        <div className="inline" key={i}>
          {` `}
          <Term {...arg} />
        </div>
      ))}
      <span>{`)`}</span>
      <br />
      <Indent n={4}>
        <IO {...call.body} />
      </Indent>
    </>
  )
}

const Take: FC<T.Take> = (take) => {
  return (
    <>
      <span>{format_varv(take.varv)}</span>
      <span> </span>
      <span>{'('}</span>
      <Link href={`/functions/Take`}>
        <a className={styles.statement_io}>{`Take`}</a>
      </Link>
      <span>{')'}</span>
      <br />
      <Indent n={4}>
        <IO {...take.body} />
      </Indent>
    </>
  )
}

const Load: FC<T.Load> = (load) => {
  return (
    <>
      <span>{format_varv(load.varv)}</span>
      <span> </span>
      <span>{'('}</span>
      <Link href={`/functions/Load`}>
        <a className={styles.statement_io}>{`Load`}</a>
      </Link>
      <span>{')'}</span>
      <br />
      <Indent n={4}>
        <IO {...load.body} />
      </Indent>
    </>
  )
}

const Save: FC<T.Save> = (save) => {
  return (
    <>
      <span>{format_varv(save.varv)}</span>
      <span> </span>
      <span>{'('}</span>
      <Link href={`/functions/Save`}>
        <a className={styles.statement_io}>{`Save`}</a>
      </Link>
      <span> </span>
      <Term {...save.term} />
      <span>{`)`}</span>
      <br />
      <Indent n={4}>
        <IO {...save.body} />
      </Indent>
    </>
  )
}

const Done: FC<T.Done> = (done) => {
  return (
    <>
      <span className={styles.statement_io}>{`(Done`}</span>
      <span> </span>
      <Term {...done.term} />
      <span>{`)`}</span>
    </>
  )
}

const StmtRun: FC<T.StmtRun> = (run) => {
  return (
    <div>
      <span className={styles.statement_keyword}>run</span>
      <span>{' {'}</span> <br />
      <Indent n={4}>
        <Term {...run.body} />
      </Indent>
      <br />
      <span>{'}'}</span>
    </div>
  )
}

const Indent: FC<{ n: number; children: React.ReactNode }> = ({
  n,
  children,
}) => {
  return (
    <>
      {` `.repeat(n)}
      {children}
    </>
  )
}

export const Statement: FC<T.Statement> = (statement) => {
  let value = flatten_enum<T.Statement_Variants>(statement)
  switch (value.$) {
    case 'Ctr':
      return <StmtCtr {...value} />
    case 'Fun':
      return <StmtFun {...value} />
    case 'Run':
      return <StmtRun {...value} />
    default:
      return <>no</>
  }
}

export const Statements: FC<{ statements: T.Statement[] }> = (prop) => {
  return (
    <>
      {prop.statements.map((statement, i) => (
        <div className={styles.statement} key={i}>
          <Statement {...statement} />
          {i < prop.statements.length - 1 ? <br /> : null}
        </div>
      ))}
    </>
  )
}

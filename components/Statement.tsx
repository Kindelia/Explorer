import * as T from '@/lib/types'
import { get_variant, V } from '@/lib/util'
import { FC } from 'react'

const StmtCtr: FC<T.StmtCtr> = (ctr) => {
  return (
    <div>
      <span>{`(${ctr.name} ${ctr.args.join(' ')} )`}</span>
    </div>
  )
}

const StmtFun: FC<T.StmtFun> = (fun) => {
  return (
    <div>
      <span>{`(${fun.name} ${fun.args.join(' ')}) {`}</span> <br />
      {fun.func.map((rule, i) => (
        <Rule {...rule} key={i} />
      ))}
    </div>
  )
}

const Rule: FC<T.Rule> = (rule) => {
  return (
    <div>
      <span>{'('}</span> <Term {...rule.lhs} /> <span>{')'}</span>
      <span>=</span>
      <span>
        <Term {...rule.rhs} />
      </span>
    </div>
  )
}

const Term: FC<T.Term> = (term) => {
  let [tag, value] = get_variant(T.TermJson_TAGS, term)
  switch (tag) {
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
  return (
    <>
      <span>
        {`{`}
        {`${ctr.name}`}
        {ctr.args.map((arg, i) => (
          <>
            {` `} <Term {...arg} key={i} />
          </>
        ))}
        {`}`}
      </span>
    </>
  )
}

const Fun: FC<T.Fun> = (fun) => {
  return (
    <>
      <span>
        {`(`}
        {`${fun.name}`}
        {fun.args.map((arg, i) => (
          <>
            {` `} <Term {...arg} key={i} />
          </>
        ))}
        {`)`}
      </span>
    </>
  )
}

const Op2: FC<T.Op2> = (op2) => {
  return (
    <>
      <span>
        {`(`}
        {`${op2.oper} `}
        <Term {...op2.val0} /> {` `}
        <Term {...op2.val0} />
      </span>
    </>
  )
}

const App: FC<T.App> = (app) => {
  return (
    <>
      <span>
        {`(! `}
        <Term {...app.func} /> {` `}
        <Term {...app.argm} />
      </span>
    </>
  )
}

const Lam: FC<T.Lam> = (lam) => {
  return (
    <>
      <span>
        {`@${lam.name} `}
        <Term {...lam.body} />
      </span>
    </>
  )
}

const Dup: FC<T.Dup> = (dup) => {
  return (
    <>
      <span>
        {`dup ${dup.nam0} ${dup.nam1} = `}
        <Term {...dup.expr} /> {` `}
        <Term {...dup.body} />
      </span>
    </>
  )
}

const StmtRun: FC<T.StmtRun> = (run) => {
  return (
    <>
      <span>{'run {'}</span> <br />
      <Ident n={2}>
        <Term {...run.body} />
      </Ident>
      <br />
      <span>{'}'}</span>
    </>
  )
}

const Ident: FC<{ n: number; children: React.ReactNode }> = ({
  n,
  children,
}) => {
  return (
    <>
      {` `.repeat(n)} {children}
    </>
  )
}

export const Statement: FC<T.Statement> = (statement) => {
  let [tag, value] = get_variant(T.StatementJson_TAGS, statement)
  switch (tag) {
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

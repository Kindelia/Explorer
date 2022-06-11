import * as T from '@/lib/types'
import { flatten_enum } from '@/lib/util'
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
  // Pretty prints
  if (ctr.name.startsWith('IO')) {
    return <IO {...ctr} />
  }

  // Default
  return (
    <>
      <span>
        {`{`}
        {`${ctr.name}`}
        {ctr.args.map((arg, i) => (
          <>
            {` `}
            <Term {...arg} key={ctr.name} />
          </>
        ))}
        {`}`}
      </span>
    </>
  )
}

const IO: FC<T.Ctr> = (ctr) => {
  let name = ctr.name.substring(3).toLowerCase()
  let leng = ctr.args.length
  let prps = ctr.args.slice(0, leng - 1)
  let cont = ctr.args[leng - 1]

  let value = flatten_enum<T.Term_Variants>(cont)

  if (value.$ === 'Lam') {
    let lamb_name = value.name === '___' ? '~' : value.name
    return (
      <>
        <span>{`!${name} ${lamb_name}`}</span>
        {/* TODO: first term is function id, prettify to name */}
        {prps.map((prop, i) => (
          <>
            {` `}
            <Term {...prop} key={i} />
          </>
        ))}
        <br />
        {`  `}
        <Term {...value.body} />
      </>
    )
  } else {
    return (
      <>
        <span>{`!${name}`}</span>
        {ctr.args.map((arg, i) => (
          <>
            {` `}
            <Term {...arg} key={i} />
          </>
        ))}
      </>
    )
  }
}

const Fun: FC<T.Fun> = (fun) => {
  return (
    <>
      <span>
        {`(`}
        {`${fun.name}`}
        {fun.args.map((arg, i) => (
          <>
            {` `} <Term {...arg} key={fun.name} />
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
  let name = lam.name === '___' ? '~' : lam.name
  return (
    <>
      <span>
        {`@${name} `}
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

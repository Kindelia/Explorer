import { num_to_name, num_to_oper } from '@/lib/hvm'
import * as T from '@/lib/types'
import { flatten_enum } from '@/lib/util'
import Link from 'next/link'
import { FC } from 'react'

const StmtCtr: FC<T.StmtCtr> = (ctr) => {
  return (
    <div>
      <span className="statement-keyword">ctr</span>
      <span> </span>
      <span>{`{`}</span>
      <span className="statement-ctr">{ctr.name}</span>
      <span>{ctr.args.map((arg) => ' ' + arg)}</span>
      <span>{`}`}</span>
    </div>
  )
}

const StmtFun: FC<T.StmtFun> = (fun) => {
  return (
    <div>
      <span className="statement-keyword">fun</span>
      <span> </span>
      <span>(</span>
      <Link href={`/functions/${fun.name}`}>
        <a className="statement-fun">{`${fun.name}`}</a>
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
      <span className="statement-keyword">with</span>
      <span>{` {`}</span>
      <br />
      <Indent n={2}>
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
      <span>{`{`}</span>
      <span className="statement-ctr">{ctr.name}</span>
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

// Pretty print of IO args
const IO_ARGS: FC<{ term: T.Term; io: T.Ctr }> = ({ term, io }) => {
  let value = flatten_enum<T.Term_Variants>(term)
  if (io.name === 'IO.CALL' && value.$ === 'Num') {
    let name = num_to_name(value.numb)
    return (
      <Link href={`/functions/${name}`}>
        <a className="statement-reference">{name}</a>
      </Link>
    )
  } else if (
    io.name === 'IO.CALL' &&
    value.$ === 'Ctr' &&
    value.name.startsWith('Tuple')
  ) {
    let leng = value.args.length
    return (
      <>
        <span>[</span>
        {value.args.map((arg, i) => (
          <div className="inline" key={i}>
            <Term {...arg} />
            {i < leng - 1 ? <span>, </span> : null}
          </div>
        ))}
        <span>]</span>
      </>
    )
  } else {
    return <Term {...term} />
  }
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
        <span className="statement-io">{`!${name}`}</span>
        <span> </span>
        <span>{lamb_name}</span>
        {/* TODO: first term is function id, prettify to name */}
        {prps.map((prop, i) => (
          <div className="inline" key={i}>
            {` `}
            <IO_ARGS term={prop} io={ctr} />
          </div>
        ))}
        <br />
        <Indent n={4}>
          <Term {...value.body} />
        </Indent>
      </>
    )
  } else {
    return (
      <>
        <span className="statement-io">{`!${name}`}</span>
        {ctr.args.map((arg, i) => (
          <div className="inline" key={i}>
            {` `}
            <Term {...arg} />
          </div>
        ))}
      </>
    )
  }
}

const Fun: FC<T.Fun> = (fun) => {
  // Pretty prints
  if (fun.name.startsWith('IO')) {
    return <IO {...fun} />
  }

  return (
    <>
      <span>(</span>
      <Link href={`/functions/${fun.name}`}>
        <a className="statement-fun">{fun.name}</a>
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
      <span className="statement-op2">{num_to_oper(op2.oper)}</span>
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
      <span className="statement-keyword">dup</span>
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

const StmtRun: FC<T.StmtRun> = (run) => {
  return (
    <div>
      <span className="statement-keyword">run</span>
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
        <div className="statement" key={i}>
          <Statement {...statement} />
          <br />
        </div>
      ))}
    </>
  )
}

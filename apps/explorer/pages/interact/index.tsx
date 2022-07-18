import Editor from '@monaco-editor/react'
import type { NextPage } from 'next'
import { SetStateAction, useRef, useState } from 'react'

import { Button } from 'kindelia'

import { Results } from '@/components/Results'
import { post_interact_send, post_interact_test } from '@/lib/api'
import { BlockResultsJson } from '@/lib/types'

const InteractIndex: NextPage = () => {
  const editorRef = useRef<any>(null)
  const getCode = () => editorRef.current?.getValue()
  const [results, setResults] = useState<BlockResultsJson[]>([])
  const [message, setMessage] = useState('')

  const handle_test = () => {
    let code = getCode()
    post_interact_test(code, undefined)
      .then((res) => {
        setMessage('')
        setResults(res)
      })
      .catch((err) => {
        setMessage(`An error has ocurred: ${err}`)
      })
  }

  const handle_send = () => {
    let code = getCode()
    post_interact_send(code, undefined)
      .then((res) => {
        clear()
        setMessage('Code was sended susccessfully')
      })
      .catch((err) => {
        setMessage(`An error has ocurred: ${err}`)
      })
  }

  const clear = () => {
    setResults([])
  }

  return (
    <>
      <h1 className="text-2xl mb-5">Interact</h1>
      <div className="flex space-x-5">
        <div className="w-8/12">
          <Editor
            className="border-2 border-gray-400 p-1"
            height="70vh"
            defaultLanguage="kind"
            defaultValue="// some comment"
            onMount={(editor) => (editorRef.current = editor)}
          />
        </div>
        <div className="w-3/12">
          <div className="space-x-4 mt-5">
            <Button
              onClick={() => {
                handle_test()
              }}
            >
              test
            </Button>
            <Button
              onClick={() => {
                handle_send()
              }}
            >
              send
            </Button>
          </div>
          <div className="mt-5">
            {results.length !== 0 ? (
              <>
                <h2 className="text-2xl mb-3">Test result</h2>
                <Results results={results} />
              </>
            ) : null}
            {message !== '' ? <span>{message}</span> : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default InteractIndex

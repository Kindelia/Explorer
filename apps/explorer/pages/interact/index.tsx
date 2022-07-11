import type { NextPage } from 'next'
import { useRef } from 'react'

import { Button } from 'kindelia'

import Editor from '@monaco-editor/react'

const InteractIndex: NextPage = () => {
  const editorRef = useRef<any>(null)

  const getCode = () => editorRef.current?.getValue()

  const handleTest = () => {
    console.log('testing ' + getCode())
  }

  const handleSend = () => {
    console.log('sending ' + getCode())
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mb-5">Interact</h1>
      <Editor
        className="border-2 border-gray-400 p-1"
        height="70vh"
        defaultLanguage="kind"
        defaultValue="// some comment"
        onMount={(editor) => (editorRef.current = editor)}
      />
      <div className="space-x-4 mt-5">
        <Button onClick={handleTest}>test</Button>
        <Button onClick={handleSend}>send</Button>
      </div>
    </div>
  )
}

export default InteractIndex

import type { NextPage } from 'next'
import Editor from '@monaco-editor/react'
import { useRef } from 'react'

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
    <div className="flex min-h-screen flex-col py-2 px-8 lg:max-w-5xl lg:mx-auto">
      <h1 className="text-2xl mb-5">Interact</h1>
      <Editor
        height="70vh"
        defaultLanguage="kind"
        defaultValue="// some comment"
        onMount={(editor) => (editorRef.current = editor)}
      />
      <div className="space-x-4">
        <button onClick={handleTest}>test</button>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  )
}

export default InteractIndex

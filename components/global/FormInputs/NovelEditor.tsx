import React from 'react'
import { Editor } from 'novel'
import type { JSONContent, Editor as TipTapEditor } from '@tiptap/core';
import parse from 'html-react-parser';

type NovelEditorProps = {
  setContent: (content: string | undefined) => void
  content: string | undefined; 
}

const NovelEditor = ({
  setContent, 
  content
}: NovelEditorProps) => {

   

  return (

    <div>
        <label htmlFor="novel-editor">Novel Editor</label>
        <Editor
            disableLocalStorage={true}
            defaultValue={{
                "type": "doc",
                "content": [
                  { type: "paragraph", content: [{ type: "text", text: content }] }
                ],

            }}
            onDebouncedUpdate={(editor?: TipTapEditor) => {
                setContent(editor?.getHTML());
            }}
            className='shadow-md rounded-md dark:bg-slate-800'
            
        />
    </div>

  )
}

export default NovelEditor
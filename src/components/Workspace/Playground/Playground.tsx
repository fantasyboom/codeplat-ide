import React from 'react'
import PreferenceNav from './PreferenceNav/PreferenceNav'
import Split from 'react-split'
import ReactCodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'

type Props = {}

export default function Playground({}: Props) {
  return (
    <div className='flex flex-col bg-dark-layer-1 relative'>
        <PreferenceNav/>

        <Split className='h-[calc(100vh)]' direction='vertical' sizes={[60, 40]} minSize={60}>
          <div className='w-full overflow-auto'>
          <ReactCodeMirror value='const a = 1;' 
          theme={vscodeDark}
          extensions={[javascript()]}
          style={{fontSize:16}}/>
          </div>
          <div>Testcases here</div>


        </Split>
    </div>
  )
}
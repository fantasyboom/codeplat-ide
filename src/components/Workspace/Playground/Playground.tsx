import React, { useState } from 'react'
import PreferenceNav from './PreferenceNav/PreferenceNav'
import Split from 'react-split'
import ReactCodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
//import { python } from '@codemirror/lang-python'
import { encode } from 'base-64';
import { encode as utf8Encode } from 'utf8';


type Props = {}

export default function Playground({}: Props) {
  const [code, setCode] = useState('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const text = code;
  const bytes = utf8Encode(text);
  const encoded = encode(bytes);

  console.log(encoded);



  




  return (
    <div className='flex flex-col bg-dark-layer-1 relative'>
      <PreferenceNav/>

      <Split className='h-[calc(100vh)]' direction='vertical' sizes={[60, 40]} minSize={60}>
        <div className='w-full overflow-auto'>
          <ReactCodeMirror
            value={code} 
            theme={vscodeDark}
            extensions={[java()]}
            style={{fontSize:16}}
            onChange={(newCode) => handleCodeChange( newCode)} // Pass the editor, data, and newCode
          />
        </div>
        <div>
          <button className='bg-red-400'>SUBMIT </button>
        </div>
      </Split>
    </div>
  )
}

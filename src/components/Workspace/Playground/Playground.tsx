import React, { useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import ReactCodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { java } from '@codemirror/lang-java';
import { judgeCreate, judgeGetSubmission } from '../../../../services/judge0.api';

export default function Playground() {
    const [code, setCode] = useState('');
    const [token, setToken] = useState('');
    const [codeEvl,setCodeEvl] = useState(false);
    const [result,setResult]= useState('');

    const handleCodeChange = (newCode: React.SetStateAction<string>) => {
        setCode(newCode);
    };

    function utf8ToBase64(utf8String) {
        // Convert UTF-8 string to byte array
        const bytes = new TextEncoder().encode(utf8String);
        // Convert byte array to base64 string
        return btoa(String.fromCharCode(...bytes));
    }

    function base64ToUtf8(base64String) {
        // Decode base64 string to byte array
        const bytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
    
        // Convert byte array to UTF-8 string
        const utf8String = new TextDecoder().decode(bytes);
    
        return utf8String;
    }

    async function handleSubmission() {
        try {
            const encodedCode = utf8ToBase64(code);
            console.log(encodedCode);
            const response = await judgeCreate(encodedCode);
            console.log(response.token);
            setToken(response.token);
            codeEvaluation(); // Call codeEvaluation after successful submission
        } catch (error) {
            console.error('Error creating submission:', error);
            // Handle error creating submission
        }
    }

    async function codeEvaluation() {
        try {
            const submissionResponse = await judgeGetSubmission(token);
            console.log(submissionResponse);
            // Handle response from judgeGetSubmission

            //const
        } catch (error) {
            console.error('Error getting submission:', error);
            // Handle error getting submission
        }
    }

    return (
        <div className='flex flex-col bg-dark-layer-1 relative'>
            <PreferenceNav />

            <Split className='h-[calc(100vh)]' direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className='w-full overflow-auto'>
                    <ReactCodeMirror
                        value={code}
                        theme={vscodeDark}
                        extensions={[java()]}
                        style={{ fontSize: 16 }}
                        onChange={(newCode) => handleCodeChange(newCode)}
                    />
                </div>
                <div>
                    <button className='bg-red-400 text-white py-2 px-4 rounded-md' onClick={handleSubmission}>Submit</button>
                    {}
                </div>
            </Split>
        </div>
    );
}

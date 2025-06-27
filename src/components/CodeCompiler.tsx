import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Terminal, Download, Share, Code, Loader } from 'lucide-react';

interface CompilerProps {
  code: string;
  language: string;
  onExecute?: (result: ExecutionResult) => void;
}

interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
  memoryUsed: string;
  status: 'success' | 'error' | 'timeout';
  testResults?: Array<{
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }>;
}

export const CodeCompiler: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');

  const runCode = async () => {
    if (!code.trim()) return;
    
    setIsRunning(true);
    setError('');
    setOutput('');
    
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock output based on language
      if (language === 'javascript') {
        setOutput('Code executed successfully!\nHello, World!');
      } else if (language === 'python') {
        setOutput('Hello, World!\nCode executed successfully!');
      } else {
        setOutput('Program executed successfully!');
      }
    } catch (err) {
      setError('Execution failed: ' + (err as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  const shareCode = () => {
    const shareData = {
      title: 'My Code Snippet',
      text: code,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(code);
      console.log('Code copied to clipboard');
    }
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `code.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Online Code Compiler
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write, compile, and run your code in multiple programming languages
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Code Editor
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
              </select>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Enter your ${language} code here...`}
              className="w-full h-80 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
            />

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={runCode}
                disabled={!code.trim() || isRunning}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isRunning ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={shareCode}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadCode}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Output
              </label>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 h-80 overflow-y-auto">
              {error ? (
                <div className="text-red-400 font-mono text-sm whitespace-pre-wrap">
                  {error}
                </div>
              ) : (
                <div className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                  {output || 'No output yet. Run your code to see results.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

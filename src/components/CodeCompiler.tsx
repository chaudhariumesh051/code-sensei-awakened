import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, AlertTriangle, CheckCircle, Clock, MemoryStick } from 'lucide-react';
import { showToast } from './Toast';

interface CodeCompilerProps {
  code: string;
  language: string;
  onExecute: (result: any) => void;
}

export const CodeCompiler: React.FC<CodeCompilerProps> = ({ code, language, onExecute }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleExecute = async () => {
    setIsRunning(true);
    setResult(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      onExecute(data);
      showToast.success('Code executed successfully! ✅');
    } catch (e: any) {
      console.error("Execution error:", e);
      setResult({
        output: null,
        error: e.message || 'Execution failed',
        executionTime: 0,
        memoryUsed: 'N/A',
        status: 'error'
      });
      showToast.error('Code execution failed. Please check your code and try again.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Code Execution
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExecute}
          disabled={isRunning}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition-all"
        >
          <Play className="w-4 h-4" />
          <span>{isRunning ? 'Executing...' : 'Execute Code'}</span>
        </motion.button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 border border-gray-200 dark:border-dark-600">
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Result:
            </h4>
            {result.error ? (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <p className="text-sm">{result.error}</p>
              </div>
            ) : (
              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {result.output}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 border border-gray-200 dark:border-dark-600 flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Execution Time:
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {result.executionTime} ms
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 border border-gray-200 dark:border-dark-600 flex items-center space-x-3">
              <MemoryStick className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Memory Used:
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {result.memoryUsed}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

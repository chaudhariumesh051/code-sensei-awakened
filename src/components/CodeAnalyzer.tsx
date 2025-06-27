import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, AlertTriangle, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { GeminiService } from '../services/gemini';
import { showToast } from './Toast';

interface AnalysisResult {
  code: string;
  explanation: string;
  suggestions: string[];
  metrics: {
    complexity: number;
    readability: number;
    performance: number;
  };
}

interface CodeAnalyzerProps {
  code: string;
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const CodeAnalyzer: React.FC = () => {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      showToast.error('Please enter code to analyze');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await GeminiService.analyzeCode(code);
      setAnalysis(result);
      showToast.success('Code analysis complete! 🎉');
    } catch (error) {
      console.error('Error analyzing code:', error);
      showToast.error('Failed to analyze code. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Code Analyzer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get insights and suggestions for your code
        </p>
      </div>

      {/* Code Input Section */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-lg">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter Code to Analyze
        </label>
        <textarea
          value={code}
          onChange={handleCodeChange}
          placeholder="Paste your code here..."
          className="w-full h-48 px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Analyze Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAnalyzeCode}
        disabled={isAnalyzing || !code.trim()}
        className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
      >
        {isAnalyzing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <BarChart3 className="w-5 h-5" />
            </motion.div>
            <span>Analyzing Code...</span>
          </>
        ) : (
          <>
            <BarChart3 className="w-5 h-5" />
            <span>Analyze Code</span>
          </>
        )}
      </motion.button>

      {/* Analysis Result */}
      {analysis && (
        <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Analysis Result
          </h3>

          {/* Code Explanation */}
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Explanation
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {analysis.explanation}
            </p>
          </div>

          {/* Suggestions */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Suggestions
            </h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
};

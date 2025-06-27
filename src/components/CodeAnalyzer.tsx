
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Upload, Download } from 'lucide-react';
import { analyzeCode } from '../services/gemini';
import { showToast } from './Toast';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AnalysisResult {
  code: string;
  suggestions: string[];
  metrics: {
    complexity: number;
    maintainability: number;
    performance: number;
  };
}

export const CodeAnalyzer: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleAnalyze = async () => {
    if (!code.trim()) {
      showToast.error('Please enter code to analyze');
      return;
    }

    try {
      setLoading(true);
      const result = await analyzeCode(code, language);
      setAnalysis(result);
      
      // Save to database
      if (user) {
        const { error } = await supabase
          .from('code_analyses')
          .insert({
            user_id: user.id,
            title: `Code Analysis - ${new Date().toLocaleDateString()}`,
            code_content: code,
            language: language,
            analysis_result: result
          });

        if (error) throw error;

        // Update user stats
        await supabase.rpc('increment_user_stats', {
          user_id_param: user.id,
          stat_type: 'analysis'
        });
      }
      
      showToast.success('Code analyzed successfully!');
    } catch (error) {
      console.error('Analysis error:', error);
      showToast.error('Failed to analyze code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Code Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get AI-powered insights about your code
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Programming Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Code className="w-5 h-5" />
            <span>{loading ? 'Analyzing...' : 'Analyze Code'}</span>
          </button>
        </div>
      </div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Analysis Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Complexity</h4>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analysis.metrics.complexity}/10
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200">Maintainability</h4>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analysis.metrics.maintainability}/10
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">Performance</h4>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {analysis.metrics.performance}/10
              </p>
            </div>
          </div>

          {analysis.suggestions.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Suggestions for Improvement
              </h4>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

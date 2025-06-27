
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Copy } from 'lucide-react';
import { GeminiService } from '../services/gemini';
import { showToast } from './Toast';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ProblemSolution {
  problem: string;
  language: string;
  solution: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  testCases: string[];
}

export const ProblemSolver: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [solution, setSolution] = useState<ProblemSolution | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSolve = async () => {
    if (!problem.trim()) {
      showToast.error('Please describe the problem you want to solve');
      return;
    }

    try {
      setLoading(true);
      const result = await GeminiService.solveProblem(problem, language);
      
      const solutionData: ProblemSolution = {
        problem,
        language,
        solution: result.solution || '',
        explanation: result.explanation || '',
        timeComplexity: result.complexity?.time || 'O(n)',
        spaceComplexity: result.complexity?.space || 'O(1)',
        testCases: result.testCases?.map(tc => `Input: ${tc.input}, Output: ${tc.output}`) || []
      };
      
      setSolution(solutionData);

      // Save to database
      if (user) {
        const { error } = await supabase
          .from('problem_solutions')
          .insert({
            user_id: user.id,
            problem_title: problem.substring(0, 100),
            problem_description: problem,
            solution_code: solutionData.solution,
            language: language
          });

        if (error) throw error;
      }

      showToast.success('Problem solved successfully!');
    } catch (error) {
      console.error('Problem solving error:', error);
      showToast.error('Failed to solve problem');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Problem Solver
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Describe your coding problem and get AI-powered solutions
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
              Problem Description
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Describe the coding problem you want to solve..."
              className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            onClick={handleSolve}
            disabled={loading}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Brain className="w-5 h-5" />
            <span>{loading ? 'Solving...' : 'Solve Problem'}</span>
          </button>
        </div>
      </div>

      {solution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Solution
              </h3>
              <button
                onClick={() => copyToClipboard(solution.solution)}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {solution.solution}
              </code>
            </pre>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Explanation
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {solution.explanation}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Time Complexity
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {solution.timeComplexity}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Space Complexity
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {solution.spaceComplexity}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

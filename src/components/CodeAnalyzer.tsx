
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, FileText, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CodeAnalysisResult {
  language: string;
  complexity: 'Simple' | 'Moderate' | 'Complex';
  strengths: string[];
  improvements: string[];
  bugs: string[];
  explanation: string;
  annotations: Array<{
    line: number;
    type: 'info' | 'warning' | 'error' | 'tip';
    message: string;
  }>;
}

interface CodeAnalyzerProps {
  onAnalyze: (code: string) => Promise<CodeAnalysisResult>;
}

const CodeAnalyzer = ({ onAnalyze }: CodeAnalyzerProps) => {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState<CodeAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await onAnalyze(code);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'text-green-400';
      case 'Moderate': return 'text-yellow-400';
      case 'Complex': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAnnotationIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'tip': return <Lightbulb className="h-4 w-4 text-blue-400" />;
      default: return <CheckCircle className="h-4 w-4 text-green-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Code className="h-5 w-5 text-cyan-400 mr-2" />
          Code Analysis Tool
        </h3>
        
        <div className="space-y-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here for detailed analysis..."
            className="min-h-[200px] bg-gray-900 border-purple-500/30 text-white font-mono text-sm"
          />
          
          <Button 
            onClick={handleAnalyze}
            disabled={!code.trim() || isAnalyzing}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            <Play className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
          </Button>
        </div>
      </div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-semibold text-white mb-4">Analysis Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400">Language:</span>
                <span className="ml-2 text-cyan-400 font-semibold">{analysis.language}</span>
              </div>
              <div>
                <span className="text-gray-400">Complexity:</span>
                <span className={`ml-2 font-semibold ${getComplexityColor(analysis.complexity)}`}>
                  {analysis.complexity}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Explanation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FileText className="h-5 w-5 text-purple-400 mr-2" />
              Code Explanation
            </h4>
            <p className="text-gray-300 whitespace-pre-wrap">{analysis.explanation}</p>
          </div>

          {/* Annotations */}
          {analysis.annotations.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Line-by-Line Annotations</h4>
              <div className="space-y-3">
                {analysis.annotations.map((annotation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-900/50 rounded-lg">
                    {getAnnotationIcon(annotation.type)}
                    <div>
                      <span className="text-cyan-400 font-mono text-sm">Line {annotation.line}:</span>
                      <p className="text-gray-300 mt-1">{annotation.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {analysis.strengths.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                Code Strengths
              </h4>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {analysis.improvements.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
                Suggested Improvements
              </h4>
              <ul className="space-y-2">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-yellow-400 mr-2">⚡</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bugs */}
          {analysis.bugs.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                Potential Issues
              </h4>
              <ul className="space-y-2">
                {analysis.bugs.map((bug, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-red-400 mr-2">⚠</span>
                    {bug}
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

export default CodeAnalyzer;


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Lightbulb, Send, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { sensayApi } from '../services/sensayApi';
import { toast } from 'sonner';

interface Challenge {
  id: number;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  example: {
    input: string;
    output: string;
  };
  hints: string[];
  solution?: string;
}

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const predefinedChallenges: Challenge[] = [
    {
      id: 1,
      title: "FizzBuzz Classic",
      difficulty: "beginner",
      description: "Write a program that prints numbers from 1 to 100. For multiples of 3, print 'Fizz' instead of the number, and for multiples of 5, print 'Buzz'. For numbers that are multiples of both 3 and 5, print 'FizzBuzz'.",
      example: {
        input: "Numbers 1 to 15",
        output: "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz"
      },
      hints: [
        "Use the modulo operator (%) to check for multiples",
        "Check for multiples of both 3 and 5 first",
        "Use a loop to iterate through numbers 1 to 100"
      ],
      solution: `for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}`
    },
    {
      id: 2,
      title: "Palindrome Checker",
      difficulty: "intermediate",
      description: "Create a function that checks if a given string is a palindrome (reads the same forwards and backwards). Ignore spaces, punctuation, and case.",
      example: {
        input: "\"A man a plan a canal Panama\"",
        output: "true"
      },
      hints: [
        "Convert the string to lowercase and remove non-alphabetic characters",
        "Compare the string with its reverse",
        "You can use array methods or two pointers approach"
      ]
    },
    {
      id: 3,
      title: "Binary Tree Traversal",
      difficulty: "advanced",
      description: "Implement in-order traversal of a binary tree. Given a binary tree node structure, return an array of values in in-order sequence (left, root, right).",
      example: {
        input: "Tree: [1, null, 2, 3]",
        output: "[1, 3, 2]"
      },
      hints: [
        "Use recursion for elegant solution",
        "In-order: traverse left subtree, visit root, traverse right subtree",
        "Handle null nodes properly"
      ]
    }
  ];

  const generateAIChallenge = async (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    setIsGenerating(true);
    try {
      const response = await sensayApi.getCodingChallenge(difficulty);
      
      // Parse the AI response to create a challenge object
      const aiChallenge: Challenge = {
        id: Date.now(),
        title: `AI Generated ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Challenge`,
        difficulty,
        description: response.response,
        example: {
          input: "See description for details",
          output: "See description for expected output"
        },
        hints: ["Ask CodeSensei for hints if you need help!", "Break the problem into smaller steps", "Test your solution with different inputs"]
      };
      
      setSelectedChallenge(aiChallenge);
      setUserCode('');
      setFeedback(null);
      setAttempts(0);
      setShowHints(false);
      
      toast.success(`Generated new ${difficulty} challenge!`);
    } catch (error) {
      console.error('Error generating challenge:', error);
      toast.error('Failed to generate challenge. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const submitCode = async () => {
    if (!selectedChallenge || !userCode.trim()) {
      toast.error('Please enter your code solution');
      return;
    }

    setIsSubmitting(true);
    setAttempts(prev => prev + 1);

    try {
      const response = await sensayApi.reviewCode(userCode, 'javascript');
      setFeedback(response.response);
      
      // Simple success detection based on response content
      const isSuccess = response.response.toLowerCase().includes('good') || 
                       response.response.toLowerCase().includes('correct') ||
                       response.response.toLowerCase().includes('well done');
      
      if (isSuccess) {
        toast.success('Great job! Your solution looks good!');
      } else {
        toast.info('Review the feedback and try again!');
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      toast.error('Failed to get feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetChallenge = () => {
    setUserCode('');
    setFeedback(null);
    setAttempts(0);
    setShowHints(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="pt-16 min-h-screen p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Coding Challenges
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Test your skills with interactive coding challenges. Get AI-powered feedback and improve your programming abilities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Challenges List */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Code className="h-6 w-6 text-cyan-400 mr-2" />
              Available Challenges
            </h2>

            {/* AI Challenge Generators */}
            <div className="mb-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">Generate AI Challenge</h3>
              <div className="grid gap-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
                  <Button
                    key={difficulty}
                    onClick={() => generateAIChallenge(difficulty)}
                    disabled={isGenerating}
                    variant="outline"
                    className={`w-full border-${
                      difficulty === 'beginner' ? 'green' : 
                      difficulty === 'intermediate' ? 'yellow' : 'red'
                    }-500/50 text-${
                      difficulty === 'beginner' ? 'green' : 
                      difficulty === 'intermediate' ? 'yellow' : 'red'
                    }-400 hover:bg-${
                      difficulty === 'beginner' ? 'green' : 
                      difficulty === 'intermediate' ? 'yellow' : 'red'
                    }-400/10`}
                  >
                    {isGenerating ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Lightbulb className="h-4 w-4 mr-2" />
                    )}
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Predefined Challenges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Classic Challenges</h3>
              {predefinedChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => {
                    setSelectedChallenge(challenge);
                    resetChallenge();
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedChallenge?.id === challenge.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400'
                      : 'bg-white/10 backdrop-blur-sm border-purple-500/20 hover:border-cyan-400/40'
                  }`}
                >
                  <h4 className="font-semibold text-white mb-2">{challenge.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    challenge.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                    challenge.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Challenge Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedChallenge ? (
                <motion.div
                  key={selectedChallenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Challenge Info */}
                  <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-white">{selectedChallenge.title}</h2>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        selectedChallenge.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        selectedChallenge.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedChallenge.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{selectedChallenge.description}</p>
                    
                    <div className="bg-black/20 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Example:</h4>
                      <div className="text-sm text-gray-300">
                        <div><strong>Input:</strong> {selectedChallenge.example.input}</div>
                        <div><strong>Output:</strong> {selectedChallenge.example.output}</div>
                      </div>
                    </div>

                    {attempts > 0 && (
                      <div className="mt-4 text-sm text-gray-400">
                        Attempts: {attempts}
                      </div>
                    )}
                  </div>

                  {/* Code Editor */}
                  <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Code className="h-5 w-5 text-cyan-400 mr-2" />
                      Your Solution
                    </h3>
                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="Write your solution here..."
                      className="min-h-[200px] bg-black/50 border-gray-600 text-white font-mono text-sm"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-3">
                        <Button
                          onClick={submitCode}
                          disabled={isSubmitting || !userCode.trim()}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                        >
                          {isSubmitting ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4 mr-2" />
                          )}
                          Submit Code
                        </Button>
                        <Button
                          onClick={() => setShowHints(!showHints)}
                          variant="outline"
                          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-400/10"
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          {showHints ? 'Hide' : 'Show'} Hints
                        </Button>
                      </div>
                      <Button
                        onClick={resetChallenge}
                        variant="outline"
                        className="border-gray-500/50 text-gray-400 hover:bg-gray-400/10"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Hints */}
                  <AnimatePresence>
                    {showHints && selectedChallenge.hints && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6"
                      >
                        <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2" />
                          Hints
                        </h3>
                        <ul className="space-y-2">
                          {selectedChallenge.hints.map((hint, index) => (
                            <li key={index} className="flex items-start text-gray-300">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2"></div>
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Feedback */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
                      >
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <AlertCircle className="h-5 w-5 text-blue-400 mr-2" />
                          AI Feedback
                        </h3>
                        <div className="text-gray-300 whitespace-pre-wrap">{feedback}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-12 text-center"
                >
                  <Code className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-white mb-4">Select a Challenge</h2>
                  <p className="text-gray-300 mb-6">
                    Choose from our classic challenges or generate a new AI-powered challenge to test your skills
                  </p>
                  <Button
                    onClick={() => generateAIChallenge('beginner')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  >
                    Generate AI Challenge
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Challenges;

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Video, 
  Play, 
  ArrowRight, 
  Star, 
  Users, 
  Globe, 
  Cpu, 
  Clock 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Unlock Your Coding Potential with AI
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            Supercharge your learning with AI-powered code analysis, problem-solving, and video explanations.
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Get Started <ArrowRight className="inline-block ml-2" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Brain,
              title: 'AI Problem Solver',
              description: 'Stuck on a coding problem? Our AI provides step-by-step solutions and explanations.',
            },
            {
              icon: Code,
              title: 'Code Analysis',
              description: 'Understand code better with AI-powered analysis, identifying bugs and suggesting improvements.',
            },
            {
              icon: Video,
              title: 'AI Video Explanations',
              description: 'Learn visually with AI-generated video tutorials that break down complex concepts.',
            },
            {
              icon: Play,
              title: 'Interactive Tutorials',
              description: 'Engage with interactive coding tutorials and practice your skills in real-time.',
            },
            {
              icon: Star,
              title: 'Personalized Learning',
              description: 'Receive personalized recommendations and learning paths based on your skill level and goals.',
            },
            {
              icon: Users,
              title: 'Community Support',
              description: 'Connect with a community of learners and experts to get help and share your knowledge.',
            },
          ].map((feature, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mt-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Ready to Transform Your Coding Skills?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            Join our community and start your journey towards coding mastery today!
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-green-700 transition-colors"
            >
              Sign Up Now <ArrowRight className="inline-block ml-2" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

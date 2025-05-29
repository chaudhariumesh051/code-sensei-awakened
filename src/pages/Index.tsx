
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Lightbulb, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-32 pb-20 px-4 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="relative inline-block mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl opacity-20"
            />
            <Code className="h-20 w-20 text-cyan-400 relative z-10" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            CodeSensei
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            Your AI-Powered Coding Mentor
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Learn programming through interactive AI conversations, personalized lessons, and adaptive challenges. Master coding with the wisdom of artificial intelligence.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/chat">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Start Learning
                </Button>
              </motion.div>
            </Link>

            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-3 text-lg rounded-full transition-all duration-300"
                >
                  View Dashboard
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="h-6 w-6 text-cyan-400" />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Features That Empower Learning
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Interactive AI Chat",
                description: "Engage in natural conversations with our AI tutor powered by advanced language models."
              },
              {
                icon: Lightbulb,
                title: "Personalized Learning",
                description: "Adaptive learning paths that adjust to your skill level and learning pace."
              },
              {
                icon: Code,
                title: "Real-time Challenges",
                description: "Practice with dynamic coding challenges and receive instant AI-powered feedback."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block p-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-4"
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Master Coding with AI?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who are accelerating their learning with CodeSensei
          </p>
          <Link to="/chat">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Start Your Journey
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;

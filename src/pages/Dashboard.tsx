
import { motion } from 'framer-motion';
import { Code, Lightbulb, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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

  const stats = [
    { label: 'Lessons Completed', value: 12, icon: Lightbulb, color: 'from-yellow-400 to-orange-400' },
    { label: 'Challenges Solved', value: 8, icon: Code, color: 'from-green-400 to-blue-400' },
    { label: 'Hours Learned', value: 24, icon: Code, color: 'from-purple-400 to-pink-400' },
    { label: 'Streak Days', value: 5, icon: ArrowUp, color: 'from-cyan-400 to-blue-400' }
  ];

  const recentLessons = [
    { title: 'JavaScript Fundamentals', progress: 100, difficulty: 'Beginner' },
    { title: 'React Components', progress: 75, difficulty: 'Intermediate' },
    { title: 'API Integration', progress: 45, difficulty: 'Intermediate' },
    { title: 'Database Design', progress: 20, difficulty: 'Advanced' }
  ];

  const recommendations = [
    { title: 'Learn Python Basics', description: 'Perfect next step after JavaScript', difficulty: 'Beginner' },
    { title: 'Master CSS Grid', description: 'Improve your layout skills', difficulty: 'Intermediate' },
    { title: 'Node.js Backend', description: 'Build server-side applications', difficulty: 'Advanced' }
  ];

  return (
    <div className="pt-16 min-h-screen p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Learning Dashboard
          </h1>
          <p className="text-gray-300 text-lg">Track your progress and discover new learning opportunities</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center"
            >
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Lessons */}
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Lightbulb className="h-6 w-6 text-yellow-400 mr-2" />
              Recent Lessons
            </h2>
            <div className="space-y-4">
              {recentLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium">{lesson.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lesson.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${lesson.progress}%` }}
                      transition={{ delay: 0.5 + 0.1 * index, duration: 1 }}
                      className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                    />
                  </div>
                  <p className="text-gray-400 text-sm">{lesson.progress}% Complete</p>
                </motion.div>
              ))}
            </div>
            <Link to="/lessons">
              <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                View All Lessons
              </Button>
            </Link>
          </motion.div>

          {/* Recommendations */}
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <ArrowUp className="h-6 w-6 text-green-400 mr-2" />
              Recommended for You
            </h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-all cursor-pointer border border-transparent hover:border-cyan-400/30"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium">{rec.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      rec.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{rec.description}</p>
                </motion.div>
              ))}
            </div>
            <Link to="/chat">
              <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                Ask AI for More Recommendations
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/chat">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8">
                  Start AI Chat
                </Button>
              </motion.div>
            </Link>
            <Link to="/challenges">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8">
                  Take Challenge
                </Button>
              </motion.div>
            </Link>
            <Link to="/lessons">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8">
                  Browse Lessons
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

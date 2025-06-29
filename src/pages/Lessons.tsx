import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code, ArrowDown, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Lessons = () => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1]);

  const lessons = [
    {
      id: 0,
      title: "Variables and Data Types",
      difficulty: "Beginner",
      duration: "15 min",
      description: "Learn the fundamentals of storing and working with different types of data in programming.",
      content: {
        explanation: "Variables are containers for storing data values. In programming, we use different data types to represent different kinds of information.",
        codeExample: `// JavaScript Variables and Data Types
let name = "Alice";        // String
let age = 25;             // Number
let isStudent = true;     // Boolean
let courses = ["HTML", "CSS", "JavaScript"]; // Array

console.log(name);        // Output: Alice
console.log(typeof age);  // Output: number`,
        keyPoints: [
          "Variables store data values",
          "Different data types serve different purposes", 
          "Use descriptive variable names",
          "JavaScript is dynamically typed"
        ]
      }
    },
    {
      id: 1,
      title: "Functions and Scope",
      difficulty: "Beginner",
      duration: "20 min",
      description: "Master the art of creating reusable code blocks and understanding variable scope.",
      content: {
        explanation: "Functions are reusable blocks of code that perform specific tasks. Scope determines where variables can be accessed in your code.",
        codeExample: `// Function Declaration
function greetUser(name) {
    const greeting = "Hello, " + name + "!";
    return greeting;
}

// Function Call
const message = greetUser("Alice");
console.log(message); // Output: Hello, Alice!

// Arrow Function
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // Output: 20`,
        keyPoints: [
          "Functions promote code reusability",
          "Parameters allow functions to accept input",
          "Return statements provide output",
          "Scope affects variable accessibility"
        ]
      }
    },
    {
      id: 2,
      title: "Loops and Iteration",
      difficulty: "Intermediate",
      duration: "25 min",
      description: "Learn how to repeat code execution efficiently using different types of loops.",
      content: {
        explanation: "Loops allow you to execute code repeatedly based on certain conditions. They're essential for processing arrays, handling user input, and automating repetitive tasks.",
        codeExample: `// For Loop
for (let i = 0; i < 5; i++) {
    console.log("Iteration: " + i);
}

// While Loop
let count = 0;
while (count < 3) {
    console.log("Count: " + count);
    count++;
}

// Array Iteration
const fruits = ["apple", "banana", "orange"];
fruits.forEach(fruit => {
    console.log("I like " + fruit);
});`,
        keyPoints: [
          "For loops are great for known iterations",
          "While loops work with conditions",
          "forEach is perfect for arrays",
          "Avoid infinite loops"
        ]
      }
    },
    {
      id: 3,
      title: "Objects and Classes",
      difficulty: "Intermediate",
      duration: "30 min",
      description: "Understand object-oriented programming concepts and how to model real-world entities.",
      content: {
        explanation: "Objects are collections of properties and methods. Classes provide a template for creating objects with similar characteristics.",
        codeExample: `// Object Literal
const student = {
    name: "Alice",
    age: 20,
    courses: ["Math", "Science"],
    study: function() {
        console.log(this.name + " is studying");
    }
};

// Class Definition
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return \`Hi, I'm \${this.name} and I'm \${this.age} years old\`;
    }
}

const person1 = new Person("Bob", 25);
console.log(person1.introduce());`,
        keyPoints: [
          "Objects group related data and functions",
          "Classes are blueprints for objects",
          "Methods are functions inside objects",
          "Constructor sets initial values"
        ]
      }
    },
    {
      id: 4,
      title: "Asynchronous Programming",
      difficulty: "Advanced",
      duration: "35 min",
      description: "Master promises, async/await, and handling asynchronous operations effectively.",
      content: {
        explanation: "Asynchronous programming allows your code to perform other tasks while waiting for time-consuming operations to complete.",
        codeExample: `// Promise Example
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "User " + userId });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

// Async/Await
async function getUser() {
    try {
        const user = await fetchUserData(1);
        console.log("User:", user);
    } catch (error) {
        console.error("Error:", error);
    }
}

getUser();`,
        keyPoints: [
          "Promises handle asynchronous operations",
          "Async/await makes promises easier to read",
          "Always handle errors with try/catch",
          "Don't block the main thread"
        ]
      }
    }
  ];

  const isLessonUnlocked = (lessonId: number) => {
    if (lessonId === 0) return true;
    return completedLessons.includes(lessonId - 1);
  };

  const markLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
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
            Interactive Lessons
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Master programming concepts through our carefully crafted lessons with animated explanations and hands-on examples
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Lightbulb className="h-6 w-6 text-yellow-400 mr-2" />
              Learning Path
            </h2>
            <div className="space-y-4">
              {lessons.map((lesson, index) => {
                const isUnlocked = isLessonUnlocked(lesson.id);
                const isCompleted = completedLessons.includes(lesson.id);
                const isSelected = selectedLesson === lesson.id;
                
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400'
                        : isUnlocked
                        ? 'bg-white/10 backdrop-blur-sm border-purple-500/20 hover:border-cyan-400/40'
                        : 'bg-gray-800/50 border-gray-600 opacity-50'
                    }`}
                    onClick={() => isUnlocked && setSelectedLesson(lesson.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                          {lesson.title}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            lesson.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {lesson.difficulty}
                          </span>
                          <span className="text-xs text-gray-400">{lesson.duration}</span>
                        </div>
                        <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                          {lesson.description}
                        </p>
                      </div>
                      <div className="ml-3">
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : isUnlocked ? (
                          <Code className="h-6 w-6 text-cyan-400" />
                        ) : (
                          <Lock className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Lesson Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedLesson !== null ? (
                <motion.div
                  key={selectedLesson}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {lessons[selectedLesson].title}
                    </h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-300 text-lg leading-relaxed"
                    >
                      {lessons[selectedLesson].content.explanation}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Code className="h-5 w-5 text-cyan-400 mr-2" />
                      Code Example
                    </h3>
                    <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                      <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                        <code>{lessons[selectedLesson].content.codeExample}</code>
                      </pre>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Key Points</h3>
                    <ul className="space-y-2">
                      {lessons[selectedLesson].content.keyPoints.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + 0.1 * index }}
                          className="flex items-center text-gray-300"
                        >
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex space-x-4"
                  >
                    <Button
                      onClick={() => markLessonComplete(selectedLesson)}
                      disabled={completedLessons.includes(selectedLesson)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6"
                    >
                      {completedLessons.includes(selectedLesson) ? 'Completed' : 'Mark Complete'}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6"
                    >
                      Practice Exercise
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-12 text-center"
                >
                  <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-white mb-4">Select a Lesson</h2>
                  <p className="text-gray-300">
                    Choose a lesson from the learning path to start your coding journey
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Lessons;

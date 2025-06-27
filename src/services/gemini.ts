
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('VITE_GEMINI_API_KEY is not configured');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface CodeAnalysisResult {
  summary: string;
  bugs: string[];
  optimizations: string[];
  complexity: {
    time: string;
    space: string;
  };
  score: number;
  explanation: string;
  flowchart?: string;
}

export interface ProblemSolution {
  solution: string;
  explanation: string;
  complexity: {
    time: string;
    space: string;
  };
  testCases: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
}

export class GeminiService {
  static async testConnection(): Promise<boolean> {
    if (!genAI) {
      console.error('Gemini API not configured');
      return false;
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      await model.generateContent('Test connection');
      return true;
    } catch (error) {
      console.error('Gemini API connection failed:', error);
      return false;
    }
  }

  static async analyzeCode(code: string, language: string): Promise<CodeAnalysisResult> {
    if (!genAI) {
      throw new Error('Gemini API not configured');
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        Analyze this ${language} code and provide:
        1. A brief summary
        2. List of bugs or issues
        3. Optimization suggestions
        4. Time and space complexity
        5. A score out of 10
        6. Detailed explanation
        7. A simple flowchart in Mermaid syntax

        Code:
        ${code}

        Please respond in JSON format with these fields:
        {
          "summary": "Brief summary",
          "bugs": ["bug1", "bug2"],
          "optimizations": ["opt1", "opt2"],
          "complexity": {"time": "O(n)", "space": "O(1)"},
          "score": 8,
          "explanation": "Detailed explanation",
          "flowchart": "graph TD\\n    A[Start] --> B[Process]"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        const parsed = JSON.parse(text);
        return parsed;
      } catch {
        // Fallback if JSON parsing fails
        return {
          summary: "Code analysis completed",
          bugs: ["Unable to parse detailed analysis"],
          optimizations: ["Review code structure and logic"],
          complexity: { time: "Unknown", space: "Unknown" },
          score: 5,
          explanation: text,
          flowchart: "graph TD\n    A[Start] --> B[Analysis] --> C[End]"
        };
      }
    } catch (error) {
      console.error('Code analysis failed:', error);
      throw error;
    }
  }

  static async solveProblem(problem: string, language: string): Promise<ProblemSolution> {
    if (!genAI) {
      throw new Error('Gemini API not configured');
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        Solve this programming problem in ${language}:
        ${problem}

        Provide:
        1. Complete solution code
        2. Step-by-step explanation
        3. Time and space complexity analysis
        4. Test cases with inputs, outputs, and explanations

        Respond in JSON format:
        {
          "solution": "code here",
          "explanation": "detailed explanation",
          "complexity": {"time": "O(n)", "space": "O(1)"},
          "testCases": [{"input": "example", "output": "result", "explanation": "why"}]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        return JSON.parse(text);
      } catch {
        return {
          solution: text,
          explanation: "Solution generated successfully",
          complexity: { time: "Unknown", space: "Unknown" },
          testCases: []
        };
      }
    } catch (error) {
      console.error('Problem solving failed:', error);
      throw error;
    }
  }

  static async optimizeCode(code: string, language: string): Promise<{
    optimizedCode: string;
    improvements: string[];
    explanation: string;
  }> {
    if (!genAI) {
      throw new Error('Gemini API not configured');
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        Optimize this ${language} code:
        ${code}

        Provide:
        1. Optimized version of the code
        2. List of improvements made
        3. Explanation of optimizations

        Respond in JSON format:
        {
          "optimizedCode": "optimized code here",
          "improvements": ["improvement1", "improvement2"],
          "explanation": "detailed explanation"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        return JSON.parse(text);
      } catch {
        return {
          optimizedCode: code,
          improvements: ["Code optimization completed"],
          explanation: text
        };
      }
    } catch (error) {
      console.error('Code optimization failed:', error);
      throw error;
    }
  }

  static async chatWithAssistant(message: string): Promise<string> {
    if (!genAI) {
      throw new Error('Gemini API not configured');
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        You are a helpful coding assistant. Answer this question about programming:
        ${message}
        
        Provide a helpful, concise response.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Chat with assistant failed:', error);
      throw error;
    }
  }
}

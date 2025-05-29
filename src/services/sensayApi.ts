const SENSAY_API_KEY = "27f03b04363ac823a181fe29d13fe1d7735632abdb6cdd28c4d6e77c0b661985";
const SENSAY_API_URL = "https://api.sensay.ai/v1/wisdom";

export interface SensayMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface SensayResponse {
  response: string;
  confidence?: number;
  sources?: string[];
}

export interface CodeAnalysisResult {
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

class SensayAPIService {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = SENSAY_API_KEY;
    this.baseURL = SENSAY_API_URL;
  }

  async sendMessage(message: string, context?: string): Promise<SensayResponse> {
    try {
      console.log('Sending message to Sensay API:', message);
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: message,
          context: context || "You are CodeSensei, an expert AI coding tutor. Provide helpful, educational responses about programming concepts, best practices, and coding challenges. Be encouraging and explain things clearly for beginners while also providing valuable insights for more advanced learners.",
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Sensay API response:', data);
      
      return {
        response: data.response || data.answer || "I'm here to help you learn coding! Ask me anything about programming.",
        confidence: data.confidence,
        sources: data.sources,
      };
    } catch (error) {
      console.error('Error calling Sensay API:', error);
      
      // Fallback response with coding-focused content
      const fallbackResponses = [
        "I'm here to help you master programming! What would you like to learn about today?",
        "Let's dive into coding together! Ask me about any programming concept you'd like to understand better.",
        "Ready to level up your coding skills? I can help with languages, frameworks, algorithms, and best practices!",
        "I'm your AI coding mentor. Whether you're a beginner or looking to advance your skills, I'm here to guide you!",
      ];
      
      return {
        response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        confidence: 0.8,
      };
    }
  }

  async analyzeCode(code: string): Promise<CodeAnalysisResult> {
    try {
      console.log('Analyzing code with Sensay API');
      
      const analysisPrompt = `Please analyze this code and provide a detailed analysis in the following JSON format:

{
  "language": "detected programming language",
  "complexity": "Simple|Moderate|Complex",
  "explanation": "detailed explanation of what this code does",
  "strengths": ["list of good practices found"],
  "improvements": ["list of suggested improvements"],
  "bugs": ["list of potential issues or bugs"],
  "annotations": [
    {
      "line": line_number,
      "type": "info|warning|error|tip",
      "message": "explanation for this line"
    }
  ]
}

Code to analyze:
\`\`\`
${code}
\`\`\`

Provide a comprehensive analysis focusing on code quality, best practices, potential issues, and educational insights.`;

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: analysisPrompt,
          context: "You are CodeSensei, an expert code analyzer. Analyze code thoroughly and provide educational feedback in the requested JSON format.",
          max_tokens: 1000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Code analysis response:', data);
      
      // Try to parse JSON from the response
      let analysisResult;
      try {
        const jsonMatch = data.response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Failed to parse analysis response:', parseError);
        // Fallback analysis
        analysisResult = this.generateFallbackAnalysis(code);
      }
      
      return analysisResult;
    } catch (error) {
      console.error('Error analyzing code:', error);
      return this.generateFallbackAnalysis(code);
    }
  }

  private generateFallbackAnalysis(code: string): CodeAnalysisResult {
    const lines = code.split('\n');
    const detectedLanguage = this.detectLanguage(code);
    
    return {
      language: detectedLanguage,
      complexity: lines.length > 50 ? 'Complex' : lines.length > 20 ? 'Moderate' : 'Simple',
      explanation: `This appears to be ${detectedLanguage} code with ${lines.length} lines. The code structure suggests it's a ${this.getCodePurpose(code)}.`,
      strengths: [
        "Code is readable and well-formatted",
        "Appropriate use of programming constructs"
      ],
      improvements: [
        "Consider adding more comments for clarity",
        "Review variable naming conventions",
        "Consider breaking down into smaller functions if applicable"
      ],
      bugs: [],
      annotations: [
        {
          line: 1,
          type: 'info',
          message: 'Code analysis completed - consider the suggestions below'
        }
      ]
    };
  }

  private detectLanguage(code: string): string {
    if (code.includes('function') || code.includes('const') || code.includes('let')) return 'JavaScript';
    if (code.includes('def ') || code.includes('import ')) return 'Python';
    if (code.includes('public class') || code.includes('System.out')) return 'Java';
    if (code.includes('#include') || code.includes('int main')) return 'C/C++';
    if (code.includes('<?php')) return 'PHP';
    return 'Unknown';
  }

  private getCodePurpose(code: string): string {
    if (code.includes('function') || code.includes('def ')) return 'function or method definition';
    if (code.includes('class ')) return 'class definition';
    if (code.includes('for ') || code.includes('while ')) return 'iterative algorithm';
    return 'program or script';
  }

  async getCodingChallenge(difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Promise<SensayResponse> {
    const prompt = `Generate a ${difficulty} level coding challenge. Include:
    1. Problem description
    2. Example input/output
    3. Hints for solving
    4. Learning objectives
    
    Make it educational and engaging for someone learning to code.`;
    
    return this.sendMessage(prompt, "You are CodeSensei, creating educational coding challenges.");
  }

  async explainConcept(concept: string): Promise<SensayResponse> {
    const prompt = `Explain the programming concept "${concept}" in a clear, beginner-friendly way. Include:
    1. Simple definition
    2. Why it's important
    3. Basic example
    4. Common use cases
    
    Make it educational and easy to understand.`;
    
    return this.sendMessage(prompt, "You are CodeSensei, explaining programming concepts clearly.");
  }

  async reviewCode(code: string, language: string): Promise<SensayResponse> {
    const prompt = `Review this ${language} code and provide constructive feedback:
    
    \`\`\`${language}
    ${code}
    \`\`\`
    
    Please provide:
    1. Code quality assessment
    2. Suggestions for improvement
    3. Best practices recommendations
    4. Potential issues or bugs`;
    
    return this.sendMessage(prompt, "You are CodeSensei, providing helpful code reviews and suggestions.");
  }
}

export const sensayApi = new SensayAPIService();

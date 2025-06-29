
const SENSAY_API_KEY = "017037ea6362465dab3d8de04f8f13ae6a8acd82ee23f4e9100b0e0246bd99bc";
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

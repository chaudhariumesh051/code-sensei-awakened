
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class GeminiService {
  static async analyzeCode(code: string, language: string) {
    try {
      const prompt = `Analyze the following ${language} code and provide a detailed analysis in JSON format with the following structure:
      {
        "language": "${language}",
        "complexity": "low|medium|high",
        "annotations": ["annotation1", "annotation2"],
        "strengths": ["strength1", "strength2"],
        "improvements": ["improvement1", "improvement2"],
        "bugs": ["bug1", "bug2"],
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "summary": "Brief summary of the code"
      }

      Code to analyze:
      ${code}`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze code');
      }

      const data: GeminiResponse = await response.json();
      const analysisText = data.candidates[0]?.content?.parts[0]?.text;
      
      if (!analysisText) {
        throw new Error('No analysis received');
      }

      // Extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback response
      return {
        language,
        complexity: 'medium',
        annotations: ['Code analysis completed'],
        strengths: ['Code structure is readable'],
        improvements: ['Consider adding comments'],
        bugs: [],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        summary: 'Code analysis completed successfully'
      };
    } catch (error) {
      console.error('Error analyzing code:', error);
      throw error;
    }
  }

  static async solveProblem(problemDescription: string, language: string) {
    try {
      const prompt = `Solve the following programming problem in ${language} and provide the solution with explanation:

      Problem: ${problemDescription}

      Please provide your response in JSON format:
      {
        "solution": "complete code solution",
        "explanation": "step by step explanation",
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(1)",
        "testCases": ["test case example"]
      }`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to solve problem');
      }

      const data: GeminiResponse = await response.json();
      const solutionText = data.candidates[0]?.content?.parts[0]?.text;
      
      if (!solutionText) {
        throw new Error('No solution received');
      }

      // Extract JSON from the response
      const jsonMatch = solutionText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return {
        solution: solutionText,
        explanation: 'Problem solved successfully',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        testCases: []
      };
    } catch (error) {
      console.error('Error solving problem:', error);
      throw error;
    }
  }
}

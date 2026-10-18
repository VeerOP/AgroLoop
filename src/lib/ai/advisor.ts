import { GoogleGenerativeAI } from '@google/generative-ai';
import { AdvisoryRequestInput, AdvisoryResponseOutput, AdvisoryResponseSchema } from './schemas';
import { buildAgronomistPrompt } from './prompts';
import { getFallbackAgronomistAdvice } from './fallback-advisor';

export async function getAgronomistAdvice(input: AdvisoryRequestInput): Promise<{
  response: AdvisoryResponseOutput;
  sourceType: 'gemini_ai' | 'deterministic_fallback';
}> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your-gemini-api-key')) {
    console.log('[AgroLoop AI] GEMINI_API_KEY not found. Using deterministic fallback agronomist advisor.');
    return {
      response: getFallbackAgronomistAdvice(input),
      sourceType: 'deterministic_fallback',
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = buildAgronomistPrompt(input);

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const text = result.response.text();
    const json = JSON.parse(text);
    const parsed = AdvisoryResponseSchema.parse(json);

    return {
      response: parsed,
      sourceType: 'gemini_ai',
    };
  } catch (error) {
    console.error('[AgroLoop AI Error] Gemini call failed, gracefully falling back to rules engine:', error);
    return {
      response: getFallbackAgronomistAdvice(input),
      sourceType: 'deterministic_fallback',
    };
  }
}

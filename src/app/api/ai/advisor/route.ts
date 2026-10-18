import { NextRequest, NextResponse } from 'next/server';
import { AdvisoryRequestSchema } from '@/lib/ai/schemas';
import { getAgronomistAdvice } from '@/lib/ai/advisor';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = AdvisoryRequestSchema.parse(body);

    const result = await getAgronomistAdvice(validated);

    return NextResponse.json({
      success: true,
      data: result.response,
      sourceType: result.sourceType,
    });
  } catch (error: any) {
    console.error('API /api/ai/advisor error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to process agronomist query',
      },
      { status: 400 }
    );
  }
}

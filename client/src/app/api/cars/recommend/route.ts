import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { budget, type, usage, preferences } = await req.json();

    if (!budget || !type) {
      return NextResponse.json({ message: 'Budget and car type are required.' }, { status: 400 });
    }

    const prompt = `You are an expert car recommendation AI. 
    Based on the following user requirements, provide exactly 3 specific car recommendations.
    Budget: ${budget}
    Preferred Type: ${type}
    Main Usage: ${usage}
    Additional Preferences: ${preferences}
    
    CRITICAL: You MUST return ONLY a valid JSON array. Do not include any text before or after the JSON.
    Structure:
    [
      { 
        "name": "Full Car Model Name (e.g., Toyota Camry 2024)", 
        "price": "Price in USD or Local Currency", 
        "description": "2-sentence summary", 
        "pros": ["pro1", "pro2"], 
        "cons": ["con1", "con2"],
        "specs": { 
          "engine": "e.g., 2.5L 4-Cylinder", 
          "mileage": "e.g., 28 City / 39 Highway", 
          "transmission": "e.g., 8-Speed Automatic" 
        },
        "image_query": "The most specific name of the car for an image search"
      }
    ]`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a professional car consultant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);

    return NextResponse.json(recommendations);
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    return NextResponse.json({ message: 'Failed to fetch recommendations.' }, { status: 500 });
  }
}

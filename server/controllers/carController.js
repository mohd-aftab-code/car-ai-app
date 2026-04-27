const axios = require('axios');

/**
 * Controller to handle car recommendations using Groq AI (Llama 3.3)
 */
const getCarRecommendations = async (req, res) => {
  const { budget, type, usage, preferences } = req.body;

  // Basic validation
  if (!budget || !type) {
    return res.status(400).json({ message: 'Budget and car type are required to provide recommendations.' });
  }

  try {
    // Construct the AI prompt with strict JSON output instructions
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

    // Call Groq API (using the key provided in .env)
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

    let recommendations;
    try {
      const content = response.data.choices[0].message.content;
      
      // Extract JSON if AI includes extra text or markdown code blocks
      const jsonMatch = content.match(/\[.*\]/s);
      recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      return res.status(500).json({ message: 'The AI returned an invalid response format. Please try again.' });
    }

    res.json(recommendations);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to communicate with the AI service. Please check your API key.' });
  }
};

module.exports = {
  getCarRecommendations
};

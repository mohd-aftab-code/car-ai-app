export interface CarRecommendation {
  name: string;
  price: string;
  description: string;
  pros: string[];
  cons: string[];
  specs: {
    engine: string;
    mileage: string;
    transmission: string;
  };
  image_query: string;
}

export interface RecommendationRequest {
  budget: string;
  type: string;
  usage: string;
  preferences: string;
}

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface RegionalPotential {
  id: string;
  name: string;
  type: 'agriculture' | 'tourism' | 'industry' | 'resource' | 'social';
  capacity: string;
  location: { x: number; y: number };
  description: string;
}

export interface InfrastructurePlan {
  projectName: string;
  type: string;
  priority: 'High' | 'Medium' | 'Low';
  rationale: string;
  estimatedImpact: string;
}

export async function generateInfrastructurePlan(potentials: RegionalPotential[]): Promise<InfrastructurePlan[]> {
  const prompt = `Analisis data potensi wilayah berikut dan berikan 3 rekomendasi proyek infrastruktur yang strategis untuk mengoptimalkan potensi tersebut. Berikan dalam format JSON.
  
  Data Potensi:
  ${potentials.map(p => `- ${p.name} (${p.type}): ${p.description}`).join('\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah ahli perencanaan wilayah dan infrastruktur strategis. Berikan rekomendasi yang taktis, realistis, dan berorientasi pada pertumbuhan ekonomi regional.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              projectName: { type: Type.STRING },
              type: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
              rationale: { type: Type.STRING },
              estimatedImpact: { type: Type.STRING }
            },
            required: ['projectName', 'type', 'priority', 'rationale', 'estimatedImpact']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AI Error:", error);
    return [];
  }
}

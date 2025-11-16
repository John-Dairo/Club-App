import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function searchClubsWithAI(
  query: string,
  clubs: any[],
  events: any[]
): Promise<{
  clubs: any[];
  events: any[];
  explanation: string;
}> {
  const systemPrompt = `You are a helpful AI assistant that helps users discover clubs and events based on their interests. 
Analyze the user's search query and match it with the most relevant clubs and events from the provided data.
Consider semantic meaning, interests, activities, and context when matching.

Return your response in JSON format with:
{
  "clubIds": ["id1", "id2", ...],
  "eventIds": ["id1", "id2", ...],
  "explanation": "Brief explanation of why these results match the query"
}`;

  const userPrompt = `User query: "${query}"

Available clubs:
${JSON.stringify(
  clubs.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
    category: c.category,
  })),
  null,
  2
)}

Available events:
${JSON.stringify(
  events.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    eventDate: e.eventDate,
  })),
  null,
  2
)}

Find the most relevant clubs and events for this query.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    const matchedClubs = clubs.filter((c) =>
      result.clubIds?.includes(c.id)
    );
    const matchedEvents = events.filter((e) =>
      result.eventIds?.includes(e.id)
    );

    return {
      clubs: matchedClubs,
      events: matchedEvents,
      explanation: result.explanation || "Here are your search results.",
    };
  } catch (error: any) {
    console.error("AI search error:", error);
    
    const lowerQuery = query.toLowerCase();
    const fallbackClubs = clubs.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.category.toLowerCase().includes(lowerQuery)
    );
    const fallbackEvents = events.filter(
      (e) =>
        e.title.toLowerCase().includes(lowerQuery) ||
        e.description.toLowerCase().includes(lowerQuery)
    );

    return {
      clubs: fallbackClubs,
      events: fallbackEvents,
      explanation: "Search results based on keyword matching.",
    };
  }
}

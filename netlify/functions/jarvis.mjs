
export default async (request) => {
  const headers = {
    "Content-Type": "application/json"
  };

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Use POST." }),
      { status: 405, headers }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "Jarvis is not configured yet. Add ANTHROPIC_API_KEY in Netlify."
      }),
      { status: 500, headers }
    );
  }

  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Please enter a message." }),
        { status: 400, headers }
      );
    }

    const response = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: prompt.slice(0, 12000)
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: data.error?.message || "Claude API request failed."
        }),
        { status: 502, headers }
      );
    }

    const answer = (data.content || [])
      .filter(item => item.type === "text")
      .map(item => item.text)
      .join("\n");

    return new Response(
      JSON.stringify({ answer }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Jarvis could not process that message." }),
      { status: 500, headers }
    );
  }
};


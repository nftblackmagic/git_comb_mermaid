import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { content, diagramType = "Flowcharts" } = await req.json();

  try {
    // Call Claude API using the SDK
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4096,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are tasked with creating a Mermaid diagram based on real code. Your goal is to visually represent the structure and relationships within the given code using a Mermaid diagram.
    
    Here is the code you will be working with:
    
    <code>
    ${content}
    </code>
    
    The type of diagram you should create is:
    
    <diagram_type>${diagramType}</diagram_type>
    
    To complete this task, follow these steps:
    
    1. Carefully analyze the provided code, paying attention to its structure, classes, functions, and relationships.
    
    2. Identify the key elements that should be represented in the Mermaid diagram based on the specified diagram type. This may include classes, methods, inheritance relationships, function calls, or other relevant components.
    
    3. Create a Mermaid diagram that accurately represents the structure and relationships found in the code. Use appropriate Mermaid syntax for the specified diagram type.
    
    4. Ensure that your diagram is clear, concise, and accurately reflects the important aspects of the code.
    
    5. If there are any ambiguities or assumptions you need to make while creating the diagram, note them in your explanation.
    
    Present your final output in the following format:
    
    <explanation>
    Provide a brief explanation of your diagram, including any key decisions you made or assumptions you had to make while creating it.
    </explanation>
    
    <mermaid>
    Insert your Mermaid diagram code here. Make sure it's properly formatted and uses correct Mermaid syntax for the specified diagram type.
    </mermaid>
    
    Remember to focus on the most important aspects of the code that are relevant to the specified diagram type. Your goal is to create a clear and accurate visual representation of the code's structure and relationships.`,
            },
          ],
        },
      ],
    });

    // Extract the assistant's response
    const assistantResponse =
      response.content[0].type === "text" ? response.content[0].text : "";
    // Debug: Print the assistant's response
    console.log("Debug: Assistant's response:", assistantResponse);
    // Return the response
    return NextResponse.json({ result: assistantResponse });
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

"use server";

import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }

  try {
    const response = await fetch(
      `${process.env.apiBaseUrl}/${id}?api_key=${process.env.apiKey}`
    );
    const data = await response.json();

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.log("tree");
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

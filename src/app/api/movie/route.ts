import { movies } from "./data";

export async function GET() {
  return new Response(JSON.stringify({ movies }), { status: 200 });
}

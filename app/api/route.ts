import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${url}/products`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

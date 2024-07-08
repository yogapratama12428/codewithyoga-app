import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: 'hello'
    })
}

export async function POST(request: Request) {
    const { title, value } = await request.json()

    return NextResponse.json({
        message: `Title: ${title}, Value: ${value}`
    })
}
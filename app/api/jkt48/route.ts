import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await fetch(
            "https://www.idn.app/_next/data/ftOY5rYjw5jzzJImYGdhL/jkt48-official.json?username=jkt48-official",
        )

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`)
        }

        const data = await response.json()

        return NextResponse.json({
            profile: data.pageProps.profile,
            livestreams: data.pageProps.livestreams,
            paidRooms: data.pageProps.paidRooms,
        })
    } catch (error) {
        console.error("Error fetching JKT48 data:", error)
        return NextResponse.json({ error: "Failed to fetch JKT48 data" }, { status: 500 })
    }
}


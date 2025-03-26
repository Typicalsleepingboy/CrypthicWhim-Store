import { NextResponse } from "next/server"

export const dynamic = 'force-static'
export const revalidate = 3600 

export async function GET() {
    try {
        const response = await fetch(
            "https://www.idn.app/_next/data/ftOY5rYjw5jzzJImYGdhL/jkt48-official.json?username=jkt48-official",
            {
                next: { revalidate: 3600 },
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`)
        }

        const data = await response.json()
        const responseData = {
            profile: data.pageProps.profile,
            livestreams: data.pageProps.livestreams,
            paidRooms: data.pageProps.paidRooms,
            timestamp: Date.now()
        }

        return NextResponse.json(responseData, {
            headers: {
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=3600',
                'CDN-Cache-Control': 'public, max-age=3600',
                'Vercel-CDN-Cache-Control': 'public, max-age=3600'
            }
        })
    } catch (error) {
        console.error("Error fetching JKT48 data:", error)
        return NextResponse.json(
            { error: "Failed to fetch JKT48 data" }, 
            { status: 500 }
        )
    }
}
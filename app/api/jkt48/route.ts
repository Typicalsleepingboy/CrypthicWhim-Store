import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_IDN_API_BASE_URL}/${process.env.NEXT_PUBLIC_IDN_API_PATH}?username=${process.env.NEXT_PUBLIC_IDN_API_USERNAME}`
        
        const response = await fetch(apiUrl, {
            cache: 'no-store', 
            headers: {
                'Content-Type': 'application/json',
            }
        })

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
                'Cache-Control': 'no-store',
                'CDN-Cache-Control': 'no-store',
                'Vercel-CDN-Cache-Control': 'no-store'
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

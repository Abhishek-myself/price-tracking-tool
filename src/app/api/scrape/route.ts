// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import Product from "@/app/models/Product";
// import { scrapePrice } from "@/app/lib/scrapePrice";
// export async function POST(req: NextRequest) {
//     const { url } = await req.json();

//     if (!url) {
//         return NextResponse.json({ error: "URL is required" }, { status: 400 });
//     }

//     await connectDB();

//     const price = await scrapePrice(url);

//     if (!price) {
//         return NextResponse.json({ error: "Could not fetch price" }, { status: 500 });
//     }

//     const product = await Product.create({ url, price });

//     return NextResponse.json(product, { status: 200 });
// }
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/mongodb';
// import Product from '@/app/models/Product';
// import { scrapePrice } from '@/app/lib/scrapePrice';

// export async function POST(req: NextRequest) {
//     const { url } = await req.json();

//     if (!url) {
//         return NextResponse.json({ error: 'URL is required' }, { status: 400 });
//     }

//     await connectDB();

//     const result = await scrapePrice(url);

//     if (!result) {
//         return NextResponse.json({ error: 'Could not fetch price' }, { status: 500 });
//     }

//     const { name, price } = result;

//     const product = await Product.create({ url, name, price });

//     return NextResponse.json(product, { status: 200 });
// }


// src/app/api/scrape/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
import { scrapePrice } from '@/app/lib/scrapePrice';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // ✅ Validate URL format
        try {
            new URL(url);
        } catch {
            return NextResponse.json({ error: 'URL is not valid' }, { status: 400 });
        }

        // ✅ Only lowercase for checking
        const domainCheck = url.toLowerCase();
        const isAmazon = domainCheck.includes("amazon.");
        const isFlipkart = domainCheck.includes("flipkart.");
        if (!isAmazon && !isFlipkart) {
            return NextResponse.json(
                { error: "URL not from Amazon or Flipkart" },
                { status: 400 }
            );
        }

        // ✅ Connect to DB
        await connectDB();

        // 🔹 Pass original URL to scraper
        const result = await scrapePrice(url);

        if (!result) {
            return NextResponse.json({ error: 'Could not fetch price' }, { status: 500 });
        }

        const { name, price } = result;

        const product = await Product.create({ url, name, price });

        return NextResponse.json(product, { status: 200 });
    } catch (err: any) {
        console.error('Unexpected error:', err);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}



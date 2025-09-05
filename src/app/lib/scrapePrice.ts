


// import { chromium } from 'playwright';

// export async function scrapePrice(
//     url: string
// ): Promise<{ name: string; price: string } | null> {
//     const browser = await chromium.launch({ headless: true });
//     const context = await browser.newContext({
//         // make us look like a real desktop browser in IN
//         userAgent:
//             'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
//         locale: 'en-IN',
//         viewport: { width: 1366, height: 800 },
//     });
//     const page = await context.newPage();

//     // tiny stealth tweak
//     await page.addInitScript(() => {
//         // @ts-ignore
//         Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
//     });

//     // helpers
//     const firstText = async (selectors: string[]) => {
//         for (const s of selectors) {
//             const el = await page.$(s);
//             if (!el) continue;
//             const raw = (await el.innerText()).trim();
//             if (raw) return raw.replace(/\s+/g, ' ');
//         }
//         return '';
//     };

//     try {
//         await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
//         // allow async content to settle
//         await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { });

//         let name = '';
//         let price = '';

//         if (/amazon\./i.test(url)) {
//             // ---- Title (try several common locations) ----
//             await page.waitForSelector('h1#title, #productTitle', { timeout: 15000 });
//             name = await firstText([
//                 '#productTitle',
//                 'h1#title span#productTitle',
//                 'h1#title',
//             ]);

//             // ---- Price (multiple fallbacks) ----
//             price =
//                 (await firstText([
//                     // most reliable: screen-reader price inside corePrice block
//                     '#corePrice_feature_div .a-price .a-offscreen',
//                     '#apex_desktop_buybox .a-price .a-offscreen',
//                     '.a-price .a-offscreen',
//                     '#priceblock_ourprice',
//                     '#priceblock_dealprice',
//                     '#priceblock_saleprice',
//                 ])) || '';

//             if (!price) {
//                 // Build from symbol + whole + fraction (from your screenshot)
//                 const symbol = await firstText(['.a-price .a-price-symbol', 'span.a-price-symbol']);
//                 const whole = await firstText(['.a-price .a-price-whole', 'span.a-price-whole']);
//                 const frac = await firstText(['.a-price .a-price-fraction', 'span.a-price-fraction']);
//                 if (whole) {
//                     price = `${symbol || ''}${whole}${frac ? `.${frac}` : ''}`;
//                 }
//             }
//         } else if (/flipkart\.com/i.test(url)) {
//             // Flipkart
//             await page.waitForSelector('div.Nx9bqj.CxhGGd, span.VU-ZEz', { timeout: 15000 });
//             price = await firstText(['div.Nx9bqj.CxhGGd', 'div._30jeq3._16Jk6d']);
//             name = await firstText(['span.VU-ZEz', 'span.B_NuCI']);
//         }

//         // Simple CAPTCHA/blocked detection (Amazon sometimes throws this)
//         const content = await page.content();
//         if (/validateCaptcha|Enter the characters you see/i.test(content)) {
//             throw new Error('Blocked by Amazon CAPTCHA');
//         }

//         if (!name || !price) return null;
//         return { name, price };
//     } catch (err) {
//         console.error('Scraping error:', err);
//         return null;
//     } finally {
//         await context.close().catch(() => { });
//         await browser.close().catch(() => { });
//     }
// }



// scrapePrice.ts
// import { newContext } from "./browserManager";

// export async function scrapePrice(url: string): Promise<{ name: string; price: string } | null> {
//     const context = await newContext();
//     const page = await context.newPage();

//     try {
//         await page.addInitScript(() => {
//             // @ts-ignore
//             Object.defineProperty(navigator, "webdriver", { get: () => undefined });
//         });

//         await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
//         await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => { });

//         const firstText = async (selectors: string[]) => {
//             for (const s of selectors) {
//                 const el = await page.$(s);
//                 if (!el) continue;
//                 const raw = (await el.innerText()).trim();
//                 if (raw) return raw.replace(/\s+/g, " ");
//             }
//             return "";
//         };

//         let name = "";
//         let price = "";

//         if (/amazon\./i.test(url)) {
//             await page.waitForSelector("#productTitle", { timeout: 10000 });
//             name = await firstText(["#productTitle"]);

//             price =
//                 (await firstText([
//                     "#corePrice_feature_div .a-price .a-offscreen",
//                     "#apex_desktop_buybox .a-price .a-offscreen",
//                     ".a-price .a-offscreen",
//                     "#priceblock_ourprice",
//                     "#priceblock_dealprice",
//                     "#priceblock_saleprice",
//                 ])) || "";

//             if (!price) {
//                 const symbol = await firstText([".a-price-symbol"]);
//                 const whole = await firstText([".a-price-whole"]);
//                 const frac = await firstText([".a-price-fraction"]);
//                 if (whole) price = `${symbol || ""}${whole}${frac ? `.${frac}` : ""}`;
//             }
//         } else if (/flipkart\.com/i.test(url)) {
//             await page.waitForSelector("div.Nx9bqj.CxhGGd, span.VU-ZEz", { timeout: 10000 });
//             price = await firstText(["div.Nx9bqj.CxhGGd", "div._30jeq3._16Jk6d"]);
//             name = await firstText(["span.VU-ZEz", "span.B_NuCI"]);
//         }

//         if (!name || !price) return null;
//         return { name, price };
//     } catch (err) {
//         console.error("Scraping error:", err);
//         return null;
//     } finally {
//         await page.close();
//         await context.close();
//     }
// }


import { getBrowser } from "./browserManager";

export async function scrapePrice(
    url: string
): Promise<{ name: string; price: string } | null> {
    // Reuse a single browser instance
    const browser = await getBrowser();
    const context = await browser.newContext({
        viewport: { width: 1366, height: 800 },
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    });

    // Disable images and fonts for faster loading
    await context.route("**/*", (route) => {
        const url = route.request().url();
        if (/\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|css)$/.test(url)) {
            route.abort();
        } else {
            route.continue();
        }
    });

    const page = await context.newPage();

    try {
        await page.addInitScript(() => {
            // @ts-ignore
            Object.defineProperty(navigator, "webdriver", { get: () => undefined });
        });

        // Go directly to the page without waiting for everything
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

        const firstText = async (selectors: string[]) => {
            for (const s of selectors) {
                const el = await page.$(s);
                if (!el) continue;
                const raw = (await el.innerText()).trim();
                if (raw) return raw.replace(/\s+/g, " ");
            }
            return "";
        };

        let name = "";
        let price = "";

        if (/amazon\./i.test(url)) {
            name = await firstText(["#productTitle"]);
            price = await firstText([
                "#corePrice_feature_div .a-price .a-offscreen",
                "#apex_desktop_buybox .a-price .a-offscreen",
                ".a-price .a-offscreen",
                "#priceblock_ourprice",
                "#priceblock_dealprice",
                "#priceblock_saleprice",
            ]);

            if (!price) {
                const symbol = await firstText([".a-price-symbol"]);
                const whole = await firstText([".a-price-whole"]);
                const frac = await firstText([".a-price-fraction"]);
                if (whole) price = `${symbol || ""}${whole}${frac ? `.${frac}` : ""}`;
            }
        } else if (/flipkart\.com/i.test(url)) {
            name = await firstText(["span.VU-ZEz", "span.B_NuCI"]);
            price = await firstText(["div.Nx9bqj.CxhGGd", "div._30jeq3._16Jk6d"]);
        }

        if (!name || !price) return null;
        return { name, price };
    } catch (err) {
        console.error("Scraping error:", err);
        return null;
    } finally {
        await page.close();
        await context.close();
    }
}





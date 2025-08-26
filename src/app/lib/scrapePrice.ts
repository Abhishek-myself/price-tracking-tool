// import { chromium } from "playwright";
// import fs from "fs/promises";

// export async function scrapePrice(url: string): Promise<string | null> {
//     const browser = await chromium.launch({ headless: false }); // set to true once stable
//     const context = await browser.newContext({
//         userAgent:
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36",
//         viewport: { width: 1280, height: 800 },
//     });

//     const page = await context.newPage();

//     try {
//         await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
//         await page.mouse.wheel(0, 500);
//         await page.waitForTimeout(3000);

//         // Try broader, real-world selectors
//         const selectors = [
//             "#priceblock_ourprice",
//             "#priceblock_dealprice",
//             "#priceblock_saleprice",
//             "span.a-price.aok-align-center span.a-offscreen",
//             "span.a-price span.a-offscreen",
//             ".a-price .a-offscreen",
//         ];

//         for (const sel of selectors) {
//             const el = page.locator(sel).first();
//             if (await el.isVisible({ timeout: 3000 })) {
//                 const text = await el.textContent();
//                 if (text?.trim()) {
//                     console.log("✅ Found price using:", sel);
//                     return text.trim();
//                 }
//             }
//         }

//         // Screenshot for debug
//         await page.screenshot({ path: "amazon-error.png", fullPage: true });
//         throw new Error("Price not found using selectors");

//     } catch (err) {
//         console.error("Amazon scraping failed:", err);
//         return null;
//     } finally {
//         await browser.close();
//     }
// }


// // import { chromium } from "playwright";
// // import fs from "fs/promises";

// // export async function scrapePrice(url: string): Promise<string | null> {
// //     const browser = await chromium.launch({ headless: false }); // set to true once stable
// //     const context = await browser.newContext({
// //         userAgent:
// //             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36",
// //         viewport: { width: 1280, height: 800 },
// //     });

// //     const page = await context.newPage();

// //     try {
// //         await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
// //         await page.mouse.wheel(0, 500);
// //         await page.waitForTimeout(3000);

// //         // Try broader, real-world selectors
// //         const selectors = [
// //             "#priceblock_ourprice",
// //             "#priceblock_dealprice",
// //             "#priceblock_saleprice",
// //             "span.a-price.aok-align-center span.a-offscreen",
// //             "span.a-price span.a-offscreen",
// //             ".a-price .a-offscreen",
// //         ];

// //         for (const sel of selectors) {
// //             const el = page.locator(sel).first();
// //             if (await el.isVisible({ timeout: 3000 })) {
// //                 const text = await el.textContent();
// //                 if (text?.trim()) {
// //                     console.log("✅ Found price using:", sel);
// //                     return text.trim();
// //                 }
// //             }
// //         }

// //         // Screenshot for debug
// //         await page.screenshot({ path: "amazon-error.png", fullPage: true });
// //         throw new Error("Price not found using selectors");

// //     } catch (err) {
// //         console.error("Amazon scraping failed:", err);
// //         return null;
// //     } finally {
// //         await browser.close();
// //     }
// // }



// import { chromium } from 'playwright';

// export async function scrapePrice(url: string): Promise<string | null> {
//     const browser = await chromium.launch({ headless: true });
//     const page = await browser.newPage();

//     try {
//         console.log("⏳ Navigating to Flipkart URL...");
//         await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

//         // ✅ Wait for the known price class you just provided
//         await page.waitForSelector('div.Nx9bqj.CxhGGd', { timeout: 15000 });

//         const priceElement = await page.$('div.Nx9bqj.CxhGGd');
//         if (!priceElement) throw new Error("Price element not found.");

//         const priceText = await priceElement.textContent();
//         console.log("✅ Price:", priceText?.trim());

//         await browser.close();
//         return priceText?.trim() || null;
//     } catch (err) {
//         console.error("❌ Flipkart scraping failed:", err);
//         await browser.close();
//         return null;
//     }
// }

// import { chromium } from "playwright";

// export async function scrapePrice(url: string): Promise<string | null> {
//     const browser = await chromium.launch({ headless: true });
//     const context = await browser.newContext({
//         userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36",
//         viewport: { width: 1280, height: 800 },
//     });
//     const page = await context.newPage();

//     try {
//         await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

//         if (url.includes("amazon")) {
//             console.log("🛒 Scraping Amazon...");

//             await page.mouse.wheel(0, 500);
//             await page.waitForTimeout(3000);

//             const amazonSelectors = [
//                 "#priceblock_ourprice",
//                 "#priceblock_dealprice",
//                 "#priceblock_saleprice",
//                 "span.a-price.aok-align-center span.a-offscreen",
//                 "span.a-price span.a-offscreen",
//                 ".a-price .a-offscreen",
//             ];

//             for (const sel of amazonSelectors) {
//                 const el = page.locator(sel).first();
//                 if (await el.isVisible({ timeout: 3000 })) {
//                     const text = await el.textContent();
//                     if (text?.trim()) {
//                         console.log("✅ Amazon price found using:", sel);
//                         await browser.close();
//                         return text.trim();
//                     }
//                 }
//             }

//             console.warn("❌ Amazon price not found.");
//             await page.screenshot({ path: "amazon-error.png", fullPage: true });
//             return null;

//         } else if (url.includes("flipkart")) {
//             console.log("🛍️ Scraping Flipkart...");

//             await page.waitForSelector("div.Nx9bqj.CxhGGd", { timeout: 15000 });

//             const priceElement = await page.$("div.Nx9bqj.CxhGGd");
//             if (!priceElement) throw new Error("Price element not found.");

//             const priceText = await priceElement.textContent();
//             console.log("✅ Flipkart price:", priceText?.trim());
//             await browser.close();
//             return priceText?.trim() || null;

//         } else {
//             throw new Error("Unsupported site. Only Amazon and Flipkart are supported.");
//         }

//     } catch (err) {
//         console.error("❌ Scraping failed:", err);
//         return null;
//     } finally {
//         await browser.close();
//     }
// }


// import { chromium } from "playwright";

// export async function scrapePrice(url: string): Promise<{ name: string | null; price: string | null }> {
//     const browser = await chromium.launch({ headless: true });
//     const context = await browser.newContext({
//         userAgent:
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36",
//         viewport: { width: 1280, height: 800 },
//     });
//     const page = await context.newPage();

//     const isAmazon = url.includes("amazon");
//     const isFlipkart = url.includes("flipkart");

//     try {
//         console.log(`⏳ Navigating to ${isAmazon ? "Amazon" : isFlipkart ? "Flipkart" : "Unknown"} URL...`);
//         await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
//         await page.waitForTimeout(3000);

//         let name: string | null = null;
//         let price: string | null = null;

//         if (isAmazon) {
//             // Scroll down slightly to ensure lazy content loads
//             await page.mouse.wheel(0, 300);

//             const nameSelector = "#productTitle";
//             const nameElement = await page.locator(nameSelector).first();
//             if (await nameElement.isVisible()) {
//                 name = (await nameElement.textContent())?.trim() || null;
//             }

//             const priceSelectors = [
//                 "#priceblock_ourprice",
//                 "#priceblock_dealprice",
//                 "#priceblock_saleprice",
//                 "span.a-price span.a-offscreen",
//                 ".a-price .a-offscreen"
//             ];

//             for (const sel of priceSelectors) {
//                 const el = page.locator(sel).first();
//                 if (await el.isVisible({ timeout: 2000 })) {
//                     price = (await el.textContent())?.trim() || null;
//                     if (price) break;
//                 }
//             }

//         } else if (isFlipkart) {
//             // Handle login popup if present
//             try {
//                 await page.locator("._2KpZ6l._2doB4z").click({ timeout: 3000 });
//                 console.log("⛔️ Login popup closed.");
//             } catch (_) { }

//             await page.waitForSelector('div.Nx9bqj.CxhGGd', { timeout: 15000 });

//             // Get product name
//             const nameElement = await page.locator('span.B_NuCI').first();
//             name = (await nameElement.textContent())?.trim() || null;

//             // Get product price
//             const priceElement = await page.locator('div.Nx9bqj.CxhGGd').first();
//             price = (await priceElement.textContent())?.trim() || null;

//         } else {
//             throw new Error("Unsupported URL");
//         }

//         return { name, price };
//     } catch (err) {
//         console.error("❌ Scraping failed:", err);
//         return { name: null, price: null };
//     } finally {
//         await browser.close();
//     }
// }
// import { chromium } from 'playwright';

// export async function scrapePrice(url: string): Promise<{ name: string; price: string } | null> {
//     const browser = await chromium.launch({ headless: true });
//     const page = await browser.newPage();

//     try {
//         await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

//         let price = '';
//         let name = '';

//         if (url.includes('amazon')) {
//             await page.waitForSelector('span.a-price.aok-align-center span.a-offscreen', { timeout: 10000 });
//             price = await page.$eval('span.a-price.aok-align-center span.a-offscreen', el => el.textContent?.trim() || '');
//             name = await page.$eval('#productTitle', el => el.textContent?.trim() || '');
//         } else if (url.includes('flipkart')) {
//             await page.waitForSelector('div.Nx9bqj.CxhGGd', { timeout: 10000 });
//             price = await page.$eval('div.Nx9bqj.CxhGGd', el => el.textContent?.trim() || '');
//             name = await page.$eval('span.B_NuCI', el => el.textContent?.trim() || '');
//         }

//         await browser.close();

//         if (!price || !name) return null;

//         return { name, price };
//     } catch (error) {
//         console.error('Scraping error:', error);
//         await browser.close();
//         return null;
//     }
// }
// import { chromium } from 'playwright';


// export async function scrapePrice(url: string): Promise<{ name: string; price: string } | null> {
//     const browser = await chromium.launch({ headless: true });
//     // const context = await browser.newContext();
//     // const page = await context.newPage();
//     const page = await browser.newPage();

//     try {
//         await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

//         let price = '';
//         let name = '';

//         if (url.includes('amazon')) {
//             await page.waitForSelector('span.a-price.aok-align-center span.a-offscreen ', { timeout: 10000 });
//             price = await page.$eval('span.a-price.aok-align-center span.a-offscreen', el => el.textContent?.trim() || '');

//             name = await page.$eval('#productTitle', el => el.textContent?.trim() || '');
//         } else if (url.includes('flipkart')) {
//             await page.waitForSelector('div.Nx9bqj.CxhGGd', { timeout: 10000 });
//             price = await page.$eval('div.Nx9bqj.CxhGGd', el => el.textContent?.trim() || '');

//             // ✅ Updated selector for Flipkart product name
//             name = await page.$eval('span.VU-ZEz', el => el.textContent?.trim() || '');
//         }

//         await browser.close();

//         if (!price || !name) return null;

//         return { name, price };
//     } catch (error) {
//         console.error('Scraping error:', error);
//         await browser.close();
//         return null;
//     }
// }


import { chromium } from 'playwright';

export async function scrapePrice(
    url: string
): Promise<{ name: string; price: string } | null> {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        // make us look like a real desktop browser in IN
        userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        locale: 'en-IN',
        viewport: { width: 1366, height: 800 },
    });
    const page = await context.newPage();

    // tiny stealth tweak
    await page.addInitScript(() => {
        // @ts-ignore
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    // helpers
    const firstText = async (selectors: string[]) => {
        for (const s of selectors) {
            const el = await page.$(s);
            if (!el) continue;
            const raw = (await el.innerText()).trim();
            if (raw) return raw.replace(/\s+/g, ' ');
        }
        return '';
    };

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        // allow async content to settle
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { });

        let name = '';
        let price = '';

        if (/amazon\./i.test(url)) {
            // ---- Title (try several common locations) ----
            await page.waitForSelector('h1#title, #productTitle', { timeout: 15000 });
            name = await firstText([
                '#productTitle',
                'h1#title span#productTitle',
                'h1#title',
            ]);

            // ---- Price (multiple fallbacks) ----
            price =
                (await firstText([
                    // most reliable: screen-reader price inside corePrice block
                    '#corePrice_feature_div .a-price .a-offscreen',
                    '#apex_desktop_buybox .a-price .a-offscreen',
                    '.a-price .a-offscreen',
                    '#priceblock_ourprice',
                    '#priceblock_dealprice',
                    '#priceblock_saleprice',
                ])) || '';

            if (!price) {
                // Build from symbol + whole + fraction (from your screenshot)
                const symbol = await firstText(['.a-price .a-price-symbol', 'span.a-price-symbol']);
                const whole = await firstText(['.a-price .a-price-whole', 'span.a-price-whole']);
                const frac = await firstText(['.a-price .a-price-fraction', 'span.a-price-fraction']);
                if (whole) {
                    price = `${symbol || ''}${whole}${frac ? `.${frac}` : ''}`;
                }
            }
        } else if (/flipkart\.com/i.test(url)) {
            // Flipkart
            await page.waitForSelector('div.Nx9bqj.CxhGGd, span.VU-ZEz', { timeout: 15000 });
            price = await firstText(['div.Nx9bqj.CxhGGd', 'div._30jeq3._16Jk6d']);
            name = await firstText(['span.VU-ZEz', 'span.B_NuCI']);
        }

        // Simple CAPTCHA/blocked detection (Amazon sometimes throws this)
        const content = await page.content();
        if (/validateCaptcha|Enter the characters you see/i.test(content)) {
            throw new Error('Blocked by Amazon CAPTCHA');
        }

        if (!name || !price) return null;
        return { name, price };
    } catch (err) {
        console.error('Scraping error:', err);
        return null;
    } finally {
        await context.close().catch(() => { });
        await browser.close().catch(() => { });
    }
}


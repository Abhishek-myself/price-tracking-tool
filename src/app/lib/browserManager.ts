// // browserManager.ts
// import { chromium, Browser, BrowserContext } from "playwright";

// let browser: Browser | null = null;

// export async function getBrowser(): Promise<Browser> {
//     if (!browser) {
//         browser = await chromium.launch({ headless: true });
//     }
//     return browser;
// }

// export async function newContext(): Promise<BrowserContext> {
//     const browser = await getBrowser();
//     return browser.newContext({
//         userAgent:
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
//         locale: "en-IN",
//         viewport: { width: 1366, height: 800 },
//     });
// }

// // lib/browserManager.ts
// import { chromium, Browser, BrowserContext } from "playwright";

// let browser: Browser | null = null;

// export async function getBrowser(): Promise<Browser> {
//     if (!browser) {
//         browser = await chromium.launch({ headless: true });
//     }
//     return browser;
// }

// export async function newContext(): Promise<BrowserContext> {
//     const browser = await getBrowser();
//     return browser.newContext({
//         userAgent:
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
//         locale: "en-IN",
//         viewport: { width: 1366, height: 800 },
//     });
// }

// export async function closeBrowser() {
//     if (browser) {
//         await browser.close();
//         browser = null;
//     }
// }


import { chromium, Browser } from "playwright";

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
    if (!browser) {
        browser = await chromium.launch({ headless: true });
    }
    return browser;
}



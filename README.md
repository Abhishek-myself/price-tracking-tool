Price Tracking Tool

A modern web app to track product prices across e-commerce platforms like Amazon and Flipkart, and receive real-time alerts via Email, Slack, and Telegram.



Screenshots:
<img width="1919" height="894" alt="Screenshot 2025-09-05 142904" src="https://github.com/user-attachments/assets/faec63d3-3680-4cf6-beb1-36eeda766cfb" />

<img width="1918" height="904" alt="Screenshot 2025-09-05 142950" src="https://github.com/user-attachments/assets/1276acca-9342-4592-a6ba-9f355b1e225b" />

<img width="1919" height="907" alt="Screenshot 2025-09-05 143018" src="https://github.com/user-attachments/assets/b850821d-5cc4-4bba-855f-a1f92fafb128" />

<img width="1919" height="907" alt="Screenshot 2025-09-05 143541" src="https://github.com/user-attachments/assets/92ebccbf-9df5-4ae5-949e-5be6fcc150d0" />

<img width="1912" height="896" alt="Screenshot 2025-09-05 145030" src="https://github.com/user-attachments/assets/d460630d-3ae2-4ee3-b883-4033795cafad" />






📝 Guide

1.Open the tool

2.Create a user account (Sign up/Login)

3.Enter an Amazon or Flipkart product URL → The tool will fetch and display the product name & price.

4.The product will be stored in the Search History (only the last 5 searches are saved).

5.To track price drops, enable the Track button. Once tracking is enabled, you can also activate:

Slack notifications

Email (Gmail) notifications

Telegram notifications

6.You can disable tracking/notifications anytime from the same panel.

7.At the bottom of the Search History, you’ll see a User icon → click it to access the Logout button


| Layer         | Technologies                                      |
| ------------- | ------------------------------------------------- |
| Frontend      | Next.js , Tailwind CSS                            |
| Backend       | Next.js API Routes, Node.js                       |
| Database      | MongoDB                                           |
| Auth          | NextAuth.js                                       |
| Scraping      | Puppeteer / Playwright                            |
| Notifications | Email, Slack, Telegram Bot API                    |
| Tunneling     | LocalTunnel / Ngrok for development webhook setup |







Setup:


Install dependencies:

npm install




Make sure to create a .env.local file in the root of your project and add the following:

MONGODB_URI → Your MongoDB connection string

NEXTAUTH_SECRET → A secret string for NextAuth 

NEXTAUTH_URL → Your deployed site URL (e.g., http://localhost:3000 or production URL)

GOOGLE_CLIENT_ID → Google OAuth client ID

GOOGLE_CLIENT_SECRET → Google OAuth client secret

SLACK_WEBHOOK_URL → Your Slack webhook URL for sending notifications

TELEGRAM_BOT_TOKEN → Telegram bot token from BotFather

TELEGRAM_BOT_USERNAME → Your bot’s username (without @)

EMAIL_APP_PASS → App Password for your email (not your normal login password, required if using Gmail)

EMAIL_FROM → The email address used to send notifications (e.g., notifications@yourdomain.com)










Start your dev server:

npm run dev


In a separate terminal, run:

npx localtunnel --port 3000


Copy the generated *.loca.lt URL.

Set the Telegram webhook:

curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<TUNNEL_URL>/api/telegram/webhook"

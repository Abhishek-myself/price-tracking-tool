# EiceTrack 🚀

EiceTrack is a smart price tracking application that helps users monitor product prices on Amazon & Flipkart and receive instant notifications when prices drop.

It’s designed for seamless tracking and real-time alerts via multiple channels including Slack, Email, and Telegram.

## Screenshots:
<img width="1919" height="898" alt="Screenshot 2025-09-09 152632" src="https://github.com/user-attachments/assets/9dc55cc3-6b40-414e-8954-715865ebecb4" />
<br><br>
<img width="1917" height="904" alt="Screenshot 2025-09-09 152704" src="https://github.com/user-attachments/assets/866e680c-d409-42fe-a5a5-0e3115fbe003" />
<br><br>

<img width="1914" height="908" alt="Screenshot 2025-09-09 153219" src="https://github.com/user-attachments/assets/6761435e-25d8-4153-8210-e52004f624a1" />
<br><br>
<img width="1917" height="902" alt="Screenshot 2025-09-09 153130" src="https://github.com/user-attachments/assets/cd2d8842-9390-4ccb-9b1c-e1eac67d65a1" />
<br><br>

<img width="1919" height="909" alt="Screenshot 2025-09-09 152551" src="https://github.com/user-attachments/assets/d269a420-6865-4d99-a2b7-37f4358fceaa" />
<br><br>
<img width="1916" height="912" alt="Screenshot 2025-09-09 152522" src="https://github.com/user-attachments/assets/7d2dd5f1-4c57-413b-afe8-108f861b5e23" />

<br><br>


**📖 Description**

EiceTrack is a **smart price tracker application** that helps users monitor product prices on Amazon & Flipkart and receive instant notifications when prices drop. The app is designed for seamless tracking and real-time alerts via multiple channels including Slack, Email, and Telegram.

**🔎 How it works**

1. **Account Setup:**  
   - Users must create an account or log in to access the app.
   
2. **Enter Product URL:**  
   - Once logged in, users can enter an Amazon or Flipkart product URL.
   - The app fetches the product name and current price automatically.
   
3. **Search History:**  
   - Every tracked product (URL, name, and price) is saved in the **search history** for easy access.  

4. **Enable Tracking:**  
   - Users can enable tracking for any product in their history.  
   - Once tracking is enabled, the app monitors the product price continuously.

5. **Notification Alerts:**  
   - Users can enable **Slack, Email, or Telegram notifications**.  
   - Whenever a **price drop** occurs, alerts are instantly sent to the chosen channels.

EiceTrack simplifies online shopping by ensuring you never miss a price drop on your favorite products. With a user-friendly interface, quick product fetching, and customizable notifications, staying updated on deals has never been easier!


## Getting Started
### ✅ Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) as the package manager
- [MongoDB](https://www.mongodb.com/) (local or Atlas cluster for database)
- [Next.js](https://nextjs.org/) (for frontend and API routes)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)
- [NextAuth.js](https://next-auth.js.org/) (for authentication with email/password & Google)
- [Playwright](https://playwright.dev/) (for scraping product details)
- [Slack API](https://api.slack.com/) (for Slack notifications)
- [Telegram Bot API](https://core.telegram.org/bots/api) (for Telegram notifications)
- [Nodemailer](https://nodemailer.com/) (for email notifications)


### 🛠️ Installing

Follow these steps to set up the project locally:

### Clone the repository
```bash
git clone https://github.com/your-username/price-tracker-app.git
```
```
cd price-tracker-app
```
### Install dependencies
```bash
npm install

```
### Set up environment variables
Create a .env.local file in the root of the project and add the following variables:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_FROM=your_email_address
EMAIL_APP_PASS=your_email_app_password
SLACK_WEBHOOK_URL=your_slack_webhook
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_BOT_USERNAME=your_telegram_bot_username

```

### Run the development server
```
npm run dev
```
Now open the app in your browser:
```
http://localhost:3000
```
### 🤖 Telegram Integration
To enable Telegram notifications:
1. Run LocalTunnel in a separate terminal:
```
npx localtunnel --port 3000
```
2. Copy the generated public URL.

3. Retrieve your LocalTunnel password:
```
 https://loca.lt/mytunnelpassword
 ```
4. Set your Telegram webhook (replace <telegram_token> and <local_tunnel_url>):
```
"https://api.telegram.org/bot<telegram_token>/setWebhook?url=<local_tunnel_url/api/telegram/webhook"
```

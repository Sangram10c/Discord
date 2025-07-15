# 🤖 Discord User Bot with Modal Form & MongoDB

A feature-rich Discord bot that uses a **slash command** (`/createuser`) to open a **modal form** (pop-up) in Discord, allowing users to input their name, email, mobile number, and role. This data is securely stored in a **MongoDB database** using Mongoose.

---

## ✨ Features

- Slash command: `/createuser`
- Opens a modal (form) for user input
- Validates for duplicate email entries
- Stores user data (`name`, `email`, `mobile`, `role`) in MongoDB
- Sends private (ephemeral) success or error messages to the user
- Uses `.env` for secure configuration

---

## 📁 Project Structure

- `index.js` – Main entry file of the Discord bot, handles slash command logic, modal creation, and form submission
- `Model/Discord.js` – Mongoose model that defines the schema for user data (name, email, mobile, role)
- `connection.js` – Handles MongoDB connection using Mongoose
- `.env` – Contains sensitive information like the bot token, client ID, and MongoDB URI (not committed)
- `.env.example` – Template file showing required environment variables
- `package.json` – Lists project dependencies and scripts

---

## 📦 Setup Instructions

1. **Install Node.js (v18+ recommended)**

2. **Clone the repository**  
   `git clone https://github.com/yourusername/discord-user-bot.git`

3. **Navigate to the project directory**  
   `cd discord-user-bot`

4. **Install required dependencies**  
   `npm install`

5. **Create a `.env` file** using the `.env.example` as a reference:

   - `TOKEN` – Your Discord bot token from the Developer Portal
   - `CLIENT_ID` – Your bot's application (client) ID
   - `MONGODB_URL` – MongoDB URI (e.g., `mongodb://localhost:27017/NodeJS` or MongoDB Atlas URL)

6. **Run the bot**  
   `node index.js`

---

## 🌐 Slash Command: `/createuser`

Once the bot is live and added to your server:

- Type `/createuser` in any channel
- A Discord modal (form) will appear
- User fills in:
  - Name
  - Email (must be unique)
  - Mobile number
  - Role
- On submit:
  - Data is validated
  - Email is checked for duplicates
  - Valid entries are saved to MongoDB
  - A confirmation or error message is shown to the user privately

---

## 🔐 Environment Variables (.env)

The following variables are required:

| Variable       | Description                                      |
|----------------|--------------------------------------------------|
| `TOKEN`        | Discord Bot Token (keep this secret)             |
| `CLIENT_ID`    | Discord Application (Client) ID                  |
| `MONGODB_URL`  | MongoDB Connection URI (local or hosted)         |

---

## 🧠 MongoDB Schema Fields

The `Discord` model stores the following user data:

- `name`: Full name of the user
- `email`: Must be unique (used for validation)
- `mobile`: Mobile number (string)
- `role`: Role or designation (string)

---

## 🧪 Development Notes

- Slash commands are registered globally; it may take a few minutes to propagate.
- For testing, consider using `applicationGuildCommands` for faster local command registration.
- All replies (success/error) use `ephemeral: true`, meaning only the user can see them.
- Duplicate email entries are not allowed and will trigger an error message.

---

## 🛠 Technologies Used

- **discord.js v14+** – For interacting with the Discord API
- **mongoose** – For MongoDB object modeling
- **dotenv** – For managing environment variables

---

## 📬 Contact

**Sangram Chougule**  
🔗 [GitHub](https://github.com/Sangram10c)  
🔗 [LinkedIn](https://www.linkedin.com/in/sangram-chougule-676143262/)

---

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

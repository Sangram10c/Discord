import dotenv from "dotenv";
dotenv.config();
import {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  SlashCommandBuilder,
} from "discord.js";
import mongoose from "mongoose";
import "./connection.js";
import Discord from "./Model/Discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const commands = [
  new SlashCommandBuilder()
    .setName("createuser")
    .setDescription("Open a form to create user"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
  body: commands,
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "createuser") {
    const modal = new ModalBuilder()
      .setCustomId("createUserModal")
      .setTitle("Create New User");

    const nameInput = new TextInputBuilder()
      .setCustomId("name")
      .setLabel("Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const emailInput = new TextInputBuilder()
      .setCustomId("email")
      .setLabel("Email")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const mobileInput = new TextInputBuilder()
      .setCustomId("mobile")
      .setLabel("Mobile")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const roleInput = new TextInputBuilder()
      .setCustomId("role")
      .setLabel("Role")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const modalComponents = [
      new ActionRowBuilder().addComponents(nameInput),
      new ActionRowBuilder().addComponents(emailInput),
      new ActionRowBuilder().addComponents(mobileInput),
      new ActionRowBuilder().addComponents(roleInput),
    ];

    modal.addComponents(...modalComponents);

    await interaction.showModal(modal);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === "createUserModal") {
    const name = interaction.fields.getTextInputValue("name");
    const email = interaction.fields.getTextInputValue("email");
    const mobile = interaction.fields.getTextInputValue("mobile");
    const role = interaction.fields.getTextInputValue("role");

    try {
        if(email) {
        const existingUser = await Discord.findOne({ email });
        if (existingUser) {
          await interaction.reply({
            content: `❌ The email ${email} is already registered. Please use a different email address.`,
            ephemeral: true,
            components: [],
          });
          return;
        }
      await Discord.create({ name, email, mobile, role });
      await interaction.reply({
        content: " User created successfully!",
        ephemeral: true,
      });
    }
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: " Error saving user.",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.TOKEN);

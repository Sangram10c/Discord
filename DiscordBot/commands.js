import {REST, Routes} from 'discord.js';
const commands = [
    {
        name: 'createuser', 
        description: 'Replies with Pong!',
    },
    {
        name: 'finduser',
        description: 'Replies with Boop!',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        
        const data = await rest.put(
            Routes.applicationCommands('1393512800222969886', '988798501129433108'),
            { body: commands }
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
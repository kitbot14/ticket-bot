const { Client, Intents } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = config.prefix;

    if (message.content.startsWith(`${prefix}ticket`)) {
        const ticketCategory = config.ticketCategory;
        const guild = message.guild;


        const channel = await guild.channels.create(`ticket-${message.author.username}`, {
            type: 'GUILD_TEXT',
            parent: ticketCategory,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
                {
                    id: client.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
            ],
        });

        await channel.send(`${message.author}, votre ticket a été créé avec succès !`);

        message.channel.send(`${message.author}, votre ticket a été créé : ${channel}`);
    }
});

client.login(config.token);

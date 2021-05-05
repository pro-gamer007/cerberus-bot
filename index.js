const Discord = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client({ fetchAllMembers: true, ws: { properties: { $browser: 'Discord iOS' }, intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] } });

client.login('');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.data = require('./mongo');

mongoose.set('useFindAndModify', false);
mongoose.connect('', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Connected to MongoDB database!');
}).catch((err) => {
	console.log('Unable to connect to Mongodb. Error:' + err);
});

fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err);
	files.forEach(f => {
		const props = require(`./commands/${ f }`);
		props.fileName = f;
		client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.once('ready', () => {
	console.log(`${client.user.username} is now online!`);
	client.user.setActivity('Cerberus editing | apply now!!', { type: 'WATCHING' });
});

client.on('message', async message => {
	if (message.author.bot) return;
	const prefix = '$';
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	if(message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
		if(client.commands.get(command)) {
			const commandFile = require(`./commands/${command}.js`);
			commandFile.run(client, message, args);
		}
		if (!client.commands.get(command)) {
			const tag = await client.data.findTag(command);
			if (tag) {
				message.channel.send(tag.response);
			}
		}
	}
});
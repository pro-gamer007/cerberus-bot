/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	const adminperms = new Discord.Permissions('ADMINISTRATOR');
	if (!message.member.hasPermission(adminperms) && message.author.id != '827265967729279068') return message.reply('You arent allowed to do that!');
	if (!args[0]) return message.channel.send('Please tell me a name for this tag.');
	if (!args[1]) return message.channel.send('Please tell me a response for this tag.');
	const tag = await client.data.addTag(args[0].toLowerCase(), args.slice(1).join(' '));
	message.channel.send(tag);
};

module.exports.help = {
	aliases: [],
	name: 'add',
};

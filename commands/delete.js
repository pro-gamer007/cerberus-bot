/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	const adminperms = new Discord.Permissions('ADMINISTRATOR');
	if (!message.member.hasPermission(adminperms) && message.author.id != '827265967729279068') return message.reply('You arent allowed to do that!');
	if (!args[0]) return message.channel.send('Please give a tag name.');
	const deleteTag = await client.data.deleteTag(args[0]);
	message.channel.send(deleteTag);
};

module.exports.help = {
	aliases: [],
	name: 'delete',
};
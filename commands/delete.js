/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	if (!args[0]) return message.channel.send('Please give a tag name.');
	const deleteTag = await client.data.deleteTag(args[0]);
	message.channel.send(deleteTag);
};

module.exports.help = {
	aliases: [],
	name: 'delete',
};
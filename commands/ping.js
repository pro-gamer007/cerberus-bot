/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	const m = await message.channel.send('🏓 Pinging....');
	const dataPing = Date.now();
	const data = await client.data.getTags();
	const dataPingNow = Date.now();
	const dataRealPing = dataPingNow - dataPing;
	const embed = new Discord.MessageEmbed()
		.setAuthor('🏓Pong!', client.user.avatarURL())
		.addFields(
			{ name: 'API Latency', value: Math.round(client.ws.ping) + 'ms', inline: true },
			{ name: 'Message Latency', value: m.createdTimestamp - message.createdTimestamp + 'ms', inline: true },
			{ name: 'Database Latency', value: dataRealPing + 'ms', inline: true },
		)
		.setColor('#f2f2f2');
	return m.delete(), message.channel.send(embed);
};


module.exports.help = {
	aliases: [],
	name: 'ping',
};
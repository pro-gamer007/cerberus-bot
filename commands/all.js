/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	const embed = new Discord.MessageEmbed()
		.setTitle('Responses')
		.setColor('#f2f2f2');
	const responses = await client.data.getTags();
	let amount = responses.names.length;
	if (!responses) return message.channel.send('There are no responses.');
	if (responses.names < 25) {
		amount = 25;
	}
	for(let i = 0; i < amount; i++) {
		embed.addField(`${i + 1}. ${responses.names[i]}`, `Response: ${responses.responses[i]}`);
	}
	message.channel.send(embed);
};

module.exports.help = {
	aliases: [],
	name: 'all',
};
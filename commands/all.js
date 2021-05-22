/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	const embed = new Discord.MessageEmbed()
		.setAuthor('Responses', client.user.avatarURL())
		.setColor('#f2f2f2');
	const responses = await client.data.getTags();
	if (!responses) return message.channel.send('There are no responses.');
	let response = '\n';
	for(let i = 0; i < responses.names.length; i++) {
		response += (`**${i + 1}.** \`${responses.names[i]}\`\n\n`);
	}
	const splitResponse = Discord.Util.splitMessage(response, {
		maxLength: 2048,
		char: '\n',
		prepend: '',
		append: '',
	});
	splitResponse.forEach(async (a) => {
		embed.setDescription(a);
		message.channel.send(embed);
	});
};

module.exports.help = {
	aliases: [],
	name: 'all',
};
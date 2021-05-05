/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	const helpembed = new Discord.MessageEmbed()
		.setAuthor('Cerberus Help', client.user.avatarURL())
		.setColor('#f2f2f2')
		.addFields(
			{ name: 'Add - Adds a new tag', value: 'Usage: $add {tag name} {tag response}' },
			{ name: 'Delete - Deletes a tag', value: 'Usage: $delete {tag name}' },
			{ name: 'Edit - Edits a tag', value: 'Usage: $edit {tag name} -{type} (name/response) {new name or response}' },
			{ name: 'All - Shows all the responses', value: 'Usage: $responses' },
			{ name: 'Ping - Shows the bots ping', value: 'Usage: $ping' },
		)
		.setFooter('Dont include () or {} in cmds! | () is for options');
	message.channel.send(helpembed);
};


module.exports.help = {
	aliases: [],
	name: 'help',
};
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	let type;
	if (!args[0]) return message.channel.send('Please tell me the name for the tag you would like to edit..');
	if (!args[1]) return message.channel.send('Please tell me what you want to edit. e.g: `$edit ${tag name} -name ${new tag name}`');
	if (!args[2]) return message.channel.send('Please tell me a new response or name for this tag.');
	if (args[1] == '-name') {
		type = 'name';
	}
	else if (args[1] == '-response') {
		type = 'response';
	}
	else {
		return message.channel.send('Please select a proper type (name or response).');
	}
	const newTag = await client.data.editTag(args[0], type, args[2]);
	message.channel.send(newTag);
};

module.exports.help = {
	aliases: [],
	name: 'edit',
};
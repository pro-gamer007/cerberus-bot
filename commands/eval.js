/* eslint-disable no-unused-vars */
function clean(text) {
	if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
	else {return text;}
}
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	if(!message.author.id == '' || !message.author.id == '') return message.reply('You arent allowed to do that!');
	const code = args.join(' ');
	const hasAwait = code.includes('await');
	const hasReturn = code.includes('return');
	try {
		let evaled = hasAwait ? await eval(`(async () => { ${hasReturn ? ' ' : 'return'} ${code} })()`) : eval(code);
		if (typeof evaled !== 'string') {
			evaled = require('util').inspect(evaled, { depth: Number(message.content.slice(-1)) || +!(require('util').inspect(evaled, { depth: 2 })),
			});
		}
		message.channel.send(`\`\`\`xl\n${clean(evaled)}\n\`\`\``);
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
};

module.exports.help = {
	aliases: [],
	name: 'eval',
};
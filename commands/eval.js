/* eslint-disable no-unused-vars */
function clean(text) {
	if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
	else {return text;}
}
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	if(!message.author.id == '555064829946232832' || !message.author.id == '631179295523602433') return message.reply('You arent allowed to do that!');
	if(!args[0]) return message.channel.send('Give me something to eval -_-');
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
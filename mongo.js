const mongoose = require('mongoose');
const cmdSchema = require('./schemas/cmd');
const { GooseCache } = require('goosecache');
const cachegoose = new GooseCache(mongoose, {
	engine: 'memory',
});
module.exports = {
	/**
	 *
	 * @param {string} message The first part of the message.
	 * @returns {object} { data: boolean, response: string } or Null
	 */
	async findTag(message) {
		if (!message) {
			return 'Message content is not given.';
		}
		const data = await cmdSchema.findOne({ name: message }).cache(60);
		if (data) {
			cachegoose.clearCache();
			return { data: true, response: data.response };
		}
		if (!data) {
			return null;
		}
	},
	/**
	 *
	 * @param {string} name the name of the tag.
	 * @param {string} response the response for the tag.
	 * @returns {string} the status/message. e.g `A tag with that name allready exists.`
	 */
	async addTag(name, response) {
		const data = await cmdSchema.findOne({ name: name });
		const rdata = await cmdSchema.findOne({ response: response });
		if (data) {
			return 'A tag with that name allready exists.';
		}
		if (rdata) {
			return 'A tag with that response allready exists.';
		}
		if (!data) {
			const newTag = new cmdSchema({
				name: name,
				response: response,
			});
			cachegoose.clearCache();
			newTag.save();
			return `Added \`${name}\` with response \`${response}\``;
		}
	},
	/**
	 *
	 * @returns {object} some data
	 */
	async getData() {
		const data = await cmdSchema.findOne({});
		return data;
	},
	/**
	 *
	 * @param {string} tag The tag name.
	 * @param {string} type The property of the tag you want to change.
	 * @param {string} to What you want to change the tag name or response to.
	 * @returns {string} The response. e.g \`name\` is now named \`new name\` and responds with \`response\`
	 */
	async editTag(tag, type, to) {
		if (type == 'name') {
			const data = await cmdSchema.findOne({ name: tag });
			if (!data) {
				return 'Could not find that tag. Are you sure thats the correct tag?';
			}
			data.name = to.toLowerCase();
			data.save();
			cachegoose.clearCache();
			return `\`${tag}\` is now named \`${data.name}\` and responds with \`${data.response}\``;
		}
		if (type == 'response') {
			const data = await cmdSchema.findOne({ name: tag });
			if (!data) {
				return 'Could not find that tag. Are you sure thats the correct tag?';
			}
			data.response = to;
			data.save();
			cachegoose.clearCache();
			return `\`${data.name}\` now responds with \`${data.response}\``;
		}
	},
	/**
	 *
	 * @param {string} name The name of the tag.
	 * @returns {string} The output.
	 */
	async deleteTag(name) {
		const data = await cmdSchema.findOneAndDelete({ name: name });
		if (!data) {
			return `Could not find a tag that is named \`${name}\``;
		}
		if (data) {
			cachegoose.clearCache();
			return `Deleted \`${data.name}\`!`;
		}
		cachegoose.clearCache();
	},
	/**
	 *
	 * @returns {object} names and responses.
	 */
	async getTags() {
		const data = await cmdSchema.find({}).cache(60);
		const names = [];
		const responses = [];
		data.forEach(d => {
			names.push(d.name);
			responses.push(d.response);
		});
		return { names, responses };
	},
};
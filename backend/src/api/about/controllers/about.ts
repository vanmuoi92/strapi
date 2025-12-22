/**
 *  about controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::about.about", {
	async find(ctx) {
		ctx.query.populate = "blocks.file,blocks.files";
		return super.find(ctx);
	},

	async findOne(ctx) {
		ctx.query.populate = "blocks.file,blocks.files";
		return super.findOne(ctx);
	},
});

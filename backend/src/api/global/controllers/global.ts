/**
 *  global controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::global.global", {
	async find(ctx) {
		// Populate all fields including nested components and media
		ctx.query.populate = {
			favicon: true,
			logo: true,
			footerLogo: true,
			defaultSeo: {
				populate: "*",
			},
			mainMenu: {
				populate: {
					subMenuItem: {
						populate: "*",
					},
				},
			},
		};

		return super.find(ctx);
	},
});

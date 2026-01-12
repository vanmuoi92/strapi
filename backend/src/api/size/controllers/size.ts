/**
 * size controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::size.size",
	({ strapi }) => ({
		async count(ctx) {
			try {
				const result = await strapi.entityService.count(
					"api::size.size",
					ctx.query,
				);
				ctx.send({ count: result });
			} catch (error) {
				ctx.badRequest("Unable to count sizes");
			}
		},
	}),
);

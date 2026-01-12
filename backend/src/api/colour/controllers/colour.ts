/**
 * colour controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::colour.colour",
	({ strapi }) => ({
		async count(ctx) {
			try {
				const result = await strapi.entityService.count(
					"api::colour.colour",
					ctx.query,
				);
				ctx.send({ count: result });
			} catch (error) {
				ctx.badRequest("Unable to count colours");
			}
		},
	}),
);

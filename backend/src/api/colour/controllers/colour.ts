/**
 * colour controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::colour.colour",
	({ strapi }) => ({
		async find(ctx) {
			const { locale } = ctx.query;

			try {
				const data = await strapi
					.documents("api::colour.colour")
					.findMany({
						locale: locale as string,
						populate: { products: true },
					});

				const sanitized = await this.sanitizeOutput(data, ctx);
				return this.transformResponse(sanitized);
			} catch (error) {
				return ctx.internalServerError("Error fetching colours");
			}
		},
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

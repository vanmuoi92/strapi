/**
 * page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::page.page", {
	async find(ctx) {
		ctx.query.fields = ["title", "description", "slug"];

		ctx.query.populate = {
			cover: {
				fields: ["url", "alternativeText", "width", "height"],
			},
			author: true,
		};
		return super.find(ctx);
	},

	async findBySlug(ctx) {
		const { slug } = ctx.params;

		// Find page by slug
		const pages = await strapi.entityService.findMany("api::page.page", {
			filters: { slug },
			populate: {
				blocks: {
					on: {
						"shared.media": {
							populate: {
								file: {
									fields: [
										"url",
										"alternativeText",
										"width",
										"height",
									],
								},
							},
						},
						"shared.slider": {
							populate: {
								files: {
									fields: [
										"url",
										"alternativeText",
										"width",
										"height",
									],
								},
							},
						},
						"shared.hero": {
							populate: {
								cover: {
									fields: [
										"url",
										"alternativeText",
										"width",
										"height",
									],
								},
							},
						},
						"shared.features": {
							populate: {
								items: {
									populate: {
										icon: {
											fields: [
												"url",
												"alternativeText",
												"width",
												"height",
											],
										},
									},
								},
							},
						},
						"shared.grid": {
							populate: {
								items: {
									populate: {
										image: {
											fields: [
												"url",
												"alternativeText",
												"width",
												"height",
											],
										},
									},
								},
							},
						},
						"shared.quote": {
							populate: "*",
						},
						"shared.rich-text": {
							populate: "*",
						},
					},
				},
				cover: {
					fields: ["url", "alternativeText", "width", "height"],
				},
				author: true,
			},
		});

		if (!pages || pages.length === 0) {
			return ctx.notFound("Page not found");
		}

		return { data: pages[0] };
	},

	async findOne(ctx) {
		ctx.query.populate = {
			blocks: {
				on: {
					"shared.media": {
						populate: {
							file: {
								fields: [
									"url",
									"alternativeText",
									"width",
									"height",
								],
							},
						},
					},
					"shared.slider": {
						populate: {
							files: {
								fields: [
									"url",
									"alternativeText",
									"width",
									"height",
								],
							},
						},
					},
					"shared.hero": {
						populate: {
							cover: {
								fields: [
									"url",
									"alternativeText",
									"width",
									"height",
								],
							},
						},
					},
					"shared.features": {
						populate: {
							items: {
								populate: {
									icon: {
										fields: [
											"url",
											"alternativeText",
											"width",
											"height",
										],
									},
								},
							},
						},
					},
					"shared.grid": {
						populate: {
							items: {
								populate: {
									image: {
										fields: [
											"url",
											"alternativeText",
											"width",
											"height",
										],
									},
								},
							},
						},
					},
					"shared.quote": {
						populate: "*",
					},
					"shared.rich-text": {
						populate: "*",
					},
				},
			},
		};
		return super.findOne(ctx);
	},
});

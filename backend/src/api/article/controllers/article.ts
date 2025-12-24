/**
 *  article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", {
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

		// Use strapi.documents for Strapi v5
		const result = await strapi.documents("api::article.article").findMany({
			filters: { slug },
			populate: {
				blocks: {
					on: {
						"page-builder.media": {
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
						"page-builder.slider": {
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
						"page-builder.hero": {
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
						"page-builder.features": {
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
						"page-builder.grid": {
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
						"page-builder.quote": {
							populate: "*",
						},
						"page-builder.rich-text": {
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

		if (!result || result.length === 0) {
			return ctx.notFound("DEBUG: Article not found for slug: " + slug);
		}

		const sanitizedEntity = await this.sanitizeOutput(result[0], ctx);
		return this.transformResponse(sanitizedEntity);
	},

	async findOne(ctx) {
		ctx.query.populate = {
			blocks: {
				on: {
					"page-builder.media": {
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
					"page-builder.slider": {
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
					"page-builder.hero": {
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
					"page-builder.features": {
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
					"page-builder.grid": {
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
					"page-builder.quote": {
						populate: "*",
					},
					"page-builder.rich-text": {
						populate: "*",
					},
				},
			},
		};
		return super.findOne(ctx);
	},
});

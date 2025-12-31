/**
 * article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", {
	async findBySlug(ctx) {
		const { slug } = ctx.params;

		// Use strapi.documents for Strapi v5
		const result = await strapi.documents("api::article.article").findMany({
			filters: { slug },
			populate: {
				blocks: {
					on: {
						"page-builder.spacing": {
							populate: "*",
						},
						"page-builder.slider-banner": {
							populate: {
								slides: {
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
						"page-builder.rich-text": {
							populate: "*",
						},
						"page-builder.contact-form": {
							populate: "*",
						},
						"page-builder.gallery": {
							populate: {
								images: {
									fields: [
										"url",
										"alternativeText",
										"width",
										"height",
									],
								},
							},
						},
						"page-builder.options-list": {
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
						"page-builder.mechanical-canvas": {
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
						"page-builder.icon-list-left": {
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
						"page-builder.get-articles": {
							populate: "*",
						},
					},
				},
				cover: {
					fields: ["url", "alternativeText", "width", "height"],
				},
				author: true,
				categories: true,
			},
		});

		if (!result || result.length === 0) {
			return ctx.notFound("Article not found");
		}

		const sanitizedEntity = await this.sanitizeOutput(result[0], ctx);
		return this.transformResponse(sanitizedEntity);
	},

	async findOne(ctx) {
		ctx.query.populate = {
			blocks: {
				on: {
					"page-builder.spacing": {
						populate: "*",
					},
					"page-builder.slider-banner": {
						populate: {
							slides: {
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
					"page-builder.rich-text": {
						populate: "*",
					},
					"page-builder.contact-form": {
						populate: "*",
					},
					"page-builder.gallery": {
						populate: {
							images: {
								fields: [
									"url",
									"alternativeText",
									"width",
									"height",
								],
							},
						},
					},
					"page-builder.options-list": {
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
					"page-builder.mechanical-canvas": {
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
					"page-builder.icon-list-left": {
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
					"page-builder.get-articles": {
						populate: "*",
					},
				},
			},
			cover: {
				fields: ["url", "alternativeText", "width", "height"],
			},
			author: true,
			categories: true,
		};
		const response = await super.findOne(ctx);
		return response;
	},
});

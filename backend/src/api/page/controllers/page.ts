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

		// Use strapi.documents for Strapi v5
		const result = await strapi.documents("api::page.page").findMany({
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
					},
				},
				cover: {
					fields: ["url", "alternativeText", "width", "height"],
				},
				author: true,
			},
		});

		if (!result || result.length === 0) {
			return ctx.notFound("Page not found");
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
				},
			},
		};
		const response = await super.findOne(ctx);
		return response;
	},
});

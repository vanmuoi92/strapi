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

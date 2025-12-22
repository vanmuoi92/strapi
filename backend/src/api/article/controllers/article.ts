/**
 *  article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::article.article", {
	async find(ctx) {
		ctx.query.populate = "cover,author";
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
				},
			},
		};
		return super.findOne(ctx);
	},
});

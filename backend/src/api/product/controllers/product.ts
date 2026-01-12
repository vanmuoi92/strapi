/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::product.product",
	({ strapi }) => ({
		async find(ctx) {
			const {
				category,
				size,
				colour,
				page = 1,
				pageSize = 12,
			} = ctx.query;

			// Build filters object
			const filters: any = {};

			// Filter by category
			if (category) {
				filters.categories = {
					id: parseInt(category as string),
				};
			}

			// Filter by size
			if (size) {
				filters.sizes = {
					id: parseInt(size as string),
				};
			}

			// Filter by colour
			if (colour) {
				filters.colours = {
					id: parseInt(colour as string),
				};
			}

			// Calculate pagination
			const start =
				(parseInt(page as string) - 1) * parseInt(pageSize as string);
			const limit = parseInt(pageSize as string);

			try {
				const [results, total] = await Promise.all([
					strapi.documents("api::product.product").findMany({
						filters,
						populate: {
							images: {
								fields: [
									"url",
									"alternativeText",
									"width",
									"height",
								],
							},
							categories: true,
							sizes: true,
							colours: true,
						},
						sort: [{ publishedAt: "desc" }],
						start,
						limit,
					}),
					strapi.documents("api::product.product").count({ filters }),
				]);

				const sanitizedResults = await this.sanitizeOutput(
					results,
					ctx,
				);

				return this.transformResponse({
					data: sanitizedResults,
					meta: {
						pagination: {
							page: parseInt(page as string),
							pageSize: parseInt(pageSize as string),
							pageCount: Math.ceil(
								total / parseInt(pageSize as string),
							),
							total,
						},
					},
				});
			} catch (error) {
				return ctx.badRequest("Unable to fetch products");
			}
		},
		async findBySlug(ctx) {
			const { slug } = ctx.params;
			const { locale } = ctx.query;

			// 1. Find the document ID by slug (search in all locales)
			const products = await strapi
				.documents("api::product.product")
				.findMany({
					filters: { slug },
					locale: "*", // Search across all locales
					limit: 1,
				});

			if (!products || products.length === 0) {
				return ctx.notFound("Product not found");
			}

			const documentId = products[0].documentId;

			// 2. Fetch the localized version using the documentId
			const result = await strapi
				.documents("api::product.product")
				.findMany({
					filters: { documentId },
					locale: locale as string,
					populate: {
						images: {
							fields: [
								"url",
								"alternativeText",
								"width",
								"height",
							],
						},
						categories: true,
					},
				});

			if (!result || result.length === 0) {
				return ctx.notFound("Product not found in requested locale");
			}

			const sanitizedEntity = await this.sanitizeOutput(result[0], ctx);
			return this.transformResponse(sanitizedEntity);
		},
	}),
);

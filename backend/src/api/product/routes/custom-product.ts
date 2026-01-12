/**
 * Custom routes for product
 */

export default {
	routes: [
		{
			method: "GET",
			path: "/products/slug/:slug",
			handler: "api::product.product.findBySlug",
			config: {
				auth: false,
				policies: [],
				middlewares: [],
			},
		},
	],
};

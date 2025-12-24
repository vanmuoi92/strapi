/**
 * Custom routes for article
 */

export default {
	routes: [
		{
			method: "GET",
			path: "/articles/slug/:slug",
			handler: "api::article.article.findBySlug",
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};

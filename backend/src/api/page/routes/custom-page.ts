/**
 * Custom routes for page
 */

export default {
	routes: [
		{
			method: "GET",
			path: "/pages/slug/:slug",
			handler: "api::page.page.findBySlug",
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};

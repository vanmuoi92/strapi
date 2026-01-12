export default {
	routes: [
		{
			method: "GET",
			path: "/colours",
			handler: "colour.find",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "GET",
			path: "/colours/:id",
			handler: "colour.findOne",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "POST",
			path: "/colours",
			handler: "colour.create",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "PUT",
			path: "/colours/:id",
			handler: "colour.update",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "DELETE",
			path: "/colours/:id",
			handler: "colour.delete",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "GET",
			path: "/colours/count",
			handler: "colour.count",
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};

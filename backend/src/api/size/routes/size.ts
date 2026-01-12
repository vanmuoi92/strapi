export default {
	routes: [
		{
			method: "GET",
			path: "/sizes",
			handler: "size.find",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "GET",
			path: "/sizes/:id",
			handler: "size.findOne",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "POST",
			path: "/sizes",
			handler: "size.create",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "PUT",
			path: "/sizes/:id",
			handler: "size.update",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "DELETE",
			path: "/sizes/:id",
			handler: "size.delete",
			config: {
				policies: [],
				middlewares: [],
			},
		},
		{
			method: "GET",
			path: "/sizes/count",
			handler: "size.count",
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};

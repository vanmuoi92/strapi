export default ({ env }) => ({
	email: {
		config: {
			provider: "nodemailer",
			providerOptions: {
				host: env("SMTP_HOST", "smtp.gmail.com"),
				port: env.int("SMTP_PORT", 587),
				auth: {
					user: env("SMTP_USERNAME"),
					pass: env("SMTP_PASSWORD"),
				},
			},
			settings: {
				defaultFrom: env("EMAIL_FROM", "vanmuoi92@gmail.com"),
				defaultReplyTo: env("EMAIL_REPLY_TO", "vanmuoi92@gmail.com"),
			},
		},
	},
});

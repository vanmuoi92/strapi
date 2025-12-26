export default {
	async afterCreate(event) {
		const { result } = event;

		try {
			await strapi.plugins["email"].services.email.send({
				to: "vanmuoi92@gmail.com", // Fallback or dynamic
				from: "noreply@nimo-electric-kart.com",
				subject: `New Contact Submission from ${result.name}`,
				text: `
          Name: ${result.name}
         <br> Email: ${result.email}
         <br> Phone: ${result.phone || "N/A"}
         <br> Message: ${result.message}
        `,
			});
		} catch (err) {
			console.error("Failed to send contact notification email:", err);
		}
	},
};

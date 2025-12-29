export const getApiBaseUrl = () => {
	const baseUrl =
		import.meta.env.VITE_API_BASE_URL || "http://localhost:1337/api";
	return baseUrl.replace(/\/api$/, "");
};

export const getImageUrl = (url?: string) => {
	if (!url) return "";
	if (url.startsWith("http")) return url;
	return `${getApiBaseUrl()}${url}`;
};

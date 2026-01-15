export const addLocaleParam = (url: string, locale?: string) => {
	if (!locale) return url;
	const separator = url.includes("?") ? "&" : "?";
	return `${url}${separator}locale=${locale}`;
};

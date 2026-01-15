import { apiClient } from "./http";
import { addLocaleParam } from "./api-helpers";

export const fetchGlobal = async (locale?: string) => {
	try {
		const url = addLocaleParam("/global?populate=*", locale);
		const response = await apiClient.get(url);
		return response.data.data || null;
	} catch (error) {
		console.error("Error fetching global:", error);
		return null;
	}
};

export const fetchPages = async (locale?: string) => {
	try {
		const url = addLocaleParam("/pages?populate=*", locale);
		const response = await apiClient.get(url);
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching pages:", error);
		return [];
	}
};

export const fetchPageBySlug = async (slug: string, locale?: string) => {
	try {
		const url = addLocaleParam(`/pages/slug/${slug}`, locale);
		const response = await apiClient.get(url);
		return response.data.data || null;
	} catch (error) {
		console.error("Error fetching page:", error);
		return null;
	}
};

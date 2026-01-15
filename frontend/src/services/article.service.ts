import { apiClient } from "./http";
import { addLocaleParam } from "./api-helpers";

export const fetchArticles = async (locale?: string) => {
	try {
		const url = addLocaleParam("/articles?populate=*", locale);
		const response = await apiClient.get(url);
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching articles:", error);
		return [];
	}
};

export const fetchLatestArticles = async (
	limit: number = 3,
	locale?: string,
) => {
	try {
		const url = addLocaleParam(
			`/articles?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`,
			locale,
		);
		const response = await apiClient.get(url);
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching latest articles:", error);
		return [];
	}
};

export const fetchArticleById = async (id: string, locale?: string) => {
	try {
		const url = addLocaleParam(`/articles/${id}?populate=*`, locale);
		const response = await apiClient.get(url);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching article:", error);
		return null;
	}
};

export const fetchArticleBySlug = async (slug: string, locale?: string) => {
	try {
		const url = addLocaleParam(`/articles/slug/${slug}`, locale);
		const response = await apiClient.get(url);
		return response.data.data || null;
	} catch (error) {
		console.error("Error fetching article:", error);
		return null;
	}
};

export const fetchAuthors = async () => {
	try {
		const response = await apiClient.get("/authors?populate=*");
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching authors:", error);
		return [];
	}
};

export const fetchCategories = async () => {
	try {
		const response = await apiClient.get("/categories?populate=*");
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
};

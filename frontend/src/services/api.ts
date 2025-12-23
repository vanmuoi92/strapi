import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${API_TOKEN}`,
	},
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	},
);

export const fetchArticles = async () => {
	try {
		const response = await apiClient.get("/articles?populate=*");
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching articles:", error);
		return [];
	}
};

export const fetchArticleById = async (id: string) => {
	try {
		const response = await apiClient.get(`/articles/${id}?populate=*`);
		return response.data.data;
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

export const fetchAbout = async () => {
	try {
		const response = await apiClient.get("/about");
		return response.data.data || null;
	} catch (error) {
		console.error("Error fetching about:", error);
		return null;
	}
};

export const fetchContact = async () => {
	try {
		const response = await apiClient.get("/contact?populate=*");
		return response.data.data || null;
	} catch (error) {
		console.error("Error fetching contact:", error);
		return null;
	}
};

export const fetchGlobal = async () => {
	try {
		const response = await apiClient.get("/global?populate=*");
		return response.data.data || null;
	} catch (error) {
		console.error("Error fetching global:", error);
		return null;
	}
};

export const fetchPages = async () => {
	try {
		const response = await apiClient.get("/pages?populate=*");
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching pages:", error);
		return [];
	}
};

export const fetchPageBySlug = async (slug: string) => {
	try {
		const response = await apiClient.get(`/pages/slug/${slug}`);
		return response.data.data || null;
	} catch (error) {
		console.error("Error fetching page:", error);
		return null;
	}
};

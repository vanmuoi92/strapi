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

export const addLocaleParam = (url: string, locale?: string) => {
	if (!locale) return url;
	const separator = url.includes("?") ? "&" : "?";
	return `${url}${separator}locale=${locale}`;
};

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

export const fetchProducts = async (
	filters: {
		category?: string;
		size?: string;
		colour?: string;
		page?: number;
		pageSize?: number;
	} = {},
	locale?: string,
) => {
	try {
		const params = new URLSearchParams();

		// Add filter parameters
		if (filters.category) params.append("category", filters.category);
		if (filters.size) params.append("size", filters.size);
		if (filters.colour) params.append("colour", filters.colour);

		// Add pagination parameters
		if (filters.page) params.append("page", filters.page.toString());
		if (filters.pageSize)
			params.append("pageSize", filters.pageSize?.toString() || "12");

		const queryString = params.toString();
		const baseUrl = queryString ? `/products?${queryString}` : `/products`;
		const url = addLocaleParam(baseUrl, locale);

		const response = await apiClient.get(url);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return {
			data: [],
			meta: {
				pagination: { total: 0, page: 1, pageSize: 12, pageCount: 0 },
			},
		};
	}
};

export const fetchProductById = async (id: string, locale?: string) => {
	try {
		const url = addLocaleParam(`/products/${id}?populate=*`, locale);
		const response = await apiClient.get(url);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
};

export const fetchProductBySlug = async (slug: string, locale?: string) => {
	try {
		const url = addLocaleParam(`/products/slug/${slug}`, locale);
		const response = await apiClient.get(url);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching product by slug:", error);
		return null;
	}
};

export const fetchProductCategories = async (locale?: string) => {
	try {
		const url = addLocaleParam(
			"/product-categories?populate=products",
			locale,
		);
		const response = await apiClient.get(url);
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching product categories:", error);
		return [];
	}
};

export const fetchSizes = async (locale?: string) => {
	try {
		const url = addLocaleParam("/sizes?populate=products", locale);
		const response = await apiClient.get(url);
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching sizes:", error);
		return [];
	}
};

export const fetchColours = async (locale?: string) => {
	try {
		const url = addLocaleParam("/colours?populate=products", locale);
		const response = await apiClient.get(url);
		return response.data.data || [];
	} catch (error) {
		console.error("Error fetching colours:", error);
		return [];
	}
};

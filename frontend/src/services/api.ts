import axios from "axios";

const API_BASE_URL = "http://localhost:1337/api";
const API_TOKEN =
	"03397a7722ccc5854f03b2a70439edf2341a856e98df0cedb50aa25fcd776477169876bf3481997ed35939ee4d703099a8c33a22acd4a5777a49da5f201c7fa696d5b3a43d1e5e0a769e4d057b87e564e704b651a607021ac212c775dece165b5cfe1b07aa1eac5b6075603f2d9a267e8a62e14e54ac245a8290f5e24edf0def";

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
		const response = await apiClient.get(
			`/pages?filters[slug][$eq]=${slug}&populate=*`,
		);
		return response.data.data?.[0] || null;
	} catch (error) {
		console.error("Error fetching page:", error);
		return null;
	}
};

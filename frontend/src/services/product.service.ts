import { apiClient } from "./http";
import { addLocaleParam } from "./api-helpers";

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

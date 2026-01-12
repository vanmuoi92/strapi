import { useQuery } from "@tanstack/react-query";
import {
	fetchProducts,
	fetchProductById,
	fetchProductBySlug,
	fetchProductCategories,
	fetchSizes,
	fetchColours,
} from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

export const useProducts = (
	filters: {
		category?: string;
		size?: string;
		colour?: string;
		page?: number;
		pageSize?: number;
	} = {},
) => {
	const { language } = useLanguage();
	const queryKey = [
		"products",
		filters.category,
		filters.size,
		filters.colour,
		filters.page,
		filters.pageSize,
		language,
	];

	return useQuery({
		queryKey,
		queryFn: () => fetchProducts(filters, language),
		staleTime: 5 * 60 * 1000,
		enabled: true,
	});
};

export const useProductById = (id: string) => {
	const { language } = useLanguage();
	return useQuery({
		queryKey: ["product", id, language],
		queryFn: () => fetchProductById(id, language),
		staleTime: 5 * 60 * 1000,
		enabled: !!id,
	});
};

export const useProductBySlug = (slug: string) => {
	const { language } = useLanguage();
	return useQuery({
		queryKey: ["product", slug, language],
		queryFn: () => fetchProductBySlug(slug, language),
		staleTime: 5 * 60 * 1000,
		enabled: !!slug,
	});
};

export const useProductCategories = () => {
	const { language } = useLanguage();
	return useQuery({
		queryKey: ["productCategories", language],
		queryFn: () => fetchProductCategories(language),
		staleTime: 5 * 60 * 1000,
	});
};

export const useSizes = () => {
	const { language } = useLanguage();
	return useQuery({
		queryKey: ["sizes", language],
		queryFn: () => fetchSizes(language),
		staleTime: 5 * 60 * 1000,
	});
};

export const useColours = () => {
	const { language } = useLanguage();
	return useQuery({
		queryKey: ["colours", language],
		queryFn: () => fetchColours(language),
		staleTime: 5 * 60 * 1000,
	});
};

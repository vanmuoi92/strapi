import { useQuery } from "@tanstack/react-query";
import {
	fetchArticles,
	fetchLatestArticles,
	fetchArticleById,
	fetchArticleBySlug,
} from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Article } from "@/types/index";

export const useArticles = () => {
	const { language } = useLanguage();
	return useQuery<Article[]>({
		queryKey: ["articles", language],
		queryFn: () => fetchArticles(language),
		staleTime: 5 * 60 * 1000,
	});
};

export const useLatestArticles = (limit: number = 3) => {
	const { language } = useLanguage();
	return useQuery<Article[]>({
		queryKey: ["articles", "latest", limit, language],
		queryFn: () => fetchLatestArticles(limit, language),
		staleTime: 5 * 60 * 1000,
	});
};

export const useArticleById = (id: string) => {
	const { language } = useLanguage();
	return useQuery<Article>({
		queryKey: ["article", id, language],
		queryFn: () => fetchArticleById(id, language),
		staleTime: 5 * 60 * 1000,
		enabled: !!id,
	});
};

export const useArticleBySlug = (slug: string) => {
	const { language } = useLanguage();
	return useQuery<Article>({
		queryKey: ["article", slug, language],
		queryFn: () => fetchArticleBySlug(slug, language),
		staleTime: 5 * 60 * 1000,
		enabled: !!slug,
	});
};

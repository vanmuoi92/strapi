import { useQuery } from "@tanstack/react-query";
import { fetchArticles, fetchArticleById } from "@/services/api";
import type { Article } from "@/types/index";

export const useArticles = () => {
	return useQuery<Article[]>({
		queryKey: ["articles"],
		queryFn: fetchArticles,
		staleTime: 5 * 60 * 1000,
	});
};

export const useArticleById = (id: string) => {
	return useQuery<Article>({
		queryKey: ["article", id],
		queryFn: () => fetchArticleById(id),
		staleTime: 5 * 60 * 1000,
		enabled: !!id,
	});
};

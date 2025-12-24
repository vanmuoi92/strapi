import { useQuery } from "@tanstack/react-query";
import { fetchGlobal, fetchPages, fetchPageBySlug } from "@/services/api";
import type { Global, Page } from "@/types/index";

export const useGlobal = () => {
	return useQuery<Global>({
		queryKey: ["global"],
		queryFn: fetchGlobal,
		staleTime: 24 * 60 * 60 * 1000,
	});
};

export const usePages = () => {
	return useQuery<Page[]>({
		queryKey: ["pages"],
		queryFn: fetchPages,
		staleTime: 24 * 60 * 60 * 1000,
	});
};

export const usePageBySlug = (slug: string) => {
	return useQuery<Page>({
		queryKey: ["page", slug],
		queryFn: () => fetchPageBySlug(slug),
		staleTime: 24 * 60 * 60 * 1000,
		enabled: !!slug,
	});
};

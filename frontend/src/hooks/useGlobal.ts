import { useQuery } from "@tanstack/react-query";
import { fetchGlobal, fetchPages, fetchPageBySlug } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Global, Page } from "@/types/index";

export const useGlobal = () => {
	const { language } = useLanguage();
	return useQuery<Global>({
		queryKey: ["global", language],
		queryFn: () => fetchGlobal(language),
		staleTime: 24 * 60 * 60 * 1000,
	});
};

export const usePages = () => {
	const { language } = useLanguage();
	return useQuery<Page[]>({
		queryKey: ["pages", language],
		queryFn: () => fetchPages(language),
		staleTime: 24 * 60 * 60 * 1000,
	});
};

export const usePageBySlug = (slug: string) => {
	const { language } = useLanguage();
	return useQuery<Page>({
		queryKey: ["page", slug, language],
		queryFn: () => fetchPageBySlug(slug, language),
		staleTime: 24 * 60 * 60 * 1000,
		enabled: !!slug,
	});
};

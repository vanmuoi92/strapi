import { useQuery } from "@tanstack/react-query";
import {
	fetchGlobal,
	fetchAbout,
	fetchContact,
	fetchPages,
	fetchPageBySlug,
} from "@/services/api";
import type { Global, About, Contact, Page } from "@/types/index";

export const useGlobal = () => {
	return useQuery<Global>({
		queryKey: ["global"],
		queryFn: fetchGlobal,
		staleTime: 24 * 60 * 60 * 1000,
	});
};

export const useAbout = () => {
	return useQuery<About>({
		queryKey: ["about"],
		queryFn: fetchAbout,
		staleTime: 24 * 60 * 60 * 1000,
	});
};

export const useContact = () => {
	return useQuery<Contact>({
		queryKey: ["contact"],
		queryFn: fetchContact,
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

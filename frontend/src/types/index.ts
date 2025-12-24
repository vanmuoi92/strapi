export interface Article {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	cover?: {
		url: string;
		alternativeText?: string;
		width?: number;
		height?: number;
	};
	author?: Author;
	blocks?: Block[];
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface Author {
	id: number;
	documentId: string;
	name: string;
	email?: string;
	bio?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Category {
	id: number;
	documentId: string;
	name: string;
	description?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Block {
	__component: string;
	id: number;
	title?: string;
	body?: string;
	// Props for new components
	description?: string;
	ctaText?: string;
	ctaLink?: string;
	cover?: any;
	items?: any[];
	icon?: any;
	image?: any;
	link?: string;
	[key: string]: any;
}

export interface SubMenuItem {
	id: number;
	Label: string;
	Link: string;
}

export interface MenuItem {
	id: number;
	Label: string;
	link: string;
	subMenuItem: SubMenuItem[];
}

export interface Global {
	id: number;
	documentId: string;
	siteName: string;
	siteDescription?: string;
	favicon?: any;
	Logo?: {
		url: string;
		alternativeText?: string;
		width?: number;
		height?: number;
	};
	defaultSeo?: any;
	mainMenu?: MenuItem[];
	createdAt: string;
	updatedAt: string;
}

export interface Page {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	cover?: any;
	author?: Author;
	category?: Category;
	blocks?: Block[];
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

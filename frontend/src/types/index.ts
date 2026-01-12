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
	categories?: Category[];
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
	label: string;
	link: string;
}

export interface MenuItem {
	id: number;
	label: string;
	link: string;
	subMenuItem: SubMenuItem[];
}

export interface Global {
	id: number;
	documentId: string;
	siteName: string;
	siteDescription?: string;
	favicon?: any;
	logo?: {
		url: string;
		alternativeText?: string;
		width?: number;
		height?: number;
	};
	defaultSeo?: any;
	mainMenu?: MenuItem[];
	footerContactInfo?: any;
	iframeMap?: string;
	facebookUrl?: string;
	instagramUrl?: string;
	youtubeUrl?: string;
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

export interface Product {
	id: number;
	documentId: string;
	name: string;
	slug: string;
	price: number;
	quantity: number;
	description?: string;
	sizes?: Size[];
	colours?: Colour[];
	images?: Array<{
		id: number;
		url: string;
		alternativeText?: string;
	}>;
	categories?: ProductCategory[];
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

export interface ProductCategory {
	id: number;
	documentId: string;
	name: string;
	descripition?: string;
	products?: Product[];
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

export interface Size {
	id: number;
	documentId: string;
	name: string;
	code: string;
	products?: Product[];
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

export interface Colour {
	id: number;
	documentId: string;
	name: string;
	hexCode?: string;
	products?: Product[];
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

export interface Order {
	id: number;
	documentId: string;
	email: string;
	stripeId: string;
	orders?: unknown;
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

export interface Review {
	id: number;
	documentId: string;
	text: string;
	productId: number;
	email: string;
	stars: number;
	username: string;
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

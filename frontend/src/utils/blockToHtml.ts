export interface BlockChild {
	type: string;
	text?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	children?: BlockChild[];
}

export interface Block {
	type: string;
	children?: BlockChild[];
	level?: number;
	format?: string;
	image?: any;
}

const renderChild = (child: BlockChild): string => {
	let html = child.text || "";

	if (child.bold) html = `<strong>${html}</strong>`;
	if (child.italic) html = `<em>${html}</em>`;
	if (child.underline) html = `<u>${html}</u>`;
	if (child.strikethrough) html = `<s>${html}</s>`;
	if (child.code) html = `<code>${html}</code>`;

	if (child.children && child.children.length > 0) {
		const childrenHtml = child.children.map(renderChild).join("");
		html = childrenHtml;
	}

	return html;
};

const renderBlock = (block: Block): string => {
	const childrenHtml = block.children?.map(renderChild).join("") || "";

	switch (block.type) {
		case "heading":
			const level = block.level || 1;
			return `<h${level}>${childrenHtml}</h${level}>`;
		case "paragraph":
			return `<p>${childrenHtml}</p>`;
		case "list":
			const listType = block.format === "ordered" ? "ol" : "ul";
			return `<${listType}><li>${childrenHtml}</li></${listType}>`;
		case "quote":
			return `<blockquote>${childrenHtml}</blockquote>`;
		case "code":
			return `<pre><code>${childrenHtml}</code></pre>`;
		case "image":
			return `<img src="${block.image?.url}" alt="${
				block.image?.alternativeText || ""
			}" />`;
		default:
			return `<p>${childrenHtml}</p>`;
	}
};

export const blocksToHtml = (blocks: Block[]): string => {
	if (!blocks || blocks.length === 0) return "";
	return blocks.map(renderBlock).join("");
};

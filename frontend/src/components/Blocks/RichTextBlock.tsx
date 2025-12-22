interface RichTextBlockProps {
	body: string;
}

const RichTextBlock: React.FC<RichTextBlockProps> = ({ body }) => {
	const markdownToHtml = (markdown: string) => {
		let html = markdown
			.replace(/^### (.*?)$/gm, "<h3>$1</h3>")
			.replace(/^## (.*?)$/gm, "<h2>$1</h2>")
			.replace(/^# (.*?)$/gm, "<h1>$1</h1>")
			.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
			.replace(/\*(.*?)\*/g, "<em>$1</em>")
			.replace(/\n\n/g, "</p><p>")
			.replace(/^(.+)$/gm, (match) => {
				if (match.startsWith("<")) return match;
				return match;
			});
		if (!html.startsWith("<")) html = `<p>${html}</p>`;
		if (!html.endsWith("</p>")) html = `${html}</p>`;
		return html;
	};

	return (
		<div
			style={{ marginBottom: 24 }}
			dangerouslySetInnerHTML={{
				__html: markdownToHtml(body),
			}}
		/>
	);
};

export default RichTextBlock;

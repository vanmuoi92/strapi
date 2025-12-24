import React, { useMemo } from "react";
import { marked } from "marked";

interface RichTextBlockProps {
	body: string;
}

const RichTextBlock: React.FC<RichTextBlockProps> = ({ body }) => {
	// Use useMemo to avoid re-parsing on every render if body hasn't changed
	const htmlContent = useMemo(() => {
		if (!body) return "";
		// Use marked.parseSync for synchronous rendering inside component
		return marked.parse(body);
	}, [body]);

	return (
		<div className="container">
			<div
				className="rich-text-content"
				dangerouslySetInnerHTML={{
					__html: htmlContent,
				}}
			/>
		</div>
	);
};

export default RichTextBlock;

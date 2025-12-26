import React from "react";
import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface RichTextBlockProps {
	body: BlocksContent;
}

const RichTextBlock: React.FC<RichTextBlockProps> = ({ body }) => {
	if (!body) return null;

	return (
		<div className="container">
			<div className="rich-text-content">
				<BlocksRenderer content={body} />
			</div>
		</div>
	);
};

export default RichTextBlock;

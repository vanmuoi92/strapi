import { Button } from "antd";
import { Link } from "react-router-dom";
import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface RichTextBlockProps {
	body: BlocksContent;
	backgroundColor?: string;
	maxWidth?: string;
	textAlign?: "left" | "center" | "right" | "justify";
	ctaText?: string;
	ctaLink?: string;
}

const RichTextBlock: React.FC<RichTextBlockProps> = ({
	body,
	backgroundColor = "#fff",
	maxWidth = "768px",
	textAlign = "left",
	ctaText,
	ctaLink,
}) => {
	if (!body) return null;

	return (
		<div style={{ backgroundColor }}>
			<div
				className="container"
				style={{ maxWidth, margin: "0 auto", textAlign }}>
				<div className="rich-text-content">
					<BlocksRenderer
						content={
							Array.isArray(body)
								? body
								: Array.isArray((body as any)?.data)
								? (body as any).data
								: []
						}
					/>
				</div>
				{ctaText && ctaLink && (
					<div style={{ marginTop: "32px", textAlign: "center" }}>
						<Link to={ctaLink}>
							<Button type="primary" size="large">
								{ctaText}
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default RichTextBlock;

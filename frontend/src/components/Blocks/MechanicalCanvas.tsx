import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/utils/url";
import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface MechanicalCanvasProps {
	image?: {
		url: string;
		alternativeText?: string;
	};
	title?: string;
	contentLeft?: BlocksContent;
	contentRight?: BlocksContent;
	ctaText?: string;
	ctaLink?: string;
	backgroundColor?: string;
}

const MechanicalCanvas: React.FC<MechanicalCanvasProps> = ({
	image,
	title,
	contentLeft,
	contentRight,
	ctaText,
	ctaLink,
	backgroundColor = "#E6E6E4",
}) => {
	return (
		<div style={{ backgroundColor }}>
			<div className="container">
				<Row gutter={[60, 32]} style={{ alignItems: "center" }}>
					<Col xs={24} md={12} style={{ textAlign: "center" }}>
						{image && (
							<div style={{ marginBottom: "40px" }}>
								<img
									src={getImageUrl(image.url)}
									alt={image.alternativeText || title}
									style={{
										width: "100%",
										borderRadius: "0px",
										objectFit: "cover",
									}}
								/>
							</div>
						)}

						{contentLeft && (
							<div>
								<BlocksRenderer content={contentLeft} />
							</div>
						)}
					</Col>
					<Col xs={24} md={12}>
						{contentRight && (
							<div
								style={{
									fontSize: "16px",
									lineHeight: "1.6",
									color: "#292929",
									marginBottom: "32px",
								}}>
								<BlocksRenderer content={contentRight} />
							</div>
						)}
						{ctaText && ctaLink && (
							<Link to={ctaLink}>
								<Button type="primary" size="large">
									{ctaText}
								</Button>
							</Link>
						)}
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default MechanicalCanvas;

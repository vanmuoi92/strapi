import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/utils/url";
import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface IconItem {
	id: number;
	icon: {
		url: string;
		alternativeText?: string;
	};
	title: string;
	description: string;
}

interface IconListLeftProps {
	items: IconItem[];
	contentRight: BlocksContent;
	ctaText?: string;
	ctaLink?: string;
	backgroundColor?: string;
}

const IconListLeft: React.FC<IconListLeftProps> = ({
	items = [],
	contentRight,
	ctaText,
	ctaLink,
	backgroundColor = "#ffffff",
}) => {
	return (
		<div
			className="icon-list-left-section"
			style={{ backgroundColor, padding: "80px 0" }}>
			<div className="container">
				<Row gutter={[60, 40]}>
					<Col xs={24} md={12}>
						<div className="icon-list">
							{items.map((item) => (
								<div key={item.id} className="option-item-row">
									{item.icon && (
										<div className="option-icon-wrapper">
											<img
												src={getImageUrl(item.icon.url)}
												alt={
													item.icon.alternativeText ||
													item.title
												}
											/>
										</div>
									)}
									<div className="option-content">
										<h4 className="option-title">
											{item.title}
										</h4>
										<div className="option-description">
											{item.description}
										</div>
									</div>
								</div>
							))}
						</div>
					</Col>
					<Col xs={24} md={12}>
						<div className="content-right">
							{contentRight && (
								<div className="block-description">
									<BlocksRenderer
										content={
											Array.isArray(contentRight)
												? contentRight
												: Array.isArray(
														(contentRight as any)
															?.data,
												  )
												? (contentRight as any).data
												: []
										}
									/>
								</div>
							)}
							{ctaText && ctaLink && (
								<Link to={ctaLink}>
									<Button type="primary" size="large">
										{ctaText}
									</Button>
								</Link>
							)}
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default IconListLeft;

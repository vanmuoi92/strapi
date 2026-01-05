import React from "react";
import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { getImageUrl } from "@/utils/url";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

interface OptionItem {
	id: number;
	title: string;
	description: string;
	icon: {
		url: string;
		alternativeText?: string;
	};
}

interface OptionsListProps {
	title?: string;
	description?: BlocksContent;
	items: OptionItem[];
	ctaText?: string;
	ctaLink?: string;
}

const OptionsList: React.FC<OptionsListProps> = ({
	title,
	description,
	items,
	ctaText,
	ctaLink,
}) => {
	return (
		<div className="options-list-section uk-section-default fs-section uk-section">
			<div className="container">
				<Row gutter={[60, 40]}>
					<Col xs={24} md={12}>
						<div className="options-items">
							{items?.map((item) => (
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
										<h3 className="option-title">
											{item.title}
										</h3>
										<div className="option-description">
											{item.description}
										</div>
									</div>
								</div>
							))}
						</div>
					</Col>
					<Col xs={24} md={12} style={{ textAlign: "center" }}>
						<div className="section-header">
							{title && <h2 className="block-title">{title}</h2>}
							{description && (
								<div className="block-description">
									<BlocksRenderer
										content={
											Array.isArray(description)
												? description
												: Array.isArray(
														(description as any)
															?.data,
												  )
												? (description as any).data
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

export default OptionsList;

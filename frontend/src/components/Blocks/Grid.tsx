import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/utils/url";

interface CardItem {
	id: number;
	title: string;
	description: string;
	image?: {
		url: string;
		alternativeText?: string;
	};
	link?: string;
}

interface GridProps {
	title?: string;
	description?: string;
	items: CardItem[];
	maxCardWidth?: string;
	maxIntroWidth?: string;
	maxSectionWidth?: string;
}

const Grid: React.FC<GridProps> = ({
	title,
	description,
	items,
	maxCardWidth = "100%",
	maxIntroWidth = "768px",
	maxSectionWidth = "100%",
}) => {
	return (
		<div
			className="container"
			style={{ maxWidth: maxSectionWidth, margin: "0 auto" }}>
			{(title || description) && (
				<div
					style={{
						marginBottom: "80px",
						textAlign: "center",
						maxWidth: maxIntroWidth,
						margin: "0 auto 80px",
					}}>
					{title && <h2>{title}</h2>}
					{description && <p>{description}</p>}
				</div>
			)}
			<Row gutter={[24, 24]} style={{ justifyContent: "space-between" }}>
				{items &&
					items.map((item) => (
						<Col
							xs={24}
							sm={24}
							md={8}
							lg={8}
							key={item.id}
							style={{ maxWidth: maxCardWidth }}>
							<Card
								bordered={false}
								variant="borderless"
								style={{
									height: "100%",
									borderRadius: 0,
									textAlign: "center",
									border: "none",
									boxShadow: "none",
								}}
								cover={
									item.image && (
										<img
											alt={
												item.image.alternativeText ||
												item.title
											}
											src={getImageUrl(item.image.url)}
											style={{
												maxWidth: "100%",
												width: "auto",
												display: "block",
												margin: "0 auto",
												objectFit: "cover",
											}}
										/>
									)
								}>
								<Card.Meta
									title={
										item.link ? (
											<Link
												style={{ color: "#292929" }}
												to={item.link}>
												{item.title}
											</Link>
										) : (
											item.title
										)
									}
									description={item.description}
								/>
							</Card>
						</Col>
					))}
			</Row>
		</div>
	);
};

export default Grid;

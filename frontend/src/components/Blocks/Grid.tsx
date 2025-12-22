import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";

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
}

const Grid: React.FC<GridProps> = ({ title, description, items }) => {
	return (
		<div style={{ marginBottom: "60px" }}>
			{(title || description) && (
				<div style={{ marginBottom: "30px" }}>
					{title && <h2>{title}</h2>}
					{description && (
						<p style={{ fontSize: "16px", color: "#666" }}>
							{description}
						</p>
					)}
				</div>
			)}
			<Row gutter={[24, 24]}>
				{items.map((item) => (
					<Col xs={24} sm={12} md={8} lg={6} key={item.id}>
						<Card
							hoverable
							style={{ height: "100%" }}
							cover={
								item.image && (
									<img
										alt={
											item.image.alternativeText ||
											item.title
										}
										src={`http://localhost:1337${item.image.url}`}
										style={{
											height: "200px",
											objectFit: "cover",
										}}
									/>
								)
							}>
							<Card.Meta
								title={
									item.link ? (
										<Link to={item.link}>{item.title}</Link>
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

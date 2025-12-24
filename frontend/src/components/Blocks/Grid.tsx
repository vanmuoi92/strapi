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
		<div className="container">
			{(title || description) && (
				<div style={{ marginBottom: "50px", textAlign: "center" }}>
					{title && <h2>{title}</h2>}
					{description && (
						<p style={{ fontSize: "16px", color: "#666" }}>
							{description}
						</p>
					)}
				</div>
			)}
			<Row gutter={[24, 24]}>
				{items &&
					items.map((item) => (
						<Col xs={24} sm={24} md={12} lg={12} key={item.id}>
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
												height: "50vh",
												objectFit: "cover",
											}}
										/>
									)
								}>
								<Card.Meta
									title={
										item.link ? (
											<Link to={item.link}>
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

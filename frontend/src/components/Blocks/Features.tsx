import React from "react";
import { Row, Col, Card } from "antd";

interface FeatureItem {
	id: number;
	title: string;
	description: string;
	icon?: {
		url: string;
		alternativeText?: string;
	};
}

interface FeaturesProps {
	title?: string;
	description?: string;
	items: FeatureItem[];
}

const Features: React.FC<FeaturesProps> = ({ title, description, items }) => {
	return (
		<div style={{ marginBottom: "60px", padding: "40px 0" }}>
			{(title || description) && (
				<div style={{ textAlign: "center", marginBottom: "40px" }}>
					{title && <h1>{title}</h1>}
					{description && (
						<p style={{ fontSize: "16px", color: "#666" }}>
							{description}
						</p>
					)}
				</div>
			)}
			<Row gutter={[32, 32]}>
				{items.map((item) => (
					<Col xs={24} md={8} key={item.id}>
						<Card
							bordered={false}
							style={{
								height: "100%",
								textAlign: "center",
								background: "transparent",
							}}
							bodyStyle={{ padding: 0 }}>
							{item.icon && (
								<img
									src={`http://localhost:1337${item.icon.url}`}
									alt={
										item.icon.alternativeText || item.title
									}
									style={{
										height: "64px",
										marginBottom: "20px",
									}}
								/>
							)}
							<h3 style={{ marginBottom: "12px" }}>
								{item.title}
							</h3>
							<p style={{ color: "#666" }}>{item.description}</p>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Features;

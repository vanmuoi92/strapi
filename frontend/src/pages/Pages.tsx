import { Spin, Empty, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { usePages } from "@/hooks/useGlobal";
import styles from "./pages.module.scss";

const Pages: React.FC = () => {
	const { data: pages, isLoading } = usePages();

	if (isLoading) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<Spin />
			</div>
		);
	}

	if (!pages || pages.length === 0) {
		return <Empty description="Không có trang nào" />;
	}

	return (
		<div className={styles.page}>
			<h1 style={{ marginBottom: 32, fontSize: 32, textAlign: "center" }}>
				Các trang
			</h1>
			<Row gutter={[24, 24]}>
				{pages.map((page) => (
					<Col key={page.id} xs={24} sm={12} md={8}>
						<Link
							to={`/pages/${page.slug}`}
							style={{ textDecoration: "none" }}>
							<Card
								hoverable
								cover={
									page.cover ? (
										<img
											src={`http://localhost:1337${page.cover.url}`}
											alt={page.title}
											style={{
												height: 200,
												objectFit: "cover",
											}}
										/>
									) : (
										<div
											style={{
												height: 200,
												backgroundColor: "#f0f0f0",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}>
											<span style={{ color: "#999" }}>
												No image
											</span>
										</div>
									)
								}
								style={{ height: "100%" }}>
								<Card.Meta
									title={page.title}
									description={page.description}
								/>
								{page.author && (
									<p
										style={{
											marginTop: 8,
											fontSize: 12,
											color: "#666",
										}}>
										By {page.author.name}
									</p>
								)}
								{page.category && (
									<p style={{ fontSize: 12, color: "#999" }}>
										{page.category.name}
									</p>
								)}
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Pages;

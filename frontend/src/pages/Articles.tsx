import { Card, Row, Col, Button, Spin, Empty } from "antd";
import { Link } from "react-router-dom";
import { useArticles } from "@/hooks/useArticles";
import styles from "./pages.module.scss";

const Articles: React.FC = () => {
	const { data: articles, isLoading } = useArticles();

	return (
		<div className={styles.page}>
			<h1 style={{ marginBottom: 32, fontSize: 32 }}>Tất cả bài viết</h1>

			{isLoading ? (
				<div style={{ textAlign: "center", padding: "40px" }}>
					<Spin />
				</div>
			) : articles && articles.length > 0 ? (
				<Row gutter={[24, 24]}>
					{articles.map((article) => (
						<Col key={article.id} xs={24} sm={12} lg={8}>
							<Card
								hoverable
								className={styles.articleCard}
								cover={
									article.cover ? (
										<img
											alt={
												article.cover.alternativeText ||
												article.title
											}
											src={`http://localhost:1337${article.cover.url}`}
											style={{
												height: 200,
												objectFit: "cover",
											}}
										/>
									) : (
										<div className={styles.cardCover}>
											<div className={styles.placeholder}>
												{article.title}
											</div>
										</div>
									)
								}>
								<Card.Meta // turbo
									title={article.title}
									description={article.description}
								/>
								<p
									style={{
										fontSize: 12,
										color: "#999",
										marginTop: 12,
									}}>
									{new Date(
										article.publishedAt,
									).toLocaleDateString("vi-VN")}
								</p>
								<Link to={`/articles/${article.slug}`}>
									<Button type="primary" block>
										Đọc thêm
									</Button>
								</Link>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<Empty description="Không có bài viết nào" />
			)}
		</div>
	);
};

export default Articles;

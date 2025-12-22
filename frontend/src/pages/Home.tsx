import { Card, Row, Col, Button, Spin, Empty } from "antd";
import { Link } from "react-router-dom";
import { useArticles } from "@/hooks/useArticles";
import { useGlobal } from "@/hooks/useGlobal";
import styles from "./pages.module.scss";

const Home: React.FC = () => {
	const { data: articles, isLoading: articlesLoading } = useArticles();
	const { data: globalData } = useGlobal();

	return (
		<div className={styles.page}>
			<div className={styles.hero}>
				<h1>{globalData?.siteName || "Nimo Electric Kart"}</h1>
				<p>
					{globalData?.siteDescription ||
						"Nền tảng quản lý xe điện hiện đại"}
				</p>
			</div>

			<section className={styles.section}>
				<h2>Bài viết mới nhất</h2>
				{articlesLoading ? (
					<div style={{ textAlign: "center", padding: "40px" }}>
						<Spin />
					</div>
				) : articles && articles.length > 0 ? (
					<Row gutter={[24, 24]}>
						{articles.slice(0, 6).map((article) => (
							<Col key={article.id} xs={24} sm={12} lg={8}>
								<Card
									hoverable
									className={styles.articleCard}
									cover={
										<div className={styles.cardCover}>
											<div className={styles.placeholder}>
												Bài viết
											</div>
										</div>
									}>
									<Card.Meta
										title={article.title}
										description={article.description}
									/>
									<Link
										to={`/articles/${article.documentId}`}>
										<Button
											type="primary"
											block
											style={{ marginTop: 16 }}>
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
			</section>

			<section className={styles.section}>
				<Link to="/articles">
					<Button type="primary" size="large">
						Xem tất cả bài viết
					</Button>
				</Link>
			</section>
		</div>
	);
};

export default Home;

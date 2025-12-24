import { Spin, Empty, Breadcrumb } from "antd";
import { BlockRenderer } from "@/components/Blocks";
import { useParams, Link } from "react-router-dom";
import { useArticleBySlug } from "@/hooks/useArticles";
import styles from "./pages.module.scss";

const ArticleDetail: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const { data: article, isLoading } = useArticleBySlug(slug || "");

	if (isLoading) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<Spin />
			</div>
		);
	}

	if (!article) {
		return <Empty description="Bài viết không tìm thấy" />;
	}

	return (
		<div className={styles.page}>
			<Breadcrumb // turbo
				items={[
					{ title: <Link to="/">Trang chủ</Link> },
					{ title: <Link to="/articles">Bài viết</Link> },
					{ title: article.title },
				]}
				style={{ marginBottom: 24 }}
			/>

			{article.cover && (
				<img
					src={`http://localhost:1337${article.cover.url}`}
					alt={article.cover.alternativeText || article.title}
					style={{
						width: "100%",
						maxHeight: 400,
						objectFit: "cover",
						borderRadius: 8,
						marginBottom: 32,
					}}
				/>
			)}

			<article className={styles.article}>
				<h1 style={{ marginBottom: 16 }}>{article.title}</h1>

				<div
					style={{
						display: "flex",
						gap: 16,
						marginBottom: 24,
						fontSize: 14,
						color: "#666",
					}}>
					{article.author && <span>By {article.author.name}</span>}
					{article.publishedAt && (
						<span>
							{new Date(article.publishedAt).toLocaleDateString(
								"vi-VN",
							)}
						</span>
					)}
				</div>

				<p
					style={{
						fontSize: 16,
						marginBottom: 32,
						color: "#555",
						lineHeight: 1.6,
					}}>
					{article.description}
				</p>

				<div
					style={{
						marginTop: 32,
						lineHeight: 1.8,
						color: "#555",
					}}>
					{article.blocks && article.blocks.length > 0 ? (
						<div>
							{article.blocks.map((block, index) => (
								<BlockRenderer
									key={block.id || index}
									block={block}
								/>
							))}
						</div>
					) : (
						<p>Không có nội dung chi tiết</p>
					)}
				</div>
			</article>
		</div>
	);
};

export default ArticleDetail;

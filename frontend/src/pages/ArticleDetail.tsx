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
		<div className={styles.page} style={{ padding: "100px 0" }}>
			<article className={styles.article}>
				<div className="container" style={{ marginBottom: 100 }}>
					<Breadcrumb
						items={[
							{ title: <Link to="/articles">Bài viết</Link> },
							{ title: article.title },
						]}
						style={{ marginBottom: 24 }}
					/>
					<h1 style={{ marginBottom: 40 }}>{article.title}</h1>
					{article.cover && (
						<img
							src={`http://localhost:1337${article.cover.url}`}
							alt={article.title}
						/>
					)}
				</div>

				{article.blocks && article.blocks.length > 0 ? (
					<div>
						{article.blocks.map((block) => (
							<BlockRenderer key={block.id} block={block} />
						))}
					</div>
				) : (
					<p>Không có nội dung</p>
				)}
			</article>
		</div>
	);
};

export default ArticleDetail;

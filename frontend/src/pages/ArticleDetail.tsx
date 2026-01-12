import { Spin, Empty, Breadcrumb } from "antd";
import { BlockRenderer } from "@/components/Blocks";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useArticleBySlug } from "@/hooks/useArticles";
import { getImageUrl } from "@/utils/url";
import styles from "./pages.module.scss";

const ArticleDetail: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const { data: article, isLoading } = useArticleBySlug(slug || "");

	useEffect(() => {
		if (article && article.slug && article.slug !== slug) {
			navigate(`/articles/${article.slug}`, { replace: true });
		}
	}, [article, slug, navigate]);

	if (isLoading) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<Spin />
			</div>
		);
	}

	if (!article) {
		return <Empty description="Article not found" />;
	}

	return (
		<div className={styles.page} style={{ padding: "100px 0" }}>
			<article className={styles.article}>
				<div className="container" style={{ marginBottom: 100 }}>
					<Breadcrumb
						items={[
							{ title: <Link to="/articles">Articles</Link> },
							{ title: article.title },
						]}
						style={{ marginBottom: 24 }}
					/>
					<h1 style={{ marginBottom: 40 }}>{article.title}</h1>
					{article.cover && (
						<img
							src={getImageUrl(article.cover.url)}
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

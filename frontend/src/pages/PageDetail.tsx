import { Spin, Empty, Breadcrumb } from "antd";
import { useParams, Link } from "react-router-dom";
import { usePageBySlug } from "@/hooks/useGlobal";
import { BlockRenderer } from "@/components/Blocks";
import styles from "./pages.module.scss";

const PageDetail: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const { data: page, isLoading } = usePageBySlug(slug || "");

	if (isLoading) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<Spin />
			</div>
		);
	}

	if (!page) {
		return <Empty description="Trang không tồn tại" />;
	}

	return (
		<div className={styles.page}>
			<Breadcrumb
				items={[
					{ title: <Link to="/">Trang chủ</Link> },
					{ title: <Link to="/pages">Các trang</Link> },
					{ title: page.title },
				]}
				style={{ marginBottom: 24 }}
			/>

			{page.cover && (
				<img
					src={`http://localhost:1337${page.cover.url}`}
					alt={page.title}
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
				<h1 style={{ marginBottom: 16 }}>{page.title}</h1>

				<div
					style={{
						display: "flex",
						gap: 16,
						marginBottom: 24,
						fontSize: 14,
						color: "#666",
					}}>
					{page.author && <span>By {page.author.name}</span>}
					{page.category && <span>{page.category.name}</span>}
					{page.publishedAt && (
						<span>
							{new Date(page.publishedAt).toLocaleDateString(
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
					{page.description}
				</p>

				<div
					style={{
						marginTop: 32,
						lineHeight: 1.8,
						color: "#555",
					}}>
					{page.blocks && page.blocks.length > 0 ? (
						<div>
							{page.blocks.map((block) => (
								<BlockRenderer key={block.id} block={block} />
							))}
						</div>
					) : (
						<p>Không có nội dung</p>
					)}
				</div>
			</article>
		</div>
	);
};

export default PageDetail;

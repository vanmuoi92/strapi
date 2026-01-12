import { useEffect } from "react";
import { Spin, Empty } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { usePageBySlug } from "@/hooks/useGlobal";
import { BlockRenderer } from "@/components/Blocks";
import styles from "./pages.module.scss";

interface PageDetailProps {
	slug?: string;
}

const PageDetail: React.FC<PageDetailProps> = ({ slug: propSlug }) => {
	const { slug: paramSlug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const slug = propSlug || paramSlug;
	const { data: page, isLoading } = usePageBySlug(slug || "");

	useEffect(() => {
		// Only sync if utilizing paramSlug (dynamic route)
		if (paramSlug && page && page.slug && page.slug !== paramSlug) {
			navigate(`/${page.slug}`, { replace: true });
		}
	}, [page, paramSlug, navigate]);

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
			<article className={styles.article}>
				{page.blocks && page.blocks.length > 0 ? (
					<div>
						{page.blocks.map((block) => (
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

export default PageDetail;

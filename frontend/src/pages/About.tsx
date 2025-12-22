import { Spin, Empty } from "antd";
import { useAbout } from "@/hooks/useGlobal";
import { BlockRenderer } from "@/components/Blocks";
import styles from "./pages.module.scss";

const About: React.FC = () => {
	const { data: about, isLoading } = useAbout();

	if (isLoading) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<Spin />
			</div>
		);
	}

	if (!about) {
		return <Empty description="Không có thông tin" />;
	}

	return (
		<div className={styles.page}>
			<div className={styles.infoBox}>
				<h2>{about.title}</h2>
				<div style={{ marginTop: 24, lineHeight: 1.8, color: "#555" }}>
					{about.blocks && about.blocks.length > 0 ? (
						<div>
							{about.blocks.map((block) => (
								<BlockRenderer key={block.id} block={block} />
							))}
						</div>
					) : (
						<p>Không có nội dung</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default About;

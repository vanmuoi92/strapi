import { Layout, Row, Col } from "antd";
import {
	FacebookOutlined,
	InstagramOutlined,
	YoutubeOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { useGlobal } from "@/hooks/useGlobal";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import styles from "./footer.module.scss";

const { Footer: AntFooter } = Layout;

interface MenuItem {
	id: number;
	label: string;
	link: string;
}

interface FooterProps {
	mainMenu?: MenuItem[];
	siteName?: string;
}

const Footer: React.FC<FooterProps> = () => {
	const { data: global } = useGlobal();
	const year = new Date().getFullYear();

	if (!global) return null;

	const siteName = global.siteName || "Nimo Electric Kart";
	const footerContactInfo = global.footerContactInfo;
	const iframeMap = global.iframeMap;
	const facebookUrl = global.facebookUrl;
	const instagramUrl = global.instagramUrl;
	const youtubeUrl = global.youtubeUrl;

	return (
		<AntFooter className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.footerContent}>
					<Row gutter={[48, 48]}>
						<Col xs={24} md={6} style={{ padding: 0 }}>
							<div className={styles.footerSection}>
								<h3>Contact Info</h3>
								<div className={styles.contactInfo}>
									{footerContactInfo ? (
										<BlocksRenderer
											content={
												Array.isArray(footerContactInfo)
													? footerContactInfo
													: Array.isArray(
															(
																footerContactInfo as any
															)?.data,
													  )
													? (footerContactInfo as any)
															.data
													: []
											}
										/>
									) : (
										<>
											<p>
												<strong>HQ / Showroom:</strong>{" "}
												NiMO Lab
											</p>
											<p>
												<strong>Track:</strong> Di An,
												Binh Duong
											</p>
											<p>
												<strong>Hotline:</strong> +84 12
												34 56 789
											</p>
										</>
									)}
								</div>
								<div className={styles.socialIcons}>
									{facebookUrl && (
										<a
											href={facebookUrl}
											target="_blank"
											rel="noreferrer">
											<FacebookOutlined />
										</a>
									)}
									{instagramUrl && (
										<a
											href={instagramUrl}
											target="_blank"
											rel="noreferrer">
											<InstagramOutlined />
										</a>
									)}
									{youtubeUrl && (
										<a
											href={youtubeUrl}
											target="_blank"
											rel="noreferrer">
											<YoutubeOutlined />
										</a>
									)}
									<a href="mailto:info@nimokart.com">
										<MailOutlined />
									</a>
								</div>
							</div>
						</Col>
						<Col xs={24} md={18} style={{ padding: 0 }}>
							<div className={styles.mapContainer}>
								{iframeMap ? (
									<div
										className="wrapper-iframe"
										dangerouslySetInnerHTML={{
											__html: iframeMap,
										}}
									/>
								) : (
									<div
										style={{
											height: "100%",
											background: "#eee",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}>
										Map not configured
									</div>
								)}
							</div>
						</Col>
					</Row>
				</div>
			</div>

			<div className={styles.footerBottom}>
				<div className={styles.footerContainer}>
					<p>
						Copyright © {year} {siteName}. All rights reserved.
					</p>
				</div>
			</div>
		</AntFooter>
	);
};

export default Footer;

import { Layout } from "antd";
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
	const year = new Date().getFullYear();

	return (
		<AntFooter className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.footerContent}>
					<div className={styles.footerSection}>
						<h3>Về chúng tôi</h3>
						<p>
							Nimo Electric Kart - Nền tảng quản lý xe điện hiện
							đại
						</p>
					</div>
					<div className={styles.footerSection}>
						<h3>Liên kết nhanh</h3>
						<ul>
							<li>
								<Link to="/">Trang chủ</Link>
							</li>
							<li>
								<Link to="/articles">Bài viết</Link>
							</li>
							<li>
								<Link to="/pages">Trang</Link>
							</li>
							<li>
								<Link to="/about">Về chúng tôi</Link>
							</li>
							<li>
								<Link to="/contact">Liên hệ</Link>
							</li>
						</ul>
					</div>
					<div className={styles.footerSection}>
						<h3>Liên hệ</h3>
						<p>Email: info@nimokart.com</p>
						<p>Điện thoại: +84 (0) 123 456 789</p>
					</div>
				</div>
				<div className={styles.footerBottom}>
					<p>
						Copyright © {year} Nimo Electric Kart. All rights
						reserved.
					</p>
				</div>
			</div>
		</AntFooter>
	);
};

export default Footer;

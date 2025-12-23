import { Layout } from "antd";
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";

const { Footer: AntFooter } = Layout;

interface MenuItem {
	id: number;
	Label: string;
	link: string;
}

interface FooterProps {
	mainMenu?: MenuItem[];
	siteName?: string;
}

const Footer: React.FC<FooterProps> = ({
	mainMenu = [],
	siteName = "Nimo Electric Kart",
}) => {
	const year = new Date().getFullYear();

	return (
		<AntFooter className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.footerContent}>
					<div className={styles.footerSection}>
						<h3>Về chúng tôi</h3>
						<p>{siteName} - Nền tảng quản lý xe điện hiện đại</p>
					</div>
					<div className={styles.footerSection}>
						<h3>Liên kết nhanh</h3>
						<ul>
							{mainMenu.map((item) => (
								<li key={item.id}>
									<Link to={item.link}>{item.Label}</Link>
								</li>
							))}
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
						Copyright © {year} {siteName}. All rights reserved.
					</p>
				</div>
			</div>
		</AntFooter>
	);
};

export default Footer;

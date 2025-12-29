import { Layout } from "antd";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/utils/url";
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
	footerAboutTitle?: string;
	footerAboutDescription?: string;
	footerContactTitle?: string;
	footerEmail?: string;
	footerPhone?: string;
	footerCopyright?: string;
	footerLogo?: {
		url: string;
		alternativeText?: string;
	};
}

const Footer: React.FC<FooterProps> = ({
	mainMenu = [],
	siteName = "Nimo Electric Kart",
	footerAboutTitle = "Về chúng tôi",
	footerAboutDescription,
	footerContactTitle = "Liên hệ",
	footerEmail,
	footerPhone,
	footerCopyright,
	footerLogo,
}) => {
	const year = new Date().getFullYear();

	return (
		<AntFooter className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.footerContent}>
					<div className={styles.footerSection}>
						{footerLogo ? (
							<img
								src={getImageUrl(footerLogo.url)}
								alt={footerLogo.alternativeText || siteName}
								className={styles.footerLogo}
								style={{
									maxWidth: "150px",
									marginBottom: "20px",
								}}
							/>
						) : (
							<h3>{footerAboutTitle}</h3>
						)}
						<p>
							{footerAboutDescription ||
								`${siteName} - Nền tảng quản lý xe điện hiện đại`}
						</p>
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
						<h3>{footerContactTitle}</h3>
						{footerEmail && <p>Email: {footerEmail}</p>}
						{footerPhone && <p>Điện thoại: {footerPhone}</p>}
						{!footerEmail && !footerPhone && (
							<>
								<p>Email: info@nimokart.com</p>
								<p>Điện thoại: +84 (0) 123 456 789</p>
							</>
						)}
					</div>
				</div>
				<div className={styles.footerBottom}>
					<p>
						{footerCopyright ||
							`Copyright © ${year} ${siteName}. All rights reserved.`}
					</p>
				</div>
			</div>
		</AntFooter>
	);
};

export default Footer;

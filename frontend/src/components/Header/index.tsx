import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";

const { Header: AntHeader } = Layout;

interface HeaderProps {
	siteName?: string;
}

const Header: React.FC<HeaderProps> = ({ siteName = "Nimo Electric Kart" }) => {
	const menuItems = [
		{
			key: "home",
			label: <Link to="/">Trang chủ</Link>,
		},
		{
			key: "articles",
			label: <Link to="/articles">Bài viết</Link>,
		},
		{
			key: "pages",
			label: <Link to="/pages">Trang</Link>,
		},
		{
			key: "about",
			label: <Link to="/about">Về chúng tôi</Link>,
		},
		{
			key: "contact",
			label: <Link to="/contact">Liên hệ</Link>,
		},
	];

	return (
		<AntHeader className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.logo}>
					<Link to="/">
						<h1>{siteName}</h1>
					</Link>
				</div>
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["home"]}
					items={menuItems}
					className={styles.menu}
				/>
			</div>
		</AntHeader>
	);
};

export default Header;

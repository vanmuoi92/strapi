import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";

const { Header: AntHeader } = Layout;

interface SubMenuItem {
	id: number;
	Label: string;
	Link: string;
}

interface MenuItem {
	id: number;
	Label: string;
	link: string;
	subMenuItem: SubMenuItem[];
}

interface HeaderProps {
	siteName?: string;
	mainMenu?: MenuItem[];
}

const Header: React.FC<HeaderProps> = ({
	siteName = "Nimo Electric Kart",
	mainMenu = [],
}) => {
	// Convert backend menu data to Ant Design Menu format
	const menuItems = mainMenu.map((item) => {
		const baseItem = {
			key: item.id.toString(),
			label: <Link to={item.link}>{item.Label}</Link>,
		};

		// Add submenu if exists
		if (item.subMenuItem && item.subMenuItem.length > 0) {
			return {
				...baseItem,
				children: item.subMenuItem.map((subItem) => ({
					key: `${item.id}-${subItem.id}`,
					label: <Link to={subItem.Link}>{subItem.Label}</Link>,
				})),
			};
		}

		return baseItem;
	});

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
					defaultSelectedKeys={["1"]}
					items={menuItems}
					className={styles.menu}
				/>
			</div>
		</AntHeader>
	);
};

export default Header;

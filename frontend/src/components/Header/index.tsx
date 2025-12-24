import { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
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
	logo?: {
		url: string;
		alternativeText?: string;
	};
	mainMenu?: MenuItem[];
}

const Header: React.FC<HeaderProps> = ({
	siteName = "Nimo Electric Kart",
	logo,
	mainMenu = [],
}) => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 1024;
			setIsMobile(mobile);
			if (!mobile) setIsDrawerVisible(false);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Convert backend menu data to Ant Design Menu format
	const menuItems = mainMenu.map((item) => {
		const baseItem = {
			key: item.id.toString(),
			label: (
				<Link to={item.link} onClick={() => setIsDrawerVisible(false)}>
					{item.Label}
				</Link>
			),
		};

		// Add submenu if exists
		if (item.subMenuItem && item.subMenuItem.length > 0) {
			return {
				...baseItem,
				children: item.subMenuItem.map((subItem) => ({
					key: `${item.id}-${subItem.id}`,
					label: (
						<Link
							to={subItem.Link}
							onClick={() => setIsDrawerVisible(false)}>
							{subItem.Label}
						</Link>
					),
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
						{logo ? (
							<img
								src={`http://localhost:1337${logo.url}`}
								alt={logo.alternativeText || siteName}
								className={styles.logoImage}
							/>
						) : (
							<h1>{siteName}</h1>
						)}
					</Link>
				</div>
				<div className={styles.menuWrapper}>
					{!isMobile ? (
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={["1"]}
							items={menuItems}
							className={styles.menu}
						/>
					) : (
						<div className={styles.mobileActions}>
							<Button
								type="text"
								icon={
									<MenuOutlined style={{ color: "white" }} />
								}
								onClick={() => setIsDrawerVisible(true)}
							/>
							<Drawer
								title={siteName}
								placement="right"
								onClose={() => setIsDrawerVisible(false)}
								open={isDrawerVisible}
								className={styles.mobileDrawer}>
								<Menu
									mode="vertical"
									defaultSelectedKeys={["1"]}
									items={menuItems}
								/>
							</Drawer>
						</div>
					)}
				</div>
			</div>
		</AntHeader>
	);
};

export default Header;

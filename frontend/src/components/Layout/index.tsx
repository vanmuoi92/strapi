import { Layout } from "antd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGlobal } from "@/hooks/useGlobal";
import styles from "./layout.module.scss";

const { Content } = Layout;

interface LayoutProps {
	children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
	const { data: globalData } = useGlobal();

	return (
		<Layout
			style={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#fff",
			}}>
			<Header
				siteName={globalData?.siteName}
				logo={globalData?.logo}
				mainMenu={globalData?.mainMenu || []}
			/>
			<Content className={styles.content}>
				<div className={styles.contentWrapper}>{children}</div>
			</Content>
			<Footer
				siteName={globalData?.siteName}
				mainMenu={globalData?.mainMenu || []}
			/>
		</Layout>
	);
};

export default AppLayout;

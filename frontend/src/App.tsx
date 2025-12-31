import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/Layout";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import PageDetail from "@/pages/PageDetail";

import { App as AntApp, ConfigProvider } from "antd";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#292929",
						borderRadius: 0,
						fontFamily:
							'"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
						fontSize: 16,
					},
					components: {
						Button: {
							controlHeightLG: 48,
							paddingInlineLG: 32,
						},
					},
				}}>
				<AntApp>
					<BrowserRouter>
						<AppLayout>
							<Routes>
								<Route
									path="/"
									element={<PageDetail slug="home" />}
								/>
								<Route
									path="/articles"
									element={<Articles />}
								/>
								<Route
									path="/articles/:slug"
									element={<ArticleDetail />}
								/>
								<Route path="/:slug" element={<PageDetail />} />
							</Routes>
						</AppLayout>
					</BrowserRouter>
				</AntApp>
			</ConfigProvider>
		</QueryClientProvider>
	);
}

export default App;

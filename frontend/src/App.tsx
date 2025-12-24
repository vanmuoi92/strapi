import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/Layout";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import PageDetail from "@/pages/PageDetail";

import { App as AntApp } from "antd";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AntApp>
				<BrowserRouter>
					<AppLayout>
						<Routes>
							<Route
								path="/"
								element={<PageDetail slug="home" />}
							/>
							<Route path="/articles" element={<Articles />} />
							<Route
								path="/articles/:slug"
								element={<ArticleDetail />}
							/>
							<Route path="/:slug" element={<PageDetail />} />
						</Routes>
					</AppLayout>
				</BrowserRouter>
			</AntApp>
		</QueryClientProvider>
	);
}

export default App;

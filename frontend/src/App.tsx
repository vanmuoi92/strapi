import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/Layout";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import PageDetail from "@/pages/PageDetail";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppLayout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/articles" element={<Articles />} />
						<Route
							path="/articles/:id"
							element={<ArticleDetail />}
						/>
						<Route path="/page/:slug" element={<PageDetail />} />
					</Routes>
				</AppLayout>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;

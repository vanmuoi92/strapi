import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/Layout";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Pages from "@/pages/Pages";
import PageDetail from "@/pages/PageDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import "./App.css";

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
						<Route path="/pages" element={<Pages />} />
						<Route path="/pages/:slug" element={<PageDetail />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
				</AppLayout>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;

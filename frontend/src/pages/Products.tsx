import {
	Card,
	Row,
	Col,
	Button,
	Spin,
	Empty,
	Select,
	Space,
	Pagination,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
	useProducts,
	useProductCategories,
	useSizes,
	useColours,
} from "@/hooks/useProducts";
import { getImageUrl } from "@/utils/url";
import { useState } from "react";
import type { Product, ProductCategory, Size, Colour } from "@/types/index";
import styles from "./pages.module.scss";

const Products: React.FC = () => {
	const { data: categories } = useProductCategories();
	const { data: sizes } = useSizes();
	const { data: colours } = useColours();

	const [selectedCategory, setSelectedCategory] = useState<
		string | undefined
	>();
	const [selectedSize, setSelectedSize] = useState<string | undefined>();
	const [selectedColour, setSelectedColour] = useState<string | undefined>();
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(12);

	// Use server-side filtering and pagination
	const { data: productsResponse, isLoading } = useProducts({
		category: selectedCategory,
		size: selectedSize,
		colour: selectedColour,
		page: currentPage,
		pageSize,
	});

	const products = productsResponse?.data || [];
	const pagination = productsResponse?.meta?.pagination;

	const handleFilterChange = () => {
		setCurrentPage(1); // Reset to first page when filters change
	};

	const handlePageChange = (page: number, size?: number) => {
		setCurrentPage(page);
		if (size && size !== pageSize) {
			setPageSize(size);
		}
	};

	return (
		<div className="container">
			<div className={styles.page} style={{ padding: "100px 0" }}>
				<h1
					style={{
						marginBottom: 32,
						fontSize: 32,
						textAlign: "center",
					}}>
					Products
				</h1>

				<Space
					style={{ marginBottom: 24, width: "100%" }}
					direction="vertical">
					<Space wrap>
						<Select
							placeholder="Filter by category"
							style={{ width: 200 }}
							allowClear
							value={selectedCategory}
							onChange={(value) => {
								setSelectedCategory(value);
								handleFilterChange();
							}}
							options={
								categories?.map((cat: ProductCategory) => ({
									label: cat.name,
									value: cat.id.toString(),
								})) || []
							}
						/>
						<Select
							placeholder="Filter by size"
							style={{ width: 150 }}
							allowClear
							value={selectedSize}
							onChange={(value) => {
								setSelectedSize(value);
								handleFilterChange();
							}}
							options={
								sizes?.map((size: Size) => ({
									label: size.name,
									value: size.id.toString(),
								})) || []
							}
						/>
						<Select
							placeholder="Filter by colour"
							style={{ width: 150 }}
							allowClear
							value={selectedColour}
							onChange={(value) => {
								setSelectedColour(value);
								handleFilterChange();
							}}
							options={
								colours?.map((colour: Colour) => ({
									label: colour.name,
									value: colour.id.toString(),
								})) || []
							}
						/>
					</Space>
				</Space>

				{isLoading ? (
					<div style={{ textAlign: "center", padding: "40px" }}>
						<Spin />
					</div>
				) : products && products.length > 0 ? (
					<>
						<Row gutter={[24, 24]}>
							{products.map((product: Product) => (
								<Col key={product.id} xs={24} sm={12} lg={8}>
									<Card
										hoverable
										className={styles.articleCard}
										cover={
											product.images &&
											product.images.length > 0 ? (
												<img
													alt={product.name}
													src={getImageUrl(
														product.images[0].url,
													)}
													style={{
														height: 200,
														objectFit: "cover",
													}}
												/>
											) : (
												<div
													className={
														styles.cardCover
													}>
													<div
														className={
															styles.placeholder
														}>
														{product.name}
													</div>
												</div>
											)
										}>
										<Card.Meta
											title={product.name}
											description={product.description}
										/>
										<div
											style={{
												marginTop: 12,
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}>
											<span
												style={{
													fontSize: 18,
													fontWeight: "bold",
													color: "#292929",
												}}>
												${product.price}
											</span>
											<span
												style={{
													color: "#999",
													fontSize: 12,
												}}>
												Stock: {product.quantity}
											</span>
										</div>
										<Link to={`/products/${product.slug}`}>
											<Button
												type="primary"
												block
												icon={<ShoppingCartOutlined />}
												style={{ marginTop: 12 }}>
												View Details
											</Button>
										</Link>
									</Card>
								</Col>
							))}
						</Row>

						{/* Pagination */}
						{pagination &&
							pagination.total > pagination.pageSize && (
								<div
									style={{
										textAlign: "center",
										marginTop: 32,
									}}>
									<Pagination
										current={pagination.page}
										pageSize={pagination.pageSize}
										total={pagination.total}
										showSizeChanger
										showQuickJumper
										showTotal={(total, range) =>
											`${range[0]}-${range[1]} of ${total} products`
										}
										onChange={handlePageChange}
										pageSizeOptions={[
											"6",
											"12",
											"24",
											"48",
										]}
									/>
								</div>
							)}
					</>
				) : (
					<Empty description="No products found" />
				)}
			</div>
		</div>
	);
};

export default Products;

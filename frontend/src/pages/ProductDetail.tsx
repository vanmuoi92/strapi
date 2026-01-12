import { useEffect } from "react";
import { Card, Row, Col, Button, Spin, Empty } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useProductBySlug } from "@/hooks/useProducts";
import { getImageUrl } from "@/utils/url";

const ProductDetail: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const { data: product, isLoading } = useProductBySlug(slug || "");

	// Sync URL with actual product slug (for i18n)
	useEffect(() => {
		if (product && product.slug && product.slug !== slug) {
			navigate(`/products/${product.slug}`, { replace: true });
		}
	}, [product, slug, navigate]);

	if (isLoading) {
		return (
			<div style={{ textAlign: "center", padding: "100px 0" }}>
				<Spin />
			</div>
		);
	}

	if (!product) {
		return (
			<div className="container" style={{ padding: "100px 0" }}>
				<Empty description="Product not found" />
			</div>
		);
	}

	return (
		<div className="container">
			<div style={{ padding: "100px 0" }}>
				<Button
					type="text"
					icon={<ArrowLeftOutlined />}
					onClick={() => navigate("/products")}
					style={{ marginBottom: 24 }}>
					Back to Products
				</Button>

				<Row gutter={[32, 32]}>
					<Col xs={24} md={12}>
						{product.images && product.images.length > 0 ? (
							<Card
								cover={
									<img
										alt={product.name}
										src={getImageUrl(product.images[0].url)}
										style={{
											height: 400,
											objectFit: "cover",
										}}
									/>
								}
							/>
						) : (
							<Card
								style={{
									height: 400,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Empty description="No image" />
							</Card>
						)}
					</Col>

					<Col xs={24} md={12}>
						<h1 style={{ fontSize: 32, marginBottom: 16 }}>
							{product.name}
						</h1>
						<p
							style={{
								fontSize: 24,
								fontWeight: "bold",
								color: "#292929",
								marginBottom: 16,
							}}>
							${product.price}
						</p>
						<p style={{ color: "#666", marginBottom: 24 }}>
							{product.description}
						</p>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ProductDetail;

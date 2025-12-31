import React from "react";
import { Card, Row, Col, Button, Spin, Empty } from "antd";
import { Link } from "react-router-dom";
import { useLatestArticles } from "@/hooks/useArticles";
import { getImageUrl } from "@/utils/url";

interface GetArticlesProps {
	title?: string;
	ctaText?: string;
	ctaLink?: string;
}

const GetArticles: React.FC<GetArticlesProps> = ({
	title,
	ctaText,
	ctaLink,
}) => {
	const { data: articles, isLoading } = useLatestArticles(3);

	return (
		<div className="get-articles-section">
			<div className="container">
				{title && <h2 className="section-title">{title}</h2>}

				{isLoading ? (
					<div style={{ textAlign: "center", padding: "40px" }}>
						<Spin />
					</div>
				) : articles && articles.length > 0 ? (
					<>
						<Row gutter={[24, 24]}>
							{articles.map((article) => (
								<Col key={article.id} xs={24} sm={12} lg={8}>
									<Card
										hoverable
										className="article-card-wrapper">
										<Link to={`/articles/${article.slug}`}>
											<div className="article-thumbnail-container">
												{article.cover ? (
													<img
														alt={
															article.cover
																.alternativeText ||
															article.title
														}
														src={getImageUrl(
															article.cover.url,
														)}
														className="article-thumbnail"
													/>
												) : (
													<div className="no-image-placeholder">
														No Image
													</div>
												)}
												{/* Gradient Overlay */}
												<div className="gradient-overlay" />
												{/* Content Overlay */}
												<div className="content-overlay">
													{article.categories &&
														article.categories
															.length > 0 && (
															<div className="category-list">
																{article.categories.map(
																	(cat) => (
																		<span
																			key={
																				cat.id
																			}
																			className="category-item">
																			{
																				cat.name
																			}
																		</span>
																	),
																)}
															</div>
														)}
													<h3 className="article-title">
														{article.title}
													</h3>
												</div>
											</div>
										</Link>
									</Card>
								</Col>
							))}
						</Row>
						{ctaText && ctaLink && (
							<div className="cta-container">
								<Link to={ctaLink}>
									<Button
										type="primary"
										size="large"
										className="cta-button">
										{ctaText}
									</Button>
								</Link>
							</div>
						)}
					</>
				) : (
					<Empty description="Không có bài viết nào" />
				)}
			</div>
		</div>
	);
};

export default GetArticles;

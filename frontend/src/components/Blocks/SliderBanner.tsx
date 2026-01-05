import React from "react";
import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/utils/url";

interface SliderBannerSlide {
	id: number;
	title?: string;
	description?: string;
	ctaText?: string;
	ctaLink?: string;
	ctaText2?: string;
	ctaLink2?: string;
	image: {
		url: string;
		alternativeText?: string;
	};
}

interface SliderBannerProps {
	slides?: SliderBannerSlide[];
}

const SliderBanner: React.FC<SliderBannerProps> = ({ slides }) => {
	if (!slides || slides.length === 0) return null;

	return (
		<div style={{ overflow: "hidden" }}>
			<Carousel autoplay effect="fade">
				{slides.map((slide) => (
					<div key={slide.id}>
						<div
							style={{
								position: "relative",
								height: "500px",
								display: "flex",
								alignItems: "center",
								justifyContent: "left",
								color: "#fff",
								background: "#000",
							}}>
							{slide.image && (
								<img
									src={getImageUrl(slide.image.url)}
									alt={
										slide.image.alternativeText ||
										slide.title
									}
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										height: "100%",
										objectFit: "cover",
										opacity: 0.6,
									}}
								/>
							)}
							<div
								className="container"
								style={{ width: "100%" }}>
								<div
									style={{
										position: "relative",
										zIndex: 1,
										textAlign: "left",
										maxWidth: "800px",
									}}>
									{slide.title && (
										<h2
											style={{
												color: "#fff",
												fontSize: "48px",
												fontWeight: "bold",
												marginBottom: "16px",
											}}>
											{slide.title}
										</h2>
									)}
									{slide.description && (
										<p
											style={{
												fontSize: "18px",
												marginBottom: "24px",
												opacity: 0.9,
											}}>
											{slide.description}
										</p>
									)}
									<div
										style={{
											display: "flex",
											gap: "16px",
										}}>
										{slide.ctaText && slide.ctaLink && (
											<Link to={slide.ctaLink}>
												<Button
													type="primary"
													size="large">
													{slide.ctaText}
												</Button>
											</Link>
										)}
										{slide.ctaText2 && slide.ctaLink2 && (
											<Link to={slide.ctaLink2}>
												<Button size="large">
													{slide.ctaText2}
												</Button>
											</Link>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default SliderBanner;

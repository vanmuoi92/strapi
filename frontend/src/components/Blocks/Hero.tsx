import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

interface HeroProps {
	title: string;
	description?: string;
	cover?: {
		url: string;
		alternativeText?: string;
		width?: number;
		height?: number;
	};
	ctaText?: string;
	ctaLink?: string;
}

const Hero: React.FC<HeroProps> = ({
	title,
	description,
	cover,
	ctaText,
	ctaLink,
}) => {
	return (
		<div
			style={{
				position: "relative",
				height: "500px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "#fff",
				marginBottom: "40px",
				borderRadius: "8px",
				overflow: "hidden",
			}}>
			{cover && (
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: 1,
					}}>
					<img
						src={`http://localhost:1337${cover.url}`}
						alt={cover.alternativeText || title}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							backgroundColor: "rgba(0,0,0,0.4)", // Overlay for readability
						}}
					/>
				</div>
			)}
			<div
				style={{
					position: "relative",
					zIndex: 2,
					textAlign: "center",
					maxWidth: "800px",
					padding: "0 20px",
				}}>
				<h1
					style={{
						fontSize: "48px",
						fontWeight: "bold",
						marginBottom: "20px",
						color: "#fff",
					}}>
					{title}
				</h1>
				{description && (
					<p
						style={{
							fontSize: "20px",
							marginBottom: "30px",
							maxWidth: "600px",
							margin: "0 auto 30px",
						}}>
						{description}
					</p>
				)}
				{ctaText && ctaLink && (
					<Link to={ctaLink}>
						<Button type="primary" size="large">
							{ctaText}
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Hero;

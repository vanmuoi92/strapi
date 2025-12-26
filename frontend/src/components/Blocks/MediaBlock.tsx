import React from "react";

interface MediaFile {
	url: string;
	alternativeText?: string;
}

interface MediaBlockProps {
	file?: MediaFile;
	backgroundColor?: string;
	isFullWidth?: boolean;
}

const MediaBlock: React.FC<MediaBlockProps> = ({
	file,
	backgroundColor = "#fff",
	isFullWidth = false,
}) => {
	const content = (
		<div
			style={{
				textAlign: "center",
			}}>
			{file ? (
				<img
					src={`http://localhost:1337${file.url}`}
					alt={file.alternativeText || "Media"}
					style={{
						maxWidth: "100%",
						display: "block",
						width: "100%",
					}}
				/>
			) : (
				<div
					style={{
						backgroundColor: "#f0f0f0",
						padding: 40,
						borderRadius: 8,
						textAlign: "center",
						color: "#999",
					}}>
					<p>Media content</p>
				</div>
			)}
		</div>
	);

	return (
		<div style={{ backgroundColor }}>
			{isFullWidth ? content : <div className="container">{content}</div>}
		</div>
	);
};

export default MediaBlock;

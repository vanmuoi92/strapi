interface MediaFile {
	url: string;
	alternativeText?: string;
}

interface MediaBlockProps {
	file?: MediaFile;
}

const MediaBlock: React.FC<MediaBlockProps> = ({ file }) => {
	return (
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
						borderRadius: 8,
						boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
};

export default MediaBlock;

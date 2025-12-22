interface SliderFile {
	url: string;
	alternativeText?: string;
}

interface SliderBlockProps {
	files?: SliderFile[];
}

const SliderBlock: React.FC<SliderBlockProps> = ({ files }) => {
	return (
		<div
			style={{
				marginBottom: 24,
			}}>
			{files && files.length > 0 ? (
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(200px, 1fr))",
						gap: 16,
					}}>
					{files.map((file, idx) => (
						<img
							key={idx}
							src={`http://localhost:1337${file.url}`}
							alt={file.alternativeText || `Slide ${idx + 1}`}
							style={{
								maxWidth: "100%",
								borderRadius: 8,
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							}}
						/>
					))}
				</div>
			) : (
				<div
					style={{
						backgroundColor: "#f0f0f0",
						padding: 40,
						borderRadius: 8,
						textAlign: "center",
						color: "#999",
					}}>
					<p>Slider content</p>
				</div>
			)}
		</div>
	);
};

export default SliderBlock;

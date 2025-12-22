interface QuoteBlockProps {
	body: string;
	title: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ body, title }) => {
	return (
		<blockquote
			style={{
				borderLeft: "4px solid #667eea",
				paddingLeft: 16,
				marginBottom: 24,
				fontStyle: "italic",
				color: "#666",
			}}>
			<p>{body}</p>
			<footer>— {title}</footer>
		</blockquote>
	);
};

export default QuoteBlock;

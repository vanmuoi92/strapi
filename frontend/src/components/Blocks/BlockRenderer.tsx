import RichTextBlock from "./RichTextBlock";
import QuoteBlock from "./QuoteBlock";
import MediaBlock from "./MediaBlock";
import SliderBlock from "./SliderBlock";
import Hero from "./Hero";
import Features from "./Features";
import Grid from "./Grid";

interface Block {
	__component: string;
	id: number;
	[key: string]: any;
}

interface BlockRendererProps {
	block: Block;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
	switch (block.__component) {
		case "page-builder.rich-text":
			return <RichTextBlock body={block.body} />;
		case "page-builder.quote":
			return <QuoteBlock body={block.body} title={block.title} />;
		case "page-builder.media":
			return <MediaBlock file={block.file} />;
		case "page-builder.slider":
			return <SliderBlock files={block.files} />;
		case "page-builder.hero":
			return <Hero {...block} />;
		case "page-builder.features":
			return <Features {...block} />;
		case "page-builder.grid":
			return <Grid {...block} />;
		default:
			return null;
	}
};

export default BlockRenderer;

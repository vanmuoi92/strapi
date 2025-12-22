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
		case "shared.rich-text":
			return <RichTextBlock body={block.body} />;
		case "shared.quote":
			return <QuoteBlock body={block.body} title={block.title} />;
		case "shared.media":
			return <MediaBlock file={block.file} />;
		case "shared.slider":
			return <SliderBlock files={block.files} />;
		case "shared.hero":
			return <Hero {...block} />;
		case "shared.features":
			return <Features {...block} />;
		case "shared.grid":
			return <Grid {...block} />;
		default:
			return null;
	}
};

export default BlockRenderer;

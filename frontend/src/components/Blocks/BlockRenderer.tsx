import RichTextBlock from "./RichTextBlock";
import MediaBlock from "./MediaBlock";
import Hero from "./Hero";
import Grid from "./Grid";
import SliderBanner from "./SliderBanner";
import Spacing from "./Spacing";
import ContactForm from "./ContactForm";

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
		case "page-builder.media":
			return <MediaBlock file={block.file} />;
		case "page-builder.hero":
			return (
				<Hero
					title={block.title}
					description={block.description}
					ctaText={block.ctaText}
					ctaLink={block.ctaLink}
					cover={block.cover}
				/>
			);
		case "page-builder.grid":
			return (
				<Grid
					title={block.title}
					description={block.description}
					items={block.items}
				/>
			);
		case "page-builder.slider-banner":
			return <SliderBanner slides={block.slides} />;
		case "page-builder.spacing":
			return (
				<Spacing
					spacingPC={block.spacingPC}
					spacingTablet={block.spacingTablet}
					spacingMobile={block.spacingMobile}
					backgroundColor={block.backgroundColor}
				/>
			);
		case "page-builder.contact-form":
			return (
				<ContactForm
					Title={block.Title}
					Description={block.Description}
				/>
			);
		default:
			return null;
	}
};

export default BlockRenderer;

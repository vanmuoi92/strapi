import RichTextBlock from "./RichTextBlock";
import MediaBlock from "./MediaBlock";
import Hero from "./Hero";
import Grid from "./Grid";
import SliderBanner from "./SliderBanner";
import Spacing from "./Spacing";
import ContactForm from "./ContactForm";
import Gallery from "./Gallery";
import OptionsList from "./OptionsList";

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
			return (
				<MediaBlock
					file={block.file}
					backgroundColor={block.backgroundColor}
					isFullWidth={block.isFullWidth}
				/>
			);
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
					title={block.title}
					description={block.description}
				/>
			);
		case "page-builder.gallery":
			return (
				<Gallery
					images={block.images}
					isFullWidth={block.isFullWidth}
				/>
			);
		case "page-builder.options-list":
			return (
				<OptionsList
					title={block.title}
					description={block.description}
					items={block.items}
				/>
			);
		default:
			return null;
	}
};

export default BlockRenderer;

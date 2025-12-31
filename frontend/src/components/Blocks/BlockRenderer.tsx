import RichTextBlock from "./RichTextBlock";
import MediaBlock from "./MediaBlock";
import Hero from "./Hero";
import Grid from "./Grid";
import SliderBanner from "./SliderBanner";
import Spacing from "./Spacing";
import ContactForm from "./ContactForm";
import Gallery from "./Gallery";
import OptionsList from "./OptionsList";
import MechanicalCanvas from "./MechanicalCanvas";
import IconListLeft from "./IconListLeft";
import GetArticles from "./GetArticles";

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
			return (
				<RichTextBlock
					body={block.body}
					backgroundColor={block.backgroundColor}
					maxWidth={block.maxWidth}
					textAlign={block.textAlign}
					ctaText={block.ctaText}
					ctaLink={block.ctaLink}
				/>
			);
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
					maxCardWidth={block.maxCardWidth}
					maxIntroWidth={block.maxIntroWidth}
					maxSectionWidth={block.maxSectionWidth}
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
					ctaText={block.ctaText}
					ctaLink={block.ctaLink}
				/>
			);
		case "page-builder.mechanical-canvas":
			return (
				<MechanicalCanvas
					title={block.title}
					contentLeft={block.contentLeft}
					contentRight={block.contentRight}
					ctaText={block.ctaText}
					ctaLink={block.ctaLink}
					image={block.image}
					backgroundColor={block.backgroundColor}
				/>
			);
		case "page-builder.icon-list-left":
			return (
				<IconListLeft
					items={block.items}
					contentRight={block.contentRight}
					ctaText={block.ctaText}
					ctaLink={block.ctaLink}
					backgroundColor={block.backgroundColor}
				/>
			);
		case "page-builder.get-articles":
			return (
				<GetArticles
					title={block.title}
					ctaText={block.ctaText}
					ctaLink={block.ctaLink}
				/>
			);
		default:
			return null;
	}
};

export default BlockRenderer;

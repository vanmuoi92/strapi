import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalShareMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_global_share_menu_items';
  info: {
    displayName: 'Menu item';
  };
  attributes: {
    Label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    subMenuItem: Schema.Attribute.Component<'global-share.sub-menu-item', true>;
  };
}

export interface GlobalShareSubMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_global_share_sub_menu_items';
  info: {
    displayName: 'Sub Menu Item';
  };
  attributes: {
    Label: Schema.Attribute.String;
    Link: Schema.Attribute.String;
  };
}

export interface PageBuilderCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    description: '';
    displayName: 'Card';
    icon: 'landscape';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageBuilderContactForm extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_contact_forms';
  info: {
    displayName: 'Contact Form';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface PageBuilderGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_grids';
  info: {
    description: '';
    displayName: 'Grid';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'page-builder.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageBuilderHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'layout';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageBuilderMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface PageBuilderRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface PageBuilderSliderBanner extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_slider_banners';
  info: {
    description: '';
    displayName: 'Slider Banner';
    icon: 'images';
  };
  attributes: {
    slides: Schema.Attribute.Component<
      'page-builder.slider-banner-item',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface PageBuilderSliderBannerItem extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_slider_banner_items';
  info: {
    description: '';
    displayName: 'SliderBannerItem';
    icon: 'picture';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface PageBuilderSpacing extends Struct.ComponentSchema {
  collectionName: 'components_page_builder_spacings';
  info: {
    description: '';
    displayName: 'Spacing';
    icon: 'vial';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#fff'>;
    spacingMobile: Schema.Attribute.String & Schema.Attribute.DefaultTo<'80px'>;
    spacingPC: Schema.Attribute.String & Schema.Attribute.DefaultTo<'120px'>;
    spacingTablet: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'100px'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global-share.menu-item': GlobalShareMenuItem;
      'global-share.sub-menu-item': GlobalShareSubMenuItem;
      'page-builder.card': PageBuilderCard;
      'page-builder.contact-form': PageBuilderContactForm;
      'page-builder.grid': PageBuilderGrid;
      'page-builder.hero': PageBuilderHero;
      'page-builder.media': PageBuilderMedia;
      'page-builder.rich-text': PageBuilderRichText;
      'page-builder.slider-banner': PageBuilderSliderBanner;
      'page-builder.slider-banner-item': PageBuilderSliderBannerItem;
      'page-builder.spacing': PageBuilderSpacing;
      'shared.seo': SharedSeo;
    }
  }
}

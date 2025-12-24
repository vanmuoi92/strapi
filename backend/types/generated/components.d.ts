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

export interface PageBuilderFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    description: '';
    displayName: 'FeatureItem';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface PageBuilderFeatures extends Struct.ComponentSchema {
  collectionName: 'components_shared_features_lists';
  info: {
    description: '';
    displayName: 'Features';
    icon: 'bullet-list';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'page-builder.feature-item', true>;
    title: Schema.Attribute.String;
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

export interface PageBuilderQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
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

export interface PageBuilderSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
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
      'page-builder.feature-item': PageBuilderFeatureItem;
      'page-builder.features': PageBuilderFeatures;
      'page-builder.grid': PageBuilderGrid;
      'page-builder.hero': PageBuilderHero;
      'page-builder.media': PageBuilderMedia;
      'page-builder.quote': PageBuilderQuote;
      'page-builder.rich-text': PageBuilderRichText;
      'page-builder.slider': PageBuilderSlider;
      'shared.seo': SharedSeo;
    }
  }
}

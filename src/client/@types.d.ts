declare interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: Date | string;
  date_created_gmt: Date | string;
  date_modified: Date | string;
  date_modified_gmt: Date | string;
  type: "simple" | "variable" | "grouped" | "external" | string;
  status: "any" | "draft" | "pending" | "private" | "publish" | string;
  featured: boolean;
  catalog_visibility: "visible" | "catalog" | "search" | "hidden" | string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: Date | null | string;
  date_on_sale_from_gmt: Date | null | string;
  date_on_sale_to: Date | null | string;
  date_on_sale_to_gmt: Date | null | string;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[]; // TODO look at Downloads properties
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: "taxable" | "shipping" | "none" | string;
  tax_class: "standard" | "reduced-rate" | "zero-rate" | string;
  manage_stock: boolean;
  stock_quantity: number;
  stock_status?: "instock" | "outofstock" | "onbackorder" | string;
  backorders: "no" | "notify" | "yes" | string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: Dimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: Partial<Category>[];
  tags: any[]; // TODO look at Tags properties
  images: Image[];
  in_stock?: boolean;
  attributes: Attribute[];
  default_attributes: any[]; // TODO look at default attributes properties
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  meta_data: MetaDatum[];
  _links: Links;
}

declare interface Review {
  shop_id: number;
  listing_id: number;
  transaction_id: number;
  buyer_user_id: number;
  rating: number;
  review: string;
  language: string;
  image_url_fullxfull: string | null;
  create_timestamp: number;
  update_timestamp: number;
}

type AffiliateLogo = {
  src: string;
  alt: string;
};

type Image = {
  img: string;
  title: string;
};

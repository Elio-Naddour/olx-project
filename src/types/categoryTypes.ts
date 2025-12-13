export interface Category {
  id: number;
  name: string;
  name_l1: string;
  externalID: string;
  slug: string;
  level: number;
  parentID: number | null;
  displayPriority: number;
  purpose: Purpose;
  roles: Role[];
  locationDepthLimits: LocationDepthLimits;
  configurations: Configurations;
  statistics: Statistics;
  paaSections: null;
  templateConfigs: null;
  templateHashes: null;
  children: Category[];
}

export interface Configurations {}

export interface LocationDepthLimits {
  min: number;
  max: number;
}

export enum Purpose {
  ForRent = "for-rent",
  ForSale = "for-sale",
}

export enum Role {
  AllowsDelivery = "allows_delivery",
  AllowsVideo = "allows_video",
  DpvMosaicImages = "dpv_mosaic_images",
  IncludePurposeInDescription = "include_purpose_in_description",
  IncludePurposeInTitle = "include_purpose_in_title",
  ShowPhoneNumber = "show_phone_number",
}

export interface Statistics {
  activeCount: number;
}

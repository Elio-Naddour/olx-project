export interface Ad {
  search_information?: SearchInformation;
  facebook_browser_id?: string;
  google_client_id?: string;
  client_ip?: string;
  client_device_id?: string;
  client_device_description?: string;
  client_user_external_id?: string;
  client_session_id?: string;
  timestamp?: number;
  app_type?: string;
  metric_entity?: string;
  metric_source?: string;
  metric_action?: string;
  ad_image_url?: string;
  ad_location_l3_external_id?: string;
  ad_location_l3_name_en?: string;
  ad_location_l3_name_lc?: string;
  ad_location_external_id?: string;
  ad_location_name_en?: string;
  ad_location_name_lc?: string;
  ad_agent_external_id?: string;
  ad_agent_name?: string;
  ad_agency_external_id?: string;
  ad_category_external_id?: string;
  ad_product?: string;
  ad_price?: number;
  ad_title?: string;
  ad_source?: string;
  ad_type?: string;
  ad_external_id?: string;
  ad_source_id?: number;
  ad_extra_fields?: any;
  trace_id?: string;
  ad_area?: number;
  ad_bathroom_count?: number;
  ad_bedroom_count?: string;
}

export interface SearchInformation {
  nb_hits?: number;
  search_params?: SearchParams;
  route_name?: string;
}

export interface SearchParams {
  parentCategorySlug?: string;
  categorySlug?: string;
}

export interface HomeAdsType {
  adsForMobiles: Ad[];
  adsForCars: Ad[];
  adsForApartments: Ad[];
}

// Converts JSON strings to/from your types
export class Convert {
  public static toAd(json: string): Ad {
    return JSON.parse(json);
  }

  public static adToJson(value: Ad): string {
    return JSON.stringify(value);
  }
}

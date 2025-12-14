import { HomeAdsType } from "@/types/adTypes";
import { homeAds } from "@/utils/staticData";

export function getHomeAds(): Promise<HomeAdsType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(homeAds);
    }, 1200);
  });
}

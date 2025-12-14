import { HomeAdsType } from "@/types/adTypes";
import { GetServerSideProps } from "next";
import { getHomeAds } from "../api/getHomeAds";
import AdsSection from "@/components/molecules/AdsSection/AdsSection";

interface Props {
  homeAds: HomeAdsType;
}

export default function HomePage({ homeAds }: Props) {

  return (
    <>
      <AdsSection ads={homeAds.adsForCars} title={'Cars for Sale'} limit={4} />
      <AdsSection ads={homeAds.adsForMobiles} title={'Mobile Phones'} limit={4} />
      <AdsSection ads={homeAds.adsForApartments} title={'Apartments & Villas For Sale'} limit={4} />
    </>
  );
}

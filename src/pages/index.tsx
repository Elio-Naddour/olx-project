import router from "next/router";
import HomePage from "./home";
import { getHomeAds } from "./api/getHomeAds";
import { GetServerSideProps } from "next";
import { HomeAdsType } from "@/types/adTypes";

interface Props {
  homeAds: HomeAdsType;
}

export default function Home({ homeAds }: Props) {
  return <HomePage homeAds={homeAds} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const homeAds = await getHomeAds();

  return {
    props: {
      homeAds,
    },
  };
};

import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useGetCategoryFieldsQuery } from "@/store/api/olxApi";
import DynamicCategoryForm from "@/components/organisms/DynamicCategoryForm/DybamicCategoryForm";
import { useSelector } from "react-redux";
import type { AppState } from "@/store";
import { useI18n } from "@/i18n";
import LoadingSpinner from "@/components/atoms/LoadingSpinner/LoadingSpinner";

const PostAdByCategory: NextPage = () => {
  const router = useRouter();
  const { t } = useI18n();
  const { slug } = router.query;
  const { data, error, isLoading } = useGetCategoryFieldsQuery({
    slug: (slug as string) ?? "",
  });
  const names = useSelector((state: AppState) => state.category);

  // Router is not ready on first render
  if (!router.isReady || isLoading) {
    return <LoadingSpinner />;
  }

  // Safety check
  if (!slug || typeof slug !== "string") {
    return <p>{t('InvalidCategory')}</p>;
  }

  if (error) return <div>{t('ApiError')}</div>;

  return (
    <div className="pageSpacing">
      <h1>{t("postAnAd")}</h1>

      {data && <DynamicCategoryForm category={data} cardNames={names} />}
    </div>
  );
};

export default PostAdByCategory;

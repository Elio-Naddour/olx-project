import Link from "next/link";
import { useGetCategoriesQuery } from "@/store/api/olxApi";
import { setSelectedCategory } from "@/store/slices/categorySlice";
import CategoriesList from "@/components/organisms/CategoriesList/CategoriesList";
import CategoriesCardList from "@/components/molecules/CategoriesCardsList/CategoriesCardList";
import { useState } from "react";
import { Category } from "@/types/categoryTypes";
import { useI18n } from "@/i18n";
import LoadingSpinner from "@/components/atoms/LoadingSpinner/LoadingSpinner";

export default function PostAdIndex() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { t } = useI18n();
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{t('ApiError')}</div>;

  return (
    <div className="pageSpacing">
      <h1>{t("postAd")}</h1>
      <h2>{t("chooseCategory")}</h2>

      {data?.length > 0 && !selectedCategory && (
        <CategoriesCardList
          categories={data ?? []}
          onCategoryClick={(cat) => {
            setSelectedCategory(cat);
          }}
        />
      )}

      {data?.length > 0 && selectedCategory && (
        <CategoriesList
          categories={data ?? []}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
}

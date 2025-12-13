// src/pages/post-ad/index.tsx
import Link from "next/link";
import { useGetCategoriesQuery } from "@/store/api/olxApi";
import { setSelectedCategory } from "@/store/slices/categorySlice";
import CategoriesList from "@/components/organisms/CategoriesList/CategoriesList";
import CategoriesCardList from "@/components/molecules/CategoriesCardsList/CategoriesCardList";
import { useState } from "react";
import { Category } from "@/types/categoryTypes";
// import { useI18n } from "@/lib/useLocalI18n"; // optional helper for translations

export default function PostAdIndex() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div>
      <h1>Post an Ad</h1>
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

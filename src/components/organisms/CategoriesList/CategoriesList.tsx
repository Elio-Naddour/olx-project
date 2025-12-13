import { Category } from "@/types/categoryTypes";
import { useState } from "react";
import router from "next/router";
import { useDispatch } from "react-redux";

import styles from "./CategoriesList.module.css";
import { setSelectedCategory } from "@/store/slices/categorySlice";

export default CategoriesList;
interface Props {
  categories: Category[];
  selectedCategory: Category;
}

const hasChildren = (cat: Category) =>
  Array.isArray(cat.children) && cat.children.length > 0;

export function CategoriesList({ categories, selectedCategory }: Props) {
  const [selectedMain, setSelectedMain] = useState<Category | null>(selectedCategory);
  const [selectedSub, setSelectedSub] = useState<Category | null>(null);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {/* LEVEL 1 */}
      <div className={styles.column}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`${styles.item} ${
              selectedMain?.id === cat.id ? styles.active : ""
            }`}
            onClick={() => {
              setSelectedMain(cat);
              setSelectedSub(null);
              if (!hasChildren(cat)) {
                dispatch(
                  setSelectedCategory({
                    selectedCategoryName: cat.name,
                  })
                );
                router.push(`/post-ad/${cat.slug}`);
              }
            }}
          >
            <span>{cat.name}</span>
            {hasChildren(cat) && <span className={styles.arrow}>›</span>}
          </div>
        ))}
      </div>

      {/* LEVEL 2 */}
      <div className={styles.column}>
        {selectedMain?.children?.map((sub) => (
          <div
            key={sub.id}
            className={`${styles.item} ${
              selectedSub?.id === sub.id ? styles.active : ""
            }`}
            onClick={() => {
              setSelectedSub(sub);
              if (!hasChildren(sub)) {
                dispatch(
                  setSelectedCategory({
                    selectedCategoryName: selectedMain.name,
                    selectedSubCategoryName: sub.name,
                  })
                );
                router.push(`/post-ad/${sub.slug}`);
              }
            }}
          >
            <span>{sub.name}</span>
            {hasChildren(sub) && <span className={styles.arrow}>›</span>}
          </div>
        ))}
      </div>

      {/* LEVEL 3 */}
      <div className={styles.column}>
        {selectedSub?.children?.map((child) => (
          <div
            key={child.id}
            className={styles.item}
            onClick={() => {
              if (!hasChildren(child) && selectedMain) {
                dispatch(
                  setSelectedCategory({
                    selectedCategoryName: selectedMain.name,
                    selectedSubCategoryName: selectedSub.name,
                    selectedComplementaryCategoryName: child.name,
                  })
                );
                router.push(`/post-ad/${child.slug}`);
              }
            }}
          >
            <span>{child.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

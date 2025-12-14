import CategoryCard from "@/components/atoms/CategoryCard/CategoryCard";
import { Category } from "@/types/categoryTypes";
import styles from "./CategoriesCardList.module.css";
import ARROW from "@/assets/icons/arrow.svg";
import Image from "next/image";
import { useI18n } from "@/i18n";
interface Props {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}
const CategoriesCardList = ({ categories, onCategoryClick }: Props) => {
  const { lang } = useI18n();
  return (
    <div className={styles.grid}>
      {categories.map((category) => {
        return (
          <div
            className={styles.cell}
            onClick={() => {
              onCategoryClick(category);
            }}
          >
            <CategoryCard
              category={category.name}
              endComponent={
                <Image
                  src={ARROW}
                  alt="ARROW"
                  className={lang === "ar" ? styles.reverse : ""}
                />
              }
            />{" "}
          </div>
        );
      })}
    </div>
  );
};
export default CategoriesCardList;

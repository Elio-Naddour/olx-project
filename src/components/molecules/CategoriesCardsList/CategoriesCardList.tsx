import CategoryCard from "@/components/atoms/CategoryCard/CategoryCard";
import { Category } from "@/types/categoryTypes";
import styles from "./CategoriesCardList.module.css";

interface Props {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}
const CategoriesCardList = ({ categories, onCategoryClick }: Props) => {
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
              endComponent={<div>›</div>}
            />{" "}
          </div>
        );
      })}
    </div>
  );
};
export default CategoriesCardList;

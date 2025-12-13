import { ReactNode } from "react";
import DEFAULT from "@/assets/icons/default.png";
import styles from "./CategoryCard.module.css";
import Image from "next/image";

interface CategoryCardProps {
  mainImageSrc?: string;
  category: string;
  subCategory?: string;
  complementaryCategory?: string;
  endComponent?: ReactNode;
}
const CategoryCard = ({
  mainImageSrc,
  category,
  subCategory,
  complementaryCategory,
  endComponent,
}: CategoryCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <Image
          src={mainImageSrc ?? DEFAULT}
          alt="category"
          className={styles.image}
        />
        <div className={styles.allCardCategories}>
          <div>{category}</div>
          <div className={styles.subCategories}>
            {subCategory}{" "}
            {complementaryCategory && `/ ${complementaryCategory}`}{" "}
          </div>
        </div>
      </div>

      <div className={styles.endComponent}> {endComponent}</div>
    </div>
  );
};

export default CategoryCard;

import { useRef, useState } from "react";
import styles from "./ImageUploadGrid.module.css";

const MAX_IMAGES = 12;

export default function ImageUploadGrid() {
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const onSelectFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImages((prev) => {
        console.log(prev);

        const copy = [reader.result, ...prev];
        copy.pop();
        return copy;
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number, e: any) => {
    e.stopPropagation();
    setImages((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {images?.map((img, index) => (
          <div
            key={index}
            className={`${styles.cell} ${index === 0 ? styles.cover : ""}`}
            onClick={() => openPicker()}
          >
            {img ? (
              <>
                <img src={img} alt="upload" />
                <button
                  className={styles.remove}
                  onClick={(e) => removeImage(index, e)}
                >
                  ×
                </button>
                {index === 0 && <span className={styles.label}>COVER</span>}
              </>
            ) : index === 0 ? (
              <span className={styles.plus}>+</span>
            ) : (
              <span className={styles.camera}>📷</span>
            )}
          </div>
        ))}
      </div>

      <p className={styles.hint}>
        For the cover picture we recommend using the landscape mode.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onSelectFile}
      />
    </div>
  );
}

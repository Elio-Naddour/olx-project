import { Ad } from "@/types/adTypes";
import styles from "./AdsSection.module.css";

interface Props {
  ads: Ad[];
  title: string;
  limit?: number;
}

export default function AdsSection({ ads, title, limit }: Props) {
  const visibleAds = limit ? ads.slice(0, limit) : ads;

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button className={styles.viewMore}>
          View more <span>›</span>
        </button>
      </div>

      <div className={styles.grid}>
        {visibleAds.map((ad) => (
          <div key={ad.ad_external_id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={ad.ad_image_url || "/default.jpg"} alt={ad.ad_title} />
            </div>

            <div className={styles.content}>
              <div className={styles.firstRow}>
                <p className={styles.price}>
                  USD {ad.ad_price?.toLocaleString()}
                </p>
                <button className={styles.fav}>♡</button>
              </div>
              <p className={styles.title}>{ad.ad_title}</p>

              <div className={styles.meta}>
                {ad.ad_extra_fields?.mileage && (
                  <span>{ad.ad_extra_fields.mileage} km</span>
                )}
                {ad.ad_extra_fields?.year && (
                  <span>• {ad.ad_extra_fields.year}</span>
                )}
              </div>

              <p className={styles.location}>{ad.ad_location_name_en}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

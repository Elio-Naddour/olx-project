import { useI18n } from "@/i18n";
import styles from "./Header.module.css";
import router, { useRouter } from "next/router";
import Image from "next/image";
import PLUS from "@/assets/icons/plus.svg";
import LOGO from "@/assets/icons/logo.svg";
import ARROWBACK from "@/assets/icons/arrowBack.svg";
import Link from "next/link";
import { classNames } from "@/utils/helperFunctions";
import { routeNames } from "@/utils/routeNames";

const navigateToPostAd = () => {
  router.push(routeNames.postAd);
};

const Header = () => {
  const { t, switchLang, lang } = useI18n();
  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <div className={styles.headerContainer}>
      {pathname === routeNames.home ? (
        <div className={styles.headerSection}>
          <button className={styles.link} onClick={switchLang}>
            {t("lang")}
          </button>
          <button className={styles.sellButton} onClick={navigateToPostAd}>
            <Image src={PLUS} alt="add" />
            {t("sell")}
          </button>
        </div>
      ) : (
        <div className={styles.headerSection}>
          <button
            className={classNames([
              styles.link,
              lang === "ar" ? styles.reverse : "",
            ])}
            onClick={() => router.back()}
          >
            <Image src={ARROWBACK} alt="ARROWBACK" />
          </button>
          <Link className={styles.link} href={"/"}>
            <Image src={LOGO} alt="LOGO" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

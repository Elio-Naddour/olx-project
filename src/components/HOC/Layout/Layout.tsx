import Header from "@/components/molecules/Header/Header";
import { ReactNode } from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.pages}>{children}</div>
    </div>
  );
};
export default Layout;

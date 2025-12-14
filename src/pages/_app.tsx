import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/styles/globals.css";
import { I18nProvider } from "@/i18n";
import Layout from "@/components/HOC/Layout/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <I18nProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </Provider>
  );
}

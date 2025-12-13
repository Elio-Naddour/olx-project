import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/styles/globals.css";
import { I18nProvider } from "@/i18n";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <I18nProvider>
        <Component {...pageProps} />
      </I18nProvider>
    </Provider>
  );
}

// Next.js custom App: wraps every page with `Layout` and global styles.
// Central place to add providers (theme, state) if needed during the sprint.
// TODO: Add a global state/store (e.g., context) if multiple pages need shared data.
import Layout from "../components/Layout"
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );  
}

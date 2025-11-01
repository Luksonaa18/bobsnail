import Image from "next/image";
import Header from "./components/header/Header";
import Footer from "./components/footer/page";
import ContentPage from "./components/content/page";

export default function Home() {
  return (
    <>
      <Header />
      <ContentPage />
      <Footer />
    </>
  );
}

import Footer from "@/components/footer";
import Nav from "@/components/shared/Nav";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

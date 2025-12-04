"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/globals/Header";
import Footer from "@/components/globals/Footer";
import GlobalCTA from "@/components/globals/GlobalCTA";

interface AppWrapperProps {
  children: React.ReactNode;
  globalCTA?: {
    globalCTA?: {
      image?: any;
      heading?: string;
      description?: string;
      link?: {
        url?: string;
        title?: string;
      };
    };
  } | null;
}

export default function AppWrapper({ children, globalCTA }: AppWrapperProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      {globalCTA?.globalCTA && <GlobalCTA data={globalCTA.globalCTA} />}
      <Footer />
    </>
  );
}


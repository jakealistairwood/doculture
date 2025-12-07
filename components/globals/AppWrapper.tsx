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
  globalOptions?: {
    contactEmail?: string;
    contactMobile?: string;
    companyAddress?: any;
    instagramUrl?: string;
    linkedinUrl?: string;
  } | null;
  landingPageSlugs?: string[];
}

export default function AppWrapper({ children, globalCTA, globalOptions, landingPageSlugs = [] }: AppWrapperProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");
  
  // Check if current path is a landing page
  const isLandingPage = pathname && landingPageSlugs.some(slug => {
    const slugPath = slug.startsWith("/") ? slug : `/${slug}`;
    return pathname === slugPath || pathname === slug;
  });

  if (isStudioRoute || isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      {globalCTA?.globalCTA && <GlobalCTA data={globalCTA.globalCTA} />}
      <Footer globalOptions={globalOptions} />
    </>
  );
}


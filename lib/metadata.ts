import { Metadata } from "next";
import { urlForImage } from "@/sanity/lib/image";

interface SEOData {
  title?: string;
  description?: string;
  ogImage?: {
    asset?: {
      _ref?: string;
      _id?: string;
    };
    alt?: string;
  };
}

export function generateMetadataFromSEO(
  seo?: SEOData,
  fallbackTitle?: string,
  fallbackDescription?: string
): Metadata {
  const title = seo?.title || fallbackTitle || "Doculture";
  const description = seo?.description || fallbackDescription || "";
  
  const ogImageUrl = seo?.ogImage 
    ? urlForImage(seo.ogImage)?.url() 
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            alt: seo.ogImage?.alt || title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl && {
        images: [ogImageUrl],
      }),
    },
  };
}


import { Page as PageType } from "@/sanity/types";
import { Section } from "./Section";
import Image from "next/image";

interface PageLayoutProps {
    page: PageType;
}

export function PageLayout({ page }: PageLayoutProps) {
    if (!page.pageBuilder || page.pageBuilder.length === 0) {
        return (
            <div className="page-layout">
                <p>No content available for this page.</p>
            </div>
        );
    }

    return (
        <main>
            <div className="fixed w-full h-full z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                    src="/images/bg.svg"
                    alt=""
                    fill
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative z-[2]">
              {page.pageBuilder.map((section) => (
                  <Section key={section._key} section={section} />
              ))}
            </div>
        </main>
    );
}

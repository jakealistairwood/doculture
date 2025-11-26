import { Page as PageType } from "@/sanity/types";
import { Section } from "./Section";

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
        <main className="">
            <div className="relative z-[2]">
              {page.pageBuilder.map((section) => (
                  <Section key={section._key} section={section} />
              ))}
            </div>
        </main>
    );
}

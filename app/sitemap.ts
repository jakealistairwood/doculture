import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { allProjectsQuery, allPagesQuery, allLandingPagesQuery } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doculture.com';
  
  // Fetch all data in parallel
  const [projects, pages, landingPages] = await Promise.all([
    client.fetch<Array<{ slug?: { current?: string }; _updatedAt?: string }>>(allProjectsQuery),
    client.fetch<Array<{ slug?: { current?: string } | string; _updatedAt?: string }>>(allPagesQuery),
    client.fetch<Array<{ slug?: string; _updatedAt?: string }>>(allLandingPagesQuery),
  ]);

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/our-work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Project routes (case studies)
  const projectRoutes: MetadataRoute.Sitemap = (projects || [])
    .filter((project) => project.slug?.current)
    .map((project) => ({
      url: `${baseUrl}/our-work/${project.slug?.current}`,
      lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // Page routes
  const pageRoutes: MetadataRoute.Sitemap = (pages || [])
    .filter((page) => {
      const slug = typeof page.slug === 'string' ? page.slug : page.slug?.current;
      return slug && slug !== '/' && slug !== '';
    })
    .map((page) => {
      const slug = typeof page.slug === 'string' ? page.slug : page.slug?.current;
      return {
        url: `${baseUrl}${slug?.startsWith('/') ? slug : `/${slug}`}`,
        lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });

  // Landing page routes
  const landingPageRoutes: MetadataRoute.Sitemap = (landingPages || [])
    .filter((landingPage) => landingPage.slug)
    .map((landingPage) => ({
      url: `${baseUrl}/${landingPage.slug}`,
      lastModified: landingPage._updatedAt ? new Date(landingPage._updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...projectRoutes, ...pageRoutes, ...landingPageRoutes];
}

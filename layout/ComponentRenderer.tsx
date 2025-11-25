import dynamic from 'next/dynamic';

import { HomeMasthead } from '@/components/organisms/masthead/HomeMasthead';

const TextCard = dynamic(() => import('@/components/organisms/TextCard'));
const FullWidthAsset = dynamic(() => import('@/components/molecules/FullWidthAsset'));
const LogoMarquee = dynamic(() => import('@/components/molecules/LogoMarquee'));

import { HomeMasthead as HomeMastheadType, TextCard as TextCardType, FullWidthAsset as FullWidthAssetType, Logos as LogosType } from '@/sanity/types';

type Component = HomeMastheadType | TextCardType | FullWidthAssetType | LogosType;

interface ComponentRendererProps {
  component: Component;
  bgColor: string;
}

export function ComponentRenderer({ component, bgColor }: ComponentRendererProps) {
  switch (component._type) {
    case 'homeMasthead':
      return <HomeMasthead data={component} />;
    case 'textCard':
      return <TextCard data={component} bgColor={bgColor} />;
    case 'fullWidthAsset':
      return <FullWidthAsset data={component} />;
    case 'logos':
        return <LogoMarquee data={component} bgColor={bgColor} />
    default:
      console.warn(`Unknown component type: ${(component as any)._type}`);
      return null;
  }
}
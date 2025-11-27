import dynamic from 'next/dynamic';

import { HomeMasthead } from '@/components/organisms/masthead/HomeMasthead';
import { Masthead } from '@/components/organisms/masthead/Masthead';

const TextCard = dynamic(() => import('@/components/organisms/TextCard'));
const FullWidthAsset = dynamic(() => import('@/components/molecules/FullWidthAsset'));
const LogoMarquee = dynamic(() => import('@/components/molecules/LogoMarquee'));
const LinkCards = dynamic(() => import('@/components/molecules/LinkCards'));
const HeaderMarquee = dynamic(() => import('@/components/molecules/HeaderMarquee'));

import { Masthead as MastheadType, HomeMasthead as HomeMastheadType, TextCard as TextCardType, FullWidthAsset as FullWidthAssetType, Logos as LogosType, LinkCards as LinkCardsType } from '@/sanity/types';

type HeaderMarqueeType = {
    _type: 'headerMarquee';
    items?: string[];
};

type Component = MastheadType | HomeMastheadType | TextCardType | FullWidthAssetType | LogosType | LinkCardsType | HeaderMarqueeType;

interface ComponentRendererProps {
  component: Component;
  bgColor: string;
}

export function ComponentRenderer({ component, bgColor }: ComponentRendererProps) {
  switch (component._type) {
    case 'masthead':
        return <Masthead data={component} />;
    case 'homeMasthead':
      return <HomeMasthead data={component} />;
    case 'textCard':
      return <TextCard data={component} bgColor={bgColor} />;
    case 'fullWidthAsset':
      return <FullWidthAsset data={component} />;
    case 'logos':
        return <LogoMarquee data={component} bgColor={bgColor} />
    case 'linkCards':
        return <LinkCards data={component} />
    case 'headerMarquee':
        return <HeaderMarquee data={component} bgColor={bgColor} />
    default:
      console.warn(`Unknown component type: ${(component as any)._type}`);
      return null;
  }
}
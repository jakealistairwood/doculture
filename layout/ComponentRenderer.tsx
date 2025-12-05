import dynamic from 'next/dynamic';

import { HomeMasthead } from '@/components/organisms/masthead/HomeMasthead';
import { Masthead } from '@/components/organisms/masthead/Masthead';

const TextCard = dynamic(() => import('@/components/organisms/TextCard'));
const Asset = dynamic(() => import('@/components/molecules/Asset'));
const LogoMarquee = dynamic(() => import('@/components/molecules/LogoMarquee'));
const LinkCards = dynamic(() => import('@/components/molecules/LinkCards'));
const HeaderMarquee = dynamic(() => import('@/components/molecules/HeaderMarquee'));
const FeatureCards = dynamic(() => import('@/components/molecules/FeatureCards'));
const StudioCarousel = dynamic(() => import('@/components/organisms/StudioCarousel'));
const TimedAccordionSlider = dynamic(() => import('@/components/molecules/TimedAccordionSlider'));

import { Masthead as MastheadType, HomeMasthead as HomeMastheadType, TextCard as TextCardType, Asset as AssetType, Logos as LogosType, LinkCards as LinkCardsType, FeatureCards as FeatureCardsType, StudioCarousel as StudioCarouselType } from '@/sanity/types';

type HeaderMarqueeType = {
    _type: 'headerMarquee';
    items?: string[];
};

type TimedAccordionSliderType = {
    _type: 'timedAccordionSlider';
    items?: Array<{
        _key?: string;
        heading?: string;
        content?: any;
        image?: any;
    }>;
};

type Component = MastheadType | HomeMastheadType | TextCardType | AssetType | LogosType | LinkCardsType | HeaderMarqueeType | FeatureCardsType | StudioCarouselType | TimedAccordionSliderType;

interface ComponentRendererProps {
  component: Component;
  bgColor: string;
  isContainedSection: boolean;
  containedBgColor: string;
}

export function ComponentRenderer({ component, bgColor, isContainedSection = false, containedBgColor }: ComponentRendererProps) {
  switch (component._type) {
    case 'masthead':
        return <Masthead data={component} />;
    case 'homeMasthead':
      return <HomeMasthead data={component} />;
    case 'textCard':
      return <TextCard data={component} bgColor={bgColor} isContainedSection={isContainedSection} containedBgColor={containedBgColor} />;
    case 'asset':
      return <Asset data={component} />;
    case 'logos':
        return <LogoMarquee data={component} bgColor={bgColor} />
    case 'linkCards':
        return <LinkCards data={component} />
    case 'headerMarquee':
        return <HeaderMarquee data={component} bgColor={bgColor} />
    case 'featureCards':
        return <FeatureCards data={component} bgColor={bgColor} />
    case 'studioCarousel':
        return <StudioCarousel data={component} />
    case 'timedAccordionSlider':
        return <TimedAccordionSlider data={component} bgColor={bgColor} />
    default:
      console.warn(`Unknown component type: ${(component as any)._type}`);
      return null;
  }
}
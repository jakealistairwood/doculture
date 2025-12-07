import dynamic from 'next/dynamic';

import { HomeMasthead } from '@/components/organisms/masthead/HomeMasthead';
import { Masthead } from '@/components/organisms/masthead/Masthead';

const TextCard = dynamic(() => import('@/components/organisms/TextCard'));
const Asset = dynamic(() => import('@/components/molecules/Asset'));
const TwoColTextAsset = dynamic(() => import('@/components/organisms/TwoColTextAsset'));
const LogoMarquee = dynamic(() => import('@/components/molecules/LogoMarquee'));
const LinkCards = dynamic(() => import('@/components/molecules/LinkCards'));
const HeaderMarquee = dynamic(() => import('@/components/molecules/HeaderMarquee'));
const FeatureCards = dynamic(() => import('@/components/molecules/FeatureCards'));
const ImageGrid = dynamic(() => import('@/components/molecules/ImageGrid'));
const StudioCarousel = dynamic(() => import('@/components/organisms/StudioCarousel'));
const TimedAccordionSlider = dynamic(() => import('@/components/molecules/TimedAccordionSlider'));
const SelectedWorks = dynamic(() => import('@/components/organisms/SelectedWorks'));

import { 
  Masthead as MastheadType, 
  HomeMasthead as HomeMastheadType, 
  TextCard as TextCardType, 
  Asset as AssetType,
  TwoColTextAsset as TwoColTextAssetType,
  Logos as LogosType, 
  LinkCards as LinkCardsType, 
  FeatureCards as FeatureCardsType,
  ImageGrid as ImageGridType,
  StudioCarousel as StudioCarouselType,
  Studio,
  SelectedWorks as SelectedWorksType, 
  HeaderMarquee as HeaderMarqueeType,
  TimedAccordionSlider as TimedAccordionSliderType,
  Section 
} from '@/sanity/types';

// Extract component type from Section's components array (already includes _key)
type SectionComponent = NonNullable<Section['components']>[number];

interface ComponentRendererProps {
  component: SectionComponent;
  bgColor: string;
  isContainedSection: boolean;
  containedBgColor: string;
}

// Helper type for dereferenced StudioCarousel (studios are dereferenced in query)
type DereferencedStudioCarousel = Omit<StudioCarouselType, 'studios'> & {
  studios?: Array<Partial<Studio> & { _id?: string; _type?: string }>;
};

export function ComponentRenderer({ component, bgColor, isContainedSection = false, containedBgColor }: ComponentRendererProps) {
  switch (component._type) {
    case 'masthead':
        return <Masthead data={component as MastheadType} />;
    case 'homeMasthead':
      return <HomeMasthead data={component as HomeMastheadType} />;
    case 'textCard':
      return <TextCard data={component as TextCardType} bgColor={bgColor} isContainedSection={isContainedSection} containedBgColor={containedBgColor} />;
    case 'asset':
      return <Asset data={component as AssetType} bgColor={bgColor} />;
    case 'twoColTextAsset':
      return <TwoColTextAsset data={component as TwoColTextAssetType} bgColor={bgColor} isContainedSection={isContainedSection} containedBgColor={containedBgColor} />;
    case 'logos':
        return <LogoMarquee data={component as LogosType} bgColor={bgColor} />
    case 'linkCards':
        return <LinkCards data={component as LinkCardsType} />
    case 'headerMarquee':
        return <HeaderMarquee data={component as HeaderMarqueeType} bgColor={bgColor} />
    case 'selectedWorks':
        return <SelectedWorks data={component as SelectedWorksType} />
    case 'featureCards':
      return <FeatureCards data={component as FeatureCardsType} bgColor={bgColor} />
    case 'imageGrid':
      return <ImageGrid data={component as ImageGridType} bgColor={bgColor} />
    case 'studioCarousel': {
        // studios are dereferenced in the query (see queries.ts), so they come as Studio objects
        // Type assertion needed because StudioCarousel type defines them as references
        const componentWithDereferencedStudios = (component as unknown) as DereferencedStudioCarousel;
        // Validate and filter studios to ensure they are proper Studio objects
        const validStudios = componentWithDereferencedStudios.studios?.filter((studio): studio is Studio => {
            return (
                studio !== null &&
                typeof studio === 'object' &&
                studio._id !== undefined &&
                studio._type === 'studio'
            );
        });
        return <StudioCarousel data={{ ...componentWithDereferencedStudios, studios: validStudios }} />
    }
    case 'timedAccordionSlider':
        return <TimedAccordionSlider data={component as TimedAccordionSliderType} bgColor={bgColor} />
    default:
      console.warn(`Unknown component type: ${(component as any)._type}`);
      return null;
  }
}
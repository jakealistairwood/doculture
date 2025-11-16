import { HomeMasthead } from '@/components/organisms/masthead/HomeMasthead';
import { TextCard } from '@/components/organisms/TextCard';
import FullWidthAsset from '@/components/molecules/FullWidthAsset';
import { HomeMasthead as HomeMastheadType, TextCard as TextCardType, FullWidthAsset as FullWidthAssetType } from '@/sanity/types';

type Component = HomeMastheadType | TextCardType | FullWidthAssetType;

interface ComponentRendererProps {
  component: Component;
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  switch (component._type) {
    case 'homeMasthead':
      return <HomeMasthead data={component} />;
    case 'textCard':
      return <TextCard data={component} />;
    case 'fullWidthAsset':
      return <FullWidthAsset data={component} />;
    default:
      console.warn(`Unknown component type: ${(component as any)._type}`);
      return null;
  }
}
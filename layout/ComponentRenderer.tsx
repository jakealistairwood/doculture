import { HomeMasthead } from '@/components/organisms/masthead/HomeMasthead';
import { TextCard } from '@/components/organisms/textCard/TextCard';
import { HomeMasthead as HomeMastheadType, TextCard as TextCardType } from '@/sanity/types';

type Component = HomeMastheadType | TextCardType;

interface ComponentRendererProps {
  component: Component;
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  switch (component._type) {
    case 'homeMasthead':
      return <HomeMasthead data={component} />;
    case 'textCard':
      return <TextCard data={component} />;
    default:
      console.warn(`Unknown component type: ${(component as any)._type}`);
      return null;
  }
}
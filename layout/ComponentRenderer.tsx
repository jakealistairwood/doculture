import { HomeMasthead } from '@/components/blocks/HomeMasthead';
import { TextCard } from '@/components/blocks/TextCard';

interface ComponentRendererProps {
  component: any; // We'll type this properly later
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  switch (component._type) {
    case 'homeMasthead':
      return <HomeMasthead data={component} />;
    case 'textCard':
      return <TextCard data={component} />;
    default:
      console.warn(`Unknown component type: ${component._type}`);
      return null;
  }
}
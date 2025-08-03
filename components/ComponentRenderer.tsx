import { ComponentData, CardProps, ImageBlockProps, TextSectionProps, StatsBoxProps, CTAProps } from '../lib/types';
import Card from './Card';
import ImageBlock from './ImageBlock';
import TextSection from './TextSection';
import StatsBox from './StatsBox';
import CTA from './CTA';

interface ComponentRendererProps {
  component: ComponentData;
}

export default function ComponentRenderer({ component }: ComponentRendererProps) {
  const { type, props } = component;

  switch (type) {
    case 'Card':
      return <Card {...(props as CardProps)} />;
    case 'ImageBlock':
      return <ImageBlock {...(props as ImageBlockProps)} />;
    case 'TextSection':
      return <TextSection {...(props as TextSectionProps)} />;
    case 'StatsBox':
      return <StatsBox {...(props as StatsBoxProps)} />;
    case 'CTA':
      return <CTA {...(props as CTAProps)} />;
    default:
      return (
        <div className="p-4 bg-red-100 border border-red-300 rounded">
          <p className="text-red-700">Unknown component type: {type}</p>
        </div>
      );
  }
}
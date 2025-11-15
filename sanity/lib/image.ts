import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'
import { getImageDimensions } from '@sanity/asset-utils';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export const urlForImage = (source: any) => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageRef = source?.asset?._ref;
  const { crop } = source;

  const { width, height } = getImageDimensions(imageRef);

  if (crop) {
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));
    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

    const left = Math.floor(width * crop.left);
    const top = Math.floor(height * crop.top);

    return builder?.image(source).rect(left, top, croppedWidth, croppedHeight).auto("format");
  }

  return builder?.image(source).auto("format");
}

import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { pageType } from "./page";
import { seo } from "./seo";
import { section } from "./section";
import { sectionOptions } from "./sectionOptions";
import { project } from "./project";
import { masthead } from "./masthead";
import { homeMasthead } from "./homeMasthead";
import { textCard } from "./textCard";
import { textCardOptions } from "./textCardOptions";
import { linksWrapper } from "./linksWrapper";
import { link } from "./link";
import { reusableBlock } from "./reusableBlock";
import { logoMarquee } from "./reusableBlocks/logoMarquee";
import { logos } from "./logos";
import { asset } from "./asset";
import { twoColTextAsset } from "./twoColTextAsset";
import { linkCards } from "./linkCards";
import { headerMarquee } from "./headerMarquee";
import { selectedWorks } from "./selectedWorks";
import { featureCards } from "./featureCards";
import { studio } from "./studio";
import { studioCarousel } from "./studioCarousel";
import { caseStudyBuilder } from "./caseStudyBuilder";
import { caseStudyRichText } from "./caseStudyRichText";
import { caseStudyImage } from "./caseStudyImage";
import { globalCTA } from "./reusableBlocks/globalCTA";
import { landingPage } from "./landingPage";
import { contactLandingPage } from "./landingPages/contactLandingPage";
import { timedAccordionSlider } from "./timedAccordionSlider";
import { imageGrid } from "./imageGrid";
import { globalOptions } from "./globalOptions";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        pageType,
        seo,
        section,
        sectionOptions,
        project,
        blockContentType,
        categoryType,
        masthead,
        homeMasthead,
        textCard,
        textCardOptions,
        linksWrapper,
        link,
        reusableBlock,
        logoMarquee,
        asset,
        twoColTextAsset,
        logos,
        linkCards,
        headerMarquee,
        selectedWorks,
        featureCards,
        studio,
        studioCarousel,
        caseStudyBuilder,
        caseStudyRichText,
        caseStudyImage,
        globalCTA,
        landingPage,
        contactLandingPage,
        timedAccordionSlider,
        imageGrid,
        globalOptions
    ],
};

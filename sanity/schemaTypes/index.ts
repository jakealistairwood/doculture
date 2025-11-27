import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {pageType} from './page'
import {seo} from './seo'
import {section} from './section'
import {sectionOptions} from './sectionOptions'
import {project} from './project'
import {masthead} from './masthead'
import {homeMasthead} from './homeMasthead'
import {textCard} from './textCard'
import {textCardOptions} from './textCardOptions'
import {linksWrapper} from './linksWrapper'
import {link} from './link'
import {reusableBlock} from './reusableBlock'
import {logoMarquee} from './reusableBlocks/logoMarquee'
import {logos} from './logos'
import {fullWidthAsset} from './fullWidthAsset'
import {linkCards} from './linkCards'
import {headerMarquee} from './headerMarquee'
import {selectedWorks} from './selectedWorks'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, seo, section, sectionOptions, project, blockContentType, categoryType, postType, authorType, masthead, homeMasthead, textCard, textCardOptions, linksWrapper, link, reusableBlock, logoMarquee, fullWidthAsset, logos, linkCards, headerMarquee, selectedWorks],
}

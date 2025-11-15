import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {pageType} from './page'
import {seo} from './seo'
import {section} from './section'
import {sectionOptions} from './sectionOptions'
import {homeMasthead} from './homeMasthead'
import {textCard} from './textCard'
import {textCardOptions} from './textCardOptions'
import {linksWrapper} from './linksWrapper'
import {link} from './link'
import {reusableBlock} from './reusableBlock'
import {logoMarquee} from './reusableBlocks/logoMarquee'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, seo, section, sectionOptions, blockContentType, categoryType, postType, authorType, homeMasthead, textCard, textCardOptions, linksWrapper, link, reusableBlock, logoMarquee],
}

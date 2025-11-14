import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {pageType} from './page'
import {section} from './section'
import {homeMasthead} from './homeMasthead'
import {textCard} from './textCard'
import {reusableBlock} from './reusableBlock'
import {logoMarquee} from './reusableBlocks/logoMarquee'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, section, blockContentType, categoryType, postType, authorType, homeMasthead, textCard, reusableBlock, logoMarquee],
}

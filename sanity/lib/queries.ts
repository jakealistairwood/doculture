import { groq } from 'next-sanity';

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    pageBuilder[]{
      _key,
      _type,
      title,
      sectionOptions{
        bgColor,
        removeContainer,
        paddingTop,
        paddingBottom,
        marginTop,
        marginBottom
      },
      components[]{
        _key,
        _type,
        _type == "homeMasthead" => {
          heading,
          content,
          image,
          links,
          addLogoMarquee,
          logoMarquee->{
            _id,
            title,
            logoMarquee{
              title,
              speed,
              logos[]{
                alt,
                link,
                asset->{
                  _id,
                  url
                }
              }
            }
          }
        },
        _type == "textCard" => {
          subheading,
          heading,
          content
        }
      }
    }
  }
`;
import { groq } from 'next-sanity';

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    pageBuilder[]{
      _type,
      title,
      components[]{
        _type,
        _type == "homeMasthead" => {
          heading,
          content,
          image{
            asset->{
              _id,
              url
            },
            altText
          },
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
      }
    }
  }
`;
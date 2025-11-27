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
        id,
        bgColor,
        removeContainer,
        paddingTop,
        paddingBottom,
        marginTop,
        marginBottom,
        componentSpacing,
        addBottomDivider,
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
        _type == "masthead" => {
          type,
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
            _key,
            _type,
            subheading,
            heading,
            content,
            textCardOptions
        },
        _type == "fullWidthAsset" => {
            _key,
            _type,
            id,
            type,
            image,
            video,
            videoPoster,
            videoOptions
        },
        _type == "logos" => {
            _key,
            _type,
            type,
            label,
            labelPlacement,
            logoMarqueeBlock->{
                _id,
                title,
                logoMarquee{
                    title,
                    speed,
                    logos[]{
                        _key,
                        alt,
                        link,
                        asset
                        // asset->{
                        //     _id,
                        //     url,
                        //     metadata{
                        //         lqip
                        //     }
                        // }
                    }
                }
            }
        },
        _type == "linkCards" => {
            _key,
            _type,
            layout,
            links[]{
                _key,
                title,
                url,
                image
            }
        },
        _type == "headerMarquee" => {
            _key,
            _type,
            items
        },
        _type == "selectedWorks" => {
            _key,
            _type,
            caseStudies[]{
                project->
            }
        },
      }
    }
  }
`;
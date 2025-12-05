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
        overflow
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
        _type == "asset" => {
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
        _type == "featureCards" => {
            _key,
            _type,
            layout,
            type,
            features[]{
                _key,
                icon,
                title,
                description
            }
        },
        _type == "studioCarousel" => {
            _key,
            _type,
            studios[]->{
                ...,
            }
        },
      }
    }
  }
`;

export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    logo,
    excerpt,
    date,
    categories[]->{
      _id,
      title,
      slug
    },
    coverImage,
    video,
    content[]{
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
        overflow
      },
      components[]{
        _key,
        _type,
        _type == "caseStudyRichText" => {
          content[]{
            ...,
            _type == "image" => {
              ...,
              asset->
            }
          }
        },
        _type == "caseStudyImage" => {
          type,
          image{
            ...,
            asset
          },
          video,
          videoPoster{
            ...,
            asset
          },
          videoOptions
        }
      }
    }
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(date desc, _createdAt desc){
    _id,
    _type,
    title,
    slug,
    excerpt,
    date,
    categories[]->{
      _id,
      title,
      slug
    },
    coverImage
  }
`;

export const globalCTAQuery = groq`
  *[_type == "reusableBlock" && type == "globalCTA"][0]{
    _id,
    _type,
    title,
    type,
    globalCTA{
      image{
        ...,
        asset
      },
      heading,
      description,
      link{
        url,
        title
      }
    }
  }
`;

export const landingPageQuery = groq`
  *[_type == "landingPage" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    template,
    contactLandingPage{
      heading,
      description,
      whyUs[]{
        ...,
        _type == "image" => {
          ...,
          asset
        }
      },
      image{
        ...,
        asset
      },
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
    seo
  }
`;

export const landingPageSlugsQuery = groq`
  *[_type == "landingPage"]{
    "slug": slug.current
  }
`;

export const logoMarqueeQuery = groq`
  *[_type == "reusableBlock" && type == "logoMarquee"][0]{
    _id,
    _type,
    title,
    type,
    logoMarquee{
      title,
      logos[]{
        _key,
        alt,
        link,
        asset
      }
    }
  }
`;

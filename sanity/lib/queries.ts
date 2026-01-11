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
        isContainedSection,
        containedBgColor,
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
          backgroundVisualType,
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
        _type == "twoColMasthead" => {
          type,
          subheading,
          heading,
          content,
          image{
            ...,
            asset,
            altText
          },
          links[]{
            _key,
            type,
            buttonSize,
            buttonStyle,
            url,
            label
          },
        },
        _type == "textCard" => {
            _key,
            _type,
            subheading,
            heading,
            content,
            links,
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
        _type == "twoColTextAsset" => {
            _key,
            _type,
            alignTextVertically,
            reverseDirection,
            textCard{
                _key,
                _type,
                subheading,
                heading,
                content,
                links,
                textCardOptions
            },
            asset{
                _key,
                _type,
                id,
                type,
                image,
                video,
                videoPoster,
                videoOptions
            }
        },
        _type == "twoColTextList" => {
            _key,
            _type,
            alignTextVertically,
            bgColor,
            listItems,
            textCard{
                _key,
                _type,
                subheading,
                heading,
                content,
                links,
                textCardOptions
            }
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
            },
            invertLogos
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
            caseStudies[]->{
                _id,
                title,
                formattedTitle,
                slug,
                excerpt,
                video,
                videoType,
                coverImage,
                categories[]->{
                    _id,
                    title
                }
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
        _type == "imageGrid" => {
            _key,
            _type,
            aspectRatio,
            images[]{
                _key,
                _id,
                asset,
                altText
            }
        },
        _type == "studioCarousel" => {
            _key,
            _type,
            studios[]->{
                ...,
            }
        },
        _type == "timedAccordionSlider" => {
            _key,
            _type,
            items[]{
                _key,
                heading,
                content[]{
                    ...,
                    _type == "image" => {
                        ...,
                        asset
                    }
                },
                image{
                    ...,
                    asset,
                    altText
                }
            }
        },
      }
    },
    seo{
      title,
      description,
      ogImage{
        ...,
        asset
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
    videoType,
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
        },
        _type == "caseStudyImageGrid" => {
          columns,
          aspectRatio,
          images[]{
            _key,
            asset,
            altText
          }
        },
        _type == "caseStudyImageGallery" => {
          images[]{
            _key,
            asset,
            altText
          }
        }
      }
    }
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(coalesce(sortOrder, 999999) asc, date desc, _createdAt desc){
    _id,
    _type,
    title,
    formattedTitle,
    slug,
    sortOrder,
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

export const globalOptionsQuery = groq`
  *[_type == "globalOptions"][0]{
    _id,
    _type,
    contactEmail,
    contactMobile,
    companyAddress[]{
      ...,
      _type == "image" => {
        ...,
        asset
      }
    },
    instagramUrl,
    linkedinUrl
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
    aboutLandingPage{
      masthead{
        subheading,
        heading,
        description,
        links,
        leftTopImage,
        leftBottomImage,
        rightTopImage,
        rightBottomImage,
        asset{
          id,
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
        },
        mastheadMaxWidth
      },
      ourMission,
      whyWeExist,
      ourJourney,
      ourValues,
      aboutUsContent[]{
        _key,
        _type,
        title,
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
      },
      meetTheTeam{
        heading,
        teamMembers[]->{
          _id,
          name,
          role,
          headshot{
            ...,
            asset
          },
          content
        }
      }
    },
    seo{
      title,
      description,
      ogImage{
        ...,
        asset
      }
    }
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

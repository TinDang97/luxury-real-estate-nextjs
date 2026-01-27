import { groq } from "next-sanity";

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && (language == $language || (!defined(language) && $language == "vn"))][0] {
    _id,
    title,
    category,
    "slug": slug.current,
    mainImage,
    overview,
    location,
    developer,
    price,
    status,
    content[] {
      ...,
      _type == "hero" => {
        heading,
        tagline,
        backgroundImage
      },
      _type == "gallery" => {
        heading,
        description,
        images
      },
      _type == "infoTable" => {
        title,
        rows
      },
      _type == "featureList" => {
        title,
        features
      },
      _type == "infoGrid" => {
        title,
        items
      },
      _type == "banner" => {
        title,
        content,
        buttonText,
        backgroundImage
      },
      _type == "mortgageCalculator" => {
        title,
        defaultPrice
      },
      _type == "inlineRegisterForm" => {
        title,
        description
      },
      _type == "locationMap" => {
        address,
        latitude,
        longitude
      }
    }
  }
`;

export const projectsQuery = groq`
  *[_type == "project" && (language == $language || (!defined(language) && $language == "vn"))] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    location,
    price,
    status
  }
`;

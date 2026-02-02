import { groq } from "next-sanity";

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && (language == $language || (!defined(language) && $language == "vn"))][0] {
    _id,
    title,
    description,
    category,
    "slug": slug.current,
    mainImage,
    overview,
    location,
    developer,
    price,
    status,
    gallery {
      heading,
      description,
      images
    },
    project3DView {
      title,
      subtitle,
      slug,
      views
    },
    content[] {
      ...,
      _type == "hero" => {
        heading,
        tagline,
        category,
        location,
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
        defaultPrice,
        priceOptions
      },
      _type == "inlineRegisterForm" => {
        title,
        description
      },
      _type == "locationMap" => {
        address,
        latitude,
        longitude
      },
      _type == "project3DView" => {
        title,
        subtitle,
        views
      }
    }
  }
`;

export const projectsQuery = groq`
  *[_type == "project" && (language == $language || (!defined(language) && $language == "vn"))] {
    _id,
    title,
    category,
    "slug": slug.current,
    mainImage,
    location,
    price,
    status
  }
`;

export const recentProjectsQuery = groq`
  *[_type == "project" && (language == $language || (!defined(language) && $language == "vn"))] | order(_createdAt desc) [0...5] {
    _id,
    title,
    category,
    "slug": slug.current,
    mainImage,
    location
  }
`;

export const investorsQuery = groq`
  *[_type == "investor" && (language == $language || (!defined(language) && $language == "vn"))] {
    _id,
    name,
    "slug": slug.current,
    logo,
    coverImage,
    vision,
    language
  }
`;

export const investorBySlugQuery = groq`
  *[_type == "investor" && slug.current == $slug && (language == $language || (!defined(language) && $language == "vn"))][0] {
    _id,
    name,
    "slug": slug.current,
    logo,
    coverImage,
    vision,
    mission,
    about,
    achievements,
    awards,
    featuredProjects[]-> {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      location,
      price,
      status
    }
  }
`;

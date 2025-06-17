import type { PageType } from "../types/page-types";

export const initialPages: PageType[] = [
  {
    id: "home",
    title: "Home Page",
    slug: "home",
    status: "Published",
    lastUpdated: "2 hours ago",
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Welcome to Our Store",
        subtitle: "Find the best products at the best prices",
        image: "./logo.jpg",
        buttonText: "Shop Now",
        buttonLink: "/shop",
      },
      {
        id: "featured",
        type: "text-with-image",
        title: "Featured Collection",
        content:
          "Discover our handpicked selection of the finest products available in our store.",
        image: "./logo.jpg",
        imagePosition: "right",
      },
      {
        id: "about",
        type: "text",
        title: "About Us",
        content:
          "We are a company dedicated to providing high-quality products at affordable prices. Our mission is to ensure customer satisfaction with every purchase.",
      },
    ],
  },
  {
    id: "about",
    title: "About Us",
    slug: "about",
    status: "Published",
    lastUpdated: "3 days ago",
    sections: [
      {
        id: "mission",
        type: "hero",
        title: "Our Mission",
        subtitle: "Providing quality products since 2010",
        image: "./logo.jpg",
      },
      {
        id: "team",
        type: "text-with-image",
        title: "Our Team",
        content:
          "Meet the dedicated professionals behind our success. Our team works tirelessly to ensure we deliver the best products and services.",
        image: "./logo.jpg",
        imagePosition: "left",
      },
      {
        id: "values",
        type: "text",
        title: "Our Values",
        content:
          "Integrity, Quality, and Customer Satisfaction are the core values that drive everything we do.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    slug: "contact",
    status: "Draft",
    lastUpdated: "1 day ago",
    sections: [
      {
        id: "contact-hero",
        type: "hero",
        title: "Get in Touch",
        subtitle: "We'd love to hear from you",
        image: "./logo.jpg",
      },
      {
        id: "contact-info",
        type: "text",
        title: "Contact Information",
        content:
          "Email: info@example.com\nPhone: (123) 456-7890\nAddress: 123 Main St, Anytown, USA",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    slug: "faq",
    status: "Published",
    lastUpdated: "1 week ago",
    sections: [
      {
        id: "faq-intro",
        type: "text",
        title: "Frequently Asked Questions",
        content: "Find answers to our most commonly asked questions below.",
      },
    ],
  },
];

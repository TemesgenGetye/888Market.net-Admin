export interface SectionType {
  id: string
  type: string
  title: string
  content?: string
  subtitle?: string
  image?: string
  buttonText?: string
  buttonLink?: string
  imagePosition?: string
  [key: string]: any
}

export interface PageType {
  id: string
  title: string
  slug: string
  status: string
  lastUpdated: string
  sections: SectionType[]
}

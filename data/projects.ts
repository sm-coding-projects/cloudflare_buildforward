export interface ProjectImage {
  src: string
  srcset: string
  webpSrcset: string
  sizes: string
  alt: string
}

export interface Project {
  contentType: 'project'
  storyblokComponent: 'project'
  slug: string
  title: string
  imageDir: string
  location: string
  summary: string
  description: string
  heroImage: string
  heroSrcset: string
  heroWebpSrcset: string
  gallery: ProjectImage[]
  features: string[]
  seo: {
    title: string
    description: string
  }
}

const responsiveWidths = [480, 768, 1200, 1600, 2200]
const imagePath = (imageDir: string, imageNumber: number) => `/photos/${imageDir}/${imageNumber}.jpg`
const responsiveImagePath = (imageDir: string, imageNumber: number, width: number) =>
  `/photos/responsive/${imageDir}/${imageNumber}-${width}.jpg`
const responsiveWebpPath = (imageDir: string, imageNumber: number, width: number) =>
  `/photos/responsive/${imageDir}/${imageNumber}-${width}.webp`
const imageSrcset = (imageDir: string, imageNumber: number) =>
  responsiveWidths.map((width) => `${responsiveImagePath(imageDir, imageNumber, width)} ${width}w`).join(', ')
const webpSrcset = (imageDir: string, imageNumber: number) =>
  responsiveWidths.map((width) => `${responsiveWebpPath(imageDir, imageNumber, width)} ${width}w`).join(', ')
const gallerySizes = '(max-width: 760px) 96vw, (max-width: 1080px) 48vw, 50vw'

const galleryFor = (title: string, imageDir: string, count: number): ProjectImage[] =>
  Array.from({ length: count }, (_, index) => {
    const imageNumber = index + 1

    return {
      src: imagePath(imageDir, imageNumber),
      srcset: imageSrcset(imageDir, imageNumber),
      webpSrcset: webpSrcset(imageDir, imageNumber),
      sizes: gallerySizes,
      alt: `${title} home design - image ${imageNumber} of ${count}`
    }
  })

export const projects: Project[] = [
  {
    contentType: 'project',
    storyblokComponent: 'project',
    slug: 'wallangarra',
    title: 'Wallangarra',
    imageDir: 'Wallangarra',
    location: 'Gables, NSW',
    summary:
      'A stunning two-story home in Gables, NSW, featuring a bold, modern design with a cubic silhouette.',
    description:
      'A stunning two-story home in Gables, NSW, featuring a bold, modern design with a cubic silhouette. The facade combines striking grey tones with a warm timber entry, creating a sophisticated street presence. Inside, the home is designed for contemporary family living, with a focus on clean lines and high-quality finishes.',
    heroImage: imagePath('Wallangarra', 1),
    heroSrcset: imageSrcset('Wallangarra', 1),
    heroWebpSrcset: webpSrcset('Wallangarra', 1),
    gallery: galleryFor('Wallangarra', 'Wallangarra', 9),
    features: ['Two-story home', 'Cubic silhouette', 'Grey tones with warm timber entry', 'Contemporary family living'],
    seo: {
      title: 'Wallangarra Home Design - Build Forward Homes',
      description:
        'Explore Wallangarra, a modern two-story Build Forward Homes project in Gables, NSW.'
    }
  },
  {
    contentType: 'project',
    storyblokComponent: 'project',
    slug: 'beldale',
    title: 'Beldale',
    imageDir: 'Beldale',
    location: 'Gables, NSW',
    summary:
      'An executive two-story residence in Gables, NSW, that exudes luxury with stone-clad columns and expansive windows.',
    description:
      'An executive two-story residence in Gables, NSW, that exudes luxury. This custom home features a grand facade with striking stone-clad columns and expansive windows. The design masterfully blends timeless materials with modern construction, creating a statement of elegance and superior craftsmanship, perfect for discerning clients.',
    heroImage: imagePath('Beldale', 1),
    heroSrcset: imageSrcset('Beldale', 1),
    heroWebpSrcset: webpSrcset('Beldale', 1),
    gallery: galleryFor('Beldale', 'Beldale', 10),
    features: ['Executive two-story residence', 'Stone-clad columns', 'Expansive windows', 'Timeless materials with modern construction'],
    seo: {
      title: 'Beldale Home Design - Build Forward Homes',
      description:
        'Explore Beldale, an executive two-story Build Forward Homes residence in Gables, NSW.'
    }
  },
  {
    contentType: 'project',
    storyblokComponent: 'project',
    slug: 'pilaster',
    title: 'Pilaster',
    imageDir: 'Pilaster',
    location: 'Gables, NSW',
    summary:
      'A contemporary single-story home in Gables, NSW, showcasing a sophisticated mixed-material facade.',
    description:
      "A contemporary single-story home in Gables, NSW, showcasing a sophisticated mixed-material facade. This design combines the timeless appeal of exposed brick with modern render and a striking timber-look gable. It's a perfect example of a custom home that is both stylish and welcoming, with a focus on texture and street appeal.",
    heroImage: imagePath('Pilaster', 1),
    heroSrcset: imageSrcset('Pilaster', 1),
    heroWebpSrcset: webpSrcset('Pilaster', 1),
    gallery: galleryFor('Pilaster', 'Pilaster', 9),
    features: ['Single-story home', 'Mixed-material facade', 'Exposed brick with modern render', 'Timber-look gable'],
    seo: {
      title: 'Pilaster Home Design - Build Forward Homes',
      description:
        'Explore Pilaster, a contemporary single-story Build Forward Homes project in Gables, NSW.'
    }
  }
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug.toLowerCase())

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug.toLowerCase())

  if (index === -1) {
    return projects[0]
  }

  return projects[(index + 1) % projects.length]
}

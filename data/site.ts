export interface NavigationItem {
  label: string
  href: string
}

export interface SeoMeta {
  title: string
  description: string
}

export interface ApproachStep {
  title: string
  text: string
  source: 'legacy' | 'editable'
}

export const siteSettings = {
  contentType: 'site_settings',
  storyblokComponent: 'site_settings',
  name: 'Build Forward Homes',
  shortName: 'BF',
  url: 'https://www.buildforward.com.au',
  founded: '2020',
  positioning: 'Boutique builder crafting modern, functional homes across New South Wales since 2020.',
  heroLine: 'Considered design. Exceptional build.',
  contact: {
    email: 'info@buildforward.com.au',
    phoneDisplay: '0434 430 111',
    phoneHref: 'tel:+61434430111',
    schemaTelephone: '+61-434-430-111',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
    serviceAreas: ['Greater Sydney', 'Blue Mountains', 'Illawarra', 'Central Coast']
  },
  colors: {
    legacyBlack: '#000000',
    black: '#050705',
    charcoal: '#0d120d',
    legacyGreen: '#00FF4A',
    greenDeep: '#00C63A',
    brightGreen: '#9cff64',
    offWhite: '#f4f1e8',
    legacyText: '#F5F5F5',
    legacyMuted: '#8A8F98',
    muted: '#9ca397'
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' }
  ] satisfies NavigationItem[],
  seo: {
    home: {
      title: 'Build Forward Homes - Luxury Custom Home Builder NSW',
      description:
        'Build Forward Homes - Luxury custom home builder in NSW. Specializing in modern, functional homes across Greater Sydney, Blue Mountains, Illawarra and Central Coast since 2020.'
    },
    about: {
      title: 'About Build Forward Homes - Modern Home Builders NSW',
      description:
        'At Build Forward, we transform visions into reality with a unique blend of modern design and functional living.'
    },
    projects: {
      title: 'Our Projects - Modern Home Designs by Build Forward Homes',
      description: 'Explore selected builds from Build Forward Homes across New South Wales.'
    },
    contact: {
      title: 'Contact Build Forward Homes - Custom Home Builder NSW',
      description: 'Contact Build Forward Homes about custom home projects across Greater Sydney, Blue Mountains, Illawarra and Central Coast.'
    }
  } satisfies Record<string, SeoMeta>
}

export const aboutContent = {
  contentType: 'page',
  storyblokComponent: 'page',
  title: 'About Build Forward Homes',
  intro:
    'At Build Forward, we transform visions into reality with a unique blend of modern design and functional living. Our team is dedicated to delivering projects that exemplify quality, innovation, and client satisfaction.',
  philosophy:
    'Design should be both striking and effortless to live in. We prioritise craftsmanship, materials, and the lasting details that elevate daily life.',
  establishedLine: 'Established 2020 - Greater Sydney, Blue Mountains, Illawarra and the Central Coast',
  image: '/photos/studio/2.gif'
}

// Editable process copy. Replace these fields with Storyblok page content when the CMS is connected.
export const approachSteps: ApproachStep[] = [
  {
    title: 'Consultation',
    text: 'We align on vision, budget, site considerations, and the type of home you want to live in.',
    source: 'editable'
  },
  {
    title: 'Planning',
    text: 'Early decisions are organised around feasibility, build sequence, and the details that shape the brief.',
    source: 'editable'
  },
  {
    title: 'Design coordination',
    text: 'Architectural details are resolved for form, function, materials, and the long-term experience of the home.',
    source: 'editable'
  },
  {
    title: 'Construction',
    text: 'The build is managed with craftsmanship, schedule discipline, and clear communication.',
    source: 'editable'
  },
  {
    title: 'Handover',
    text: 'The final walkthrough closes the loop so the home is ready to live in.',
    source: 'editable'
  }
]

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: siteSettings.name,
  url: siteSettings.url,
  description: siteSettings.positioning,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteSettings.contact.addressLocality,
    addressRegion: siteSettings.contact.addressRegion,
    addressCountry: siteSettings.contact.addressCountry
  },
  telephone: siteSettings.contact.schemaTelephone,
  email: siteSettings.contact.email,
  serviceArea: siteSettings.contact.serviceAreas
}

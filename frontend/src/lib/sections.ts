import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export interface SectionConfig {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  showInNav: boolean;
  navOrder?: number;
  navLabel?: string;
  layout: {
    index: 'grid' | 'list' | 'single' | 'custom';
    topic?: 'grid' | 'list' | 'custom';
    content: 'article' | 'docs' | 'single' | 'custom';
  };
  structure: {
    hasTopics: boolean;
    topicDisplay?: 'cards' | 'list' | 'accordion';
    contentTypes?: string[];
    sortBy: 'date' | 'order' | 'title' | 'updated';
    sortOrder: 'asc' | 'desc';
  };
  features: {
    comments?: boolean;
    reactions?: boolean;
    sidePanel?: boolean;
    asides?: boolean;
    prevNext?: boolean;
    breadcrumbs?: boolean;
    pdfViewer?: boolean;
    codeBlocks?: boolean;
    estimatedReadTime?: boolean;
    relatedContent?: boolean;
    topicNav?: boolean;
    showDate?: boolean;
    showUpdated?: boolean;
    showAuthor?: boolean;
  };
  components?: {
    card?: string;
    listItem?: string;
    contentHeader?: string;
  };
  seo?: {
    titleTemplate?: string;
    ogImage?: string;
  };
  dataFile?: string;
}

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    author: string;
  };
  navigation: {
    order: string[];
    overrides?: Record<string, { label?: string }>;
  };
  comments: {
    provider: string;
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
  };
  seo: {
    defaultOgImage: string;
    twitterHandle: string;
  };
  defaults: {
    features: Record<string, boolean>;
  };
}

const contentDir = path.join(process.cwd(), 'content');

export function getSiteConfig(): SiteConfig {
  const configPath = path.join(contentDir, '_site.yaml');
  const content = fs.readFileSync(configPath, 'utf-8');
  return yaml.load(content) as SiteConfig;
}

export function getAllSections(): SectionConfig[] {
  const sections: SectionConfig[] = [];
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      const sectionYaml = path.join(contentDir, entry.name, '_section.yaml');
      if (fs.existsSync(sectionYaml)) {
        const content = fs.readFileSync(sectionYaml, 'utf-8');
        const config = yaml.load(content) as SectionConfig;
        config.slug = config.slug || entry.name;
        sections.push(config);
      }
    }
  }
  
  return sections.sort((a, b) => (a.navOrder || 99) - (b.navOrder || 99));
}

export function getSectionBySlug(slug: string): SectionConfig | null {
  const sections = getAllSections();
  return sections.find(s => s.slug === slug) || null;
}

export function getNavItems() {
  const siteConfig = getSiteConfig();
  const sections = getAllSections().filter(s => s.showInNav);
  
  return sections.map(section => ({
    slug: section.slug,
    label: siteConfig.navigation.overrides?.[section.slug]?.label || section.navLabel || section.name,
    href: `/${section.slug}`
  }));
}
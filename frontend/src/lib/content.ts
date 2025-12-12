import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface TopicMeta {
  name: string;
  slug: string;
  description?: string;
  banner?: string;
  order?: number;
}

export interface ContentMeta {
  title: string;
  description?: string;
  topic?: string;
  date?: Date;
  updated?: Date;
  draft?: boolean;
  banner?: string;
  order?: number;
  pdf?: string;
  slug: string;
  sidePanel?: Array<{
    heading: string;
    anchor: string;
    children?: Array<{ heading: string; anchor: string }>;
  }>;
  asides?: Array<{ id: string; content: string }>;
  readingTime?: number;
}

export function getTopicsForSection(sectionSlug: string): TopicMeta[] {
  const sectionPath = path.join(contentDir, sectionSlug);
  if (!fs.existsSync(sectionPath)) return [];
  
  const topics: TopicMeta[] = [];
  const entries = fs.readdirSync(sectionPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      const topicYaml = path.join(sectionPath, entry.name, '_topic.yaml');
      if (fs.existsSync(topicYaml)) {
        const content = fs.readFileSync(topicYaml, 'utf-8');
        const config = yaml.load(content) as TopicMeta;
        config.slug = config.slug || entry.name;
        topics.push(config);
      } else {
        topics.push({
          name: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
          slug: entry.name,
          order: 99
        });
      }
    }
  }
  
  return topics.sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function getTopicBySlug(sectionSlug: string, topicSlug: string): TopicMeta | null {
  const topics = getTopicsForSection(sectionSlug);
  return topics.find(t => t.slug === topicSlug) || null;
}

export function getContentForTopic(sectionSlug: string, topicSlug: string): ContentMeta[] {
  const topicPath = path.join(contentDir, sectionSlug, topicSlug);
  if (!fs.existsSync(topicPath)) return [];
  
  const contents: ContentMeta[] = [];
  const entries = fs.readdirSync(topicPath).filter(
    f => (f.endsWith('.mdx') || f.endsWith('.md')) && !f.startsWith('_')
  );
  
  for (const file of entries) {
    const filePath = path.join(topicPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    const slug = file.replace(/\.mdx?$/, '');
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    contents.push({
      ...data,
      slug,
      topic: topicSlug,
      readingTime,
      date: data.date ? new Date(data.date) : undefined,
      updated: data.updated ? new Date(data.updated) : undefined
    } as ContentMeta);
  }
  
  return contents
    .filter(c => !c.draft)
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.date && b.date) {
        return b.date.getTime() - a.date.getTime();
      }
      return 0;
    });
}

export function getFlatContent(sectionSlug: string): ContentMeta[] {
  const sectionPath = path.join(contentDir, sectionSlug);
  if (!fs.existsSync(sectionPath)) return [];
  
  const contents: ContentMeta[] = [];
  const entries = fs.readdirSync(sectionPath).filter(
    f => (f.endsWith('.mdx') || f.endsWith('.md')) && !f.startsWith('_')
  );
  
  for (const file of entries) {
    const filePath = path.join(sectionPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    const slug = file.replace(/\.mdx?$/, '');
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    contents.push({
      ...data,
      slug,
      readingTime,
      date: data.date ? new Date(data.date) : undefined,
      updated: data.updated ? new Date(data.updated) : undefined
    } as ContentMeta);
  }
  
  return contents
    .filter(c => !c.draft)
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.date && b.date) {
        return b.date.getTime() - a.date.getTime();
      }
      return 0;
    });
}

export function getDataFile<T>(sectionSlug: string, filename: string): T[] {
  const filePath = path.join(contentDir, sectionSlug, filename);
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(content) as T[];
}

export function getContentBySlug(sectionSlug: string, topicSlug: string, contentSlug: string) {
  const fileMdx = path.join(contentDir, sectionSlug, topicSlug, `${contentSlug}.mdx`);
  const fileMd = path.join(contentDir, sectionSlug, topicSlug, `${contentSlug}.md`);
  
  const filePath = fs.existsSync(fileMdx) ? fileMdx : fs.existsSync(fileMd) ? fileMd : null;
  if (!filePath) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  return {
    meta: {
      ...data,
      slug: contentSlug,
      topic: topicSlug,
      readingTime,
      date: data.date ? new Date(data.date) : undefined,
      updated: data.updated ? new Date(data.updated) : undefined
    } as ContentMeta,
    content,
    raw: fileContent
  };
}

export function getFlatContentBySlug(sectionSlug: string, contentSlug: string) {
  const fileMdx = path.join(contentDir, sectionSlug, `${contentSlug}.mdx`);
  const fileMd = path.join(contentDir, sectionSlug, `${contentSlug}.md`);
  
  const filePath = fs.existsSync(fileMdx) ? fileMdx : fs.existsSync(fileMd) ? fileMd : null;
  if (!filePath) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  return {
    meta: {
      ...data,
      slug: contentSlug,
      readingTime,
      date: data.date ? new Date(data.date) : undefined,
      updated: data.updated ? new Date(data.updated) : undefined
    } as ContentMeta,
    content,
    raw: fileContent
  };
}
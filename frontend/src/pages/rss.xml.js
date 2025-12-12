import rss from '@astrojs/rss';
import { getSiteConfig } from '../lib/sections';
import { getTopicsForSection, getContentForTopic } from '../lib/content';

export async function GET(context) {
  const siteConfig = getSiteConfig();
  
  // Get all blog posts
  const blogTopics = getTopicsForSection('blog');
  let posts = [];
  
  for (const topic of blogTopics) {
    const topicPosts = getContentForTopic('blog', topic.slug);
    posts = [...posts, ...topicPosts.map(p => ({ ...p, topic: topic.slug }))];
  }
  
  // Sort by date
  posts = posts.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
  
  return rss({
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    site: context.site || siteConfig.site.url,
    items: posts.map(post => ({
      title: post.title,
      pubDate: post.date,
      description: post.description,
      link: `/blog/${post.topic}/${post.slug}/`
    }))
  });
}
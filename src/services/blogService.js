import client from '../config/contentful'

export const getBlogPosts = async () => {
  try {
    console.log('Fetching blog posts...')
    const response = await client.getEntries({
      content_type: 'tejasPortfolioBlogPost',
      order: '-fields.publishedDate'
    })
    console.log('Blog posts fetched successfully:', response.items)
    return response.items
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const getBlogPost = async (slug) => {
  try {
    console.log('Fetching blog post with slug:', slug)
    
    // First, get all blog posts
    const response = await client.getEntries({
      content_type: 'tejasPortfolioBlogPost',
      include: 2
    })
    
    console.log('All blog posts:', response.items)
    
    // Find the post with matching title (since we're using title as slug)
    const post = response.items.find(item => {
      const postSlug = item.fields.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return postSlug === slug
    })
    
    if (!post) {
      console.log('No blog post found with slug:', slug)
      return null
    }

    console.log('Found matching blog post:', post)
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
} 
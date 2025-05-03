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
    const response = await client.getEntries({
      content_type: 'tejasPortfolioBlogPost',
      'fields.slug': slug
    })
    console.log('Blog post fetched successfully:', response.items[0])
    return response.items[0]
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
} 
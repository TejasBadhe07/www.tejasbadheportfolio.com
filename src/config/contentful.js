import { createClient } from 'contentful'

const client = createClient({
  space: 'jkv5apjobcxc', // Replace with your Space ID
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'VzLYrSLXdiOvmIIgIrfFecTeOeoo0KW0k_ObY-C5_Lo' // Replace with your Content Delivery API access token
})

export default client 
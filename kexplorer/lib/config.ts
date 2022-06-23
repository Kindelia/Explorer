export const config = {
  nodes: process.env.NEXT_PUBLIC_KINDELIA_DEFAULT_NODES.split(','),
  mailchimp_url: process.env.MAILCHIMP_URL || '',
}

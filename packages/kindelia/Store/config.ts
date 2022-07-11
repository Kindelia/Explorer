export const config = {
  nodes: (
    process.env.NEXT_PUBLIC_KINDELIA_DEFAULT_NODES ||
    '143.244.179.61,164.92.214.78,159.223.39.129'
  ).split(','),
  mailchimp_url: process.env.MAILCHIMP_URL || '',
}

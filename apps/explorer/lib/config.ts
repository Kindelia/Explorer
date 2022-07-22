import type { ConfigSchema } from 'confignator'
import { V, config_resolver } from 'confignator'

type ConfigTypes = {
  backend_nodes: string[]
  mailchimp_url: string | null
}

const config_schema: ConfigSchema<ConfigTypes> = {
  backend_nodes: {
    validator: V.list(V.str),
    env: 'BACKEND_NODES',
    default: ['127.0.0.1'],
  },
  mailchimp_url: {
    validator: V.optional(V.str),
    env: 'MAILCHIMP_URL',
    default: null,
  },
}

const resolve_config = config_resolver<ConfigTypes>(config_schema)

const get_env = (name: string) => process.env[name]

export const config = resolve_config({ get_env })

import type { NextApiRequest, NextApiResponse } from 'next'

// 0x0104000000000000000000000000000000000000000000000000000000000000

const MAX_CHARS = 20n
const BASE = 64n

const capacity_of = (num_chars: bigint): bigint => {
  const remaining_chars = MAX_CHARS - num_chars - 1n
  if (remaining_chars >= 1n) {
    return BASE ** remaining_chars
  } else {
    return 0n
  }
}

type Token = UnamedToken | NamedToken

interface BaseToken {
  id: bigint
  named: boolean
  num_chars: bigint
}

interface UnamedToken extends BaseToken {
  named: false
}

interface NamedToken extends BaseToken {
  named: true
  name: string
}

export const extract_token = (token_id: bigint): Token => {
  const named_byte = token_id >> ((32n - 1n) * 8n)
  const num_chars = token_id >> ((32n - 2n) * 8n) & 0xFFn
  console.log(named_byte)
  console.log(num_chars)
  if (named_byte > 0) {
    return {
      id: token_id,
      named: true,
      num_chars: num_chars,
      name: "[WIP]", // TODO
    }
  }
  return {
    id: token_id,
    named: false,
    num_chars: num_chars,
  }
}

export const make_metadata = (token: Token) => {
  const num_chars = token.num_chars
  const capacity = capacity_of(token.num_chars)
  let name = `Kindelia ${num_chars} letter domain`
  let attributes = [
    {
      trait_type: 'Domain Type',
      value: `${num_chars} letter domain`,
    },
    {
      trait_type: 'Domain Capacity',
      value: `${capacity} functions`,
    },
    {
      trait_type: 'Rarity',
      value: `${MAX_CHARS - num_chars}`,
    },
  ];
  if (token.named) {
    name = name + `: ${token.name}`
    attributes.push({
      trait_type: 'Name',
      value: token.name,
    })
  }
  let description: string
  if (token.named) {
    description = `This token allows you to register the ${num_chars} letter domain "${token.name}" on the Kindelia Network.`
  } else {
    description = `This token allows you to register a ${num_chars} letter domain on the Kindelia Network.`
  }
  return {
    description,
    external_url: `https://knt.preview.kindelia.org/token/${token.id}`,
    image: `https://knt.preview.kindelia.org/images/knt/${num_chars}.png`,
    name,
    attributes,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token_id = BigInt(req.query.token_id as string)

  const info = extract_token(token_id)
  const meta = make_metadata(info)

  return res.status(200).json(meta)
}

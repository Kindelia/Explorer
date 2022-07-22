import { break_list, drop_while } from './functional'
import type { Result } from './functional/result'
import * as R from './functional/result'
import type { U16 } from './numbers/u16'
import * as u16 from './numbers/u16'
import type { Octuple, Quadruple } from './tuple'
import * as tuple from './tuple'

export type Octets = Quadruple<number> // TODO:
export type Segments = Octuple<number>

export type IPv4 = { _: 'IPv4'; octets: Octets }
export type IPv6 = { _: 'IPv6'; segments: Segments }
export type Address = IPv4 | IPv6
export type AddressPort = Address & { port: U16 }
export type AddressOptPort = Address & { port?: U16 }

const valid_port = (port: number) => !isNaN(port) && port >= 1 && port <= 0xffff
const valid_octet = (octet: number) =>
  !isNaN(octet) && octet >= 0 && octet <= 0xff
const valid_segment = (segment: number) =>
  !isNaN(segment) && segment >= 0 && segment <= 0xffff

export const parse_address_port = (
  address_txt: string
): Result<string, AddressOptPort> => {
  address_txt = address_txt.trim()

  const ip_port_re =
    /((?:\d{1,3}(?:\.\d{1,3}){3,3})|(?:\[[0-9a-fA-F\:]+\]))(?:\:(\d+))?/
  const match = address_txt.match(ip_port_re)
  if (match == null) {
    return R.Err(`'${address_txt}' is not a valid address`)
  }
  const ip_txt = match[1]
  const port_txt = match[2]

  let port: U16 | undefined
  if (port_txt !== undefined) {
    const port_ = Number(port_txt)
    if (!valid_port(port_)) {
      return R.Err(`'${port_txt}' is not a valid port`)
    }
    port = u16.check(port_).unwrap()
  }

  if (ip_txt[0] == '[') {
    // IPv6 address
    // TODO: dual (ipv4) format
    const txt = ip_txt.slice(1, -1)
    const segments_txt = txt.split(':')

    const is_empty = (x: string): boolean => !x
    let [prefix_txt, suffix_txt] = break_list(is_empty)(segments_txt)
    prefix_txt = drop_while(is_empty)(prefix_txt)
    suffix_txt = drop_while(is_empty)(suffix_txt)

    const prefix_segments = prefix_txt.map((x) => parseInt(x, 16))
    const suffix_segments = suffix_txt.map((x) => parseInt(x, 16))
    const len = prefix_segments.length + suffix_segments.length
    const fill: number[] = Array(8 - len).fill(0)
    const segments = prefix_segments.concat(fill).concat(suffix_segments)
    if (!tuple.check_8(segments)) {
      return R.Err(`'${ip_txt}' has more than 6 segments`)
    }
    if (segments.some((x) => !valid_segment(x))) {
      return R.Err(`invalid address: ${ip_txt}`)
    }
    const addr: AddressOptPort = { _: 'IPv6', segments, port }
    return R.Ok<string, AddressOptPort>(addr)
  } else {
    // IPv4 address
    const octets = ip_txt.split('.').map(Number)
    if (!tuple.check_4(octets)) {
      return R.Err(`'${ip_txt}' has more than 4 octets`)
    }
    if (octets.some((x) => !valid_octet(x))) {
      return R.Err(`invalid address: ${ip_txt}`)
    }
    const addr: AddressOptPort = { _: 'IPv4', octets, port }
    return R.Ok<string, AddressOptPort>(addr)
  }
}

import { AddressOptPort, parse_address_port } from '../lib/address'
import { Validator } from '../types'
import { BaseValidator } from './base'

export const address_opt_port_validator: Validator<AddressOptPort> =
  new BaseValidator<AddressOptPort>(parse_address_port)

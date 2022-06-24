type Class = string | null | undefined

export function classNames(...classes: Class[]) {
  return classes.filter(Boolean).join(' ')
}

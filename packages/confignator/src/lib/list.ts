export type Cons<A> = { _: 'Cons'; head: A; tail: List<A> }
export type Nil = { _: 'Nil' }
export type List<A> = Cons<A> | Nil

export const empty: Nil = { _: 'Nil' }

export function cons<A>(head: A, tail: List<A>): List<A> {
  return { _: 'Cons', head, tail }
}

export function nil<A>(): List<A> {
  return { _: 'Nil' }
}

export function head<A>(l: List<A>): A | null {
  switch (l._) {
    case 'Nil':
      return null
    case 'Cons':
      return l.head
  }
}

export function from_array<A>(array: A[], index = 0): List<A> {
  if (index === array.length) {
    return nil()
  } else {
    return cons(array[index], from_array(array, index + 1))
  }
}

export function to_array<A>(list: List<A>): Array<A> {
  const array = []
  while (list._ !== 'Nil') {
    array.push(list.head)
    list = list.tail
  }
  return array
}

import type { List } from './list'

export type Empty = { _: 'Empty' }
export type HNode<A> = { _: 'HNode'; value: [bigint, A]; child: List<Heap<A>> }
export type Heap<A> = Empty | HNode<A>

export const empty: Empty = { _: 'Empty' }

export function merge<A>(a: Heap<A>, b: Heap<A>): Heap<A> {
  if (a._ === 'Empty') {
    return b
  } else if (b._ === 'Empty') {
    return a
  } else if (a.value[0] > b.value[0]) {
    return {
      _: 'HNode',
      value: a.value,
      child: { _: 'Cons', head: b, tail: a.child },
    }
  } else {
    return {
      _: 'HNode',
      value: b.value,
      child: { _: 'Cons', head: a, tail: b.child },
    }
  }
}

function merge_pairs<A>(pairs: List<Heap<A>>): Heap<A> {
  switch (pairs._) {
    case 'Nil':
      return { _: 'Empty' }
    case 'Cons':
      switch (pairs.tail._) {
        case 'Nil':
          return pairs.head
        case 'Cons':
          return merge(
            merge(pairs.head, pairs.tail.head),
            merge_pairs(pairs.tail.tail)
          )
      }
  }
}

export function insert<A>(heap: Heap<A>, value: [bigint, A]): Heap<A> {
  return merge({ _: 'HNode', value: value, child: { _: 'Nil' } }, heap)
}

export function head<A>(heap: Heap<A>): [bigint, A] | null {
  switch (heap._) {
    case 'HNode':
      return heap.value
    case 'Empty':
      return null
  }
}

export function tail<A>(heap: Heap<A>): Heap<A> {
  switch (heap._) {
    case 'HNode':
      return merge_pairs(heap.child)
    case 'Empty':
      return heap
  }
}

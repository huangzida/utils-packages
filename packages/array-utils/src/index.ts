export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)]
}

export const chunk = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export const groupBy = <T>(
  arr: T[],
  keyFn: (item: T) => string | number,
): Record<string | number, T[]> => {
  return arr.reduce((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<string | number, T[]>)
}

export const flatten = <T>(arr: (T | T[])[]): T[] => {
  return arr.reduce<T[]>((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten(item as T[]))
    } else {
      acc.push(item)
    }
    return acc
  }, [])
}

export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  const set2 = new Set(arr2)
  return arr1.filter((item) => !set2.has(item))
}

export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  const set2 = new Set(arr2)
  return arr1.filter((item) => set2.has(item))
}

export const sortBy = <T>(
  arr: T[],
  keyFn: (item: T) => number | string,
  order: 'asc' | 'desc' = 'asc',
): T[] => {
  return [...arr].sort((a, b) => {
    const aVal = keyFn(a)
    const bVal = keyFn(b)
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return order === 'asc' ? cmp : -cmp
  })
}

export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const zip = <T1, T2>(arr1: T1[], arr2: T2[]): [T1, T2][] => {
  const len = Math.min(arr1.length, arr2.length)
  return arr1.slice(0, len).map((item, i) => [item, arr2[i]])
}

export const partition = <T>(
  arr: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] => {
  const pass: T[] = []
  const fail: T[] = []
  for (const item of arr) {
    if (predicate(item)) {
      pass.push(item)
    } else {
      fail.push(item)
    }
  }
  return [pass, fail]
}

export const sample = <T>(arr: T[], count: number = 1): T[] => {
  const shuffled = shuffle(arr)
  return shuffled.slice(0, Math.min(count, arr.length))
}

export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = []
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  } else if (step < 0) {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  }
  return result
}

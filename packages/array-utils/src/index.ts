/**
 * Returns a new array with duplicate values removed.
 * @param arr - The array to remove duplicates from
 * @returns A new array containing only unique values
 */
export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)]
}

/**
 * Returns a new array with duplicate values removed based on a specific field.
 * @param arr - The array to remove duplicates from
 * @param key - The field name to use for comparison
 * @returns A new array containing only unique items by the specified field
 */
export const uniqueByField = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
): T[] => {
  const seen = new Set()
  return arr.filter((item) => {
    const value = item[key]
    if (seen.has(value)) {
      return false
    }
    seen.add(value)
    return true
  })
}

/**
 * Splits an array into chunks of the specified size.
 * @param arr - The array to split
 * @param size - The size of each chunk
 * @returns An array of chunks
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * Groups array elements by a key function.
 * @param arr - The array to group
 * @param keyFn - Function that returns the key to group by
 * @returns An object with keys mapped to arrays of items
 */
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

/**
 * Flattens a nested array to a single level recursively.
 * @param arr - The nested array to flatten
 * @returns A new flattened array
 */
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

/**
 * Returns elements that exist in the first array but not in the second.
 * @param arr1 - The source array
 * @param arr2 - The array with elements to exclude
 * @returns An array with elements from arr1 not present in arr2
 */
export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  const set2 = new Set(arr2)
  return arr1.filter((item) => !set2.has(item))
}

/**
 * Returns elements that exist in both arrays.
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns An array with elements common to both arrays
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  const set2 = new Set(arr2)
  return arr1.filter((item) => set2.has(item))
}

/**
 * Sorts an array by a key function.
 * @param arr - The array to sort
 * @param keyFn - Function that returns the value to sort by
 * @param order - Sort order: 'asc' for ascending (default), 'desc' for descending
 * @returns A new sorted array
 */
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

/**
 * Shuffles an array randomly using Fisher-Yates algorithm.
 * @param arr - The array to shuffle
 * @returns A new array with elements in random order
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Combines two arrays into an array of tuples.
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns An array of tuples containing pairs of elements from both arrays
 */
export const zip = <T1, T2>(arr1: T1[], arr2: T2[]): [T1, T2][] => {
  const len = Math.min(arr1.length, arr2.length)
  return arr1.slice(0, len).map((item, i) => [item, arr2[i]])
}

/**
 * Partitions an array into two arrays based on a predicate.
 * @param arr - The array to partition
 * @param predicate - Function that returns true for elements to keep in the first array
 * @returns A tuple containing [passing elements, failing elements]
 */
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

/**
 * Returns a random sample of elements from an array.
 * @param arr - The array to sample from
 * @param count - The number of elements to sample (default: 1)
 * @returns An array of randomly selected elements
 */
export const sample = <T>(arr: T[], count: number = 1): T[] => {
  const shuffled = shuffle(arr)
  return shuffled.slice(0, Math.min(count, arr.length))
}

/**
 * Generates an array of numbers from start to end with an optional step.
 * @param start - The starting number (inclusive)
 * @param end - The ending number (exclusive)
 * @param step - The increment between numbers (default: 1)
 * @returns An array of numbers
 */
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

/**
 * 返回去重后的新数组
 * @param arr - 待去重的数组
 * @returns 去重后的新数组
 */
export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)]
}

/**
 * 根据指定字段去重
 * @param arr - 待去重的数组
 * @param key - 字段名
 * @returns 去重后的新数组
 */
export const uniqueByField = <T extends Record<string, any>>(arr: T[], key: keyof T): T[] => {
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
 * 将数组分块
 * @param arr - 待分块的数组
 * @param size - 每块大小
 * @returns 分块后的数组
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * 按键函数分组
 * @param arr - 待分组的数组
 * @param keyFn - 分组键函数
 * @returns 分组后的对象
 */
export const groupBy = <T>(
  arr: T[],
  keyFn: (item: T) => string | number
): Record<string | number, T[]> => {
  return arr.reduce(
    (acc, item) => {
      const key = keyFn(item)
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(item)
      return acc
    },
    {} as Record<string | number, T[]>
  )
}

/**
 * 递归扁平化嵌套数组
 * @param arr - 嵌套数组
 * @returns 扁平化后的数组
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
 * 返回存在于第一个数组但不在第二个数组中的元素
 * @param arr1 - 源数组
 * @param arr2 - 排除数组
 * @returns 差集
 */
export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  const set2 = new Set(arr2)
  return arr1.filter((item) => !set2.has(item))
}

/**
 * 返回两个数组的交集
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 交集
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  const set2 = new Set(arr2)
  return arr1.filter((item) => set2.has(item))
}

/**
 * 按键函数排序
 * @param arr - 待排序数组
 * @param keyFn - 排序键函数
 * @param order - 排序顺序（asc 升序，desc 降序）
 * @returns 排序后的新数组
 */
export const sortBy = <T>(
  arr: T[],
  keyFn: (item: T) => number | string,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...arr].sort((a, b) => {
    const aVal = keyFn(a)
    const bVal = keyFn(b)
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return order === 'asc' ? cmp : -cmp
  })
}

/**
 * Fisher-Yates 洗牌算法随机打乱数组
 * @param arr - 待打乱数组
 * @returns 打乱后的新数组
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
 * 合并两个数组为元组数组
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 元组数组
 */
export const zip = <T1, T2>(arr1: T1[], arr2: T2[]): [T1, T2][] => {
  const len = Math.min(arr1.length, arr2.length)
  return arr1.slice(0, len).map((item, i) => [item, arr2[i]])
}

/**
 * 按谓词函数分区数组
 * @param arr - 待分区数组
 * @param predicate - 谓词函数
 * @returns [通过谓词的元素, 未通过的元素]
 */
export const partition = <T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] => {
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
 * 随机抽取数组元素
 * @param arr - 源数组
 * @param count - 抽取数量
 * @returns 抽取的元素数组
 */
export const sample = <T>(arr: T[], count: number = 1): T[] => {
  const shuffled = shuffle(arr)
  return shuffled.slice(0, Math.min(count, arr.length))
}

/**
 * 生成数字序列
 * @param start - 起始值（包含）
 * @param end - 结束值（不包含）
 * @param step - 步长
 * @returns 数字数组
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

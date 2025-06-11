export type ClassDictionary = Record<string, boolean | undefined | null>
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassValue[]

export function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = []
  
  for (const input of inputs) {
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input))
    } else if (typeof input === 'object' && input !== null) {
      if (Array.isArray(input)) {
        const result = clsx(...input)
        if (result) classes.push(result)
      } else {
        for (const [key, value] of Object.entries(input)) {
          if (value) classes.push(key)
        }
      }
    }
  }
  
  return classes.join(' ')
}

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs).replace(/\s+/g, ' ').trim()
}
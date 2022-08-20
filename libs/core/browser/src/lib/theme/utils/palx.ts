import chroma from 'chroma-js'

// const names = [
//   'red', // 0
//   'orange', // 30
//   'yellow', // 60
//   'lime', // 90
//   'green', // 120
//   'teal', // 150
//   'cyan', // 180
//   'blue', // 210
//   'indigo', // 240
//   'violet', // 270
//   'fuschia', // 300
//   'pink', // 330
//   'red', // 360
// ]

// function hueName(h: number) {
//   const i = Math.round((h - 2) / 30)
//   const name = names[i]
//   return name
// }

function createLums(min: number, max: number, steps: number) {
  const step = (max - min) / steps
  const base = min + 0.05
  return Array.from({ length: steps }, (_, i) => +(base + i * step).toFixed(2))
}

// function createHues(length: number) {
//   const hueStep = 360 / length
//   return (base: number) => {
//     const hues = Array.from({ length }, (_, n) => Math.floor((base + n * hueStep) % 360))

//     return hues
//   }
// }

// function desat(n: number) {
//   return (hex: string) => {
//     const [h, _, l] = chroma(hex).hsl()

//     return chroma.hsl(h, n, l).hex()
//   }
// }

// function createBlack(hex: string) {
//   hex = desat(1 / 8)(hex)

//   return chroma(hex).luminance(0.05).hex()
// }

function createShades(hex: string, steps: number, min: number, max: number) {
  const lums = createLums(min, max, steps)

  return lums.map((lum) => chroma(hex).luminance(lum).hex())
}

// Mappers
// const keyword = (hex: string | number | Color) => {
//   const [hue, sat] = chroma(hex).hsl()
//   if (sat < 0.5) {
//     return 'gray'
//   }
//   const name = hueName(hue)
//   return name
// }

// Reducer
// function toObj(a: Record<string, string[]>, color: { key: string; value: string[] }) {
//   const key = a[color.key] ? color.key + '2' : color.key
//   a[key] = color.value
//   return a
// }

export function palx(hex: string, steps: number, min: number, max: number): string[] {
  const color = chroma(hex)
  // const colors = []
  // const [hue] = color.hsl()

  // const hues = createHues(12)(hue)
  // console.log('hues', hues)

  // colors.push({
  //   key: 'black',
  //   value: createBlack('' + color.hex()),
  // })

  // colors.push({
  //   key: 'gray',
  //   value: createShades(desat(1 / 8)('' + color.hex())),
  // })

  // colors.push({
  //   key: 'color',
  //   value: createShades(color.hex(), min, max),
  // })

  return createShades(color.hex(), steps, min, max)

  // hues.forEach((hue) => {
  //   const c = chroma.hsl(hue, sat, lte)
  //   // const key = keyword(c)
  //   colors.push({
  //     key: c,
  //     value: createShades(c.hex()),
  //   })
  // })

  // console.log('colors', { ...colors })

  // const obj = Object.assign(
  //   {
  //     base: hex,
  //     black: createBlack('' + color.hex()),
  //   },
  //   colors.reduce(toObj, {}),
  // )

  // return obj
}

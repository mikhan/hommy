export interface Palette {
  name: string
  label: string
  base: string
  shades: PaletteShade[]
}

export interface PaletteShade {
  name: string
  background: string
  foreground: string
}

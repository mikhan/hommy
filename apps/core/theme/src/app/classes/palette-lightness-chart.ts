import {
  Chart,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from 'chart.js'
import chroma from 'chroma-js'
import { round } from '@decet/core-shared'

type ChartInstance = Chart<'line', number[]>
type ChartInstanceData = ChartData<'line', number[]>

type PaletteLightnessOptions = ChartOptions<'line'>

export interface PaletteLightnessColor {
  name: string
  background: string
}

const INSTANCE_DESTROYED_ERROR = new Error('PaletteLightnessChart instance has been destroyed.')

export class PaletteLightnessChart {
  private static initialized = false

  private chart?: ChartInstance

  private static initialize() {
    if (this.initialized) return

    Chart.register(CategoryScale)
    Chart.register(LinearScale)
    Chart.register(LineController)
    Chart.register(PointElement)
    Chart.register(LineElement)
  }

  constructor(
    context: CanvasRenderingContext2D,
    colors: PaletteLightnessColor[],
    options: PaletteLightnessOptions = DEFAULT_OPTIONS,
  ) {
    PaletteLightnessChart.initialize()
    const data = getChartData(colors)
    this.chart = new Chart(context, { type: 'line', data, options }) as ChartInstance
  }

  update({ colors, options }: { colors?: PaletteLightnessColor[]; options?: PaletteLightnessOptions } = {}) {
    if (!this.chart) throw INSTANCE_DESTROYED_ERROR
    if (options) this.chart.options = options
    if (colors) this.chart.data = getChartData(colors)

    this.chart.update()
  }

  destroy() {
    if (!this.chart) return

    this.chart.destroy()
  }
}

function getChartData(colors: PaletteLightnessColor[]): ChartInstanceData {
  const hsl = colors.map(({ background }) => getColorValues(background))
  const values = [
    // { label: 'Hue', color: 'red', data: hsl.map(({ h }) => round(h / 360, 4)) },
    // { label: 'Saturation', color: 'green', data: hsl.map(({ s }) => round(s, 4)) },
    { label: 'Lightness', color: '#1f8a87', data: hsl.map(({ l }) => round(l, 4)) },
  ]

  return {
    labels: colors.map(({ name }) => name),
    datasets: values.map(({ label, data, color }) => ({
      label,
      data,
      cubicInterpolationMode: 'monotone',
      borderColor: color,
      borderWidth: 2,
      stepped: 'middle',
    })),
  }
}

function getColorValues(color: string): { h: number; s: number; l: number } {
  const [h, s, l] = chroma(color).hsl()

  return { h, s, l }
}

const DEFAULT_OPTIONS: PaletteLightnessOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  elements: {
    point: {
      radius: 0,
    },
  },
  layout: {
    padding: { top: 20, right: 20, bottom: 10, left: 10 },
  },
  scales: {
    x: {
      grid: {
        borderColor: '#666',
        color: '#333',
      },
      ticks: {
        align: 'inner',
      },
    },
    y: {
      grid: {
        borderColor: '#666',
        color: '#333',
      },
      ticks: {
        stepSize: 0.2,
      },
      min: 0,
      max: 1,
    },
  },
}

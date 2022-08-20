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
  const labels = colors.map(({ name }) => name)
  const data = colors.map(({ background }) => chroma(background).luminance())

  return {
    labels: [...labels, labels.at(-1) ?? ''],
    datasets: [
      {
        label: 'Luminance',
        data: [...data, data.at(-1) ?? 0],
        cubicInterpolationMode: 'monotone',
        borderColor: 'hsl(192, 96%, 52%)',
        borderWidth: 2,
        stepped: true,
      },
    ],
  }
}

const DEFAULT_OPTIONS: PaletteLightnessOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  layout: {
    padding: 0,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  spanGaps: true,
  events: [],
  scales: {
    x: {
      grid: {
        tickLength: 0,
        drawBorder: false,
        color: 'rgb(0 0 0 / 0.25)',
      },
      ticks: {
        display: false,
      },
    },
    y: {
      min: 0,
      max: 1,
      grid: {
        tickLength: 0,
        drawBorder: false,
        color: 'rgb(0 0 0 / 0.25)',
      },
      ticks: {
        display: false,
        stepSize: 0.25,
      },
    },
  },
}

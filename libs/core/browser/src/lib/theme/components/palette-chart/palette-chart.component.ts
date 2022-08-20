import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  SimpleChanges,
  SimpleChange,
} from '@angular/core'
import { PaletteLightnessChart, PaletteLightnessColor } from '../../classes/palette-lightness-chart'

interface ColorChange extends SimpleChange {
  previousValue: PaletteLightnessColor[] | undefined
  currentValue: PaletteLightnessColor[]
}

interface Changes extends SimpleChanges {
  colors: ColorChange
}

@Component({
  standalone: true,
  selector: 'core-theme-palette-chart',
  templateUrl: './palette-chart.component.html',
  styleUrls: ['./palette-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaletteChartComponent implements OnChanges, AfterViewInit {
  @Input()
  colors: PaletteLightnessColor[] = []

  @ViewChild('canvas', { read: ElementRef, static: true })
  canvas!: ElementRef<HTMLCanvasElement>

  chart: PaletteLightnessChart | null = null

  ngOnChanges(changes: Changes): void {
    const current = changes.colors?.currentValue.map(({ background: value }) => value).join('') ?? ''
    const previous = changes.colors?.previousValue?.map(({ background: value }) => value).join('') ?? ''

    if (current !== previous) {
      this.updateChart()
    }
  }

  ngAfterViewInit(): void {
    this.createChart()
  }

  private createChart() {
    const context = this.canvas.nativeElement.getContext('2d')

    if (!context) throw new Error('Camvas element is not defined')

    this.chart = new PaletteLightnessChart(context, this.colors)
  }

  private updateChart() {
    if (!this.chart) return

    const { colors } = this
    this.chart.update({ colors })
  }
}

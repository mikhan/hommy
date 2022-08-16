import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core'
import { CSSCustomPropertiesService } from '@decet/kendu-browser'

const DEFAUL_STYLE = {
  duration: '20',
  repeatCount: '0',
  layer1StartColor: '#00aeef',
  layer1EndColor: '#2e9231',
  layer2StartColor: '#262262',
  layer2EndColor: '#00efae',
  layer3StartColor: '#00aeef',
  layer3EndColor: '#2b9039',
}

@Component({
  selector: 'core-background-waves',
  templateUrl: './waves.component.svg',
  styleUrls: ['./waves.component.scss'],
})
export class CoreBackgroundWavesComponent implements OnInit {
  @ViewChild('svgRef', { static: true, read: ElementRef })
  svgRef!: ElementRef

  public cssProperties!: CSSCustomPropertiesService

  ngOnInit() {
    this.cssProperties = new CSSCustomPropertiesService(this.svgRef, DEFAUL_STYLE)
  }
}

@NgModule({
  declarations: [CoreBackgroundWavesComponent],
  exports: [CoreBackgroundWavesComponent],
})
export class CoreBackgroundWavesComponentModule {}

import { animation, state, style, transition, animate } from '@angular/animations'

export const expandContractAnimation = animation([
  state('expanded', style({ height: '*', opacity: '1' })),
  state('collapsed', style({ height: '0px', opacity: '0', minHeight: '0' })),
  transition('expanded <=> collapsed', animate('250ms 250ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
])

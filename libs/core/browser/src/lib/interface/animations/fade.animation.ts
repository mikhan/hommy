import { animation, state, style, transition, animate } from '@angular/animations'

export const fadeAnimation = animation([
  state('visible', style({ opacity: '1' })),
  state('hidden', style({ opacity: '0' })),
  transition('visible <=> hidden', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
])

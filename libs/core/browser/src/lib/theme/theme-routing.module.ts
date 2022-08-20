import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { ThemePage } from './pages/theme/theme.page'

export const routes: Route[] = [
  {
    path: '',
    component: ThemePage,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}

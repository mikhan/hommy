import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@decet/core-browser').then((m) => m.ThemeModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

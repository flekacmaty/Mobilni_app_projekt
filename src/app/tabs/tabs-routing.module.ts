import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'teams',
        loadChildren: () => import('../teams/teams.module').then(m => m.TeamsPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then(m => m.favoritesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.settingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/teams',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/teams',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

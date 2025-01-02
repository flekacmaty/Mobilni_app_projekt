import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { favoritesPage } from './favorites.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { favoritesPageRoutingModule } from './favorites-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    favoritesPageRoutingModule
  ],
  declarations: [favoritesPage]
})
export class favoritesPageModule {}

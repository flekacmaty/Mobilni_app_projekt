import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamsPage } from './teams.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TeamsPageRoutingModule } from './teams-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TeamsPageRoutingModule
  ],
  declarations: [TeamsPage]
})
export class TeamsPageModule {}

import { Component } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements ViewWillEnter {
  public favoriteTeams: any[] = [];

  constructor(private teamsService: TeamsService) {}

  // Tento hook se volá při každém vstupu na stránku
  async ionViewWillEnter() {
    console.log('FavoritesPage will enter');
    await this.loadFavoriteTeams();
  }

  // Načti oblíbené týmy ze Storage
  async loadFavoriteTeams() {
    this.favoriteTeams = await this.teamsService.getFavoriteTeams();
    console.log('Favorite teams loaded:', this.favoriteTeams);
  }
}

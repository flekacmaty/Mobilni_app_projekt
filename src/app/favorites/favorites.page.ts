import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {
  public favoriteTeams: any[] = [];

  constructor(private teamsService: TeamsService) {}

  async ngOnInit() {
    console.log('FavoritesPage initialized');
    await this.loadFavoriteTeams();
  }

  // Načti oblíbené týmy ze Storage
  async loadFavoriteTeams() {
    this.favoriteTeams = await this.teamsService.getFavoriteTeams();
    console.log('Favorite teams loaded:', this.favoriteTeams);
  }
}

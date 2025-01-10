import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = 'hockeyTeams';
  private readonly FAVORITES_KEY = 'favoriteTeams';

  // Promise, který se vyřeší po inicializaci Storage
  private storageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.storageReady = this.init();
  }

  // Inicializace Storage
  private async init() {
    this._storage = await this.storage.create();
    console.log('Storage initialized');
  }

  // Načtení týmů ze Storage
  public async getTeams(): Promise<any[]> {
    await this.storageReady;
    const teams = await this._storage?.get(this.STORAGE_KEY);
    console.log('Loaded teams from storage:', teams);
    return teams || [];
  }

  // Uložení týmů do Storage
  public async setTeams(teams: any[]): Promise<void> {
    await this.storageReady;
    await this._storage?.set(this.STORAGE_KEY, teams);
    console.log('Teams saved to storage:', teams);
  }

  // Přidání nového týmu
  public async addTeam(team: any): Promise<void> {
    const teams = await this.getTeams();
    teams.push(team);
    console.log('Adding team:', team);
    await this.setTeams(teams);
  }

  // Aktualizace existujícího týmu
  public async updateTeam(updatedTeam: any): Promise<void | null> {
    const teams = await this.getTeams();
    const index = teams.findIndex(team => team.id === updatedTeam.id);
    if (index > -1) {
      teams[index] = updatedTeam;
      console.log('Updating team:', updatedTeam);
      await this.setTeams(teams);
    }
    return null;
  }

  // Odstranění týmu
  public async deleteTeam(id: number): Promise<void> {
    let teams = await this.getTeams();
    teams = teams.filter(team => team.id !== id);
    console.log('Deleting team with id:', id);
    await this.setTeams(teams);
  }

  // --- Oblíbené týmy ---

  // Načtení oblíbených týmů ze Storage
  public async getFavoriteTeams(): Promise<any[]> {
    await this.storageReady;
    const favoriteTeams = await this._storage?.get(this.FAVORITES_KEY);
    console.log('Loaded favorite teams from storage:', favoriteTeams);
    return favoriteTeams || [];
  }

  // Uložení oblíbených týmů do Storage
  public async setFavoriteTeams(teams: any[]): Promise<void> {
    await this.storageReady;
    await this._storage?.set(this.FAVORITES_KEY, teams);
    console.log('Favorite teams saved to storage:', teams);
  }

  // Přidání/odebrání týmu z oblíbených
  public async toggleFavoriteTeam(team: any): Promise<void> {
    const favoriteTeams = await this.getFavoriteTeams();
    const index = favoriteTeams.findIndex(t => t.id === team.id);

    if (index > -1) {
      // Pokud je tým už v oblíbených, odeber ho
      favoriteTeams.splice(index, 1);
      console.log(`Removed team from favorites: ${team.name}`);
    } else {
      // Pokud tým není v oblíbených, přidej ho
      favoriteTeams.push(team);
      console.log(`Added team to favorites: ${team.name}`);
    }

    await this.setFavoriteTeams(favoriteTeams);
  }
}

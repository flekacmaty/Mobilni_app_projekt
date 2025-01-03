import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.page.html',
  styleUrls: ['teams.page.scss'],
  standalone: false,
})
export class TeamsPage implements OnInit {

  public hockeyTeams: any[] = [];

  constructor(private router: Router, private teamsService: TeamsService) { }

  async ngOnInit() {
    console.log('TeamsPage initialized');
    await this.loadTeams();
  }

  async loadTeams() {
    console.log('Loading teams from service');
    this.hockeyTeams = await this.teamsService.getTeams();
    console.log('Current teams:', this.hockeyTeams);
    
    // Pokud Storage je prázdný, inicializuj s předdefinovanými týmy
    if (this.hockeyTeams.length === 0) {
      console.log('Initializing default teams');
      this.hockeyTeams = [
        { 
          id: 1, 
          name: 'Boston Bruins', 
          country: 'USA', 
          logo: 'assets/logos/boston-bruins.jpg', 
          founded: 1924,
          description: 'One of the Original Six teams of the NHL.'
        },
        { 
          id: 2, 
          name: 'Toronto Maple Leafs', 
          country: 'Canada', 
          logo: 'assets/logos/toronto-maple-leafs.png', 
          founded: 1917,
          description: 'Another Original Six team with a rich history.'
        },
        { 
          id: 3, 
          name: 'HC Sparta Praha', 
          country: 'Czech Republic', 
          logo: 'assets/logos/hc-sparta-praha.jpeg', 
          founded: 1903,
          description: 'A prominent team in the Czech Extraliga.'
        },
        { 
          id: 4, 
          name: 'LA Kings', 
          country: 'USA', 
          logo: 'assets/logos/la-kings.png', 
          founded: 1967,
          description: 'Based in Los Angeles, known for their dynamic play.'
        },
      ];
      console.log('Saving default teams to storage');
      await this.teamsService.setTeams(this.hockeyTeams);
      console.log('Default teams saved');
    }
  }

  goToDetail(team: any) {
    this.router.navigate(['/tabs/team-detail', team.id]);
  }
}

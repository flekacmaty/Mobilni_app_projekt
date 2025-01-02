import { Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.page.html',
  styleUrls: ['teams.page.scss'],
  standalone: false,
})
export class TeamsPage {

  // Pro ukázku: jednoduché testovací data
  public hockeyTeams = [
    { name: 'Boston Bruins', country: 'USA' },
    { name: 'Toronto Maple Leafs', country: 'Canada' },
    { name: 'HC Sparta Praha', country: 'Czech Republic' },
    { name: 'LA Kings', country: 'USA' },
  ];

  constructor() { }

  ngOnInit() {
    // Zatím prázdné
  }
}

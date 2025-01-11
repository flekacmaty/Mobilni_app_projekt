import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
  standalone: false
})
export class TeamDetailPage implements OnInit {
  public team: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Získání dat týmu z navigačního stavu
    const navigation = history.state;
    if (navigation && navigation.team) {
      this.team = navigation.team;
    } else {
      // Pokud navigační stav chybí, načti data podle ID z URL
      const teamId = this.route.snapshot.paramMap.get('id');
      console.error('Team data not found for ID:', teamId);
    }
  }
}
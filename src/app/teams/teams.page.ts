import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../services/teams.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.page.html',
  styleUrls: ['teams.page.scss'],
  standalone: false,
})
export class TeamsPage implements OnInit {

  public hockeyTeams: any[] = [];
  public filteredTeams: any[] = [];
  public favoriteTeams: any[] = [];
  public searchTerm: string = '';
  public currentLocation: any = null;

  constructor(private router: Router, private teamsService: TeamsService) { }

  async ngOnInit() {
    console.log('TeamsPage initialized');
    await this.loadTeams();
    await this.loadFavoriteTeams();
    await this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.currentLocation = position.coords;
      console.log('Current location:', this.currentLocation);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  // Funkce pro výpočet vzdálenosti mezi dvěma body (v metrech)
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const R = 6371; // Poloměr Země v km
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Vzdálenost v metrech
    return distance;
  }

  // Funkce pro zobrazení detailů stadionu a vzdálenosti
  showStadiumDetails(stadium: any) {
    if (this.currentLocation) {
      const distance = this.calculateDistance(
        this.currentLocation.latitude,
        this.currentLocation.longitude,
        stadium.coordinates.lat,
        stadium.coordinates.lng
      );
      console.log(`Stadion: ${stadium.name}, Vzdálenost: ${distance.toFixed(2)} m`);
      alert(`Stadion: ${stadium.name}\nVzdálenost: ${distance.toFixed(2)} m`);
    } else {
      alert('Nemohu získat aktuální polohu.');
    }
  }

  async loadTeams() {
    console.log('Loading teams from service');
    
    // Načteme týmy z externí služby (např. API)
    this.hockeyTeams = await this.teamsService.getTeams();
    this.filteredTeams = [...this.hockeyTeams]; // Zobrazíme všechny týmy na začátku

    // Pokud nejsou žádné týmy z externí služby, nastavíme výchozí týmy
    if (this.hockeyTeams.length === 0) {
        console.log('Initializing default teams');
        
        // Definujeme 10 týmu NHL, které budou "natvrdo" v seznamu
        this.hockeyTeams = [
            { 
                id: 1, 
                name: 'Boston Bruins', 
                country: 'USA', 
                logo: 'assets/logos/boston-bruins.jpg', 
                founded: 1924, 
                description: 'One of the Original Six teams of the NHL.',
                stadium: {
                    name: 'TD Garden',
                    address: '100 Legends Way, Boston, MA 02114, USA',
                    coordinates: { lat: 42.3656, lng: -71.0621 }
                }
            },
            { 
                id: 2, 
                name: 'Toronto Maple Leafs', 
                country: 'Canada', 
                logo: 'assets/logos/toronto-maple-leafs.png', 
                founded: 1917, 
                description: 'Another Original Six team with a rich history.',
                stadium: {
                    name: 'Scotiabank Arena',
                    address: '40 Bay Street, Toronto, ON M5J 2X2, Canada',
                    coordinates: { lat: 43.6435, lng: -79.3798 }
                }
            },
            { 
                id: 3, 
                name: 'Montreal Canadiens', 
                country: 'Canada', 
                logo: 'assets/logos/montreal-canadiens.png', 
                founded: 1909, 
                description: 'A historic NHL team with numerous championships.',
                stadium: {
                    name: 'Bell Centre',
                    address: '1909 Avenue des Canadiens-de-Montréal, Montreal, QC H4B 5G0, Canada',
                    coordinates: { lat: 45.4975, lng: -73.5795 }
                }
            },
            { 
                id: 4, 
                name: 'New York Rangers', 
                country: 'USA', 
                logo: 'assets/logos/new-york-rangers.png', 
                founded: 1926, 
                description: 'One of the Original Six teams of the NHL.',
                stadium: {
                    name: 'Madison Square Garden',
                    address: '4 Pennsylvania Plaza, New York, NY 10001, USA',
                    coordinates: { lat: 40.7505, lng: -73.9934 }
                }
            },
            { 
                id: 5, 
                name: 'Chicago Blackhawks', 
                country: 'USA', 
                logo: 'assets/logos/chicago-blackhawks.png', 
                founded: 1926, 
                description: 'A successful NHL franchise based in Chicago.',
                stadium: {
                    name: 'United Center',
                    address: '1901 W Madison St, Chicago, IL 60612, USA',
                    coordinates: { lat: 41.8807, lng: -87.6742 }
                }
            },
            { 
                id: 6, 
                name: 'Detroit Red Wings', 
                country: 'USA', 
                logo: 'assets/logos/detroit-red-wings.png', 
                founded: 1926, 
                description: 'A team with a rich history in the NHL.',
                stadium: {
                    name: 'Little Caesars Arena',
                    address: '2645 Woodward Ave, Detroit, MI 48201, USA',
                    coordinates: { lat: 42.3417, lng: -83.0550 }
                }
            },
            { 
                id: 7, 
                name: 'Pittsburgh Penguins', 
                country: 'USA', 
                logo: 'assets/logos/pittsburgh-penguins.png', 
                founded: 1967, 
                description: 'A dynamic team with multiple Stanley Cup championships.',
                stadium: {
                    name: 'PPG Paints Arena',
                    address: '1001 Fifth Ave, Pittsburgh, PA 15219, USA',
                    coordinates: { lat: 40.4395, lng: -79.9930 }
                }
            },
            { 
                id: 8, 
                name: 'Los Angeles Kings', 
                country: 'USA', 
                logo: 'assets/logos/la-kings.png', 
                founded: 1967, 
                description: 'Based in Los Angeles, known for their dynamic play.',
                stadium: {
                    name: 'Crypto.com Arena',
                    address: '1111 S Figueroa St, Los Angeles, CA 90015, USA',
                    coordinates: { lat: 34.0430, lng: -118.2673 }
                }
            },
            { 
                id: 9, 
                name: 'San Jose Sharks', 
                country: 'USA', 
                logo: 'assets/logos/san-jose-sharks.png', 
                founded: 1991, 
                description: 'A strong team with a competitive edge in the NHL.',
                stadium: {
                    name: 'SAP Center',
                    address: '525 W Santa Clara St, San Jose, CA 95113, USA',
                    coordinates: { lat: 37.3353, lng: -121.9002 }
                }
            },
            { 
                id: 10, 
                name: 'Washington Capitals', 
                country: 'USA', 
                logo: 'assets/logos/washington-capitals.png', 
                founded: 1974, 
                description: 'A team known for its consistency and great players.',
                stadium: {
                    name: 'Capital One Arena',
                    address: '601 F Street NW, Washington, D.C. 20004, USA',
                    coordinates: { lat: 38.8977, lng: -77.0200 }
                }
            },
        ];

        console.log('Saving default teams to storage');
        await this.teamsService.setTeams(this.hockeyTeams);
        this.filteredTeams = [...this.hockeyTeams];
        console.log('Default teams saved');
    }
}

  async loadFavoriteTeams() {
    console.log('Loading favorite teams from storage');
    this.favoriteTeams = await this.teamsService.getFavoriteTeams();
    console.log('Current favorite teams:', this.favoriteTeams);
  }

  filterTeams() {
    const term = this.searchTerm.trim().toLowerCase();
    
    if (term === '') {
      // Pokud je vyhledávací pole prázdné, zobraz všechny týmy
      this.filteredTeams = [...this.hockeyTeams];
    } else {
      // Jinak filtruj podle názvu týmu
      this.filteredTeams = this.hockeyTeams.filter(team =>
        team.name.toLowerCase().includes(term)
      );
    }
  }
  
  async toggleFavorite(team: any) {
    await this.teamsService.toggleFavoriteTeam(team);
    this.favoriteTeams = await this.teamsService.getFavoriteTeams();
    console.log(`${team.name} byl přidán/odebrán z oblíbených.`);
  }

  isFavorite(team: any): boolean {
    return this.favoriteTeams.some(favTeam => favTeam.id === team.id);
  }
}

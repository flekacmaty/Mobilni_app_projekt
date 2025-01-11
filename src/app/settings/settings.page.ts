import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: false,
})
export class settingsPage {
  isDarkMode = false;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    // Načti režim při načtení stránky
    this.isDarkMode = document.body.classList.contains('dark');
  }

  async toggleDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      await this.storage.set('theme', 'dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      await this.storage.set('theme', 'light');
    }
  }
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Storage } from '@ionic/storage-angular';

async function bootstrap() {
  // Inicializace Ionic Storage
  const storage = new Storage();
  await storage.create();

  // Načti uložený režim (dark nebo light)
  const savedTheme = await storage.get('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.add('light');
  }

  // Spusť aplikaci
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

bootstrap();

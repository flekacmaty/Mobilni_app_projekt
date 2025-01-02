import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { favoritesPage } from './favorites.page';

describe('favoritesPage', () => {
  let component: favoritesPage;
  let fixture: ComponentFixture<favoritesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [favoritesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(favoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

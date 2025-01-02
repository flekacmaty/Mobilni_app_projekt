import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TeamsPage } from './teams.page';

describe('TeamsPage', () => {
  let component: TeamsPage;
  let fixture: ComponentFixture<TeamsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

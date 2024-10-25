import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [MapComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent {

}

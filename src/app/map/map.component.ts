import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as L from 'leaflet';
import { MsaService } from '../service/msa.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { payload, ShipInfo } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MatProgressSpinnerModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  map!: L.Map;
  shipdata: ShipInfo[] = [
    {
      id: '12345',
      from_: 'Port of Los Angeles',
      to: 'Port of Tokyo',
      dtg: new Date().toDateString(), // Set to the current date and time; adjust as needed
      location: 'Pacific Ocean',
      direction: 'East',
      speed: '15 knots',
      criticality: 'Moderate',
      supportNeeded: 'Fuel Supply',
      weather: 'Clear skies',
      destinationTime: new Date().toDateString(), // Example in ISO format; adjust as needed
      identification: 'IMO 1234567',
      nameOfShip: 'Evergreen',
      typeOfActivity: 'Cargo Transport',
      significance: 'High Priority',
      latitude: 34.052235, // Example latitude for Los Angeles
      longitude: -118.243683, // Example longitude for Los Angeles
      additionalInformation: 'Requires expedited processing due to high-value cargo.',
      severity: false,
      supportNeededBool: false
    }
  ];
  filter: payload = {
    id: null,
    from_: null,
    to: null,
    location: null,
    severity:null,
    supportNeededBool: null,
    nameOfShip: null

}

  constructor(private service: MsaService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.service.getAllForMap(this.filter).subscribe({
      next: (res) => {
        this.shipdata = res as ShipInfo[]; 
        this.initMap();
        this.addMarkersToMap();
      },
      error: () => {
        this.initMap();
      }
    });
    
    
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove(); // Remove the existing map instance if it exists
    }

    this.map = L.map('map').setView([0, 0], 2); // Reinitialize map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  reloadData(): void {
    this.service.getAllForMap(this.filter).subscribe(
      (data) => {
        this.shipdata = data as ShipInfo[];
        this.initMap(); // Reset the map to clear all markers
        this.addMarkersToMap(); // Add new markers
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  addMarkersToMap(): void {
    this.shipdata.forEach((ship) => {
      // Only add marker if coordinates are valid
      if (ship.latitude && ship.longitude) {
        const iconUrl = this.getIconUrl(ship.nameOfShip);
        const icon = L.icon({
          iconUrl: iconUrl,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        // Use latitude and longitude for marker position
        const marker = L.marker(
          [ship.latitude, ship.longitude],
          { icon }
        ).addTo(this.map);

        marker.on('click', () => this.dialog.open(DisplayComponent, {
          width: 'auto',
          data: this.shipdata.find(shipDetail =>
            shipDetail.id === ship.id)
        }))
      }
    });
  }


  getIconUrl(shipName: string) {
    const iconMapping: Record<string, string> = {
      'Ship1': 'path/to/ship1-icon.png',
      'Ship2': 'path/to/ship2-icon.png',
    };
    
    return iconMapping[shipName] || 'data:image/png;base64,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'
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ShipInfo, User } from '../user';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MsaService } from '../service/msa.service';
import { EditComponent } from '../edit/edit.component';
import { CreateComponent } from '../create/create.component';
import { DisplayComponent } from '../display/display.component';
import { MatButtonModule } from '@angular/material/button';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  home!: boolean
  error!: any
  shipInfo!: ShipInfo[];
  modifiedShipInfo!: ShipInfo[];
  searchInput = '';
  saved = false;
  updated = false;
  deleted = false;


  constructor(private dialog: MatDialog, private router: Router, private service: MsaService) { }

  ngOnInit(): void {
    let sampleShipInfo: ShipInfo = {
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
      severity: true,
      supportNeededBool: false
    };
    this.modifiedShipInfo = [sampleShipInfo]
    this.home = true
    // this.service.getAll().subscribe({
    //   next: (res) => {
    //     this.shipInfo = res.data;
    //     this.modifiedShipInfo = res.data;
    //     this.home = true;
    //   },
    //   error: () => {
    //     this.error = 'Contact administrator';
    //   }
    // }) 
  }

  update(id: string| undefined) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '500px',
      data: this.modifiedShipInfo.find(ship =>
        ship.id === id)
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        if (result === true) {
          this.updated = true;
          this.refreshData();
        } else {
          this.updated = false;
        }
      }
    });
  }

  create() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px'
    })
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        if (result === true) {
          this.saved = true;
          this.refreshData();
        } else {
          this.saved = false;
        }
      }
    });
  }

  delete(id: string|undefined) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: id
    })
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        if (result === true) {
          this.deleted = true;
          this.refreshData();
        } else {
          this.deleted = false;
        }
      }
    });
  }

  refreshData() {
    this.service.getAll().subscribe((res) => {
      this.modifiedShipInfo = res.data;
    })
  }

  display(id: string|undefined) {

    this.dialog.open(DisplayComponent, {
      width: 'auto',
      data: this.modifiedShipInfo.find(ship =>
        ship.id === id)
    })

  }

  selectedFile: File | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.uploadAsBase64();
    } else {
      console.log('No file selected');
    }
  }

  private uploadAsBase64(): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result?.toString();
      this.service.uploadFile(base64String).subscribe({
        next: () => {
          console.log('Upload successful:');
        },
        error: () => {
          console.error('Upload error:');
        }
      })
    };
    reader.readAsDataURL(this.selectedFile!);
  }
  
}
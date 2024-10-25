import { Component, OnInit } from '@angular/core';
import { MsaService } from '../service/msa.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ShipInfo } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  load = false;
  editData: ShipInfo = {
    from_: '',
    to: '',
    dtg: '',
    location: '',
    direction: '',
    speed: '',
    criticality: '',
    supportNeeded: '',
    weather: '',
    destinationTime: '',
    identification: '',
    nameOfShip: '',
    typeOfActivity: '',
    significance: '',
    latitude: null,
    longitude: null,
    additionalInformation: ''
  }
  constructor(private service: MsaService, private dialogRef: MatDialogRef<CreateComponent>) {}
  ngOnInit(): void {
    this.load = true;
  }

  save() {
    this.service.createShipDetails(this.editData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        this.dialogRef.close(false);
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}

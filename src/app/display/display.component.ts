import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ShipInfo } from '../user';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss'
})
export class DisplayComponent {
  editData!: ShipInfo;
  constructor(private dialogRef: MatDialogRef<DisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public modelData: ShipInfo ){
      this.editData = modelData;
    }

    close() {
      this.dialogRef.close();
    }

}

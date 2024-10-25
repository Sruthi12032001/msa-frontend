import { Component, Inject } from '@angular/core';
import { MsaService } from '../service/msa.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ShipInfo } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
  MatDatepickerModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  editData!: ShipInfo;
  constructor(private service: MsaService, private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShipInfo) {
      this.editData = data;
    }

  save() {
    console.log(this.editData)
    this.service.update(this.editData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        this.dialogRef.close(false);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MsaService } from '../service/msa.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  id!: string;
  constructor(private service: MsaService, private dialogRef: MatDialogRef<DeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: string ) {
    this.id = data;
  }

  confirmDelete(): void {
    this.service.delete(this.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        this.dialogRef.close(false);
      }
    })
    
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

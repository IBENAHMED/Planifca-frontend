import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarServiceService {

  constructor(private snackBar: MatSnackBar) {};

  show(message: string, duration: number = 3000, horizontalPosition: 'left' | 'center' | 'right' = 'left', verticalPosition: 'top' | 'bottom' = 'bottom'): void {
    this.snackBar.open(message, 'Close', {
      duration,
      horizontalPosition,
      verticalPosition,
    });
  };
};

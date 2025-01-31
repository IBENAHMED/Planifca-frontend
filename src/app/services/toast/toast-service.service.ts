import { Injectable } from '@angular/core';
// @ts-ignore
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor() { }

  showToast(message: string, type: 'success' | 'error' = 'success', icon: any) {
    const backgroundColor = type === 'success'
      ? "linear-gradient(to right,rgba(37, 100, 235, 0.46),rgba(59, 59, 59, 0.42))"
      : "linear-gradient(to right,rgba(0, 0, 0, 0.47),rgba(59, 59, 59, 0.42))";

    Toastify({
      text: `${icon} ${message}`,
      duration: 1500,
      gravity: "top",
      position: "right",
      backgroundColor,
    }).showToast();
  };
};

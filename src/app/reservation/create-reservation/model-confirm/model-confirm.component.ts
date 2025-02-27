import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLS } from '../../../components/helpers/url-constants';

@Component({
  selector: 'app-model-confirm',
  standalone: true,
  imports: [],
  templateUrl: './model-confirm.component.html',
  styleUrl: './model-confirm.component.scss'
})
export class ModelConfirmComponent {

  public modelService=inject(NgbModal)
  private route=inject(Router)

  closeWithoutSave(){
    this.route.navigate([URLS.RESERVATION])
    this.modelService.dismissAll()
  }

}

import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../../admin/services/admin.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-admin-privacy',
  templateUrl: './admin-privacy.component.html',
  styleUrls: ['./admin-privacy.component.css']
})
export class AdminPrivacyComponent implements OnInit {

  modalRef: BsModalRef | null;
  public data = {content:""}
  constructor(private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  ngOnInit() {
    this.ngxService.start()
    this.adminService.privacy().subscribe(
      res => {
      
        let terms = res['success'][0]['content'];
        this.data.content = terms;
       this.ngxService.stop()
      },
      err => { 
        this.ngxService.stop()
        
      }
    )
  }
updateTerms(template:any){

  this.modalRef = this.modalService.show(template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}

confirm(){
  this.ngxService.start();
  this.adminService.addPrivacy(this.data).subscribe((result) => {
  
    this.router.navigateByUrl('admin/privacy');
    this.ngxService.stop();
    this.modalRef.hide(); 
  
   }, (err) => {
   
    this.ngxService.stop();
    
   });        

}
}

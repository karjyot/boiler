import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css'],
  

})

export class AdminAboutComponent implements OnInit {
  
  modalRef: BsModalRef | null;
  public data = {content:""}
  constructor(private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  ngOnInit() {
    this.ngxService.start()
    this.adminService.about().subscribe(
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
  this.adminService.addAbout(this.data).subscribe((result) => {
  
    this.router.navigateByUrl('admin/about-us');
    this.ngxService.stop();
    this.modalRef.hide(); 
  
   }, (err) => {
   
    this.ngxService.stop();
    
   });        

}
}

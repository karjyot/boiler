import { Component, OnInit } from '@angular/core';

import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-referal-request',
  templateUrl: './referal-request.component.html',
  styleUrls: ['./referal-request.component.css']
})
export class ReferalRequestComponent implements OnInit {
  payments : any;
  perPage = 10;
  totalEntries = "";
  
  p = 1;
  modalRefDel:BsModalRef | null;
  modalRefStatus:BsModalRef | null;
  postStatus = "";
  status= "";
  searchText:'';
  id:any
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router) { }

  ngOnInit() {
    this.ngxService.start();
    this.loginService.getReferalPayments().subscribe((data) => {
      this.payments = data["success"];
      this.ngxService.stop();
     }, (err) => {
      this.ngxService.stop();
      
     });
  }
  pay(datatoSend){
    
  }


  changePostStatus(status,template:any,id){
    this.id = id
    this.status = status
    this.postStatus = status
    this.modalRefStatus = this.modalService.show(template)
  }

  confirmChangeStatus(){
    let datatoSend = this.id
    this.ngxService.start();
    let data = {
      userID : datatoSend.user_id,
      amount:datatoSend.amount

    }
    this.loginService.payAdmin(data).subscribe((data) => {
      this.payments = data["success"];
      this.ngxService.stop();
      this.modalRefStatus.hide();
      this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
      this.router.navigate(["admin/referal-requests"]));
     }, (err) => {
      this.ngxService.stop();
      
     });
  }

}

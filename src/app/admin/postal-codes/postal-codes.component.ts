import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-postal-codes',
  templateUrl: './postal-codes.component.html',
  styleUrls: ['./postal-codes.component.css']
})
export class PostalCodesComponent implements OnInit {
  listUsers:any;
  signupForm: FormGroup;
  updateInfo: FormGroup;
  perPage = 10;
  totalEntries = "";
  currentUser :any;
  modalRef: BsModalRef | null;
  modalRefAdd: BsModalRef | null;
  modalRefUpdate: BsModalRef | null;
  public files: any[];
profileImg :any;
categories:any;
userId:'';
id:'';
searchText:'';
p = 1;
modalRefDel:BsModalRef | null;
modalRefStatus:BsModalRef | null;
postStatus = "";
status= "";
category = 'A'
categoriesGroup:any
constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }

public signupData = {bookings:'',price:'' };
details:any
submitted = false;
ngOnInit() {
  this.details =  this.adminService.getAdminDetails();
  this.signupForm = this.formBuilder.group({    
    bookings: ['', [Validators.required]],
    price: [''],
    
    
});

this.getPostalCodes('A');

}
getPostalCodes(category){
  this.category = category
  this.ngxService.start()
  this.adminService.getPostalCodes(this.category).subscribe(
    res => {
      this.listUsers = res['success'];
      this.categoriesGroup =res['cate'];
      this.totalEntries = this.listUsers.length;
      this.listUsers.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
        Date(val1.created_at)})
      this.ngxService.stop();
    },
    err => { 
      this.ngxService.stop();
      
    }
  )
}

cancelAddUser(){
  this.signupData.bookings = "";
  this.signupData.price = "";
 
 this.modalRefUpdate.hide();

}


get upateF() { return this.updateInfo.controls; }

addUser(template:any,category){

  this.modalRefUpdate = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );

  this.signupData.bookings = this.categoriesGroup.limit_bookings;
  this.signupData.price = this.categoriesGroup.price;
  this.userId = category
}
signup(){
 
     this.ngxService.start()
     const formData = new FormData();
     
     formData.append('booking', this.signupData.bookings);
     formData.append('price', this.signupData.price);
  
    console.log(this.userId)
     this.loginService.updateBookings(formData,this.userId).subscribe((result) => {
      this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
      this.router.navigate(["admin/postal-codes"]));
      this.ngxService.stop();
      this.modalRefUpdate.hide();
     this.toastr.success('Your information updated succesfully.', 'Success');
        
     }, (err) => {
      
      this.ngxService.stop();
      
     });
  
    }
   
    

}

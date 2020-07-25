import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-referal-percentage',
  templateUrl: './referal-percentage.component.html',
  styleUrls: ['./referal-percentage.component.css']
})
export class ReferalPercentageComponent implements OnInit {

  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }

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
countries:any
  public infos = { photos:"",price:"",duration:"",name:''};
  public signupData = { photos:"",price:"",duration:"",name:''};
submitted = false;
  ngOnInit() {

    this.updateInfo = this.formBuilder.group({    
      fname: ['', [Validators.required]],
     
  });
  
this.ngxService.start()
    this.adminService.getPercentage().subscribe(
      res => {
        this.listUsers = res['success'];
      
        this.ngxService.stop();
      },
      err => { 
        this.ngxService.stop();
        
      }
    )
  
  }

  viewUserInfo(template: any,users){
    this.currentUser = users
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
 
  }
  addUser(template: any){
    this.modalRefAdd = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  cancelAddUser(){
    this.signupData.name = "";
  
   this.modalRefAdd.hide();

  }


 
  get f() { return this.signupForm.controls; }
  get upateF() { return this.updateInfo.controls; }
 
  updateUser(template:any,userDetails){
    this.modalRefUpdate = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.infos.name = userDetails.percentage;
   
  }
  update(){
   
        this.submitted = true;
        if (this.updateInfo.invalid) {
          this.toastr.error('Please provide the required information.');
             return;
       }
       this.ngxService.start()
       const formData = new FormData();
       
     
       formData.append('percentage', this.infos.name);
      
       //formData.append('ns', this.infos.ns);
      
       this.adminService.Updatepercentage(formData).subscribe((result) => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/percentage"]));
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Percentage updated succesfully.', 'Success');
          
       }, (err) => {
        try{
          this.toastr.error("Internal Server Error.");
        }catch(e){
          this.toastr.error("Internal Server Error.");
        }
        this.ngxService.stop();
        
       });
    
      }
     

}
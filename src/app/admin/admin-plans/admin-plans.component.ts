import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.css']
})
export class AdminPlansComponent implements OnInit {

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
  public infos = { photos:"",price:"",duration:"",name:'',description:""};
  public signupData = { photos:"",price:"",duration:"",name:'',description:""};
submitted = false;
  ngOnInit() {

    this.updateInfo = this.formBuilder.group({    
      fname: ['', [Validators.required]],
      photos: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      description: [''],
  });
   this.signupForm = this.formBuilder.group({    
    fname: ['', [Validators.required]],
    photos: ['', [Validators.required]],
    price: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    description: [''],
   
});
this.ngxService.start()
    this.adminService.getPlans().subscribe(
      res => {
        this.listUsers = res['success'];
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
    this.signupData.photos = "";
    this.signupData.price = "";
    this.signupData.duration = "";
    this.signupData.description = "";

   this.modalRefAdd.hide();

  }


  signup(){
  this.submitted = true;
  if (this.signupForm.invalid) {
         this.toastr.error('Please provide the required information.');
            return;
      }
      this.ngxService.start()
      const formData = new FormData();
      formData.append('name', this.signupData.name);
      formData.append('photos', this.signupData.photos);
      formData.append('price', this.signupData.price);
      formData.append('duration', this.signupData.duration);
      formData.append('description', this.signupData.description);
      this.adminService.addPackage(formData).subscribe((result) => {
        this.ngxService.stop();
        this.toastr.success('Plan added succesfully.');
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/plans"]));
          this.signupForm.reset();
          this.modalRefAdd.hide();
          
       }, (err) => {
        try{
          this.toastr.error("Internal Server Error.");
        }catch(e){
          this.toastr.error("Internal Server Error.");
        }
        this.ngxService.stop();
        
       });
  }
  get f() { return this.signupForm.controls; }
  get upateF() { return this.updateInfo.controls; }
 
  updateUser(template:any,userDetails){
    this.modalRefUpdate = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.infos.name = userDetails.plan_name;
    this.infos.photos =  userDetails.photos;
    this.infos.price =  userDetails.price;
    this.infos.duration = userDetails.duration;
    this.infos.description = userDetails.description;
    this.userId = userDetails.id
  }
  update(){
   
        this.submitted = true;
        if (this.updateInfo.invalid) {
          this.toastr.error('Please provide the required information.');
             return;
       }
       this.ngxService.start()
       const formData = new FormData();
       
     
       formData.append('name', this.infos.name);
       formData.append('photos', this.infos.photos);
       formData.append('price', this.infos.price);
       formData.append('duration', this.infos.duration);
       formData.append('description', this.infos.description);
       //formData.append('ns', this.infos.ns);
      
       this.adminService.updatePackage(formData,this.userId).subscribe((result) => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/plans"]));
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Plan updated succesfully.', 'Success');
          
       }, (err) => {
        try{
          this.toastr.error("Internal Server Error.");
        }catch(e){
          this.toastr.error("Internal Server Error.");
        }
        this.ngxService.stop();
        
       });
    
      }
      deleteUser(template:any,id){
        this.id = id
        this.modalRefDel = this.modalService.show(template)
      }
      confirmDelete(){
        this.ngxService.start();
        this.adminService.deletePackage(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/plans"]));
            this.modalRefDel.hide();
            this.ngxService.stop();
          },
          err => { 
            this.ngxService.stop();
            
          }
        )
      }

      changePostStatus(status,template:any,id){
        this.id = id
        this.status = status
        this.postStatus = status
        this.modalRefStatus = this.modalService.show(template)
      }
    
      confirmChangeStatus(){
        this.ngxService.start()
        this.adminService.deletePackage( this.id).subscribe(
          res => {
            this.ngxService.stop()
            this.modalRefStatus.hide();
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/plans"]));
          },
          err => { 
           
            
          }
        )
      }

 

}

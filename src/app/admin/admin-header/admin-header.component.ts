import { Component, OnInit } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
declare var $ :any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd,Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  adminDetails:any;
  modalRefUpdate: BsModalRef | null;
  updateInfo: FormGroup;
  profileImg:any;
  submitted = false;
  userDetails:any;
    public files: any[];
  public infos = { fname:'',  lname: '',email:'',phone:'',file:'',userId:'' };
  constructor(private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }

  ngOnInit() {
    $(window).resize(function() {
      if($(window).width() <= 567) {
          // if larger or equal
          $('#contain').addClass('hide-sidebar-admin');
      } 
  }).resize();
    this.userDetails = this.adminService.getAdminDetails();
    this.updateInfo = this.formBuilder.group({    
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required]],

  });
    this.adminDetails =   this.adminService.getAdminDetails()
  }
  sidebarToggle(){


       $('#contain').toggleClass('hide-sidebar-admin');
   }
   logout(){
    
    this.adminService.deleteToken();
    this.adminService.deleteAdminDetails();
  
    this.router.navigate(["admin/login"])
   }

   settings(template:any){
    this.modalRefUpdate = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.infos.email =  this.userDetails.email;
   }
   get upateF() { return this.updateInfo.controls; }

   update(){
  
        this.submitted = true;
        if (this.updateInfo.invalid) {
          this.toastr.error('Please provide the required information.');
             return;
       }
       this.ngxService.start()
       const formData = new FormData();
       formData.append('id', this.adminDetails.id);
       formData.append('email', this.infos.email);
       formData.append('password', this.infos.phone);
    
  

       this.adminService.updateUserAdmin(formData).subscribe((result) => {
        let AdminDetails = this.adminService.getAdminDetails();
      
        AdminDetails.email = this.infos.email
     this.adminService.setAdminDetails(AdminDetails)
     this.adminDetails = this.adminService.getAdminDetails();
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Your information updated succesfully.', 'Success');
          
       }, (err) => {
        try{
          if(err.error.error.email){
            this.toastr.error(err.error.error.email[0]);
          }else if(err.error.error.c_password){
            this.toastr.error("password and confirm password does not matched.");
          }else if(err.error.error == "phoneError"){
            this.toastr.error("Provide phone number with country code..");
          }
          else if(err.error.error.phone){
            this.toastr.error("This phone number is already registerd.");
          }
        }catch(e){
          this.toastr.error("Internal server error.");
        }
        this.ngxService.stop();
        
       });
    
      }
   
}

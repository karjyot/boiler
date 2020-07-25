import { Component, OnInit } from '@angular/core';
import { AdminService } from "./../../admin/services/admin.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false


  submittedForget = false
  public loginData = { email:'',  password: '',rememberme:'' };
  public forgotPass = { email:'' };
  constructor(private toastr: ToastrService,private modalService: BsModalService,private router : Router, private ngxService: NgxUiLoaderService, private formBuilder: FormBuilder,  private adminService: AdminService,) {} 

  ngOnInit() {

    this.signinForm = this.formBuilder.group({    
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember:['']
  });
  }
 
  login(){
    console.log(this.loginData.rememberme)
   this.submitted = true;
   if (this.signinForm.invalid) {
         this.toastr.error('Please provide the required information.');
            return;
    }


    this.ngxService.start()

        this.adminService.login(this.loginData).subscribe(
     res => {
      this.adminService.setAdminDetails(res['userDetails'])
      this.adminService.setToken(res['success']['token']);
     this.ngxService.stop();
       this.router.navigate(["admin/dashboard"]); 
     },
     err => {
      this.toastr.error("Invalid Username/Password....");
     this.ngxService.stop();
     }
   );

    }

    




  get f() { return this.signinForm.controls; }

}

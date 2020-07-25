import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from "@angular/router";
import { LoginService } from "./../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit {

  listProducts:any;
  constructor(private loginService: LoginService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  ngOnInit(): void {

    this.listProducts = this.loginService.getProduct();
   
  }
  selectBoiler(){
    this.router.navigateByUrl('/list-controls')
  }
  back(){
    history.back()
  }

}

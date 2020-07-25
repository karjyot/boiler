import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-ads',
  templateUrl: './admin-ads.component.html',
  styleUrls: ['./admin-ads.component.css']
})
export class AdminAdsComponent implements OnInit {
  listUsers:any;
  perPage = 10;
  totalEntries = "";
  currentUser :any;
  modalRefDel: BsModalRef | null;
  modalRefAdd: BsModalRef | null;
  modalRefUpdate: BsModalRef | null;
  public files: any[];
profileImg :any;
categories:any;
userId:'';
id:'';
searchText:'';
p = 1;
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router) { }

  ngOnInit() {
    this.ngxService.start()
    this.adminService.getAdminAds().subscribe(
      res => {
        this.listUsers = res['message'];
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
  viewUserInfo(recd){
    this.router.navigateByUrl("search-details/"+recd.id+"/"+recd.user_id)

  }
  deleteUser(template:any,id){
    this.id = id
    this.modalRefDel = this.modalService.show(template)
  }

  confirmDelete(){
    this.ngxService.start();
    this.adminService.deleteAds(this.id).subscribe(
      res => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/ads"]));
        this.modalRefDel.hide();
        this.ngxService.stop();
      },
      err => { 
        this.ngxService.stop();
        
      }
    )
  }
  reports(id){
    this.router.navigateByUrl('admin/reports/'+id)
  }

}

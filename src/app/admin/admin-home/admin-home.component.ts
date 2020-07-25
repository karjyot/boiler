import { Component, OnInit } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../../services/login.service";
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private loginService: LoginService,private adminService: AdminService, private ngxService: NgxUiLoaderService) { }
  listCounts:any;
  selectedPage = "dashboard";
  listUsers:any;
  listPosts:any;
  records : any
  ngOnInit() {
  
   // this.ngxService.start();
    this.adminService.getCount().subscribe(
      res => {
        this.listCounts = res;
   //     this.ngxService.stop()
       
      },
      err => { 
       
        
      }
    )

    this.ngxService.start()
    this.adminService.bookingsForAdmin().subscribe(
      res => {
        this.listUsers = res['success'];
        this.listUsers.sort((val1, val2)=> {return <any> new Date(val2.order_date) - <any> new 
          Date(val1.order_date)})
   
        this.ngxService.stop();
      },
      err => { 
       
        
      }
    )
   
  }

}

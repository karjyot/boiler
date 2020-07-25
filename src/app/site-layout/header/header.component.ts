import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  phone:any
  constructor(private loginService: LoginService, private ngxService: NgxUiLoaderService,private router : Router) { }

  ngOnInit(): void {
    this.loginService.getHomeContent().subscribe(
      res => {
        this.phone = res['success'][0].phone;
   //     this.ngxService.stop()
       
      },
      err => { 
       
        
      })
    
  }
  homePage(){
    this.router.navigateByUrl('admin/login', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/"]));
  }

}

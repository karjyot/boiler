import { Component, OnInit,ViewChild  } from '@angular/core';
import { CalendarOptions,Calendar } from '@fullcalendar/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
declare var $:any;
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  finalObj:any;
  ctrlObj:any;
  orderNo:any;
  breakDowns:any;
  selectedBoiler:any;
  finalPrice:any;
  controlObj:any;
  finalObjset:any;
  address:any
  productInfo:any
  constructor(private toastr: ToastrService,private ngxService: NgxUiLoaderService,private loginService: LoginService,private router : Router) {}

  ngOnInit(): void {
    
    this.finalObj = this.loginService.getFinalObj();
    this.ctrlObj = this.loginService.getControlObj();
    this.orderNo =  this.loginService.getBookingID().bookingID;
    this.selectedBoiler = this.loginService.getProduct()
    this.finalPrice = this.loginService.getProduct().price;
    this.controlObj = this.loginService.getControlObj();
     this.finalObjset = this.loginService.getfinalObj().address;
     this.productInfo = this.loginService.getfinalObj().productInformation;
    if(!this.finalObjset.address){
      this.finalObjset.address = ""
    }else{
      this.finalObjset.address = this.finalObjset.address + ','
    }
    if(!this.finalObjset.address2){
      this.finalObjset.address2 = ""
    }else{
      this.finalObjset.address2 = this.finalObjset.address2 + ','
    }
    if(!this.finalObjset.address3){
      this.finalObjset.address3 = ""
    }else{
      this.finalObjset.address3 = this.finalObjset.address3 + ','
    }
    if(!this.finalObjset.city){
      this.finalObjset.city = ""
    }else{
      this.finalObjset.city = this.finalObjset.city + ','
    }
    if(!this.finalObjset.country){
      this.finalObjset.country = ""
    }else{
      this.finalObjset.country = this.finalObjset.country + ','
    }
    if(!this.finalObjset.postalCode){
      this.finalObjset.postalCode = ""
    }else{
      this.finalObjset.postalCode = this.finalObjset.postalCode + ','
    }
    if(!this.finalObjset.postalCode1){
      this.finalObjset.s = ""
    }
     this.address =  this.finalObjset.address +this.finalObjset.address2 +this.finalObjset.address3 +this.finalObjset.city +this.finalObjset.country +this.finalObjset.postalCode+this.finalObjset.postalCode1
    this.getBreakDowns();
 

  }
  getBreakDowns(){
    this.loginService.getBreakDowns().subscribe(
      res => {
        this.breakDowns = res['success'];
      },
      err => { 
       
        
      }) 
  }

}

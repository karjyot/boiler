import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from "@angular/router";
import { LoginService } from "./../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
listProducts:any;
  constructor(private loginService: LoginService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }

  ngOnInit(): void {
    let FilterArr = [];
    let total = 0;
    let filter = "lpg"
    let filterRecords = this.loginService.getFilterRecords();

    for(var i=0; i<filterRecords.length; i++){
      if(filterRecords[i].category.toLowerCase() == 'gas'){
        filter = 'gas';
      }
      if((filterRecords[i].category.toLowerCase() == 'back boiler')){
        FilterArr.push(filterRecords[i].category)
      }
      if((filterRecords[i].category.toLowerCase() == 'yes')){
        FilterArr.push(filterRecords[i].category)
      }
      total = Number(total) + parseFloat(filterRecords[i].price);
    }
    if(FilterArr.length == 2){
      total = total - 300
    }
    this.ngxService.start();
    this.loginService.searchProducts({type:filter}).subscribe((result) => {
     
     this.listProducts = result["success"];
     for(var j=0; j<this.listProducts.length; j++){
      this.listProducts[j].price = parseFloat(this.listProducts[j].boiler_price) + Number(total)
     }

     
      this.loginService.bookingsBoiler({postalCode:this.loginService.getPostalCode().postalCode.toUpperCase()}).subscribe((result) => {
        let postalCodePrice = result['availableLimits'].price;
        for(var jk=0; jk<this.listProducts.length; jk++){
console.log(postalCodePrice)
        //  for(var t=0; t<postalCodePrice.length; t++){
          this.listProducts[jk].price = parseInt(this.listProducts[jk].price) + parseInt(postalCodePrice)
        //  }
         }

        this.ngxService.stop();   
       }, (err) => {

       }); 
 


       this.ngxService.stop();

      }, (err) => {
       
      }); 

  }
  payment(boiler){

    this.loginService.setProduct(boiler)
    this.router.navigateByUrl('/list-controls')
  }
  moreDetails(boiler){
    console.log(boiler)
    this.loginService.setProduct(boiler)
    this.router.navigateByUrl('/more-details')
  }
}

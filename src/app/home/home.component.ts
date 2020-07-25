import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from "@angular/router";
import { LoginService } from "./../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $ :any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  isBackBoiler = false
  isSamePlace = false
  postalCode : any;
  index:any;
  questions:any;
  selectedOptions = [];
  ngOnInit(): void {
    this.getQuestions();
  }
  

  getQuestions(){
    this.ngxService.start();
    let finalArr = [];
    this.loginService.getQuestions().subscribe((result) => {
     
     let questions = result["success"]
     
     this.loginService.getCategories().subscribe((result) => {
     
      let categories = result["success"];


      for(var i=0; i<questions.length; i++){
        questions[i]["categories"] = [];
        for(var j=0; j<categories.length; j++){
          if(categories[j].question_id == questions[i].id)
          {
            questions[i]["categories"].push(categories[j])
          }
        }
        

      }
      this.questions = questions
      console.log(this.questions)
      this.questions.sort((val1, val2)=> {return <any> val1.order_question - <any>val2.order_question})
       this.ngxService.stop();
  
         
      }, (err) => {
       
      }); 
        
     }, (err) => {
      
     });

  }

  orderDetails(event,type,category,index){
this.index = index
    let bedroom =  this.contains(category.name,'bedrooms');
    let baths =  this.contains(category.name,'baths');
    let showers =  this.contains(category.name,'showers');
    type = type.toLowerCase();
    if(type == 'lpg' || type == 'gas'){
      this.loginService.setDiv({count:1})
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-2').addClass('active-section');
    }
    if(type == 'oil' || type == 'electricity'){
      
      this.router.navigateByUrl('/not-found')
      // $(event.target).closest('.order-section').removeClass('active-section');
      // $('.order-step-11').addClass('active-section');
    }
    if(type == 'combi'){
      this.loginService.setDiv({count:2})
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-4').addClass('active-section');
    }
    if(type == 'back boiler'){
      this.loginService.setDiv({count:2})
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-3').addClass('active-section');
      this.isBackBoiler = true
    }
    if(type == 'regular' || type == 'system'){
      this.loginService.setDiv({count:2})
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-3').addClass('active-section');
    }

    if(type == 'yes' || type == 'no'){
      if(this.isBackBoiler){
        $(event.target).closest('.order-section').removeClass('active-section');
        $('.order-step-6').addClass('active-section');
      }else{
        $(event.target).closest('.order-section').removeClass('active-section');
        $('.order-step-4').addClass('active-section');
      }
     
    }
    if(type == 'in the same place'){
      this.isSamePlace = true;
    }
    if(type == 'in the same place' || type == 'up to 2 meters away' || type == 'somewhere else'){
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-5').addClass('active-section');
    }
    if(type == 'semi detached' || type == 'detached' || type == 'terrace' || type == 'flat'){
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-6').addClass('active-section');
    }
    if((type == '1' || type == '2' || type == '3' || type == '4' || type == 5 || type == '6+') && bedroom){
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-7').addClass('active-section');
    }
    if((type == '1' || type == '2' || type == '3+') && baths){
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-8').addClass('active-section');
    }
    if((type == '1' || type == '2' || type == '3+') && showers){
      if(this.isSamePlace){
        $(event.target).closest('.order-section').removeClass('active-section');
        $('.order-step-10').addClass('active-section');
      }else{
        $(event.target).closest('.order-section').removeClass('active-section');
        $('.order-step-9').addClass('active-section');
      }
    
    }
    if(type == 'wall' || type == 'roof'){
      $(event.target).closest('.order-section').removeClass('active-section');
      $('.order-step-10').addClass('active-section');
    }
    if (!this.selectedOptions.some(function(entry) { return entry.question_id === category.question_id;})) {
      this.selectedOptions.push(category);
  }
    // if (!this.selectedOptions.some(function(v){return v.id === -1})) {
    //   this.selectedOptions.push(category);
    // }else{
      
    // }
    // var found = $.inArray(category, this.selectedOptions);
    // console.log(found)
    // if (found == -1) {
    //   this.selectedOptions.push(category);
       
    // } else {
    //   this.selectedOptions.splice(found, 1);
    // }
    console.log(this.selectedOptions)

    
  }
  back(event){
    $(event.target).closest('.order-section').removeClass('active-section');
    let count = this.loginService.getDiv();
    console.log(count)
    if(this.index){
      $('.order-step-'+this.index).addClass('active-section');
      this.index = '';
    }else{
      $(event.target).closest('.order-section').prev('.order-section').addClass('active-section');
    }
   
   // 
  }
  next(){
   
    if(!this.postalCode){
      this.toastr.error('Please enter valid Postcode');
      return;
    }else{
      this.ngxService.start();
      this.loginService.validatePostalCode({postalCode:this.postalCode.substring(0,3)}).subscribe((result) => {
        
      
        this.loginService.filterRecords(this.selectedOptions)
        this.loginService.setPostalCode({postalCode:this.postalCode})
        this.ngxService.stop();
        this.router.navigateByUrl('/search-results')
     
            
         }, (err) => {
          this.ngxService.stop();
          this.toastr.error("Postcode is not valid.")
         }); 
      // this.loginService.getAddress(this.postalCode).subscribe((result) => {
      //   if(result.results && result.results.length > 0){
      //     var address = result.results[0].formatted_address
      //     this.loginService.filterRecords(this.selectedOptions)
      //     this.loginService.setPostalCode({postalCode:this.postalCode,address:address})
      //     this.router.navigateByUrl('/search-results')
      //     this.ngxService.stop();
      //   }else{
      //     this.ngxService.stop();
      //     this.toastr.error("Postal code is not valid.")
      //   }
        
     
            
      //    }, (err) => {
      //     this.ngxService.stop();
      //     this.toastr.error("Internal Server Error.")
      //    }); 
     
    }
  }

  contains(str,text) {
    return str.indexOf(text) >= 0;  
  }
}

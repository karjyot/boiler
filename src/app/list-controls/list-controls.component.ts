import { Component, OnInit,ViewChild,ChangeDetectionStrategy  } from '@angular/core';
import { CalendarOptions,Calendar } from '@fullcalendar/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
declare var $:any;
import { Router,ActivatedRoute } from "@angular/router";
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
//import dayGridPlugin from '@fullcalendar/daygrid';
//import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EventInput } from "@fullcalendar/core";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-list-controls',
  templateUrl: './list-controls.component.html',
  styleUrls: ['./list-controls.component.css']
})
export class ListControlsComponent implements OnInit {
  showMyContainer = {}
  listProducts:any
  constructor(

    private formBuilder: FormBuilder,
    private stripeService: StripeService,private toastr: ToastrService,private ngxService: NgxUiLoaderService,private loginService: LoginService,private router : Router) {
    
    }
    controls:any
    controlObj:any

  ngOnInit(): void {
    this.listProducts = this.loginService.getProduct();
    this.getControls();
  }

  getControls(){
this.ngxService.start()
    this.loginService.getControls().subscribe((result) => {

     var controls = result["success"];
    
    for(var i=0; i<controls.length; i++){
      if(controls[i].price == 0 || controls[i].price == '0' ){
        this.loginService.setControlObj(controls[i])
        controls[i].isChecked = true;

      }else{
        controls[i].isChecked = false;
      }
    }
    this.controls =  controls
    this.ngxService.stop()
    this.controls.sort((val1, val2)=> {return <any> (val1.price) - <any>  
      (val2.price)})
      this.ngxService.stop();   
     }, (err) => {
       this.toastr.error(err.error.message)
      
     }); 
     

  }
  showReadMore(id){
    this.showMyContainer[id] =! this.showMyContainer[id]
  }
  selectOnlyThis(id) {

   let arr = [];
    var myCheckbox = document.getElementsByName("myCheckbox");
    Array.prototype.forEach.call(myCheckbox,function(el){
      el.checked = false;
    });
    id.srcElement.checked = true;
    var target = id.target || id.srcElement || id.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;


    let control = this.filterControls(value);
    this.loginService.setControlObj(control)
    
}

selectControl(value){
  
 
  var myCheckbox = document.getElementsByName("myCheckbox");
  Array.prototype.forEach.call(myCheckbox,function(el){
    el.checked = false;
  });
  $('#'+value).prop('checked', true);
  let control = this.filterControls(value);
  this.loginService.setControlObj(control)
}

filterControls(id){
  
for(var i=0; i<this.controls.length; i++){
  
  if(this.controls[i].id == id){
    this.controls[i].isChecked  = true
    var controlVAlue = this.controls[i];
 
  }else{
    this.controls[i].isChecked  = false
  }
  
}
return controlVAlue;
}
installDate(){
  this.router.navigateByUrl('/order')
}
back(){
  history.back();
}

}

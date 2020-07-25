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
  constructor(private toastr: ToastrService,private ngxService: NgxUiLoaderService,private loginService: LoginService,private router : Router) {}

  ngOnInit(): void {
    
    this.finalObj = this.loginService.getFinalObj();
    this.ctrlObj = this.loginService.getControlObj()
    console.log(this.ctrlObj)

  }

}

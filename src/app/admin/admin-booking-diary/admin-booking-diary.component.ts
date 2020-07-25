import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from 'date-fns';
declare var $:any;
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarDateFormatter
} from 'angular-calendar';
type CalendarPeriod = 'day' | 'week' | 'month';
import { Subject } from 'rxjs';
function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}

@Component({
  selector: 'app-admin-booking-diary',
  templateUrl: './admin-booking-diary.component.html',
  styleUrls: ['./admin-booking-diary.component.css']
})
export class AdminBookingDiaryComponent implements OnInit {
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  records:any;
  signupForm: FormGroup;
  updateInfo: FormGroup;
  fullDetails:any;
  perPage = 10;
  category = ''
  totalEntries = "";
  activeDayIsOpen: boolean = true;
  currentUser :any;
  modalRef: BsModalRef | null;
  modalRefAdd: BsModalRef | null;
  modalRefUpdate: BsModalRef | null;
  public files: any[];
  profileImg :any;
  categoryUpdate:any
  categories:any;
  userId:'';
  id:any;
  searchText:'';
  p = 1;
  modalRefDel:BsModalRef | null;
  modalRefStatus:BsModalRef | null;
  modalRefLimit:BsModalRef | null;
  postStatus = "";
  status= "";
  modalRefBooking: BsModalRef | null;
  submitted = false;
  eventsData: CalendarEvent[] = [];
  viewDate: Date = new Date();
  viewDate1: Date = new Date();
  view1: CalendarView = CalendarView.Month;
  view: CalendarView = CalendarView.Month;
  refresh: Subject<any> = new Subject();
  installationDate:any;
  minDate: Date =new Date();
  events: CalendarEvent[] = [];
  dayNumer:any;
  videDate:any
  controls:any;
  selectedRow:any
  restrict:any
  limitBooking:any
  groups:any;
  maxDate: Date = addMonths(new Date(), 4);
  ngOnInit() {
    const date = moment(); // Thursday Feb 2015
    const dow = date.day();
    this.dayNumer = dow

    
    this.getCustomLimits();
    this.getGroupCat();
  
  }
  hoursClick(event) {
    console.log(event)
    let date = this.isDateBeforeToday(event);

    if(new Date(event).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)){
      this.toastr.error("Date should be greater than today's date.")
      return;
    }
    if(!date){
      this.videDate = event
      this.selectedRow.video_date = moment(this.videDate).format( 'YYYY-MM-DD  HH:mm:ss' )
      $("#videoOne").collapse('hide');
      $("#controlData").addClass('show');
      
      this.toastr.success("Your selected date is "+ moment(this.videDate).format( 'YYYY-MM-DD  HH:mm:ss' ))
      // $("#videoOne").collapse('hide');
      // $("#collapseTwo").addClass('show');
    }else{
      this.toastr.error("Date should be greater than today's date.")
     
    }
   
    
  }
  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }
      deleteUser(template:any,id){
        this.id = id
        this.modalRefDel = this.modalService.show(template)
      }
      confirmDelete(){
        this.ngxService.start();
        this.loginService.deleteLimit(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/booking-diary"]));
            this.modalRefDel.hide();
            this.ngxService.stop();
          },
          err => { 
            this.ngxService.stop();
            
          }
        )
      }

      viewUserInfo(template: any,users){
        this.fullDetails = users;
        this.ngxService.start();
        this.loginService.bookingDetails(users.id).subscribe(
          res => {
            this.currentUser = res['success']
         
            this.ngxService.stop();
          },
          err => { 
            this.ngxService.stop();
            
          }
        )
        this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
        );
     
      }
     
      changePostStatus(template:any,user){
        this.id = user
       
        this.modalRefStatus = this.modalService.show(template)
      }
    
      confirmChangeStatus(){
        this.ngxService.start();
        let data= {
          card_id:this.id.card_id,
          booking_id:this.id.id,
          price:this.id.price,
        }
        this.adminService.changePostStatus(data).subscribe(
          res => {
            this.ngxService.stop()
            this.modalRefStatus.hide();
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/bookings"]));
          },
          err => { 
            this.ngxService.stop()
            try{
              let errMessage = err["error"]["message"];
              this.toastr.error(errMessage);
             }catch(e){
              this.toastr.error('Your card having some problems.');
             }
            
          }
        )
      }
      
  isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}
      handleDateClick(arg) {
        console.log(arg)
     
        let date = this.isDateBeforeToday(arg.day.date);
        if(new Date(arg.day.date).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)){
        return
        }
        if(!date){
    
          this.installationDate = moment(arg.day.date).format( 'YYYY-MM-DD  HH:mm:ss' )
          this.selectedRow.booking_date = this.installationDate
          this.toastr.success("Your selected date is "+ moment(this.installationDate).format( 'YYYY-MM-DD  HH:mm:ss' ))
          $("#collapseOne").collapse('hide');
          $("#videoOne").addClass('show');
        }
      }

  

    
    

      openEditBooking(template:any ,item){
        

        this.modalRefBooking = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
        );
     
        }

        openEditLimit(template:any ,item){
          this.eventsData = [];
          this.selectedRow = item
          this.categoryUpdate = item.category
          this.limitBooking = item.limit_booking
          this.installationDate = item.date
          this.setLimitUpdate()
          this.eventsData.push({
            title:item.limit_booking,
            start:new Date(item.date),
          })  
          this.refresh.next();
          this.modalRefLimit = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
       
        }
        updateBooking(){
          console.log(this.limitBooking)
          console.log(this.restrict)
          if(this.limitBooking > this.restrict){
            this.toastr.error("Your max limit set is " + this.restrict)
            return
          }
          if((!this.limitBooking) || (!this.installationDate) || (!this.category)){
            this.toastr.error("Please enter requierd fields.")
            return
          }

          this.ngxService.start();  
          let data = {
            limit_booking:this.limitBooking,
            date:this.installationDate,
            category:this.category
          } 
          this.loginService.setLimitData(data).subscribe((result) => {
              
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/booking-diary"]));
            this.modalRefBooking.hide()
            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
          console.log( this.selectedRow)
        }


        getCustomLimits(){
          this.ngxService.start();   
          this.loginService.customLimitsAdmin().subscribe((result) => {
              
            this.records = result["success"]
            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
        }


        updateLimit(){
          console.log(this.limitBooking)
          console.log(this.restrict)
          if(this.limitBooking > this.restrict){
            this.toastr.error("Your max limit set is " + this.restrict)
            return
          }
          this.ngxService.start();  
          let data = {
            limit_booking:this.limitBooking,
            date:this.installationDate,
            category:this.categoryUpdate
          } 
          this.loginService.updateLimit(data,this.selectedRow.id).subscribe((result) => {
              
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/booking-diary"]));
            this.modalRefLimit.hide()
            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
          console.log( this.selectedRow)
      
        }

        getGroupCat(){
          this.ngxService.start();   
          this.loginService.getGroupCategories().subscribe((result) => {
          this.groups = result["success"];

            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
        }

        setLimit(){
          for(var i=0; i<this.groups.length; i++){
            if(this.groups[i].postal_category == this.category){
              this.restrict = this.groups[i].limit_bookings
              break
            }
          }
        }

        setLimitUpdate(){
          for(var i=0; i<this.groups.length; i++){
            if(this.groups[i].postal_category == this.categoryUpdate){
              this.restrict = this.groups[i].limit_bookings
              break
            }
          }
        }
        closeOpenMonthViewDay() {
          this.activeDayIsOpen = false;
        }    
      
}

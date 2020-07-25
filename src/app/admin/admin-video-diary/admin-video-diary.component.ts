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
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarWeekViewBeforeRenderEvent,
  CalendarView,
  CalendarDateFormatter,
  
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
  selector: 'app-admin-video-diary',
  templateUrl: './admin-video-diary.component.html',
  styleUrls: ['./admin-video-diary.component.css']
})
export class AdminVideoDiaryComponent implements OnInit {
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  records:any;
  signupForm: FormGroup;
  updateInfo: FormGroup;
  fullDetails:any;
  modalRefDefault:any;
  defaultLimitData:any
  perPage = 10;
  tottalLimit:any;
  hourColumns: WeekViewHourColumn[];
  activeDayIsOpen: boolean = true;
  category = ''
  totalEntries = "";
  currentUser :any;
  modalRef: BsModalRef | null;
  modalRefAdd: BsModalRef | null;
  modalRefUpdate: BsModalRef | null;
  modalRefAll:BsModalRef | null;
  public files: any[];
  profileImg :any;
  categoryUpdate:any
  categories:any;
  userId:'';
  id:any;
  searchText:'';
  viewDate1: Date = new Date();
  view1: CalendarView = CalendarView.Day;
  viewDate2: Date = new Date();
  view2: CalendarView = CalendarView.Week;
  view: CalendarView = CalendarView.Day;
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

    this.getVideoLimits()
          
    this.getCustomLimits();
    this.getGroupCat();
  
  }
  hoursClick(event,) {
    this.videDate = event
    this.addSelectedDayViewClass();

   
    
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
        this.loginService.deleteLimitVideo(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/video-diary"]));
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
        this.events = [];

        this.modalRefBooking = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
        );
     
        }

        openEditLimit(template:any ,item){
          this.events = [];
          this.selectedRow = item
        
          this.limitBooking = item.booking_limit
          this.installationDate = item.date
          this.viewDate =  new Date(this.installationDate)
         
          let obj =  {
            start:new Date(this.installationDate),
            //end:endOfDay(new Date(bookings[i].video_date)),
            title:this.limitBooking
          }
          this.events.push(obj)
          this.refresh.next();
          this.modalRefLimit = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
       
        }
        updateBooking(){
         
          if(this.limitBooking > this.tottalLimit){
            this.toastr.error("Your max limit set is " + this.tottalLimit)
            return
          }
          // if((!this.limitBooking) || (!this.installationDate) || (!this.category)){
          //   this.toastr.error("Please enter requierd fields.")
          //   return
          // }

          this.ngxService.start();  
          let data = {
            limit_booking:this.limitBooking,
            date: moment(this.videDate).format( 'YYYY-MM-DD  HH:mm:ss' ),
          //  category:this.category
          } 
          this.loginService.setLimitDataVideo(data).subscribe((result) => {
              
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/video-diary"]));
            this.modalRefBooking.hide()
            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
          console.log( this.selectedRow)
        }


        getCustomLimits(){
          this.ngxService.start();   
          this.loginService.customLimitsVideoAdmin().subscribe((result) => {
              
            this.records = result["success"]
            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
        }


        updateLimit(){
          console.log(this.limitBooking)
          console.log(this.restrict)
          if(this.limitBooking > this.tottalLimit){
            this.toastr.error("Your max limit set is " + this.tottalLimit)
            return
          }
          this.ngxService.start();  
          let data = {
            limit_booking:this.limitBooking,
            date:this.installationDate,
          } 
          this.loginService.updateLimitVideo(data,this.selectedRow.id).subscribe((result) => {
              
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/video-diary"]));
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

        beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
          this.hourColumns = event.hourColumns;
          this.addSelectedDayViewClass();
        }
      
        private addSelectedDayViewClass() {
          this.hourColumns.forEach((column) => {
            column.hours.forEach((hourSegment) => {
              hourSegment.segments.forEach((segment) => {
                delete segment.cssClass;
                if (
                  this.videDate &&
                  segment.date.getTime() === this.videDate.getTime()
                ) {
                  segment.cssClass = 'cal-day-selected';
                }
              });
            });
          });
        }


        viewCalendar(template){
          this.modalRefAll = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
          this.events = [];
        
         for(var i=0; i<this.records.length; i++){
          let obj =  {
            start:new Date(this.records[i].date),
            //end:endOfDay(new Date(bookings[i].video_date)),
            title:this.records[i].booking_limit
          }
          this.events.push(obj)
         }
         
          
          this.refresh.next();
        }
        closeOpenMonthViewDay() {
          this.activeDayIsOpen = false;
        } 

        defaultLimit(template){
         
          this.modalRefDefault = this.modalService.show(
            template,
            Object.assign({})
          );

        }
        updateDefaultLimit(){

          this.ngxService.start();   
          this.loginService.videoLimitData({limit:this.defaultLimitData}).subscribe((result) => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/video-diary"]));
            this.modalRefDefault.hide()
            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
        }

        getVideoLimits(){
          this.loginService.video_limits().subscribe((result) => {
            this.defaultLimitData = result['success'][0]['video_limit'];
            this.tottalLimit =  result['success'][0]['video_limit']
            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
        }
      
}

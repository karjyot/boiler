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
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  records:any;
  signupForm: FormGroup;
  updateInfo: FormGroup;
  fullDetails:any;
  perPage = 10;
  totalEntries = "";
  currentUser :any;
  modalRef: BsModalRef | null;
  modalRefAdd: BsModalRef | null;
  modalRefUpdate: BsModalRef | null;
  public files: any[];
  profileImg :any;
  categories:any;
  view: CalendarView = CalendarView.Month;
  view1: CalendarView = CalendarView.Day;
  userId:'';
  activeDayIsOpen: boolean = true;
  id:any;
  searchText:'';
  p = 1;
  modalRefDel:BsModalRef | null;
  modalRefStatus:BsModalRef | null;
  postStatus = "";
  status= "";
  modalRefBooking: BsModalRef | null;
  submitted = false;
  eventsData: CalendarEvent[] = [];
  viewDate: Date = new Date();
  viewDate1: Date = new Date();
  refresh: Subject<any> = new Subject();
  installationDate:any;
  minDate: Date =new Date();
  events: CalendarEvent[] = [];
  dayNumer:any;
  videDate:any
  controls:any;
  selectedRow:any
  maxDate: Date = addMonths(new Date(), 1);
  ngOnInit() {
    const date = moment(); // Thursday Feb 2015
    const dow = date.day();
    this.dayNumer = dow
    this.getBookings();
    this.ngxService.start()
    this.adminService.bookingsForAdmin().subscribe(
      res => {
        this.records = res['success'];
        for(var i=0; i<this.records.length; i++){
          this.records[i].controls = (JSON.parse(this.records[i].controls));
        }
       
        this.totalEntries = this.records.length;
        this.records.sort((val1, val2)=> {return <any> new Date(val2.order_date) - <any> new 
          Date(val1.order_date)})
        this.ngxService.stop();
      },
      err => { 
        this.ngxService.stop();
        
      }
    )
  
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
        this.loginService.deleteBooking(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/bookings"]));
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
        this.fullDetails.questions_group = JSON.parse(users.questions_group);
        console.log(this.fullDetails)
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

      getBoilerBookings(){
        this.ngxService.start();
        this.loginService.bookingsBoiler({postalCode:this.loginService.getPostalCode().postalCode.toUpperCase()}).subscribe((result) => {
          let bookings =  result["success"];
          let limit = result['availableLimits']['limit_bookings'];
          let category =  result['availableLimits']['category']
          this.loginService.customLimits(category).subscribe((result) => {
            let customLimits = result['success'];
            for(var i=0; i<customLimits.length; i++){
              if(customLimits[i].limit_booking == 0  || customLimits[i].limit_booking == "0"){
                console.log(customLimits[i].date)
                  this.eventsData.push({
                    title:'full',
                    start:new Date(customLimits[i].date),
                  })  
              }
    
            }
            for(var ij=0; ij<bookings.length; ij++){
    
              for(var k=0; k<customLimits.length; k++){
                if(customLimits[k].date == bookings[ij].booking_date){
                  if(customLimits[k].limit_booking ==  bookings[ij].totalBookings){
                    this.eventsData.push({
                      title:'full',
                      start:new Date(bookings[ij].booking_date),
                    })  
                  }
                }
                else if(bookings[ij]['totalBookings'] == limit){
                  this.eventsData.push({
                    title:'full',
                    start:new Date(bookings[ij].booking_date),
                  })  
               }
    
              }
                
        }
    
            
            this.refresh.next();
    
          })
    
        // let bookings =  result["success"];
        // let limit = result['availableLimits']['limit_bookings'] 
        // for(var i=0; i<bookings.length; i++){
        //  if(bookings[i]['totalBookings'] == limit){
        //   this.eventsData.push({
        //     title:'Full',
        //     start:new Date(bookings[i].booking_date),
        //   })  
        //  }
          
        // }
     
          this.ngxService.stop();   
         }, (err) => {
           this.toastr.error(err.error.message)
          
         }); 
    
      }

      getBookings(){
        this.ngxService.start()
    
        this.loginService.bookings(null).subscribe((result) => {
        let bookings =  result["success"];
        let limit = result['availableLimits'];
        this.loginService.customLimitsVideo().subscribe((result) => {
          let customLimits = result['success'];
          for(var i=0; i<customLimits.length; i++){
            if(customLimits[i].booking_limit == 0  || customLimits[i].booking_limit == "0"){
              console.log(customLimits[i].date)
                this.events.push({
                  title:'full',
                  start:new Date(customLimits[i].date),
                })  
            }
    
          }
          for(var ij=0; ij<bookings.length; ij++){
    
            for(var k=0; k<customLimits.length; k++){
              if(customLimits[k].date == bookings[ij].booking_date){
                if(customLimits[k].booking_limit ==  bookings[ij].totalBookings){
                  this.events.push({
                    title:'full',
                    start:new Date(bookings[ij].booking_date),
                  })  
                }
              }
              else if(bookings[ij]['totalBookings'] == limit){
                this.events.push({
                  title:'full',
                  start:new Date(bookings[ij].booking_date),
                })  
             }
    
            }
              
      }
    
          
          this.refresh.next();
    
        })
        // for(var i=0; i<bookings.length; i++){
        //   // this.eventsData.push({
        //   //   title:'Booked',
        //   //   date:moment(bookings[i].booking_date).format('YYYY-MM-DD'),
        //   //   disableResizing: true,
        //   // })
        //   let obj =  {
        //     start:new Date(bookings[i].video_date),
        //     //end:endOfDay(new Date(bookings[i].video_date)),
        //     title:'Full'
        //   }
        //   // this.events =  [ {
        //   //   start:new Date(bookings[i].video_date),
        //   //   //end:endOfDay(new Date(bookings[i].video_date)),
        //   //   title:'Booked'
        //   // }]
        //   this.events.push(obj)
         
          
        // }
        // console.log(this.events)
        //   this.refresh.next();
          this.ngxService.stop();   
         }, (err) => {
           this.toastr.error(err.error.message)
          
         }); 
    
      }
    

      openEditBooking(template:any ,item){
        this.selectedRow = item

        this.modalRefBooking = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
        );
     
        }
        updateBooking(){
          this.ngxService.start();   
          this.loginService.updateBooking(this.selectedRow).subscribe((result) => {
              
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/bookings"]));
            this.modalRefBooking.hide()
            this.ngxService.stop();   
             }, (err) => {
               this.toastr.error(err.error.message)
              
             }); 
          console.log( this.selectedRow)
        }
        closeOpenMonthViewDay() {
          this.activeDayIsOpen = false;
        }
      
}

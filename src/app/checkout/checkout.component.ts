import { Component, OnInit,ViewChild,ChangeDetectionStrategy,ChangeDetectorRef  } from '@angular/core';
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
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarDateFormatter,
  CalendarWeekViewBeforeRenderEvent
} from 'angular-calendar';
type CalendarPeriod = 'day' | 'week' | 'month';

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
  selector: 'app-checkout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.component.html',
  // providers: [
  //   {
  //     provide: CalendarDateFormatter,
  //     useClass: CustomDateFormatter,
  //   },
  // ],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  minDate: Date =new Date();
  
  controls:any;
  maxDate: Date = addMonths(new Date(), 4);
  calendarOptions: CalendarOptions;
 // calendarComponent: FullCalendarComponent;
  eventsModel: any;
  showAddress = false;
  postalCode:any;
  installationDate:any;
  viewDate2:any;
  videDate:any;
  showAddressInstall = false

  searchCode = false
  showAddressPostalCode =false
  addressForm:FormGroup;
  installationForm:FormGroup;
  submitted = false;
  excludeDays: number[] = [0, 6];
  controlPrice:any;
  totalAddress = [];
  stripeTest: FormGroup;
  controlObj :any;
  @ViewChild("calendar", { static: false }) calendarComponent: FullCalendarComponent;
 // @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
 @ViewChild(StripeCardComponent) card: StripeCardComponent;
 refresh: Subject<any> = new Subject();
 cardOptions: ElementOptions = {
  hidePostalCode: true,
   style: {
     base: {
       iconColor: '#666EE8',
       
       color: '#495057',
       lineHeight: '40px',
       fontWeight: 300,
       fontFamily: 'Poppins, sans-serif',
       fontSize: '16px',
       '::placeholder': {
         color: '#6c757d'
       }
     }
   }
 };

 elementsOptions: ElementsOptions = {
   locale: 'en'
 };
 events: CalendarEvent[] = [];
 eventsData: CalendarEvent[] = [];
 constructor(

  private formBuilder: FormBuilder,
  private stripeService: StripeService,private toastr: ToastrService,private ngxService: NgxUiLoaderService,private loginService: LoginService,private router : Router,private ref: ChangeDetectorRef,private modalService: BsModalService ) {
    this.dateOrViewChanged();
  }
  calendarApi: Calendar;
  calendarEvents: EventInput[] = [];
  view: CalendarView = CalendarView.Month;
  view1: CalendarView = CalendarView.Day;
  finalPriceCpy:any;
  viewDate: Date = new Date();
  viewDate1:any
  finalPrice:any
  activeDayIsOpen: boolean = true;
  dayNumer:any;
  googleAddress:any;
  prevBtnDisabled: boolean = false;
  cmsData:any
  selectedBoiler:any
  breakDowns:any;
  modalRef: BsModalRef | null;
  nextBtnDisabled: boolean = false;
  showPrice =false;
  ngOnInit() {
    this.getHomeContent()
    this.getBreakDowns()
    this.getBoilerBookings();
    this.getBookings();
   this.controlObj = this.loginService.getControlObj();
   this.selectedBoiler = this.loginService.getProduct()
    const date = moment(); // Thursday Feb 2015
    const dow = date.day();
    this.dayNumer = dow
    this.googleAddress = this.loginService.getPostalCode().address
    this.finalPrice = this.loginService.getProduct().price
    this.finalPrice = parseFloat(this.controlObj.price) + parseFloat(this.finalPrice)
    var todayDate = new Date();

    todayDate .setDate(todayDate .getDate() + 1);
    this.viewDate1 = todayDate
        this.viewDate = todayDate

        this.installationForm = this.formBuilder.group({
          postalCode: [''], 
          address: [''], 
          postalCode1:[''],
          address3:[''],
          country:[''],
          city:[''],
          
        })

    this.addressForm = this.formBuilder.group({
      title: ['',[Validators.required]], 
      fname: ['',[Validators.required]], 
      lname: ['',[Validators.required]], 
      email: ['',[Validators.required,Validators.email]], 
      contact: ['',[Validators.required]], 
      postalCode:[],
      address:[''],
      notes: [''], 
      postalCode1:[''],
      address1:[''],
      address2:[''],
      address3:[''],
      country:[''],
      city:[''],
      address3Install:[''],
      countryInstall:[''],
      cityInstall:[''],
      addressSelection:['',[Validators.required]],
      address1Install:[''],
      address2Install:[''],
      postalCode2Install:[''],
      addressInstall:[''],
      postalCodeInstall:['']

     // namepros: [''], 
      //ns: ['',[Validators.required]], 
  })

  //this.postalCode = this.loginService.getPostalCode().postalCode
  this.stripeTest = this.formBuilder.group({
    name: ['',[Validators.required]], 
    checkboxTerms:['',[Validators.required]]
   
})

    

  }
 

  openVideo(){
    
  }
  handleDateClick(arg) {
    console.log(arg)
 
    let date = this.isDateBeforeToday(arg.day.date);
    if(new Date(arg.day.date).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)){
    return
    }
    if(!date){

      this.installationDate = moment(arg.day.date).format( 'YYYY-MM-DD  HH:mm:ss' )
      $("#collapseOne").collapse('dispose');
      $("#videoOne").collapse('show');
      var p = $( "#videoOne" ).first();
      var position = p.position();
      
        $('html, body').animate({
          scrollTop: position.top + 300
      }, 0);
     
     
     
     
     
    }

    
    if( new Date(this.installationDate).getDay() == 0 ){
      let installationDate = new Date(this.installationDate);
      installationDate .setDate(installationDate .getDate() - 2);
      this.viewDate2 = installationDate
    }else{
      let installationDate = new Date(this.installationDate);
    installationDate .setDate(installationDate .getDate() - 1);
    this.viewDate2 = installationDate
    }
    
 

  }


  



  isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

 



  buy() {
    this.addressCheck()
    this.addressForm.value.isDifferentAddress = this.showAddress
    this.installationForm.value.isDifferentAddress = this.showAddressInstall

    
   // this.installationForm.value.isDifferentAddress = this.showAddressInstall

    // if(this.addressForm.value.addressSelection == "same"){
    //   this.installationForm.value.address = this.addressForm.value.address
    //   this.installationForm.value.postalCode = this.addressForm.value.postalCode
      
    // }else{
    //   this.installationForm.value.address = this.addressForm.value.address1
    //   this.installationForm.value.postalCode = this.addressForm.value.postalCode1
    // }

   // this.controlObj = this.filterControls();
    let finalObj = {
      "installationDate":this.installationDate,
      "videoDate": moment(this.videDate).format( 'YYYY-MM-DD  HH:mm:ss' ),
      "personalInformation":this.addressForm.value,
      'productInformation':this.loginService.getFilterRecords(),
      "product":this.loginService.getProduct(),
      "finalPrice":this.finalPrice,
      "postalCode":this.loginService.getPostalCode(),
      "googleAddress":this.googleAddress,
      "address":this.installationForm.value,
      "controls":this.controlObj
    };

   


    if(this.stripeTest.invalid){
      this.toastr.error("Your details are incomplete.")
      return;
    }
    this.ngxService.start();  
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          finalObj["token"] = result.token.id
          finalObj["name"] = name
     this.loginService.confirmOrder(finalObj).subscribe((result) => {
       this.loginService.setFinalObj(finalObj)
      
    this.router.navigateByUrl('/confirmation')
       this.ngxService.stop();   
      }, (err) => {
        this.toastr.error(err.error.message)
       
      }); 


        } else if (result.error) {
          this.toastr.error("Your details are incomplete.")
          this.ngxService.stop();  
        }
      });
  }
  hoursClick(event) {
   
    let installationDate = new Date(this.installationDate);
    if( new Date(event).getTime() > installationDate.getTime()){
      this.toastr.error("Date should be less than from the installation date.")
      return;
    }    

    let date = this.isDateBeforeToday(event);

    if(new Date(event).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)){
      this.toastr.error("Date should be greater than today's date.")
      return;
    }
    if(!date){
      this.videDate = event
      $("#videoOne").collapse('dispose');
      $("#collapseTwo").collapse('show');
      
      var p = $("#collapseTwo" ).first();
      var position = p.position();
      
        $('html, body').animate({
          scrollTop: position.top + 300
      }, 0);
    }else{
      this.toastr.error("Date should be greater than today's date.")
     
    }
   
    
  }
  submitControl(){
     $("#controlData").collapse('dispose');
      $("#collapseTwo").collapse('show');
  }
  onSubmit(){

    this.submitted = true
    if(this.addressForm.invalid){
      const firstElementWithError = document.querySelector('.ng-invalid');

      if (firstElementWithError) {
        firstElementWithError.scrollIntoView({ behavior: 'smooth' });
      }
      return;
      
    }

    if(this.showAddress){
        if(this.addressForm.value.address1 == ""  || this.addressForm.value.postalCode1 == "" ||  this.addressForm.value.city == ""){
        this.toastr.error("Please enter the correct address.")
        return
      }
    }else if(!this.showAddress){
      if(this.addressForm.value.address == "" || this.addressForm.value.postalCode == ""){
            this.toastr.error("Please enter the correct address.")
            return
          }
    }
    // if(this.addressForm.value.addressSelection == "same"){
    //   if(this.addressForm.value.address == "" || this.addressForm.value.postalCode == ""){
    //     this.toastr.error("Please enter the correct address.")
    //     return
    //   }
    // }else if(this.addressForm.value.addressSelection == "different"){
    //   if(this.addressForm.value.address1 == "" || this.addressForm.value.postalCode1 == ""){
    //     this.toastr.error("Please enter the correct address.")
    //     return
    //   }
    // }
    
    $("#collapseTwo").collapse('dispose');
    $("#collapseThree").collapse('show');
    var p = $("#collapseThree" ).first();
    var position = p.position();
    
      $('html, body').animate({
        scrollTop: position.top + 300
    }, 0);
    this.showPrice = true
  }

  onSubmitAddress(){
    this.submitted = true
    if(this.installationForm.invalid){
      return;
    }
    $("#collapseInstall").collapse('hide');
    $("#collapseThree").addClass('show');
  }

  getBookings(){
    this.ngxService.start()

    this.loginService.bookings({postalCode:this.loginService.getPostalCode().postalCode.toUpperCase()}).subscribe((result) => {
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

  getHomeContent(){
    this.loginService.getHomeContent().subscribe(
      res => {
        this.cmsData = res['success'][0];
    
       
      },
      err => { 
       
        
      }) 
  }

  getBreakDowns(){
    this.loginService.getBreakDowns().subscribe(
      res => {
        this.breakDowns = res['success'];
        console.log(this.breakDowns)
       
      },
      err => { 
       
        
      }) 
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

  


  search(){
   
    this.ngxService.start();
    this.totalAddress = []
    this.loginService.getAddress(this.postalCode).subscribe((result) => {
      this.searchCode = true
      
        let address = result['addresses']
        for(var i=0; i<address.length; i++){
          let spliitedResult = address[i].split(',')
          this.totalAddress.push(spliitedResult[0]+','+spliitedResult[5]+','+spliitedResult[6])
        }
        this.ref.detectChanges();
        this.ngxService.stop();
         }, (err) => {
          this.ngxService.stop();
          this.toastr.error("Postcode is invalid.")
         }); 
  }


  increment(): void {
    console.log(this.viewDate1)
    console.log(this.viewDate2)
    if( new Date(this.viewDate1) > new Date(this.viewDate2)){
      this.toastr.info("Date should be less than from the installation date.")
      //return;
    }    

    this.changeDateHour(addPeriod(this.view1, this.viewDate1, 0));
  }

  decrement(): void {
    // if( new Date(this.viewDate1) > new Date(this.viewDate2)){
    //   this.toastr.error("Date should be less than from the installation date.")
    //  // return;
    // }    
    this.changeDateHour(subPeriod(this.view1, this.viewDate1, 0));
  }

  dateIsValidhour(date: Date): boolean {
    return date >= this.minDate && date <= this.viewDate2;
  }
  dateOrViewChangedHour(): void {
    // this.prevBtnDisabled = !this.dateIsValid(
    //   endOfPeriod(this.view, subPeriod(this.view1, this.viewDate1, 1))
    // );
    this.nextBtnDisabled = !this.dateIsValidhour(
      startOfPeriod(this.view, addPeriod(this.view1, this.viewDate1, 1))
    );
    if (this.viewDate1 < this.minDate) {
      this.changeDateHour(this.minDate);
    } else if (this.viewDate1 > this.viewDate2) {
      this.changeDateHour(this.viewDate2);
    }
  }

  changeDateHour(date: Date): void {
    this.viewDate1 = date;
    this.dateOrViewChangedHour();
  }




  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
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

  


filterControls(){
  
for(var i=0; i<this.controls.length; i++){
  if(this.controls[i].isChecked){

    return this.controls[i];
  }
}
}
  get f() { return this.addressForm.controls; }
  get i() { return this.installationForm.controls; }


  addressCheck(){
    if(this.addressForm.value.addressSelection == "same"){
      this.showAddressPostalCode = false
      if(this.showAddress){
        this.installationForm.value.address = this.addressForm.value.address1
        this.installationForm.value.postalCode = this.addressForm.value.postalCode1
        this.installationForm.value.address2 = this.addressForm.value.address2
        this.installationForm.value.address3= this.addressForm.value.address3
        this.installationForm.value.country= this.addressForm.value.country
        this.installationForm.value.city= this.addressForm.value.city
      }else{
        this.installationForm.value.address = this.addressForm.value.address
        this.installationForm.value.postalCode = this.addressForm.value.postalCode
      }
    
    }else{
      this.showAddressPostalCode = true
      if(!this.showAddressInstall){
        this.installationForm.value.address = this.addressForm.value.addressInstall
        this.installationForm.value.postalCode = this.addressForm.value.postalCodeInstall
      }else{
        this.installationForm.value.address = this.addressForm.value.address1Install
        this.installationForm.value.address2 = this.addressForm.value.address2Install
        this.installationForm.value.postalCode = this.addressForm.value.postalCode2Install

        this.installationForm.value.address3= this.addressForm.value.address3Install
        this.installationForm.value.country= this.addressForm.value.countryInstall
        this.installationForm.value.city= this.addressForm.value.cityInstall
      }
    

     
    }
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  segmentIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }
  beforeViewRender(body: CalendarWeekViewBeforeRenderEvent): void { body.hourColumns.forEach( hourCol => { hourCol.hours.forEach( hour => { hour.segments.forEach( segment => { if(!this.segmentIsValid(segment.date)){ segment.cssClass = 'cal-disabled'; } }) }) }); }

  terms(template){
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

}
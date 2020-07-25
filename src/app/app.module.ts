import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HeaderComponent } from './site-layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ResultsComponent } from './results/results.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { NgxStripeModule } from 'ngx-stripe';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component'
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { QuestionsComponent } from './admin/questions/questions.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from './pipes/pipes';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxUiLoaderModule, NgxUiLoaderConfig,NgxUiLoaderService,SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductsComponent } from './admin/products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { CalendarModule, DateAdapter,CalendarDateFormatter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { CmsComponent } from './admin/cms/cms.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { PostalCodesComponent } from './admin/postal-codes/postal-codes.component';
import { ControlsComponent } from './controls/controls.component';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ListControlsComponent } from './list-controls/list-controls.component';
import { FooterComponent } from './footer/footer.component';
import { BreakdownComponent } from './admin/breakdown/breakdown.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ErrorComponent } from './error/error.component';
import { AdminBookingDiaryComponent } from './admin/admin-booking-diary/admin-booking-diary.component';
import { AdminVideoDiaryComponent } from './admin/admin-video-diary/admin-video-diary.component';
import { VideoDiaryComponent } from './admin/video-diary/video-diary.component';
import { TermsComponent } from './terms/terms.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  //resourceTimelinePlugin
]);
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  fgsType: SPINNER.ballSpinClockwise,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
};
@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    HeaderComponent,
    HomeComponent,
    ResultsComponent,
    CheckoutComponent,
    AdminHomeComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminLoginComponent,
    QuestionsComponent,
    FilterPipe,
    CategoriesComponent,
    ProductsComponent,
    NotFoundComponent,
    BookingsComponent,
    CmsComponent,
    ThankYouComponent,
    MoreDetailsComponent,
    PostalCodesComponent,
    ControlsComponent,
    ListControlsComponent,
    FooterComponent,
    BreakdownComponent,
    AdminUsersComponent,
    ErrorComponent,
    AdminBookingDiaryComponent,
    AdminVideoDiaryComponent,
    VideoDiaryComponent,
    TermsComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FullCalendarModule,
    NgxStripeModule.forRoot('pk_test_i2rFMVlrLofRcsWY0mPzbyNd001hlLYk8P'),
    ModalModule.forRoot(),
    ToastrModule.forRoot({progressBar:true,preventDuplicates: true,timeOut:5000}), 
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    }),
    AngularEditorModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

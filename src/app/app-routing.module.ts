import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuardAdmin } from './auth/auth.guard.admin';
import { QuestionsComponent } from './admin/questions/questions.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductsComponent } from './admin/products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { CmsComponent } from './admin/cms/cms.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { PostalCodesComponent } from './admin/postal-codes/postal-codes.component';
import { ControlsComponent } from './controls/controls.component';
import { ListControlsComponent } from './list-controls/list-controls.component';
import { BreakdownComponent } from './admin/breakdown/breakdown.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ErrorComponent } from './error/error.component';
import { AdminBookingDiaryComponent } from './admin/admin-booking-diary/admin-booking-diary.component';
import { AdminVideoDiaryComponent } from './admin/admin-video-diary/admin-video-diary.component';
import { TermsComponent } from './terms/terms.component';
const routes: Routes = [{
  path: '',
  component: SiteLayoutComponent,
  children: [{
      
  path: '',
  component: HomeComponent
},{
      
  path: 'search-results',
  component: ResultsComponent
},{
      
  path: 'confirmation',
  component: ThankYouComponent
},{
      
  path: 'list-controls',
  component: ListControlsComponent
},{
      
  path: 'not-found',
  component: NotFoundComponent
},{
      
  path: 'order',
  component: CheckoutComponent
},{
      
  path: 'terms',
  component: TermsComponent
}, {
      
  path: 'more-details',
  component: MoreDetailsComponent
},]},
{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: 'admin/dashboard',
    component: AdminHomeComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/booking-diary',
    component: AdminBookingDiaryComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/breakdowns',
    component: BreakdownComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/questions',
    component: QuestionsComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/bookings',
    component: BookingsComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/cms',
    component: CmsComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/controls',
    component: ControlsComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/postal-codes',
    component: PostalCodesComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  },
  {
    path: 'admin/video-diary',
    component: AdminVideoDiaryComponent,
    canActivate:[AuthGuardAdmin],
    pathMatch: 'full',
  }
  


]},
  {
    
    path: 'admin/login',
    component: AdminLoginComponent
   }, 
   {
    
    path: '**',
    component: ErrorComponent
   }
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

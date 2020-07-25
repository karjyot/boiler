import { Component, OnInit } from '@angular/core';
import { NavigationEnd,Router } from "@angular/router";
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  selectedPage = "dashboard"
  constructor(private router : Router) { }

  ngOnInit() {
  }
  redirectUrl(type){
    if(type == 'dashboard'){
      this.selectedPage = 'dashboard'
      this.router.navigateByUrl('admin/dashboard');
    }
    if(type == 'users'){
      this.selectedPage = 'users'
      this.router.navigateByUrl('admin/users');
    }
    if(type == 'products'){
      this.selectedPage = 'products'
      this.router.navigateByUrl('admin/products');
    }
    if(type == 'questions'){
      this.selectedPage = 'questions'
      this.router.navigateByUrl('admin/questions');
    } if(type == 'categories'){
      this.selectedPage = 'categories'
      this.router.navigateByUrl('admin/categories');
    } if(type == 'models'){
      this.selectedPage = 'models'
      this.router.navigateByUrl('admin/models');
    } if(type == 'payments'){
      this.selectedPage = 'payments'
      this.router.navigateByUrl('admin/payments');
    } 
    if(type == 'admin-plans'){
      this.selectedPage = 'admin-plans'
      this.router.navigateByUrl('admin/plans');
    } 
    if(type == 'video-diary'){
      this.selectedPage = 'video-diary'
      this.router.navigateByUrl('admin/video-diary');
    } 
    if(type == 'postal-codes'){
      this.selectedPage = 'postal-codes'
      this.router.navigateByUrl('admin/postal-codes');
    } 
    if(type == 'bookings'){
      this.selectedPage = 'bookings'
      this.router.navigateByUrl('admin/bookings');
    } 
    if(type == 'booking-diary'){
      this.selectedPage = 'booking-diary'
      this.router.navigateByUrl('admin/booking-diary');
    } 
    if(type == 'controls'){
      this.selectedPage = 'controls'
      this.router.navigateByUrl('admin/controls');
    } 
    if(type == 'make'){
      this.selectedPage = 'make'
      this.router.navigateByUrl('admin/make');
    } 
    if(type == 'terms'){
      this.selectedPage = 'terms'
      this.router.navigateByUrl('admin/terms');
    } 
    if(type == 'privacy'){
      this.selectedPage = 'privacy'
      this.router.navigateByUrl('admin/privacy');
    } 
    if(type == 'about'){
      this.selectedPage = 'about'
      this.router.navigateByUrl('admin/about-us');
    } 
    if(type == 'admin-percentage'){
      this.selectedPage = 'admin-percentage'
      this.router.navigateByUrl('admin/percentage');
    } 
    if(type == 'cms'){
      this.selectedPage = 'cms'
      this.router.navigateByUrl('admin/cms');
    } 
    if(type == 'breakdowns'){
      this.selectedPage = 'breakdowns'
      this.router.navigateByUrl('admin/breakdowns');
    } 
    
  }
}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import {AppSettings } from './../../constants';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  getListUsers() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/getListUsers');
  }
  getAdminReports(id){
    return this.http.get(AppSettings.API_ENDPOINT  + 'getAdminReports/'+id);
  }
  getPayments() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getPayments');
  }
  getPercentage() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'percentage');
  }
  Updatepercentage(data) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'Updatepercentage',data);
  }
  getPlans() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getPlans');
  }
  addPackage(postData) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'addPackage',postData);
  }
  updatePackage(postData,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'updatePackage/'+id,postData);
  }
  deletePackage(id){
    return this.http.get(AppSettings.API_ENDPOINT  + 'deletePackage/'+id);
  }

  getListPosts() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/getListPosts');
  } 
  getModels() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getModels');
  } 
  getMake() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getMake');
  } 
  registerMake(data){
    return this.http.post(AppSettings.API_ENDPOINT  + 'registerMake', data);
  } 
  registerModel(data){
    return this.http.post(AppSettings.API_ENDPOINT  + 'registerModel', data);
  } 
  deleteMake(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteMake/'+id);
  } 
 

  getAdminAds() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getAdminAds');
  } 
  deleteAds(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteAds/'+id);
  } 
 
  getCount() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/count');
  } 
  
  registerUser(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/register',jsonPayload);
  }
  updateUser(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateUser',jsonPayload);
  }
  updateMake(jsonPayload,id):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'updateMake/'+id,jsonPayload);
  }
  updateModel(jsonPayload,id):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'updateModel/'+id,jsonPayload);
  }
  
  updateUserAdmin(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateUserAdmin',jsonPayload);
  }

  updateAdmin(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateAdmin',jsonPayload);
  }
  
  deleteUser(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/deleteUser/'+id);
  } 
  deleteModel(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteModel/'+id);
  } 
  
  
  

  login(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/login',jsonPayload);
  }
  setToken(token: string) {
    localStorage.setItem('tokenAdmin', token);
  }
  deleteToken() {
    localStorage.removeItem('tokenAdmin');
  }
  getToken() {
    return localStorage.getItem('tokenAdmin');
  }
  
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  setAdminDetails(data:any){
    localStorage.setItem('adminDetails',  JSON.stringify(data));
  }
  getAdminDetails(){
    let details = localStorage.getItem('adminDetails');
    return JSON.parse(details);
  }
  deleteAdminDetails() {
    localStorage.removeItem('adminDetails');
  }

  changePostStatus(jsonData) {
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/changePostStatus',jsonData);
  } 

  

  addPrivacy(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addPrivacy',jsonPayload);
  }
  addTerms(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addTerms',jsonPayload);
  }
  carriers() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/carriers');
  }
  addCarriers(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addCarriers',jsonPayload);
  }
  privacy() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/privacy');
  }

  terms() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/terms');
  }
  about() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/about');
  }

  addAbout(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addAbout',jsonPayload);
  }
  
  updateReviewEqp(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateReviewEqp',jsonPayload);
  }

  updateEq(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/updateEq',jsonPayload);
  }

  resendMailActivation(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/resendMailActivation',jsonPayload);
  }


  bookingsForAdmin() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'bookingsForAdmin');
  }

  getPostalCodes(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getPostalCodes/'+id);
  }

  getBreakDowns() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getBreakDowns');
  }
  addBreakDown(postData) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'addBreakDown',postData);
  }
  updateBreakDown(postData,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'updateBreakDown/'+id,postData);
  }
  deleteBreakDown(id){
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteBreakDown/'+id);
  }
}
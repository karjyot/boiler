import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {AppSettings } from './../constants';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  userData: any; 
  catData:any

  private logoutType: Subject<any> = new Subject<any>();
  private messageType: Subject<any> = new Subject<any>();
  public updateMessage$  = this.messageType.asObservable();
  public logoutType$ = this.logoutType.asObservable();

  public sendLogout(data: any){

    this.logoutType.next(data);
}
updateMessageStatus(jsonPayload):Observable<any>{
  return this.http.post(AppSettings.API_ENDPOINT + 'updateMessageStatus',jsonPayload);
}
public messageData(data: any){
  
  this.messageType.next(data);
}
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  login(authCredentials) {
    return this.http.post(AppSettings.API_ENDPOINT + 'login', authCredentials,this.noAuthHeader);
  }
  payAdmin(authCredentials){
    return this.http.post(AppSettings.API_ENDPOINT + 'payAdmin', authCredentials,this.noAuthHeader);
  }
  saveBankInfo(authCredentials,id){
    return this.http.post(AppSettings.API_ENDPOINT + 'saveBankInfo/'+id, authCredentials,this.noAuthHeader);
  }
  getRecivedMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getRecivedMessage/'+id);
  }
  carriersData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/carriers');
  }

  
  getPaymentRequests(id) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getPaymentRequests/'+id);
  }
  getReferalPayments() {
    return this.http.get(AppSettings.API_ENDPOINT + 'getReferalPayments');
  }
  getUnreadMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getUnreadMessage/'+id);
  }
  setUnreadMessages(data:any){
    localStorage.setItem('unread',  JSON.stringify(data));
  }
  getUnreadMessages(){
    let details = localStorage.getItem('unread');
    return JSON.parse(details);
  }
  getThreads(id,fromId) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getThreads/'+id + '/'+fromId);
  }
  sentMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'sentMessage/'+id);
  }
  sendMessage(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'sendMessageUser',jsonPayload);
  }
  sellerContact(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'sellerContact', data,this.noAuthHeader);
  }
  messageUser(data){
    return this.http.post(AppSettings.API_ENDPOINT + 'sendMessage', data,this.noAuthHeader);
  }
  reportAD(data){
    return this.http.post(AppSettings.API_ENDPOINT + 'reportAD', data,this.noAuthHeader);
  }
  listAds(searchData){
    return this.http.post(AppSettings.API_ENDPOINT + 'listAds',searchData,this.noAuthHeader);
  }
  confirmNewPassword(newPassword) {
    return this.http.post(AppSettings.API_ENDPOINT + 'confirmPassword', newPassword,this.noAuthHeader);
  }
  forgotPassword(email) {
    return this.http.post(AppSettings.API_ENDPOINT + 'checkEmailExists', email,this.noAuthHeader);
  }

  referal(email) {
    return this.http.post(AppSettings.API_ENDPOINT + 'referal', email,this.noAuthHeader);
  }

  validateFogetToken(token) {
    return this.http.post(AppSettings.API_ENDPOINT + 'validateFogetToken', token,this.noAuthHeader);
  }
  //Helper Methods

  setToken(token: string) {
    console.log(token)
    localStorage.setItem('token', token);
  }
  setUserDetails(data:any){
    localStorage.setItem('userDetailsPAT',  JSON.stringify(data));
  }
  
  getUserDetails(){
    let details = localStorage.getItem('userDetailsPAT');
    return JSON.parse(details);
  }

  setCms(data:any){
    localStorage.setItem('cms',  JSON.stringify(data));
  }
  
  getCms(){
    let details = localStorage.getItem('cms');
    return JSON.parse(details);
  }

  private data;
  setData(data){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }
  setSearchData(data:any){
    localStorage.setItem('searchData',  JSON.stringify(data));
  }
  
  getSearchData(){
    let details = localStorage.getItem('searchData');
    return JSON.parse(details);
  }

  deleteSearchData() {
    localStorage.removeItem('searchData');
  }

  setSellerDetails(data:any){
    localStorage.setItem('sellerDetails',  JSON.stringify(data));
  }
  
  getsetSellerDetails(){
    let details = localStorage.getItem('sellerDetails');
    return JSON.parse(details);
  }
  setSocialDetails(data:any){
    localStorage.setItem('socialDetails',  JSON.stringify(data));
  }

  setSearchRecords(data){
    localStorage.setItem('setSearchRecords',  JSON.stringify(data));
  }


  getSearchRecords(data){
    let details = localStorage.getItem('setSearchRecords');
    return JSON.parse(details);
  }

  deleteSearchRecords() {
    localStorage.removeItem('setSearchRecords');
  }
  
  
  getSocialDetails(){
    let details = localStorage.getItem('socialDetails');
    return JSON.parse(details);
  }
  
  
  getToken() {
    return localStorage.getItem('token');
  }
  deleteUserDetails() {
    localStorage.removeItem('userDetailsPAT');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      try{
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }catch(e){
        return token;
      }
     
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

  registerUser(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'register',jsonPayload,this.noAuthHeader);
  }

  getWalletSummary(id){
    return this.http.get(AppSettings.API_ENDPOINT + 'getWalletSummary/'+id,this.noAuthHeader);
  }

  withdrawRequest(id,postData){
    return this.http.post(AppSettings.API_ENDPOINT + 'withdrawRequest/'+id,postData,this.noAuthHeader);
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

  contact(data) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'contact',data);
  }

  validateUser(email) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'validateUser/'+email);
  }
  getPostDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getPostDetails/'+id);
  }
  getNewsDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'newsDetails/'+id);
  }


  //Dont delete
  listRecords() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'domains');
  }

  listRecordsAdmin() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getDomainsAdmin');
  }

  listOrders(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'backorders/'+id);
  }
  deleteAd(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteAd/'+id);
  }
  deleteSearch(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteSearch/'+id);
  }

  deleteBookmark(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteBookmark/'+id);
  }

  listHandpicks(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'myDomains/'+id);
  }

  addOrder(data,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'order/'+id,data);
  }
  addBackorder(data,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'addBackorder/'+id,data);
  }
  private imageUrl: Subject<any> = new Subject<any>();
  public imageUrl$ = this.imageUrl.asObservable();
  public sendImageUpdate(data: any){
    this.imageUrl.next(data);
}
private userType: Subject<any> = new Subject<any>();
public userType$ = this.userType.asObservable();
public sendUserTypeUpdate(data: any){
  this.userType.next(data);
}

updateProfileImage(jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateProfileImage',jsonPayload);
}
updateUser(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateUser/'+id,jsonPayload);
}
subscribeEmail(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'subscribe',jsonPayload);
}
activate(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'activateSubscribe',jsonPayload);
}
listCountries() {
  return this.http.get(AppSettings.API_ENDPOINT  + 'countries');
}

addRecord(jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'addDomain',jsonPayload);
}
editRecord(id,jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'editDomain/'+id,jsonPayload);
}
deleteRecord(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteDomain/'+id);
}
getAdsAdmin(){
  return this.http.get(AppSettings.API_ENDPOINT + 'getAdminAds');
}

getAdminHandpicked(){
  return this.http.get(AppSettings.API_ENDPOINT + 'adminHandpicked');
}
getHomeContent(){
  return this.http.get(AppSettings.API_ENDPOINT + 'getContent');
}
updateHomeContent(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateHomeContent',data);
}
changeUserPassword(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'changeUserPassword',data);
}

verifyAccount(data){
  return this.http.get(AppSettings.API_ENDPOINT + 'verifyAccount/'+data);
}
getBreakDowns(){
  return this.http.get(AppSettings.API_ENDPOINT + 'getBreakDowns');
}

plans(){
  return this.http.get(AppSettings.API_ENDPOINT + 'plans');
}

setPlanDetails(data:any){
  localStorage.setItem('planDetails',  JSON.stringify(data));
}

getPlanDetails(){
  let details = localStorage.getItem('planDetails');
  return JSON.parse(details);
}
makePayment(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'makePayment',data);
}
makePaymentZero(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'makePaymentZero',data);
}

setPlan(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'setPlan',data);
}
registerSocial(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'registerSocial',data);
}
firstTimeSocial(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'firstTimeSocial',data);
}

createAd(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'createAd',data);
}
updateAd(data,id){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateAd/'+id,data);
}
deleteAdImage(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteAdImage/'+id);
}
payWalletUser(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'payWallet',data);
}

bookmark(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'bookmark',data);
}


userAdsGet(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'userContent/'+id);
}


getUserPlans(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'getPlanInfo/'+id);
}

getBookmarks(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'getbookmark/'+id);
}
adDetails(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'adDetails/'+id);
}
getAdDetails(){
  let details = localStorage.getItem('adDetails');
  return JSON.parse(details);
}
setadDetails(data){
  localStorage.setItem('adDetails',  JSON.stringify(data));
}

getBookingID(){
  let details = localStorage.getItem('setBookingID');
  return JSON.parse(details);
}
setBookingID(data){
  localStorage.setItem('setBookingID',  JSON.stringify(data));
}

getfinalObj(){
  let details = localStorage.getItem('finalObj');
  return JSON.parse(details);
}
finalObj(data){
  localStorage.setItem('finalObj',  JSON.stringify(data));
}

bookmarkDetails(id,userId){
  return this.http.get(AppSettings.API_ENDPOINT + 'listBookMarks/'+id + '/'+userId);
}
listBookMarksAll(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'listBookMarksAll/'+id);
}
filterSearch(data,type){
  return this.http.post(AppSettings.API_ENDPOINT + 'filterSearch/'+type,data);
}

getMakes() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getMake');
}

getModels(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'getModel/'+id);
}
getEqp() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getEqp');
}

saveSearch(data,id,type) {
  return this.http.post(AppSettings.API_ENDPOINT + 'saveSearch/'+id+'/'+type,data);
}

getSavedSearches(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'getSavedSearches/'+id);
}


/*====new services here ====*/
addQuestion(jsonPayload):Observable<any>{
  return this.http.post(AppSettings.API_ENDPOINT + 'addQuestion',jsonPayload,this.noAuthHeader);
}
getQuestions() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getQuestions');
}
updateQuestion(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateQuestion/'+id,jsonPayload);
}
deleteQuestion(id) {
  return this.http.get(AppSettings.API_ENDPOINT  + 'deleteQuestion/'+id);
} 

deleteBooking(id) {
  return this.http.get(AppSettings.API_ENDPOINT  + 'deleteBooking/'+id);
} 

deleteLimit(id) {
  return this.http.get(AppSettings.API_ENDPOINT  + 'deleteLimit/'+id);
} 

deleteLimitVideo(id) {
  return this.http.get(AppSettings.API_ENDPOINT  + 'deleteLimitVideo/'+id);
} 


bookingDetails(id) {
  return this.http.get(AppSettings.API_ENDPOINT  + 'bookingDetails/'+id);
} 


getCategories() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getCategories');
}
addCategory(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'addCategory',jsonPayload);
}
deleteCategory(id) {
  return this.http.get(AppSettings.API_ENDPOINT  + 'deleteQuestion/'+id);
} 

getProducts() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getProducts');
}
addProduct(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'addProduct',jsonPayload);
}

getFilterRecordsData(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'getFilterRecords/'+id);
}

deleteProduct(id) {
  return this.http.get(AppSettings.API_ENDPOINT  + 'deleteProduct/'+id);
} 
updateProduct(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateProduct/'+id,jsonPayload);
}

filterRecords(data:any){
  localStorage.setItem('filterRecords',  JSON.stringify(data));
}
getFilterRecords(){
  let details = localStorage.getItem('filterRecords');
  return JSON.parse(details);
}

setPostalCode(data:any){
  localStorage.setItem('postalCode',  JSON.stringify(data));
}
getPostalCode(){
  let details = localStorage.getItem('postalCode');
  return JSON.parse(details);
}
setProduct(data:any){
  localStorage.setItem('product',  JSON.stringify(data));
}
getProduct(){
  let details = localStorage.getItem('product');
  return JSON.parse(details);
}

setFinalObj(data:any){
  localStorage.setItem('setFinalObj',  JSON.stringify(data));
}
setControlObj(data:any){
  localStorage.setItem('setControlObj',  JSON.stringify(data));
}
getControlObj(){
  let details = localStorage.getItem('setControlObj');
  return JSON.parse(details);
}
getFinalObj(){
  let details = localStorage.getItem('setFinalObj');
  return JSON.parse(details);
}

setDiv(data:any){
  localStorage.setItem('setDiv',  JSON.stringify(data));
}
getDiv(){
  let details = localStorage.getItem('setDiv');
  return JSON.parse(details);
}

searchProducts(data) {
  return this.http.post(AppSettings.API_ENDPOINT + 'searchProducts',data);
}

confirmOrder(data) {
  return this.http.post(AppSettings.API_ENDPOINT + 'confirmOrder',data);
}
bookings(jsonData) {
  return this.http.post(AppSettings.API_ENDPOINT + 'bookings',jsonData);
}

bookingsBoiler(jsonData) {
  return this.http.post(AppSettings.API_ENDPOINT + 'boilerBookings',jsonData);
}
customLimits(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'customLimits/'+id);
}
customLimitsVideo(){
  return this.http.get(AppSettings.API_ENDPOINT + 'customLimitsVideo');
}

updateCategory(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateCategory/'+id,jsonPayload);
}

updateBooking(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateBooking',jsonPayload);
}

setLimitData(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'setLimit',jsonPayload);
}

updateLimit(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateLimit/'+id,jsonPayload);
}

setLimitDataVideo(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'setLimitDataVideo',jsonPayload);
}

updateLimitVideo(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateLimitVideo/'+id,jsonPayload);
}


getGroupCategories():Observable<any>{  
  return this.http.get(AppSettings.API_ENDPOINT + 'getGroupCategories');
}
videoLimitData(jsonData):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'videoLimitData',jsonData);
}
video_limits():Observable<any>{  
  return this.http.get(AppSettings.API_ENDPOINT + 'videoLimits');
}

customLimitsAdmin():Observable<any>{  
  return this.http.get(AppSettings.API_ENDPOINT + 'customLimitsAdmin');
}

customLimitsVideoAdmin():Observable<any>{  
  return this.http.get(AppSettings.API_ENDPOINT + 'customLimitsVideoAdmin');
}



getAddress(postalCode):Observable<any>{  
  return this.http.get('https://api.getaddress.io/find/'+postalCode+'?api-key=gRS0Iidx8kurl58LLg0iqA24526&sort=true');
}
validatePostalCode(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'validatePostalCode',jsonPayload);
}

updateBookings(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateBookings/'+id,jsonPayload);
}


getControls() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getControl');
}
addControl(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'addControl',jsonPayload);
}
deleteControl(id) {
  return this.http.get(AppSettings.API_ENDPOINT  + 'deleteControl/'+id);
} 

updateControl(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateControl/'+id,jsonPayload);
}



}
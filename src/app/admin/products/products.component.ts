import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  records:any;
  urls:any
  signupForm: FormGroup;
  updateInfo: FormGroup;
  perPage = 10;
  totalEntries = "";
  currentUser :any;
  modalRef: BsModalRef | null;
  modalRefAdd: BsModalRef | null;
  modalRefUpdate: BsModalRef | null;
  public files: any[];
profileImg :any;
categories:any;
userId:'';
id:'';
searchText:'';
p = 1;
modalRefDel:BsModalRef | null;
modalRefStatus:BsModalRef | null;
postStatus = "";
status= "";
countries:any
  public infos = {title:"",name:"",about:"",type :"gas",price:"",feature:"",feature1:"",feature2:"",feature3:"",feature4:"",feature5:"",feature6:"",feature7:"",feature8:""};
  public signupData = { title:"",about:"",name:"",type:"",price:"",feature:"",feature1:"",feature2:"",feature3:"",feature4:"",feature5:"",feature6:"",feature7:"",feature8:""};
submitted = false;
questions:any;
details:any;
  ngOnInit() {
    this.details =  this.adminService.getAdminDetails();
    this.updateInfo = this.formBuilder.group({    
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      about: [''],
      name: ['', [Validators.required]],
     // type: ['gas', [Validators.required]],
      feature : [''],
      feature1 : [''],
      feature2 : [''],
      feature3 : [''],
      feature4 : [''],
      feature5 : [''],
      feature6 : [''],
      feature7 : [''],
      feature8 : [''],
    });

    this.signupForm = this.formBuilder.group({    
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      name: ['', [Validators.required]],
     // type: ['', [Validators.required]],
      feature : [''],
      feature1 : [''],
      feature2 : [''],
      feature3 : [''],
      feature4 : [''],
      feature5 : [''],
      feature6 : [''],
      feature7 : [''],
      feature8 : [''],
      about: [''],
    });
    this.ngxService.start()
    this.loginService.getProducts().subscribe(
      res => {
        this.records = res['success'];
        this.totalEntries = this.records.length;
        this.records.sort((val1, val2)=> {return <any> new Date(val2.created_at) - <any> new 
          Date(val1.created_at)})
        this.ngxService.stop();
      },
      err => { 
        this.ngxService.stop();
        
      }
    )


    this.loginService.getQuestions().subscribe((result) => {
    
     
      let questions = result["success"]
      
      this.loginService.getCategories().subscribe((result) => {
      
       let categories = result["success"];
 
 
       for(var i=0; i<questions.length; i++){
        this.signupForm.addControl('type-'+ questions[i].id,new FormControl(''));
        this.updateInfo.addControl('typeup-'+ questions[i].id,new FormControl(''));
         questions[i]["categories"] = [];
         for(var j=0; j<categories.length; j++){
           if(categories[j].question_id == questions[i].id)
           {
             questions[i]["categories"].push(categories[j])
           }
         }
         
 
       }
       this.questions = questions
       console.log(this.questions)
       this.questions.sort((val1, val2)=> {return <any> val1.order_question - <any>val2.order_question})
        this.ngxService.stop();
   
          
       }, (err) => {
        
       }); 
         
      }, (err) => {
       
      });

    



  
  }

  addUser(template: any){
    this.modalRefAdd = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  cancelAddUser(){
    this.signupData.name = "";
    this.signupData.title = "";
    this.signupData.price = "";
    this.signupData.about = "";
    this.modalRefAdd.hide();

  }


  signup(){
  
  this.submitted = true;
  if (this.signupForm.invalid) {
         this.toastr.error('Please provide the required information.');
            return;
      }
      this.ngxService.start()
      const formData = new FormData();
      for (const file of this.files) {
          formData.append('file', file, file.name);
      }
      formData.append('about', this.signupData.about);
      formData.append('name', this.signupData.name);
      formData.append('title', this.signupData.title);
      formData.append('price', this.signupData.price);
     

      formData.append('type', this.signupForm.value["type-2"]);
      formData.append('convert_commbi', this.signupForm.value["type-4"]);
      formData.append('curently_have', this.signupForm.value["type-3"]);
      formData.append('where_install', this.signupForm.value["type-5"]);
      formData.append('property', this.signupForm.value["type-6"]);
      formData.append('bedrooms', this.signupForm.value["type-7"]);
      formData.append('baths', this.signupForm.value["type-8"]);
      formData.append('showers', this.signupForm.value["type-9"]);
      formData.append('flue_exit', this.signupForm.value["type-10"]);

      



      formData.append('feature1', this.signupData.feature1);
      formData.append('feature2', this.signupData.feature2);
      formData.append('feature3', this.signupData.feature3);
      formData.append('feature4', this.signupData.feature4);
      formData.append('feature5', this.signupData.feature5);
      formData.append('feature6', this.signupData.feature6);
      formData.append('feature7', this.signupData.feature7);
      formData.append('feature8', this.signupData.feature8);

      this.loginService.addProduct(formData).subscribe((result) => {
        this.ngxService.stop();
        this.toastr.success('Question added succesfully.');
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/products"]));
          this.signupForm.reset();
          this.modalRefAdd.hide();
          
       }, (err) => {

         
          this.toastr.error("Internal Server Error.",);
          this.ngxService.stop();
        
       });
  }
  get f() { return this.signupForm.controls; }
  get upateF() { return this.updateInfo.controls; }
 
  updateUser(template:any,userDetails){
   console.log(userDetails.country_code)
    this.modalRefUpdate = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.infos.name = userDetails.boiler_name;
    this.infos.title =  userDetails.title;
    this.infos.price =  userDetails.boiler_price;
    this.infos.type =  userDetails.type;
    this.infos.feature1 =  userDetails.feature1;
    this.infos.feature2 =  userDetails.feature2;
    this.infos.feature3 =  userDetails.feature3;
    this.infos.feature4 =  userDetails.feature4;
    this.infos.feature5 =  userDetails.feature5;
    this.infos.feature6 =  userDetails.feature6;
    this.infos.feature7 =  userDetails.feature7;
    this.infos.feature8 =  userDetails.feature8;
    this.infos.about =  userDetails.about;
    this.userId = userDetails.id
    this.urls =  userDetails.image;
    this.updateInfo.controls['typeup-2'].setValue(userDetails.type);
    this.updateInfo.controls['typeup-3'].setValue(userDetails.curently_have);
    this.updateInfo.controls['typeup-4'].setValue(userDetails.convert_commbi);
    this.updateInfo.controls['typeup-5'].setValue(userDetails.where_install);
    this.updateInfo.controls['typeup-6'].setValue(userDetails.property);
    this.updateInfo.controls['typeup-7'].setValue(userDetails.bedrooms);
    this.updateInfo.controls['typeup-8'].setValue(userDetails.baths);
    this.updateInfo.controls['typeup-9'].setValue(userDetails.showers);
    this.updateInfo.controls['typeup-10'].setValue(userDetails.flue_exit);


  }
  update(){
   
        this.submitted = true;
        if (this.updateInfo.invalid) {
          this.toastr.error('Please provide the required information.');
             return;
       }
       this.ngxService.start()
       const formData = new FormData();
       if(this.files){
        for (const file of this.files) {
            formData.append('file', file, file.name);
        }
       }
       formData.append('about', this.infos.about);
       formData.append('name', this.infos.name);
       formData.append('title', this.infos.title);
       formData.append('price', this.infos.price);
       formData.append('type', this.infos.type);
       formData.append('feature1', this.infos.feature1);
      formData.append('feature2', this.infos.feature2);
      formData.append('feature3', this.infos.feature3);
      formData.append('feature4', this.infos.feature4);
      formData.append('feature5', this.infos.feature5);
      formData.append('feature6', this.infos.feature6);
      formData.append('feature7', this.infos.feature7);
      formData.append('feature8', this.infos.feature8);
      
      formData.append('type', this.updateInfo.value["typeup-2"]);
      formData.append('convert_commbi', this.updateInfo.value["typeup-4"]);
      formData.append('curently_have', this.updateInfo.value["typeup-3"]);
      formData.append('where_install', this.updateInfo.value["typeup-5"]);
      formData.append('property', this.updateInfo.value["typeup-6"]);
      formData.append('bedrooms', this.updateInfo.value["typeup-7"]);
      formData.append('baths', this.updateInfo.value["typeup-8"]);
      formData.append('showers', this.updateInfo.value["typeup-9"]);
      formData.append('flue_exit', this.updateInfo.value["typeup-10"]);


       this.loginService.updateProduct(formData,this.userId).subscribe((result) => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/products"]));
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Your information updated succesfully.', 'Success');
          
       }, (err) => {
        
          this.toastr.error("Internal Server Error.", );
        this.ngxService.stop();
        
       });
    
      }
      deleteUser(template:any,id){
        this.id = id
        this.modalRefDel = this.modalService.show(template)
      }
      confirmDelete(){
        this.ngxService.start();
        this.loginService.deleteProduct(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/products"]));
            this.modalRefDel.hide();
            this.ngxService.stop();
          },
          err => { 
            this.ngxService.stop();
            
          }
        )
      }

      onSelectFile(event) {
        var allowedExtensions = ["jpg","jpeg","png","JPG","JPEG","PNG"]; // allowed extensions
        let fileExtesion = event.target.files[0].type.split("/")[1]; // image selection extension
        if(allowedExtensions.indexOf(fileExtesion) == -1){
          this.toastr.error("There was an upload error.Make sure to upload a JPG or PNG file and try again.");
          return;
        }
        if(event.target.files[0]){
        if(event.target.files[0].size/1024/1024 > 2){
          this.toastr.error('File size should be less than 2 mb.');
          return;
         }
        }
        
        if (event.target.files && event.target.files[0]) {
          this.files = event.target.files;
          //  for (let i = 0; i < filesAmount; i++) {
                    var reader = new FileReader();
    
                    reader.onload = (event:any) => {
                    
                       this.urls = event.target.result; 
                     
                    }

                    reader.readAsDataURL(event.target.files[0]);
            //}
            
        }
      }
      removeImg(data:any){
        this.urls = "";
      }
     

}

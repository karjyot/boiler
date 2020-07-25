import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }
  records:any;
  questions:any;
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
  countries:any;
  details:any;
urls:any;
  public infos = {question:"",name:"",price :""};
  public signupData = { question:"",name:"",price:""};
submitted = false;
  ngOnInit() {
    this.details =  this.adminService.getAdminDetails();
    this.updateInfo = this.formBuilder.group({    
      question: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: [''],
    });

    this.signupForm = this.formBuilder.group({    
      question: ['', [Validators.required]],
        name: ['', [Validators.required]],
        price: [''],
    });
    this.ngxService.start()
    this.loginService.getCategories().subscribe(
      res => {
        this.records = res['success'];
        this.totalEntries = this.records.length;
        this.ngxService.stop();
      },
      err => { 
        this.ngxService.stop();
        
      }
    )
    this.getQuestions();
  
  }

  addUser(template: any){
    this.modalRefAdd = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  cancelAddUser(){
    this.signupData.name = "";
    this.signupData.question = "";
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
      if(this.files){
        for (const file of this.files) {
          formData.append('file', file, file.name);
      
      }
    }
      // formData.append('id', this.signupData.id);
     // formData.append('ns', this.signupData.ns);
      formData.append('name', this.signupData.name);
      formData.append('question', this.signupData.question);
      formData.append('price', this.signupData.price);
      this.loginService.addCategory(formData).subscribe((result) => {
        this.ngxService.stop();
        this.toastr.success('Category added succesfully.');
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/categories"]));
          this.signupForm.reset();
          this.modalRefAdd.hide();
          
       }, (err) => {

         
          this.toastr.error("Internal Server Error.");
          this.ngxService.stop();
        
       });
  }
  get f() { return this.signupForm.controls; }
  get upateF() { return this.updateInfo.controls; }
 
  updateUser(template:any,userDetails){
   console.log(userDetails)
    this.modalRefUpdate = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.infos.name = userDetails.category;
    this.infos.price = userDetails.price;
    this.infos.question =  userDetails.question_id;
    this.urls =  userDetails.image;
    this.userId = userDetails.id
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
       formData.append('name', this.infos.name);
       formData.append('question', this.infos.question);
       formData.append('price', this.infos.price);
       this.loginService.updateCategory(formData,this.userId).subscribe((result) => {
        this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/categories"]));
        this.ngxService.stop();
        this.modalRefUpdate.hide();
       this.toastr.success('Your information updated succesfully.', 'Success');
          
       }, (err) => {
        
          this.toastr.error("Internal Server Error.");
        this.ngxService.stop();
        
       });
    
      }
      deleteUser(template:any,id){
        this.id = id
        this.modalRefDel = this.modalService.show(template)
      }
      confirmDelete(){
        this.ngxService.start();
        this.loginService.deleteCategory(this.id).subscribe(
          res => {
            this.router.navigateByUrl('admin/dashboard', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/categories"]));
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


      getQuestions(){
        this.loginService.getQuestions().subscribe((result) => {
        this.questions = result["success"]
          this.ngxService.stop();
         }, (err) => {
          
            this.toastr.error("Internal Server Error.",);
            this.ngxService.stop();
          
         });
      }
}

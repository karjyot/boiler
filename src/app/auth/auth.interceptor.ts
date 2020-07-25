import { HttpInterceptor, HttpRequest, HttpHeaders ,HttpHandler,HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap,map  } from 'rxjs/operators';
import { Router } from "@angular/router";
import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable,throwError, Observer, fromEvent, merge } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router : Router,private toastr: ToastrService,private ngxService: NgxUiLoaderService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      this.createOnline$().subscribe(isOnline => {
        //this.ngxService.start();
          // if(!isOnline){
          //   this.ngxService.start()
          //   this.toastr.error("Network error occured.");
          //   this.ngxService.stop();
          // }
          
        });
            const httpReq = req.clone({
              headers: new HttpHeaders({
                'Referrer-Policy':	'no-referrer',
                'Strict-Transport-Security':	'max-age=15768000',
                'X-Frame-Options':	'SAMEORIGIN',
                'X-Content-Type-Options':	'nosniff',
                'Feature-Policy':	'autoplay :"none"; camera :"none"',
                'X-XSS-Protection':	'1; mode=block',
                // 'Cache-Control': 'no-cache',
                // 'Pragma': 'no-cache',
                // 'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
              })
            });
            return next.handle(httpReq).pipe(
                tap(
                    event => { 
                     
                    },
                    err => {
                     // console.log(err.status)
                      // if(err.status == 401){
                      //   try{
                      //     let errMessage = err["error"]["message"];
                      //     this.toastr.error(errMessage);
                      //    }catch(e){
                      //    // this.toastr.error(e);
                      //    } 
                      //    setTimeout(() => {
                      //     window.location.href = "/invalidate/session?"+new Date().getTime()
                      //    }, 500); 
                     
                      // }
                    })
            );
    }
    createOnline$() {
      return merge<boolean>(
        fromEvent(window, 'offline').pipe(map(() => false)),
        fromEvent(window, 'online').pipe(map(() => true)),
        new Observable((sub: Observer<boolean>) => {
          sub.next(navigator.onLine);
          sub.complete();
        }));
    }
}
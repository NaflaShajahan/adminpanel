import { Component, ChangeDetectorRef,Inject  } from '@angular/core';
import { NbLoginComponent, NbAuthService,NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  ServiceService } from '../../services/service.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {

 form:FormGroup;
 constructor(private fb: FormBuilder,
  private myCustomAuthService: ServiceService,private toastrService: NbToastrService,
  service: NbAuthService,
  @Inject(NB_AUTH_OPTIONS) options:{},
   cd: ChangeDetectorRef, router: Router) {
  super(service, options, cd, router);

  this.form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

}

  login() {
    console.log("ass")
    this.myCustomAuthService.login(this.user).subscribe(res => {
      console.log(res);
      if(res.status ==true){
        this.toastrService.show('Success','Login Success!')
      }
      else {
        this.toastrService.show('Danger',res.msg)
      }
    });
    this.router.navigate(['pages'])
  }
}

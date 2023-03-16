import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  form!: FormGroup ;
  formSubmitted: boolean = false;
  employeeForm!: NgForm;
  isSubmitted: boolean = false;
  regpat: employeeForm=new employeeForm();
  constructor(private router: Router,private fb: FormBuilder, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void { 

    this.form = this.fb.group
    ({
      firstname: new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
      lastname: new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
      emailid: new FormControl(null, [Validators.required,Validators.maxLength(100),Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      confirmpassword: new FormControl(null, [Validators.required]),
    })
   }


   onSubmit() {
    if (this.form.valid) {
        this.regpat.FirstName = this.form.value.firstname;     
        this.regpat.LastName = this.form.value.lastname; 
        this.regpat.Email = this.form.value.emailid;  
        this.regpat.Password = this.form.value.password; 

        this.httpProvider.saveEmployee(this.regpat).subscribe(async data => {
              if (data != null && data.body != null) {
                if (data != null && data.body != null) {
                  var resultData = data.body;
                  if (resultData != null && resultData.isSuccess) {
                    this.toastr.success(resultData.message);
                    setTimeout(() => {
                      this.router.navigate(['/Home']);
                    }, 500);
                  }
                }
              }
            },
              async error => {
                this.toastr.error(error.message);
                setTimeout(() => {
                  this.router.navigate(['/Home']);
                }, 500);
              });
          }
        }
      }


  

export class employeeForm {
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
  Password:string="";
}


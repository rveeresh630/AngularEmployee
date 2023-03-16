import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  form!: FormGroup ;
  formSubmitted: boolean = false;
  regpat: employeeForm=new employeeForm();
  isSubmitted: boolean = false;
  employeeId: any;

  constructor(private toastr: ToastrService,private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {

    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getEmployeeDetailById();
    this.form = this.fb.group
    ({
      firstname: new FormControl(this.regpat.FirstName, [Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
      lastname: new FormControl(this.regpat.LastName, [Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
      emailid: new FormControl(this.regpat.Email, [Validators.required,Validators.maxLength(100),Validators.email]),
      password: new FormControl(this.regpat.Password, [Validators.required,Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
    })

    

  }

    onSubmit() 
    {
      if (this.form.valid) {
          this.regpat.FirstName = this.form.value.firstname;     
          this.regpat.LastName = this.form.value.lastname; 
          this.regpat.Email = this.form.value.emailid;  
          this.regpat.Password = this.form.value.password; 
  
          this.httpProvider.saveEmployee(this.regpat).subscribe(async data => {
            if (data != null && data.body != null) {
              var resultData = data.body;
              if (resultData != null && resultData.isSuccess) {
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

  getEmployeeDetailById() {
    this.httpProvider.getEmployeeDetailById(this.employeeId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.regpat.Id = resultData.id;
          this.regpat.FirstName = resultData.firstName;
          this.regpat.LastName = resultData.lastName;
          this.regpat.Email = resultData.email;
        }
      }
    },
      (error: any) => { });
  }
  
}

export class employeeForm {
  Id: number = 0;
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
  Password: string = "";
}
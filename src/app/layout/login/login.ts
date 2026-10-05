import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../models/services/auth-service';


interface FiscalYear {
  id: number;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone:true ,
  imports:[ReactiveFormsModule]
})
export class Login {

  loginForm: FormGroup;

  showPassword = false;

  isLoading = false;

  errorMessage = '';


  financialYears: FiscalYear[] = [
    {
      id: 1,
      name: '2026'
    },
    {
      id: 2,
      name: '2027'
    },
    {
      id: 3,
      name: 'عام'
    }
  ];


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      financialYear: [
        '',
        Validators.required
      ],

      email: [
        '',
        Validators.required
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      rememberMe: [
        false
      ]

    });

  }


 login(): void {

  console.log('LOGIN CLICKED');

  console.log('FORM VALUE:', this.loginForm.value);

  console.log('FORM VALID:', this.loginForm.valid);

  if (this.loginForm.invalid) {

    this.loginForm.markAllAsTouched();

    console.log('FORM IS INVALID');

    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  const request = {
    emailOrUsername: this.loginForm.get('email')?.value,
    password: this.loginForm.get('password')?.value,
    fiscalYearId: Number(
      this.loginForm.get('financialYear')?.value
    ),
    fcmToken: '',
    roleContext: 0
  };

  console.log('API REQUEST:', request);

  this.authService.login(request).subscribe({

    next: (response) => {

      console.log('LOGIN SUCCESS:', response);

      this.isLoading = false;

      this.router.navigate(['dashboard']);
    },

    error: (error) => {

      console.error('LOGIN ERROR:', error);

      this.isLoading = false;

      this.errorMessage =
        error?.error?.message ||
        error?.message ||
        'حدث خطأ أثناء تسجيل الدخول';
    }

  });
}


  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }

}

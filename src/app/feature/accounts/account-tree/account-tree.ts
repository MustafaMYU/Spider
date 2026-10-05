import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-tree',

  standalone: true,

  imports: [ReactiveFormsModule],

  templateUrl: './account-tree.html',

  styleUrls: ['./account-tree.css', './../../products/item-card/item-card.css'],
})
export class AccountTree {
  // =========================================================
  // Constructor
  // =========================================================

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      parentAccountId: [null, Validators.required],

      parentAccountCode: [
        {
          value: '',
          disabled: true,
        },
      ],

      accountName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      branchId: [null, Validators.required],

      accountGroupId: [null, Validators.required],

      accountStatus: ['active', Validators.required],

      accountNature: [null, Validators.required],

      finalAccount: [null, Validators.required],

      phone: ['', [Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],

      fax: ['', [Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],

      description: ['', [Validators.maxLength(500)]],
    });
  }

  // =========================================================
  // Form
  // =========================================================

  accountForm!: FormGroup;

  submitted = false;

  // =========================================================
  // Parent Account Dropdown
  // =========================================================

  parentDropdownOpen = false;

  selectedParentName = '';

  selectedParentCode = '';

  childAccountNumber = '';

  parentAccounts = [
    {
      id: 1,
      code: '1000',
      name: 'الأصول',
    },

    {
      id: 2,
      code: '2000',
      name: 'الخصوم',
    },

    {
      id: 3,
      code: '3000',
      name: 'حقوق الملكية',
    },

    {
      id: 4,
      code: '4000',
      name: 'الإيرادات',
    },

    {
      id: 5,
      code: '5000',
      name: 'المصروفات',
    },
  ];

  // =========================================================
  // Select Parent Account
  // =========================================================

  selectParentAccount(account: { id: number; code: string; name: string }): void {
    this.selectedParentName = account.name;

    this.selectedParentCode = account.code;

    this.childAccountNumber = account.code;

    this.parentDropdownOpen = false;

    this.accountForm.patchValue({
      parentAccountId: account.id,
      parentAccountCode: account.code,
    });
  }

  // =========================================================
  // Search Type
  // =========================================================

  searchType: 'code' | 'name' = 'code';

  searchTypeOpen = false;

  get searchPlaceholder(): string {
    return this.searchType === 'code' ? 'ابحث رقم الحساب' : 'ابحث باسم الحساب';
  }

  selectSearchType(type: 'code' | 'name'): void {
    this.searchType = type;

    this.searchTypeOpen = false;
  }

  // =========================================================
  // Submit
  // =========================================================

  submit(): void {
    this.submitted = true;

    // Mark all controls as touched
    this.accountForm.markAllAsTouched();

    if (this.accountForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formValue = this.accountForm.getRawValue();

    console.log('Account Form:', formValue);

    // API call here
  }

  // =========================================================
  // Validation Helpers
  // =========================================================

  isInvalid(controlName: string): boolean {
    const control = this.accountForm.get(controlName);

    return !!(control && control.invalid && (control.touched || this.submitted));
  }

  // =========================================================
  // Validation Message
  // =========================================================

  getErrorMessage(controlName: string): string {
    const control = this.accountForm.get(controlName);

    if (!control) {
      return '';
    }

    if (control.hasError('required') && (control.touched || this.submitted)) {
      return 'هذا الحقل مطلوب';
    }

    if (control.hasError('minlength') && (control.touched || this.submitted)) {
      return 'يجب ألا يقل عن حرفين';
    }

    if (control.hasError('maxlength') && (control.touched || this.submitted)) {
      return 'تجاوزت الحد الأقصى المسموح';
    }

    if (control.hasError('pattern') && (control.touched || this.submitted)) {
      if (controlName === 'phone') {
        return 'رقم الجوال غير صحيح';
      }

      if (controlName === 'fax') {
        return 'رقم الفاكس غير صحيح';
      }

      return 'القيمة غير صحيحة';
    }

    return '';
  }

  // =========================================================
  // Reset
  // =========================================================

  resetForm(): void {
    this.accountForm.reset({
      accountStatus: 'active',
    });

    this.selectedParentName = '';

    this.selectedParentCode = '';

    this.childAccountNumber = '';

    this.parentDropdownOpen = false;

    this.submitted = false;
  }

  treeItem = [
    {
      word: 'الاصول',
    },
    {
      word: 'الالتزامات',
    },
    {
      word: 'حقوق الملكية',
    },
    {
      word: 'الايرادات',
    },
    {
      word: 'المصروفات',
    },
  ];
}

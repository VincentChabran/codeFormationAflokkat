import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkPass } from './checkPass';
import { ObserverServiceService } from './observer-service.service';

@Component({
  selector: 'app-contact-reactive',
  templateUrl: './contact-reactive.component.html',
  styleUrls: ['./contact-reactive.component.scss'],
})
export class ContactReactiveComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private observerCustom: ObserverServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: '',
      email: ['', [Validators.required, Validators.email]],
      message: '',
      password: this.formBuilder.group(
        {
          firstPass: ['', Validators.required],
          repeatPass: ['', Validators.required],
        },
        { validators: [checkPass] }
      ),
    });

    // this.observerCustom
    //   .onValueChange(this.userForm)
    //   ?.subscribe({ next: (res) => console.log(res) });

    this.observerCustom
      .onValueChangeDebounce(this.userForm)
      ?.subscribe({ next: (res) => console.log(res) });

    // this.observerCustom.onStatusChange(this.userForm)?.subscribe({
    //   next: (res) => {
    //     if (res === 'INVALID') console.log(res + ` Length < 3`);
    //     else if (res === 'VALID') console.log(res + ' Length > 3');
    //   },
    // });
  }

  onSubmitForm() {
    console.log(this.userForm);
  }

  get nom() {
    return this.userForm.get('nom');
  }
}

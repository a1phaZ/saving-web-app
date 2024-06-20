import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import {
  ContainerComponent,
  RegistrationForm,
  TextFormFieldComponent,
} from '@tg-web-app/ui';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { filter } from 'rxjs';
import { FakeApiService } from '../../services/fake-api.service';
import { IResponse } from '@tg-web-app/entity';

@Component({
  selector: 'webapp-registration',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    RouterLink,
    TextFormFieldComponent,
    ReactiveFormsModule,
    MatButton,
    ContainerComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  public form!: FormGroup;
  private webApi = inject(FakeApiService);
  private router = inject(Router);

  constructor() {}

  public ngOnInit(): void {
    this.form = new RegistrationForm();
    console.log(this.form);
  }

  signUp(value: { fullname: string; email: string; password: string }) {
    this.webApi
      .post<IResponse<any>>('asdf', value)
      .pipe(filter((response) => response?.success))
      .subscribe(async (response) => {
        await this.router.navigate(['/', 'dashboard'], { replaceUrl: true });
      });
  }
}

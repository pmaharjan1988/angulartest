import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
function ratingRange(min: number, max: number): ValidatorFn { //factory function
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    } else {
      return null;
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gtest';
  customerForm: FormGroup;
  nameValidationMessage: string;
  private validationMessages = {
    required: 'Please enter your name',
    minlength: 'Please enter min length',
  };
  constructor(private appService: AppServiceService, private custFb: FormBuilder) { }

  save() {
    console.log(this.customerForm);
  }

  ngOnInit(): void {
    const customId = Math.floor(Math.random() * 100) + 1;

    this.customerForm = this.custFb.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(3)]],
      rating: ['', ratingRange(1, 6)]
    });

    //watch for a change in

    this.customerForm.get('id').valueChanges.subscribe(value => {
      console.log(value);
    });

    const nameControl = this.customerForm.get('name');

    nameControl.valueChanges.pipe(debounceTime(1500)).subscribe(value => this.setMessage(nameControl));


    /* 
    using form group
    this.customerForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    }); */


    //this.customerForm.setValue to set all the values in the form


    this.customerForm.patchValue({
      id: customId,
    });


    this.appService.getTestData().subscribe(result => {
      console.log('AppComponent -> ngOnInit -> result', result);
    });

    const jsonAdd = {
      id: 5,
      name: 'king',
      social: {
        Facebook: 'sdsada',
        Google: 'dada',
        Line: 'dasda'
      }
    };

    this.appService.addTestM(jsonAdd).subscribe(result => {
      console.log('add data success', result);
    });
  }

  setMessage(c: AbstractControl): void {
    this.nameValidationMessage = '';
    if (c.errors && (c.touched || c.dirty)) {
      this.nameValidationMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

}

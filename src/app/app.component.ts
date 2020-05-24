import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gtest';
  customerForm: FormGroup;
  constructor(private appService: AppServiceService, private custFb: FormBuilder) { }

  save() {
    console.log(this.customerForm);
  }

  ngOnInit(): void {
    const customId = Math.floor(Math.random() * 100) + 1;

    this.customerForm = this.custFb.group({
      id: '',
      name: ''
    });


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

}

import { Component, OnInit } from '@angular/core';
import {ProductService } from 'src/app/services/product.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  submitted: boolean= false;
  userForm: any;
  
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      "remaining_quantity": ["", Validators.required],
      "title": ["", Validators.required],
      "mrp": ["", Validators.required],
      "selling_price": ["", Validators.required],
      "delivery_fee": ["", Validators.required],
    });
  
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.productService.addProduct(this.userForm.value)
      .subscribe( data => {
        this.toastr.success("success", data.toString());
        this.router.navigate(['products']);
      });

    
  }

  Cancel()
  {
    this.router.navigate(['products']);
  }

}

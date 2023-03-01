import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product/product.service';
import { ShareProductService } from '../services/share-product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: Product | undefined;
  productFormGroup: FormGroup;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private router: Router, private sharedProductService: ShareProductService) {

    this.productFormGroup = this.fb.group({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      price: new FormControl(0, [Validators.required, Validators.min(0.1)])
    })

  }

  ngOnInit(): void {
    this.getProduct();
  }

  public getProduct(): void {
    this.sharedProductService.getProduct().subscribe({
      next: (data => {

        if (data.name != '') {
          this.product = data;
        }

        if (this.product != undefined) {
          this.productFormGroup = this.fb.group({
            id: new FormControl(this.product.id, [Validators.required]),
            name: new FormControl(this.product.name, [Validators.required, Validators.minLength(3)]),
            price: new FormControl(this.product.price, [Validators.required, Validators.min(0.1)])
          })
        } else
          this.router.navigateByUrl('nav/products');
      })
    });
  }

  public updateProduct() {
    let product: Product = {
      id: this.productFormGroup.value.id,
      name: this.productFormGroup.value.name,
      price: this.productFormGroup.value.price
    };
    this.productService.update(product).subscribe();
    alert("Product updated!")
    this.router.navigateByUrl('nav');
  }
}

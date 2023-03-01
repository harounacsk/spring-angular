import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product/product.service';
import { ShareProductService } from '../services/share-product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] | undefined;
  dtOptions: DataTables.Settings = {};
  displayTable: boolean = false;

  constructor(private productService: ProductService, private shareProductService: ShareProductService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        search: "Suchen:",
        lengthMenu: "Anzeige _MENU_ Produkte",
        info: "Anzeige  _START_ bis _END_ von _TOTAL_ Produkten",
        infoPostFix: "",
        paginate: {
          first: "Erste",
          previous: "Zurück",
          next: "Weiter",
          last: "Letzte"
        }
      }
    };
    this.loadProducts();

  }


  public loadProducts(): void {
    this.productService.findAll().subscribe({
      next: (data => {
        this.products = data;
        this.displayTable = true;
      })
    });
  }

  loadSelectedProduct(product: Product) {
    this.shareProductService.setProduct(product);

  }
  public delete(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productService.delete(id).subscribe();
      this.displayTable = false;
      this.products = this.products?.filter(p => p.id != id);
      this.displayTable = true;
    }
  }

}

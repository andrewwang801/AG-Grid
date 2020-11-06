import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {


  // row data and column definitions
  public products: Product[];
  public columnDefs: ColDef[];

  // gridApi and columnApi
  private api: GridApi;
  private columnApi: ColumnApi;

  constructor(private productService: ProductService, private router: Router,private toastr: ToastrService) {
    this.columnDefs = this.createColumnDefs();
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
      }
    )
  }

  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space
  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  }

  // create column definitions
  private createColumnDefs() {
    return [
      { headerName: 'ID', field: 'id', filter: true, enableSorting: true, editable: true, sortable: true },
      { headerName: 'Remaining Quantity', field: 'remaining_quantity', filter: true, enableSorting: true, editable: true, sortable: true },
      { headerName: 'Title', field: 'title', filter: true, editable: true, sortable: true },
      { headerName: 'Mrp', field: 'mrp', filter: true, sortable: true, editable: true},
      { headerName: 'Selling Price', field: 'selling_price', filter: true, editable: true, sortable: true },
      { headerName: 'Delivery Fee', field: 'delivery_fee', filter: true, editable: true }
    ]
  }

  status: any;

  //Update product
  editProduct() {
debugger;
   const d=this.api.getEditingCells();

    if (this.api.getSelectedRows().length == 0) {
      this.toastr.error("error", "Please select a Product for update");
      return;
    }
    var row = this.api.getSelectedRows();

    this.productService.updateProduct(row[0]).subscribe(data => {
      this.toastr.success("success",data);
      this.ngOnInit();
      });
  }

  //Delete Product
  deleteProduct() {
    debugger;
    var selectedRows = this.api.getSelectedRows();

    if (selectedRows.length == 0) {
      this.toastr.error("error", "Please select a Product for deletion");
      return;
    }
    this.productService.deleteProduct(selectedRows[0].id).subscribe(data =>{
      this.toastr.success("success",data);
      this.ngOnInit();
      this.api.refreshRows(null);
    });
  }

  Add()
  {
    this.router.navigate(['addProduct']);
  }

}


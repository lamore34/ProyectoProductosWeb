import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsHomeComponent } from '../apps/products-home/products-home.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductsHomeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}

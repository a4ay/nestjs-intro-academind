import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number): string {
    const product = new Product(
      new Date().toString(),
      title,
      description,
      price,
    );
    this.products.push(product);
    return product.id;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(prodId): Product {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  findProduct(prodId): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === prodId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return [product, productIndex];
  }
}

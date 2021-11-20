import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): string {
    const prodId = this.productService.insertProduct(title, description, price);

    return prodId;
  }

  @Get()
  products(): Product[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  product(@Param('id') prodId: string) {
    return this.product(prodId);
  }
}

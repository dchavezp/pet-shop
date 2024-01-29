import { PetProductModel } from '@/domain/model';
import { PetProductRepository } from '@/domain/repositories';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class DataBasePetProductRepository implements PetProductRepository {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async uploadProductImage(
    image: Express.Multer.File,
    productId: string,
  ): Promise<void> {
    const { url } = await this.cloudinary.uploadImage(image);
    await this.prisma.petProduct.update({
      where: { id: productId },
      data: { ProductImage: { create: { pathImage: url } } },
    });
  }

  async add(data: PetProductModel): Promise<PetProductModel> {
    const petProduct = await this.prisma.petProduct.create({ data });
    return { ...petProduct, price: Number(petProduct.price) };
  }
  async findAll(): Promise<PetProductModel[]> {
    const petProductList = await this.prisma.petProduct.findMany();
    return petProductList.map((petProduct) => ({
      ...petProduct,
      price: Number(petProduct.price),
    }));
  }
  async findById(id: string): Promise<PetProductModel> {
    const petProduct = await this.prisma.petProduct.findFirst({
      where: { id },
    });
    return { ...petProduct, price: Number(petProduct?.price) };
  }
  async update(data: PetProductModel): Promise<PetProductModel> {
    const petProduct = await this.prisma.petProduct.update({
      where: { id: data.id },
      data,
    });
    return { ...petProduct, price: Number(petProduct.price) };
  }
  async deleteById(id: string): Promise<PetProductModel> {
    const petProduct = await this.prisma.petProduct.delete({ where: { id } });
    return { ...petProduct, price: Number(petProduct.price) };
  }
}

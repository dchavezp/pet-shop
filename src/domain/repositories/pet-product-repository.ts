import { PetProductModel } from '../model/pet-product.model';

export interface PetProductRepository {
  add(data: PetProductModel): Promise<PetProductModel>;
  findAll(): Promise<PetProductModel[]>;
  findById(id: string): Promise<PetProductModel>;
  update(data: PetProductModel): Promise<PetProductModel>;
  deleteById(id: string): Promise<PetProductModel>;
  uploadProductImage(
    image: Express.Multer.File,
    productId: string,
  ): Promise<void>;
}

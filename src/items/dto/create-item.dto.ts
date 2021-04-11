import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  collectionId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

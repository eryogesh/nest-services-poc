import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  groupId: string;
}

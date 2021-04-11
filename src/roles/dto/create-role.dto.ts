import { IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/shared/models/role.enum';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  groupId: string;
}

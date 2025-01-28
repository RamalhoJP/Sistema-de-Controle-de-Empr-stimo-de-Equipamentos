import { User } from "../entities/user.entity";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4, { message: "A senha deve ter pelo menos 4 caracteres" })
  @MaxLength(20, { message: "A senha deve ter no máximo 20 caracteres" })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "A senha deve conter pelo menos uma letra maiúscula (A-Z), uma letra minúscula (a-z), um número (0-9) ou caractere especial (@, #, $, etc.), e ter entre 4 e 20 caracteres.",
  })
  password: string;

  @IsString()
  name: string;
}

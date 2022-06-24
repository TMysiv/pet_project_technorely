import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {

  @ApiProperty({example:'qwerty@gmail.com'})
  email: string;

  @ApiProperty({example:'12345678'})
  password: string;
}

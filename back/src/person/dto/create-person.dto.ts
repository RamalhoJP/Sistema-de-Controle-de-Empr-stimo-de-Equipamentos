import { CreateAddressDto } from "src/address/dto/create-address.dto";

export class CreatePersonDto {
  name: string;
  phoneNumber: string;
  address: CreateAddressDto;
}

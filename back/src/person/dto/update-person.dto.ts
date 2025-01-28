import { PartialType } from "@nestjs/mapped-types";
import { CreatePersonDto } from "./create-person.dto";
import { CreateAddressDto } from "src/address/dto/create-address.dto";

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  name?: string;
  phoneNumber?: string;
  address?: CreateAddressDto;
}

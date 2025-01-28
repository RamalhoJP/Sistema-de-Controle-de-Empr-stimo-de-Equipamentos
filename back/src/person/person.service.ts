import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const { address, ...personData } = createPersonDto;

      // Criar pessoa e endereço ao mesmo tempo
      return await this.prisma.person.create({
        data: {
          ...personData,
          address: {
            create: address, // Relacionamento 1:1 com o endereço
          },
        },
        include: {
          address: true,
        },
      });
    } catch {
      throw new BadRequestException("Erro ao criar a pessoa. Verifique os dados fornecidos.");
    }
  }

  async findAll() {
    try {
      return await this.prisma.person.findMany({
        include: { address: true },
      });
    } catch {
      throw new BadRequestException("Erro ao buscar as pessoas.");
    }
  }

  async findOne(id: number) {
    try {
      const person = await this.prisma.person.findUnique({
        where: { id },
        include: {
          address: true,
        },
      });

      if (!person) {
        throw new NotFoundException("Pessoa não encontrada.");
      }

      return person;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Erro ao buscar a pessoa.");
    }
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    try {
      const { address, ...personData } = updatePersonDto;

      // Atualizar pessoa e endereço
      return await this.prisma.person.update({
        where: { id },
        data: {
          ...personData,
          address: {
            update: address,
          },
        },
        include: {
          address: true,
        },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException("Pessoa não encontrada para atualização.");
      }
      throw new BadRequestException("Erro ao atualizar a pessoa. Verifique os dados fornecidos.");
    }
  }

  async remove(id: number) {
    try {
      const person = await this.prisma.person.findUnique({ where: { id } });

      if (!person) {
        throw new NotFoundException("Pessoa não encontrada.");
      }

      // Remover a pessoa
      await this.prisma.person.delete({ where: { id } });

      return { message: "Pessoa removida com sucesso." };
    } catch {
      throw new BadRequestException("Erro ao remover a pessoa.");
    }
  }
}

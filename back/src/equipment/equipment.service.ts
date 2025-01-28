import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateEquipmentDto } from "./dto/create-equipment.dto";
import { UpdateEquipmentDto } from "./dto/update-equipment.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    try {
      return await this.prisma.equipment.create({
        data: { ...createEquipmentDto, status: "Disponível" },
      });
    } catch {
      throw new BadRequestException("Erro ao criar o equipamento. Verifique os dados fornecidos.");
    }
  }

  async findAll() {
    return await this.prisma.equipment.findMany();
  }

  async findOne(id: number) {
    const equipment = await this.prisma.equipment.findUnique({ where: { id } });

    if (!equipment) {
      throw new NotFoundException("Equipamento não encontrado.");
    }

    return equipment;
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    // Verifica se o equipamento existe antes de atualizar
    const equipment = await this.prisma.equipment.findUnique({ where: { id } });

    if (!equipment) {
      throw new NotFoundException("Equipamento não encontrado.");
    }

    try {
      return await this.prisma.equipment.update({
        data: { ...updateEquipmentDto },
        where: { id },
      });
    } catch {
      throw new BadRequestException("Erro ao atualizar o equipamento. Verifique os dados fornecidos.");
    }
  }

  async remove(id: number) {
    // Verifica se o equipamento existe antes de remover
    const equipment = await this.prisma.equipment.findUnique({ where: { id } });

    if (!equipment) {
      throw new NotFoundException("Equipamento não encontrado.");
    }

    try {
      return await this.prisma.equipment.delete({ where: { id } });
    } catch {
      throw new BadRequestException("Erro ao remover o equipamento. Verifique se ele está associado a outros registros.");
    }
  }
}

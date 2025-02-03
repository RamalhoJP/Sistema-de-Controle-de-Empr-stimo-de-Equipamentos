import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { CreateBorrowDto } from "./dto/create-borrow.dto";
import { UpdateBorrowDto } from "./dto/update-borrow.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BorrowService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBorrowDto: CreateBorrowDto) {
    try {
      return await this.prisma.$transaction(async prisma => {
        const equipment = await prisma.equipment.findUnique({
          where: { id: createBorrowDto.equipmentId },
        });

        if (!equipment) {
          throw new NotFoundException("Equipamento não encontrado.");
        }

        if (equipment.status === "Emprestado") {
          throw new BadRequestException("Equipamento já está emprestado.");
        }

        const isReturned = !!createBorrowDto.actualReturnDate;
        const borrowStatus = isReturned ? "Devolvido" : "EmAndamento";
        const equipmentStatus = isReturned ? "Disponível" : "Emprestado";

        await prisma.equipment.update({
          where: { id: createBorrowDto.equipmentId },
          data: { status: equipmentStatus },
        });

        return prisma.borrow.create({
          data: {
            ...createBorrowDto,
            status: borrowStatus,
          },
          include: { person: true, equipment: true },
        });
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException("Erro ao criar o empréstimo.");
    }
  }

  async findAll() {
    try {
      return await this.prisma.borrow.findMany({
        include: { person: true, equipment: true },
      });
    } catch {
      throw new BadRequestException("Erro ao buscar os empréstimos.");
    }
  }

  async findOne(id: number) {
    try {
      const borrow = await this.prisma.borrow.findUnique({
        where: { id },
        include: { person: true, equipment: true },
      });

      if (!borrow) {
        throw new NotFoundException("Empréstimo não encontrado.");
      }

      return borrow;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException("Erro ao buscar o empréstimo.");
    }
  }

  async update(id: number, updateBorrowDto: UpdateBorrowDto) {
    try {
      const borrow = await this.prisma.borrow.findUnique({ where: { id } });

      if (!borrow) {
        throw new NotFoundException("Empréstmo não encontrado.");
      }

      const isReturned = !!updateBorrowDto.actualReturnDate;
      const borrowStatus = isReturned ? "Devolvido" : borrow.status;
      const equipmentStatus = isReturned ? "Disponível" : undefined;

      return await this.prisma.$transaction(async prisma => {
        if (isReturned) {
          await prisma.equipment.update({
            where: { id: borrow.equipmentId },
            data: { status: equipmentStatus },
          });
        }

        return prisma.borrow.update({
          where: { id },
          data: {
            ...updateBorrowDto,
            status: borrowStatus,
          },
          include: { person: true, equipment: true },
        });
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Erro ao atualizar o empréstimo.");
    }
  }

  async remove(id: number) {
    try {
      // Verificar se o empréstimo existe
      const borrow = await this.prisma.borrow.findUnique({ where: { id } });

      if (!borrow) {
        throw new NotFoundException("Empréstimo não encontrado.");
      }

      // Atualizar status do equipamento para "Disponível"
      await this.prisma.$transaction(async prisma => {
        await prisma.equipment.update({
          where: { id: borrow.equipmentId },
          data: { status: "Disponível" },
        });

        // Excluir o empréstimo
        await prisma.borrow.delete({ where: { id } });
      });

      return { message: "Empréstimo removido com sucesso." };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException("Erro ao remover o empréstimo.");
    }
  }
}

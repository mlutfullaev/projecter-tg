import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JWTUser } from '../common/decorators/current-user.decorator';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProjectDto, user: JWTUser) {
    return this.prisma.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        createdBy: {
          connect: { id: user.userId },
        },
        projectAccess: {
          create: {
            user: {
              connect: { id: user.userId },
            },
          },
        },
      },
    });
  }

  async findAll(user: JWTUser) {
    const accesses = await this.prisma.projectAccess.findMany({
      where: { userId: user.userId },
      include: {
        project: true,
      },
    });

    return accesses.map((a) => a.project);
  }

  async findOne(id: string, userId: string) {
    const access = await this.prisma.projectAccess.findFirst({
      where: {
        userId,
        projectId: id,
      },
    });

    if (!access) {
      throw new ForbiddenException('You do not have access to this project');
    }

    return this.prisma.project.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });
  }

  async update(id: string, dto: UpdateProjectDto, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project || project.createdById !== userId) {
      throw new ForbiddenException('You are not the owner of this project');
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  async remove(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project || project.createdById !== userId) {
      throw new ForbiddenException('You are not the owner of this project');
    }

    return this.prisma.project.delete({ where: { id } });
  }
}

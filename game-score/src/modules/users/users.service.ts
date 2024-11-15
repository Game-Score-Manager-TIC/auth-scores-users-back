import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.services';
import { hash, compare } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationQueryDto } from '../commons/paginationQueryDto';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';


export interface Paginator<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {
    // this.generateMockData()
  }

  // private async generateMockData(): Promise<void> {
  //   const roles = await this.prisma.role.findMany();

  //   for (let i = 0; i < 1000; i++) {
  //     const role = faker.helpers.arrayElement(roles); // Obtener un rol aleatorio

  //     const userData = {
  //       email: faker.internet.email(),
  //       name: `${faker.person.firstName()} ${faker.person.lastName()}`,
  //       password: await hash("holaMundo", 10),
  //       avatar: faker.image.avatar(),
  //       status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE', 'BLOCKED']), // Enum aleatorio de Status
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     };

  //     await this.prisma.user.create({
  //       data: {
  //         ...userData,
  //         roles: {
  //           connect: [{ id: role.id }], // Asigna un rol aleatorio
  //         },
  //       },
  //     });
  //   }
  // }


  async createUser(body: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está en uso');
    }

    let roles = []
    for (const [key, value] of Object.entries(body?.roles)) {
      const role = await this.prisma.role.findUnique({
        where: {
          name: value.toString()
        }
      });
      roles.push({ id: role?.id })
    }
    const pass = await hash(body.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: pass,
        roles: {
          connect: roles
        }
      }
    })

    return this.getUserById(user.userId)
  }

  async getUserById(userId: string) {
    let userItem = await this.prisma.user.findUnique({
      where: {
        userId,
        OR: [
          {
            status: "ACTIVE",
          },
          {
            status: "BLOCKED",
          }
        ]
      },
      select: {
        name: true,
        email: true,
        avatar: true,
        userId: true,
        status: true,
        roles: {
          select: {
            name: true,
          }
        }
      }
    });

    let roles = []
    for (const [key, value] of Object.entries(userItem?.roles)) {
      roles.push(value?.name);
    }

    userItem.roles = roles;

    return userItem;

  }

  async updateUserById(userId: string, file: any, data: any) {
    const updateUser = await this.prisma.user.update({
      where: { userId },
      data: {
        name: data.name,
        avatar: file.filename,
      }
    })

    return this.getUserById(updateUser.userId)
  }

  async getAllUsers(paginationQuery: PaginationQueryDto): Promise<Paginator> {
    const { limit, page, query } = paginationQuery;

    const limitNumber = Number(limit);
    const pageNumber = Number(page);
    const skip = (pageNumber - 1) * limitNumber;

    // Condición base de búsqueda
    const whereCondition: any = {};

    // Si hay un query, buscamos en nombre y correo
    if (query) {
      whereCondition.OR = [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Si no hay query, buscamos solo por status (esto es opcional si se desea filtrar por estado sin buscar texto)
    if (!query) {
      whereCondition.OR = [
        {
          status: {
            in: ['ACTIVE', 'BLOCKED'],
          },
        },
      ];
    }

    // Obtener los usuarios con paginación y filtro de búsqueda
    const users = await this.prisma.user.findMany({
      where: whereCondition,
      select: {
        name: true,
        email: true,
        avatar: true,
        userId: true,
        status: true,
        roles: {
          select: {
            name: true,
          },
        },
      },
      take: limitNumber,
      skip: skip,
    });


    // Contar el total de usuarios que cumplen con el criterio
    const total = await this.prisma.user.count({
      where: whereCondition,
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(total / limitNumber);

    // Convertir roles de objeto a array de strings
    const formattedUsers = users.map((user) => ({
      ...user,
      roles: user.roles.map((role) => role.name),
    }));

    // Retornar los datos con paginación
    return {
      data: formattedUsers,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages,
    };
  }


  async validateUser(email: string, password: string) {
    let userItem = await this.prisma.user.findUnique({
      where: {
        email,
        OR: [
          {
            status: "ACTIVE",
          },
          {
            status: "BLOCKED",
          }
        ]
      },
      select: {
        email: true,
        password: true,
        userId: true,
        roles: {
          select: {
            name: true,
          }
        }
      },
    });


    let roles = [];
    for (const [key, value] of Object.entries(userItem?.roles)) {
      roles.push(value?.name);
    }

    userItem.roles = roles;
    const user = {
      email: userItem.email,
      roles: userItem.roles,
      sub: userItem.userId
    };

    if (userItem && compare(password, userItem.password)) {
      return user;
    }
    return null;
  }

  async downloadImage(userId: string, res: Response) {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.avatar) {
      throw new ConflictException('El usuario no tiene un avatar asignado');
    }

    const filePath = join(__dirname, '..', '..', '..', 'uploads', user.avatar);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('El archivo de avatar no existe');
    }

    const avatarBase64 = fs.readFileSync(filePath, { encoding: 'base64' });

    return res.json({ ...user, avatar: avatarBase64 });
  }

  async deleteUserById(userId: string) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.prisma.user.update({
      where: { userId },
      data: {
        status: 'INACTIVE',
      },
    });
  }
  async changedUserStatusById(userId: string) {
    const user = await this.getUserById(userId)

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const changeUserStatus = await this.prisma.user.update({
      where: { userId },
      data: {
        status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
      }
    })

    return this.getUserById(changeUserStatus.userId)
  }
}
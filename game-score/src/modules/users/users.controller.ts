import { Controller, Delete, Patch, HttpCode, Get, Post, Put, Param, Body, HttpStatus, Query, UseGuards, UseInterceptors, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationQueryDto } from '../commons/paginationQueryDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request, Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los jugadors' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de jugadors' })
  getAllUsers(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.getAllUsers(paginationQuery);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un jugador' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Jugador creado' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'El email ya está en uso' })
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Put(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PLAYER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un jugador' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary'
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'El jugador ha sido actulizado!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario no encontado!' })
  @UseInterceptors(
    FileInterceptor(
      'file', {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        }
      }),
      limits: { fileSize: 1024 * 1024 * 2 } // 2Mb
    }),
  )
  updateUser(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    return this.usersService.updateUserById(userId, file, request.body);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PLAYER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un jugador por ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Jugador encontrado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario no encontrado!' })
  getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Get(':userId/download-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PLAYER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Descargar la imagen y la información para un jugador' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Descarga en detalle con la imagen del jugador' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario no encontrado!' })
  @HttpCode(HttpStatus.OK) 
  async downloadImage(@Param('userId') userId: string, @Res({ passthrough: true }) res: Response) {
    return await this.usersService.downloadImage(userId, res);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un jugador por ID' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario no encontrado!' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'El jugador ha sido eliminado!' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('userId') userId: string) {
    await this.usersService.deleteUserById(userId);
  }

  @Patch(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar el status de un jugador por ID' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario no encontrado!' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'El status del jugador ha sido cambiado!' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async changedUserStatusById(@Param('userId') userId: string) {
    return this.usersService.changedUserStatusById(userId);
  }
}
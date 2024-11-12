import { Controller, Post, Body, HttpStatus, Get, Req, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export interface User {
  email: string;
  password: string;
  id: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Ingresar un jugador' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Jugador con logueado correctamente!' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'data equivocada' })
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Get('token-validate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Validar token' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Validar token de usuario' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'data equivocada' })
  validateToken(@Req() req: Request) {
    const [type, token] = req.headers?.authorization?.split(' ') ?? [];
    return this.authService.validateToken(token);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión del usuario' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Sesión cerrada' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado' })
  async logout(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    if (token) {
        await this.authService.logout(token);
        return { message: 'Sesión cerrada exitosamente' };
    } else {
        return { statusCode: HttpStatus.UNAUTHORIZED, message: 'Token no válido' };
    }
  }
} 

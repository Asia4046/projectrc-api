import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {

        console.log({
            user: req.user,
        });
        
        return({
            server: 'NestJS Test Server Running on AWS',
            version: 'os_prod_linux_1.0.001-alpha',
            status: 200
        })
    }
}

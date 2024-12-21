import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
    @Get('me')
    getMe() {
        return({
            server: 'NestJS Test Server Running on AWS',
            version: 'os_prod_linux_1.0.001-alpha',
            status: 200
        })
    }
}

import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get('')
  home() {
    return {
      MSG: 'Welcome Traveller!!',
      API_NAME: 'PROJECT_RC_10_API',
      API_ID: '4352433346',
      API_VERSION: '0.0.1-alpha',
      Status: 'Online',
      Progress: 'In Dev',
      Author: 'Nilesh',
      Author_Github: 'https://github.com/Asia4046/',
    };
  }
}

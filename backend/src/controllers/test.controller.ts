import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { validationMiddleware } from '@middlewares/validation.middleware';

@Controller()
export class TestController {
  //public testService = new userService();

  @Get('/test')
  @OpenAPI({ summary: 'test api' })
  async test() {
    //const findAllUsersData: User[] = await this.userService.findAllUser();
    return { data: "test", message: 'findAll' };
  }

  
}

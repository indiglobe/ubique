import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { read__OneUserSchema } from '@repo/data/validators/users';
import { z } from 'zod';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getOneUsers(
    @Param('id') id: string,
    @Query('selectedFields')
    selectedFields?: z.infer<typeof read__OneUserSchema>['selectedFields'],
  ) {
    console.log(selectedFields);
    return this.userService.getOneUsersById({ userId: id });
  }
}

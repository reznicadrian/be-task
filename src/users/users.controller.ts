import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminGuard } from '../auth/guards/admin.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetByIdDto } from '../common/dto/get-by-id.dto';

@ApiTags('Users')
@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @Get(':id')
  async findOne(@Param() params: GetByIdDto) {
    return await this.usersService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Update a user by id' })
  @Patch(':id')
  update(@Param() params: GetByIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by id' })
  @Delete(':id')
  remove(@Param() params: GetByIdDto) {
    return this.usersService.remove(params.id);
  }
}

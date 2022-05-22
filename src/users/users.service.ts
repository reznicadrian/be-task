import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User, UserType } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create<User>({
      ...createUserDto,
    });
  }

  register(createUserDto: RegisterDto): Promise<User> {
    return this.userModel.create<User>({
      ...createUserDto,
      type: UserType.BLOGGER,
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll<User>();
  }

  async findOne(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const [, [updatedUser]] = await this.userModel.update(
      { ...updateUserDto },
      { where: { id }, returning: true },
    );

    return updatedUser;
  }

  remove(id: number) {
    return this.userModel.destroy<User>({ where: { id } });
  }
}
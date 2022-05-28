import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from '../common/pagination/page-options.dto';
import { PageDto } from '../common/pagination/page.dto';
import { PageMetaDto } from '../common/pagination/page-meta.dto';

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
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const { rows, count } = await this.userModel.findAndCountAll({
      order: [['created_at', pageOptionsDto.order]],
      limit: pageOptionsDto.take,
      offset: pageOptionsDto.skip,
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto,
    });

    return new PageDto(rows, pageMetaDto);
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne<User>({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne<User>({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const [, [updatedUser]] = await this.userModel.update<User>(
      { ...updateUserDto },
      { where: { id }, returning: true },
    );

    return updatedUser;
  }

  remove(id: number) {
    return this.userModel.destroy<User>({ where: { id } });
  }
}

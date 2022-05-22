import {
  Column,
  Table,
  DataType,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

import { Post } from '../../posts/entities/post.entity';
import { BaseModel } from '../../common/sequelize/base-model';
import { UserType } from '../../types/users.types';

@Table
export class User extends BaseModel<User> {
  @Column({
    type: DataType.ENUM,
    values: Object.values(UserType),
    defaultValue: UserType.BLOGGER,
    allowNull: false,
    validate: {
      isIn: [Object.values(UserType)],
    },
  })
  type: UserType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Post)
  posts: Post[];

  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
  }
}

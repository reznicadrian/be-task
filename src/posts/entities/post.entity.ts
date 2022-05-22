import {
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { BaseModel } from '../../common/sequelize/base-model';

@Table
export class Post extends BaseModel<Post> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_hidden',
    allowNull: false,
    defaultValue: false,
  })
  isHidden: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

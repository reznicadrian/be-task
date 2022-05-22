import { Column, Model, Table, DataType } from 'sequelize-typescript';

export enum UserType {
  ADMIN = 'admin',
  BLOGGER = 'blogger',
}

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

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

  @Column({
    type: DataType.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}

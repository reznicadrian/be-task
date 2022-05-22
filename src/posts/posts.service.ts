import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  create(createPostDto: CreatePostDto, me: User): Promise<Post> {
    return this.postModel.create<Post>({
      ...createPostDto,
      userId: me.id,
    });
  }

  findAll(me: User): Promise<Post[]> {
    return this.postModel.findAll<Post>({ where: { userId: me.id } });
  }

  findOne(id: number, me: User) {
    return this.postModel.findOne({
      where: {
        userId: me.id,
        id,
      },
    });
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    me: User,
  ): Promise<Post> {
    const [, [updatedPost]] = await this.postModel.update<Post>(
      { ...updatePostDto },
      { where: { userId: me.id, id }, returning: true },
    );

    return updatedPost;
  }

  remove(id: number, me: User) {
    return this.postModel.destroy<Post>({ where: { userId: me.id, id } });
  }
}

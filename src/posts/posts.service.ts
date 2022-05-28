import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { literal } from 'sequelize';
import { PageOptionsDto } from '../common/pagination/page-options.dto';
import { PageDto } from '../common/pagination/page.dto';
import { PageMetaDto } from '../common/pagination/page-meta.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  findAllPublic(): Promise<Post[]> {
    return this.postModel.findAll<Post>({ where: { isHidden: true } });
  }

  findOnePublic(id: number): Promise<Post> {
    return this.postModel.findOne({ where: { id, isHidden: true } });
  }

  create(createPostDto: CreatePostDto, me: User): Promise<Post> {
    return this.postModel.create<Post>({
      ...createPostDto,
      userId: me.id,
    });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    me: User,
  ): Promise<PageDto<Post>> {
    const { rows, count } = await this.postModel.findAndCountAll<Post>({
      where: { userId: me.id },
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

  findOne(id: number): Promise<Post> {
    return this.postModel.findOne({
      where: {
        id,
      },
    });
  }

  async toggleHidden(id: number): Promise<Post> {
    const [, [updatedPost]] = await this.postModel.update<Post>(
      { isHidden: literal('NOT is_hidden') },
      { where: { id }, returning: true },
    );
    return updatedPost;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const [, [updatedPost]] = await this.postModel.update<Post>(
      { ...updatePostDto },
      { where: { id }, returning: true },
    );

    return updatedPost;
  }

  remove(id: number) {
    return this.postModel.destroy<Post>({ where: { id } });
  }
}

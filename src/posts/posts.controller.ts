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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetByIdDto } from '../common/dto/get-by-id.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { Me } from '../common/decorators/me.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Posts')
@UseGuards(AuthenticatedGuard)
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a post' })
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Me() me: User) {
    return this.postsService.create(createPostDto, me);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @Get()
  findAll(@Me() me: User) {
    return this.postsService.findAll(me);
  }

  @ApiOperation({ summary: 'Get one post by id' })
  @Get(':id')
  findOne(@Param() params: GetByIdDto, @Me() me: User) {
    return this.postsService.findOne(params.id, me);
  }

  @ApiOperation({ summary: 'Update one post by id' })
  @Patch(':id')
  update(
    @Param() params: GetByIdDto,
    @Body() updatePostDto: UpdatePostDto,
    @Me() me: User,
  ) {
    return this.postsService.update(params.id, updatePostDto, me);
  }

  @ApiOperation({ summary: 'Delete one post by id' })
  @Delete(':id')
  remove(@Param() params: GetByIdDto, @Me() me: User) {
    return this.postsService.remove(params.id, me);
  }
}

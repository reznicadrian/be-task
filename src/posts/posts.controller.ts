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
import { MyPostGuard } from '../auth/guards/my-post.guard';

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
  findOne(@Param() params: GetByIdDto) {
    return this.postsService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Toggle one post by id' })
  @UseGuards(MyPostGuard)
  @Patch(':id')
  togglePost(@Param() params: GetByIdDto) {
    return this.postsService.toggleHidden(params.id);
  }

  @ApiOperation({ summary: 'Update one post by id' })
  @UseGuards(MyPostGuard)
  @Patch(':id')
  update(@Param() params: GetByIdDto, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(params.id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete one post by id' })
  @UseGuards(MyPostGuard)
  @Delete(':id')
  remove(@Param() params: GetByIdDto) {
    return this.postsService.remove(params.id);
  }
}

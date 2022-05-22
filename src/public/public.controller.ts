import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PostsService } from '../posts/posts.service';
import { GetByIdDto } from '../common/dto/get-by-id.dto';

@ApiTags('Public Posts')
@Controller('')
export class PublicController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Get all public posts' })
  @Get()
  findAll() {
    return this.postsService.findAllPublic();
  }

  @ApiOperation({ summary: 'Get one public post by id' })
  @Get(':id')
  findOne(@Param() params: GetByIdDto) {
    return this.postsService.findOnePublic(params.id);
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PostsService } from '../posts/posts.service';
import { GetByIdDto } from '../common/dto/get-by-id.dto';
import { PageOptionsDto } from '../common/pagination/page-options.dto';

@ApiTags('Public Posts')
@Controller('')
export class PublicController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Get all public posts' })
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.postsService.findAllPublic(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Get one public post by id' })
  @Get(':id')
  findOne(@Param() params: GetByIdDto) {
    return this.postsService.findOnePublic(params.id);
  }
}

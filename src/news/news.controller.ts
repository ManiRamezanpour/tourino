import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { News } from '@prisma/client';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsService } from './news.service';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto): Promise<News | null> {
    const news = await this.newsService.create(createNewsDto);
    if (!news)
      throw new HttpException('news not created !', HttpStatus.FORBIDDEN);
    throw new HttpException(
      { message: 'news created Success !', data: news },
      HttpStatus.OK,
    );
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.newsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';

@Injectable()
export class SuggestionService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSuggestionDto: CreateSuggestionDto) {
    // return this.prisma.userSuggestersPrograms.create({
    //   data: { userId: id, ...createSuggestionDto },
    // });
  }

  findAll() {
    return `This action returns all suggestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suggestion`;
  }

  update(id: number, updateSuggestionDto: UpdateSuggestionDto) {
    return `This action updates a #${id} suggestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} suggestion`;
  }
}

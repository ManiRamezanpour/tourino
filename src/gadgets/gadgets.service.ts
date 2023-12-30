import { Injectable } from '@nestjs/common';
@Injectable()
export class GadgetsService {
  create() {
    return 'This action adds a new gadget';
  }

  findAll() {
    return `This action returns all gadgets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gadget`;
  }

  update(id: number) {
    return `This action updates a #${id} gadget`;
  }

  remove(id: number) {
    return `This action removes a #${id} gadget`;
  }
}

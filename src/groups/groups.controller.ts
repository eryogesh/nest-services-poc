import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsSeedService } from './groups.seeder';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private groupsSeedService: GroupsSeedService,
  ) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }

  @Post('seed')
  async seedGroup() {
    return await this.groupsSeedService.seedGroups();
  }
}

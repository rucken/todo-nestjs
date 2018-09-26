import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiImplicitQuery,
  ApiResponse,
  ApiUseTags
} from '@nestjs/swagger';
import {
  AccessGuard,
  ParseIntWithDefaultPipe,
  Permissions,
  Roles
} from '@todo-nestjs/core';
import { plainToClass } from 'class-transformer';
import { InStatusDto } from '../dto/in-status.dto';
import { OutStatusDto } from '../dto/out-status.dto';
import { OutStatusesDto } from '../dto/out-statuses.dto';
import { Status } from '../entities/status.entity';
import { StatusesService } from '../services/statuses.service';

@ApiUseTags('statuses')
@ApiBearerAuth()
@Controller('/api/statuses')
@UseGuards(AccessGuard)
export class StatusesController {
  constructor(private readonly service: StatusesService) {}
  @Roles('isSuperuser')
  @Permissions('add_status')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: OutStatusDto,
    description: 'The record has been successfully created.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Post()
  async create(@Req() req, @Body() dto: InStatusDto) {
    try {
      return plainToClass(
        OutStatusDto,
        await this.service.create(
          {
            item: plainToClass(Status, dto)
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }
  @Roles('isSuperuser')
  @Permissions('change_status')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutStatusDto,
    description: 'The record has been successfully updated.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Put(':id')
  async update(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body() dto: InStatusDto
  ) {
    try {
      return plainToClass(
        OutStatusDto,
        await this.service.update(
          {
            id,
            item: plainToClass(Status, dto)
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }
  @Roles('isSuperuser')
  @Permissions('delete_status')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The record has been successfully deleted.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Delete(':id')
  async delete(@Req() req, @Param('id', new ParseIntPipe()) id) {
    try {
      return plainToClass(
        OutStatusDto,
        await this.service.delete(
          {
            id
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }
  @Roles('isSuperuser')
  @Permissions('read_status')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutStatusDto,
    description: ''
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Get(':id')
  async load(@Req() req, @Param('id', new ParseIntPipe()) id) {
    try {
      return plainToClass(
        OutStatusDto,
        await this.service.findById(
          {
            id
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }
  @Roles('isSuperuser')
  @Permissions('read_status')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutStatusesDto,
    description: ''
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Text for search (default: empty)'
  })
  @ApiImplicitQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Column name for sort (default: -id)'
  })
  @ApiImplicitQuery({
    name: 'per_page',
    required: false,
    type: Number,
    description: 'Number of results to return per page. (default: 10)'
  })
  @ApiImplicitQuery({
    name: 'cur_page',
    required: false,
    type: Number,
    description: 'A page number within the paginated result set. (default: 1)'
  })
  @ApiImplicitQuery({
    name: 'project',
    required: false,
    type: Number,
    description: 'Project id for filter data by project. (default: empty)'
  })
  @Get()
  async findAll(
    @Req() req,
    @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
    @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
    @Query('q') q,
    @Query('sort') sort,
    @Query('project') project
  ) {
    try {
      return plainToClass(
        OutStatusesDto,
        await this.service.findAll(
          {
            curPage,
            perPage,
            q,
            sort,
            project
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }
}

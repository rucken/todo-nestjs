import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  MethodNotAllowedException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req
} from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CORE_CONFIG_TOKEN, ICoreConfig, ParseIntWithDefaultPipe, Permissions, Roles } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { InProjectDto } from '../dto/in-project.dto';
import { OutProjectDto } from '../dto/out-project.dto';
import { OutProjectsDto } from '../dto/out-projects.dto';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../services/projects.service';

@ApiUseTags('projects')
@ApiBearerAuth()
@Controller('/api/projects')
export class ProjectsController {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    private readonly service: ProjectsService
  ) {}

  @Roles('isSuperuser')
  @Permissions('add_project')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: OutProjectDto,
    description: 'The record has been successfully created.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Post()
  async create(@Req() req, @Body() dto: InProjectDto) {
    try {
      return plainToClass(
        OutProjectDto,
        await this.service.create(
          {
            item: plainToClass(Project, dto)
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions('change_project')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutProjectDto,
    description: 'The record has been successfully updated.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Put(':id')
  async update(@Req() req, @Param('id', new ParseIntPipe()) id, @Body() dto: InProjectDto) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      return plainToClass(
        OutProjectDto,
        await this.service.update(
          {
            id,
            item: plainToClass(Project, dto)
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions('delete_project')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The record has been successfully deleted.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Delete(':id')
  async delete(@Req() req, @Param('id', new ParseIntPipe()) id) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      return plainToClass(
        OutProjectDto,
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

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutProjectDto,
    description: ''
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Get(':id')
  async findById(@Req() req, @Param('id', new ParseIntPipe()) id) {
    try {
      return plainToClass(
        OutProjectDto,
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

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutProjectsDto,
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
  @Get()
  async findAll(
    @Req() req,
    @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
    @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
    @Query('q') q,
    @Query('sort') sort
  ) {
    try {
      return plainToClass(
        OutProjectsDto,
        await this.service.findAll(
          {
            curPage,
            perPage,
            q,
            sort
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }
}

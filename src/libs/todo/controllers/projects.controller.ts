import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../../core/decorators/permissions.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { AccessGuard } from '../../core/guards/access.guard';
import { ParseIntWithDefaultPipe } from '../../core/pipes/parse-int-with-default.pipe';
import { InProjectDto } from '../dto/in-project.dto';
import { OutProjectDto } from '../dto/out-project.dto';
import { OutProjectsDto } from '../dto/out-projects.dto';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../services/projects.service';


@ApiUseTags('projects')
@ApiBearerAuth()
@Controller('/api/projects')
@UseGuards(AccessGuard)
export class ProjectsController {
    constructor(
        private readonly service: ProjectsService
    ) {

    }
    @Roles('isSuperuser')
    @Permissions('add_project')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED, type: OutProjectDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @Post()
    async create(
        @Req() req, 
        @Body() dto: InProjectDto
    ) {
        try {
            return plainToClass(
                OutProjectDto,
                await this.service.create({
                    item: plainToClass(Project, dto)
                }, req.user)
            );
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('change_project')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutProjectDto,
        description: 'The record has been successfully updated.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Put(':id')
    async update(
        @Req() req, 
        @Param('id', new ParseIntPipe()) id,
        @Body() dto: InProjectDto
    ) {
        try {
            return plainToClass(
                OutProjectDto,
                await this.service.update({
                    id: id,
                    item: plainToClass(Project, dto)
                }, req.user)
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
    async delete(
        @Req() req, 
        @Param('id', new ParseIntPipe()) id
    ) {
        try {
            return plainToClass(OutProjectDto,
                await this.service.delete({
                    id: id
                }, req.user)
            );
        } catch (error) {
            throw error;
        }
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutProjectDto,
        description: ''
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Get(':id')
    async load(
        @Req() req, 
        @Param('id', new ParseIntPipe()) id
    ) {
        try {
            return plainToClass(
                OutProjectDto,
                await this.service.load({
                    id: id
                }, req.user)
            );
        } catch (error) {
            throw error;
        }
    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutProjectsDto,
        description: ''
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitQuery({ name: 'q', required: false, type: String, description: 'Text for search (default: empty)' })
    @ApiImplicitQuery({ name: 'sort', required: false, type: String, description: 'Column name for sort (default: -id)' })
    @ApiImplicitQuery({
        name: 'per_page', required: false, type: Number,
        description: 'Number of results to return per page. (default: 10)'
    })
    @ApiImplicitQuery({
        name: 'cur_page', required: false, type: Number,
        description: 'A page number within the paginated result set. (default: 1)'
    })
    @Get()
    async loadAll(
        @Req() req, 
        @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
        @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
        @Query('q') q,
        @Query('sort') sort
    ) {
        try {
            return plainToClass(
                OutProjectsDto,
                await this.service.loadAll({
                    curPage: curPage,
                    perPage: perPage,
                    q: q,
                    sort: sort
                }, req.user)
            );
        } catch (error) {
            throw error;
        }
    }
}
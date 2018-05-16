import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../../core/decorators/permissions.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { AccessGuard } from '../../core/guards/access.guard';
import { ParseIntWithDefaultPipe } from '../../core/pipes/parse-int-with-default.pipe';
import { OutChangeDto } from '../dto/out-change.dto';
import { OutChangesDto } from '../dto/out-changes.dto';
import { Change } from '../entities/change.entity';
import { ChangesService } from '../services/changes.service';


@ApiUseTags('changes')
@ApiBearerAuth()
@Controller('/api/changes')
@UseGuards(AccessGuard)
export class ChangesController {
    constructor(
        private readonly service: ChangesService
    ) {

    }
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutChangeDto,
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
                OutChangeDto,
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
        status: HttpStatus.OK, type: OutChangesDto,
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
    @ApiImplicitQuery({
        name: 'project', required: false, type: Number,
        description: 'Project id for filter data by project. (default: empty)'
    })
    @Get()
    async loadAll(
        @Req() req, 
        @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
        @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
        @Query('q') q,
        @Query('sort') sort,
        @Query('project') project
    ) {
        try {
            return plainToClass(
                OutChangesDto,
                await this.service.loadAll({
                    curPage: curPage,
                    perPage: perPage,
                    q: q,
                    sort: sort,
                    project: project
                }, req.user)
            );
        } catch (error) {
            throw error;
        }
    }
}
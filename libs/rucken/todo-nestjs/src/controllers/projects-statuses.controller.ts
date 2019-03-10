import { Controller, Get, HttpCode, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { OutUsersDto, ParseIntWithDefaultPipe } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { ProjectsStatusesService } from '../services/projects-statuses.service';

@ApiUseTags('projects')
@ApiBearerAuth()
@Controller('/api/projects')
export class ProjectsStatusesController {
  constructor(private readonly service: ProjectsStatusesService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutUsersDto,
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
    name: 'projects',
    required: false,
    isArray: true,
    description: 'Projects in which to search. (default: [])'
  })
  @Get('statuses')
  async findAll(
    @Req() req,
    @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
    @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
    @Query('q') q,
    @Query('sort') sort,
    @Query('projects') projectsIds
  ) {
    try {
      return plainToClass(
        OutUsersDto,
        await this.service.findAll(
          {
            curPage,
            perPage,
            q,
            sort,
            projectsIds: projectsIds
              ? projectsIds
                  .split(',')
                  .filter(id => !isNaN(+id))
                  .map(id => +id)
              : []
          },
          req.user
        )
      );
    } catch (error) {
      throw error;
    }
  }
}

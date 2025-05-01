import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';
import {
  CurrentUser,
  JWTUser,
} from '../common/decorators/current-user.decorator';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: JWTUser,
  ) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: JWTUser) {
    return this.projectsService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: JWTUser) {
    return this.projectsService.findOne(id, user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: JWTUser,
  ) {
    return this.projectsService.update(id, updateProjectDto, user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: JWTUser) {
    return this.projectsService.remove(id, user.userId);
  }
}

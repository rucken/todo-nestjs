import { ChangesService } from "./changes.service";
import { ProjectsService } from "./projects.service";
import { StatusesService } from "./statuses.service";
import { TasksService } from "./tasks.service";

export const services = [
    ProjectsService,
    TasksService,
    StatusesService,
    ChangesService
]
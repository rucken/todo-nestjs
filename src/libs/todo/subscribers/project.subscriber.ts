import { plainToClass } from "class-transformer";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from "typeorm";
import { ContentType } from "../../core/entities/content-type.entity";
import { Change } from "../entities/change.entity";
import { Project } from "../entities/project.entity";

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<Project> {

    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return Project;
    }

    /**
     * Called before entity insertion.
     */
    async beforeRemove(event: RemoveEvent<Project>) {
        if (event.entity) {
            event.manager.getRepository<Change>(Change).save(
                plainToClass(Change, {
                    dataId: event.entity ? event.entity.id.toString() : null,
                    data: JSON.stringify(event.entity),
                    method: 'delete',
                    contentType: await event.manager.getRepository<ContentType>(ContentType).findOne({ name: 'project' }),
                    project: event.entity ? event.entity : null
                })
            )
        }
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<Project>) {
        if (event.entity) {
            event.manager.getRepository<Change>(Change).save(
                plainToClass(Change, {
                    dataId: event.entity.id.toString(),
                    data: JSON.stringify(event.entity),
                    method: 'add',
                    contentType: await event.manager.getRepository<ContentType>(ContentType).findOne({ name: 'project' }),
                    project: event.entity
                })
            )
        }
    }

    /**
     * Called after entity insertion.
     */
    async afterUpdate(event: UpdateEvent<Project>) {
        if (event.entity) {
            event.manager.getRepository<Change>(Change).save(
                plainToClass(Change, {
                    dataId: event.entity.id.toString(),
                    data: JSON.stringify(event.entity),
                    method: 'change',
                    contentType: await event.manager.getRepository<ContentType>(ContentType).findOne({ name: 'project' }),
                    project: event.entity
                })
            )
        }
    }

}
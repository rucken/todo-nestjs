import { InsertEvent, EntitySubscriberInterface, UpdateEvent, RemoveEvent, EventSubscriber } from "typeorm";
import { Change } from "../entities/change.entity";
import { plainToClass } from "class-transformer";
import { ContentType } from "../../core/entities/content-type.entity";
import { Project } from "../entities/project.entity";
import { Task } from "../entities/task.entity";

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {

    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return Task;
    }

    /**
     * Called before entity insertion.
     */
    async beforeRemove(event: RemoveEvent<Task>) {
        if (event.entity) {
            event.manager.getRepository<Change>(Change).save(
                plainToClass(Change, {
                    dataId: event.entity ? event.entity.id.toString() : null,
                    data: JSON.stringify(event.entity),
                    method: 'delete',
                    contentType: await event.manager.getRepository<ContentType>(ContentType).findOne({ name: 'task' }),
                    project: event.entity ? event.entity.project : null
                })
            )
        }
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<Task>) {
        if (event.entity) {
            event.manager.getRepository<Change>(Change).save(
                plainToClass(Change, {
                    dataId: event.entity.id.toString(),
                    data: JSON.stringify(event.entity),
                    method: 'add',
                    contentType: await event.manager.getRepository<ContentType>(ContentType).findOne({ name: 'task' }),
                    project: event.entity.project
                })
            )
        }
    }

    /**
     * Called after entity insertion.
     */
    async afterUpdate(event: UpdateEvent<Task>) {
        if (event.entity) {
            event.manager.getRepository<Change>(Change).save(
                plainToClass(Change, {
                    dataId: event.entity.id.toString(),
                    data: JSON.stringify(event.entity),
                    method: 'change',
                    contentType: await event.manager.getRepository<ContentType>(ContentType).findOne({ name: 'task' }),
                    project: event.entity.project
                })
            )
        }
    }

}
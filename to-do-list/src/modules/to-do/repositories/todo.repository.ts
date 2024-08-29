import { Injectable } from "@nestjs/common";
import { Between, Like, Repository } from "typeorm";
import { TodoEntity } from "../entities/todo.enentity";

@Injectable()
export class todoRepository extends Repository<TodoEntity> {
   async getOneById(id: string): Promise<TodoEntity> {
      const entity = await this.findOneBy({
         id
      })

      if (!entity) throw new Error("Item com esse id não existe")

      return entity
   }

   async list(params: {
      page: number,
      perPage: number,
      createdAt?: Date,
      dificult?: number,
      completed?: boolean,
      search?: string
   }): Promise<Array<TodoEntity>> {
      const where = {}
      if (params.createdAt) {
         const startOfDay = new Date(params.createdAt)
         startOfDay.setHours(0)
         startOfDay.setMinutes(0)
         startOfDay.setSeconds(0)
         startOfDay.setMilliseconds(0)

         const endOfDay = new Date()
         endOfDay.setHours(23)
         endOfDay.setMinutes(59)
         endOfDay.setSeconds(59)
         endOfDay.setMilliseconds(0)

         where['createdAt'] = Between(startOfDay,endOfDay)
      }
      if (params.dificult) {
         where['dificult'] = params.dificult
      }
      if (params.completed) {
         where['completed'] = params.completed
      }
      if (params.search) {
         where["text"] = Like(`%${params.search}%`)
      }

      const skip = (params.page - 1) * params.perPage

      const entities = await this.find({
         where,
         skip,
         order: {
            complete: "ASC",
            createdAt: "DESC"
         }
      })

      return entities
   }

   async registerItem(input: Partial<TodoEntity>): Promise<TodoEntity> {
      const entity = this.create(input)
      await this.save(entity)
      
      return entity
   }
}
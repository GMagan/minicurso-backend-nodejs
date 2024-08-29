import { Injectable } from "@nestjs/common";
import { todoRepository } from "./repositories/todo.repository";

@Injectable()
export class TodoService {
   constructor(private readonly todoRepository: todoRepository){
   }

   async createNewTodoItem(text:string, dificult: number){
      const data = {
         text
      }
      if (dificult <= 0) data["dificult"] = 0
      else if (dificult <= 25) data["dificult"] = 25
      else if (dificult <= 50) data["dificult"] = 50
      else if (dificult <= 75) data["dificult"] = 75
      else data["dificult"] = 100

      const entity = await this.todoRepository.registerItem(data)
      return entity
   }
}
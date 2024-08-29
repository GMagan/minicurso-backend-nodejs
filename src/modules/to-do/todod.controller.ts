import { Body, Controller, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoEntity } from "./entities/todo.enentity";

@Controller('todo')
export class TodoController {
   constructor(private readonly todoService: TodoService) {}

   @Post('create')
   async create(@Body() body: any): Promise<TodoEntity> {
      return await this.todoService.createNewTodoItem(body.text, body.dificult)
   }
}
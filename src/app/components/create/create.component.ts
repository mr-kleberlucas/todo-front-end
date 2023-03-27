import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false,
  }

  constructor(private service: TodoService, private router: Router) { }

  create(): void {
    this.formataData();
    // console.log(this.todo.dataParaFinalizar);
    this.service.create(this.todo).subscribe((resposta) => {
      if (resposta !== null) {
        this.service.message('To-do criado com sucesso!');
        this.router.navigate(['']);
      }
    }, (err) => {
      if (err !== null) {
        this.service.message('Falha ao criar To-do!');
        this.router.navigate(['']);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar);
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

}

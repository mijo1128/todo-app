import { ChangeDetectorRef, Component } from '@angular/core';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule,TaskItemComponent,AddTaskComponent,FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
 
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
  }

  deleteTask(task: Task) {
    this.taskService
    .deleteTask(task)
    .subscribe(()=>(this.tasks = this.tasks.filter(t => t.id !== task.id)));
  }

  addTask(task: Task) {
    console.log(task)
    this.taskService.addTask(task).subscribe((task)=> this.tasks.push(task));
    
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }


}

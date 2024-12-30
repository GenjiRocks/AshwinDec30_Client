import { Component } from '@angular/core';
import { StdserviceService } from '../stdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent {

  students:any[] = []

  constructor(private stdService : StdserviceService, private router:Router){}

  ngOnInit (){
    this.loadStudent()
  }

  loadStudent(){
    this.stdService.getStudents().subscribe({
      next: (data) => {
        this.students = data
        console.log(this.students)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addStudent(){
    this.router.navigate(['addStudent'])
  }

  deleteStudent(id:number){
    if(confirm('Do you wish to delete this Student?')){
      this.stdService.delStudent(id).subscribe({
        next: (data) => {
          this.loadStudent()
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }

  
  editStudent(id:number){
    this.router.navigate(['editStudent',id])
  }

}

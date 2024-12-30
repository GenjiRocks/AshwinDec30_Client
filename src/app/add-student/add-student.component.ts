import { Component } from '@angular/core';
import { StdserviceService } from '../stdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  student ={
    firstName : '',
    lastName : '',
    email : '',
    course:'',
    dob:'',
    image:''
  }
 
  selectedImage : File | null = null;

  constructor(private studentService : StdserviceService , private router:Router){}

  OnImageSelect(event : any){
    if(event.target.files && event.target.files.length > 0){
        
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage);
    }
  }

 addStudent(){
  const formData = new FormData();
  const dateofBirth = this.student.dob.toString()
  formData.append('firstName', this.student.firstName);
  formData.append('lastName', this.student.lastName);
  formData.append('email', this.student.email);
  formData.append('course', this.student.course);
  formData.append('dob',  dateofBirth);
  if(this.selectedImage){
    formData.append('image', this.selectedImage);
  }

  console.log(dateofBirth);
  
  this.studentService.addStudent(formData).subscribe({
    next: (response) => {
      console.log(response);
      this.router.navigate(['/']);

    },
    error: (error) => {
      console.log(error);
    }
  })
 
//  console.log(this.student);
 
 }



}

import { Component } from '@angular/core';
import { StdserviceService } from '../stdservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {

  student ={
    id:0,
    firstName : '',
    lastName : '',
    email : '',
    course:'',
    dob:'',
    image:''
  }

  defaultStd = {
    firstName : '',
    lastName : '',
    email : '',
    course:'',
    dob:'',
    image:''
  }

  selectedImage : File | null = null;


constructor(private stdService:StdserviceService, private router:Router, private route:ActivatedRoute){}

ngOnInit(){
  this.student.id = Number(this.route.snapshot.paramMap.get('id'))
  // console.log(this.student.id);
  this.loadStudent()
  
}

loadStudent(){
  this.stdService.getStudent(this.student.id).subscribe({
    next:(data)=>{
      this.student.firstName = data.firstName
      this.student.lastName = data.lastName
      this.student.email = data.email
      this.student.course = data.course
      this.student.dob = data.dateOfBirth
      this.student.image = data.imageUrl

      
      console.log(this.student.firstName);
      
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

OnImageSelect(event : any){
  if(event.target.files && event.target.files.length > 0){
      
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }
}


editStudent(){
  const formData = new FormData;
  formData.append('firstName', this.student.firstName)
  formData.append('lastName', this.student.lastName)
  formData.append('email', this.student.email)
  formData.append('course', this.student.course)
  formData.append('dateOfBirth', this.student.dob)
  // formData.append('id',this.student.id)
  if(this.selectedImage){
    formData.append('image', this.selectedImage); 
  }

  this.stdService.updateStudent(this.student.id,formData).subscribe({
    next:(data)=>{
      console.log(data);
      this.router.navigate(['/'])
      this.defaultStd = {...this.student}
    },
    error:(err)=>{
      console.log(err);
    }
  })


}



}

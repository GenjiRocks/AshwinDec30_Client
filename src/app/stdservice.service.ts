
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StdserviceService {

  private apiUrl = 'http://localhost:3000/api/students'

  constructor(private http:HttpClient) { }

  //get all students
  getStudents():Observable<any>{
    return this.http.get(`${this.apiUrl}`)
    
  }

  //add student
  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, student);
  }

  //delete student
  delStudent(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }

  //get single student
  getStudent(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/getstudent/${id}`)
  }

  //update student
  updateStudent(id: any, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, student)
  }
}

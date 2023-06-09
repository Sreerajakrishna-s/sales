import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent {
  File!: File;
  TimePeriod!: number;
  constructor(private http: HttpClient){}

  onFileSelected(event: any) {
    this.File = event.target.files[0];
  }

  submitForm() {
  const formData = new FormData();
  formData.append('file', this.File);
    

    this.http.post("http://localhost:5000/predict_sales", formData).subscribe((Response) =>
    console.log(Response))
    
}
}

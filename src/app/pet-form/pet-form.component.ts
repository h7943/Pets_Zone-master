import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InnerHeaderComponent } from '../inner-header/inner-header.component';
import { FormsModule } from '@angular/forms';
import { AnimalsService } from '../services/animals.service';
import { MyInterface } from '../my-interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [RouterLink ,InnerHeaderComponent,FormsModule,NgIf],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
  formData: FormData = new FormData();
  animalFormData: MyInterface= {
    name: '',
    age: 0,
    animel_type: '',
    gender: '',
    location: '',
    disc: '',
    image: null
  };
  selectedFile: File | null = null;
  successMessage: string | null = null;

  constructor(private animalService: AnimalsService) {}

  
  // onFileSelected(event: any): void {
  //   this.animalFormData.image = event.target.files[0];
  // }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
  onSubmit() {
    const form_Data = new FormData();
  
    // Append fields to formData
    Object.entries(this.animalFormData).forEach(([key, value]) => {
      form_Data.append(key, value);
    });
  
    // Handle file separately
    // if (this.animalFormData.image) {
    //   formData.append('image', this.animalFormData.image);
    // }
    if (this.selectedFile) {
      form_Data.append('image', this.selectedFile);
    }
    // Now you can use formData for your HTTP request
    this.animalService.createAnimal(form_Data).subscribe(
      () => {
        console.log('Animal created successfully');
        this.successMessage = 'Animal created successfully';
        this.resetForm();
      },
      (error) => {
        console.error('Error creating animal:', error);
      }
    );
  }
  resetForm() {
    throw new Error('Method not implemented.');
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ProjectService} from '../../../services/projet.service';

@Component({
  selector: 'app-add-project',
  standalone: false,
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) {
    this.projectForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date().toISOString(), Validators.required],
      Cloture: [false, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.projectForm.valid) {
      const newProject = this.projectForm.value;
      this.projectService.addProject(newProject).subscribe(() => {
        this.router.navigateByUrl('/menu/projects');
      });
    }
  }
}

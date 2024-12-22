// src/app/components/project/project-list/project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import {ProjectService} from '../../../services/projet.service';
import Swal from 'sweetalert2';
import {DataTable} from 'simple-datatables';


@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      setTimeout(() => {
        const table = new DataTable("#projectsTable", {
          searchable: true,
          perPage: 10,
          perPageSelect: [5, 10, 20, 40],
          labels: {
            placeholder: "Rechercher...",
            perPage: " projets par page",
            noRows: "Aucun nom de project trouvé",
            noResults: 'Désolé, aucun résultat ne correspond à votre recherche.',
            info: "Affichage de {start} à {end} sur {rows} projects"
          }
        });
      }, 100);
    });
  }
  updateProject(project: Project): void {
    Swal.fire({
      title: 'Mettre à jour le projet',
      html: `
        <input id="nom" class="swal2-input" placeholder="Nom" value="${project.nom}">
        <input id="description" class="swal2-input" placeholder="Description" value="${project.description}">
        <input id="date" class="swal2-input" type="date" value="${project.date}">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="clotureOui" name="cloture" value="true" ${project.Cloture ? 'checked' : ''}>
          <label class="form-check-label" for="clotureOui">Oui</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="clotureNon" name="cloture" value="false" ${!project.Cloture ? 'checked' : ''}>
          <label class="form-check-label" for="clotureNon">Non</label>
        </div>
      `,
      confirmButtonText: 'Mettre à jour',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        return {
          ...project,
          nom: (document.getElementById('nom') as HTMLInputElement).value,
          description: (document.getElementById('description') as HTMLInputElement).value,
          date: (document.getElementById('date') as HTMLInputElement).value,
          Cloture: (document.querySelector('input[name="cloture"]:checked') as HTMLInputElement).value === 'true'
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.updateProject(result.value).subscribe(() => {
          Swal.fire('Succès', 'Projet mis à jour', 'success');
          this.projectService.getProjects().subscribe(data => {
            this.projects = data;
          });
        });
      }
    });
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(project => project.id !== id);
    });
  }
}

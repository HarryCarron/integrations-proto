import { Component } from '@angular/core';
import { IntegrationProgressComponent } from '../../integration-progress/integration-progress.component';
@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [IntegrationProgressComponent],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss',
})
export class Page1Component {}

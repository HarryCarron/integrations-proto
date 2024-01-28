import { Component } from '@angular/core';
import { IntegrationProgressComponent } from '../../integration-progress/integration-progress.component';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [IntegrationProgressComponent],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss',
})
export class Page2Component {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IntegrationsService } from '../services/integrations/integrations.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private readonly IntegrationsService: IntegrationsService,
    public readonly router: Router
  ) {}

  ngOnInit() {
    this.IntegrationsService.beginIntegration();
    this.IntegrationsService.beginIntegration();
    this.IntegrationsService.beginIntegration();
    this.IntegrationsService.beginIntegration();
    this.IntegrationsService.beginIntegration();
  }
}

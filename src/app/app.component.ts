import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IntegrationsService } from '../services/integrations/integrations.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ToastrModule],
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

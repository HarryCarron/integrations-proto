import { Component } from '@angular/core';
import { AsyncPipe, NgStyle } from '@angular/common';
import { IntegrationsService } from '../services/integrations/integrations.service';
import { Observable, map, take, timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-integration-progress',
  standalone: true,
  imports: [NgStyle, AsyncPipe],
  templateUrl: './integration-progress.component.html',
  styleUrl: './integration-progress.component.scss',
})
export class IntegrationProgressComponent {
  constructor(
    public readonly IntegrationsService: IntegrationsService,
    private readonly toastr: ToastrService
  ) {}

  readonly Integrations$: Observable<number[]> =
    this.IntegrationsService.pollActiveIntegrations();

  addIntegration() {
    this.IntegrationsService.beginIntegration();
  }

  ngOnInit() {
    timer(500)
      .pipe(take(1))
      .subscribe(() => {
        this.toastr.success(
          'Component initialised and subscribed to multicast polling mechanism',
          'Integrations progress component initialised'
        );
      });
  }

  ngOnDestroy() {
    this.toastr.warning(
      'Component destroyed and unsubscribed from multicast polling mechanism',
      'Integrations progress component destroyed'
    );
  }
}

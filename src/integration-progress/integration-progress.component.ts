import { Component } from '@angular/core';
import { AsyncPipe, NgStyle } from '@angular/common';
import { IntegrationsService } from '../services/integrations/integrations.service';
import { Subject, take, timer } from 'rxjs';
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

  private readonly destroy$ = new Subject<void>();

  integrations: number[] = [];

  addIntegration() {
    this.IntegrationsService.beginIntegration();
  }

  ngOnInit() {
    this.IntegrationsService.pollActiveIntegrations(this.destroy$).subscribe(
      (integrations: number[]) => {
        this.integrations = integrations;
      }
    );

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
    this.destroy$.next();
    this.destroy$.complete();
    this.toastr.warning(
      'Component destroyed and unsubscribed from multicast polling mechanism',
      'Integrations progress component destroyed'
    );
  }
}

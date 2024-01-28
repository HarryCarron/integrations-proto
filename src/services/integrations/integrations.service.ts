import { Injectable } from '@angular/core';
import { checkIntegrationProgress } from '../../mock-be/integration-provider.helper';
import { startIntegration } from '../../mock-be/integration-provider.helper';
import {
  Observable,
  combineLatest,
  exhaustMap,
  interval,
  shareReplay,
  startWith,
  take,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntegrationsService {
  public readonly activeIntegrations: string[] = [];

  // example req: GET /{{integration-provider}}/{{uuid}}
  public beginIntegration(): void {
    startIntegration()
      .pipe(take(1))
      .subscribe((id: string) => this.activeIntegrations.push(id));
  }

  // example req: GET /{{integration-provider}}/{{uuid}}/progress
  public pollActiveIntegrations(time: number = 1000): Observable<number[]> {
    const obs$ = interval(time).pipe(
      startWith(null),
      exhaustMap(() =>
        combineLatest(
          this.activeIntegrations.map((id) => {
            return checkIntegrationProgress(id).pipe(take(1));
          })
        )
      )
    );

    return obs$.pipe(shareReplay(1));
  }
}

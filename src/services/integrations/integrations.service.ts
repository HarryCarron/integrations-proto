import { Injectable } from '@angular/core';
import { checkIntegrationProgress } from '../../mock-be/integration-provider.helper';
import { startIntegration } from '../../mock-be/integration-provider.helper';
import {
  Observable,
  Subject,
  combineLatest,
  exhaustMap,
  interval,
  startWith,
  take,
  takeUntil,
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
  public pollActiveIntegrations(
    stop$: Subject<void>,
    time: number = 1000
  ): Observable<number[]> {
    return interval(time).pipe(
      takeUntil(stop$),
      startWith(null),
      exhaustMap(() => {
        return combineLatest(
          this.activeIntegrations.map((id) => {
            return checkIntegrationProgress(id).pipe(take(1));
          })
        );
      })
    );
  }
}

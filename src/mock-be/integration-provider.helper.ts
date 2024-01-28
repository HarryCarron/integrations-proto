import { Observable, interval, map, of, shareReplay, takeWhile } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const integrations: Record<string, Observable<number>> = {};

export function startIntegration(): Observable<string> {
  const id = uuidv4();

  const obs: Observable<number> = new Observable((subscriber) => {
    let progress = 0;
    const increaseByLimit = 1;

    interval(2000)
      .pipe(
        map(() => {
          return progress;
        }),
        takeWhile((_progress) => _progress <= 100)
      )
      .subscribe({
        next: () => {
          progress = Math.floor(
            Math.random() * (progress + increaseByLimit - progress + 1) +
              progress
          );

          subscriber.next(progress);
        },
        complete: () => {
          subscriber.next(100);
          subscriber.complete();
        },
      });
  });

  return of(addIntegration(obs.pipe(shareReplay(1)), id));
}

function addIntegration(obs: Observable<number>, id: string): string {
  integrations[id] = obs;
  obs.subscribe();
  return id;
}

export function checkIntegrationProgress(id: string): Observable<number> {
  return integrations[id];
}

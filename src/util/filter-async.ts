import { pipe, from, MonoTypeOperatorFunction } from 'rxjs';
import { map, filter, concatMap } from 'rxjs/operators';

export function filterAsync<T>(predicate: (value: T, index: number) => Promise<boolean>): MonoTypeOperatorFunction<T> {
  let count = 0;
  return pipe(
    // Convert the predicate Promise<boolean> to an observable (which resolves the promise,
    // Then combine the boolean result of the promise with the input data to a container object
    concatMap((data: T) => {
      return from(predicate(data, count++))
        .pipe(map((isValid) => ({filterResult: isValid, entry: data})));
    }),
    // Filter the container object synchronously for the value in each data container object
    filter(data => data.filterResult === true),
    // remove the data container object from the observable chain
    map(data => data.entry)
  );
}
import { fromEvent, Subject, timer } from 'rxjs';
import { createJokeNode, getJoke, Joke } from './utils';
import { concatMap, startWith, switchMap, tap } from 'rxjs/operators';

const rndJokeBtn = document.getElementById('rndJokeBtn');
const jokeStreamBtn = document.getElementById('jokeStreamBtn');
//
const rndJokeClick$ = fromEvent(rndJokeBtn, 'click').pipe(
  tap(ev => console.log(ev)),
  concatMap(() => getJoke())
);

const rndJokeClickSubscription = rndJokeClick$.subscribe(joke => {
  console.log('joke', joke);
  createJokeNode(joke);
});

const jokeStreamBtn$ = fromEvent(jokeStreamBtn, 'click');
const interval$ = timer(0, 5000);
const intervalJoke$ = interval$.pipe(concatMap(() => getJoke()));
jokeStreamBtn$
  .pipe(concatMap(() => intervalJoke$))
  .subscribe(joke => createJokeNode(joke));

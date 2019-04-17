import { fromEvent, timer } from 'rxjs';
import { createJokeNode, getJoke } from './utils';
import { concatMap, tap } from 'rxjs/operators';

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
jokeStreamBtn$.subscribe(() => {
  console.log('stream started...');
  setInterval(() => getJoke().subscribe(joke => createJokeNode(joke)), 5000);
});

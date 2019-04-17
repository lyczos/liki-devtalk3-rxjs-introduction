import { fromEvent, timer } from 'rxjs';
import { createJokeNode, getJoke } from './utils';
import { concatMap, tap } from 'rxjs/operators';

const rndJokeBtn = document.getElementById('rndJokeBtn');
const jokeStreamBtn = document.getElementById('jokeStreamBtn');

const rndJokeClick$ = fromEvent(rndJokeBtn, 'click').pipe(
  tap(x => console.log('Tap debug', x))
);

const rndJokeClickSubscription = rndJokeClick$.subscribe(ev => {
  console.log('ev', ev);
  getJoke().subscribe(joke => createJokeNode(joke));
});

setTimeout(() => {
  console.log('Unsubscribe...');
  rndJokeClickSubscription.unsubscribe();
}, 5000);

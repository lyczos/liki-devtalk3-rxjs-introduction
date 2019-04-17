import { fromEvent, timer } from 'rxjs';
import { createJokeNode, getJoke } from './utils';
import { concatMap, tap } from 'rxjs/operators';

const rndJokeBtn = document.getElementById('rndJokeBtn');
const jokeStreamBtn = document.getElementById('jokeStreamBtn');

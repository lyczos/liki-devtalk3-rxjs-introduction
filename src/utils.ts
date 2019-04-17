import { Observable, Subscriber } from 'rxjs';
import { apiEndpoint } from './consts';

export interface Joke {
  id: number;
  punchline: string;
  setup: string;
  type: string;
}

export function observableFromHttp(url: RequestInfo, headers?: RequestInit) {
  return new Observable((observer: Subscriber<any>) => {
    fetch(url, headers)
      .then(res => res.json())
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
}

export function getJoke(): Observable<Joke> {
  return observableFromHttp(apiEndpoint + '/random_joke', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function createJokeNode(joke: Joke) {
  const li = document.createElement('li');
  const divSetup = document.createElement('div');
  const divPunchline = document.createElement('div');

  const setup = document.createTextNode(joke.setup);
  const punchline = document.createTextNode(joke.punchline);

  divSetup.appendChild(setup);
  divPunchline.appendChild(punchline);

  li.className = 'joke';
  divSetup.className = 'joke-setup';
  divPunchline.className = 'joke-punchline';

  li.append(divSetup, divPunchline);

  document.getElementById('list').prepend(li);
}

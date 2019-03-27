interface Joke {
  id: number;
  punchline: string;
  setup: string;
  type: string;
}

const apiEndpoint = 'http://localhost:3005';

function getJoke(): Promise<Joke> {
  return fetch(apiEndpoint + '/random_joke', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}

function createJokeNode(joke: Joke) {
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

  document.getElementById('list').appendChild(li);
}

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300 && response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then((response) => response.json());
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
      .then((response) => response.json());
  }

  createMovies(task) {
    return this._load({
      url: `movies`,
      method: Method.POST,
      body: JSON.stringify(task.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
      //.then(Task.parseTask);
  }

  updateMovie(id, movie) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(movie),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  deleteMovie(id) {
    return this._load({url: `movies/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

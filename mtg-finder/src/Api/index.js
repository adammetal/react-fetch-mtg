export class Api {
  static #token = "";

  static setToken(token) {
    Api.#token = token;
  }

  static #addToken(options) {
    if (!Api.#token || !Api.#token.length) {
      return options;
    }

    return {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: Api.#token,
      },
    };
  }

  static #request(url, method) {
    const options = Api.#addToken({ method });
    return fetch(url, options).then((res) => res.json());
  }

  static #requestWithPayload(url, method, payload) {
    const options = Api.#addToken({
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return fetch(url, options).then((res) => res.json());
  }

  static get(url) {
    return Api.#request(url, "GET");
  }

  static delete(url) {
    return Api.#request(url, "DELETE");
  }

  static post(url, payload) {
    return Api.#requestWithPayload(url, "POST", payload);
  }

  static patch(url, payload) {
    return Api.#requestWithPayload(url, "PATCH", payload);
  }

  static put(url, payload) {
    return Api.#requestWithPayload(url, "PUT", payload);
  }
}

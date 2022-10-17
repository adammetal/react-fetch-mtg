export class Api {
  static #token = "";

  static setToken(token) {
    Api.#token = token;
  }

  static #withToken(options) {
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

  static #request(url, method, signal = null) {
    const options = Api.#withToken({ method, signal });
    return fetch(url, options).then((res) => res.json());
  }

  static #requestWithPayload(url, method, payload, signal = null) {
    const options = Api.#withToken({
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return fetch(url, options).then((res) => res.json());
  }

  static get(url, signal = null) {
    return Api.#request(url, "GET", signal);
  }

  static delete(url, signal = null) {
    return Api.#request(url, "DELETE", signal);
  }

  static post(url, payload, signal = null) {
    return Api.#requestWithPayload(url, "POST", payload, signal);
  }

  static patch(url, payload, signal = null) {
    return Api.#requestWithPayload(url, "PATCH", payload, signal);
  }

  static put(url, payload, signal = null) {
    return Api.#requestWithPayload(url, "PUT", payload, signal);
  }
}

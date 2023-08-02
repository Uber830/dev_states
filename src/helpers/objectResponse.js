export class Response {
  //message for custom
  static custom(res, code, message) {
    return res.status(code).send(message);
  }

  //message for in json
  static json(res, code, data) {
    return res.status(code).json(data);
  }

  //message of error
  static error(res, code, error) {
    return res.status(code).json({ error: error.message });
  }

  //message for defaul
  static success(res, data) {
    return res.status(200).json(data);
  }

  static delete(res, code) {
    return res.sendStatus(code);
  }
}
export class SysErrors extends Error {
  statusCode: number;

  constructor(msg: string, statusCode: number) {
    super(msg)
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends SysErrors {
  constructor(msg: string = "Bad request error") {
    super(msg, 400)
  }
}

export class NotFoundError extends SysErrors {
  constructor(msg: string = "resource not found") {
    super(msg, 404);
  }
}

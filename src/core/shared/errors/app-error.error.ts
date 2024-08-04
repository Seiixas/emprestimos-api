interface IConstructorProps {
  message: string;
  internalCode: string;
  statusCode?: number;
  data?: any;
}

class AppError {
  protected _message: string;
  protected _internalCode: string;
  protected _httpStatusCode: number;
  protected _data?: any;

  constructor(props: IConstructorProps) {
    this._message = props.message;
    this._httpStatusCode = props.statusCode ?? 400;
    this._data = props.data;
    this._internalCode = props.internalCode;
  }

  get statusCode(): number {
    return this._httpStatusCode;
  }

  get code(): string {
    return this._internalCode;
  }

  get message(): string {
    return this._message;
  }
}

export { AppError };

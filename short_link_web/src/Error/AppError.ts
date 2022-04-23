export type AppErrorType = {
  statusCode?: number;
  title?: string;
  message: string;
};

export class AppError {
  public readonly statusCode?: number;
  public readonly title?: string;
  public readonly message: string;

  constructor({ statusCode = 400, title = "", message }: AppErrorType) {
    this.statusCode = statusCode;
    this.title = title;
    this.message = message;
  }
}

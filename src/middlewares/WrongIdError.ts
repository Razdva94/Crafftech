class WrongIdError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'WrongId';
    this.statusCode = 404;
  }
}

export default WrongIdError;

class WrongDataError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'WrongData';
    this.statusCode = 400;
  }
}

export default WrongDataError;

import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message, status) {
    super(message, status || 500);
  }
}

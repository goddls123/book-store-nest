import { Logger } from '@nestjs/common';

export class CustomLoggerClass {
  private LOG_COLORS = ['🟩', '🟧', '🟦', '🟪', '🟥', '🟨'];

  private _logger: Logger = new Logger();
  private _color: string;

  get color(): string {
    return this._color;
  }

  get logger(): Logger {
    return this._logger;
  }

  setColor() {
    const findIndex = this.LOG_COLORS.findIndex((d) => d === this._color) + 1;
    this._color =
      this.LOG_COLORS[findIndex > this.LOG_COLORS.length ? 1 : findIndex];
  }

  clear() {
    this._logger.log('');
  }
}
const CustomLogger = new CustomLoggerClass();
export default CustomLogger;

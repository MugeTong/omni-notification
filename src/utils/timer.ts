export class Timer {
  private readonly callback: (...params: unknown[]) => void;
  private timeoutId: number | undefined;
  private startTime: number;
  private remainingTime: number;

  constructor(callback: (...params: any[]) => void, interval: number) {
    this.callback = callback;
    this.startTime = Date.now();
    this.remainingTime = interval;
    this.resume();
  }

  /**
   * Pause the timer
   */
  pause() {
    // `clearTimeout` does nothing if timeoutId is undefined
    clearTimeout(this.timeoutId);
    this.remainingTime -= Date.now() - this.startTime;
  }

  /**
   * Resume the timer
   */
  resume() {
    this.startTime = Date.now();
    // clear timeoutId created by multiple calls from `resume`
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.callback, this.remainingTime);
  }

  /**
   * Clear the timer
   */
  clear() {
    clearTimeout(this.timeoutId);
  }
}
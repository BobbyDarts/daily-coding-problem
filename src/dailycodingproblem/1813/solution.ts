export class OrderLog {
  private buffer: string[]; // Fixed size array to hold order IDs
  private currentPosition: number; // Where to write the next order
  private N: number; // Maximum capacity

  constructor(N: number) {
    this.N = N;
    this.buffer = new Array(N).fill("");
    this.currentPosition = 0;
  }

  record(order_id: string): void {
    this.buffer[this.currentPosition] = order_id;
    this.currentPosition = (this.currentPosition + 1) % this.N;
  }

  get_last(i: number): string {
    // Calculate index of the ith last element
    const index = (this.currentPosition - i + this.N) % this.N;
    return this.buffer[index]!;
  }
}

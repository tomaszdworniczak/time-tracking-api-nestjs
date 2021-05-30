export class Task {
  private constructor(private readonly id: string, private readonly name: string, private readonly trackingStartedAt: Date, private readonly trackingStoppedAt: Date | undefined ){}

  static startTracking(id: string, name: string,trackingStartedAt: Date): Task {
    return new Task(id, name, trackingStartedAt, undefined);
  }

  stopTracking(stoppedAt: Date): Task {
    return new Task(this.id, this.name, this.trackingStartedAt, stoppedAt);
  }

  getId(): string {
    return this.id;
  }

  getName():string {
    return this.name;
  }

  getTrackingStartedAt(): Date {
    return this.trackingStartedAt;
  }

  getTrackingStoppedAt(): Date | undefined {
  return this.trackingStoppedAt || undefined;
  }
}
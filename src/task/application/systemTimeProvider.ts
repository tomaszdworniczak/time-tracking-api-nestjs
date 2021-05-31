import { CurrentTimeProvider } from "./currentTimeProvider";

export class SystemTimeProvider implements CurrentTimeProvider {
  currentTime(): Date {
    return new Date();
  }

}
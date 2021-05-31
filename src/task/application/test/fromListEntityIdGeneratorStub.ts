import { EntityIdGenerator } from "../entityIdGenerator";

export function FromListEntityIdGeneratorStub(idList: string[]): EntityIdGenerator {
  return {
    generate(): string {
      return <string>idList.shift();
    }
  }
}
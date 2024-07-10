type TypeKeys<T, U> = { [k in keyof T]: T[k] extends U ? k : never }[keyof T];
export type OnlyType<T, U> = { [k in TypeKeys<T, U>]: U };

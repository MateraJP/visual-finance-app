import { OptionalType } from "./optional.type";

export type DictionaryType<T> = Record<string, OptionalType<T>>;

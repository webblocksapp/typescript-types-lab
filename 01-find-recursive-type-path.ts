type Primitive = string | number | boolean | null | undefined | symbol | bigint;
type BrowserNativeObject = Date | FileList | File;

type IsTuple<T extends readonly any[]> = number extends T['length'] ? false : true;
type TupleKeys<T extends readonly any[]> = Exclude<
  keyof T,
  keyof any[]
>;

type Paths<T, K extends string | number> = T extends Primitive | BrowserNativeObject
  ? K
  : K | `${K extends "" ? "" : `${K}.`}${NestedPaths<T>}`;

/**
 * TODO: Check how infer works
 */
type NestedPaths<T> = T extends ReadonlyArray<infer V> ? 
 IsTuple<T> extends true ? 
 {
  [K in TupleKeys<T>]: Paths<T[K], `${K & string}`>
 }[TupleKeys<T>]
 :
 Paths<V, number> : {
  [K in keyof T]: Paths<T[K], `${K & string}`>;
}[keyof T];

type FlattenPaths<T> = Exclude<Paths<T, "">, "">;

type Data = {
  firstName: string;
  lastName: string;
  age: number;
  contact: {
    emails: [string];
    guest?: {name :string}
    gender?: ['male', 'female']
  };
};

type Y = ""
type W = Y['length']


type X = FlattenPaths<Data>;
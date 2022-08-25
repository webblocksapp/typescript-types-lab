type Primitive = string | number | boolean | null | undefined | symbol | bigint;
type BrowserNativeObject = Date | FileList | File;

type FlattenPaths<T> = Exclude<Paths<T, "">, "">;

type Paths<T, K extends string | number> = T extends Primitive
  ? K
  : K | `${K extends "" ? "" : `${K}.`}${NestedPaths<T>}`;

type NestedPaths<T> = {
  [K in keyof T]: Paths<T[K], `${K & string}`>;
}[keyof T];

type Data = {
  firstName: string;
  lastName: string;
  age: number;
  contact: {
    emails: string;
  };
};

type X = FlattenPaths<Data>;

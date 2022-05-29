import { Resolver, BuildResolver, DisposableResolver } from "awilix";

export namespace AwilixUtils {
  type ExtractResolverType<T> = T extends Resolver<infer U>
    ? U
    : T extends BuildResolver<infer U>
    ? U
    : T extends DisposableResolver<infer U>
    ? U
    : never;

  export type Container<Dependencies> = {
    [Key in keyof Dependencies]: ExtractResolverType<Dependencies[Key]>;
  };
}

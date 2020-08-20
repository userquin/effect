import * as P from "../Prelude"
import { ContravariantP, CovariantP } from "../Prelude/HKT"

import * as T from "@effect-ts/system/Effect"
import { Erase } from "@effect-ts/system/Utils"

const EffectURI = T.EffectURI
type EffectURI = typeof EffectURI

export type V = CovariantP<"E"> & CovariantP<"X"> & ContravariantP<"R">
export type AsyncV = Erase<V, CovariantP<"X">> & P.Fix<"X", unknown>

declare module "../Prelude/HKT" {
  interface URItoKind<N extends string, K, SI, SO, X, I, S, R, E, A> {
    [EffectURI]: T.Effect<X, R, E, A>
  }
}

export const Any = P.instance<P.Any<EffectURI, V>>({
  any: () => T.succeed({})
})

export const None = P.instance<P.None<EffectURI, AsyncV>>({
  never: () => T.never
})

export const AssociativeEither = P.instance<P.AssociativeEither<EffectURI, V>>({
  either: T.orElseEither
})

export const AssociativeFlatten = P.instance<P.AssociativeFlatten<EffectURI, V>>({
  flatten: T.flatten
})

export const AssociativeBoth = P.instance<P.AssociativeBoth<EffectURI, V>>({
  both: T.zip
})

export const Covariant = P.instance<P.Covariant<EffectURI, V>>({
  map: T.map
})

export const IdentityEither: P.IdentityEither<EffectURI, AsyncV> = {
  ...Any,
  ...AssociativeEither,
  ...None
}

export const IdentityFlatten: P.IdentityFlatten<EffectURI, V> = {
  ...Any,
  ...AssociativeFlatten
}

export const IdentityBoth: P.IdentityBoth<EffectURI, V> = {
  ...Any,
  ...AssociativeBoth
}

export const Monad: P.Monad<EffectURI, V> = {
  ...IdentityFlatten,
  ...Covariant
}

export const Applicative: P.Applicative<EffectURI, V> = {
  ...Covariant,
  ...IdentityBoth
}

export {
  absolve,
  access,
  accessM,
  accessRegion,
  accessRegionM,
  accessService,
  accessServiceF,
  accessServiceIn,
  accessServiceInM,
  accessServiceM,
  accessServices,
  accessServicesM,
  accessServicesT,
  accessServicesTM,
  ap,
  ap_,
  as,
  asSomeError,
  asUnit,
  Async,
  AsyncCancel,
  AsyncE,
  AsyncR,
  AsyncRE,
  as_,
  bimap,
  bind,
  bindAll,
  bindAllPar,
  bindAllParN,
  bracket,
  bracketExit,
  bracketExit_,
  bracketFiber,
  bracketFiber_,
  bracket_,
  Canceler,
  CancelMain,
  catchAll,
  catchAllCause,
  catchAllCause_,
  catchAll_,
  cause,
  causeAsError,
  Cb,
  chain,
  chain_,
  checkDescriptor,
  checkInterrupt,
  collectAll,
  collectAllPar,
  collectAllParN,
  collectAllUnit,
  collectAllUnitPar,
  collectAllUnitParN,
  DefaultEnv,
  defaultEnv,
  delay,
  delay_,
  die,
  disconnect,
  done,
  Effect,
  effectAsync,
  effectAsyncInterrupt,
  effectAsyncOption,
  effectMaybeAsyncInterrupt,
  effectPartial,
  effectTotal,
  EffectURI,
  either,
  ensuring,
  environment,
  errorFromCause,
  ExecutionStrategy,
  fail,
  fiberContext,
  fiberId,
  first,
  flatten,
  fold,
  foldCause,
  foldCauseM,
  foldCauseM_,
  foldCause_,
  foldM,
  foldM_,
  fold_,
  foreach,
  foreachExec,
  foreachExec_,
  foreachPar,
  foreachParN,
  foreachParN_,
  foreachPar_,
  foreachUnit,
  foreachUnitPar,
  foreachUnitParN,
  foreachUnitParN_,
  foreachUnitPar_,
  foreachUnit_,
  foreach_,
  forever,
  fork,
  forkDaemon,
  forkIn,
  forkScopeWith,
  fromEither,
  halt,
  ifM,
  interrupt,
  interruptAs,
  interruptible,
  interruptStatus,
  InterruptStatusRestore,
  interruptStatus_,
  let,
  map,
  mapError,
  mapErrorCause,
  mapErrorCause_,
  mapError_,
  map_,
  merge,
  never,
  of,
  onError,
  onExit,
  onExit_,
  onInterrupt,
  onInterruptExtended_,
  onInterrupt_,
  optional,
  orDie,
  orDieKeep,
  orDieWith,
  orDieWith_,
  orElseEither,
  orElseEither_,
  orElse_,
  Parallel,
  parallel,
  ParallelN,
  parallelN,
  provide,
  provideAll,
  provideAll_,
  provideService,
  provideServiceM,
  provideSome,
  provideSomeLayer,
  provideSomeLayer_,
  provideSome_,
  provide_,
  race,
  raceEither,
  raceEither_,
  raceFirst,
  raceWith,
  race_,
  readRegion,
  readService,
  readServiceIn,
  Region,
  region,
  RegionURI,
  repeat,
  repeatOrElseEither_,
  repeatOrElse_,
  repeat_,
  replaceService,
  replaceServiceM,
  replaceServiceM_,
  replaceService_,
  result,
  retry,
  retryOrElseEither_,
  retryOrElse_,
  retry_,
  runAsync,
  runAsyncAsap,
  runAsyncCancel,
  runMain,
  runPromise,
  runPromiseExit,
  runSync,
  runSyncExit,
  Runtime,
  runtime,
  sequenceS,
  sequenceSPar,
  sequenceSParN,
  sequenceT,
  sequenceTPar,
  sequenceTParN,
  Sequential,
  sequential,
  sleep,
  succeed,
  summarized,
  summarized_,
  suspend,
  suspendPartial,
  Sync,
  SyncE,
  SyncR,
  SyncRE,
  tap,
  tapBoth,
  tapBoth_,
  tapCause,
  tapCause_,
  tapError,
  tapError_,
  tap_,
  timed,
  timedWith,
  timedWith_,
  toManaged,
  toPromise,
  transplant,
  tryOrElse_,
  uncause,
  uninterruptible,
  uninterruptibleMask,
  unit,
  useRegion,
  validate,
  validateExec,
  validateExec_,
  validatePar,
  validateParN,
  validateParN_,
  validatePar_,
  validate_,
  whenM,
  whenM_,
  withRuntime,
  withRuntimeM,
  yieldNow,
  zip,
  zipFirst,
  zipFirst_,
  zipPar,
  zipPar_,
  zipSecond,
  zipSecond_,
  zipWith,
  zipWithPar,
  zipWithPar_,
  zipWith_,
  zip_
} from "@effect-ts/system/Effect"

import { reduceRight } from "../../../collection/immutable/Chunk/api/reduceRight"
import * as Chunk from "../../../collection/immutable/Chunk/core"
import * as Iter from "../../../collection/immutable/Iterable"
import { pipe } from "../../../data/Function"
import * as O from "../../../data/Option"
import * as Cause from "../../Cause/definition"
import { chain_ } from "../../Effect/operations/chain"
import { done } from "../../Effect/operations/done"
import {
  forEach_,
  forEachDiscard_,
  forEachPar_
} from "../../Effect/operations/excl-forEach"
import { exit } from "../../Effect/operations/exit"
import { map, map_ } from "../../Effect/operations/map"
import { reduce_ } from "../../Effect/operations/reduce"
import * as Exit from "../../Exit"
import * as FiberId from "../../FiberId"
import type { Fiber } from "../definition"
import { makeSynthetic } from "./makeSynthetic"

/**
 * Collects all fibers into a single fiber producing an in-order list of the
 * results.
 */
export function collectAll<E, A>(
  fibers: Iterable<Fiber<E, A>>
): Fiber<E, Chunk.Chunk<A>> {
  return makeSynthetic({
    id: Iter.reduce_(fibers, FiberId.none, (id, fiber) =>
      FiberId.combine_(id, fiber.id)
    ),
    await: exit(forEachPar_(fibers, (fiber) => chain_(fiber.await, done))),
    children: map_(
      forEachPar_(Chunk.from(fibers), (fiber) => fiber.children),
      Chunk.flatten
    ),
    inheritRefs: forEachDiscard_(fibers, (fiber) => fiber.inheritRefs),
    poll: pipe(
      forEach_(fibers, (f) => f.poll),
      map(
        reduceRight(
          O.some(Exit.succeed(Chunk.empty()) as Exit.Exit<E, Chunk.Chunk<A>>),
          (a, b) =>
            O.fold_(
              a,
              () => O.none,
              (ra) =>
                O.fold_(
                  b,
                  () => O.none,
                  (rb) =>
                    O.some(
                      Exit.zipWith_(
                        ra,
                        rb,
                        (_a, _b) => Chunk.prepend_(_b, _a),
                        Cause.both
                      )
                    )
                )
            )
        )
      )
    ),
    getRef: (ref) =>
      reduce_(fibers, ref.initial, (a, fiber) =>
        pipe(
          fiber.getRef(ref),
          map((a2) => ref.join(a, a2))
        )
      ),
    interruptAs: (fiberId) =>
      pipe(
        forEach_(fibers, (f) => f.interruptAs(fiberId)),
        map(
          reduceRight(
            Exit.succeed(Chunk.empty()) as Exit.Exit<E, Chunk.Chunk<A>>,
            (a, b) =>
              Exit.zipWith_(a, b, (_a, _b) => Chunk.prepend_(_b, _a), Cause.both)
          )
        )
      )
  })
}

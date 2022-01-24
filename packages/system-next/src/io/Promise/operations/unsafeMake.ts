import { AtomicReference } from "../../../support/AtomicReference"
import type { FiberId } from "../../FiberId"
import { Pending } from "../_internal/state"
import { Promise } from "../definition"

export function unsafeMake<E, A>(fiberId: FiberId): Promise<E, A> {
  return new Promise(new AtomicReference(new Pending([])), fiberId)
}

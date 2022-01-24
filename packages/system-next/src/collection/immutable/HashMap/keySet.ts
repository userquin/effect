import * as S from "../HashSet"
import type { HashMap } from "./core"

/**
 * Get the set of keys
 */
export function keySet<K, V>(self: HashMap<K, V>) {
  return new S.HashSet(self)
}

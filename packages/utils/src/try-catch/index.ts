/**
 * Represents the result of an operation that can either succeed or fail.
 *
 * The tuple contains either an error and `null`, or `null` and the
 * successfully resolved value.
 *
 * @typeParam T - The type of the successful result.
 *
 * @example
 * ```ts
 * const result: TryCatchResult<number> = [null, 42];
 *
 * if (result[0]) {
 *   console.error(result[0]);
 * } else {
 *   console.log(result[1]);
 * }
 * ```
 */
export type TryCatchResult<T> =
  | readonly [Error, null]
  | readonly [null, T];

/**
 * Executes or resolves a value and captures errors without throwing them.
 *
 * Supports synchronous values, promises, promise-like values, and functions
 * that return either synchronous or asynchronous results.
 *
 * For successful operations, the result is returned as `[null, value]`.
 * If an error occurs, the result is returned as `[error, null]`.
 *
 * @typeParam T - The type of the input or resolved value.
 *
 * @param value - A function that produces a synchronous value.
 *
 * @returns A tuple containing either the error or the successful result.
 *
 * @example
 * ```ts
 * const [error, data] = tryCatch(() => JSON.parse(json));
 *
 * if (error) {
 *   console.error("Failed to parse JSON:", error);
 * } else {
 *   console.log(data);
 * }
 * ```
 */
export function tryCatch<T>(
  value: () => T,
): TryCatchResult<T>;

/**
 * Executes or resolves an asynchronous function and captures errors
 * without throwing them.
 *
 * @typeParam T - The type of the asynchronously resolved value.
 *
 * @param value - A function that produces a promise or promise-like value.
 *
 * @returns A promise resolving to a tuple containing either the error
 * or the successfully resolved result.
 *
 * @example
 * ```ts
 * const [error, data] = await tryCatch(() =>
 *   fetch("/api/users").then((response) => response.json()),
 * );
 *
 * if (error) {
 *   console.error("Request failed:", error);
 * } else {
 *   console.log(data);
 * }
 * ```
 */
export function tryCatch<T>(
  value: () => PromiseLike<T>,
): Promise<TryCatchResult<Awaited<T>>>;

/**
 * Resolves a promise or promise-like value and captures errors without
 * throwing them.
 *
 * @typeParam T - The type of the asynchronously resolved value.
 *
 * @param value - A promise or promise-like value to resolve.
 *
 * @returns A promise resolving to a tuple containing either the error
 * or the successfully resolved result.
 *
 * @example
 * ```ts
 * const [error, data] = await tryCatch(
 *   fetch("/api/users").then((response) => response.json()),
 * );
 *
 * if (error) {
 *   console.error("Request failed:", error);
 * } else {
 *   console.log(data);
 * }
 * ```
 */
export function tryCatch<T>(
  value: PromiseLike<T>,
): Promise<TryCatchResult<Awaited<T>>>;

/**
 * Returns a successful result for a synchronous value.
 *
 * @typeParam T - The type of the value.
 *
 * @param value - A synchronous value.
 *
 * @returns A tuple containing `null` and the provided value.
 *
 * @example
 * ```ts
 * const [error, value] = tryCatch(42);
 *
 * if (!error) {
 *   console.log(value); // 42
 * }
 * ```
 */
export function tryCatch<T>(
  value: T,
): TryCatchResult<T>;

/**
 * Internal implementation of {@link tryCatch}.
 *
 * Detects functions and promise-like values at runtime, executes or resolves
 * them, and converts both synchronous and asynchronous errors into a
 * `TryCatchResult`.
 *
 * @param value - The value, promise-like value, or function to execute.
 *
 * @returns A synchronous `TryCatchResult` or a promise resolving to one.
 */
export function tryCatch(value: unknown): unknown {
  if (typeof value === "function") {
    try {
      const result = (value as () => unknown)();

      if (
        result !== null &&
        typeof result === "object" &&
        "then" in result &&
        typeof (result as { then?: unknown }).then === "function"
      ) {
        return Promise.resolve(result)
          .then((data) => [null, data] as const)
          .catch((error) => [error as Error, null] as const);
      }

      return [null, result] as const;
    } catch (error) {
      return [error as Error, null] as const;
    }
  }

  if (
    value !== null &&
    typeof value === "object" &&
    "then" in value &&
    typeof (value as { then?: unknown }).then === "function"
  ) {
    return Promise.resolve(value)
      .then((data) => [null, data] as const)
      .catch((error) => [error as Error, null] as const);
  }

  return [null, value] as const;
}

/**
 * Retrieves the full domain URL from the given request object.
 *
 * This function checks for the presence of the "X-Forwarded-Host" and "X-Forwarded-Proto"
 * headers to correctly handle requests that have been forwarded by a proxy. If these
 * headers are not present, it falls back to using the "host" header and a default protocol.
 *
 * @param request - The request object from which to extract the domain URL.
 * @returns The full domain URL, including the protocol and host.
 */
export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ??
    request.headers.get("host") ??
    new URL(request.url).host;
  const protocol = request.headers.get("X-Forwarded-Proto") ?? "http";
  return `${protocol}://${host}`;
}

/**
 * Clamps a number within the inclusive range specified by the two bounds.
 * In other workds, the fn determines the min and max bounds from the two given
 * numbers and then ensures that the input number is constrained within these
 * bounds. If the input number is less than the minimum bound, the function
 * returns the minimum bound. If the input number is greater than the maximum
 * bound, the function returns the maximum bound. Otherwise, it returns the
 * input number.
 *
 * @param number - The number to clamp.
 * @param a - One of the bounds for the clamping range.
 * @param b - The other bound for the clamping range.
 * @returns The clamped number, constrained within the range [a, b].
 */
export function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(number, min), max);
}

let counter = 0;

export function createTraceId(): string {
  counter += 1;
  const timestamp = Date.now().toString(36);
  const seq = counter.toString(36).padStart(4, "0");
  const random = Math.random().toString(36).slice(2, 6);
  return `som-${timestamp}-${seq}-${random}`;
}

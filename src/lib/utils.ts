export function cn(...classes: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return classes
    .flatMap((c) => {
      if (!c) return [];
      if (typeof c === 'object') {
        return Object.entries(c)
          .filter(([_, value]) => value)
          .map(([key]) => key);
      }
      return [c];
    })
    .join(' ');
}

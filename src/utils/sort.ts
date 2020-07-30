export function createSortFunc(
  valueFn: (a: any) => any,
  direction: 'asc' | 'desc' = 'asc'
) {
  const sortDirection = direction === 'asc' ? 1 : -1;

  return (a: any, b: any) => {
    const aValue = valueFn(a);
    const bValue = valueFn(b);

    if (aValue == null || bValue == null) {
      if (aValue == null && bValue != null) {
        return -sortDirection;
      } else if (aValue != null && bValue == null) {
        return sortDirection;
      } else {
        // both `null`
        return 0;
      }
    }

    return aValue < bValue
      ? -sortDirection
      : aValue > bValue
      ? sortDirection
      : 0;
  };
}

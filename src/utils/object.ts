export const removeNullValue = (
  obj: { [s: string]: unknown } | ArrayLike<unknown>,
) => {
  const excludedKeys = new Set([
    "isDeleted",
    "createdAt",
    "updatedAt",
    "id",
    "profilePhoto",
    "email",
    "phone",
  ]);

  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) =>
        (value !== null || value !== undefined) && !excludedKeys.has(key),
    ),
  );
};

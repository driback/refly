export const handleMutation = <T>(res: T[] | undefined) => {
  if (!res?.length) return null;
  return res[0] as T;
};

export const handleQuerys = <T>(res: T | undefined) => {
  if (!res) return null;
  return res;
};

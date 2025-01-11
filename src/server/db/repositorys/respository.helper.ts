export const handleMutation = <T>(data: T[]) => {
  if (!data?.[0]) return null;
  return data[0];
};

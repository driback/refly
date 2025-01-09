import type { ReactNode } from "react";

type ListProps<ItemType extends unknown[]> = {
  children: (item: ItemType[0], index: number) => ReactNode;
  of: ItemType;
};

const List = <T extends unknown[]>({ children, of }: ListProps<T>) => (
  <>{of.map((props, index) => children(props, index))}</>
);

export default List;

interface ItemProps {
  itemName: string;
  className?: string;
}

const ListItem = ({ itemName, className }: ItemProps) => {
  return <li className={className}>{itemName}</li>;
};

export default ListItem;

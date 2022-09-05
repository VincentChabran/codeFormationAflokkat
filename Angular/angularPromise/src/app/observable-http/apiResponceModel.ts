export interface ApiResponce {
  items: ItemsDetails[];
}

export interface ItemsDetails {
  id: number;
  title: string;
  smallThumbnail: string;
}

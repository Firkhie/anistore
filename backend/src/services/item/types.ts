export type ItemParams = {
  user_id: string;
}

export type CreateEditItemParams = {
  id?: string;
  name?: string;
  description?: string;
  stock?: number;
  price?: number;
  status?: "ready_stock" | "out_of_stock" | "deleted";
}

export type updateItemHistoryParams = {
  item_id: string;
  user_id: string;
  action: string;
  context?: string;
  quantity?: number;
}
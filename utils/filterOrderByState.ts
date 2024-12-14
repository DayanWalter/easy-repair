export interface FilterState {
  open: boolean;
  inProgress: boolean;
  completed: boolean;
  billed: boolean;
}

export const filterOrdersByState = (
  orders: Database["public"]["Tables"]["orders"]["Row"][],
  filters: FilterState,
) => {
  return orders.filter((order) => {
    switch (order.state) {
      case "Open":
        return filters.open;
      case "In Progress":
        return filters.inProgress;
      case "Completed":
        return filters.completed;
      case "Billed":
        return filters.billed;
      default:
        return false;
    }
  });
};

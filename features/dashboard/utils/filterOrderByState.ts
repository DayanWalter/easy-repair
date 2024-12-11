export interface FilterState {
	offen: boolean;
	inBearbeitung: boolean;
	erledigt: boolean;
	abgerechnet: boolean;
}

export const filterOrdersByState = (
	orders: Database["public"]["Tables"]["orders"]["Row"][],
	filters: FilterState,
) => {
	return orders.filter((order) => {
		if (filters.offen && order.state === "Offen") return true;
		if (filters.inBearbeitung && order.state === "In Bearbeitung") return true;
		if (filters.erledigt && order.state === "Erledigt") return true;
		if (filters.abgerechnet && order.state === "Abgerechnet") return true;
		return false;
	});
};

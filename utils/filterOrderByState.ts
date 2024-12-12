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
		switch (order.state) {
			case "Offen":
				return filters.offen;
			case "In Bearbeitung":
				return filters.inBearbeitung;
			case "Erledigt":
				return filters.erledigt;
			case "Abgerechnet":
				return filters.abgerechnet;
			default:
				return false;
		}
	});
};

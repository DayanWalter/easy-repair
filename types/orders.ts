export type Order = {
	id?: string;
	customer_id?: string;
	verified: boolean;
	state?: string;
	again: boolean;
	old_order_id?: string;
	account_access?: string;
	account_access_more?: string;
	article_device?: string;
	article_manufacturer?: string;
	article_accessory?: string;
	date_start?: Date;
	date_done?: Date;
	date_taken?: Date;
	error_description?: string;
	diagnose?: string;
	offer?: string;
	repair?: string;
	comment?: string;
	employee?: string;
	repair_time?: string;
	labor_costs?: number;
	material_costs?: number;
	total_costs?: number;
};

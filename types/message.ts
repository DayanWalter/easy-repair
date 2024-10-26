export type Message = {
	id?: string;
	user_id?: string;
	order_id: number;
	text: string;
	author: string;
	created_at?: string;
};

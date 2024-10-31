import type { Database as DB } from "@/types/database.types";

declare global {
	export type Database = DB;
}

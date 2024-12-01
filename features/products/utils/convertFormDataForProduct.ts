export default function convertFormDataForProduct(
	formData: FormData,
): Omit<Database["public"]["Tables"]["products"]["Insert"], "user_id"> {
	return {
		name: formData.get("name") as string,
		description: formData.get("description") as string,
		price: Number(formData.get("price")),
		category: formData.get("category") as string,
		stock: Number(formData.get("stock")),
		sku: formData.get("sku") as string,
		manufacturer: formData.get("manufacturer") as string,
		image: formData.get("image") as string,
	};
}

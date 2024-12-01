export default function convertFormDataForCustomer(
	formData: FormData,
): Database["public"]["Tables"]["customers"]["Insert"] {
	return {
		name: formData.get("name") as string,
		adress: formData.get("adress") as string,
		phone: formData.get("phone") as string,
		email: formData.get("email") as string,
	};
}

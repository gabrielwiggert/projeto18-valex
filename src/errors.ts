export function notFoundError(entity: string) {
	return {
		type: "error_not_found",
		message: `Could not find specified "${entity}"!`
	};
}

export function alreadyExists(entity: string) {
	return {
		type: "error_already_exists",
		message: `"${entity}" already exists!`
	};
}
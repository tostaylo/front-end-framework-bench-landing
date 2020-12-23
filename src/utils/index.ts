export async function fetchData<T>(url: string): Promise<T | undefined> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			console.log(response);
			throw new Error(`Data fetch unsuccessful for ${url}`);
		}

		const json = await response.json();
		const data = await json;

		return data;
	} catch (err) {
		console.log(err);
		return;
	}
}

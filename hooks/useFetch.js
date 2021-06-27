import { useState, useEffect, useCallback } from "react";

const useFetch = (query, offset) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [list, setList] = useState([]);
	const [checkQuery, setCheckQuery] = useState("");
	const [queryChanged, setQueryChanged] = useState(false);

	const sendQuery = useCallback(
		async (query) => {
			try {
				setLoading(true);
				setError(false);
				const res = await fetch(
					`https://api.giphy.com/v1/gifs/search?api_key=mvca6YkMyvd1PYBJRiIYzFJwRNpTBhaK&q=${query}&limit=12&offset=${offset}&rating=pg-13&lang=en`
				);
				const data = await res.json();
				const previewList = await data.data.map(
					(gif) => gif.images.preview.mp4
				);
				setList((pre) => [...pre, ...previewList]);
				setLoading(false);
			} catch (err) {
				setError(err);
			}
		},
		[query, offset]
	);

	useEffect(() => {
		if (checkQuery !== query) {
			setQueryChanged(true);
			setCheckQuery(query);
		} else {
			setQueryChanged(false);
		}

		if (queryChanged) {
			setList([]);
		}
	}, [query]);

	useEffect(() => {
		sendQuery(query);
	}, [query, sendQuery, offset]);

	return { loading, error, list };
};

export default useFetch;

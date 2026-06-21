/**
 * Normalizes backend API responses into a flat shape reducers/actions expect.
 *
 * Backend envelope:
 *   { status, statusText, data: { message, data?: payload }, meta }
 *
 * Paginated envelope:
 *   { status, statusText, data: { message, pageNumber, pageSize, totalPages, totalDocuments, documents }, meta }
 */
export function normalizeApiResponse(body: unknown): unknown {
	if (!body || typeof body !== "object") {
		return body;
	}

	const envelope = body as Record<string, unknown>;

	// Already normalized (no status wrapper)
	if (!("status" in envelope) || !("data" in envelope)) {
		return body;
	}

	const inner = envelope.data;
	if (!inner || typeof inner !== "object") {
		return body;
	}

	const innerData = inner as Record<string, unknown>;

	// Paginated list response
	if ("documents" in innerData && Array.isArray(innerData.documents)) {
		return {
			message: innerData.message,
			data: {
				documents: innerData.documents,
				pageNumber: innerData.pageNumber,
				pageSize: innerData.pageSize,
				totalPages: innerData.totalPages,
				totalDocuments: innerData.totalDocuments,
			},
		};
	}

	// Success response with nested payload
	const payload = innerData.data;
	if (payload && typeof payload === "object" && !Array.isArray(payload)) {
		return {
			message: innerData.message,
			...(payload as Record<string, unknown>),
		};
	}

	return {
		message: innerData.message,
		data: payload ?? null,
	};
}

export function getApiErrorMessage(error: unknown): string {
	const err = error as {
		response?: { data?: { message?: string; data?: { message?: string } } };
	};

	return (
		err?.response?.data?.data?.message ||
		err?.response?.data?.message ||
		"Something went wrong!"
	);
}

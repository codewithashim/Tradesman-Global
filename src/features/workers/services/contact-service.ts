/*
 * "Contact Admin" requests about a worker. Phase 1 has no backend, so this
 * resolves locally and nothing is sent; the UI says so. Phase 2: POST to the
 * API with the same input/output types.
 */

export interface ContactRequestInput {
  workerSlug: string;
  name: string;
  organisation: string;
  contact: string;
  message: string;
}

export interface ContactRequestResult {
  reference: string;
}

export async function submitContactRequest(input: ContactRequestInput): Promise<ContactRequestResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  const suffix = input.workerSlug.split("-").pop() ?? "0000";
  return { reference: `TG-${suffix}-${Math.floor(1000 + Math.random() * 9000)}` };
}

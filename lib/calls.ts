export const BASE_URL = `https://aircall-api.onrender.com`;

const baseHeaders = {
    "Content-Type": "application/json",
};

export default class Calls {
    static async UnarchiveAll() {
        const res = await fetch(`${BASE_URL}/reset`, {
            method: "PATCH",
        });

        const json = await res.json();
        return json;
    }

    static async ArchiveCallById(callId: string) {
        await fetch(`${BASE_URL}/activities/${callId}`, {
            ...baseHeaders,
            method: "PATCH",
            body: JSON.stringify({
                is_archived: true,
            }),
        });
    }
}

export type Activity = {
    direction: "inbound" | "outbound";
    from: number;
    to: number;
    via: number;
    duration: number;
    is_archived: boolean;
    call_type: "answered" | "missed" | "voicemail";
    id: string;
    created_at: string;
};

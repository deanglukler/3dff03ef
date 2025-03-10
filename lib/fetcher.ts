export async function fetcher({
    url,
    method = "GET",
    body,
    json = true,
    headers = {},
    quietResponseStatusWarnings = [],
}) {
    const responseDebugInfo = {};

    if (json) {
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
    }

    const headersFull = new Headers();
    Object.entries(headers).forEach(([k, v]) => {
        headersFull.append(k, v);
    });

    try {
        const r = await fetch(url, {
            method: method,
            headers: headersFull,
            body: JSON.stringify(body),
        });

        responseDebugInfo.status = r.status;
        responseDebugInfo.statusText = r.statusText;
        responseDebugInfo.url = r.url;
        responseDebugInfo.headers = headers;
        responseDebugInfo.ok = r.ok;
        responseDebugInfo.type = r.type;
        responseDebugInfo.redirected = r.redirected;
        responseDebugInfo.response = null;

        try {
            if (json) {
                responseDebugInfo.response = await r.json();
            } else {
                responseDebugInfo.response = await r.text();
            }

            if (
                r.status >= 400 &&
                !quietResponseStatusWarnings.includes(r.status)
            ) {
                console.log(`utils.fetcher received status ${
                    r.status
                } (this may cause error)
INFO:
${JSON.stringify(responseDebugInfo, null, 2)}`);
            }

            return responseDebugInfo.response;
        } catch (error) {
            const responseBody = await r.text();
            console.log(`Error parsing fetcher response into (json: ${json}) (text: ${!json})
response body:
${responseBody}
`);
            throw error;
        }
    } catch (error) {
        console.log(`Error fetching (method: ${method}) => ${url}
- - -
debug info:
${JSON.stringify(responseDebugInfo, null, 2)}
- - -
error:
${error}`);
        throw error;
    }
}
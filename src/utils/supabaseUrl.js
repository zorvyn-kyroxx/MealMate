const apiPathSuffix = /\/(?:auth|rest|storage|functions|realtime)\/v1\/?$/i;
const nestedApiPath = /\/(?:auth|rest|storage|functions|realtime)\/v1\/.+/i;

export function normalizeSupabaseUrl(value) {
  if (typeof value !== "string" || !value.trim() || /your-project|placeholder/i.test(value)) {
    return null;
  }

  try {
    const url = new URL(value.trim());
    const isLocalHttp = url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname);

    if (
      (url.protocol !== "https:" && !isLocalHttp) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      nestedApiPath.test(url.pathname)
    ) {
      return null;
    }

    url.pathname = url.pathname.replace(apiPathSuffix, "") || "/";
    return url.href.replace(/\/$/, "");
  } catch {
    return null;
  }
}

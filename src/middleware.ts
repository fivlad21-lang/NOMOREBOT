import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

export const config = {
  // Keep estates demo under locale prefixes. Root `/`, checkout, thanks, api stay free.
  matcher: ["/(ru|en|bg)/:path*"],
};

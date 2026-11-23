import { useEffect, useState } from "react";

// Hash routing so the page also works as a single static file.
// "#/brand/<id>" opens a brand page; any other hash is an anchor on the home page.
export const brandHref = (id: string) => `#/brand/${id}`;

export type Route = { name: "home"; anchor?: string } | { name: "brand"; id: string };

function parse(hash: string): Route {
  const m = hash.match(/^#\/brand\/([a-z0-9-]+)/);
  if (m) return { name: "brand", id: m[1] };
  return { name: "home", anchor: hash.replace(/^#/, "") || undefined };
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

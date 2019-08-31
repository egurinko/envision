import VueRouter from "vue-router";

import { RouteOption } from "./route.types";

declare module "vue-router/types/router" {
  interface VueRouter {
    pushTo<T extends keyof RouteOption>(to: T, option: RouteOption[T]): Promise<void>;
  }
};

export const enhance = (router: VueRouter): VueRouter => {
  router.pushTo = function<T extends keyof RouteOption>(
    to: T,
    option: RouteOption[T],
  ) {
    return new Promise<void>((resolve, reject) => {
      this.push({
        name: to,
        ...(option as any)
      }, resolve, reject);
      // eslint-disable-next-line
    }).catch(() => console.debug("ERROR"));
  };
  return router;
};
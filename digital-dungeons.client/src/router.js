import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard, authSettled } from "@bcwdev/auth0provider-client";

function loadPage(page) {
  return () => import(`./pages/${page}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadPage("HomePage"),
  },
  {
    path: "/information",
    name: "Information",
    component: loadPage("InformationPage"),
  },
  {
    path: "/campaigns",
    name: "Campaigns",
    component: loadPage("CampaignsPage"),
  },
  {
    path: "/campaigns/:campaignId",
    name: "CampaignDetails",
    component: loadPage("CampaignDetailsPage"),
  },
  {
    path: "/campaigns/:campaignId/encounter/:encounterId",
    name: "EncounterDetails",
    component: loadPage("EncounterDetailsPage"),
    beforeEnter: authGuard,
  },
  {
    path: "/about",
    name: "About",
    component: loadPage("AboutPage"),
  },
  {
    path: "/account",
    name: "Account",
    component: loadPage("AccountPage"),
    beforeEnter: authGuard,
  },
];

export const router = createRouter({
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  history: createWebHashHistory(),
  routes,
});

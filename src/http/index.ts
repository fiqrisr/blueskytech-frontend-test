import ky from "ky";

import { BASE_POKEMON_API_URL } from "@/configs";

export const httpClient = ky.extend({
  prefixUrl: BASE_POKEMON_API_URL
});

import axios, { AxiosStatic } from "axios"
import _Vue from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $http: AxiosStatic
    }
}

export default (Vue: typeof _Vue, options: { baseUrl: string }): void => {
    const client = axios.create({
        baseURL: options.baseUrl
    });

    Vue.prototype.$http = client;
}
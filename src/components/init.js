import { provide, ref, reactive } from 'vue';
import { initLikes } from "@/components/pages/Likes.js"

export function init() {
    const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const isSideBarCollapse = width < 750 ? ref(true) : ref(false);
    provide("isSideBarCollapse", isSideBarCollapse);

    const Tab = reactive({
        activeTab: "0",
        tabIndex: 0,
        tabSet: new Set(),
        Tabs: [],
    });
    provide("Tab", Tab);

    const mediaData = reactive({});
    provide("mediaData", mediaData);

    const apiConfig = reactive({
        url: process.env.VUE_APP_API_URL
    });
    provide("apiConfig", apiConfig);

    const Likes = initLikes();
    provide("Likes", reactive(Likes));

}
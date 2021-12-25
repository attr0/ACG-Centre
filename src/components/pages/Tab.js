import { shallowRef } from 'vue';

import ContributionPage from '@/components/pages/ContributionPage';
import HomePage from '@/components/pages/HomePage';
import HelloPage from '@/components/pages/HelloPage';
import VideoDictory from '@/components/pages/VideoDictory';
import VideoPage from '@/components/pages/VideoPage';
import LikesPage from '@/components/pages/LikesPage';
import HistoryPage from '@/components/pages/HistoryPage';
import SettingPage from '@/components/pages/SettingPage';

export function loadTab() {
    if (localStorage.getItem("Tab") !== 'undefined') {
        const res = JSON.parse(localStorage.getItem("Tab"))
        if (res) return res;
        else return [];
    }
    else return [];
}

export function saveTab(Tab) {
    localStorage.setItem("Tab", JSON.stringify(Tab.Tabs));
}

export function initTab(Tab) {

    Tab.addPage = function (tabData) {
        if (Tab.tabSet.has(tabData.id)) {
            Tab.activeTab = tabData.id;
            return;
        }
        ++Tab.tabIndex;
        Tab.Tabs.push(tabData);
        Tab.tabSet.add(tabData.id);
        Tab.activeTab = tabData.id;
        saveTab(Tab)
    };

    Tab.removePage = function (tabId) {
        const tabs = Tab.Tabs;
        let activeId = Tab.activeTab;
        if (activeId === tabId) {
            tabs.forEach((tab, index) => {
                if (tab.id === tabId) {
                    const nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeId = nextTab.id;
                    }
                }
            });
        }
        Tab.activeTab = activeId;
        Tab.Tabs = tabs.filter((tab) => tab.id !== tabId);
        Tab.tabSet.delete(tabId);
        saveTab(Tab)
    };

    Tab.addHomePage = function () {
        Tab.addPage({
            title: "Home",
            id: "Home",
            component: shallowRef(HomePage),
            config: {},
        });
    };

    Tab.addContributionPage = function () {
        Tab.addPage({
            title: "Contribution",
            id: "Contribution",
            component: shallowRef(ContributionPage),
            config: {},
        });
    };

    Tab.addLikesPage = function () {
        Tab.addPage({
            title: "Likes",
            id: "Likes",
            component: shallowRef(LikesPage),
            config: {},
        });

    }

    Tab.addHistoryPage = function () {
        Tab.addPage({
            title: "History",
            id: "History",
            component: shallowRef(HistoryPage),
            config: {},
        });
    }

    Tab.addSettingPage = function () {
        Tab.addPage({
            title: "Setting",
            id: "Setting",
            component: shallowRef(SettingPage),
            config: {},
        });
    }

    Tab.addHelloPage = function () {
        const newTabId = `${Tab.tabIndex}`;
        Tab.addPage({
            title: "New Tab " + newTabId,
            id: "hello " + newTabId,
            component: shallowRef(HelloPage),
            config: {
                title: "hello",
                content: "New Tab " + newTabId,
            },
        });
    }

    Tab.openVideoDictory = function (config) {
        Tab.addPage({
            title: config.title,
            id: config.title,
            component: shallowRef(VideoDictory),
            config: config
        })
    }

    Tab.openVideoPage = function (config) {
        Tab.addPage({
            title: config.title,
            id: config.path,
            component: shallowRef(VideoPage),
            config: config
        })
    }

    const tmpTabList = loadTab();
    if (tmpTabList.length == 0) {
        Tab.addHomePage();
    } else {
        tmpTabList.forEach(tabItem => {
            let pageType = tabItem.component.name;
            if (pageType === "HomePage") Tab.addHomePage();
            if (pageType === "ContributionPage") Tab.addContributionPage();
            if (pageType === "HistoryPage") Tab.addHistoryPage();
            if (pageType === "LikesPage") Tab.addLikesPage();
            if (pageType === "SettingPage") Tab.addSettingPage();
            if (pageType === "VideoDictory") Tab.openVideoDictory(tabItem.config);
            if (pageType === "VideoPage") Tab.openVideoPage(tabItem.config);
        })
    }
}
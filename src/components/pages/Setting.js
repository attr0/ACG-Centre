export function cleanHistory() {
    localStorage.removeItem("records");
    const len = localStorage.length;
    if(len === 0) {
        window.location.reload();
        return ;
    }
    for (let i = 0; i < len; ++i) {
        let key = localStorage.key(i);
        if (key.includes('History')) localStorage.removeItem(key);
    }
    window.location.reload();
}

export function cleanTabs() {
    localStorage.removeItem("Tab");
    window.location.reload();
}

export function cleanLikes() {
    localStorage.removeItem("Likes");
    window.location.reload();
}

function backUpAll() {
    const tmp = [];
    const len = localStorage.length;
    if(len === 0) {
        return tmp;
    }
    for (let i = 0; i < len; ++i) {
        tmp.push({
            name: localStorage.key(i),
            value: localStorage.getItem(localStorage.key(i))
        })
    }
    return JSON.stringify(tmp);
}

function recoverAll(data) {
    data.forEach(item => {
        localStorage.setItem(item.name, item.value);
    })
    window.location.reload();
}

export function uploadData(dataHandler, apiConfig, key) {
    startLoading(dataHandler);
    let path = apiConfig.url + '/api/upload?key=' + key + '&value=' + backUpAll();
    path = encodeURI(path)
    fetch(path, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
    }).catch(error => console.log(error))
        .finally(() => closeLoading(dataHandler));
}

export function downloadData(dataHandler, apiConfig, key) {
    startLoading(dataHandler);
    let path = apiConfig.url + '/api/download?key=' + key;
    path = encodeURI(path)
    fetch(path, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
    }).then(response => response.json())
        .then(data => recoverAll(data))
        .catch(error => console.log(error))
        .finally(() => closeLoading(dataHandler));
}

function startLoading(dataHandler) {
    dataHandler.loading = true;
}

function closeLoading(dataHandler) {
    dataHandler.loading = false;
}
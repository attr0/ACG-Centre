export function loadRootDictory(dataHandler, mediaData, apiConfig) {
    startLoading(dataHandler);
    loadApi('/', apiConfig).then(response => response.json())
        .then(data => mediaData.root = extractRootDictory(data))
        .catch(error => { console.log(error); mediaData.root = [] })
        .finally(() => closeLoading(dataHandler));
}

export async function loadVideo(config, dataHandler, mediaData, apiConfig) {
    startLoading(dataHandler);
    const targetPath = config.type == 0 ? config.parentPath : config.path;

    await loadApi(targetPath, apiConfig).then(response => response.json())
        .then(async (data) => mediaData[config.path] = await parseVideo(data, config, targetPath, apiConfig.url, {
            config, dataHandler, mediaData, apiConfig
        }))
        .catch(error => { console.log(error); mediaData[config.path] = []; })
        .finally(() => closeLoading(dataHandler))
}

async function parseVideo(response, config, targetPath, apiUrl, backup) {
    const re = new RegExp("\\[(.+?)\\](.+?)\\[(.+?)\\]", "u");
    const target = config.title.split("！")[0].split("!")[0].split("?")[0].split("？")[0].trim();

    let tmp = [];
    let type = 0;
    response['files'].forEach(item => {
        if (item['name'].includes('日文配音')) { type = 1; }
        if (item['name'] === 'Baha') { type = 2; }
        if (item['name'].includes(target) && isVideo(item['mimeType'])) tmp.push(item['name']);
    })

    if (type === 1) {
        tmp = await peiyinVideo(backup.config, backup.dataHandler, backup.mediaData, backup.apiConfig, '/日文配音/');
        return tmp;
    }
    else if(type === 2 ) {
        tmp = await peiyinVideo(backup.config, backup.dataHandler, backup.mediaData, backup.apiConfig, '/Baha/');
        return tmp;
    }
    return tmp.map(item => {
        return {
            name: re.exec(item)[3],
            url: apiUrl + targetPath + item
        }
    }).sort((x, y) => x['name'].localeCompare(y['name']));
}


function isVideo(mimeType) {
    return mimeType.includes('video');
}

async function peiyinVideo(config, dataHandler, mediaData, apiConfig, extention) {
    const targetPath = config.path + extention; 
    let tmp = []
    await loadApi(targetPath, apiConfig).then(response => response.json())
        .then(data => { tmp = parseVideo(data, config, targetPath, apiConfig.url); })
        .catch(error => { console.log(error); tmp = [] })
    return tmp;
}



export function loadDictory(dataHandler, mediaData, apiConfig) {
    const targetPath = dataHandler.targetPath;
    startLoading(dataHandler);
    loadApi(targetPath, apiConfig).then(response => response.json())
        .then(data => mediaData[targetPath] = parseDictory(data, targetPath))
        .catch(error => { console.log(error); mediaData[targetPath] = []; })
        .finally(() => closeLoading(dataHandler));
}

function parseDictory(response, targetPath) {
    let unOrdered = [];
    let Ordered = [];

    response['files'].forEach(item => {
        if (!item.mimeType.includes("folder")) unOrdered.push(item['name'])
        else if (!item.name.includes("合集")) Ordered.push(item['name']);
    })

    return parseUnorderedDictory(unOrdered, targetPath).concat(parseOrderedDictory(Ordered, targetPath))
        .sort((x, y) => x['name'].localeCompare(y['name']));
}

function parseUnorderedDictory(data, targetPath) {
    const re = new RegExp("\\[(.+?)\\](.+?)\\[", "u");
    data = data.map(item => re.exec(item)[2])
    data = [...new Set(data)]
    return data.map(item => { return { name: item, type: 0, path: targetPath + item + '/', parentPath: targetPath } });
}

function parseOrderedDictory(data, targetPath) {
    return data.map(item => {
        let name = item;
        if (name.includes("日文")) name = name.replace("/日文配音", '');
        return { name: name, type: 1, path: targetPath + item + '/', parentPath: targetPath }
    });
}

function loadApi(path, apiConfig) {
    return fetch(apiConfig.url + path, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
    });
}

function extractRootDictory(response) {
    const tmp = [];
    response["files"].forEach(item => { if (item["name"] !== "sw.js") tmp.push({ season: formatRootDate(item["name"]), date: toDate(item["name"]), path: item["name"] + '/' }) });
    return tmp.sort((a, b) => b.date - a.date);
}

function formatRootDate(item) {
    if (item === "ANi") return "《学习资料》"
    const tmp = item.split('-');
    if (tmp[1].length == 1) tmp[1] = '0' + tmp[1];
    return `${tmp[0]} 年 ${tmp[1]} 月`;
}

function toDate(item) {
    if (item === "ANi") return new Date('2000', 0, 1, 0, 0, 0);
    const tmp = item.split('-');
    return new Date(parseInt(tmp[0]), parseInt(tmp[1]) - 1, 1, 0, 0, 0);
}

function startLoading(dataHandler) {
    dataHandler.loading = true;
}

function closeLoading(dataHandler) {
    dataHandler.loading = false;
}
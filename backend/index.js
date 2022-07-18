const API_URL = 'http://aniopen.an-i.workers.dev/';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const VIDEO = ['.avi', '.rmvb', '.rm', '.mp4', '.flv', '.mpg', '.mkv', '.mov', '.wmv', '.rmvb', '.mp'];
  let url = new URL(request.url);
  if(url.pathname.indexOf('api/upload') != -1) return storeValue(request);
  if(url.pathname.indexOf('api/download') != -1) return getValue(request);

  let flag = false;
  VIDEO.forEach(item => {
    if(url.pathname.indexOf(item) != -1) flag = true
  })
  if(flag) return handleVideoRequest(request)
  else return handleAPIRequest(request)
}

async function storeValue(request) {
  const origin = request.headers.get('Origin');
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  const value = searchParams.get('value');

  if(key && key !== 'undefined' && value && value !== 'undefined') await ACGAPI.put(key, value, { expirationTtl: 3600 });

  let response = new Response("\{\"status\":\"sus\"\}");
  response.headers.set('content-type', 'application/json');
  response.headers.set('Access-Control-Allow-Origin', origin); 
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.append('Access-Control-Allow-Credentials', 'true');
  response.headers.append('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  response.headers.append('Access-Control-Expose-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  return response;
}

async function getValue(request) {
  const origin = request.headers.get('Origin');
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  let res = "{}";
  let tmp = null;
  if(key && key !== 'undefined') tmp = await ACGAPI.get(key);
  if(tmp) res = tmp;

  let response = new Response(res);
  response.headers.set('content-type', 'application/json');
  response.headers.append('Access-Control-Allow-Origin', origin); 
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.append('Access-Control-Allow-Credentials', 'true');
  response.headers.append('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  response.headers.append('Access-Control-Expose-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  return response;

}

async function handleVideoRequest(request) {
  const origin = request.headers.get('Origin');

  let url = new URL(request.url)

  let newUrl= new URL(API_URL);
  newUrl.pathname = url.pathname;

  const modifiedRequest = new Request(newUrl, {
    headers: request.headers,
    method: request.method,
    redirect: request.redirect,
    cf: {
      scrapeShield: false,
      cacheTtl: 3600
    }
  })
  
  modifiedRequest.headers.set('Origin', API_URL);
  modifiedRequest.headers.set('Refer', API_URL);

  let response = await fetch(modifiedRequest);

  response = new Response(response.body, response);
  response.headers.set('Access-Control-Allow-Origin', '*'); 
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.append('Access-Control-Allow-Credentials', 'true');
  response.headers.append('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  response.headers.append('Access-Control-Expose-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  response.headers.append('Vary', 'Origin');
  return response;
}

async function handleAPIRequest(request) {
  const origin = request.headers.get('Origin');
  
  let url = new URL(request.url)

  let newUrl= new URL(API_URL);
  newUrl.pathname = url.pathname;

  const modifiedRequest = new Request(newUrl, {
    body: "{\"password\":\"null\"}",
    headers: request.headers,
    method: 'POST',
    redirect: request.redirect,
    cf: {
      scrapeShield: false,
      cacheTtl: 3600
    }
  });
  
  modifiedRequest.headers.set('Origin', API_URL);
  modifiedRequest.headers.set('Refer', API_URL);

  let response = await fetch(modifiedRequest);

  response = new Response(response.body, response);
  response.headers.set('content-type', 'application/json');
  response.headers.set('Access-Control-Allow-Origin', origin); 
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.append('Access-Control-Allow-Credentials', 'true');
  response.headers.append('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  response.headers.append('Access-Control-Expose-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  response.headers.append('Cache-control', 'max-age=3600');
  return response;
};

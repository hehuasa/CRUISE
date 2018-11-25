import fetch from 'dva/fetch';

export default function request(url, option) {
  const newOptions = { ...option };
  newOptions.headers = { // dataType is json
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=utf-8',
    ...newOptions.headers,
  };
  if (newOptions.body) {
    newOptions.body = JSON.stringify(newOptions.body);
  }
  return fetch(url, newOptions).then(res => res.json());
}

// export default function request(url, option) {
//     const options = {
//         expirys: isAntdPro(),
//         ...option,
//     };
//     /**
//      * Produce fingerprints based on url and parameters
//      * Maybe url has the same parameters
//      */
//     const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
//     const hashcode = hash
//         .sha256()
//         .update(fingerprint)
//         .digest('hex');
//
//     const defaultOptions = {
//         credentials: 'include',
//     };
//     const newOptions = { ...defaultOptions, ...options };
//     if (
//         newOptions.method === 'POST' ||
//         newOptions.method === 'PUT' ||
//         newOptions.method === 'DELETE'
//     ) {
//         if (!(newOptions.body instanceof FormData)) {
//             newOptions.headers = {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json; charset=utf-8',
//                 ...newOptions.headers,
//             };
//             newOptions.body = JSON.stringify(newOptions.body);
//         } else {
//             // newOptions.body is FormData
//             newOptions.headers = {
//                 Accept: 'application/json',
//                 ...newOptions.headers,
//             };
//         }
//     }
//
//     const expirys = options.expirys && 60;
//     // options.expirys !== false, return the cache,
//     if (options.expirys !== false) {
//         const cached = sessionStorage.getItem(hashcode);
//         const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
//         if (cached !== null && whenCached !== null) {
//             const age = (Date.now() - whenCached) / 1000;
//             if (age < expirys) {
//                 const response = new Response(new Blob([cached]));
//                 return response.json();
//             }
//             sessionStorage.removeItem(hashcode);
//             sessionStorage.removeItem(`${hashcode}:timestamp`);
//         }
//     }
//     return fetch(url, newOptions)
//         .then(checkStatus)
//         .then(response => cachedSave(response, hashcode))
//         .then(response => {
//             // DELETE and 204 do not return data by default
//             // using .json will report an error.
//             if (newOptions.method === 'DELETE' || response.status === 204) {
//                 return response.text();
//             }
//             return response.json();
//         })
//         .catch(e => {
//             const status = e.name;
//             if (status === 401) {
//                 // @HACK
//                 /* eslint-disable no-underscore-dangle */
//                 window.g_app._store.dispatch({
//                     type: 'login/logout',
//                 });
//                 return;
//             }
//             // environment should not be used
//             if (status === 403) {
//                 router.push('/exception/403');
//                 return;
//             }
//             if (status <= 504 && status >= 500) {
//                 router.push('/exception/500');
//                 return;
//             }
//             if (status >= 404 && status < 422) {
//                 router.push('/exception/404');
//             }
//         });
// }

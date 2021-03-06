var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { stringify } from 'query-string';
import { fetchUtils, GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, UPDATE_MANY, DELETE, DELETE_MANY, } from 'react-admin';
/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (function (apiUrl, httpClient) {
    if (httpClient === void 0) { httpClient = fetchUtils.fetchJson; }
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    var convertDataRequestToHTTP = function (type, resource, params) {
        var _a;
        var url = '';
        var options = {};
        switch (type) {
            case GET_LIST: {
                var _b = params.pagination, page = _b.page, perPage = _b.perPage;
                var _c = params.sort, field = _c.field, order = _c.order;
                var query = __assign({}, fetchUtils.flattenObject(params.filter), { _sort: field, _order: order, _start: (page - 1) * perPage, _end: page * perPage });
                url = apiUrl + "/" + resource + "?" + stringify(query);
                break;
            }
            case GET_ONE:
                url = apiUrl + "/" + resource + "/" + params.id;
                break;
            case GET_MANY_REFERENCE: {
                var _d = params.pagination, page = _d.page, perPage = _d.perPage;
                var _e = params.sort, field = _e.field, order = _e.order;
                var query = __assign({}, fetchUtils.flattenObject(params.filter), (_a = {}, _a[params.target] = params.id, _a._sort = field, _a._order = order, _a._start = (page - 1) * perPage, _a._end = page * perPage, _a));
                url = apiUrl + "/" + resource + "?" + stringify(query);
                break;
            }
            case UPDATE:
                url = apiUrl + "/" + resource + "/" + params.id;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = apiUrl + "/" + resource;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = apiUrl + "/" + resource + "/" + params.id;
                options.method = 'DELETE';
                break;
            case GET_MANY: {
                var query = {
                    id: params.ids,
                };
                url = apiUrl + "/" + resource + "?" + stringify(query);
                break;
            }
            default:
                throw new Error("Unsupported fetch action type " + type);
        }
        return { url: url, options: options };
    };
    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    var convertHTTPResponse = function (response, type, resource, params) {
        var headers = response.headers, json = response.json;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!headers.has('x-total-count')) {
                    throw new Error('The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?');
                }
                return {
                    data: json,
                    total: parseInt(headers
                        .get('x-total-count')
                        .split('/')
                        .pop(), 10),
                };
            case CREATE:
                return { data: __assign({}, params.data, { id: json.id }) };
            default:
                return { data: json };
        }
    };
    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return function (type, resource, params) {
        // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient(apiUrl + "/" + resource + "/" + id, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                });
            })).then(function (responses) { return ({
                data: responses.map(function (response) { return response.json; }),
            }); });
        }
        // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient(apiUrl + "/" + resource + "/" + id, {
                    method: 'DELETE',
                });
            })).then(function (responses) { return ({
                data: responses.map(function (response) { return response.json; }),
            }); });
        }
        var _a = convertDataRequestToHTTP(type, resource, params), url = _a.url, options = _a.options;
        return httpClient(url, options).then(function (response) {
            return convertHTTPResponse(response, type, resource, params);
        });
    };
});

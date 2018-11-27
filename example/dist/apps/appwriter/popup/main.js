/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "f8f1d463ae4b2f0707f6";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "popup/main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(2)(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/@one/core/lib sync recursive":
/*!**********************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib sync ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../node_modules/@one/core/lib sync recursive";

/***/ }),

/***/ "../../../node_modules/@one/core/lib/bootstrap.js":
/*!******************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/bootstrap.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = __webpack_require__(/*! ./factory */ "../../../node_modules/@one/core/lib/factory.js");
function bootstrap(module) {
    return __awaiter(this, void 0, void 0, function () {
        var factory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    factory = new factory_1.OneFactory(module);
                    return [4, factory.start()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/constants.js":
/*!******************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/constants.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SHARED_MODULE_METADATA = Symbol.for('Metadata<SharedModule>');
exports.SCOPE_METADATA = Symbol.for('Metadata<Scope>');
exports.PROVIDER_METADATA = Symbol.for('Metadata<Provider>');
exports.METADATA = {
    IMPORTS: 'imports',
    EXPORTS: 'exports',
    PROVIDERS: 'providers',
};
exports.SCOPES = {
    SINGLETON: 'singleton-scope',
    TRANSIENT: 'transient-scope',
    REQUEST: 'request-scope',
};
exports.PROVIDER_TYPES = {
    FACTORY: 'use-factory',
    CLASS: 'use-class',
    EXISTING: 'use-existing',
    VALUE: 'use-value',
    DEFAULT: 'provider',
};
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/index.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./inversify.decorators */ "../../../node_modules/@one/core/lib/decorators/inversify.decorators.js"));
__export(__webpack_require__(/*! ./injectable.decorator */ "../../../node_modules/@one/core/lib/decorators/injectable.decorator.js"));
__export(__webpack_require__(/*! ./multi-inject.decorator */ "../../../node_modules/@one/core/lib/decorators/multi-inject.decorator.js"));
__export(__webpack_require__(/*! ./inject.decorator */ "../../../node_modules/@one/core/lib/decorators/inject.decorator.js"));
__export(__webpack_require__(/*! ./module */ "../../../node_modules/@one/core/lib/decorators/module/index.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/inject.decorator.js":
/*!************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/inject.decorator.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "../../../node_modules/inversify/lib/inversify.js");
var registry_1 = __webpack_require__(/*! ../registry */ "../../../node_modules/@one/core/lib/registry.js");
function createLazyInjection(target, property) {
    return function (lazyInject, provider) {
        registry_1.Registry.assertProvider(provider);
        lazyInject(provider)(target, property);
    };
}
exports.createLazyInjection = createLazyInjection;
function Inject(provider) {
    return function (target, property) {
        if (!registry_1.Registry.hasForwardRef(provider)) {
            registry_1.Registry.assertProvider(provider, target.constructor.name);
            var token = registry_1.Registry.getInjectionToken(provider);
            return inversify_1.inject(token)(target, property);
        }
        registry_1.Registry.lazyInjects.add({
            target: target.constructor,
            forwardRef: provider,
            lazyInject: createLazyInjection(target, property),
        });
    };
}
exports.Inject = Inject;
//# sourceMappingURL=inject.decorator.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/injectable.decorator.js":
/*!****************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/injectable.decorator.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "../../../node_modules/inversify/lib/inversify.js");
var constants_1 = __webpack_require__(/*! ../constants */ "../../../node_modules/@one/core/lib/constants.js");
function Injectable() {
    return function (target) {
        Reflect.defineMetadata(constants_1.PROVIDER_METADATA, true, target);
        inversify_1.injectable()(target);
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.decorator.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/inversify.decorators.js":
/*!****************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/inversify.decorators.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "../../../node_modules/inversify/lib/inversify.js");
exports.Optional = inversify_1.optional;
exports.PostConstruct = inversify_1.postConstruct;
exports.TargetName = inversify_1.targetName;
exports.Unmanaged = inversify_1.unmanaged;
exports.Decorate = inversify_1.decorate;
exports.Tagged = inversify_1.tagged;
exports.Named = inversify_1.named;
//# sourceMappingURL=inversify.decorators.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/module/global.decorator.js":
/*!*******************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/module/global.decorator.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../../constants */ "../../../node_modules/@one/core/lib/constants.js");
function Global() {
    return function (target) {
        Reflect.defineMetadata(constants_1.SHARED_MODULE_METADATA, true, target);
    };
}
exports.Global = Global;
//# sourceMappingURL=global.decorator.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/module/index.js":
/*!********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/module/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./module.decorator */ "../../../node_modules/@one/core/lib/decorators/module/module.decorator.js"));
__export(__webpack_require__(/*! ./global.decorator */ "../../../node_modules/@one/core/lib/decorators/module/global.decorator.js"));
__export(__webpack_require__(/*! ./request-scope.decorator */ "../../../node_modules/@one/core/lib/decorators/module/request-scope.decorator.js"));
__export(__webpack_require__(/*! ./transient-scope.decorator */ "../../../node_modules/@one/core/lib/decorators/module/transient-scope.decorator.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/module/module.decorator.js":
/*!*******************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/module/module.decorator.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "../../../node_modules/inversify/lib/inversify.js");
var reflector_1 = __webpack_require__(/*! ../../reflector */ "../../../node_modules/@one/core/lib/reflector.js");
function Module(metadata) {
    if (metadata === void 0) { metadata = {}; }
    return function (target) {
        reflector_1.Reflector.defineByKeys(metadata, target);
        inversify_1.injectable()(target);
    };
}
exports.Module = Module;
//# sourceMappingURL=module.decorator.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/module/request-scope.decorator.js":
/*!**************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/module/request-scope.decorator.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../../constants */ "../../../node_modules/@one/core/lib/constants.js");
function RequestScope() {
    return function (target) {
        Reflect.defineMetadata(constants_1.SCOPE_METADATA, constants_1.SCOPES.REQUEST, target);
    };
}
exports.RequestScope = RequestScope;
//# sourceMappingURL=request-scope.decorator.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/module/transient-scope.decorator.js":
/*!****************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/module/transient-scope.decorator.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(/*! ../../constants */ "../../../node_modules/@one/core/lib/constants.js");
function TransientScope() {
    return function (target) {
        Reflect.defineMetadata(constants_1.SCOPE_METADATA, constants_1.SCOPES.TRANSIENT, target);
    };
}
exports.TransientScope = TransientScope;
//# sourceMappingURL=transient-scope.decorator.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/decorators/multi-inject.decorator.js":
/*!******************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/decorators/multi-inject.decorator.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "../../../node_modules/inversify/lib/inversify.js");
var errors_1 = __webpack_require__(/*! ../errors */ "../../../node_modules/@one/core/lib/errors/index.js");
var registry_1 = __webpack_require__(/*! ../registry */ "../../../node_modules/@one/core/lib/registry.js");
function MultiInject(token) {
    return function (target, propertyKey, index) {
        if (!registry_1.Registry.isInjectionToken(token)) {
            throw new errors_1.MissingInjectionTokenException('@MultiInject()');
        }
        inversify_1.multiInject(token.name)(target, propertyKey, index);
    };
}
exports.MultiInject = MultiInject;
//# sourceMappingURL=multi-inject.decorator.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions-handler.js":
/*!**********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions-handler.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExceptionsHandler = (function () {
    function ExceptionsHandler() {
    }
    ExceptionsHandler.prototype.handle = function (exception) {
        console.error(exception.stack);
    };
    return ExceptionsHandler;
}());
exports.ExceptionsHandler = ExceptionsHandler;
//# sourceMappingURL=exceptions-handler.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions-zone.js":
/*!*******************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions-zone.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_handler_1 = __webpack_require__(/*! ./exceptions-handler */ "../../../node_modules/@one/core/lib/errors/exceptions-handler.js");
var messages_1 = __webpack_require__(/*! ./messages */ "../../../node_modules/@one/core/lib/errors/messages.js");
var ExceptionsZone = (function () {
    function ExceptionsZone() {
    }
    ExceptionsZone.run = function (zone) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, zone()];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.exceptionHandler.handle(e_1);
                        throw messages_1.UNHANDLED_RUNTIME_EXCEPTION;
                    case 3: return [2];
                }
            });
        });
    };
    ExceptionsZone.exceptionHandler = new exceptions_handler_1.ExceptionsHandler();
    return ExceptionsZone;
}());
exports.ExceptionsZone = ExceptionsZone;
//# sourceMappingURL=exceptions-zone.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/circular-dependency.exception.js":
/*!********************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/circular-dependency.exception.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var messages_1 = __webpack_require__(/*! ../messages */ "../../../node_modules/@one/core/lib/errors/messages.js");
var CircularDependencyException = (function (_super) {
    __extends(CircularDependencyException, _super);
    function CircularDependencyException(context) {
        return _super.call(this, messages_1.CircularDependencyMessage(context)) || this;
    }
    return CircularDependencyException;
}(runtime_exception_1.RuntimeException));
exports.CircularDependencyException = CircularDependencyException;
//# sourceMappingURL=circular-dependency.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/index.js":
/*!********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./circular-dependency.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/circular-dependency.exception.js"));
__export(__webpack_require__(/*! ./missing-required-dependency.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/missing-required-dependency.exception.js"));
__export(__webpack_require__(/*! ./invalid-module.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/invalid-module.exception.js"));
__export(__webpack_require__(/*! ./multi-provider.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/multi-provider.exception.js"));
__export(__webpack_require__(/*! ./unknown-provider.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/unknown-provider.exception.js"));
__export(__webpack_require__(/*! ./invalid-provider.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/invalid-provider.exception.js"));
__export(__webpack_require__(/*! ./missing-injection-token.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/missing-injection-token.exception.js"));
__export(__webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js"));
__export(__webpack_require__(/*! ./unknown-export.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/unknown-export.exception.js"));
__export(__webpack_require__(/*! ./unknown-module.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/unknown-module.exception.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/invalid-module.exception.js":
/*!***************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/invalid-module.exception.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var messages_1 = __webpack_require__(/*! ../messages */ "../../../node_modules/@one/core/lib/errors/messages.js");
var InvalidModuleException = (function (_super) {
    __extends(InvalidModuleException, _super);
    function InvalidModuleException(trace) {
        if (trace === void 0) { trace = []; }
        var _this = this;
        var scope = trace.map(function (module) { return module.name; }).join(' -> ');
        _this = _super.call(this, messages_1.InvalidModuleMessage(scope)) || this;
        return _this;
    }
    return InvalidModuleException;
}(runtime_exception_1.RuntimeException));
exports.InvalidModuleException = InvalidModuleException;
//# sourceMappingURL=invalid-module.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/invalid-provider.exception.js":
/*!*****************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/invalid-provider.exception.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var InvalidProviderException = (function (_super) {
    __extends(InvalidProviderException, _super);
    function InvalidProviderException(provider) {
        return _super.call(this, (provider.name ||
            provider.toString()) + " is invalid. Must be an InjectionToken or Injectable") || this;
    }
    return InvalidProviderException;
}(runtime_exception_1.RuntimeException));
exports.InvalidProviderException = InvalidProviderException;
//# sourceMappingURL=invalid-provider.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/missing-injection-token.exception.js":
/*!************************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/missing-injection-token.exception.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var messages_1 = __webpack_require__(/*! ../messages */ "../../../node_modules/@one/core/lib/errors/messages.js");
var MissingInjectionTokenException = (function (_super) {
    __extends(MissingInjectionTokenException, _super);
    function MissingInjectionTokenException(context) {
        return _super.call(this, messages_1.MissingInjectionTokenMessage(context)) || this;
    }
    return MissingInjectionTokenException;
}(runtime_exception_1.RuntimeException));
exports.MissingInjectionTokenException = MissingInjectionTokenException;
//# sourceMappingURL=missing-injection-token.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/missing-required-dependency.exception.js":
/*!****************************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/missing-required-dependency.exception.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var messages_1 = __webpack_require__(/*! ../messages */ "../../../node_modules/@one/core/lib/errors/messages.js");
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var MissingRequiredDependencyException = (function (_super) {
    __extends(MissingRequiredDependencyException, _super);
    function MissingRequiredDependencyException(name, reason) {
        return _super.call(this, messages_1.MissingRequiredDependencyMessage(name, reason)) || this;
    }
    return MissingRequiredDependencyException;
}(runtime_exception_1.RuntimeException));
exports.MissingRequiredDependencyException = MissingRequiredDependencyException;
//# sourceMappingURL=missing-required-dependency.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/multi-provider.exception.js":
/*!***************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/multi-provider.exception.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var messages_1 = __webpack_require__(/*! ../messages */ "../../../node_modules/@one/core/lib/errors/messages.js");
var MultiProviderException = (function (_super) {
    __extends(MultiProviderException, _super);
    function MultiProviderException(name) {
        return _super.call(this, messages_1.MultiProviderMessage(name)) || this;
    }
    return MultiProviderException;
}(runtime_exception_1.RuntimeException));
exports.MultiProviderException = MultiProviderException;
//# sourceMappingURL=multi-provider.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js":
/*!********************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/runtime.exception.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var RuntimeException = (function (_super) {
    __extends(RuntimeException, _super);
    function RuntimeException(msg) {
        if (msg === void 0) { msg = ''; }
        var _this = _super.call(this, msg) || this;
        _this.msg = msg;
        return _this;
    }
    RuntimeException.prototype.what = function () {
        return this.msg;
    };
    return RuntimeException;
}(Error));
exports.RuntimeException = RuntimeException;
//# sourceMappingURL=runtime.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/unknown-export.exception.js":
/*!***************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/unknown-export.exception.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var messages_1 = __webpack_require__(/*! ../messages */ "../../../node_modules/@one/core/lib/errors/messages.js");
var UnknownExportException = (function (_super) {
    __extends(UnknownExportException, _super);
    function UnknownExportException(name, exported) {
        return _super.call(this, messages_1.UnknownExportMessage(name, exported)) || this;
    }
    return UnknownExportException;
}(runtime_exception_1.RuntimeException));
exports.UnknownExportException = UnknownExportException;
//# sourceMappingURL=unknown-export.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/unknown-module.exception.js":
/*!***************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/unknown-module.exception.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var UnknownModuleException = (function (_super) {
    __extends(UnknownModuleException, _super);
    function UnknownModuleException(trace) {
        if (trace === void 0) { trace = []; }
        var _this = this;
        var scope = trace.map(function (module) { return module.name; }).join(' -> ');
        _this = _super.call(this, "Nest cannot select given module (it does not exist in current context). Scope [" + scope + "]") || this;
        return _this;
    }
    return UnknownModuleException;
}(runtime_exception_1.RuntimeException));
exports.UnknownModuleException = UnknownModuleException;
//# sourceMappingURL=unknown-module.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/exceptions/unknown-provider.exception.js":
/*!*****************************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/exceptions/unknown-provider.exception.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime_exception_1 = __webpack_require__(/*! ./runtime.exception */ "../../../node_modules/@one/core/lib/errors/exceptions/runtime.exception.js");
var registry_1 = __webpack_require__(/*! ../../registry */ "../../../node_modules/@one/core/lib/registry.js");
var UnknownProviderException = (function (_super) {
    __extends(UnknownProviderException, _super);
    function UnknownProviderException(provider, module) {
        var _this = this;
        var name = registry_1.Registry.getProviderName(provider);
        _this = _super.call(this, name + " could not be found in " + module.name) || this;
        return _this;
    }
    return UnknownProviderException;
}(runtime_exception_1.RuntimeException));
exports.UnknownProviderException = UnknownProviderException;
//# sourceMappingURL=unknown-provider.exception.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/index.js":
/*!*********************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./exceptions */ "../../../node_modules/@one/core/lib/errors/exceptions/index.js"));
__export(__webpack_require__(/*! ./messages */ "../../../node_modules/@one/core/lib/errors/messages.js"));
__export(__webpack_require__(/*! ./exceptions-zone */ "../../../node_modules/@one/core/lib/errors/exceptions-zone.js"));
__export(__webpack_require__(/*! ./exceptions-handler */ "../../../node_modules/@one/core/lib/errors/exceptions-handler.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/errors/messages.js":
/*!************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/errors/messages.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidModuleMessage = function (scope) {
    return "Nest cannot create the module instance. Often, this is because of a circular dependency between modules. Use forwardRef() to avoid it. (Read more https://docs.nestjs.com/advanced/circular-dependency). Scope [" + scope + "]";
};
exports.UnknownExportMessage = function (module, exported) {
    return "Nest cannot export a component/module (" + exported + ") that is not a part of the currently processed module (" + module + "). Please verify whether each exported unit is available in this particular context.";
};
exports.MissingRequiredDependencyMessage = function (name, reason) {
    return "The \"" + name + "\" package is missing. Please, make sure to install this library ($ yarn add " + name + ") to take advantage of " + reason + ".";
};
exports.CircularDependencyMessage = function (context) {
    return "A circular dependency has been detected inside " + context + ". Please, make sure that each side of a bidirectional relationships are decorated with \"forwardRef()\".";
};
exports.MultiProviderMessage = function (name) {
    return "Provider " + name + " is already bound. Set the multi property to true, to allow multiple providers being bound to this token";
};
exports.MissingInjectionTokenMessage = function (context) {
    return "You can only use an InjectionToken in " + context;
};
exports.UNHANDLED_RUNTIME_EXCEPTION = 'Unhandled Runtime Exception.';
//# sourceMappingURL=messages.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/factory.js":
/*!****************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/factory.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(/*! ./module */ "../../../node_modules/@one/core/lib/module/index.js");
var tokens_1 = __webpack_require__(/*! ./tokens */ "../../../node_modules/@one/core/lib/tokens.js");
var errors_1 = __webpack_require__(/*! ./errors */ "../../../node_modules/@one/core/lib/errors/index.js");
var registry_1 = __webpack_require__(/*! ./registry */ "../../../node_modules/@one/core/lib/registry.js");
var util_1 = __webpack_require__(/*! ./util */ "../../../node_modules/@one/core/lib/util.js");
var OneFactory = (function () {
    function OneFactory(module) {
        this.module = module;
        this.container = new module_1.OneContainer();
        this.scanner = new module_1.Scanner(this.container);
    }
    OneFactory.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, errors_1.ExceptionsZone.run(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.scanner.scan(this.module)];
                                    case 1:
                                        _a.sent();
                                        return [4, this.init()];
                                    case 2:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    OneFactory.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, errors_1.ExceptionsZone.run(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, util_1.Utils.series(this.container.getAllProviders(tokens_1.APP_DESTROY))];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    OneFactory.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, util_1.Utils.series(this.container.getAllProviders(tokens_1.APP_INIT))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    OneFactory.prototype.select = function (module) {
        var _this = this;
        return {
            get: function (provider) {
                return _this.container.getProvider(provider, module, {
                    strict: true,
                });
            },
            getAll: function (token) {
                if (!registry_1.Registry.isInjectionToken(token)) {
                    throw new errors_1.MissingInjectionTokenException('OneFactory.select().getAll()');
                }
                return _this.container.getAllProviders(token, module);
            },
            has: function (provider) {
                return _this.container.isProviderBound(provider, module);
            },
        };
    };
    OneFactory.prototype.has = function (provider) {
        return this.container.isProviderBound(provider);
    };
    OneFactory.prototype.getAll = function (token) {
        if (!registry_1.Registry.isInjectionToken(token)) {
            throw new errors_1.MissingInjectionTokenException('OneFactory.getAll()');
        }
        return this.container.getAllProviders(token);
    };
    OneFactory.prototype.get = function (provider) {
        return this.container.getProvider(provider);
    };
    return OneFactory;
}());
exports.OneFactory = OneFactory;
//# sourceMappingURL=factory.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/forward-ref.js":
/*!********************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/forward-ref.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardRef = function (forwardRef) { return ({
    forwardRef: forwardRef,
}); };
//# sourceMappingURL=forward-ref.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/index.js":
/*!**************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./module */ "../../../node_modules/@one/core/lib/module/index.js"));
__export(__webpack_require__(/*! ./constants */ "../../../node_modules/@one/core/lib/constants.js"));
__export(__webpack_require__(/*! ./decorators */ "../../../node_modules/@one/core/lib/decorators/index.js"));
__export(__webpack_require__(/*! ./bootstrap */ "../../../node_modules/@one/core/lib/bootstrap.js"));
__export(__webpack_require__(/*! ./factory */ "../../../node_modules/@one/core/lib/factory.js"));
__export(__webpack_require__(/*! ./forward-ref */ "../../../node_modules/@one/core/lib/forward-ref.js"));
__export(__webpack_require__(/*! ./reflector */ "../../../node_modules/@one/core/lib/reflector.js"));
__export(__webpack_require__(/*! ./errors */ "../../../node_modules/@one/core/lib/errors/index.js"));
__export(__webpack_require__(/*! ./metadata-storage */ "../../../node_modules/@one/core/lib/metadata-storage.js"));
__export(__webpack_require__(/*! ./registry */ "../../../node_modules/@one/core/lib/registry.js"));
__export(__webpack_require__(/*! ./tokens */ "../../../node_modules/@one/core/lib/tokens.js"));
__export(__webpack_require__(/*! ./util */ "../../../node_modules/@one/core/lib/util.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/metadata-storage.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/metadata-storage.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(/*! ./util */ "../../../node_modules/@one/core/lib/util.js");
var BaseMetadataStorage = (function () {
    function BaseMetadataStorage() {
    }
    BaseMetadataStorage.findByTarget = function (metadata, target) {
        return __spread(metadata.values()).find(function (value) { return value.target === target; });
    };
    BaseMetadataStorage.findByTargetProperty = function (metadata, target, propertyKey) {
        var findByProperty = function () {
            return __spread(metadata.values()).find(function (value) { return value.target === target && value.propertyKey === propertyKey; });
        };
        return util_1.Utils.isNil(propertyKey)
            ? this.findByTarget(metadata, target)
            : findByProperty();
    };
    BaseMetadataStorage.filterByTargetProperty = function (metadata, target, propertyKey) {
        var filterByProperty = function () {
            return __spread(metadata.values()).filter(function (value) { return value.target === target && value.propertyKey === propertyKey; });
        };
        return util_1.Utils.isNil(propertyKey)
            ? this.filterByTarget(metadata, target)
            : filterByProperty();
    };
    BaseMetadataStorage.filterByTarget = function (metadata, target) {
        return __spread(metadata.values()).filter(function (value) { return value.target === target; });
    };
    return BaseMetadataStorage;
}());
exports.BaseMetadataStorage = BaseMetadataStorage;
//# sourceMappingURL=metadata-storage.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/module/compiler.js":
/*!************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/module/compiler.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_token_factory_1 = __webpack_require__(/*! ./module-token-factory */ "../../../node_modules/@one/core/lib/module/module-token-factory.js");
var registry_1 = __webpack_require__(/*! ../registry */ "../../../node_modules/@one/core/lib/registry.js");
var util_1 = __webpack_require__(/*! ../util */ "../../../node_modules/@one/core/lib/util.js");
var ModuleCompiler = (function () {
    function ModuleCompiler() {
        this.moduleTokenFactory = new module_token_factory_1.ModuleTokenFactory();
    }
    ModuleCompiler.prototype.compile = function (module, scope) {
        if (scope === void 0) { scope = []; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, target, dynamicMetadata, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.extractMetadata(module)];
                    case 1:
                        _a = _b.sent(), target = _a.target, dynamicMetadata = _a.dynamicMetadata;
                        token = this.moduleTokenFactory.create(target, scope, dynamicMetadata);
                        return [2, { target: target, dynamicMetadata: dynamicMetadata, token: token }];
                }
            });
        });
    };
    ModuleCompiler.prototype.extractMetadata = function (module) {
        return __awaiter(this, void 0, void 0, function () {
            var moduleRef, _a, target, dynamicMetadata;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, util_1.Utils.getDeferred(module)];
                    case 1:
                        moduleRef = _b.sent();
                        if (!registry_1.Registry.isDynamicModule(moduleRef)) {
                            return [2, { target: module }];
                        }
                        _a = moduleRef, target = _a.module, dynamicMetadata = __rest(_a, ["module"]);
                        return [2, { target: target, dynamicMetadata: dynamicMetadata }];
                }
            });
        });
    };
    return ModuleCompiler;
}());
exports.ModuleCompiler = ModuleCompiler;
//# sourceMappingURL=compiler.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/module/container.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/module/container.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = __webpack_require__(/*! ./compiler */ "../../../node_modules/@one/core/lib/module/compiler.js");
var reflector_1 = __webpack_require__(/*! ../reflector */ "../../../node_modules/@one/core/lib/reflector.js");
var registry_1 = __webpack_require__(/*! ../registry */ "../../../node_modules/@one/core/lib/registry.js");
var module_1 = __webpack_require__(/*! ./module */ "../../../node_modules/@one/core/lib/module/module.js");
var util_1 = __webpack_require__(/*! ../util */ "../../../node_modules/@one/core/lib/util.js");
var errors_1 = __webpack_require__(/*! ../errors */ "../../../node_modules/@one/core/lib/errors/index.js");
var OneContainer = (function () {
    function OneContainer() {
        this.moduleCompiler = new compiler_1.ModuleCompiler();
        this.globalModules = new Set();
        this.modules = new Map();
        this.moduleOrder = new Set();
        this.providerTokens = [];
        this.dynamicModulesMetadata = new Map();
    }
    OneContainer.prototype.getModulesFrom = function (module) {
        return !util_1.Utils.isNil(module)
            ? [this.getModule(module)]
            : this.getModuleValues();
    };
    OneContainer.prototype.isProviderBound = function (provider, module) {
        var token = registry_1.Registry.getProviderToken(provider);
        return this.getModulesFrom(module).some(function (_a) {
            var providers = _a.providers;
            return providers.isBound(token);
        });
    };
    OneContainer.prototype.replace = function (toReplace, options) {
        __spread(this.modules.values()).forEach(function (module) {
            module.replace(toReplace, options);
        });
    };
    OneContainer.prototype.getProvider = function (provider, scope, _a) {
        var strict = (_a === void 0 ? {} : _a).strict;
        var e_1, _b;
        var token = registry_1.Registry.getProviderToken(provider);
        if (strict) {
            var module_2 = this.getModule(scope);
            if (module_2.providers.isBound(token)) {
                return module_2.providers.get(token);
            }
        }
        else {
            try {
                for (var _c = __values(this.modules.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var providers = _d.value.providers;
                    if (providers.isBound(token)) {
                        return providers.get(token);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        throw new errors_1.UnknownProviderException(provider, scope);
    };
    OneContainer.prototype.getAllProviders = function (provider, target) {
        if (!registry_1.Registry.isInjectionToken(provider)) {
            throw new errors_1.MissingInjectionTokenException('Container.getAllProviders()');
        }
        var token = registry_1.Registry.getProviderToken(provider);
        return util_1.Utils.flatten(this.getModulesFrom(target).map(function (_a) {
            var providers = _a.providers;
            return providers.isBound(token) ? providers.getAll(token) : [];
        }));
    };
    OneContainer.prototype.getModuleValues = function () {
        return util_1.Utils.getValues(this.modules.entries());
    };
    OneContainer.prototype.hasModule = function (module) {
        return this.getModuleValues().some(function (_a) {
            var target = _a.target;
            return target === module;
        });
    };
    OneContainer.prototype.getModule = function (module) {
        return this.getModuleValues().find(function (_a) {
            var target = _a.target;
            return target === module;
        });
    };
    OneContainer.prototype.getModuleByToken = function (token) {
        if (!this.modules.has(token)) {
            throw new errors_1.UnknownModuleException([]);
        }
        return this.modules.get(token);
    };
    OneContainer.prototype.getReversedModules = function () {
        return __spread(this.modules.entries()).reverse();
    };
    OneContainer.prototype.getModules = function () {
        return this.modules;
    };
    OneContainer.prototype.addProvider = function (provider, token) {
        return __awaiter(this, void 0, void 0, function () {
            var module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        module = this.getModuleByToken(token);
                        return [4, module.addProvider(provider)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    OneContainer.prototype.addExported = function (component, token) {
        var module = this.getModuleByToken(token);
        module.addExported(component);
    };
    OneContainer.prototype.addGlobalModule = function (module) {
        this.globalModules.add(module);
    };
    OneContainer.prototype.addModule = function (module, scope) {
        if (scope === void 0) { scope = []; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, target, dynamicMetadata, token, oneModule, modules;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!module)
                            throw new errors_1.InvalidModuleException(scope);
                        return [4, this.moduleCompiler.compile(module, scope)];
                    case 1:
                        _a = _b.sent(), target = _a.target, dynamicMetadata = _a.dynamicMetadata, token = _a.token;
                        if (this.modules.has(token))
                            return [2];
                        oneModule = new module_1.OneModule(target, scope, this);
                        oneModule.addGlobalProviders();
                        this.modules.set(token, oneModule);
                        modules = util_1.Utils.concat(scope, target);
                        this.addDynamicMetadata(token, dynamicMetadata, modules);
                        reflector_1.Reflector.isGlobalModule(target) && this.addGlobalModule(oneModule);
                        return [2];
                }
            });
        });
    };
    OneContainer.prototype.addDynamicMetadata = function (token, dynamicModuleMetadata, scope) {
        if (!dynamicModuleMetadata)
            return;
        this.dynamicModulesMetadata.set(token, dynamicModuleMetadata);
        this.addDynamicModules(dynamicModuleMetadata.imports, scope);
    };
    OneContainer.prototype.addDynamicModules = function (modules, scope) {
        var _this = this;
        if (modules === void 0) { modules = []; }
        modules.forEach(function (module) { return _this.addModule(module, scope); });
    };
    OneContainer.prototype.bindGlobalScope = function () {
        var _this = this;
        this.modules.forEach(function (module) { return _this.bindGlobalsToImports(module); });
    };
    OneContainer.prototype.bindGlobalsToImports = function (module) {
        var _this = this;
        this.globalModules.forEach(function (globalModule) {
            return _this.bindGlobalModuleToModule(module, globalModule);
        });
    };
    OneContainer.prototype.bindGlobalModuleToModule = function (module, globalModule) {
        if (module === globalModule)
            return;
        module.addImport(globalModule);
    };
    OneContainer.prototype.addImport = function (relatedModule, token) {
        return __awaiter(this, void 0, void 0, function () {
            var module, scope, relatedModuleToken, related;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.modules.has(token))
                            return [2];
                        module = this.getModuleByToken(token);
                        scope = util_1.Utils.concat(module.scope, module.target);
                        return [4, this.moduleCompiler.compile(relatedModule, scope)];
                    case 1:
                        relatedModuleToken = (_a.sent()).token;
                        related = this.getModuleByToken(relatedModuleToken);
                        module.addImport(related);
                        return [2];
                }
            });
        });
    };
    OneContainer.prototype.getDynamicMetadataByToken = function (token, key) {
        var metadata = this.dynamicModulesMetadata.get(token);
        return metadata && metadata[key] ? metadata[key] : [];
    };
    return OneContainer;
}());
exports.OneContainer = OneContainer;
//# sourceMappingURL=container.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/module/index.js":
/*!*********************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/module/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./scanner */ "../../../node_modules/@one/core/lib/module/scanner.js"));
__export(__webpack_require__(/*! ./module */ "../../../node_modules/@one/core/lib/module/module.js"));
__export(__webpack_require__(/*! ./compiler */ "../../../node_modules/@one/core/lib/module/compiler.js"));
__export(__webpack_require__(/*! ./container */ "../../../node_modules/@one/core/lib/module/container.js"));
__export(__webpack_require__(/*! ./injection-token */ "../../../node_modules/@one/core/lib/module/injection-token.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/module/injection-token.js":
/*!*******************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/module/injection-token.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InjectionToken = (function () {
    function InjectionToken(desc) {
        this.desc = desc;
        this.name = Symbol.for("InjectionToken<" + this.desc + ">");
    }
    return InjectionToken;
}());
exports.InjectionToken = InjectionToken;
//# sourceMappingURL=injection-token.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/module/module-token-factory.js":
/*!************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/module/module-token-factory.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hash = __webpack_require__(/*! object-hash */ "../../../node_modules/object-hash/dist/object_hash.js");
var constants_1 = __webpack_require__(/*! ../constants */ "../../../node_modules/@one/core/lib/constants.js");
var ModuleTokenFactory = (function () {
    function ModuleTokenFactory() {
    }
    ModuleTokenFactory.prototype.create = function (target, scope, dynamicModuleMetadata) {
        var reflectedScope = this.reflectScope(target);
        var isSingleScoped = reflectedScope === true;
        var opaqueToken = {
            module: this.getModuleName(target),
            dynamic: this.getDynamicMetadataToken(dynamicModuleMetadata),
            scope: isSingleScoped ? this.getScopeStack(scope) : reflectedScope,
        };
        return hash(opaqueToken);
    };
    ModuleTokenFactory.prototype.getDynamicMetadataToken = function (dynamicModuleMetadata) {
        return dynamicModuleMetadata ? JSON.stringify(dynamicModuleMetadata) : '';
    };
    ModuleTokenFactory.prototype.getModuleName = function (target) {
        return target.name;
    };
    ModuleTokenFactory.prototype.getScopeStack = function (scope) {
        var _this = this;
        var reversedScope = scope.reverse();
        var firstGlobalIndex = reversedScope.findIndex(function (s) { return _this.reflectScope(s) === 'global'; });
        scope.reverse();
        var stack = firstGlobalIndex >= 0
            ? scope.slice(scope.length - firstGlobalIndex - 1)
            : scope;
        return stack.map(function (module) { return module.name; });
    };
    ModuleTokenFactory.prototype.reflectScope = function (target) {
        var scope = Reflect.getMetadata(constants_1.SHARED_MODULE_METADATA, target);
        return scope ? scope : 'global';
    };
    return ModuleTokenFactory;
}());
exports.ModuleTokenFactory = ModuleTokenFactory;
//# sourceMappingURL=module-token-factory.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/module/module.js":
/*!**********************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/module/module.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "../../../node_modules/inversify/lib/inversify.js");
var inversify_inject_decorators_1 = __webpack_require__(/*! inversify-inject-decorators */ "../../../node_modules/inversify-inject-decorators/lib/index.js");
var tokens_1 = __webpack_require__(/*! ../tokens */ "../../../node_modules/@one/core/lib/tokens.js");
var constants_1 = __webpack_require__(/*! ../constants */ "../../../node_modules/@one/core/lib/constants.js");
var container_1 = __webpack_require__(/*! ./container */ "../../../node_modules/@one/core/lib/module/container.js");
var reflector_1 = __webpack_require__(/*! ../reflector */ "../../../node_modules/@one/core/lib/reflector.js");
var registry_1 = __webpack_require__(/*! ../registry */ "../../../node_modules/@one/core/lib/registry.js");
var util_1 = __webpack_require__(/*! ../util */ "../../../node_modules/@one/core/lib/util.js");
var errors_1 = __webpack_require__(/*! ../errors */ "../../../node_modules/@one/core/lib/errors/index.js");
var OneModule = (function () {
    function OneModule(target, scope, container) {
        this.target = target;
        this.scope = scope;
        this.container = container;
        this.imports = new Set();
        this.injectables = new Set();
        this.providers = new inversify_1.Container();
        this.lazyInject = inversify_inject_decorators_1.default(this.providers).lazyInject;
        this.exports = new Set();
        this.created = util_1.Utils.createDeferredPromise();
    }
    OneModule.prototype.addImport = function (relatedModule) {
        this.imports.add(relatedModule);
    };
    OneModule.prototype.addProvider = function (provider) {
        this.injectables.add(provider);
    };
    OneModule.prototype.providerContainerHasToken = function (token) {
        return __spread(this.injectables.values()).some(function (provider) { return registry_1.Registry.getProviderToken(provider) === token; });
    };
    OneModule.prototype.validateExported = function (token, exported) {
        if (this.providerContainerHasToken(token))
            return token;
        var imported = __spread(this.imports.values());
        var importedRefNames = imported
            .filter(function (item) { return item; })
            .map(function (_a) {
            var target = _a.target;
            return target;
        })
            .filter(function (target) { return target; });
        if (!importedRefNames.includes(token)) {
            throw new errors_1.UnknownExportException(this.target.name, exported.name);
        }
        return token;
    };
    OneModule.prototype.addExported = function (exported) {
        var _this = this;
        var addExportedUnit = function (token) {
            _this.exports.add(_this.validateExported(token, exported));
        };
        if (registry_1.Registry.isDynamicModule(exported)) {
            return addExportedUnit(exported.module);
        }
        addExportedUnit(registry_1.Registry.getProviderToken(exported));
    };
    OneModule.prototype.getProviders = function () {
        return __spread([
            tokens_1.Injector
        ], this.injectables.values(), this.getRelatedProviders().values());
    };
    OneModule.prototype.linkRelatedProviders = function () {
        var _this = this;
        var providers = this.getRelatedProviders();
        providers.forEach(function (provider) {
            var ref = _this.container.getProvider(provider, _this.target);
            _this.providers.bind(provider).toConstantValue(ref);
        });
    };
    OneModule.prototype.getRelatedProviders = function () {
        var _this = this;
        var e_1, _a;
        var providerScope = new Set();
        var find = function (module) {
            var e_2, _a;
            module = registry_1.Registry.getForwardRef(module);
            if (reflector_1.Reflector.isProvider(module)) {
                providerScope.add(module);
            }
            else {
                try {
                    for (var _b = __values(module.exports), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var related = _c.value;
                        if (_this.container.hasModule(related)) {
                            var ref = _this.container.getModule(related);
                            find(ref);
                        }
                        else {
                            providerScope.add(related);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        try {
            for (var _b = __values(this.imports), _c = _b.next(); !_c.done; _c = _b.next()) {
                var related = _c.value;
                find(related);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return providerScope;
    };
    OneModule.prototype.bindProviders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, _b, _c, provider, isMulti, token, name_1, type, e_3_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.linkRelatedProviders();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _b = __values(this.injectables), _c = _b.next();
                        _d.label = 2;
                    case 2:
                        if (!!_c.done) return [3, 5];
                        provider = _c.value;
                        isMulti = provider.multi;
                        token = registry_1.Registry.getProviderToken(provider);
                        if (!isMulti && this.container.providerTokens.includes(token)) {
                            name_1 = registry_1.Registry.getProviderName(provider);
                            throw new errors_1.MultiProviderException(name_1);
                        }
                        this.container.providerTokens.push(token);
                        type = this.getProviderType(provider);
                        return [4, this.bind(token, type, provider)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _c = _b.next();
                        return [3, 2];
                    case 5: return [3, 8];
                    case 6:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3, 8];
                    case 7:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7];
                    case 8: return [2];
                }
            });
        });
    };
    OneModule.prototype.replace = function (toReplace, options) {
        this.addProvider(__assign({ provide: toReplace }, options));
    };
    OneModule.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var module, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.providers.isBound(this.target))
                            return [2];
                        return [4, this.bindProviders()];
                    case 1:
                        _b.sent();
                        this.providers.bind(this.target).toSelf();
                        module = this.providers.get(this.target);
                        _a = module.onModuleInit;
                        if (!_a) return [3, 3];
                        return [4, module.onModuleInit()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        _a;
                        return [4, util_1.Utils.series(this.container.getAllProviders(tokens_1.MODULE_INIT, this.target))];
                    case 4:
                        _b.sent();
                        this.created.resolve();
                        return [2];
                }
            });
        });
    };
    OneModule.prototype.getProviderType = function (provider) {
        if (registry_1.Registry.isFactoryProvider(provider)) {
            return constants_1.PROVIDER_TYPES.FACTORY;
        }
        else if (registry_1.Registry.isValueProvider(provider)) {
            return constants_1.PROVIDER_TYPES.VALUE;
        }
        else if (registry_1.Registry.isClassProvider(provider)) {
            return constants_1.PROVIDER_TYPES.CLASS;
        }
        else if (registry_1.Registry.isExistingProvider(provider)) {
            return constants_1.PROVIDER_TYPES.EXISTING;
        }
        return constants_1.PROVIDER_TYPES.DEFAULT;
    };
    OneModule.prototype.getProvider = function (ref) {
        var token = registry_1.Registry.getProviderToken(ref);
        var provider = (this.getProviders().find(function (provider) { return provider === token; }));
        if (!provider)
            throw new errors_1.UnknownProviderException(ref, this.target);
        return provider;
    };
    OneModule.prototype.getDependencies = function (dependencies) {
        if (dependencies === void 0) { dependencies = []; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(dependencies.map(function (dependency) {
                            var ref = registry_1.Registry.getForwardRef(dependency);
                            registry_1.Registry.assertProvider(ref);
                            var provider = _this.getProvider(ref);
                            return _this.container.getProvider(provider, _this.target);
                        }))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    OneModule.prototype.bindFactoryProvider = function (token, provider) {
        return __awaiter(this, void 0, void 0, function () {
            var deps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getDependencies(provider.deps)];
                    case 1:
                        deps = _a.sent();
                        if (provider.scope === constants_1.SCOPES.TRANSIENT) {
                            return [2, this.providers
                                    .bind(token)
                                    .toDynamicValue(function () { return provider.useFactory.apply(provider, __spread(deps)); })];
                        }
                        return [2, this.providers
                                .bind(token)
                                .toProvider(function () { return provider.useFactory.apply(provider, __spread(deps)); })];
                }
            });
        });
    };
    OneModule.prototype.bindProvider = function (provider, scope) {
        var binding = this.providers.bind(provider).toSelf();
        switch (scope) {
            case constants_1.SCOPES.TRANSIENT:
                return binding.inTransientScope();
            case constants_1.SCOPES.REQUEST:
                return binding.inRequestScope();
            case constants_1.SCOPES.SINGLETON:
            default:
                return binding.inSingletonScope();
        }
    };
    OneModule.prototype.bindClassProvider = function (token, provider) {
        return this.providers.bind(token).to(provider.useClass);
    };
    OneModule.prototype.bindValueProvider = function (token, provider) {
        return this.providers.bind(token).toConstantValue(provider.useValue);
    };
    OneModule.prototype.bindExistingProvider = function (token, provider) {
        var existingToken = registry_1.Registry.getInjectionToken(provider.useExisting);
        var existing = this.providers.get(existingToken);
        return this.providers.bind(token).toConstantValue(existing);
    };
    OneModule.prototype.bind = function (token, type, provider) {
        return __awaiter(this, void 0, void 0, function () {
            var scope, lazyInjects;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(type === constants_1.PROVIDER_TYPES.DEFAULT)) return [3, 1];
                        scope = reflector_1.Reflector.resolveProviderScope(provider);
                        lazyInjects = registry_1.Registry.getLazyInjects(provider);
                        lazyInjects.forEach(function (_a) {
                            var lazyInject = _a.lazyInject, forwardRef = _a.forwardRef;
                            var token = registry_1.Registry.getForwardRef(forwardRef);
                            lazyInject(_this.lazyInject, token);
                        });
                        this.bindProvider(provider, scope);
                        return [3, 4];
                    case 1:
                        if (!(type === constants_1.PROVIDER_TYPES.FACTORY)) return [3, 3];
                        return [4, this.bindFactoryProvider(token, provider)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        if (type === constants_1.PROVIDER_TYPES.VALUE) {
                            this.bindValueProvider(token, provider);
                        }
                        else if (type === constants_1.PROVIDER_TYPES.CLASS) {
                            this.bindClassProvider(token, provider);
                        }
                        else if (type === constants_1.PROVIDER_TYPES.EXISTING) {
                            this.bindExistingProvider(token, provider);
                        }
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    OneModule.prototype.addGlobalProviders = function () {
        this.providers.bind(tokens_1.Injector).toConstantValue(this.providers);
        this.providers.bind(container_1.OneContainer).toConstantValue(this.container);
        this.providers.bind(tokens_1.ONE_MODULE.name).toConstantValue(this);
        this.providers
            .bind(tokens_1.Injector)
            .toConstantValue(this.providers)
            .whenInjectedInto(this.target);
        this.providers
            .bind(container_1.OneContainer)
            .toConstantValue(this.container)
            .whenInjectedInto(this.target);
    };
    return OneModule;
}());
exports.OneModule = OneModule;
//# sourceMappingURL=module.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/module/scanner.js":
/*!***********************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/module/scanner.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(/*! ../errors */ "../../../node_modules/@one/core/lib/errors/index.js");
var reflector_1 = __webpack_require__(/*! ../reflector */ "../../../node_modules/@one/core/lib/reflector.js");
var constants_1 = __webpack_require__(/*! ../constants */ "../../../node_modules/@one/core/lib/constants.js");
var registry_1 = __webpack_require__(/*! ../registry */ "../../../node_modules/@one/core/lib/registry.js");
var util_1 = __webpack_require__(/*! ../util */ "../../../node_modules/@one/core/lib/util.js");
var Scanner = (function () {
    function Scanner(container) {
        this.container = container;
    }
    Scanner.prototype.scan = function (module) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.scanForModules(module)];
                    case 1:
                        _a.sent();
                        return [4, this.scanModulesForDependencies()];
                    case 2:
                        _a.sent();
                        this.container.bindGlobalScope();
                        return [4, this.createModules()];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scanner.prototype.createModules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var traverse, rootModule;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        traverse = function (module) { return __awaiter(_this, void 0, void 0, function () {
                            var e_1, _a, imports, imports_1, imports_1_1, innerModule, e_1_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        imports = module.imports.values();
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 6, 7, 8]);
                                        imports_1 = __values(imports), imports_1_1 = imports_1.next();
                                        _b.label = 2;
                                    case 2:
                                        if (!!imports_1_1.done) return [3, 5];
                                        innerModule = imports_1_1.value;
                                        return [4, traverse(innerModule)];
                                    case 3:
                                        _b.sent();
                                        _b.label = 4;
                                    case 4:
                                        imports_1_1 = imports_1.next();
                                        return [3, 2];
                                    case 5: return [3, 8];
                                    case 6:
                                        e_1_1 = _b.sent();
                                        e_1 = { error: e_1_1 };
                                        return [3, 8];
                                    case 7:
                                        try {
                                            if (imports_1_1 && !imports_1_1.done && (_a = imports_1.return)) _a.call(imports_1);
                                        }
                                        finally { if (e_1) throw e_1.error; }
                                        return [7];
                                    case 8: return [4, Promise.all(__spread(imports).map(function (_a) {
                                            var created = _a.created;
                                            return created;
                                        }))];
                                    case 9:
                                        _b.sent();
                                        return [4, module.create()];
                                    case 10:
                                        _b.sent();
                                        this.container.moduleOrder.add(module);
                                        return [2];
                                }
                            });
                        }); };
                        rootModule = this.container
                            .getModules()
                            .values()
                            .next().value;
                        return [4, traverse(rootModule)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scanner.prototype.scanForModules = function (module, scope, ctxRegistry) {
        if (scope === void 0) { scope = []; }
        if (ctxRegistry === void 0) { ctxRegistry = []; }
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, imports, modules, modules_1, modules_1_1, innerModule, scopedModules, e_2_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.storeModule(module, scope)];
                    case 1:
                        _b.sent();
                        ctxRegistry.push(module);
                        if (registry_1.Registry.hasForwardRef(module)) {
                            module = module.forwardRef();
                        }
                        imports = reflector_1.Reflector.get(constants_1.METADATA.IMPORTS, module);
                        modules = registry_1.Registry.isDynamicModule(module)
                            ? __spread(imports, (module.imports || [])) : imports;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        modules_1 = __values(modules), modules_1_1 = modules_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!modules_1_1.done) return [3, 6];
                        innerModule = modules_1_1.value;
                        if (ctxRegistry.includes(innerModule))
                            return [3, 5];
                        scopedModules = util_1.Utils.concat(scope, module);
                        return [4, this.scanForModules(innerModule, scopedModules, ctxRegistry)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        modules_1_1 = modules_1.next();
                        return [3, 3];
                    case 6: return [3, 9];
                    case 7:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 9];
                    case 8:
                        try {
                            if (modules_1_1 && !modules_1_1.done && (_a = modules_1.return)) _a.call(modules_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7];
                    case 9: return [2];
                }
            });
        });
    };
    Scanner.prototype.storeModule = function (module, scope) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!registry_1.Registry.hasForwardRef(module)) return [3, 2];
                        return [4, this.container.addModule(module.forwardRef(), scope)];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, this.container.addModule(module, scope)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scanner.prototype.storeImport = function (related, token, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!related)
                            throw new errors_1.CircularDependencyException(context);
                        if (!registry_1.Registry.hasForwardRef(related)) return [3, 2];
                        return [4, this.container.addImport(related.forwardRef(), token)];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, this.container.addImport(related, token)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scanner.prototype.scanModulesForDependencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, modules, modules_2, modules_2_1, _b, token, module_1, e_3_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        modules = this.container.getReversedModules();
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, 8, 9]);
                        modules_2 = __values(modules), modules_2_1 = modules_2.next();
                        _c.label = 2;
                    case 2:
                        if (!!modules_2_1.done) return [3, 6];
                        _b = __read(modules_2_1.value, 2), token = _b[0], module_1 = _b[1];
                        return [4, this.reflectImports(module_1.target, token, module_1.target.name)];
                    case 3:
                        _c.sent();
                        return [4, this.reflectProviders(module_1.target, token)];
                    case 4:
                        _c.sent();
                        this.reflectExports(module_1.target, token);
                        _c.label = 5;
                    case 5:
                        modules_2_1 = modules_2.next();
                        return [3, 2];
                    case 6: return [3, 9];
                    case 7:
                        e_3_1 = _c.sent();
                        e_3 = { error: e_3_1 };
                        return [3, 9];
                    case 8:
                        try {
                            if (modules_2_1 && !modules_2_1.done && (_a = modules_2.return)) _a.call(modules_2);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7];
                    case 9: return [2];
                }
            });
        });
    };
    Scanner.prototype.reflectProviders = function (module, token) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4, _a, providers, providers_1, providers_1_1, provider, e_4_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        providers = this.getDynamicMetadata(module, token, constants_1.METADATA.PROVIDERS);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        providers_1 = __values(providers), providers_1_1 = providers_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!providers_1_1.done) return [3, 5];
                        provider = providers_1_1.value;
                        return [4, this.storeProvider(provider, token)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        providers_1_1 = providers_1.next();
                        return [3, 2];
                    case 5: return [3, 8];
                    case 6:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3, 8];
                    case 7:
                        try {
                            if (providers_1_1 && !providers_1_1.done && (_a = providers_1.return)) _a.call(providers_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7];
                    case 8: return [2];
                }
            });
        });
    };
    Scanner.prototype.storeProvider = function (provider, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.container.addProvider(provider, token)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scanner.prototype.getDynamicMetadata = function (module, token, metadataKey) {
        return __spread(reflector_1.Reflector.get(metadataKey, module), this.container.getDynamicMetadataByToken(token, metadataKey));
    };
    Scanner.prototype.reflectExports = function (module, token) {
        var _this = this;
        var exports = this.getDynamicMetadata(module, token, constants_1.METADATA.EXPORTS);
        exports.forEach(function (exportedComponent) {
            return _this.storeExported(exportedComponent, token);
        });
    };
    Scanner.prototype.storeExported = function (component, token) {
        this.container.addExported(component, token);
    };
    Scanner.prototype.reflectImports = function (module, token, context) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5, _a, modules, modules_3, modules_3_1, related, e_5_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        modules = this.getDynamicMetadata(module, token, constants_1.METADATA.IMPORTS);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        modules_3 = __values(modules), modules_3_1 = modules_3.next();
                        _b.label = 2;
                    case 2:
                        if (!!modules_3_1.done) return [3, 5];
                        related = modules_3_1.value;
                        return [4, this.storeImport(related, token, context)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        modules_3_1 = modules_3.next();
                        return [3, 2];
                    case 5: return [3, 8];
                    case 6:
                        e_5_1 = _b.sent();
                        e_5 = { error: e_5_1 };
                        return [3, 8];
                    case 7:
                        try {
                            if (modules_3_1 && !modules_3_1.done && (_a = modules_3.return)) _a.call(modules_3);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7];
                    case 8: return [2];
                }
            });
        });
    };
    return Scanner;
}());
exports.Scanner = Scanner;
//# sourceMappingURL=scanner.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/reflector.js":
/*!******************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/reflector.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! reflect-metadata */ "../../../node_modules/reflect-metadata/Reflect.js");
var constants_1 = __webpack_require__(/*! ./constants */ "../../../node_modules/@one/core/lib/constants.js");
var Reflector = (function () {
    function Reflector() {
    }
    Reflector.defineByKeys = function (metadata, target, exclude) {
        if (exclude === void 0) { exclude = []; }
        Object.keys(metadata)
            .filter(function (p) { return !exclude.includes(p); })
            .forEach(function (property) {
            Reflect.defineMetadata(property, metadata[property], target);
        });
        return target;
    };
    Reflector.get = function (metadataKey, target) {
        return Reflect.getMetadata(metadataKey, target) || [];
    };
    Reflector.set = function (metadataKey, metadataValue, target, propertyKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    };
    Reflector.has = function (metadataKey, target) {
        return Reflect.hasMetadata(metadataKey, target);
    };
    Reflector.isGlobalModule = function (target) {
        return Reflect.hasMetadata(constants_1.SHARED_MODULE_METADATA, target);
    };
    Reflector.isProvider = function (target) {
        return Reflect.hasMetadata(constants_1.PROVIDER_METADATA, target);
    };
    Reflector.resolveProviderScope = function (provider) {
        return Reflect.getMetadata(constants_1.SCOPE_METADATA, provider);
    };
    return Reflector;
}());
exports.Reflector = Reflector;
//# sourceMappingURL=reflector.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/registry.js":
/*!*****************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/registry.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(/*! ./errors */ "../../../node_modules/@one/core/lib/errors/index.js");
var module_1 = __webpack_require__(/*! ./module */ "../../../node_modules/@one/core/lib/module/index.js");
var reflector_1 = __webpack_require__(/*! ./reflector */ "../../../node_modules/@one/core/lib/reflector.js");
var util_1 = __webpack_require__(/*! ./util */ "../../../node_modules/@one/core/lib/util.js");
var Registry = (function () {
    function Registry() {
    }
    Registry.clearLazyInjects = function () {
        this.lazyInjects.clear();
    };
    Registry.getLazyInjects = function (target) {
        return __spread(this.lazyInjects.values()).filter(function (provider) { return provider.target === target; });
    };
    Registry.isModule = function (target) {
        return (this.isDynamicModule(target) ||
            (!this.hasProvideToken(target) &&
                !reflector_1.Reflector.isProvider(target) &&
                !this.isInjectionToken(target)));
    };
    Registry.hasForwardRef = function (provider) {
        return !!(provider && provider.forwardRef);
    };
    Registry.getForwardRef = function (provider) {
        return Registry.hasForwardRef(provider)
            ? provider.forwardRef()
            : provider;
    };
    Registry.getProviderName = function (provider) {
        var token = this.getProviderToken(provider);
        return util_1.Utils.isSymbol(token) ? token.toString() : token.name;
    };
    Registry.isInjectionToken = function (provider) {
        return provider instanceof module_1.InjectionToken;
    };
    Registry.getInjectionToken = function (provider) {
        return this.isInjectionToken(provider)
            ? provider.name
            : provider;
    };
    Registry.assertProvider = function (val, context) {
        if (!val)
            throw new errors_1.CircularDependencyException(context);
        if (!(util_1.Utils.isObject(val) ||
            (!util_1.Utils.isNil(val.name) &&
                (util_1.Utils.isFunction(val) || util_1.Utils.isFunction(val.constructor))))) {
            throw new errors_1.InvalidProviderException(val);
        }
        return val;
    };
    Registry.getProviderToken = function (provider) {
        return typeof provider !== 'symbol'
            ? this.getInjectionToken(provider.provide || provider)
            : provider;
    };
    Registry.isDynamicModule = function (module) {
        return !!module.module;
    };
    Registry.isFactoryProvider = function (provider) {
        return !!provider.useFactory;
    };
    Registry.isValueProvider = function (provider) {
        return !!provider.useValue;
    };
    Registry.isClassProvider = function (provider) {
        return !!provider.useClass;
    };
    Registry.isExistingProvider = function (provider) {
        return !!provider.useExisting;
    };
    Registry.hasProvideToken = function (provider) {
        return !!provider.provide;
    };
    Registry.lazyInjects = new Set();
    return Registry;
}());
exports.Registry = Registry;
//# sourceMappingURL=registry.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/tokens.js":
/*!***************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/tokens.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(/*! inversify */ "../../../node_modules/inversify/lib/inversify.js");
var injection_token_1 = __webpack_require__(/*! ./module/injection-token */ "../../../node_modules/@one/core/lib/module/injection-token.js");
exports.APP_INIT = new injection_token_1.InjectionToken('Initialize<App>');
exports.APP_DESTROY = new injection_token_1.InjectionToken('Destroy<App>');
exports.MODULE_INIT = new injection_token_1.InjectionToken('Initialize<Module>');
exports.ONE_MODULE = new injection_token_1.InjectionToken('Ref<Module>');
var Injector = (function (_super) {
    __extends(Injector, _super);
    function Injector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Injector;
}(inversify_1.Container));
exports.Injector = Injector;
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../../node_modules/@one/core/lib/util.js":
/*!*************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/@one/core/lib/util.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(/*! ./errors */ "../../../node_modules/@one/core/lib/errors/index.js");
var Utils = (function () {
    function Utils() {
    }
    Utils.isNode = function () {
        return (!this.isNil(process) &&
            this.isObject(process.release) &&
            process.release.name === 'node');
    };
    Utils.processExit = function (code) {
        if (code === void 0) { code = 0; }
        if (this.isNode()) {
            process.exit(code);
        }
    };
    Utils.isElectron = function () {
        if (!this.isNil(window) &&
            this.isObject(window.process) &&
            window.process.type === 'renderer')
            return true;
        if (!this.isNil(process) &&
            this.isObject(process.versions) &&
            !this.isNil(process.versions.electron))
            return true;
        return (this.isObject(navigator) &&
            this.isString(navigator.userAgent) &&
            navigator.userAgent.includes('Electron'));
    };
    Utils.loadPackage = function (name, context) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, __webpack_require__("../../../node_modules/@one/core/lib sync recursive")(name)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw new errors_1.MissingRequiredDependencyException(name, context);
                    case 3: return [2];
                }
            });
        });
    };
    Utils.isEmpty = function (array) {
        return !(array && array.length > 0);
    };
    Utils.getDeferred = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isPromise(value)) return [3, 2];
                        return [4, value];
                    case 1:
                        _a = _b.sent();
                        return [3, 3];
                    case 2:
                        _a = value;
                        _b.label = 3;
                    case 3: return [2, _a];
                }
            });
        });
    };
    Utils.isIterable = function (val) {
        return val && this.isFunction(val[Symbol.iterator]);
    };
    Utils.isPromise = function (val) {
        return val && this.isFunction(val.then);
    };
    Utils.isObservable = function (val) {
        return val && this.isFunction(val.subscribe);
    };
    Utils.isSymbol = function (val) {
        return typeof val === 'symbol';
    };
    Utils.isNamedFunction = function (val) {
        return (val &&
            !!val.name &&
            (this.isFunction(val) || this.isFunction(val.constructor)));
    };
    Utils.isFunction = function (val) {
        return typeof val === 'function';
    };
    Utils.isNumber = function (val) {
        return typeof val === 'number';
    };
    Utils.isBoolean = function (val) {
        return typeof val === 'boolean';
    };
    Utils.isString = function (val) {
        return typeof val === 'string';
    };
    Utils.isNil = function (val) {
        return this.isUndefined(val) || val === null;
    };
    Utils.isObject = function (val) {
        return typeof val === 'object';
    };
    Utils.isUndefined = function (val) {
        return typeof val === 'undefined';
    };
    Utils.promisify = function (fn) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!_this.isFunction(fn))
                throw new Error("Can't promisify a non function: " + JSON.stringify(fn));
            return new Promise(function (resolve, reject) {
                fn.apply(void 0, __spread(args, [function (err) {
                        var rest = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            rest[_i - 1] = arguments[_i];
                        }
                        if (err)
                            return reject(err);
                        resolve.apply(void 0, __spread(rest));
                    }]));
            });
        };
    };
    Utils.getValues = function (entries) {
        return __spread(entries).map(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], value = _b[1];
            return value;
        });
    };
    Utils.concat = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return [].concat.apply([], __spread(props));
    };
    Utils.flatten = function (arr) {
        return arr.reduce(function (previous, current) { return __spread(previous, current); }, []);
    };
    Utils.omit = function (from) {
        var by = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            by[_i - 1] = arguments[_i];
        }
        var e_2, _a;
        try {
            for (var by_1 = __values(by), by_1_1 = by_1.next(); !by_1_1.done; by_1_1 = by_1.next()) {
                var key = by_1_1.value;
                delete from[key];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (by_1_1 && !by_1_1.done && (_a = by_1.return)) _a.call(by_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return from;
    };
    Utils.series = function (promises) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, promises_1, promises_1_1, promise, e_3_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        promises_1 = __values(promises), promises_1_1 = promises_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!promises_1_1.done) return [3, 4];
                        promise = promises_1_1.value;
                        return [4, promise];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        promises_1_1 = promises_1.next();
                        return [3, 1];
                    case 4: return [3, 7];
                    case 5:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3, 7];
                    case 6:
                        try {
                            if (promises_1_1 && !promises_1_1.done && (_a = promises_1.return)) _a.call(promises_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7];
                    case 7: return [2];
                }
            });
        });
    };
    Utils.filterWhen = function (arr, statement, filter) {
        return !!statement ? arr.filter(filter) : arr;
    };
    Utils.pick = function (from, by) {
        return from.filter(function (f) { return by.includes(f); });
    };
    Utils.createDeferredPromise = function () {
        var resolve;
        var reject;
        var deferred = new Promise(function (_resolve, _reject) {
            resolve = _resolve;
            reject = _reject;
        });
        deferred.resolve = resolve;
        deferred.reject = reject;
        return deferred;
    };
    Utils.transformResult = function (resultOrDeferred) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isObservable(resultOrDeferred)) return [3, 2];
                        return [4, resultOrDeferred.toPromise()];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, resultOrDeferred];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=util.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "../../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../../node_modules/inversify-inject-decorators/lib/decorators.js":
/*!*************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify-inject-decorators/lib/decorators.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var INJECTION = Symbol.for("INJECTION");
function _proxyGetter(proto, key, resolve, doCache) {
    function getter() {
        if (doCache && !Reflect.hasMetadata(INJECTION, this, key)) {
            Reflect.defineMetadata(INJECTION, resolve(), this, key);
        }
        if (Reflect.hasMetadata(INJECTION, this, key)) {
            return Reflect.getMetadata(INJECTION, this, key);
        }
        else {
            return resolve();
        }
    }
    function setter(newVal) {
        Reflect.defineMetadata(INJECTION, newVal, this, key);
    }
    Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: true,
        get: getter,
        set: setter
    });
}
function makePropertyInjectDecorator(container, doCache) {
    return function (serviceIdentifier) {
        return function (proto, key) {
            var resolve = function () {
                return container.get(serviceIdentifier);
            };
            _proxyGetter(proto, key, resolve, doCache);
        };
    };
}
exports.makePropertyInjectDecorator = makePropertyInjectDecorator;
function makePropertyInjectNamedDecorator(container, doCache) {
    return function (serviceIdentifier, named) {
        return function (proto, key) {
            var resolve = function () {
                return container.getNamed(serviceIdentifier, named);
            };
            _proxyGetter(proto, key, resolve, doCache);
        };
    };
}
exports.makePropertyInjectNamedDecorator = makePropertyInjectNamedDecorator;
function makePropertyInjectTaggedDecorator(container, doCache) {
    return function (serviceIdentifier, key, value) {
        return function (proto, propertyName) {
            var resolve = function () {
                return container.getTagged(serviceIdentifier, key, value);
            };
            _proxyGetter(proto, propertyName, resolve, doCache);
        };
    };
}
exports.makePropertyInjectTaggedDecorator = makePropertyInjectTaggedDecorator;
function makePropertyMultiInjectDecorator(container, doCache) {
    return function (serviceIdentifier) {
        return function (proto, key) {
            var resolve = function () {
                return container.getAll(serviceIdentifier);
            };
            _proxyGetter(proto, key, resolve, doCache);
        };
    };
}
exports.makePropertyMultiInjectDecorator = makePropertyMultiInjectDecorator;


/***/ }),

/***/ "../../../node_modules/inversify-inject-decorators/lib/index.js":
/*!********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify-inject-decorators/lib/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = __webpack_require__(/*! ./decorators */ "../../../node_modules/inversify-inject-decorators/lib/decorators.js");
function getDecorators(container, doCache) {
    if (doCache === void 0) { doCache = true; }
    var lazyInject = decorators_1.makePropertyInjectDecorator(container, doCache);
    var lazyInjectNamed = decorators_1.makePropertyInjectNamedDecorator(container, doCache);
    var lazyInjectTagged = decorators_1.makePropertyInjectTaggedDecorator(container, doCache);
    var lazyMultiInject = decorators_1.makePropertyMultiInjectDecorator(container, doCache);
    return {
        lazyInject: lazyInject,
        lazyInjectNamed: lazyInjectNamed,
        lazyInjectTagged: lazyInjectTagged,
        lazyMultiInject: lazyMultiInject
    };
}
exports.default = getDecorators;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/decorator_utils.js":
/*!***********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/decorator_utils.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
    var metadataKey = METADATA_KEY.TAGGED;
    _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
}
exports.tagParameter = tagParameter;
function tagProperty(annotationTarget, propertyName, metadata) {
    var metadataKey = METADATA_KEY.TAGGED_PROP;
    _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
}
exports.tagProperty = tagProperty;
function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
    var paramsOrPropertiesMetadata = {};
    var isParameterDecorator = (typeof parameterIndex === "number");
    var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
    if (isParameterDecorator && propertyName !== undefined) {
        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
    }
    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
    }
    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
    if (!Array.isArray(paramOrPropertyMetadata)) {
        paramOrPropertyMetadata = [];
    }
    else {
        for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
            var m = paramOrPropertyMetadata_1[_i];
            if (m.key === metadata.key) {
                throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key.toString());
            }
        }
    }
    paramOrPropertyMetadata.push(metadata);
    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
}
function _decorate(decorators, target) {
    Reflect.decorate(decorators, target);
}
function _param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function decorate(decorator, target, parameterIndex) {
    if (typeof parameterIndex === "number") {
        _decorate([_param(parameterIndex, decorator)], target);
    }
    else if (typeof parameterIndex === "string") {
        Reflect.decorate([decorator], target, parameterIndex);
    }
    else {
        _decorate([decorator], target);
    }
}
exports.decorate = decorate;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/inject.js":
/*!**************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/inject.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_msgs_1 = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "../../../node_modules/inversify/lib/annotation/decorator_utils.js");
var LazyServiceIdentifer = (function () {
    function LazyServiceIdentifer(cb) {
        this._cb = cb;
    }
    LazyServiceIdentifer.prototype.unwrap = function () {
        return this._cb();
    };
    return LazyServiceIdentifer;
}());
exports.LazyServiceIdentifer = LazyServiceIdentifer;
function inject(serviceIdentifier) {
    return function (target, targetKey, index) {
        if (serviceIdentifier === undefined) {
            throw new Error(error_msgs_1.UNDEFINED_INJECT_ANNOTATION(target.name));
        }
        var metadata = new metadata_1.Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.inject = inject;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/injectable.js":
/*!******************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/injectable.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERRORS_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
function injectable() {
    return function (target) {
        if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
        }
        var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
        Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
        return target;
    };
}
exports.injectable = injectable;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/multi_inject.js":
/*!********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/multi_inject.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "../../../node_modules/inversify/lib/annotation/decorator_utils.js");
function multiInject(serviceIdentifier) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.multiInject = multiInject;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/named.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/named.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "../../../node_modules/inversify/lib/annotation/decorator_utils.js");
function named(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, name);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.named = named;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/optional.js":
/*!****************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/optional.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "../../../node_modules/inversify/lib/annotation/decorator_utils.js");
function optional() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.OPTIONAL_TAG, true);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.optional = optional;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/post_construct.js":
/*!**********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/post_construct.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERRORS_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
function postConstruct() {
    return function (target, propertyKey, descriptor) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.POST_CONSTRUCT, propertyKey);
        if (Reflect.hasOwnMetadata(METADATA_KEY.POST_CONSTRUCT, target.constructor)) {
            throw new Error(ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
        }
        Reflect.defineMetadata(METADATA_KEY.POST_CONSTRUCT, metadata, target.constructor);
    };
}
exports.postConstruct = postConstruct;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/tagged.js":
/*!**************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/tagged.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "../../../node_modules/inversify/lib/annotation/decorator_utils.js");
function tagged(metadataKey, metadataValue) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.tagged = tagged;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/target_name.js":
/*!*******************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/target_name.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "../../../node_modules/inversify/lib/annotation/decorator_utils.js");
function targetName(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAME_TAG, name);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.targetName = targetName;


/***/ }),

/***/ "../../../node_modules/inversify/lib/annotation/unmanaged.js":
/*!*****************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/annotation/unmanaged.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "../../../node_modules/inversify/lib/annotation/decorator_utils.js");
function unmanaged() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.unmanaged = unmanaged;


/***/ }),

/***/ "../../../node_modules/inversify/lib/bindings/binding.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/bindings/binding.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "../../../node_modules/inversify/lib/utils/id.js");
var Binding = (function () {
    function Binding(serviceIdentifier, scope) {
        this.id = id_1.id();
        this.activated = false;
        this.serviceIdentifier = serviceIdentifier;
        this.scope = scope;
        this.type = literal_types_1.BindingTypeEnum.Invalid;
        this.constraint = function (request) { return true; };
        this.implementationType = null;
        this.cache = null;
        this.factory = null;
        this.provider = null;
        this.onActivation = null;
        this.dynamicValue = null;
    }
    Binding.prototype.clone = function () {
        var clone = new Binding(this.serviceIdentifier, this.scope);
        clone.activated = false;
        clone.implementationType = this.implementationType;
        clone.dynamicValue = this.dynamicValue;
        clone.scope = this.scope;
        clone.type = this.type;
        clone.factory = this.factory;
        clone.provider = this.provider;
        clone.constraint = this.constraint;
        clone.onActivation = this.onActivation;
        clone.cache = this.cache;
        return clone;
    };
    return Binding;
}());
exports.Binding = Binding;


/***/ }),

/***/ "../../../node_modules/inversify/lib/bindings/binding_count.js":
/*!*******************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/bindings/binding_count.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindingCount = {
    MultipleBindingsAvailable: 2,
    NoBindingsAvailable: 0,
    OnlyOneBindingAvailable: 1
};
exports.BindingCount = BindingCount;


/***/ }),

/***/ "../../../node_modules/inversify/lib/constants/error_msgs.js":
/*!*****************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/constants/error_msgs.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
exports.NULL_ARGUMENT = "NULL argument";
exports.KEY_NOT_FOUND = "Key Not Found";
exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
exports.UNDEFINED_INJECT_ANNOTATION = function (name) {
    return "@inject called with undefined this could mean that the class " + name + " has " +
        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
        "overcome this limitation.";
};
exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
exports.INVALID_BINDING_TYPE = "Invalid binding type:";
exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
    "used as service identifier";
exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
    "must be applied to the parameters of a class constructor or a class property.";
exports.ARGUMENTS_LENGTH_MISMATCH = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "The number of constructor arguments in the derived class " +
        (values[0] + " must be >= than the number of constructor arguments of its base class.");
};
exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
    "must be an object.";
exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
    "be a string ('singleton' or 'transient').";
exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
    "be a boolean";
exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
    "be a boolean";
exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
exports.POST_CONSTRUCT_ERROR = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "@postConstruct error in class " + values[0] + ": " + values[1];
};
exports.CIRCULAR_DEPENDENCY_IN_FACTORY = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "It looks like there is a circular dependency " +
        ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") +
        ("service identifier '" + values[1] + "'.");
};
exports.STACK_OVERFLOW = "Maximum call stack size exceeded";


/***/ }),

/***/ "../../../node_modules/inversify/lib/constants/literal_types.js":
/*!********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/constants/literal_types.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindingScopeEnum = {
    Request: "Request",
    Singleton: "Singleton",
    Transient: "Transient"
};
exports.BindingScopeEnum = BindingScopeEnum;
var BindingTypeEnum = {
    ConstantValue: "ConstantValue",
    Constructor: "Constructor",
    DynamicValue: "DynamicValue",
    Factory: "Factory",
    Function: "Function",
    Instance: "Instance",
    Invalid: "Invalid",
    Provider: "Provider"
};
exports.BindingTypeEnum = BindingTypeEnum;
var TargetTypeEnum = {
    ClassProperty: "ClassProperty",
    ConstructorArgument: "ConstructorArgument",
    Variable: "Variable"
};
exports.TargetTypeEnum = TargetTypeEnum;


/***/ }),

/***/ "../../../node_modules/inversify/lib/constants/metadata_keys.js":
/*!********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/constants/metadata_keys.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMED_TAG = "named";
exports.NAME_TAG = "name";
exports.UNMANAGED_TAG = "unmanaged";
exports.OPTIONAL_TAG = "optional";
exports.INJECT_TAG = "inject";
exports.MULTI_INJECT_TAG = "multi_inject";
exports.TAGGED = "inversify:tagged";
exports.TAGGED_PROP = "inversify:tagged_props";
exports.PARAM_TYPES = "inversify:paramtypes";
exports.DESIGN_PARAM_TYPES = "design:paramtypes";
exports.POST_CONSTRUCT = "post_construct";


/***/ }),

/***/ "../../../node_modules/inversify/lib/container/container.js":
/*!****************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/container/container.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = __webpack_require__(/*! ../bindings/binding */ "../../../node_modules/inversify/lib/bindings/binding.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_reader_1 = __webpack_require__(/*! ../planning/metadata_reader */ "../../../node_modules/inversify/lib/planning/metadata_reader.js");
var planner_1 = __webpack_require__(/*! ../planning/planner */ "../../../node_modules/inversify/lib/planning/planner.js");
var resolver_1 = __webpack_require__(/*! ../resolution/resolver */ "../../../node_modules/inversify/lib/resolution/resolver.js");
var binding_to_syntax_1 = __webpack_require__(/*! ../syntax/binding_to_syntax */ "../../../node_modules/inversify/lib/syntax/binding_to_syntax.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "../../../node_modules/inversify/lib/utils/id.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "../../../node_modules/inversify/lib/utils/serialization.js");
var container_snapshot_1 = __webpack_require__(/*! ./container_snapshot */ "../../../node_modules/inversify/lib/container/container_snapshot.js");
var lookup_1 = __webpack_require__(/*! ./lookup */ "../../../node_modules/inversify/lib/container/lookup.js");
var Container = (function () {
    function Container(containerOptions) {
        var options = containerOptions || {};
        if (typeof options !== "object") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
        }
        if (options.defaultScope === undefined) {
            options.defaultScope = literal_types_1.BindingScopeEnum.Transient;
        }
        else if (options.defaultScope !== literal_types_1.BindingScopeEnum.Singleton &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Transient &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Request) {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
        }
        if (options.autoBindInjectable === undefined) {
            options.autoBindInjectable = false;
        }
        else if (typeof options.autoBindInjectable !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
        }
        if (options.skipBaseClassChecks === undefined) {
            options.skipBaseClassChecks = false;
        }
        else if (typeof options.skipBaseClassChecks !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
        }
        this.options = {
            autoBindInjectable: options.autoBindInjectable,
            defaultScope: options.defaultScope,
            skipBaseClassChecks: options.skipBaseClassChecks
        };
        this.id = id_1.id();
        this._bindingDictionary = new lookup_1.Lookup();
        this._snapshots = [];
        this._middleware = null;
        this.parent = null;
        this._metadataReader = new metadata_reader_1.MetadataReader();
    }
    Container.merge = function (container1, container2) {
        var container = new Container();
        var bindingDictionary = planner_1.getBindingDictionary(container);
        var bindingDictionary1 = planner_1.getBindingDictionary(container1);
        var bindingDictionary2 = planner_1.getBindingDictionary(container2);
        function copyDictionary(origin, destination) {
            origin.traverse(function (key, value) {
                value.forEach(function (binding) {
                    destination.add(binding.serviceIdentifier, binding.clone());
                });
            });
        }
        copyDictionary(bindingDictionary1, bindingDictionary);
        copyDictionary(bindingDictionary2, bindingDictionary);
        return container;
    };
    Container.prototype.load = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var getHelpers = this._getContainerModuleHelpersFactory();
        for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
            var currentModule = modules_1[_a];
            var containerModuleHelpers = getHelpers(currentModule.id);
            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
        }
    };
    Container.prototype.loadAsync = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getHelpers = this._getContainerModuleHelpersFactory();
                        _a = 0, modules_2 = modules;
                        _b.label = 1;
                    case 1:
                        if (!(_a < modules_2.length)) return [3, 4];
                        currentModule = modules_2[_a];
                        containerModuleHelpers = getHelpers(currentModule.id);
                        return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.unload = function () {
        var _this = this;
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var conditionFactory = function (expected) { return function (item) {
            return item.moduleId === expected;
        }; };
        modules.forEach(function (module) {
            var condition = conditionFactory(module.id);
            _this._bindingDictionary.removeByCondition(condition);
        });
    };
    Container.prototype.bind = function (serviceIdentifier) {
        var scope = this.options.defaultScope || literal_types_1.BindingScopeEnum.Transient;
        var binding = new binding_1.Binding(serviceIdentifier, scope);
        this._bindingDictionary.add(serviceIdentifier, binding);
        return new binding_to_syntax_1.BindingToSyntax(binding);
    };
    Container.prototype.rebind = function (serviceIdentifier) {
        this.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    };
    Container.prototype.unbind = function (serviceIdentifier) {
        try {
            this._bindingDictionary.remove(serviceIdentifier);
        }
        catch (e) {
            throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + serialization_1.getServiceIdentifierAsString(serviceIdentifier));
        }
    };
    Container.prototype.unbindAll = function () {
        this._bindingDictionary = new lookup_1.Lookup();
    };
    Container.prototype.isBound = function (serviceIdentifier) {
        var bound = this._bindingDictionary.hasKey(serviceIdentifier);
        if (!bound && this.parent) {
            bound = this.parent.isBound(serviceIdentifier);
        }
        return bound;
    };
    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
        return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
        var bound = false;
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            var bindings = this._bindingDictionary.get(serviceIdentifier);
            var request_1 = planner_1.createMockRequest(this, serviceIdentifier, key, value);
            bound = bindings.some(function (b) { return b.constraint(request_1); });
        }
        if (!bound && this.parent) {
            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
        }
        return bound;
    };
    Container.prototype.snapshot = function () {
        this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
    };
    Container.prototype.restore = function () {
        var snapshot = this._snapshots.pop();
        if (snapshot === undefined) {
            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
        }
        this._bindingDictionary = snapshot.bindings;
        this._middleware = snapshot.middleware;
    };
    Container.prototype.createChild = function (containerOptions) {
        var child = new Container(containerOptions || this.options);
        child.parent = this;
        return child;
    };
    Container.prototype.applyMiddleware = function () {
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        var initial = (this._middleware) ? this._middleware : this._planAndResolve();
        this._middleware = middlewares.reduce(function (prev, curr) { return curr(prev); }, initial);
    };
    Container.prototype.applyCustomMetadataReader = function (metadataReader) {
        this._metadataReader = metadataReader;
    };
    Container.prototype.get = function (serviceIdentifier) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getNamed = function (serviceIdentifier, named) {
        return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.getAll = function (serviceIdentifier) {
        return this._get(true, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
        return this._get(false, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
        return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.resolve = function (constructorFunction) {
        var tempContainer = this.createChild();
        tempContainer.bind(constructorFunction).toSelf();
        return tempContainer.get(constructorFunction);
    };
    Container.prototype._getContainerModuleHelpersFactory = function () {
        var _this = this;
        var setModuleId = function (bindingToSyntax, moduleId) {
            bindingToSyntax._binding.moduleId = moduleId;
        };
        var getBindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _bind = _this.bind.bind(_this);
                var bindingToSyntax = _bind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        var getUnbindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _unbind = _this.unbind.bind(_this);
                _unbind(serviceIdentifier);
            };
        };
        var getIsboundFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _isBound = _this.isBound.bind(_this);
                return _isBound(serviceIdentifier);
            };
        };
        var getRebindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _rebind = _this.rebind.bind(_this);
                var bindingToSyntax = _rebind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        return function (mId) { return ({
            bindFunction: getBindFunction(mId),
            isboundFunction: getIsboundFunction(mId),
            rebindFunction: getRebindFunction(mId),
            unbindFunction: getUnbindFunction(mId)
        }); };
    };
    Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
        var result = null;
        var defaultArgs = {
            avoidConstraints: avoidConstraints,
            contextInterceptor: function (context) { return context; },
            isMultiInject: isMultiInject,
            key: key,
            serviceIdentifier: serviceIdentifier,
            targetType: targetType,
            value: value
        };
        if (this._middleware) {
            result = this._middleware(defaultArgs);
            if (result === undefined || result === null) {
                throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
            }
        }
        else {
            result = this._planAndResolve()(defaultArgs);
        }
        return result;
    };
    Container.prototype._planAndResolve = function () {
        var _this = this;
        return function (args) {
            var context = planner_1.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
            context = args.contextInterceptor(context);
            var result = resolver_1.resolve(context);
            return result;
        };
    };
    return Container;
}());
exports.Container = Container;


/***/ }),

/***/ "../../../node_modules/inversify/lib/container/container_module.js":
/*!***********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/container/container_module.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "../../../node_modules/inversify/lib/utils/id.js");
var ContainerModule = (function () {
    function ContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return ContainerModule;
}());
exports.ContainerModule = ContainerModule;
var AsyncContainerModule = (function () {
    function AsyncContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return AsyncContainerModule;
}());
exports.AsyncContainerModule = AsyncContainerModule;


/***/ }),

/***/ "../../../node_modules/inversify/lib/container/container_snapshot.js":
/*!*************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/container/container_snapshot.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContainerSnapshot = (function () {
    function ContainerSnapshot() {
    }
    ContainerSnapshot.of = function (bindings, middleware) {
        var snapshot = new ContainerSnapshot();
        snapshot.bindings = bindings;
        snapshot.middleware = middleware;
        return snapshot;
    };
    return ContainerSnapshot;
}());
exports.ContainerSnapshot = ContainerSnapshot;


/***/ }),

/***/ "../../../node_modules/inversify/lib/container/lookup.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/container/lookup.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var Lookup = (function () {
    function Lookup() {
        this._map = new Map();
    }
    Lookup.prototype.getMap = function () {
        return this._map;
    };
    Lookup.prototype.add = function (serviceIdentifier, value) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (value === null || value === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            entry.push(value);
            this._map.set(serviceIdentifier, entry);
        }
        else {
            this._map.set(serviceIdentifier, [value]);
        }
    };
    Lookup.prototype.get = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            return entry;
        }
        else {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.remove = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (!this._map.delete(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.removeByCondition = function (condition) {
        var _this = this;
        this._map.forEach(function (entries, key) {
            var updatedEntries = entries.filter(function (entry) { return !condition(entry); });
            if (updatedEntries.length > 0) {
                _this._map.set(key, updatedEntries);
            }
            else {
                _this._map.delete(key);
            }
        });
    };
    Lookup.prototype.hasKey = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        return this._map.has(serviceIdentifier);
    };
    Lookup.prototype.clone = function () {
        var copy = new Lookup();
        this._map.forEach(function (value, key) {
            value.forEach(function (b) { return copy.add(key, b.clone()); });
        });
        return copy;
    };
    Lookup.prototype.traverse = function (func) {
        this._map.forEach(function (value, key) {
            func(key, value);
        });
    };
    return Lookup;
}());
exports.Lookup = Lookup;


/***/ }),

/***/ "../../../node_modules/inversify/lib/inversify.js":
/*!******************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/inversify.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keys = __webpack_require__(/*! ./constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
exports.METADATA_KEY = keys;
var container_1 = __webpack_require__(/*! ./container/container */ "../../../node_modules/inversify/lib/container/container.js");
exports.Container = container_1.Container;
var literal_types_1 = __webpack_require__(/*! ./constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
exports.BindingScopeEnum = literal_types_1.BindingScopeEnum;
exports.BindingTypeEnum = literal_types_1.BindingTypeEnum;
exports.TargetTypeEnum = literal_types_1.TargetTypeEnum;
var container_module_1 = __webpack_require__(/*! ./container/container_module */ "../../../node_modules/inversify/lib/container/container_module.js");
exports.AsyncContainerModule = container_module_1.AsyncContainerModule;
exports.ContainerModule = container_module_1.ContainerModule;
var injectable_1 = __webpack_require__(/*! ./annotation/injectable */ "../../../node_modules/inversify/lib/annotation/injectable.js");
exports.injectable = injectable_1.injectable;
var tagged_1 = __webpack_require__(/*! ./annotation/tagged */ "../../../node_modules/inversify/lib/annotation/tagged.js");
exports.tagged = tagged_1.tagged;
var named_1 = __webpack_require__(/*! ./annotation/named */ "../../../node_modules/inversify/lib/annotation/named.js");
exports.named = named_1.named;
var inject_1 = __webpack_require__(/*! ./annotation/inject */ "../../../node_modules/inversify/lib/annotation/inject.js");
exports.inject = inject_1.inject;
exports.LazyServiceIdentifer = inject_1.LazyServiceIdentifer;
var optional_1 = __webpack_require__(/*! ./annotation/optional */ "../../../node_modules/inversify/lib/annotation/optional.js");
exports.optional = optional_1.optional;
var unmanaged_1 = __webpack_require__(/*! ./annotation/unmanaged */ "../../../node_modules/inversify/lib/annotation/unmanaged.js");
exports.unmanaged = unmanaged_1.unmanaged;
var multi_inject_1 = __webpack_require__(/*! ./annotation/multi_inject */ "../../../node_modules/inversify/lib/annotation/multi_inject.js");
exports.multiInject = multi_inject_1.multiInject;
var target_name_1 = __webpack_require__(/*! ./annotation/target_name */ "../../../node_modules/inversify/lib/annotation/target_name.js");
exports.targetName = target_name_1.targetName;
var post_construct_1 = __webpack_require__(/*! ./annotation/post_construct */ "../../../node_modules/inversify/lib/annotation/post_construct.js");
exports.postConstruct = post_construct_1.postConstruct;
var metadata_reader_1 = __webpack_require__(/*! ./planning/metadata_reader */ "../../../node_modules/inversify/lib/planning/metadata_reader.js");
exports.MetadataReader = metadata_reader_1.MetadataReader;
var id_1 = __webpack_require__(/*! ./utils/id */ "../../../node_modules/inversify/lib/utils/id.js");
exports.id = id_1.id;
var decorator_utils_1 = __webpack_require__(/*! ./annotation/decorator_utils */ "../../../node_modules/inversify/lib/annotation/decorator_utils.js");
exports.decorate = decorator_utils_1.decorate;
var constraint_helpers_1 = __webpack_require__(/*! ./syntax/constraint_helpers */ "../../../node_modules/inversify/lib/syntax/constraint_helpers.js");
exports.traverseAncerstors = constraint_helpers_1.traverseAncerstors;
exports.taggedConstraint = constraint_helpers_1.taggedConstraint;
exports.namedConstraint = constraint_helpers_1.namedConstraint;
exports.typeConstraint = constraint_helpers_1.typeConstraint;
var serialization_1 = __webpack_require__(/*! ./utils/serialization */ "../../../node_modules/inversify/lib/utils/serialization.js");
exports.getServiceIdentifierAsString = serialization_1.getServiceIdentifierAsString;
var binding_utils_1 = __webpack_require__(/*! ./utils/binding_utils */ "../../../node_modules/inversify/lib/utils/binding_utils.js");
exports.multiBindToService = binding_utils_1.multiBindToService;


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/context.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/context.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "../../../node_modules/inversify/lib/utils/id.js");
var Context = (function () {
    function Context(container) {
        this.id = id_1.id();
        this.container = container;
    }
    Context.prototype.addPlan = function (plan) {
        this.plan = plan;
    };
    Context.prototype.setCurrentRequest = function (currentRequest) {
        this.currentRequest = currentRequest;
    };
    return Context;
}());
exports.Context = Context;


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/metadata.js":
/*!**************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/metadata.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var Metadata = (function () {
    function Metadata(key, value) {
        this.key = key;
        this.value = value;
    }
    Metadata.prototype.toString = function () {
        if (this.key === METADATA_KEY.NAMED_TAG) {
            return "named: " + this.value.toString() + " ";
        }
        else {
            return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
        }
    };
    return Metadata;
}());
exports.Metadata = Metadata;


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/metadata_reader.js":
/*!*********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/metadata_reader.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var MetadataReader = (function () {
    function MetadataReader() {
    }
    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
        var compilerGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, constructorFunc);
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, constructorFunc);
        return {
            compilerGeneratedMetadata: compilerGeneratedMetadata,
            userGeneratedMetadata: userGeneratedMetadata || {}
        };
    };
    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED_PROP, constructorFunc) || [];
        return userGeneratedMetadata;
    };
    return MetadataReader;
}());
exports.MetadataReader = MetadataReader;


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/plan.js":
/*!**********************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/plan.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Plan = (function () {
    function Plan(parentContext, rootRequest) {
        this.parentContext = parentContext;
        this.rootRequest = rootRequest;
    }
    return Plan;
}());
exports.Plan = Plan;


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/planner.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/planner.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_count_1 = __webpack_require__(/*! ../bindings/binding_count */ "../../../node_modules/inversify/lib/bindings/binding_count.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "../../../node_modules/inversify/lib/utils/exceptions.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "../../../node_modules/inversify/lib/utils/serialization.js");
var context_1 = __webpack_require__(/*! ./context */ "../../../node_modules/inversify/lib/planning/context.js");
var metadata_1 = __webpack_require__(/*! ./metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var plan_1 = __webpack_require__(/*! ./plan */ "../../../node_modules/inversify/lib/planning/plan.js");
var reflection_utils_1 = __webpack_require__(/*! ./reflection_utils */ "../../../node_modules/inversify/lib/planning/reflection_utils.js");
var request_1 = __webpack_require__(/*! ./request */ "../../../node_modules/inversify/lib/planning/request.js");
var target_1 = __webpack_require__(/*! ./target */ "../../../node_modules/inversify/lib/planning/target.js");
function getBindingDictionary(cntnr) {
    return cntnr._bindingDictionary;
}
exports.getBindingDictionary = getBindingDictionary;
function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
    var metadataKey = isMultiInject ? METADATA_KEY.MULTI_INJECT_TAG : METADATA_KEY.INJECT_TAG;
    var injectMetadata = new metadata_1.Metadata(metadataKey, serviceIdentifier);
    var target = new target_1.Target(targetType, name, serviceIdentifier, injectMetadata);
    if (key !== undefined) {
        var tagMetadata = new metadata_1.Metadata(key, value);
        target.metadata.push(tagMetadata);
    }
    return target;
}
function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
    var bindings = getBindings(context.container, target.serviceIdentifier);
    var activeBindings = [];
    if (bindings.length === binding_count_1.BindingCount.NoBindingsAvailable &&
        context.container.options.autoBindInjectable &&
        typeof target.serviceIdentifier === "function" &&
        metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
        context.container.bind(target.serviceIdentifier).toSelf();
        bindings = getBindings(context.container, target.serviceIdentifier);
    }
    if (!avoidConstraints) {
        activeBindings = bindings.filter(function (binding) {
            var request = new request_1.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
            return binding.constraint(request);
        });
    }
    else {
        activeBindings = bindings;
    }
    _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
    return activeBindings;
}
function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
    switch (bindings.length) {
        case binding_count_1.BindingCount.NoBindingsAvailable:
            if (target.isOptional()) {
                return bindings;
            }
            else {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.NOT_REGISTERED;
                msg += serialization_1.listMetadataForTarget(serviceIdentifierString, target);
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
        case binding_count_1.BindingCount.OnlyOneBindingAvailable:
            if (!target.isArray()) {
                return bindings;
            }
        case binding_count_1.BindingCount.MultipleBindingsAvailable:
        default:
            if (!target.isArray()) {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
            else {
                return bindings;
            }
    }
}
function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
    var activeBindings;
    var childRequest;
    if (parentRequest === null) {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
        childRequest = new request_1.Request(serviceIdentifier, context, null, activeBindings, target);
        var thePlan = new plan_1.Plan(context, childRequest);
        context.addPlan(thePlan);
    }
    else {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
        childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
    }
    activeBindings.forEach(function (binding) {
        var subChildRequest = null;
        if (target.isArray()) {
            subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
        }
        else {
            if (binding.cache) {
                return;
            }
            subChildRequest = childRequest;
        }
        if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
            var dependencies = reflection_utils_1.getDependencies(metadataReader, binding.implementationType);
            if (!context.container.options.skipBaseClassChecks) {
                var baseClassDependencyCount = reflection_utils_1.getBaseClassDependencyCount(metadataReader, binding.implementationType);
                if (dependencies.length < baseClassDependencyCount) {
                    var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH(reflection_utils_1.getFunctionName(binding.implementationType));
                    throw new Error(error);
                }
            }
            dependencies.forEach(function (dependency) {
                _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
            });
        }
    });
}
function getBindings(container, serviceIdentifier) {
    var bindings = [];
    var bindingDictionary = getBindingDictionary(container);
    if (bindingDictionary.hasKey(serviceIdentifier)) {
        bindings = bindingDictionary.get(serviceIdentifier);
    }
    else if (container.parent !== null) {
        bindings = getBindings(container.parent, serviceIdentifier);
    }
    return bindings;
}
function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
    if (avoidConstraints === void 0) { avoidConstraints = false; }
    var context = new context_1.Context(container);
    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
    try {
        _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
        return context;
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            if (context.plan) {
                serialization_1.circularDependencyToException(context.plan.rootRequest);
            }
        }
        throw error;
    }
}
exports.plan = plan;
function createMockRequest(container, serviceIdentifier, key, value) {
    var target = new target_1.Target(literal_types_1.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata_1.Metadata(key, value));
    var context = new context_1.Context(container);
    var request = new request_1.Request(serviceIdentifier, context, null, [], target);
    return request;
}
exports.createMockRequest = createMockRequest;


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/queryable_string.js":
/*!**********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/queryable_string.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var QueryableString = (function () {
    function QueryableString(str) {
        this.str = str;
    }
    QueryableString.prototype.startsWith = function (searchString) {
        return this.str.indexOf(searchString) === 0;
    };
    QueryableString.prototype.endsWith = function (searchString) {
        var reverseString = "";
        var reverseSearchString = searchString.split("").reverse().join("");
        reverseString = this.str.split("").reverse().join("");
        return this.startsWith.call({ str: reverseString }, reverseSearchString);
    };
    QueryableString.prototype.contains = function (searchString) {
        return (this.str.indexOf(searchString) !== -1);
    };
    QueryableString.prototype.equals = function (compareString) {
        return this.str === compareString;
    };
    QueryableString.prototype.value = function () {
        return this.str;
    };
    return QueryableString;
}());
exports.QueryableString = QueryableString;


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/reflection_utils.js":
/*!**********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/reflection_utils.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = __webpack_require__(/*! ../annotation/inject */ "../../../node_modules/inversify/lib/annotation/inject.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "../../../node_modules/inversify/lib/utils/serialization.js");
exports.getFunctionName = serialization_1.getFunctionName;
var target_1 = __webpack_require__(/*! ./target */ "../../../node_modules/inversify/lib/planning/target.js");
function getDependencies(metadataReader, func) {
    var constructorName = serialization_1.getFunctionName(func);
    var targets = getTargets(metadataReader, constructorName, func, false);
    return targets;
}
exports.getDependencies = getDependencies;
function getTargets(metadataReader, constructorName, func, isBaseClass) {
    var metadata = metadataReader.getConstructorMetadata(func);
    var serviceIdentifiers = metadata.compilerGeneratedMetadata;
    if (serviceIdentifiers === undefined) {
        var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
        throw new Error(msg);
    }
    var constructorArgsMetadata = metadata.userGeneratedMetadata;
    var keys = Object.keys(constructorArgsMetadata);
    var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
    var iterations = (hasUserDeclaredUnknownInjections) ? keys.length : func.length;
    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
    var propertyTargets = getClassPropsAsTargets(metadataReader, func);
    var targets = constructorTargets.concat(propertyTargets);
    return targets;
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
    var metadata = formatTargetMetadata(targetMetadata);
    var isManaged = metadata.unmanaged !== true;
    var serviceIdentifier = serviceIdentifiers[index];
    var injectIdentifier = (metadata.inject || metadata.multiInject);
    serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
    if (serviceIdentifier instanceof inject_1.LazyServiceIdentifer) {
        serviceIdentifier = serviceIdentifier.unwrap();
    }
    if (isManaged) {
        var isObject = serviceIdentifier === Object;
        var isFunction = serviceIdentifier === Function;
        var isUndefined = serviceIdentifier === undefined;
        var isUnknownType = (isObject || isFunction || isUndefined);
        if (!isBaseClass && isUnknownType) {
            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
            throw new Error(msg);
        }
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        return target;
    }
    return null;
}
function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
    var targets = [];
    for (var i = 0; i < iterations; i++) {
        var index = i;
        var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
        if (target !== null) {
            targets.push(target);
        }
    }
    return targets;
}
function getClassPropsAsTargets(metadataReader, constructorFunc) {
    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
    var targets = [];
    var keys = Object.keys(classPropsMetadata);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var targetMetadata = classPropsMetadata[key];
        var metadata = formatTargetMetadata(classPropsMetadata[key]);
        var targetName = metadata.targetName || key;
        var serviceIdentifier = (metadata.inject || metadata.multiInject);
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        targets.push(target);
    }
    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
        targets = targets.concat(baseTargets);
    }
    return targets;
}
function getBaseClassDependencyCount(metadataReader, func) {
    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseConstructorName = serialization_1.getFunctionName(baseConstructor);
        var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
        var metadata = targets.map(function (t) {
            return t.metadata.filter(function (m) {
                return m.key === METADATA_KEY.UNMANAGED_TAG;
            });
        });
        var unmanagedCount = [].concat.apply([], metadata).length;
        var dependencyCount = targets.length - unmanagedCount;
        if (dependencyCount > 0) {
            return dependencyCount;
        }
        else {
            return getBaseClassDependencyCount(metadataReader, baseConstructor);
        }
    }
    else {
        return 0;
    }
}
exports.getBaseClassDependencyCount = getBaseClassDependencyCount;
function formatTargetMetadata(targetMetadata) {
    var targetMetadataMap = {};
    targetMetadata.forEach(function (m) {
        targetMetadataMap[m.key.toString()] = m.value;
    });
    return {
        inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
        multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
        targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
        unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
    };
}


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/request.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/request.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "../../../node_modules/inversify/lib/utils/id.js");
var Request = (function () {
    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
        this.id = id_1.id();
        this.serviceIdentifier = serviceIdentifier;
        this.parentContext = parentContext;
        this.parentRequest = parentRequest;
        this.target = target;
        this.childRequests = [];
        this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
        this.requestScope = parentRequest === null
            ? new Map()
            : null;
    }
    Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
        var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
        this.childRequests.push(child);
        return child;
    };
    return Request;
}());
exports.Request = Request;


/***/ }),

/***/ "../../../node_modules/inversify/lib/planning/target.js":
/*!************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/planning/target.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "../../../node_modules/inversify/lib/utils/id.js");
var metadata_1 = __webpack_require__(/*! ./metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var queryable_string_1 = __webpack_require__(/*! ./queryable_string */ "../../../node_modules/inversify/lib/planning/queryable_string.js");
var Target = (function () {
    function Target(type, name, serviceIdentifier, namedOrTagged) {
        this.id = id_1.id();
        this.type = type;
        this.serviceIdentifier = serviceIdentifier;
        this.name = new queryable_string_1.QueryableString(name || "");
        this.metadata = new Array();
        var metadataItem = null;
        if (typeof namedOrTagged === "string") {
            metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
        }
        else if (namedOrTagged instanceof metadata_1.Metadata) {
            metadataItem = namedOrTagged;
        }
        if (metadataItem !== null) {
            this.metadata.push(metadataItem);
        }
    }
    Target.prototype.hasTag = function (key) {
        for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.key === key) {
                return true;
            }
        }
        return false;
    };
    Target.prototype.isArray = function () {
        return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
    };
    Target.prototype.matchesArray = function (name) {
        return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
    };
    Target.prototype.isNamed = function () {
        return this.hasTag(METADATA_KEY.NAMED_TAG);
    };
    Target.prototype.isTagged = function () {
        return this.metadata.some(function (m) {
            return (m.key !== METADATA_KEY.INJECT_TAG) &&
                (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
                (m.key !== METADATA_KEY.NAME_TAG) &&
                (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
                (m.key !== METADATA_KEY.NAMED_TAG);
        });
    };
    Target.prototype.isOptional = function () {
        return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
    };
    Target.prototype.getNamedTag = function () {
        if (this.isNamed()) {
            return this.metadata.filter(function (m) { return m.key === METADATA_KEY.NAMED_TAG; })[0];
        }
        return null;
    };
    Target.prototype.getCustomTags = function () {
        if (this.isTagged()) {
            return this.metadata.filter(function (m) {
                return (m.key !== METADATA_KEY.INJECT_TAG) &&
                    (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
                    (m.key !== METADATA_KEY.NAME_TAG) &&
                    (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
                    (m.key !== METADATA_KEY.NAMED_TAG);
            });
        }
        return null;
    };
    Target.prototype.matchesNamedTag = function (name) {
        return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
    };
    Target.prototype.matchesTag = function (key) {
        var _this = this;
        return function (value) {
            for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.key === key && m.value === value) {
                    return true;
                }
            }
            return false;
        };
    };
    return Target;
}());
exports.Target = Target;


/***/ }),

/***/ "../../../node_modules/inversify/lib/resolution/instantiation.js":
/*!*********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/resolution/instantiation.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_msgs_1 = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
function _injectProperties(instance, childRequests, resolveRequest) {
    var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
        return (childRequest.target !== null &&
            childRequest.target.type === literal_types_1.TargetTypeEnum.ClassProperty);
    });
    var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
    propertyInjectionsRequests.forEach(function (r, index) {
        var propertyName = "";
        propertyName = r.target.name.value();
        var injection = propertyInjections[index];
        instance[propertyName] = injection;
    });
    return instance;
}
function _createInstance(Func, injections) {
    return new (Func.bind.apply(Func, [void 0].concat(injections)))();
}
function _postConstruct(constr, result) {
    if (Reflect.hasMetadata(METADATA_KEY.POST_CONSTRUCT, constr)) {
        var data = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, constr);
        try {
            result[data.value]();
        }
        catch (e) {
            throw new Error(error_msgs_1.POST_CONSTRUCT_ERROR(constr.name, e.message));
        }
    }
}
function resolveInstance(constr, childRequests, resolveRequest) {
    var result = null;
    if (childRequests.length > 0) {
        var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
            return (childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ConstructorArgument);
        });
        var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
        result = _createInstance(constr, constructorInjections);
        result = _injectProperties(result, childRequests, resolveRequest);
    }
    else {
        result = new constr();
    }
    _postConstruct(constr, result);
    return result;
}
exports.resolveInstance = resolveInstance;


/***/ }),

/***/ "../../../node_modules/inversify/lib/resolution/resolver.js":
/*!****************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/resolution/resolver.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
var exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "../../../node_modules/inversify/lib/utils/exceptions.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "../../../node_modules/inversify/lib/utils/serialization.js");
var instantiation_1 = __webpack_require__(/*! ./instantiation */ "../../../node_modules/inversify/lib/resolution/instantiation.js");
var invokeFactory = function (factoryType, serviceIdentifier, fn) {
    try {
        return fn();
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
        }
        else {
            throw error;
        }
    }
};
var _resolveRequest = function (requestScope) {
    return function (request) {
        request.parentContext.setCurrentRequest(request);
        var bindings = request.bindings;
        var childRequests = request.childRequests;
        var targetIsAnArray = request.target && request.target.isArray();
        var targetParentIsNotAnArray = !request.parentRequest ||
            !request.parentRequest.target ||
            !request.target ||
            !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
        if (targetIsAnArray && targetParentIsNotAnArray) {
            return childRequests.map(function (childRequest) {
                var _f = _resolveRequest(requestScope);
                return _f(childRequest);
            });
        }
        else {
            var result = null;
            if (request.target.isOptional() && bindings.length === 0) {
                return undefined;
            }
            var binding_1 = bindings[0];
            var isSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Singleton;
            var isRequestSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Request;
            if (isSingleton && binding_1.activated) {
                return binding_1.cache;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                requestScope.has(binding_1.id)) {
                return requestScope.get(binding_1.id);
            }
            if (binding_1.type === literal_types_1.BindingTypeEnum.ConstantValue) {
                result = binding_1.cache;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Function) {
                result = binding_1.cache;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Constructor) {
                result = binding_1.implementationType;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
                result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function () { return binding_1.dynamicValue(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Factory && binding_1.factory !== null) {
                result = invokeFactory("toFactory", binding_1.serviceIdentifier, function () { return binding_1.factory(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Provider && binding_1.provider !== null) {
                result = invokeFactory("toProvider", binding_1.serviceIdentifier, function () { return binding_1.provider(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
                result = instantiation_1.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
            }
            else {
                var serviceIdentifier = serialization_1.getServiceIdentifierAsString(request.serviceIdentifier);
                throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
            }
            if (typeof binding_1.onActivation === "function") {
                result = binding_1.onActivation(request.parentContext, result);
            }
            if (isSingleton) {
                binding_1.cache = result;
                binding_1.activated = true;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                !requestScope.has(binding_1.id)) {
                requestScope.set(binding_1.id, result);
            }
            return result;
        }
    };
};
function resolve(context) {
    var _f = _resolveRequest(context.plan.rootRequest.requestScope);
    return _f(context.plan.rootRequest);
}
exports.resolve = resolve;


/***/ }),

/***/ "../../../node_modules/inversify/lib/syntax/binding_in_syntax.js":
/*!*********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/syntax/binding_in_syntax.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
var binding_when_on_syntax_1 = __webpack_require__(/*! ./binding_when_on_syntax */ "../../../node_modules/inversify/lib/syntax/binding_when_on_syntax.js");
var BindingInSyntax = (function () {
    function BindingInSyntax(binding) {
        this._binding = binding;
    }
    BindingInSyntax.prototype.inRequestScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Request;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inSingletonScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inTransientScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    return BindingInSyntax;
}());
exports.BindingInSyntax = BindingInSyntax;


/***/ }),

/***/ "../../../node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js":
/*!*****************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_in_syntax_1 = __webpack_require__(/*! ./binding_in_syntax */ "../../../node_modules/inversify/lib/syntax/binding_in_syntax.js");
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "../../../node_modules/inversify/lib/syntax/binding_on_syntax.js");
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "../../../node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingInWhenOnSyntax = (function () {
    function BindingInWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
        this._bindingInSyntax = new binding_in_syntax_1.BindingInSyntax(binding);
    }
    BindingInWhenOnSyntax.prototype.inRequestScope = function () {
        return this._bindingInSyntax.inRequestScope();
    };
    BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
        return this._bindingInSyntax.inSingletonScope();
    };
    BindingInWhenOnSyntax.prototype.inTransientScope = function () {
        return this._bindingInSyntax.inTransientScope();
    };
    BindingInWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingInWhenOnSyntax;
}());
exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;


/***/ }),

/***/ "../../../node_modules/inversify/lib/syntax/binding_on_syntax.js":
/*!*********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/syntax/binding_on_syntax.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "../../../node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingOnSyntax = (function () {
    function BindingOnSyntax(binding) {
        this._binding = binding;
    }
    BindingOnSyntax.prototype.onActivation = function (handler) {
        this._binding.onActivation = handler;
        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
    };
    return BindingOnSyntax;
}());
exports.BindingOnSyntax = BindingOnSyntax;


/***/ }),

/***/ "../../../node_modules/inversify/lib/syntax/binding_to_syntax.js":
/*!*********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/syntax/binding_to_syntax.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "../../../node_modules/inversify/lib/constants/literal_types.js");
var binding_in_when_on_syntax_1 = __webpack_require__(/*! ./binding_in_when_on_syntax */ "../../../node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js");
var binding_when_on_syntax_1 = __webpack_require__(/*! ./binding_when_on_syntax */ "../../../node_modules/inversify/lib/syntax/binding_when_on_syntax.js");
var BindingToSyntax = (function () {
    function BindingToSyntax(binding) {
        this._binding = binding;
    }
    BindingToSyntax.prototype.to = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Instance;
        this._binding.implementationType = constructor;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toSelf = function () {
        if (typeof this._binding.serviceIdentifier !== "function") {
            throw new Error("" + ERROR_MSGS.INVALID_TO_SELF_VALUE);
        }
        var self = this._binding.serviceIdentifier;
        return this.to(self);
    };
    BindingToSyntax.prototype.toConstantValue = function (value) {
        this._binding.type = literal_types_1.BindingTypeEnum.ConstantValue;
        this._binding.cache = value;
        this._binding.dynamicValue = null;
        this._binding.implementationType = null;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toDynamicValue = function (func) {
        this._binding.type = literal_types_1.BindingTypeEnum.DynamicValue;
        this._binding.cache = null;
        this._binding.dynamicValue = func;
        this._binding.implementationType = null;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toConstructor = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Constructor;
        this._binding.implementationType = constructor;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFactory = function (factory) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = factory;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFunction = function (func) {
        if (typeof func !== "function") {
            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
        }
        var bindingWhenOnSyntax = this.toConstantValue(func);
        this._binding.type = literal_types_1.BindingTypeEnum.Function;
        return bindingWhenOnSyntax;
    };
    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = function (context) {
            var autofactory = function () { return context.container.get(serviceIdentifier); };
            return autofactory;
        };
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toProvider = function (provider) {
        this._binding.type = literal_types_1.BindingTypeEnum.Provider;
        this._binding.provider = provider;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toService = function (service) {
        this.toDynamicValue(function (context) { return context.container.get(service); });
    };
    return BindingToSyntax;
}());
exports.BindingToSyntax = BindingToSyntax;


/***/ }),

/***/ "../../../node_modules/inversify/lib/syntax/binding_when_on_syntax.js":
/*!**************************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/syntax/binding_when_on_syntax.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "../../../node_modules/inversify/lib/syntax/binding_on_syntax.js");
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "../../../node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingWhenOnSyntax = (function () {
    function BindingWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    BindingWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingWhenOnSyntax;
}());
exports.BindingWhenOnSyntax = BindingWhenOnSyntax;


/***/ }),

/***/ "../../../node_modules/inversify/lib/syntax/binding_when_syntax.js":
/*!***********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/syntax/binding_when_syntax.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "../../../node_modules/inversify/lib/syntax/binding_on_syntax.js");
var constraint_helpers_1 = __webpack_require__(/*! ./constraint_helpers */ "../../../node_modules/inversify/lib/syntax/constraint_helpers.js");
var BindingWhenSyntax = (function () {
    function BindingWhenSyntax(binding) {
        this._binding = binding;
    }
    BindingWhenSyntax.prototype.when = function (constraint) {
        this._binding.constraint = constraint;
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
        this._binding.constraint = constraint_helpers_1.namedConstraint(name);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
        this._binding.constraint = function (request) {
            var targetIsDefault = (request.target !== null) &&
                (!request.target.isNamed()) &&
                (!request.target.isTagged());
            return targetIsDefault;
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
        this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    return BindingWhenSyntax;
}());
exports.BindingWhenSyntax = BindingWhenSyntax;


/***/ }),

/***/ "../../../node_modules/inversify/lib/syntax/constraint_helpers.js":
/*!**********************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/syntax/constraint_helpers.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "../../../node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "../../../node_modules/inversify/lib/planning/metadata.js");
var traverseAncerstors = function (request, constraint) {
    var parent = request.parentRequest;
    if (parent !== null) {
        return constraint(parent) ? true : traverseAncerstors(parent, constraint);
    }
    else {
        return false;
    }
};
exports.traverseAncerstors = traverseAncerstors;
var taggedConstraint = function (key) { return function (value) {
    var constraint = function (request) {
        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
    };
    constraint.metaData = new metadata_1.Metadata(key, value);
    return constraint;
}; };
exports.taggedConstraint = taggedConstraint;
var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
exports.namedConstraint = namedConstraint;
var typeConstraint = function (type) { return function (request) {
    var binding = null;
    if (request !== null) {
        binding = request.bindings[0];
        if (typeof type === "string") {
            var serviceIdentifier = binding.serviceIdentifier;
            return serviceIdentifier === type;
        }
        else {
            var constructor = request.bindings[0].implementationType;
            return type === constructor;
        }
    }
    return false;
}; };
exports.typeConstraint = typeConstraint;


/***/ }),

/***/ "../../../node_modules/inversify/lib/utils/binding_utils.js":
/*!****************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/utils/binding_utils.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.multiBindToService = function (container) {
    return function (service) {
        return function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            return types.forEach(function (t) { return container.bind(t).toService(service); });
        };
    };
};


/***/ }),

/***/ "../../../node_modules/inversify/lib/utils/exceptions.js":
/*!*************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/utils/exceptions.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
function isStackOverflowExeption(error) {
    return (error instanceof RangeError ||
        error.message === ERROR_MSGS.STACK_OVERFLOW);
}
exports.isStackOverflowExeption = isStackOverflowExeption;


/***/ }),

/***/ "../../../node_modules/inversify/lib/utils/id.js":
/*!*****************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/utils/id.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var idCounter = 0;
function id() {
    return idCounter++;
}
exports.id = id;


/***/ }),

/***/ "../../../node_modules/inversify/lib/utils/serialization.js":
/*!****************************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/inversify/lib/utils/serialization.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "../../../node_modules/inversify/lib/constants/error_msgs.js");
function getServiceIdentifierAsString(serviceIdentifier) {
    if (typeof serviceIdentifier === "function") {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier.name;
    }
    else if (typeof serviceIdentifier === "symbol") {
        return serviceIdentifier.toString();
    }
    else {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier;
    }
}
exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
    var registeredBindingsList = "";
    var registeredBindings = getBindings(container, serviceIdentifier);
    if (registeredBindings.length !== 0) {
        registeredBindingsList = "\nRegistered bindings:";
        registeredBindings.forEach(function (binding) {
            var name = "Object";
            if (binding.implementationType !== null) {
                name = getFunctionName(binding.implementationType);
            }
            registeredBindingsList = registeredBindingsList + "\n " + name;
            if (binding.constraint.metaData) {
                registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
            }
        });
    }
    return registeredBindingsList;
}
exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
function alreadyDependencyChain(request, serviceIdentifier) {
    if (request.parentRequest === null) {
        return false;
    }
    else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
        return true;
    }
    else {
        return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
    }
}
function dependencyChainToString(request) {
    function _createStringArr(req, result) {
        if (result === void 0) { result = []; }
        var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
        result.push(serviceIdentifier);
        if (req.parentRequest !== null) {
            return _createStringArr(req.parentRequest, result);
        }
        return result;
    }
    var stringArr = _createStringArr(request);
    return stringArr.reverse().join(" --> ");
}
function circularDependencyToException(request) {
    request.childRequests.forEach(function (childRequest) {
        if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
            var services = dependencyChainToString(childRequest);
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
        }
        else {
            circularDependencyToException(childRequest);
        }
    });
}
exports.circularDependencyToException = circularDependencyToException;
function listMetadataForTarget(serviceIdentifierString, target) {
    if (target.isTagged() || target.isNamed()) {
        var m_1 = "";
        var namedTag = target.getNamedTag();
        var otherTags = target.getCustomTags();
        if (namedTag !== null) {
            m_1 += namedTag.toString() + "\n";
        }
        if (otherTags !== null) {
            otherTags.forEach(function (tag) {
                m_1 += tag.toString() + "\n";
            });
        }
        return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
    }
    else {
        return " " + serviceIdentifierString;
    }
}
exports.listMetadataForTarget = listMetadataForTarget;
function getFunctionName(v) {
    if (v.name) {
        return v.name;
    }
    else {
        var name_1 = v.toString();
        var match = name_1.match(/^function\s*([^\s(]+)/);
        return match ? match[1] : "Anonymous function: " + name_1;
    }
}
exports.getFunctionName = getFunctionName;


/***/ }),

/***/ "../../../node_modules/object-hash/dist/object_hash.js":
/*!***********************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/object-hash/dist/object_hash.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function(e){if(true)module.exports=e();else { var t; }}(function(){return function e(t,n,r){function o(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return require(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(r,o,i,u,a,f,s,c,l){"use strict";function d(e,t){return t=h(e,t),g(e,t)}function h(e,t){if(t=t||{},t.algorithm=t.algorithm||"sha1",t.encoding=t.encoding||"hex",t.excludeValues=!!t.excludeValues,t.algorithm=t.algorithm.toLowerCase(),t.encoding=t.encoding.toLowerCase(),t.ignoreUnknown=t.ignoreUnknown===!0,t.respectType=t.respectType!==!1,t.respectFunctionNames=t.respectFunctionNames!==!1,t.respectFunctionProperties=t.respectFunctionProperties!==!1,t.unorderedArrays=t.unorderedArrays===!0,t.unorderedSets=t.unorderedSets!==!1,t.unorderedObjects=t.unorderedObjects!==!1,t.replacer=t.replacer||void 0,t.excludeKeys=t.excludeKeys||void 0,"undefined"==typeof e)throw new Error("Object argument required.");for(var n=0;n<v.length;++n)v[n].toLowerCase()===t.algorithm.toLowerCase()&&(t.algorithm=v[n]);if(v.indexOf(t.algorithm)===-1)throw new Error('Algorithm "'+t.algorithm+'"  not supported. supported values: '+v.join(", "));if(m.indexOf(t.encoding)===-1&&"passthrough"!==t.algorithm)throw new Error('Encoding "'+t.encoding+'"  not supported. supported values: '+m.join(", "));return t}function p(e){if("function"!=typeof e)return!1;var t=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;return null!=t.exec(Function.prototype.toString.call(e))}function g(e,t){var n;n="passthrough"!==t.algorithm?b.createHash(t.algorithm):new w,"undefined"==typeof n.write&&(n.write=n.update,n.end=n.update);var r=y(t,n);if(r.dispatch(e),n.update||n.end(""),n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var o=n.read();return"buffer"===t.encoding?o:o.toString(t.encoding)}function y(e,t,n){n=n||[];var r=function(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")};return{dispatch:function(t){e.replacer&&(t=e.replacer(t));var n=typeof t;return null===t&&(n="null"),this["_"+n](t)},_object:function(t){var o=/\[object (.*)\]/i,u=Object.prototype.toString.call(t),a=o.exec(u);a=a?a[1]:"unknown:["+u+"]",a=a.toLowerCase();var f=null;if((f=n.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(n.push(t),"undefined"!=typeof i&&i.isBuffer&&i.isBuffer(t))return r("buffer:"),r(t);if("object"===a||"function"===a){var s=Object.keys(t);e.unorderedObjects&&(s=s.sort()),e.respectType===!1||p(t)||s.splice(0,0,"prototype","__proto__","constructor"),e.excludeKeys&&(s=s.filter(function(t){return!e.excludeKeys(t)})),r("object:"+s.length+":");var c=this;return s.forEach(function(n){c.dispatch(n),r(":"),e.excludeValues||c.dispatch(t[n]),r(",")})}if(!this["_"+a]){if(e.ignoreUnknown)return r("["+a+"]");throw new Error('Unknown object type "'+a+'"')}this["_"+a](t)},_array:function(t,o){o="undefined"!=typeof o?o:e.unorderedArrays!==!1;var i=this;if(r("array:"+t.length+":"),!o||t.length<=1)return t.forEach(function(e){return i.dispatch(e)});var u=[],a=t.map(function(t){var r=new w,o=n.slice(),i=y(e,r,o);return i.dispatch(t),u=u.concat(o.slice(n.length)),r.read().toString()});return n=n.concat(u),a.sort(),this._array(a,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e.toString())},_function:function(t){r("fn:"),p(t)?this.dispatch("[native]"):this.dispatch(t.toString()),e.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString(),"utf8")},_map:function(t){r("map:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_set:function(t){r("set:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function w(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}var b=e("crypto");n=t.exports=d,n.sha1=function(e){return d(e)},n.keys=function(e){return d(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return d(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return d(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var v=b.getHashes?b.getHashes().slice():["sha1","md5"];v.push("passthrough");var m=["buffer","hex","binary","base64"];n.writeToStream=function(e,t,n){return"undefined"==typeof n&&(n=t,t={}),t=h(e,t),y(t,n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_e8180ef5.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===l?62:t===u||t===d?63:t<a?-1:t<a+10?t-a+26+26:t<s+26?t-s:t<f+26?t-f+26:void 0}function n(e){function n(e){s[l++]=e}var r,i,u,a,f,s;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var c=e.length;f="="===e.charAt(c-2)?2:"="===e.charAt(c-1)?1:0,s=new o(3*e.length/4-f),u=f>0?e.length-4:e.length;var l=0;for(r=0,i=0;r<u;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===f?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===f&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),s}function r(e){function t(e){return c.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,u=e.length%3,a="";for(r=0,i=e.length-u;r<i;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],a+=n(o);switch(u){case 1:o=e[e.length-1],a+=t(o>>2),a+=t(o<<4&63),a+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],a+=t(o>>10),a+=t(o>>4&63),a+=t(o<<2&63),a+="="}return a}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),u="/".charCodeAt(0),a="0".charCodeAt(0),f="a".charCodeAt(0),s="A".charCodeAt(0),l="-".charCodeAt(0),d="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=N(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=F(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=F(e.length)}var u;o._useTypedArrays?u=o._augment(new Uint8Array(i)):(u=this,u.length=i,u._isBuffer=!0);var a;if(o._useTypedArrays&&"number"==typeof e.byteLength)u._set(e);else if(O(e))for(a=0;a<i;a++)o.isBuffer(e)?u[a]=e.readUInt8(a):u[a]=e[a];else if("string"===r)u.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;a<i;a++)u[a]=0;return u}function l(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var u=t.length;$(u%2===0,"Invalid hex string"),r>u/2&&(r=u/2);for(var a=0;a<r;a++){var f=parseInt(t.substr(2*a,2),16);$(!isNaN(f),"Invalid hex string"),e[n+a]=f}return o._charsWritten=2*a,a}function d(e,t,n,r){var i=o._charsWritten=W(V(t),e,n,r);return i}function h(e,t,n,r){var i=o._charsWritten=W(q(t),e,n,r);return i}function p(e,t,n,r){return h(e,t,n,r)}function g(e,t,n,r){var i=o._charsWritten=W(R(t),e,n,r);return i}function y(e,t,n,r){var i=o._charsWritten=W(P(t),e,n,r);return i}function w(e,t,n){return 0===t&&n===e.length?G.fromByteArray(e):G.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=J(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+J(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function m(e,t,n){return v(e,t,n)}function _(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;i++)o+=H(e[i]);return o}function E(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],t+1<o&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<o&&(i|=e[t+1])),i}}function A(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(t+2<o&&(i=e[t+2]<<16),t+1<o&&(i|=e[t+1]<<8),i|=e[t],t+3<o&&(i+=e[t+3]<<24>>>0)):(t+1<o&&(i=e[t+1]<<16),t+2<o&&(i|=e[t+2]<<8),t+3<o&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function B(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=I(e,t,n,!0),u=32768&i;return u?(65535-i+1)*-1:i}}function L(e,t,n,r){r||($("boolean"==typeof n,"missing or invalid endian"),$(void 0!==t&&null!==t,"missing offset"),$(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=A(e,t,n,!0),u=2147483648&i;return u?(4294967295-i+1)*-1:i}}function U(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+3<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,23,4)}function x(e,t,n,r){return r||($("boolean"==typeof n,"missing or invalid endian"),$(t+7<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,52,8)}function S(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"trying to write beyond buffer length"),K(t,65535));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function j(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"trying to write beyond buffer length"),K(t,4294967295));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function C(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+1<e.length,"Trying to write beyond buffer length"),z(t,32767,-32768));var i=e.length;n>=i||(t>=0?S(e,t,n,r,o):S(e,65535+t+1,n,r,o))}function k(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),z(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?j(e,t,n,r,o):j(e,4294967295+t+1,n,r,o))}function T(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+3<e.length,"Trying to write beyond buffer length"),X(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Q.write(e,t,n,r,23,4)}function M(e,t,n,r,o){o||($(void 0!==t&&null!==t,"missing value"),$("boolean"==typeof r,"missing or invalid endian"),$(void 0!==n&&null!==n,"missing offset"),$(n+7<e.length,"Trying to write beyond buffer length"),X(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Q.write(e,t,n,r,52,8)}function N(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Y(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function F(e){return e=~~Math.ceil(+e),e<0?0:e}function D(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function O(e){return D(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function V(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function q(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function P(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function R(e){return G.toByteArray(e)}function W(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function J(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function K(e,t){$("number"==typeof e,"cannot write a non-number as a number"),$(e>=0,"specified a negative value for writing an unsigned value"),$(e<=t,"value is larger than maximum value for type"),$(Math.floor(e)===e,"value has a fractional component")}function z(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value"),$(Math.floor(e)===e,"value has a fractional component")}function X(e,t,n){$("number"==typeof e,"cannot write a non-number as a number"),$(e<=t,"value larger than maximum allowed value"),$(e>=n,"value smaller than minimum allowed value")}function $(e,t){if(!e)throw new Error(t||"Failed assertion")}var G=e("base64-js"),Q=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=V(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=R(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if($(D(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var u=e[n];u.copy(r,i),i+=u.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var u;switch(r){case"hex":u=l(this,e,t,n);break;case"utf8":case"utf-8":u=d(this,e,t,n);break;case"ascii":u=h(this,e,t,n);break;case"binary":u=p(this,e,t,n);break;case"base64":u=g(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":u=y(this,e,t,n);break;default:throw new Error("Unknown encoding")}return u},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=_(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=m(r,t,n);break;case"base64":o=w(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=E(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){$(r>=n,"sourceEnd < sourceStart"),$(t>=0&&t<e.length,"targetStart out of bounds"),$(n>=0&&n<i.length,"sourceStart out of bounds"),$(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var u=r-n;if(u<100||!o._useTypedArrays)for(var a=0;a<u;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+u),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=Y(e,n,0),t=Y(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,(void 0),(!0)),u=0;u<r;u++)i[u]=this[u+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return I(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return I(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return A(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||($(void 0!==e&&null!==e,"missing offset"),$(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?(255-this[e]+1)*-1:this[e]}},o.prototype.readInt16LE=function(e,t){return B(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return B(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return L(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return U(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return U(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return x(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return x(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"trying to write beyond buffer length"),K(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){j(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){j(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||($(void 0!==e&&null!==e,"missing value"),$(void 0!==t&&null!==t,"missing offset"),$(t<this.length,"Trying to write beyond buffer length"),z(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){T(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){T(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){M(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){M(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),$("number"==typeof e&&!isNaN(e),"value is not a number"),$(n>=t,"end < start"),n!==t&&0!==this.length){$(t>=0&&t<this.length,"start out of bounds"),$(n>=0&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=H(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var Z=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=Z.get,e.set=Z.set,e.write=Z.write,e.toString=Z.toString,e.toLocaleString=Z.toString,e.toJSON=Z.toJSON,e.copy=Z.copy,e.slice=Z.slice,e.readUInt8=Z.readUInt8,e.readUInt16LE=Z.readUInt16LE,e.readUInt16BE=Z.readUInt16BE,e.readUInt32LE=Z.readUInt32LE,e.readUInt32BE=Z.readUInt32BE,e.readInt8=Z.readInt8,e.readInt16LE=Z.readInt16LE,e.readInt16BE=Z.readInt16BE,e.readInt32LE=Z.readInt32LE,e.readInt32BE=Z.readInt32BE,e.readFloatLE=Z.readFloatLE,e.readFloatBE=Z.readFloatBE,e.readDoubleLE=Z.readDoubleLE,e.readDoubleBE=Z.readDoubleBE,e.writeUInt8=Z.writeUInt8,e.writeUInt16LE=Z.writeUInt16LE,e.writeUInt16BE=Z.writeUInt16BE,e.writeUInt32LE=Z.writeUInt32LE,e.writeUInt32BE=Z.writeUInt32BE,e.writeInt8=Z.writeInt8,e.writeInt16LE=Z.writeInt16LE,e.writeInt16BE=Z.writeInt16BE,e.writeInt32LE=Z.writeInt32LE,e.writeInt32BE=Z.writeInt32BE,e.writeFloatLE=Z.writeFloatLE,e.writeFloatBE=Z.writeFloatBE,e.writeDoubleLE=Z.writeDoubleLE,e.writeDoubleBE=Z.writeDoubleBE,e.fill=Z.fill,e.inspect=Z.inspect,e.toArrayBuffer=Z.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){if(e.length%p!==0){var n=e.length+(p-e.length%p);e=o.concat([e,g],n)}for(var r=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=p)r.push(i.call(e,u));return r}function d(e,t,n){for(var r=new o(t),i=n?r.writeInt32BE:r.writeInt32LE,u=0;u<e.length;u++)i.call(r,e[u],4*u,!0);return r}function h(e,t,n,r){o.isBuffer(e)||(e=new o(e));var i=t(l(e,r),e.length*y);return d(i,n,r)}var o=e("buffer").Buffer,p=4,g=new o(p);g.fill(0);var y=8;t.exports={hash:h}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function l(e,t,n){o.isBuffer(t)||(t=new o(t)),o.isBuffer(n)||(n=new o(n)),t.length>m?t=e(t):t.length<m&&(t=o.concat([t,_],m));for(var r=new o(m),i=new o(m),u=0;u<m;u++)r[u]=54^t[u],i[u]=92^t[u];var a=e(o.concat([r,n]));return e(o.concat([i,a]))}function d(e,t){e=e||"sha1";var n=v[e],r=[],i=0;return n||h("algorithm:",e,"is not yet supported"),{update:function(e){return o.isBuffer(e)||(e=new o(e)),r.push(e),i+=e.length,this},digest:function(e){var i=o.concat(r),u=t?l(n,t,i):n(i);return r=null,e?u.toString(e):u}}}function h(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function p(e,t){for(var n in e)t(e[n],n)}var o=e("buffer").Buffer,g=e("./sha"),y=e("./sha256"),w=e("./rng"),b=e("./md5"),v={sha1:g,sha256:y,md5:b},m=64,_=new o(m);_.fill(0),n.createHash=function(e){return d(e)},n.createHmac=function(e,t){return d(e,t)},n.randomBytes=function(e,t){if(!t||!t.call)return new o(w(e));try{t.call(this,void 0,new o(w(e)))}catch(n){t(n)}},p(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){n[e]=function(){h("sorry,",e,"is not implemented yet")}})}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,f=r,s=o,c=i;n=h(n,r,o,i,e[u+0],7,-680876936),i=h(i,n,r,o,e[u+1],12,-389564586),o=h(o,i,n,r,e[u+2],17,606105819),r=h(r,o,i,n,e[u+3],22,-1044525330),n=h(n,r,o,i,e[u+4],7,-176418897),i=h(i,n,r,o,e[u+5],12,1200080426),o=h(o,i,n,r,e[u+6],17,-1473231341),r=h(r,o,i,n,e[u+7],22,-45705983),n=h(n,r,o,i,e[u+8],7,1770035416),i=h(i,n,r,o,e[u+9],12,-1958414417),o=h(o,i,n,r,e[u+10],17,-42063),r=h(r,o,i,n,e[u+11],22,-1990404162),n=h(n,r,o,i,e[u+12],7,1804603682),i=h(i,n,r,o,e[u+13],12,-40341101),o=h(o,i,n,r,e[u+14],17,-1502002290),r=h(r,o,i,n,e[u+15],22,1236535329),n=p(n,r,o,i,e[u+1],5,-165796510),i=p(i,n,r,o,e[u+6],9,-1069501632),o=p(o,i,n,r,e[u+11],14,643717713),r=p(r,o,i,n,e[u+0],20,-373897302),n=p(n,r,o,i,e[u+5],5,-701558691),i=p(i,n,r,o,e[u+10],9,38016083),o=p(o,i,n,r,e[u+15],14,-660478335),r=p(r,o,i,n,e[u+4],20,-405537848),n=p(n,r,o,i,e[u+9],5,568446438),i=p(i,n,r,o,e[u+14],9,-1019803690),o=p(o,i,n,r,e[u+3],14,-187363961),r=p(r,o,i,n,e[u+8],20,1163531501),n=p(n,r,o,i,e[u+13],5,-1444681467),i=p(i,n,r,o,e[u+2],9,-51403784),o=p(o,i,n,r,e[u+7],14,1735328473),r=p(r,o,i,n,e[u+12],20,-1926607734),n=g(n,r,o,i,e[u+5],4,-378558),i=g(i,n,r,o,e[u+8],11,-2022574463),o=g(o,i,n,r,e[u+11],16,1839030562),r=g(r,o,i,n,e[u+14],23,-35309556),n=g(n,r,o,i,e[u+1],4,-1530992060),i=g(i,n,r,o,e[u+4],11,1272893353),o=g(o,i,n,r,e[u+7],16,-155497632),r=g(r,o,i,n,e[u+10],23,-1094730640),n=g(n,r,o,i,e[u+13],4,681279174),i=g(i,n,r,o,e[u+0],11,-358537222),o=g(o,i,n,r,e[u+3],16,-722521979),r=g(r,o,i,n,e[u+6],23,76029189),n=g(n,r,o,i,e[u+9],4,-640364487),i=g(i,n,r,o,e[u+12],11,-421815835),o=g(o,i,n,r,e[u+15],16,530742520),r=g(r,o,i,n,e[u+2],23,-995338651),n=y(n,r,o,i,e[u+0],6,-198630844),i=y(i,n,r,o,e[u+7],10,1126891415),o=y(o,i,n,r,e[u+14],15,-1416354905),r=y(r,o,i,n,e[u+5],21,-57434055),n=y(n,r,o,i,e[u+12],6,1700485571),i=y(i,n,r,o,e[u+3],10,-1894986606),o=y(o,i,n,r,e[u+10],15,-1051523),r=y(r,o,i,n,e[u+1],21,-2054922799),n=y(n,r,o,i,e[u+8],6,1873313359),i=y(i,n,r,o,e[u+15],10,-30611744),o=y(o,i,n,r,e[u+6],15,-1560198380),r=y(r,o,i,n,e[u+13],21,1309151649),n=y(n,r,o,i,e[u+4],6,-145523070),i=y(i,n,r,o,e[u+11],10,-1120210379),o=y(o,i,n,r,e[u+2],15,718787259),r=y(r,o,i,n,e[u+9],21,-343485551),n=w(n,a),r=w(r,f),o=w(o,s),i=w(i,c)}return Array(n,r,o,i)}function d(e,t,n,r,o,i){return w(b(w(w(t,e),w(r,i)),o),n)}function h(e,t,n,r,o,i,u){return d(t&n|~t&r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return d(t&r|n&~r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return d(t^n^r,e,t,o,i,u)}function y(e,t,n,r,o,i,u){return d(n^(t|~r),e,t,o,i,u)}function w(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function b(e,t){return e<<t|e>>>32-t}var v=e("./helpers");t.exports=function(e){return v.hash(e,l,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){!function(){var e,n,r=this;e=function(e){for(var t,t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},r.crypto&&crypto.getRandomValues&&(n=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),t.exports=n||e}()}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var n=Array(80),r=1732584193,o=-271733879,i=-1732584194,u=271733878,a=-1009589776,f=0;f<e.length;f+=16){for(var s=r,c=o,l=i,y=u,w=a,b=0;b<80;b++){b<16?n[b]=e[f+b]:n[b]=g(n[b-3]^n[b-8]^n[b-14]^n[b-16],1);var v=p(p(g(r,5),d(b,o,i,u)),p(p(a,n[b]),h(b)));a=u,u=i,i=g(o,30),o=r,r=v}r=p(r,s),o=p(o,c),i=p(i,l),u=p(u,y),a=p(a,w)}return Array(r,o,i,u,a)}function d(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function h(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function p(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function g(e,t){return e<<t|e>>>32-t}var y=e("./helpers");t.exports=function(e){return y.hash(e,l,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){var l=e("./helpers"),d=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n},h=function(e,t){return e>>>t|e<<32-t},p=function(e,t){return e>>>t},g=function(e,t,n){return e&t^~e&n},y=function(e,t,n){return e&t^e&n^t&n},w=function(e){return h(e,2)^h(e,13)^h(e,22);
},b=function(e){return h(e,6)^h(e,11)^h(e,25)},v=function(e){return h(e,7)^h(e,18)^p(e,3)},m=function(e){return h(e,17)^h(e,19)^p(e,10)},_=function(e,t){var n,r,o,i,u,a,f,s,c,l,h,p,_=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),E=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),I=new Array(64);e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var c=0;c<e.length;c+=16){n=E[0],r=E[1],o=E[2],i=E[3],u=E[4],a=E[5],f=E[6],s=E[7];for(var l=0;l<64;l++)l<16?I[l]=e[l+c]:I[l]=d(d(d(m(I[l-2]),I[l-7]),v(I[l-15])),I[l-16]),h=d(d(d(d(s,b(u)),g(u,a,f)),_[l]),I[l]),p=d(w(n),y(n,r,o)),s=f,f=a,a=u,u=d(i,h),i=o,o=r,r=n,n=d(h,p);E[0]=d(n,E[0]),E[1]=d(r,E[1]),E[2]=d(o,E[2]),E[3]=d(i,E[3]),E[4]=d(u,E[4]),E[5]=d(a,E[5]),E[6]=d(f,E[6]),E[7]=d(s,E[7])}return E};t.exports=function(e){return l.hash(e,_,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){function c(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=c,e.addListener=c,e.once=c,e.off=c,e.removeListener=c,e.removeAllListeners=c,e.emit=c,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){n.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,f=(1<<a)-1,s=f>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;c>0;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;c>0;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-s;else{if(i===f)return u?NaN:(h?-1:1)*(1/0);u+=Math.pow(2,r),i-=s}return(h?-1:1)*u*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var u,a,f,s=8*i-o-1,c=(1<<s)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-u))<1&&(u--,f*=2),t+=u+l>=1?d/f:d*Math.pow(2,1-l),t*f>=2&&(u++,f/=2),u+l>=c?(a=0,u=c):u+l>=1?(a=(t*f-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,s+=o;s>0;e[n+h]=255&u,h+=p,u/=256,s-=8);e[n+h-p]|=128*g}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});

/***/ }),

/***/ "../../../node_modules/process/browser.js":
/*!**********************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/process/browser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../../node_modules/reflect-metadata/Reflect.js":
/*!*******************************************************************************************!*\
  !*** /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/node_modules/reflect-metadata/Reflect.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof window === "object" ? window :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && Object({"NODE_ENV":undefined}) && Object({"NODE_ENV":undefined})["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "../../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../../node_modules/webpack-plugin-serve/client.js":
/*!****************************************!*\
  !*** (webpack)-plugin-serve/client.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

/**
 * @note This file exists merely as an easy reference for folks adding it to their configuration entries
 */

(() => {
  if (window.webpackPluginServe) {
    return;
  }

  window.webpackPluginServe = true;

  // eslint-disable-next-line global-require
  __webpack_require__(/*! ./lib/client */ "../../../node_modules/webpack-plugin-serve/lib/client.js");
})();


/***/ }),

/***/ "../../../node_modules/webpack-plugin-serve/lib/client-hmr.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client-hmr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { error, info, refresh, warn } = __webpack_require__(/*! ./client-log */ "../../../node_modules/webpack-plugin-serve/lib/client-log.js");

const { apply, check, status } = module.hot;
let latest = true;

const hmr = {
  onUnaccepted(data) {
    warn('Change in unaccepted module(s):\n', data);
    warn(data);
  },
  onDeclined(data) {
    warn('Change in declined module(s):\n', data);
  },
  onErrored(data) {
    error('Error in module(s):\n', data);
  }
};

const replace = async (hash) => {
  if (hash) {
    // eslint-disable-next-line no-undef
    latest = hash.includes(__webpack_require__.h());
  }

  if (!latest) {
    const hmrStatus = status();

    if (hmrStatus === 'abort' || hmrStatus === 'fail') {
      warn(`An HMR update was triggered, but ${hmrStatus}ed. ${refresh}`);
      return;
    }

    let modules = await check(false);

    if (!modules) {
      warn(`No modules found for replacement. ${refresh}`);
      return;
    }

    modules = await apply(hmr);

    if (modules) {
      latest = true;
      info(`Build ${hash.slice(0, 7)} replaced:\n`, modules);
    }
  }
};

module.exports = { replace };


/***/ }),

/***/ "../../../node_modules/webpack-plugin-serve/lib/client-log.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client-log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { error, info, warn } = console;
const log = {
  error: error.bind(console, '⬡ wps:'),
  info: info.bind(console, '⬡ wps:'),
  refresh: 'Please refresh the page',
  warn: warn.bind(console, '⬡ wps:')
};

module.exports = log;


/***/ }),

/***/ "../../../node_modules/webpack-plugin-serve/lib/client.js":
/*!********************************************!*\
  !*** (webpack)-plugin-serve/lib/client.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { replace } = __webpack_require__(/*! ./client-hmr */ "../../../node_modules/webpack-plugin-serve/lib/client-hmr.js");
const { error, info, refresh, warn } = __webpack_require__(/*! ./client-log */ "../../../node_modules/webpack-plugin-serve/lib/client-log.js");
const { init: initProgress } = __webpack_require__(/*! ./overlays/progress */ "../../../node_modules/webpack-plugin-serve/lib/overlays/progress.js");
const { init: initMinimalProgress } = __webpack_require__(/*! ./overlays/progress-minimal */ "../../../node_modules/webpack-plugin-serve/lib/overlays/progress-minimal.js");
const { init: initStatus } = __webpack_require__(/*! ./overlays/status */ "../../../node_modules/webpack-plugin-serve/lib/overlays/status.js");

// eslint-disable-next-line no-undef, no-unused-vars
const options = {"client":null,"compress":{},"historyFallback":false,"hmr":true,"host":null,"liveReload":false,"log":{"level":"info","prefix":{"template":"{{level}}"},"name":"webpack-plugin-serve"},"open":false,"port":55555,"progress":true,"secure":false,"static":["/mnt/c/Users/marcus-sa/Git/one-web-ext-cli/example/apps/appwriter"],"status":true,"address":"[::]:55555"};
const { address, client, progress, secure, status } = options;
const protocol = secure ? 'wss' : 'ws';
const socket = new WebSocket(`${protocol}://${(client || {}).address || address}/wps`);

// prevents ECONNRESET errors on the server
window.addEventListener('beforeunload', () => socket.close());

socket.addEventListener('message', (message) => {
  const { action, data } = JSON.parse(message.data);
  const { errors, hash = '<?>', warnings } = data || {};
  const shortHash = hash.slice(0, 7);

  switch (action) {
    case 'connected':
      info('WebSocket connected');
      break;
    case 'errors':
      error(`Build ${shortHash} produced errors:\n`, errors);
      break;
    case 'reload':
      window.location.reload();
      break;
    case 'replace':
      replace(hash);
      break;
    case 'warnings':
      warn(`Build ${shortHash} produced warnings:\n`, warnings);
      break;
    default:
  }
});

socket.onclose = () => warn(`The client WebSocket was closed. ${refresh}`);

if (progress === 'minimal') {
  initMinimalProgress(options, socket);
} else if (progress) {
  initProgress(options, socket);
}

if (status) {
  initStatus(options, socket);
}

if (true) {
  info('Hot Module Replacement is active');

  if (options.liveReload) {
    info('Live Reload taking precedence over Hot Module Replacement');
  }
} else {}

if (false) {}


/***/ }),

/***/ "../../../node_modules/webpack-plugin-serve/lib/overlays/progress-minimal.js":
/*!***************************************************************!*\
  !*** (webpack)-plugin-serve/lib/overlays/progress-minimal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml } = __webpack_require__(/*! ./util */ "../../../node_modules/webpack-plugin-serve/lib/overlays/util.js");

const ns = 'wps-progress-minimal';
const html = `
<div id="${ns}" class="${ns}-hidden">
  <div id="${ns}-bar"></div>
</div>
`;
const css = `
#${ns} {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100vw;
}

#${ns}-bar {
  width: 0%;
  height: 4px;
  background-color: rgb(186, 223, 172);
  transition: width 1s ease-in-out;
}

.${ns}-hidden{
  display: none;
}
`;

const update = (percent) => {
  const bar = document.querySelector(`#${ns}-bar`);
  bar.style.width = `${percent}%`;
};

const reset = (wrapper) => {
  wrapper.classList.add(`${ns}-hidden`);
  setTimeout(() => update(0), 1e3);
};

const init = (options, socket) => {
  document.addEventListener('DOMContentLoaded', () => {
    addHtml(html);
    addCss(css);
  });

  socket.addEventListener('message', (message) => {
    const { action, data } = JSON.parse(message.data);

    if (action !== 'progress') {
      return;
    }

    const percent = Math.floor(data.percent * 100);
    const wrapper = document.querySelector(`#${ns}`);

    wrapper.classList.remove(`${ns}-hidden`);

    if (data.percent === 1) {
      setTimeout(() => reset(wrapper), 5e3);
    }

    update(percent);
  });
};

module.exports = {
  init
};


/***/ }),

/***/ "../../../node_modules/webpack-plugin-serve/lib/overlays/progress.js":
/*!*******************************************************!*\
  !*** (webpack)-plugin-serve/lib/overlays/progress.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml } = __webpack_require__(/*! ./util */ "../../../node_modules/webpack-plugin-serve/lib/overlays/util.js");

const ns = 'wps-progress';
const css = `
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

#${ns}{
  width: 200px;
  height: 200px;
  position: absolute;
  right: 5%;
  top: 5%;
  transition: opacity .25s ease-in-out;
  z-index: 1000;
}

#${ns}-bg {
  fill: #282d35;
}

#${ns}-fill {
  fill: rgba(0, 0, 0, 0);
  stroke: rgb(186, 223, 172);
  stroke-dasharray: 219.99078369140625;
  stroke-dashoffset: -219.99078369140625;
  stroke-width: 10;
  transform: rotate(90deg)translate(0px, -80px);
  transition: stroke-dashoffset 1s;
}

#${ns}-percent {
  font-family: 'Open Sans';
  font-size: 18px;
  fill: #ffffff;
}

#${ns}-percent-value {
  alignment-baseline: middle;
  text-anchor: middle;
}

#${ns}-percent-super {
  fill: #bdc3c7;
  font-size: .45em;
  baseline-shift: 10%;
}

.${ns}-noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

@keyframes ${ns}-hidden-display {
	0% {
		opacity: 1;
		transform: scale(1);
		-webkit-transform: scale(1);
	}
	99% {
		display: inline-flex;
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
	100% {
		display: none;
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
}

.${ns}-hidden{
  animation: ${ns}-hidden-display .3s;
  animation-fill-mode:forwards;
  display: inline-flex;
}
`;

const html = `
<svg id="${ns}" class="${ns}-noselect ${ns}-hidden" x="0px" y="0px" viewBox="0 0 80 80">
  <circle id="${ns}-bg" cx="50%" cy="50%" r="35"></circle>
  <path id="${ns}-fill" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
  <text id="${ns}-percent" x="50%" y="51%"><tspan id="${ns}-percent-value">0</tspan><tspan id="${ns}-percent-super">%</tspan></text>
</svg>
`;

const update = (percent) => {
  const max = -219.99078369140625;
  const value = document.querySelector(`#${ns}-percent-value`);
  const track = document.querySelector(`#${ns}-fill`);
  const offset = ((100 - percent) / 100) * max;

  track.setAttribute('style', `stroke-dashoffset: ${offset}`);
  value.innerHTML = percent.toString();
};

const reset = (svg) => {
  svg.classList.add(`${ns}-hidden`);
  setTimeout(() => update(0), 1e3);
};

const init = (options, socket) => {
  document.addEventListener('DOMContentLoaded', () => {
    addCss(css);
    addHtml(html);
  });

  socket.addEventListener('message', (message) => {
    const { action, data } = JSON.parse(message.data);

    if (action !== 'progress') {
      return;
    }

    const percent = Math.floor(data.percent * 100);
    const svg = document.querySelector(`#${ns}`);

    if (!svg) {
      return;
    }

    // we can safely call this even if it doesn't have the class
    svg.classList.remove(`${ns}-hidden`);

    if (data.percent === 1) {
      setTimeout(() => reset(svg), 5e3);
    }

    update(percent);
  });
};

module.exports = { init };


/***/ }),

/***/ "../../../node_modules/webpack-plugin-serve/lib/overlays/status.js":
/*!*****************************************************!*\
  !*** (webpack)-plugin-serve/lib/overlays/status.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml, socketMessage } = __webpack_require__(/*! ./util */ "../../../node_modules/webpack-plugin-serve/lib/overlays/util.js");

const ns = 'wps-status';
const css = `
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

#${ns} {
  background: #282d35;
  border-radius: 0.6em;
  display: flex;
  flex-direction: column;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	font-size: 10px;
  height: 90%;
  margin: 0 auto;
  max-height: 20em;
  min-height: 20em;
  opacity: 1;
  overflow: hidden;
  padding-bottom: 3em;
  position: relative;
  transition: opacity .25s ease-in-out;
  width: 95%;
}

@keyframes ${ns}-hidden-display {
	0% {
		opacity: 1;
	}
	99% {
		display: inline-flex;
		opacity: 0;
	}
	100% {
		display: none;
		opacity: 0;
	}
}

#${ns}.${ns}-hidden {
  animation: ${ns}-hidden-display .3s;
  animation-fill-mode:forwards;
  display: none;
}

#${ns}.${ns}-min {
  animation: minimize 10s;
  bottom: 2em;
  cursor: pointer;
  height: 6em;
  min-height: 6em;
  padding-bottom: 0;
  position: absolute;
  right: 2em;
  width: 6em;
}

#${ns}.${ns}-min #${ns}-beacon {
  display: block;
}

#${ns}-title {
  color: #fff;
  font-size: 1.2em;
  font-weight: normal;
  margin: 0;
  padding: 0.6em 0;
  text-align: center;
  width: 100%;
}

#${ns}.${ns}-min #${ns}-title {
  display: none;
}

#${ns}-title-errors {
  color: #ff5f58;
  font-style: normal;
  padding-left: 1em;
}

#${ns}-title-warnings {
  color: #ffbd2e;
  font-style: normal;
  padding-left: 1em;
}

#${ns}-problems {
  overflow-y: auto;
  padding: 1em 2em;
}

#${ns}-problems pre {
  color: #ddd;
  display: block;
  font-size: 1.3em;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  white-space: pre-wrap;
}

#${ns}-problems pre em {
  background: #ff5f58;
  border-radius: 0.3em;
  color: #641e16;
  font-style: normal;
  line-height: 3em;
  margin-right: 0.4em;
  padding: 0.1em 0.4em;
  text-transform: uppercase;
}

pre#${ns}-warnings em {
  background: #ffbd2e;
  color: #3e2723;
}

pre#${ns}-success {
  display: none;
  text-align: center;
}

pre#${ns}-success em {
  background: #7fb900;
  color: #004d40;
}

#${ns}-problems.${ns}-success #${ns}-success {
  display: block;
}

#${ns}.${ns}-min #${ns}-problems {
  display: none;
}

#${ns}-nav {
  opacity: 0.5;
  padding: 1.2em;
  position: absolute;
}

#${ns}.${ns}-min #${ns}-nav {
  display: none;
}

#${ns}-nav:hover {
  opacity: 1;
}

#${ns}-nav div {
  background: #ff5f58;
  border-radius: 1.2em;
  cursor: pointer;
  display: inline-block;
  height: 1.2em;
  position: relative;
  width: 1.2em;
}

div#${ns}-min {
  background: #ffbd2e;
  margin-left: 0.8em;
}

#${ns}-beacon {
  border-radius: 3em;
  display: none;
  font-size: 10px;
  height: 3em;
  margin: 1.6em auto;
  position: relative;
  width: 3em;
}

#${ns}-beacon:before, #${ns}-beacon:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(127,185,0, 0.2);
  border-radius: 3em;
  opacity: 0;
}

#${ns}-beacon:before {
  animation: ${ns}-pulse 3s infinite linear;
  transform: scale(1);
}

#${ns}-beacon:after {
  animation: ${ns}-pulse 3s 2s infinite linear;
}


@keyframes ${ns}-pulse {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  33% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

#${ns}-beacon mark {
  background: rgba(127, 185, 0, 1);
  border-radius: 100% 100%;
  height: 1em;
  left: 1em;
  position: absolute;
  top: 1em;
  width: 1em;
}

#${ns}-beacon.${ns}-error mark {
  background: #ff5f58;
}

#${ns}-beacon.${ns}-error:before, #${ns}-beacon.error:after {
  background: rgba(255, 95, 88, 0.2);
}

#${ns}-beacon.${ns}-warning mark {
  background: #ffbd2e;
}

#${ns}-beacon.${ns}-warning:before, #${ns}-beacon.warning:after {
  background: rgba(255, 189, 46, 0.2);
}
`;

const html = `
<aside id="${ns}" class="${ns}-hidden" title="build status">
  <figure id="${ns}-beacon">
    <mark/>
  </figure>
  <nav id="${ns}-nav">
    <div id="${ns}-close" title="close"></div>
    <div id="${ns}-min" title="minmize"></div>
  </nav>
  <h1 id="${ns}-title">
    build status
    <em id="${ns}-title-errors"></em>
    <em id="${ns}-title-warnings"></em>
  </h1>
  <article id="${ns}-problems">
    <pre id="${ns}-success"><em>Build Successful</em></pre>
    <pre id="${ns}-errors"></pre>
    <pre id="${ns}-warnings"></pre>
  </article>
</aside>
`;

const init = (options, socket) => {
  const hidden = `${ns}-hidden`;
  let aside;
  let beacon;
  let problems;
  let preErrors;
  let preWarnings;
  let titleErrors;
  let titleWarnings;

  const reset = () => {
    preErrors.innerHTML = '';
    preWarnings.innerHTML = '';
    problems.classList.remove(`${ns}-success`);
    beacon.className = '';
  };

  const addErrors = (errors) => {
    if (errors.length) {
      beacon.classList.add(`${ns}-error`);

      for (const error of errors) {
        const markup = `<em>Error</em> in ${error}`;
        addHtml(markup, preErrors);
      }

      titleErrors.innerText = `${errors.length} Error(s)`;
    } else {
      titleErrors.innerText = '';
    }
    aside.classList.remove(hidden);
  };

  const addWarnings = (warnings) => {
    if (warnings.length) {
      if (!beacon.classList.contains(`${ns}-error`)) {
        beacon.classList.add(`${ns}-warning`);
      }

      for (const warning of warnings) {
        const markup = `<em>Warning</em> in ${warning}`;
        addHtml(markup, preWarnings);
      }

      titleWarnings.innerText = `${warnings.length} Warning(s)`;
    } else {
      titleWarnings.innerText = '';
    }

    aside.classList.remove(hidden);
  };

  document.addEventListener('DOMContentLoaded', () => {
    addCss(css);
    [aside] = addHtml(html);
    beacon = document.querySelector(`#${ns}-beacon`);
    problems = document.querySelector(`#${ns}-problems`);
    preErrors = document.querySelector(`#${ns}-errors`);
    preWarnings = document.querySelector(`#${ns}-warnings`);
    titleErrors = document.querySelector(`#${ns}-title-errors`);
    titleWarnings = document.querySelector(`#${ns}-title-warnings`);

    const close = document.querySelector(`#${ns}-close`);
    const min = document.querySelector(`#${ns}-min`);

    aside.addEventListener('click', () => {
      aside.classList.remove(`${ns}-min`);
    });

    close.addEventListener('click', () => {
      aside.classList.add(`${ns}-hidden`);
    });

    min.addEventListener('click', (e) => {
      aside.classList.add(`${ns}-min`);
      e.stopImmediatePropagation();
    });
  });

  socketMessage(socket, (action, data) => {
    if (!aside) {
      return;
    }

    switch (action) {
      case 'problems':
        reset();
        addErrors(data.errors);
        addWarnings(data.warnings);
        aside.classList.remove(hidden);
        break;
      case 'replace':
        if (!preErrors.children.length && !preWarnings.children.length) {
          return;
        }

        reset();
        problems.classList.add(`${ns}-success`);
        aside.classList.remove(hidden);

        setTimeout(() => aside.classList.add(hidden), 3e3);
        break;
      default:
    }
  });
};

module.exports = { init };


/***/ }),

/***/ "../../../node_modules/webpack-plugin-serve/lib/overlays/util.js":
/*!***************************************************!*\
  !*** (webpack)-plugin-serve/lib/overlays/util.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const addHtml = (html, parent) => {
  const div = document.createElement('div');
  const nodes = [];

  div.innerHTML = html.trim();

  while (div.firstChild) {
    nodes.push((parent || document.body).appendChild(div.firstChild));
  }

  return nodes;
};

const addCss = (css) => {
  const style = document.createElement('style');

  style.type = 'text/css';

  if (css.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  // append the stylesheet for the svg
  document.head.appendChild(style);
};

const socketMessage = (socket, handler) => {
  socket.addEventListener('message', (message) => {
    const { action, data } = JSON.parse(message.data);
    handler(action, data);
  });
};

module.exports = { addCss, addHtml, socketMessage };


/***/ }),

/***/ "./main-b0617ca54784e7d70eb0b67d6d1881bc.ts":
/*!**************************************************!*\
  !*** ./main-b0617ca54784e7d70eb0b67d6d1881bc.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @one/core */ "../../../node_modules/@one/core/lib/index.js");
var app_popup_module_1 = __webpack_require__(/*! ./popup/app.popup.module */ "./popup/app.popup.module.ts");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new core_1.OneFactory(app_popup_module_1.AppPopupModule);
                return [4 /*yield*/, app.start()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });


/***/ }),

/***/ "./popup/app.popup.module.ts":
/*!***********************************!*\
  !*** ./popup/app.popup.module.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @one/core */ "../../../node_modules/@one/core/lib/index.js");
var AppPopupModule = /** @class */ (function () {
    function AppPopupModule() {
    }
    AppPopupModule = __decorate([
        core_1.Module()
    ], AppPopupModule);
    return AppPopupModule;
}());
exports.AppPopupModule = AppPopupModule;


/***/ }),

/***/ 2:
/*!************************************************************************************!*\
  !*** multi ./main-b0617ca54784e7d70eb0b67d6d1881bc.ts webpack-plugin-serve/client ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/example/apps/appwriter/main-b0617ca54784e7d70eb0b67d6d1881bc.ts */"./main-b0617ca54784e7d70eb0b67d6d1881bc.ts");
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"../../../node_modules/webpack-plugin-serve/client.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAvbWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL2luamVjdC5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL2luamVjdGFibGUuZGVjb3JhdG9yLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZGVjb3JhdG9ycy9pbnZlcnNpZnkuZGVjb3JhdG9ycy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbW9kdWxlL2dsb2JhbC5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbW9kdWxlL21vZHVsZS5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL21vZHVsZS9yZXF1ZXN0LXNjb3BlLmRlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbW9kdWxlL3RyYW5zaWVudC1zY29wZS5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL211bHRpLWluamVjdC5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy1oYW5kbGVyLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMtem9uZS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL2NpcmN1bGFyLWRlcGVuZGVuY3kuZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9pbnZhbGlkLW1vZHVsZS5leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9pbnZhbGlkLXByb3ZpZGVyLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL21pc3NpbmctaW5qZWN0aW9uLXRva2VuLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL21pc3NpbmctcmVxdWlyZWQtZGVwZW5kZW5jeS5leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9tdWx0aS1wcm92aWRlci5leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9ydW50aW1lLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL3Vua25vd24tZXhwb3J0LmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL3Vua25vd24tbW9kdWxlLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL3Vua25vd24tcHJvdmlkZXIuZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2luZGV4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL21lc3NhZ2VzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2ZvcndhcmQtcmVmLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tZXRhZGF0YS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvbW9kdWxlL2NvbXBpbGVyLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvbW9kdWxlL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL21vZHVsZS9pbmplY3Rpb24tdG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tb2R1bGUvbW9kdWxlLXRva2VuLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tb2R1bGUvbW9kdWxlLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvbW9kdWxlL3NjYW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9yZWZsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9yZWdpc3RyeS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5LWluamVjdC1kZWNvcmF0b3JzL2xpYi9kZWNvcmF0b3JzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS1pbmplY3QtZGVjb3JhdG9ycy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL2RlY29yYXRvcl91dGlscy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vaW5qZWN0LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9pbmplY3RhYmxlLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9tdWx0aV9pbmplY3QuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL25hbWVkLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9vcHRpb25hbC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vcG9zdF9jb25zdHJ1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL3RhZ2dlZC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vdGFyZ2V0X25hbWUuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL3VubWFuYWdlZC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2JpbmRpbmdzL2JpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9iaW5kaW5ncy9iaW5kaW5nX2NvdW50LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29uc3RhbnRzL2Vycm9yX21zZ3MuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb25zdGFudHMvbGl0ZXJhbF90eXBlcy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29udGFpbmVyL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnRhaW5lci9jb250YWluZXJfbW9kdWxlLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29udGFpbmVyL2NvbnRhaW5lcl9zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnRhaW5lci9sb29rdXAuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9pbnZlcnNpZnkuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9jb250ZXh0LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9wbGFuLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvcGxhbm5lci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3F1ZXJ5YWJsZV9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9yZWZsZWN0aW9uX3V0aWxzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3RhcmdldC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3Jlc29sdXRpb24vaW5zdGFudGlhdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3Jlc29sdXRpb24vcmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ19pbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ19pbl93aGVuX29uX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX29uX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX3RvX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX3doZW5fb25fc3ludGF4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvc3ludGF4L2JpbmRpbmdfd2hlbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvY29uc3RyYWludF9oZWxwZXJzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvdXRpbHMvYmluZGluZ191dGlscy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3V0aWxzL2V4Y2VwdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi91dGlscy9pZC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3V0aWxzL3NlcmlhbGl6YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvb2JqZWN0LWhhc2gvZGlzdC9vYmplY3RfaGFzaC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS9SZWZsZWN0LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50LWhtci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50LWxvZy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9vdmVybGF5cy9wcm9ncmVzcy1taW5pbWFsLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9vdmVybGF5cy9wcm9ncmVzcy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvb3ZlcmxheXMvc3RhdHVzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9vdmVybGF5cy91dGlsLmpzIiwid2VicGFjazovLy8uL21haW4tYjA2MTdjYTU0Nzg0ZTdkNzBlYjBiNjdkNmQxODgxYmMudHMiLCJ3ZWJwYWNrOi8vLy4vcG9wdXAvYXBwLnBvcHVwLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIndwcy1obXIuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJ3cHMtaG1yLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImY4ZjFkNDYzYWU0YjJmMDcwN2Y2XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcInBvcHVwL21haW5cIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZmFjdG9yeV8xID0gcmVxdWlyZShcIi4vZmFjdG9yeVwiKTtcbmZ1bmN0aW9uIGJvb3RzdHJhcChtb2R1bGUpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBmYWN0b3J5ID0gbmV3IGZhY3RvcnlfMS5PbmVGYWN0b3J5KG1vZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgZmFjdG9yeS5zdGFydCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmJvb3RzdHJhcCA9IGJvb3RzdHJhcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb3RzdHJhcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU0hBUkVEX01PRFVMRV9NRVRBREFUQSA9IFN5bWJvbC5mb3IoJ01ldGFkYXRhPFNoYXJlZE1vZHVsZT4nKTtcbmV4cG9ydHMuU0NPUEVfTUVUQURBVEEgPSBTeW1ib2wuZm9yKCdNZXRhZGF0YTxTY29wZT4nKTtcbmV4cG9ydHMuUFJPVklERVJfTUVUQURBVEEgPSBTeW1ib2wuZm9yKCdNZXRhZGF0YTxQcm92aWRlcj4nKTtcbmV4cG9ydHMuTUVUQURBVEEgPSB7XG4gICAgSU1QT1JUUzogJ2ltcG9ydHMnLFxuICAgIEVYUE9SVFM6ICdleHBvcnRzJyxcbiAgICBQUk9WSURFUlM6ICdwcm92aWRlcnMnLFxufTtcbmV4cG9ydHMuU0NPUEVTID0ge1xuICAgIFNJTkdMRVRPTjogJ3NpbmdsZXRvbi1zY29wZScsXG4gICAgVFJBTlNJRU5UOiAndHJhbnNpZW50LXNjb3BlJyxcbiAgICBSRVFVRVNUOiAncmVxdWVzdC1zY29wZScsXG59O1xuZXhwb3J0cy5QUk9WSURFUl9UWVBFUyA9IHtcbiAgICBGQUNUT1JZOiAndXNlLWZhY3RvcnknLFxuICAgIENMQVNTOiAndXNlLWNsYXNzJyxcbiAgICBFWElTVElORzogJ3VzZS1leGlzdGluZycsXG4gICAgVkFMVUU6ICd1c2UtdmFsdWUnLFxuICAgIERFRkFVTFQ6ICdwcm92aWRlcicsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2ludmVyc2lmeS5kZWNvcmF0b3JzXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2luamVjdGFibGUuZGVjb3JhdG9yXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL211bHRpLWluamVjdC5kZWNvcmF0b3JcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vaW5qZWN0LmRlY29yYXRvclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tb2R1bGVcIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xudmFyIHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi4vcmVnaXN0cnlcIik7XG5mdW5jdGlvbiBjcmVhdGVMYXp5SW5qZWN0aW9uKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGxhenlJbmplY3QsIHByb3ZpZGVyKSB7XG4gICAgICAgIHJlZ2lzdHJ5XzEuUmVnaXN0cnkuYXNzZXJ0UHJvdmlkZXIocHJvdmlkZXIpO1xuICAgICAgICBsYXp5SW5qZWN0KHByb3ZpZGVyKSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICB9O1xufVxuZXhwb3J0cy5jcmVhdGVMYXp5SW5qZWN0aW9uID0gY3JlYXRlTGF6eUluamVjdGlvbjtcbmZ1bmN0aW9uIEluamVjdChwcm92aWRlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICAgICAgICBpZiAoIXJlZ2lzdHJ5XzEuUmVnaXN0cnkuaGFzRm9yd2FyZFJlZihwcm92aWRlcikpIHtcbiAgICAgICAgICAgIHJlZ2lzdHJ5XzEuUmVnaXN0cnkuYXNzZXJ0UHJvdmlkZXIocHJvdmlkZXIsIHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0SW5qZWN0aW9uVG9rZW4ocHJvdmlkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGludmVyc2lmeV8xLmluamVjdCh0b2tlbikodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVnaXN0cnlfMS5SZWdpc3RyeS5sYXp5SW5qZWN0cy5hZGQoe1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQuY29uc3RydWN0b3IsXG4gICAgICAgICAgICBmb3J3YXJkUmVmOiBwcm92aWRlcixcbiAgICAgICAgICAgIGxhenlJbmplY3Q6IGNyZWF0ZUxhenlJbmplY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSksXG4gICAgICAgIH0pO1xuICAgIH07XG59XG5leHBvcnRzLkluamVjdCA9IEluamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluamVjdC5kZWNvcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcbmZ1bmN0aW9uIEluamVjdGFibGUoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShjb25zdGFudHNfMS5QUk9WSURFUl9NRVRBREFUQSwgdHJ1ZSwgdGFyZ2V0KTtcbiAgICAgICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpKHRhcmdldCk7XG4gICAgfTtcbn1cbmV4cG9ydHMuSW5qZWN0YWJsZSA9IEluamVjdGFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmplY3RhYmxlLmRlY29yYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG5leHBvcnRzLk9wdGlvbmFsID0gaW52ZXJzaWZ5XzEub3B0aW9uYWw7XG5leHBvcnRzLlBvc3RDb25zdHJ1Y3QgPSBpbnZlcnNpZnlfMS5wb3N0Q29uc3RydWN0O1xuZXhwb3J0cy5UYXJnZXROYW1lID0gaW52ZXJzaWZ5XzEudGFyZ2V0TmFtZTtcbmV4cG9ydHMuVW5tYW5hZ2VkID0gaW52ZXJzaWZ5XzEudW5tYW5hZ2VkO1xuZXhwb3J0cy5EZWNvcmF0ZSA9IGludmVyc2lmeV8xLmRlY29yYXRlO1xuZXhwb3J0cy5UYWdnZWQgPSBpbnZlcnNpZnlfMS50YWdnZWQ7XG5leHBvcnRzLk5hbWVkID0gaW52ZXJzaWZ5XzEubmFtZWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnZlcnNpZnkuZGVjb3JhdG9ycy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb25zdGFudHNcIik7XG5mdW5jdGlvbiBHbG9iYWwoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShjb25zdGFudHNfMS5TSEFSRURfTU9EVUxFX01FVEFEQVRBLCB0cnVlLCB0YXJnZXQpO1xuICAgIH07XG59XG5leHBvcnRzLkdsb2JhbCA9IEdsb2JhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdsb2JhbC5kZWNvcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vbW9kdWxlLmRlY29yYXRvclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9nbG9iYWwuZGVjb3JhdG9yXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3JlcXVlc3Qtc2NvcGUuZGVjb3JhdG9yXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3RyYW5zaWVudC1zY29wZS5kZWNvcmF0b3JcIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xudmFyIHJlZmxlY3Rvcl8xID0gcmVxdWlyZShcIi4uLy4uL3JlZmxlY3RvclwiKTtcbmZ1bmN0aW9uIE1vZHVsZShtZXRhZGF0YSkge1xuICAgIGlmIChtZXRhZGF0YSA9PT0gdm9pZCAwKSB7IG1ldGFkYXRhID0ge307IH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZWZsZWN0b3JfMS5SZWZsZWN0b3IuZGVmaW5lQnlLZXlzKG1ldGFkYXRhLCB0YXJnZXQpO1xuICAgICAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCkodGFyZ2V0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5Nb2R1bGUgPSBNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2R1bGUuZGVjb3JhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uLy4uL2NvbnN0YW50c1wiKTtcbmZ1bmN0aW9uIFJlcXVlc3RTY29wZSgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKGNvbnN0YW50c18xLlNDT1BFX01FVEFEQVRBLCBjb25zdGFudHNfMS5TQ09QRVMuUkVRVUVTVCwgdGFyZ2V0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5SZXF1ZXN0U2NvcGUgPSBSZXF1ZXN0U2NvcGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXF1ZXN0LXNjb3BlLmRlY29yYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb25zdGFudHNcIik7XG5mdW5jdGlvbiBUcmFuc2llbnRTY29wZSgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKGNvbnN0YW50c18xLlNDT1BFX01FVEFEQVRBLCBjb25zdGFudHNfMS5TQ09QRVMuVFJBTlNJRU5ULCB0YXJnZXQpO1xuICAgIH07XG59XG5leHBvcnRzLlRyYW5zaWVudFNjb3BlID0gVHJhbnNpZW50U2NvcGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmFuc2llbnQtc2NvcGUuZGVjb3JhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG52YXIgcmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuLi9yZWdpc3RyeVwiKTtcbmZ1bmN0aW9uIE11bHRpSW5qZWN0KHRva2VuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5LCBpbmRleCkge1xuICAgICAgICBpZiAoIXJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNJbmplY3Rpb25Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5NaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb24oJ0BNdWx0aUluamVjdCgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaW52ZXJzaWZ5XzEubXVsdGlJbmplY3QodG9rZW4ubmFtZSkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgaW5kZXgpO1xuICAgIH07XG59XG5leHBvcnRzLk11bHRpSW5qZWN0ID0gTXVsdGlJbmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aS1pbmplY3QuZGVjb3JhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEV4Y2VwdGlvbnNIYW5kbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFeGNlcHRpb25zSGFuZGxlcigpIHtcbiAgICB9XG4gICAgRXhjZXB0aW9uc0hhbmRsZXIucHJvdG90eXBlLmhhbmRsZSA9IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24uc3RhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIEV4Y2VwdGlvbnNIYW5kbGVyO1xufSgpKTtcbmV4cG9ydHMuRXhjZXB0aW9uc0hhbmRsZXIgPSBFeGNlcHRpb25zSGFuZGxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4Y2VwdGlvbnMtaGFuZGxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXhjZXB0aW9uc19oYW5kbGVyXzEgPSByZXF1aXJlKFwiLi9leGNlcHRpb25zLWhhbmRsZXJcIik7XG52YXIgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpO1xudmFyIEV4Y2VwdGlvbnNab25lID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFeGNlcHRpb25zWm9uZSgpIHtcbiAgICB9XG4gICAgRXhjZXB0aW9uc1pvbmUucnVuID0gZnVuY3Rpb24gKHpvbmUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCAzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHpvbmUoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgM107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhjZXB0aW9uSGFuZGxlci5oYW5kbGUoZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG1lc3NhZ2VzXzEuVU5IQU5ETEVEX1JVTlRJTUVfRVhDRVBUSU9OO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRXhjZXB0aW9uc1pvbmUuZXhjZXB0aW9uSGFuZGxlciA9IG5ldyBleGNlcHRpb25zX2hhbmRsZXJfMS5FeGNlcHRpb25zSGFuZGxlcigpO1xuICAgIHJldHVybiBFeGNlcHRpb25zWm9uZTtcbn0oKSk7XG5leHBvcnRzLkV4Y2VwdGlvbnNab25lID0gRXhjZXB0aW9uc1pvbmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGNlcHRpb25zLXpvbmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4uL21lc3NhZ2VzXCIpO1xudmFyIENpcmN1bGFyRGVwZW5kZW5jeUV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENpcmN1bGFyRGVwZW5kZW5jeUV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDaXJjdWxhckRlcGVuZGVuY3lFeGNlcHRpb24oY29udGV4dCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZXNfMS5DaXJjdWxhckRlcGVuZGVuY3lNZXNzYWdlKGNvbnRleHQpKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ2lyY3VsYXJEZXBlbmRlbmN5RXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuQ2lyY3VsYXJEZXBlbmRlbmN5RXhjZXB0aW9uID0gQ2lyY3VsYXJEZXBlbmRlbmN5RXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2lyY3VsYXItZGVwZW5kZW5jeS5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vY2lyY3VsYXItZGVwZW5kZW5jeS5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vbWlzc2luZy1yZXF1aXJlZC1kZXBlbmRlbmN5LmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9pbnZhbGlkLW1vZHVsZS5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vbXVsdGktcHJvdmlkZXIuZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3Vua25vd24tcHJvdmlkZXIuZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2ludmFsaWQtcHJvdmlkZXIuZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21pc3NpbmctaW5qZWN0aW9uLXRva2VuLmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi91bmtub3duLWV4cG9ydC5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vdW5rbm93bi1tb2R1bGUuZXhjZXB0aW9uXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuLi9tZXNzYWdlc1wiKTtcbnZhciBJbnZhbGlkTW9kdWxlRXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW52YWxpZE1vZHVsZUV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbnZhbGlkTW9kdWxlRXhjZXB0aW9uKHRyYWNlKSB7XG4gICAgICAgIGlmICh0cmFjZSA9PT0gdm9pZCAwKSB7IHRyYWNlID0gW107IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNjb3BlID0gdHJhY2UubWFwKGZ1bmN0aW9uIChtb2R1bGUpIHsgcmV0dXJuIG1vZHVsZS5uYW1lOyB9KS5qb2luKCcgLT4gJyk7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZXNfMS5JbnZhbGlkTW9kdWxlTWVzc2FnZShzY29wZSkpIHx8IHRoaXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEludmFsaWRNb2R1bGVFeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5JbnZhbGlkTW9kdWxlRXhjZXB0aW9uID0gSW52YWxpZE1vZHVsZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludmFsaWQtbW9kdWxlLmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIEludmFsaWRQcm92aWRlckV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEludmFsaWRQcm92aWRlckV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbnZhbGlkUHJvdmlkZXJFeGNlcHRpb24ocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIChwcm92aWRlci5uYW1lIHx8XG4gICAgICAgICAgICBwcm92aWRlci50b1N0cmluZygpKSArIFwiIGlzIGludmFsaWQuIE11c3QgYmUgYW4gSW5qZWN0aW9uVG9rZW4gb3IgSW5qZWN0YWJsZVwiKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSW52YWxpZFByb3ZpZGVyRXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuSW52YWxpZFByb3ZpZGVyRXhjZXB0aW9uID0gSW52YWxpZFByb3ZpZGVyRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW52YWxpZC1wcm92aWRlci5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4uL21lc3NhZ2VzXCIpO1xudmFyIE1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb24oY29udGV4dCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZXNfMS5NaXNzaW5nSW5qZWN0aW9uVG9rZW5NZXNzYWdlKGNvbnRleHQpKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uID0gTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWlzc2luZy1pbmplY3Rpb24tdG9rZW4uZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4uL21lc3NhZ2VzXCIpO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciBNaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5RXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeUV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5RXhjZXB0aW9uKG5hbWUsIHJlYXNvbikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZXNfMS5NaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5TWVzc2FnZShuYW1lLCByZWFzb24pKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeUV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLk1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lFeGNlcHRpb24gPSBNaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5RXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWlzc2luZy1yZXF1aXJlZC1kZXBlbmRlbmN5LmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi4vbWVzc2FnZXNcIik7XG52YXIgTXVsdGlQcm92aWRlckV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE11bHRpUHJvdmlkZXJFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTXVsdGlQcm92aWRlckV4Y2VwdGlvbihuYW1lKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlc18xLk11bHRpUHJvdmlkZXJNZXNzYWdlKG5hbWUpKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTXVsdGlQcm92aWRlckV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLk11bHRpUHJvdmlkZXJFeGNlcHRpb24gPSBNdWx0aVByb3ZpZGVyRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGktcHJvdmlkZXIuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSdW50aW1lRXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUnVudGltZUV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSdW50aW1lRXhjZXB0aW9uKG1zZykge1xuICAgICAgICBpZiAobXNnID09PSB2b2lkIDApIHsgbXNnID0gJyc7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgbXNnKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5tc2cgPSBtc2c7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUnVudGltZUV4Y2VwdGlvbi5wcm90b3R5cGUud2hhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXNnO1xuICAgIH07XG4gICAgcmV0dXJuIFJ1bnRpbWVFeGNlcHRpb247XG59KEVycm9yKSk7XG5leHBvcnRzLlJ1bnRpbWVFeGNlcHRpb24gPSBSdW50aW1lRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cnVudGltZS5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4uL21lc3NhZ2VzXCIpO1xudmFyIFVua25vd25FeHBvcnRFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVbmtub3duRXhwb3J0RXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVua25vd25FeHBvcnRFeGNlcHRpb24obmFtZSwgZXhwb3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2VzXzEuVW5rbm93bkV4cG9ydE1lc3NhZ2UobmFtZSwgZXhwb3J0ZWQpKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVW5rbm93bkV4cG9ydEV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLlVua25vd25FeHBvcnRFeGNlcHRpb24gPSBVbmtub3duRXhwb3J0RXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5rbm93bi1leHBvcnQuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgVW5rbm93bk1vZHVsZUV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVua25vd25Nb2R1bGVFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVW5rbm93bk1vZHVsZUV4Y2VwdGlvbih0cmFjZSkge1xuICAgICAgICBpZiAodHJhY2UgPT09IHZvaWQgMCkgeyB0cmFjZSA9IFtdOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzY29wZSA9IHRyYWNlLm1hcChmdW5jdGlvbiAobW9kdWxlKSB7IHJldHVybiBtb2R1bGUubmFtZTsgfSkuam9pbignIC0+ICcpO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiTmVzdCBjYW5ub3Qgc2VsZWN0IGdpdmVuIG1vZHVsZSAoaXQgZG9lcyBub3QgZXhpc3QgaW4gY3VycmVudCBjb250ZXh0KS4gU2NvcGUgW1wiICsgc2NvcGUgKyBcIl1cIikgfHwgdGhpcztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVW5rbm93bk1vZHVsZUV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLlVua25vd25Nb2R1bGVFeGNlcHRpb24gPSBVbmtub3duTW9kdWxlRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5rbm93bi1tb2R1bGUuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgcmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuLi8uLi9yZWdpc3RyeVwiKTtcbnZhciBVbmtub3duUHJvdmlkZXJFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVbmtub3duUHJvdmlkZXJFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVW5rbm93blByb3ZpZGVyRXhjZXB0aW9uKHByb3ZpZGVyLCBtb2R1bGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG5hbWUgPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyTmFtZShwcm92aWRlcik7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgbmFtZSArIFwiIGNvdWxkIG5vdCBiZSBmb3VuZCBpbiBcIiArIG1vZHVsZS5uYW1lKSB8fCB0aGlzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBVbmtub3duUHJvdmlkZXJFeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5Vbmtub3duUHJvdmlkZXJFeGNlcHRpb24gPSBVbmtub3duUHJvdmlkZXJFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmtub3duLXByb3ZpZGVyLmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9leGNlcHRpb25zXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21lc3NhZ2VzXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2V4Y2VwdGlvbnMtem9uZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9leGNlcHRpb25zLWhhbmRsZXJcIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkludmFsaWRNb2R1bGVNZXNzYWdlID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgcmV0dXJuIFwiTmVzdCBjYW5ub3QgY3JlYXRlIHRoZSBtb2R1bGUgaW5zdGFuY2UuIE9mdGVuLCB0aGlzIGlzIGJlY2F1c2Ugb2YgYSBjaXJjdWxhciBkZXBlbmRlbmN5IGJldHdlZW4gbW9kdWxlcy4gVXNlIGZvcndhcmRSZWYoKSB0byBhdm9pZCBpdC4gKFJlYWQgbW9yZSBodHRwczovL2RvY3MubmVzdGpzLmNvbS9hZHZhbmNlZC9jaXJjdWxhci1kZXBlbmRlbmN5KS4gU2NvcGUgW1wiICsgc2NvcGUgKyBcIl1cIjtcbn07XG5leHBvcnRzLlVua25vd25FeHBvcnRNZXNzYWdlID0gZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0ZWQpIHtcbiAgICByZXR1cm4gXCJOZXN0IGNhbm5vdCBleHBvcnQgYSBjb21wb25lbnQvbW9kdWxlIChcIiArIGV4cG9ydGVkICsgXCIpIHRoYXQgaXMgbm90IGEgcGFydCBvZiB0aGUgY3VycmVudGx5IHByb2Nlc3NlZCBtb2R1bGUgKFwiICsgbW9kdWxlICsgXCIpLiBQbGVhc2UgdmVyaWZ5IHdoZXRoZXIgZWFjaCBleHBvcnRlZCB1bml0IGlzIGF2YWlsYWJsZSBpbiB0aGlzIHBhcnRpY3VsYXIgY29udGV4dC5cIjtcbn07XG5leHBvcnRzLk1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lNZXNzYWdlID0gZnVuY3Rpb24gKG5hbWUsIHJlYXNvbikge1xuICAgIHJldHVybiBcIlRoZSBcXFwiXCIgKyBuYW1lICsgXCJcXFwiIHBhY2thZ2UgaXMgbWlzc2luZy4gUGxlYXNlLCBtYWtlIHN1cmUgdG8gaW5zdGFsbCB0aGlzIGxpYnJhcnkgKCQgeWFybiBhZGQgXCIgKyBuYW1lICsgXCIpIHRvIHRha2UgYWR2YW50YWdlIG9mIFwiICsgcmVhc29uICsgXCIuXCI7XG59O1xuZXhwb3J0cy5DaXJjdWxhckRlcGVuZGVuY3lNZXNzYWdlID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICByZXR1cm4gXCJBIGNpcmN1bGFyIGRlcGVuZGVuY3kgaGFzIGJlZW4gZGV0ZWN0ZWQgaW5zaWRlIFwiICsgY29udGV4dCArIFwiLiBQbGVhc2UsIG1ha2Ugc3VyZSB0aGF0IGVhY2ggc2lkZSBvZiBhIGJpZGlyZWN0aW9uYWwgcmVsYXRpb25zaGlwcyBhcmUgZGVjb3JhdGVkIHdpdGggXFxcImZvcndhcmRSZWYoKVxcXCIuXCI7XG59O1xuZXhwb3J0cy5NdWx0aVByb3ZpZGVyTWVzc2FnZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIFwiUHJvdmlkZXIgXCIgKyBuYW1lICsgXCIgaXMgYWxyZWFkeSBib3VuZC4gU2V0IHRoZSBtdWx0aSBwcm9wZXJ0eSB0byB0cnVlLCB0byBhbGxvdyBtdWx0aXBsZSBwcm92aWRlcnMgYmVpbmcgYm91bmQgdG8gdGhpcyB0b2tlblwiO1xufTtcbmV4cG9ydHMuTWlzc2luZ0luamVjdGlvblRva2VuTWVzc2FnZSA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgcmV0dXJuIFwiWW91IGNhbiBvbmx5IHVzZSBhbiBJbmplY3Rpb25Ub2tlbiBpbiBcIiArIGNvbnRleHQ7XG59O1xuZXhwb3J0cy5VTkhBTkRMRURfUlVOVElNRV9FWENFUFRJT04gPSAnVW5oYW5kbGVkIFJ1bnRpbWUgRXhjZXB0aW9uLic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXNzYWdlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9tb2R1bGVcIik7XG52YXIgdG9rZW5zXzEgPSByZXF1aXJlKFwiLi90b2tlbnNcIik7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG52YXIgcmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuL3JlZ2lzdHJ5XCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgT25lRmFjdG9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT25lRmFjdG9yeShtb2R1bGUpIHtcbiAgICAgICAgdGhpcy5tb2R1bGUgPSBtb2R1bGU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbmV3IG1vZHVsZV8xLk9uZUNvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLnNjYW5uZXIgPSBuZXcgbW9kdWxlXzEuU2Nhbm5lcih0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICAgIE9uZUZhY3RvcnkucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIGVycm9yc18xLkV4Y2VwdGlvbnNab25lLnJ1bihmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdGhpcy5zY2FubmVyLnNjYW4odGhpcy5tb2R1bGUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLmluaXQoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lRmFjdG9yeS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCBlcnJvcnNfMS5FeGNlcHRpb25zWm9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHV0aWxfMS5VdGlscy5zZXJpZXModGhpcy5jb250YWluZXIuZ2V0QWxsUHJvdmlkZXJzKHRva2Vuc18xLkFQUF9ERVNUUk9ZKSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUZhY3RvcnkucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB1dGlsXzEuVXRpbHMuc2VyaWVzKHRoaXMuY29udGFpbmVyLmdldEFsbFByb3ZpZGVycyh0b2tlbnNfMS5BUFBfSU5JVCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVGYWN0b3J5LnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jb250YWluZXIuZ2V0UHJvdmlkZXIocHJvdmlkZXIsIG1vZHVsZSwge1xuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QWxsOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNJbmplY3Rpb25Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLk1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbignT25lRmFjdG9yeS5zZWxlY3QoKS5nZXRBbGwoKScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29udGFpbmVyLmdldEFsbFByb3ZpZGVycyh0b2tlbiwgbW9kdWxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXM6IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jb250YWluZXIuaXNQcm92aWRlckJvdW5kKHByb3ZpZGVyLCBtb2R1bGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE9uZUZhY3RvcnkucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuaXNQcm92aWRlckJvdW5kKHByb3ZpZGVyKTtcbiAgICB9O1xuICAgIE9uZUZhY3RvcnkucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICBpZiAoIXJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNJbmplY3Rpb25Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5NaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb24oJ09uZUZhY3RvcnkuZ2V0QWxsKCknKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0QWxsUHJvdmlkZXJzKHRva2VuKTtcbiAgICB9O1xuICAgIE9uZUZhY3RvcnkucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0UHJvdmlkZXIocHJvdmlkZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIE9uZUZhY3Rvcnk7XG59KCkpO1xuZXhwb3J0cy5PbmVGYWN0b3J5ID0gT25lRmFjdG9yeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZhY3RvcnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZvcndhcmRSZWYgPSBmdW5jdGlvbiAoZm9yd2FyZFJlZikgeyByZXR1cm4gKHtcbiAgICBmb3J3YXJkUmVmOiBmb3J3YXJkUmVmLFxufSk7IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3J3YXJkLXJlZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tb2R1bGVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vY29uc3RhbnRzXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2RlY29yYXRvcnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vYm9vdHN0cmFwXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2ZhY3RvcnlcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vZm9yd2FyZC1yZWZcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vcmVmbGVjdG9yXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2Vycm9yc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tZXRhZGF0YS1zdG9yYWdlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3JlZ2lzdHJ5XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3Rva2Vuc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi91dGlsXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZCkgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gICAgcmV0dXJuIGFyO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xudmFyIEJhc2VNZXRhZGF0YVN0b3JhZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJhc2VNZXRhZGF0YVN0b3JhZ2UoKSB7XG4gICAgfVxuICAgIEJhc2VNZXRhZGF0YVN0b3JhZ2UuZmluZEJ5VGFyZ2V0ID0gZnVuY3Rpb24gKG1ldGFkYXRhLCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkKG1ldGFkYXRhLnZhbHVlcygpKS5maW5kKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdmFsdWUudGFyZ2V0ID09PSB0YXJnZXQ7IH0pO1xuICAgIH07XG4gICAgQmFzZU1ldGFkYXRhU3RvcmFnZS5maW5kQnlUYXJnZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChtZXRhZGF0YSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICB2YXIgZmluZEJ5UHJvcGVydHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19zcHJlYWQobWV0YWRhdGEudmFsdWVzKCkpLmZpbmQoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB2YWx1ZS50YXJnZXQgPT09IHRhcmdldCAmJiB2YWx1ZS5wcm9wZXJ0eUtleSA9PT0gcHJvcGVydHlLZXk7IH0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdXRpbF8xLlV0aWxzLmlzTmlsKHByb3BlcnR5S2V5KVxuICAgICAgICAgICAgPyB0aGlzLmZpbmRCeVRhcmdldChtZXRhZGF0YSwgdGFyZ2V0KVxuICAgICAgICAgICAgOiBmaW5kQnlQcm9wZXJ0eSgpO1xuICAgIH07XG4gICAgQmFzZU1ldGFkYXRhU3RvcmFnZS5maWx0ZXJCeVRhcmdldFByb3BlcnR5ID0gZnVuY3Rpb24gKG1ldGFkYXRhLCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgIHZhciBmaWx0ZXJCeVByb3BlcnR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fc3ByZWFkKG1ldGFkYXRhLnZhbHVlcygpKS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB2YWx1ZS50YXJnZXQgPT09IHRhcmdldCAmJiB2YWx1ZS5wcm9wZXJ0eUtleSA9PT0gcHJvcGVydHlLZXk7IH0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdXRpbF8xLlV0aWxzLmlzTmlsKHByb3BlcnR5S2V5KVxuICAgICAgICAgICAgPyB0aGlzLmZpbHRlckJ5VGFyZ2V0KG1ldGFkYXRhLCB0YXJnZXQpXG4gICAgICAgICAgICA6IGZpbHRlckJ5UHJvcGVydHkoKTtcbiAgICB9O1xuICAgIEJhc2VNZXRhZGF0YVN0b3JhZ2UuZmlsdGVyQnlUYXJnZXQgPSBmdW5jdGlvbiAobWV0YWRhdGEsIHRhcmdldCkge1xuICAgICAgICByZXR1cm4gX19zcHJlYWQobWV0YWRhdGEudmFsdWVzKCkpLmZpbHRlcihmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHZhbHVlLnRhcmdldCA9PT0gdGFyZ2V0OyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBCYXNlTWV0YWRhdGFTdG9yYWdlO1xufSgpKTtcbmV4cG9ydHMuQmFzZU1ldGFkYXRhU3RvcmFnZSA9IEJhc2VNZXRhZGF0YVN0b3JhZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXRhZGF0YS1zdG9yYWdlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgcmV0dXJuIHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG1vZHVsZV90b2tlbl9mYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9tb2R1bGUtdG9rZW4tZmFjdG9yeVwiKTtcbnZhciByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uL3JlZ2lzdHJ5XCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xudmFyIE1vZHVsZUNvbXBpbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNb2R1bGVDb21waWxlcigpIHtcbiAgICAgICAgdGhpcy5tb2R1bGVUb2tlbkZhY3RvcnkgPSBuZXcgbW9kdWxlX3Rva2VuX2ZhY3RvcnlfMS5Nb2R1bGVUb2tlbkZhY3RvcnkoKTtcbiAgICB9XG4gICAgTW9kdWxlQ29tcGlsZXIucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAobW9kdWxlLCBzY29wZSkge1xuICAgICAgICBpZiAoc2NvcGUgPT09IHZvaWQgMCkgeyBzY29wZSA9IFtdOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgdGFyZ2V0LCBkeW5hbWljTWV0YWRhdGEsIHRva2VuO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHRoaXMuZXh0cmFjdE1ldGFkYXRhKG1vZHVsZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdGFyZ2V0ID0gX2EudGFyZ2V0LCBkeW5hbWljTWV0YWRhdGEgPSBfYS5keW5hbWljTWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHRoaXMubW9kdWxlVG9rZW5GYWN0b3J5LmNyZWF0ZSh0YXJnZXQsIHNjb3BlLCBkeW5hbWljTWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB7IHRhcmdldDogdGFyZ2V0LCBkeW5hbWljTWV0YWRhdGE6IGR5bmFtaWNNZXRhZGF0YSwgdG9rZW46IHRva2VuIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1vZHVsZUNvbXBpbGVyLnByb3RvdHlwZS5leHRyYWN0TWV0YWRhdGEgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVSZWYsIF9hLCB0YXJnZXQsIGR5bmFtaWNNZXRhZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB1dGlsXzEuVXRpbHMuZ2V0RGVmZXJyZWQobW9kdWxlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZVJlZiA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVnaXN0cnlfMS5SZWdpc3RyeS5pc0R5bmFtaWNNb2R1bGUobW9kdWxlUmVmKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgeyB0YXJnZXQ6IG1vZHVsZSB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gbW9kdWxlUmVmLCB0YXJnZXQgPSBfYS5tb2R1bGUsIGR5bmFtaWNNZXRhZGF0YSA9IF9fcmVzdChfYSwgW1wibW9kdWxlXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgeyB0YXJnZXQ6IHRhcmdldCwgZHluYW1pY01ldGFkYXRhOiBkeW5hbWljTWV0YWRhdGEgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE1vZHVsZUNvbXBpbGVyO1xufSgpKTtcbmV4cG9ydHMuTW9kdWxlQ29tcGlsZXIgPSBNb2R1bGVDb21waWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBpbGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbXBpbGVyXzEgPSByZXF1aXJlKFwiLi9jb21waWxlclwiKTtcbnZhciByZWZsZWN0b3JfMSA9IHJlcXVpcmUoXCIuLi9yZWZsZWN0b3JcIik7XG52YXIgcmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuLi9yZWdpc3RyeVwiKTtcbnZhciBtb2R1bGVfMSA9IHJlcXVpcmUoXCIuL21vZHVsZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG52YXIgT25lQ29udGFpbmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPbmVDb250YWluZXIoKSB7XG4gICAgICAgIHRoaXMubW9kdWxlQ29tcGlsZXIgPSBuZXcgY29tcGlsZXJfMS5Nb2R1bGVDb21waWxlcigpO1xuICAgICAgICB0aGlzLmdsb2JhbE1vZHVsZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMubW9kdWxlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tb2R1bGVPcmRlciA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5wcm92aWRlclRva2VucyA9IFtdO1xuICAgICAgICB0aGlzLmR5bmFtaWNNb2R1bGVzTWV0YWRhdGEgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0TW9kdWxlc0Zyb20gPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHJldHVybiAhdXRpbF8xLlV0aWxzLmlzTmlsKG1vZHVsZSlcbiAgICAgICAgICAgID8gW3RoaXMuZ2V0TW9kdWxlKG1vZHVsZSldXG4gICAgICAgICAgICA6IHRoaXMuZ2V0TW9kdWxlVmFsdWVzKCk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmlzUHJvdmlkZXJCb3VuZCA9IGZ1bmN0aW9uIChwcm92aWRlciwgbW9kdWxlKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJUb2tlbihwcm92aWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1vZHVsZXNGcm9tKG1vZHVsZSkuc29tZShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBwcm92aWRlcnMgPSBfYS5wcm92aWRlcnM7XG4gICAgICAgICAgICByZXR1cm4gcHJvdmlkZXJzLmlzQm91bmQodG9rZW4pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uICh0b1JlcGxhY2UsIG9wdGlvbnMpIHtcbiAgICAgICAgX19zcHJlYWQodGhpcy5tb2R1bGVzLnZhbHVlcygpKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgICAgIG1vZHVsZS5yZXBsYWNlKHRvUmVwbGFjZSwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXRQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgc2NvcGUsIF9hKSB7XG4gICAgICAgIHZhciBzdHJpY3QgPSAoX2EgPT09IHZvaWQgMCA/IHt9IDogX2EpLnN0cmljdDtcbiAgICAgICAgdmFyIGVfMSwgX2I7XG4gICAgICAgIHZhciB0b2tlbiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJUb2tlbihwcm92aWRlcik7XG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVfMiA9IHRoaXMuZ2V0TW9kdWxlKHNjb3BlKTtcbiAgICAgICAgICAgIGlmIChtb2R1bGVfMi5wcm92aWRlcnMuaXNCb3VuZCh0b2tlbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlXzIucHJvdmlkZXJzLmdldCh0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9jID0gX192YWx1ZXModGhpcy5tb2R1bGVzLnZhbHVlcygpKSwgX2QgPSBfYy5uZXh0KCk7ICFfZC5kb25lOyBfZCA9IF9jLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvdmlkZXJzID0gX2QudmFsdWUucHJvdmlkZXJzO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvdmlkZXJzLmlzQm91bmQodG9rZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXJzLmdldCh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9kICYmICFfZC5kb25lICYmIChfYiA9IF9jLnJldHVybikpIF9iLmNhbGwoX2MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlVua25vd25Qcm92aWRlckV4Y2VwdGlvbihwcm92aWRlciwgc2NvcGUpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGxQcm92aWRlcnMgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHRhcmdldCkge1xuICAgICAgICBpZiAoIXJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNJbmplY3Rpb25Ub2tlbihwcm92aWRlcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5NaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb24oJ0NvbnRhaW5lci5nZXRBbGxQcm92aWRlcnMoKScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b2tlbiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJUb2tlbihwcm92aWRlcik7XG4gICAgICAgIHJldHVybiB1dGlsXzEuVXRpbHMuZmxhdHRlbih0aGlzLmdldE1vZHVsZXNGcm9tKHRhcmdldCkubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHByb3ZpZGVycyA9IF9hLnByb3ZpZGVycztcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlcnMuaXNCb3VuZCh0b2tlbikgPyBwcm92aWRlcnMuZ2V0QWxsKHRva2VuKSA6IFtdO1xuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldE1vZHVsZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxfMS5VdGlscy5nZXRWYWx1ZXModGhpcy5tb2R1bGVzLmVudHJpZXMoKSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmhhc01vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TW9kdWxlVmFsdWVzKCkuc29tZShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBfYS50YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0ID09PSBtb2R1bGU7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXRNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1vZHVsZVZhbHVlcygpLmZpbmQoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gX2EudGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldCA9PT0gbW9kdWxlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0TW9kdWxlQnlUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICBpZiAoIXRoaXMubW9kdWxlcy5oYXModG9rZW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVW5rbm93bk1vZHVsZUV4Y2VwdGlvbihbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlcy5nZXQodG9rZW4pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXRSZXZlcnNlZE1vZHVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZCh0aGlzLm1vZHVsZXMuZW50cmllcygpKS5yZXZlcnNlKCk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldE1vZHVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXM7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmFkZFByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyLCB0b2tlbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlID0gdGhpcy5nZXRNb2R1bGVCeVRva2VuKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgbW9kdWxlLmFkZFByb3ZpZGVyKHByb3ZpZGVyKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5hZGRFeHBvcnRlZCA9IGZ1bmN0aW9uIChjb21wb25lbnQsIHRva2VuKSB7XG4gICAgICAgIHZhciBtb2R1bGUgPSB0aGlzLmdldE1vZHVsZUJ5VG9rZW4odG9rZW4pO1xuICAgICAgICBtb2R1bGUuYWRkRXhwb3J0ZWQoY29tcG9uZW50KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYWRkR2xvYmFsTW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICB0aGlzLmdsb2JhbE1vZHVsZXMuYWRkKG1vZHVsZSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmFkZE1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUsIHNjb3BlKSB7XG4gICAgICAgIGlmIChzY29wZSA9PT0gdm9pZCAwKSB7IHNjb3BlID0gW107IH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCB0YXJnZXQsIGR5bmFtaWNNZXRhZGF0YSwgdG9rZW4sIG9uZU1vZHVsZSwgbW9kdWxlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbW9kdWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5JbnZhbGlkTW9kdWxlRXhjZXB0aW9uKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5tb2R1bGVDb21waWxlci5jb21waWxlKG1vZHVsZSwgc2NvcGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIHRhcmdldCA9IF9hLnRhcmdldCwgZHluYW1pY01ldGFkYXRhID0gX2EuZHluYW1pY01ldGFkYXRhLCB0b2tlbiA9IF9hLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kdWxlcy5oYXModG9rZW4pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmVNb2R1bGUgPSBuZXcgbW9kdWxlXzEuT25lTW9kdWxlKHRhcmdldCwgc2NvcGUsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25lTW9kdWxlLmFkZEdsb2JhbFByb3ZpZGVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzLnNldCh0b2tlbiwgb25lTW9kdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXMgPSB1dGlsXzEuVXRpbHMuY29uY2F0KHNjb3BlLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREeW5hbWljTWV0YWRhdGEodG9rZW4sIGR5bmFtaWNNZXRhZGF0YSwgbW9kdWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZsZWN0b3JfMS5SZWZsZWN0b3IuaXNHbG9iYWxNb2R1bGUodGFyZ2V0KSAmJiB0aGlzLmFkZEdsb2JhbE1vZHVsZShvbmVNb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmFkZER5bmFtaWNNZXRhZGF0YSA9IGZ1bmN0aW9uICh0b2tlbiwgZHluYW1pY01vZHVsZU1ldGFkYXRhLCBzY29wZSkge1xuICAgICAgICBpZiAoIWR5bmFtaWNNb2R1bGVNZXRhZGF0YSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5keW5hbWljTW9kdWxlc01ldGFkYXRhLnNldCh0b2tlbiwgZHluYW1pY01vZHVsZU1ldGFkYXRhKTtcbiAgICAgICAgdGhpcy5hZGREeW5hbWljTW9kdWxlcyhkeW5hbWljTW9kdWxlTWV0YWRhdGEuaW1wb3J0cywgc2NvcGUpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5hZGREeW5hbWljTW9kdWxlcyA9IGZ1bmN0aW9uIChtb2R1bGVzLCBzY29wZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAobW9kdWxlcyA9PT0gdm9pZCAwKSB7IG1vZHVsZXMgPSBbXTsgfVxuICAgICAgICBtb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkgeyByZXR1cm4gX3RoaXMuYWRkTW9kdWxlKG1vZHVsZSwgc2NvcGUpOyB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYmluZEdsb2JhbFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7IHJldHVybiBfdGhpcy5iaW5kR2xvYmFsc1RvSW1wb3J0cyhtb2R1bGUpOyB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYmluZEdsb2JhbHNUb0ltcG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZ2xvYmFsTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChnbG9iYWxNb2R1bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5iaW5kR2xvYmFsTW9kdWxlVG9Nb2R1bGUobW9kdWxlLCBnbG9iYWxNb2R1bGUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYmluZEdsb2JhbE1vZHVsZVRvTW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSwgZ2xvYmFsTW9kdWxlKSB7XG4gICAgICAgIGlmIChtb2R1bGUgPT09IGdsb2JhbE1vZHVsZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbW9kdWxlLmFkZEltcG9ydChnbG9iYWxNb2R1bGUpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5hZGRJbXBvcnQgPSBmdW5jdGlvbiAocmVsYXRlZE1vZHVsZSwgdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZSwgc2NvcGUsIHJlbGF0ZWRNb2R1bGVUb2tlbiwgcmVsYXRlZDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb2R1bGVzLmhhcyh0b2tlbikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZSA9IHRoaXMuZ2V0TW9kdWxlQnlUb2tlbih0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZSA9IHV0aWxfMS5VdGlscy5jb25jYXQobW9kdWxlLnNjb3BlLCBtb2R1bGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5tb2R1bGVDb21waWxlci5jb21waWxlKHJlbGF0ZWRNb2R1bGUsIHNjb3BlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRNb2R1bGVUb2tlbiA9IChfYS5zZW50KCkpLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZCA9IHRoaXMuZ2V0TW9kdWxlQnlUb2tlbihyZWxhdGVkTW9kdWxlVG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlLmFkZEltcG9ydChyZWxhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXREeW5hbWljTWV0YWRhdGFCeVRva2VuID0gZnVuY3Rpb24gKHRva2VuLCBrZXkpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gdGhpcy5keW5hbWljTW9kdWxlc01ldGFkYXRhLmdldCh0b2tlbik7XG4gICAgICAgIHJldHVybiBtZXRhZGF0YSAmJiBtZXRhZGF0YVtrZXldID8gbWV0YWRhdGFba2V5XSA6IFtdO1xuICAgIH07XG4gICAgcmV0dXJuIE9uZUNvbnRhaW5lcjtcbn0oKSk7XG5leHBvcnRzLk9uZUNvbnRhaW5lciA9IE9uZUNvbnRhaW5lcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRhaW5lci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9zY2FubmVyXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21vZHVsZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9jb21waWxlclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9jb250YWluZXJcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vaW5qZWN0aW9uLXRva2VuXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEluamVjdGlvblRva2VuID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmplY3Rpb25Ub2tlbihkZXNjKSB7XG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2M7XG4gICAgICAgIHRoaXMubmFtZSA9IFN5bWJvbC5mb3IoXCJJbmplY3Rpb25Ub2tlbjxcIiArIHRoaXMuZGVzYyArIFwiPlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIEluamVjdGlvblRva2VuO1xufSgpKTtcbmV4cG9ydHMuSW5qZWN0aW9uVG9rZW4gPSBJbmplY3Rpb25Ub2tlbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluamVjdGlvbi10b2tlbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBoYXNoID0gcmVxdWlyZShcIm9iamVjdC1oYXNoXCIpO1xudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcbnZhciBNb2R1bGVUb2tlbkZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZHVsZVRva2VuRmFjdG9yeSgpIHtcbiAgICB9XG4gICAgTW9kdWxlVG9rZW5GYWN0b3J5LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAodGFyZ2V0LCBzY29wZSwgZHluYW1pY01vZHVsZU1ldGFkYXRhKSB7XG4gICAgICAgIHZhciByZWZsZWN0ZWRTY29wZSA9IHRoaXMucmVmbGVjdFNjb3BlKHRhcmdldCk7XG4gICAgICAgIHZhciBpc1NpbmdsZVNjb3BlZCA9IHJlZmxlY3RlZFNjb3BlID09PSB0cnVlO1xuICAgICAgICB2YXIgb3BhcXVlVG9rZW4gPSB7XG4gICAgICAgICAgICBtb2R1bGU6IHRoaXMuZ2V0TW9kdWxlTmFtZSh0YXJnZXQpLFxuICAgICAgICAgICAgZHluYW1pYzogdGhpcy5nZXREeW5hbWljTWV0YWRhdGFUb2tlbihkeW5hbWljTW9kdWxlTWV0YWRhdGEpLFxuICAgICAgICAgICAgc2NvcGU6IGlzU2luZ2xlU2NvcGVkID8gdGhpcy5nZXRTY29wZVN0YWNrKHNjb3BlKSA6IHJlZmxlY3RlZFNjb3BlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaGFzaChvcGFxdWVUb2tlbik7XG4gICAgfTtcbiAgICBNb2R1bGVUb2tlbkZhY3RvcnkucHJvdG90eXBlLmdldER5bmFtaWNNZXRhZGF0YVRva2VuID0gZnVuY3Rpb24gKGR5bmFtaWNNb2R1bGVNZXRhZGF0YSkge1xuICAgICAgICByZXR1cm4gZHluYW1pY01vZHVsZU1ldGFkYXRhID8gSlNPTi5zdHJpbmdpZnkoZHluYW1pY01vZHVsZU1ldGFkYXRhKSA6ICcnO1xuICAgIH07XG4gICAgTW9kdWxlVG9rZW5GYWN0b3J5LnByb3RvdHlwZS5nZXRNb2R1bGVOYW1lID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0Lm5hbWU7XG4gICAgfTtcbiAgICBNb2R1bGVUb2tlbkZhY3RvcnkucHJvdG90eXBlLmdldFNjb3BlU3RhY2sgPSBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJldmVyc2VkU2NvcGUgPSBzY29wZS5yZXZlcnNlKCk7XG4gICAgICAgIHZhciBmaXJzdEdsb2JhbEluZGV4ID0gcmV2ZXJzZWRTY29wZS5maW5kSW5kZXgoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIF90aGlzLnJlZmxlY3RTY29wZShzKSA9PT0gJ2dsb2JhbCc7IH0pO1xuICAgICAgICBzY29wZS5yZXZlcnNlKCk7XG4gICAgICAgIHZhciBzdGFjayA9IGZpcnN0R2xvYmFsSW5kZXggPj0gMFxuICAgICAgICAgICAgPyBzY29wZS5zbGljZShzY29wZS5sZW5ndGggLSBmaXJzdEdsb2JhbEluZGV4IC0gMSlcbiAgICAgICAgICAgIDogc2NvcGU7XG4gICAgICAgIHJldHVybiBzdGFjay5tYXAoZnVuY3Rpb24gKG1vZHVsZSkgeyByZXR1cm4gbW9kdWxlLm5hbWU7IH0pO1xuICAgIH07XG4gICAgTW9kdWxlVG9rZW5GYWN0b3J5LnByb3RvdHlwZS5yZWZsZWN0U2NvcGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHZhciBzY29wZSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoY29uc3RhbnRzXzEuU0hBUkVEX01PRFVMRV9NRVRBREFUQSwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHNjb3BlID8gc2NvcGUgOiAnZ2xvYmFsJztcbiAgICB9O1xuICAgIHJldHVybiBNb2R1bGVUb2tlbkZhY3Rvcnk7XG59KCkpO1xuZXhwb3J0cy5Nb2R1bGVUb2tlbkZhY3RvcnkgPSBNb2R1bGVUb2tlbkZhY3Rvcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2R1bGUtdG9rZW4tZmFjdG9yeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZCkgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xudmFyIGludmVyc2lmeV9pbmplY3RfZGVjb3JhdG9yc18xID0gcmVxdWlyZShcImludmVyc2lmeS1pbmplY3QtZGVjb3JhdG9yc1wiKTtcbnZhciB0b2tlbnNfMSA9IHJlcXVpcmUoXCIuLi90b2tlbnNcIik7XG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyXCIpO1xudmFyIHJlZmxlY3Rvcl8xID0gcmVxdWlyZShcIi4uL3JlZmxlY3RvclwiKTtcbnZhciByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uL3JlZ2lzdHJ5XCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbnZhciBPbmVNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9uZU1vZHVsZSh0YXJnZXQsIHNjb3BlLCBjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuaW1wb3J0cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5pbmplY3RhYmxlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgaW52ZXJzaWZ5XzEuQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMubGF6eUluamVjdCA9IGludmVyc2lmeV9pbmplY3RfZGVjb3JhdG9yc18xLmRlZmF1bHQodGhpcy5wcm92aWRlcnMpLmxhenlJbmplY3Q7XG4gICAgICAgIHRoaXMuZXhwb3J0cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVkID0gdXRpbF8xLlV0aWxzLmNyZWF0ZURlZmVycmVkUHJvbWlzZSgpO1xuICAgIH1cbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmFkZEltcG9ydCA9IGZ1bmN0aW9uIChyZWxhdGVkTW9kdWxlKSB7XG4gICAgICAgIHRoaXMuaW1wb3J0cy5hZGQocmVsYXRlZE1vZHVsZSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmFkZFByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHRoaXMuaW5qZWN0YWJsZXMuYWRkKHByb3ZpZGVyKTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUucHJvdmlkZXJDb250YWluZXJIYXNUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICByZXR1cm4gX19zcHJlYWQodGhpcy5pbmplY3RhYmxlcy52YWx1ZXMoKSkuc29tZShmdW5jdGlvbiAocHJvdmlkZXIpIHsgcmV0dXJuIHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJUb2tlbihwcm92aWRlcikgPT09IHRva2VuOyB9KTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUudmFsaWRhdGVFeHBvcnRlZCA9IGZ1bmN0aW9uICh0b2tlbiwgZXhwb3J0ZWQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvdmlkZXJDb250YWluZXJIYXNUb2tlbih0b2tlbikpXG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIHZhciBpbXBvcnRlZCA9IF9fc3ByZWFkKHRoaXMuaW1wb3J0cy52YWx1ZXMoKSk7XG4gICAgICAgIHZhciBpbXBvcnRlZFJlZk5hbWVzID0gaW1wb3J0ZWRcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW07IH0pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IF9hLnRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuIHRhcmdldDsgfSk7XG4gICAgICAgIGlmICghaW1wb3J0ZWRSZWZOYW1lcy5pbmNsdWRlcyh0b2tlbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5Vbmtub3duRXhwb3J0RXhjZXB0aW9uKHRoaXMudGFyZ2V0Lm5hbWUsIGV4cG9ydGVkLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYWRkRXhwb3J0ZWQgPSBmdW5jdGlvbiAoZXhwb3J0ZWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGFkZEV4cG9ydGVkVW5pdCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgX3RoaXMuZXhwb3J0cy5hZGQoX3RoaXMudmFsaWRhdGVFeHBvcnRlZCh0b2tlbiwgZXhwb3J0ZWQpKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNEeW5hbWljTW9kdWxlKGV4cG9ydGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFkZEV4cG9ydGVkVW5pdChleHBvcnRlZC5tb2R1bGUpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV4cG9ydGVkVW5pdChyZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyVG9rZW4oZXhwb3J0ZWQpKTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuZ2V0UHJvdmlkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19zcHJlYWQoW1xuICAgICAgICAgICAgdG9rZW5zXzEuSW5qZWN0b3JcbiAgICAgICAgXSwgdGhpcy5pbmplY3RhYmxlcy52YWx1ZXMoKSwgdGhpcy5nZXRSZWxhdGVkUHJvdmlkZXJzKCkudmFsdWVzKCkpO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5saW5rUmVsYXRlZFByb3ZpZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHByb3ZpZGVycyA9IHRoaXMuZ2V0UmVsYXRlZFByb3ZpZGVycygpO1xuICAgICAgICBwcm92aWRlcnMuZm9yRWFjaChmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHZhciByZWYgPSBfdGhpcy5jb250YWluZXIuZ2V0UHJvdmlkZXIocHJvdmlkZXIsIF90aGlzLnRhcmdldCk7XG4gICAgICAgICAgICBfdGhpcy5wcm92aWRlcnMuYmluZChwcm92aWRlcikudG9Db25zdGFudFZhbHVlKHJlZik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5nZXRSZWxhdGVkUHJvdmlkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgdmFyIHByb3ZpZGVyU2NvcGUgPSBuZXcgU2V0KCk7XG4gICAgICAgIHZhciBmaW5kID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICAgICAgdmFyIGVfMiwgX2E7XG4gICAgICAgICAgICBtb2R1bGUgPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldEZvcndhcmRSZWYobW9kdWxlKTtcbiAgICAgICAgICAgIGlmIChyZWZsZWN0b3JfMS5SZWZsZWN0b3IuaXNQcm92aWRlcihtb2R1bGUpKSB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXJTY29wZS5hZGQobW9kdWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMobW9kdWxlLmV4cG9ydHMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVsYXRlZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvbnRhaW5lci5oYXNNb2R1bGUocmVsYXRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gX3RoaXMuY29udGFpbmVyLmdldE1vZHVsZShyZWxhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5kKHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlclNjb3BlLmFkZChyZWxhdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMuaW1wb3J0cyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVsYXRlZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgIGZpbmQocmVsYXRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvdmlkZXJTY29wZTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYmluZFByb3ZpZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMywgX2EsIF9iLCBfYywgcHJvdmlkZXIsIGlzTXVsdGksIHRva2VuLCBuYW1lXzEsIHR5cGUsIGVfM18xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2QubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rUmVsYXRlZFByb3ZpZGVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC50cnlzLnB1c2goWzEsIDYsIDcsIDhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gX192YWx1ZXModGhpcy5pbmplY3RhYmxlcyksIF9jID0gX2IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFfYy5kb25lKSByZXR1cm4gWzMsIDVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGkgPSBwcm92aWRlci5tdWx0aTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlclRva2VuKHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNdWx0aSAmJiB0aGlzLmNvbnRhaW5lci5wcm92aWRlclRva2Vucy5pbmNsdWRlcyh0b2tlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lXzEgPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyTmFtZShwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLk11bHRpUHJvdmlkZXJFeGNlcHRpb24obmFtZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnByb3ZpZGVyVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHRoaXMuZ2V0UHJvdmlkZXJUeXBlKHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5iaW5kKHRva2VuLCB0eXBlLCBwcm92aWRlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jID0gX2IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzNfMSA9IF9kLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMyA9IHsgZXJyb3I6IGVfM18xIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAodG9SZXBsYWNlLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuYWRkUHJvdmlkZXIoX19hc3NpZ24oeyBwcm92aWRlOiB0b1JlcGxhY2UgfSwgb3B0aW9ucykpO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGUsIF9hO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvdmlkZXJzLmlzQm91bmQodGhpcy50YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuYmluZFByb3ZpZGVycygpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlcnMuYmluZCh0aGlzLnRhcmdldCkudG9TZWxmKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUgPSB0aGlzLnByb3ZpZGVycy5nZXQodGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBtb2R1bGUub25Nb2R1bGVJbml0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfYSkgcmV0dXJuIFszLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgbW9kdWxlLm9uTW9kdWxlSW5pdCgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSAoX2Iuc2VudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2E7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHV0aWxfMS5VdGlscy5zZXJpZXModGhpcy5jb250YWluZXIuZ2V0QWxsUHJvdmlkZXJzKHRva2Vuc18xLk1PRFVMRV9JTklULCB0aGlzLnRhcmdldCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5nZXRQcm92aWRlclR5cGUgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgaWYgKHJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNGYWN0b3J5UHJvdmlkZXIocHJvdmlkZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuRkFDVE9SWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzVmFsdWVQcm92aWRlcihwcm92aWRlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5WQUxVRTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzQ2xhc3NQcm92aWRlcihwcm92aWRlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5DTEFTUztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzRXhpc3RpbmdQcm92aWRlcihwcm92aWRlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5FWElTVElORztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuREVGQVVMVDtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuZ2V0UHJvdmlkZXIgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJUb2tlbihyZWYpO1xuICAgICAgICB2YXIgcHJvdmlkZXIgPSAodGhpcy5nZXRQcm92aWRlcnMoKS5maW5kKGZ1bmN0aW9uIChwcm92aWRlcikgeyByZXR1cm4gcHJvdmlkZXIgPT09IHRva2VuOyB9KSk7XG4gICAgICAgIGlmICghcHJvdmlkZXIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVW5rbm93blByb3ZpZGVyRXhjZXB0aW9uKHJlZiwgdGhpcy50YXJnZXQpO1xuICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmdldERlcGVuZGVuY2llcyA9IGZ1bmN0aW9uIChkZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY2llcyA9PT0gdm9pZCAwKSB7IGRlcGVuZGVuY2llcyA9IFtdOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgUHJvbWlzZS5hbGwoZGVwZW5kZW5jaWVzLm1hcChmdW5jdGlvbiAoZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldEZvcndhcmRSZWYoZGVwZW5kZW5jeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnlfMS5SZWdpc3RyeS5hc3NlcnRQcm92aWRlcihyZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm92aWRlciA9IF90aGlzLmdldFByb3ZpZGVyKHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvbnRhaW5lci5nZXRQcm92aWRlcihwcm92aWRlciwgX3RoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYmluZEZhY3RvcnlQcm92aWRlciA9IGZ1bmN0aW9uICh0b2tlbiwgcHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRlcHM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdGhpcy5nZXREZXBlbmRlbmNpZXMocHJvdmlkZXIuZGVwcyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3ZpZGVyLnNjb3BlID09PSBjb25zdGFudHNfMS5TQ09QRVMuVFJBTlNJRU5UKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0aGlzLnByb3ZpZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJpbmQodG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9EeW5hbWljVmFsdWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdmlkZXIudXNlRmFjdG9yeS5hcHBseShwcm92aWRlciwgX19zcHJlYWQoZGVwcykpOyB9KV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHRoaXMucHJvdmlkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5iaW5kKHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9Qcm92aWRlcihmdW5jdGlvbiAoKSB7IHJldHVybiBwcm92aWRlci51c2VGYWN0b3J5LmFwcGx5KHByb3ZpZGVyLCBfX3NwcmVhZChkZXBzKSk7IH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmJpbmRQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgc2NvcGUpIHtcbiAgICAgICAgdmFyIGJpbmRpbmcgPSB0aGlzLnByb3ZpZGVycy5iaW5kKHByb3ZpZGVyKS50b1NlbGYoKTtcbiAgICAgICAgc3dpdGNoIChzY29wZSkge1xuICAgICAgICAgICAgY2FzZSBjb25zdGFudHNfMS5TQ09QRVMuVFJBTlNJRU5UOlxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nLmluVHJhbnNpZW50U2NvcGUoKTtcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzXzEuU0NPUEVTLlJFUVVFU1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmcuaW5SZXF1ZXN0U2NvcGUoKTtcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzXzEuU0NPUEVTLlNJTkdMRVRPTjpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmcuaW5TaW5nbGV0b25TY29wZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmJpbmRDbGFzc1Byb3ZpZGVyID0gZnVuY3Rpb24gKHRva2VuLCBwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm92aWRlcnMuYmluZCh0b2tlbikudG8ocHJvdmlkZXIudXNlQ2xhc3MpO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5iaW5kVmFsdWVQcm92aWRlciA9IGZ1bmN0aW9uICh0b2tlbiwgcHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvdmlkZXJzLmJpbmQodG9rZW4pLnRvQ29uc3RhbnRWYWx1ZShwcm92aWRlci51c2VWYWx1ZSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmJpbmRFeGlzdGluZ1Byb3ZpZGVyID0gZnVuY3Rpb24gKHRva2VuLCBwcm92aWRlcikge1xuICAgICAgICB2YXIgZXhpc3RpbmdUb2tlbiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0SW5qZWN0aW9uVG9rZW4ocHJvdmlkZXIudXNlRXhpc3RpbmcpO1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSB0aGlzLnByb3ZpZGVycy5nZXQoZXhpc3RpbmdUb2tlbik7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVycy5iaW5kKHRva2VuKS50b0NvbnN0YW50VmFsdWUoZXhpc3RpbmcpO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKHRva2VuLCB0eXBlLCBwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2NvcGUsIGxhenlJbmplY3RzO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGUgPT09IGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLkRFRkFVTFQpKSByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgPSByZWZsZWN0b3JfMS5SZWZsZWN0b3IucmVzb2x2ZVByb3ZpZGVyU2NvcGUocHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUluamVjdHMgPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldExhenlJbmplY3RzKHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlJbmplY3RzLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhenlJbmplY3QgPSBfYS5sYXp5SW5qZWN0LCBmb3J3YXJkUmVmID0gX2EuZm9yd2FyZFJlZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldEZvcndhcmRSZWYoZm9yd2FyZFJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUluamVjdChfdGhpcy5sYXp5SW5qZWN0LCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFByb3ZpZGVyKHByb3ZpZGVyLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0eXBlID09PSBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5GQUNUT1JZKSkgcmV0dXJuIFszLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5iaW5kRmFjdG9yeVByb3ZpZGVyKHRva2VuLCBwcm92aWRlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuVkFMVUUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRWYWx1ZVByb3ZpZGVyKHRva2VuLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5DTEFTUykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZENsYXNzUHJvdmlkZXIodG9rZW4sIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLkVYSVNUSU5HKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRXhpc3RpbmdQcm92aWRlcih0b2tlbiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5hZGRHbG9iYWxQcm92aWRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzLmJpbmQodG9rZW5zXzEuSW5qZWN0b3IpLnRvQ29uc3RhbnRWYWx1ZSh0aGlzLnByb3ZpZGVycyk7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzLmJpbmQoY29udGFpbmVyXzEuT25lQ29udGFpbmVyKS50b0NvbnN0YW50VmFsdWUodGhpcy5jb250YWluZXIpO1xuICAgICAgICB0aGlzLnByb3ZpZGVycy5iaW5kKHRva2Vuc18xLk9ORV9NT0RVTEUubmFtZSkudG9Db25zdGFudFZhbHVlKHRoaXMpO1xuICAgICAgICB0aGlzLnByb3ZpZGVyc1xuICAgICAgICAgICAgLmJpbmQodG9rZW5zXzEuSW5qZWN0b3IpXG4gICAgICAgICAgICAudG9Db25zdGFudFZhbHVlKHRoaXMucHJvdmlkZXJzKVxuICAgICAgICAgICAgLndoZW5JbmplY3RlZEludG8odGhpcy50YXJnZXQpO1xuICAgICAgICB0aGlzLnByb3ZpZGVyc1xuICAgICAgICAgICAgLmJpbmQoY29udGFpbmVyXzEuT25lQ29udGFpbmVyKVxuICAgICAgICAgICAgLnRvQ29uc3RhbnRWYWx1ZSh0aGlzLmNvbnRhaW5lcilcbiAgICAgICAgICAgIC53aGVuSW5qZWN0ZWRJbnRvKHRoaXMudGFyZ2V0KTtcbiAgICB9O1xuICAgIHJldHVybiBPbmVNb2R1bGU7XG59KCkpO1xuZXhwb3J0cy5PbmVNb2R1bGUgPSBPbmVNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2R1bGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xudmFyIHJlZmxlY3Rvcl8xID0gcmVxdWlyZShcIi4uL3JlZmxlY3RvclwiKTtcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG52YXIgcmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuLi9yZWdpc3RyeVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbnZhciBTY2FubmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2FubmVyKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHRoaXMuc2NhbkZvck1vZHVsZXMobW9kdWxlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5zY2FuTW9kdWxlc0ZvckRlcGVuZGVuY2llcygpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYmluZEdsb2JhbFNjb3BlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuY3JlYXRlTW9kdWxlcygpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5jcmVhdGVNb2R1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdHJhdmVyc2UsIHJvb3RNb2R1bGU7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhdmVyc2UgPSBmdW5jdGlvbiAobW9kdWxlKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVfMSwgX2EsIGltcG9ydHMsIGltcG9ydHNfMSwgaW1wb3J0c18xXzEsIGlubmVyTW9kdWxlLCBlXzFfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRzID0gbW9kdWxlLmltcG9ydHMudmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgNiwgNywgOF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydHNfMSA9IF9fdmFsdWVzKGltcG9ydHMpLCBpbXBvcnRzXzFfMSA9IGltcG9ydHNfMS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIWltcG9ydHNfMV8xLmRvbmUpIHJldHVybiBbMywgNV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJNb2R1bGUgPSBpbXBvcnRzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRyYXZlcnNlKGlubmVyTW9kdWxlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRzXzFfMSA9IGltcG9ydHNfMS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlXzFfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSB7IGVycm9yOiBlXzFfMSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydHNfMV8xICYmICFpbXBvcnRzXzFfMS5kb25lICYmIChfYSA9IGltcG9ydHNfMS5yZXR1cm4pKSBfYS5jYWxsKGltcG9ydHNfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzQsIFByb21pc2UuYWxsKF9fc3ByZWFkKGltcG9ydHMpLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNyZWF0ZWQgPSBfYS5jcmVhdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIG1vZHVsZS5jcmVhdGUoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5tb2R1bGVPcmRlci5hZGQobW9kdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RNb2R1bGUgPSB0aGlzLmNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRNb2R1bGVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsdWVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0cmF2ZXJzZShyb290TW9kdWxlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbkZvck1vZHVsZXMgPSBmdW5jdGlvbiAobW9kdWxlLCBzY29wZSwgY3R4UmVnaXN0cnkpIHtcbiAgICAgICAgaWYgKHNjb3BlID09PSB2b2lkIDApIHsgc2NvcGUgPSBbXTsgfVxuICAgICAgICBpZiAoY3R4UmVnaXN0cnkgPT09IHZvaWQgMCkgeyBjdHhSZWdpc3RyeSA9IFtdOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzIsIF9hLCBpbXBvcnRzLCBtb2R1bGVzLCBtb2R1bGVzXzEsIG1vZHVsZXNfMV8xLCBpbm5lck1vZHVsZSwgc2NvcGVkTW9kdWxlcywgZV8yXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdGhpcy5zdG9yZU1vZHVsZShtb2R1bGUsIHNjb3BlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eFJlZ2lzdHJ5LnB1c2gobW9kdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdpc3RyeV8xLlJlZ2lzdHJ5Lmhhc0ZvcndhcmRSZWYobW9kdWxlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZSA9IG1vZHVsZS5mb3J3YXJkUmVmKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRzID0gcmVmbGVjdG9yXzEuUmVmbGVjdG9yLmdldChjb25zdGFudHNfMS5NRVRBREFUQS5JTVBPUlRTLCBtb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlcyA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNEeW5hbWljTW9kdWxlKG1vZHVsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9fc3ByZWFkKGltcG9ydHMsIChtb2R1bGUuaW1wb3J0cyB8fCBbXSkpIDogaW1wb3J0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsyLCA3LCA4LCA5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzXzEgPSBfX3ZhbHVlcyhtb2R1bGVzKSwgbW9kdWxlc18xXzEgPSBtb2R1bGVzXzEubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFtb2R1bGVzXzFfMS5kb25lKSByZXR1cm4gWzMsIDZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJNb2R1bGUgPSBtb2R1bGVzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHhSZWdpc3RyeS5pbmNsdWRlcyhpbm5lck1vZHVsZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlZE1vZHVsZXMgPSB1dGlsXzEuVXRpbHMuY29uY2F0KHNjb3BlLCBtb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLnNjYW5Gb3JNb2R1bGVzKGlubmVyTW9kdWxlLCBzY29wZWRNb2R1bGVzLCBjdHhSZWdpc3RyeSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfMV8xID0gbW9kdWxlc18xLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgM107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFszLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8yXzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzIgPSB7IGVycm9yOiBlXzJfMSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kdWxlc18xXzEgJiYgIW1vZHVsZXNfMV8xLmRvbmUgJiYgKF9hID0gbW9kdWxlc18xLnJldHVybikpIF9hLmNhbGwobW9kdWxlc18xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5zdG9yZU1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUsIHNjb3BlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVnaXN0cnlfMS5SZWdpc3RyeS5oYXNGb3J3YXJkUmVmKG1vZHVsZSkpIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuY29udGFpbmVyLmFkZE1vZHVsZShtb2R1bGUuZm9yd2FyZFJlZigpLCBzY29wZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiwgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzQsIHRoaXMuY29udGFpbmVyLmFkZE1vZHVsZShtb2R1bGUsIHNjb3BlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuc3RvcmVJbXBvcnQgPSBmdW5jdGlvbiAocmVsYXRlZCwgdG9rZW4sIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWxhdGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5DaXJjdWxhckRlcGVuZGVuY3lFeGNlcHRpb24oY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZ2lzdHJ5XzEuUmVnaXN0cnkuaGFzRm9yd2FyZFJlZihyZWxhdGVkKSkgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5jb250YWluZXIuYWRkSW1wb3J0KHJlbGF0ZWQuZm9yd2FyZFJlZigpLCB0b2tlbildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiwgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzQsIHRoaXMuY29udGFpbmVyLmFkZEltcG9ydChyZWxhdGVkLCB0b2tlbildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5Nb2R1bGVzRm9yRGVwZW5kZW5jaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8zLCBfYSwgbW9kdWxlcywgbW9kdWxlc18yLCBtb2R1bGVzXzJfMSwgX2IsIHRva2VuLCBtb2R1bGVfMSwgZV8zXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzID0gdGhpcy5jb250YWluZXIuZ2V0UmV2ZXJzZWRNb2R1bGVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYy5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLnRyeXMucHVzaChbMSwgNywgOCwgOV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc18yID0gX192YWx1ZXMobW9kdWxlcyksIG1vZHVsZXNfMl8xID0gbW9kdWxlc18yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhbW9kdWxlc18yXzEuZG9uZSkgcmV0dXJuIFszLCA2XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gX19yZWFkKG1vZHVsZXNfMl8xLnZhbHVlLCAyKSwgdG9rZW4gPSBfYlswXSwgbW9kdWxlXzEgPSBfYlsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5yZWZsZWN0SW1wb3J0cyhtb2R1bGVfMS50YXJnZXQsIHRva2VuLCBtb2R1bGVfMS50YXJnZXQubmFtZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMucmVmbGVjdFByb3ZpZGVycyhtb2R1bGVfMS50YXJnZXQsIHRva2VuKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmbGVjdEV4cG9ydHMobW9kdWxlXzEudGFyZ2V0LCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYy5sYWJlbCA9IDU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfMl8xID0gbW9kdWxlc18yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFszLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8zXzEgPSBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzMgPSB7IGVycm9yOiBlXzNfMSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kdWxlc18yXzEgJiYgIW1vZHVsZXNfMl8xLmRvbmUgJiYgKF9hID0gbW9kdWxlc18yLnJldHVybikpIF9hLmNhbGwobW9kdWxlc18yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5yZWZsZWN0UHJvdmlkZXJzID0gZnVuY3Rpb24gKG1vZHVsZSwgdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfNCwgX2EsIHByb3ZpZGVycywgcHJvdmlkZXJzXzEsIHByb3ZpZGVyc18xXzEsIHByb3ZpZGVyLCBlXzRfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVycyA9IHRoaXMuZ2V0RHluYW1pY01ldGFkYXRhKG1vZHVsZSwgdG9rZW4sIGNvbnN0YW50c18xLk1FVEFEQVRBLlBST1ZJREVSUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgNiwgNywgOF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzXzEgPSBfX3ZhbHVlcyhwcm92aWRlcnMpLCBwcm92aWRlcnNfMV8xID0gcHJvdmlkZXJzXzEubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFwcm92aWRlcnNfMV8xLmRvbmUpIHJldHVybiBbMywgNV07XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlciA9IHByb3ZpZGVyc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuc3RvcmVQcm92aWRlcihwcm92aWRlciwgdG9rZW4pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnNfMV8xID0gcHJvdmlkZXJzXzEubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzRfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfNCA9IHsgZXJyb3I6IGVfNF8xIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm92aWRlcnNfMV8xICYmICFwcm92aWRlcnNfMV8xLmRvbmUgJiYgKF9hID0gcHJvdmlkZXJzXzEucmV0dXJuKSkgX2EuY2FsbChwcm92aWRlcnNfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNCkgdGhyb3cgZV80LmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuc3RvcmVQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHRoaXMuY29udGFpbmVyLmFkZFByb3ZpZGVyKHByb3ZpZGVyLCB0b2tlbildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLmdldER5bmFtaWNNZXRhZGF0YSA9IGZ1bmN0aW9uIChtb2R1bGUsIHRva2VuLCBtZXRhZGF0YUtleSkge1xuICAgICAgICByZXR1cm4gX19zcHJlYWQocmVmbGVjdG9yXzEuUmVmbGVjdG9yLmdldChtZXRhZGF0YUtleSwgbW9kdWxlKSwgdGhpcy5jb250YWluZXIuZ2V0RHluYW1pY01ldGFkYXRhQnlUb2tlbih0b2tlbiwgbWV0YWRhdGFLZXkpKTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnJlZmxlY3RFeHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZSwgdG9rZW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGV4cG9ydHMgPSB0aGlzLmdldER5bmFtaWNNZXRhZGF0YShtb2R1bGUsIHRva2VuLCBjb25zdGFudHNfMS5NRVRBREFUQS5FWFBPUlRTKTtcbiAgICAgICAgZXhwb3J0cy5mb3JFYWNoKGZ1bmN0aW9uIChleHBvcnRlZENvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnN0b3JlRXhwb3J0ZWQoZXhwb3J0ZWRDb21wb25lbnQsIHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5zdG9yZUV4cG9ydGVkID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgdG9rZW4pIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXhwb3J0ZWQoY29tcG9uZW50LCB0b2tlbik7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5yZWZsZWN0SW1wb3J0cyA9IGZ1bmN0aW9uIChtb2R1bGUsIHRva2VuLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzUsIF9hLCBtb2R1bGVzLCBtb2R1bGVzXzMsIG1vZHVsZXNfM18xLCByZWxhdGVkLCBlXzVfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXMgPSB0aGlzLmdldER5bmFtaWNNZXRhZGF0YShtb2R1bGUsIHRva2VuLCBjb25zdGFudHNfMS5NRVRBREFUQS5JTVBPUlRTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCA2LCA3LCA4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzXzMgPSBfX3ZhbHVlcyhtb2R1bGVzKSwgbW9kdWxlc18zXzEgPSBtb2R1bGVzXzMubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFtb2R1bGVzXzNfMS5kb25lKSByZXR1cm4gWzMsIDVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZCA9IG1vZHVsZXNfM18xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLnN0b3JlSW1wb3J0KHJlbGF0ZWQsIHRva2VuLCBjb250ZXh0KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc18zXzEgPSBtb2R1bGVzXzMubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzVfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfNSA9IHsgZXJyb3I6IGVfNV8xIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2R1bGVzXzNfMSAmJiAhbW9kdWxlc18zXzEuZG9uZSAmJiAoX2EgPSBtb2R1bGVzXzMucmV0dXJuKSkgX2EuY2FsbChtb2R1bGVzXzMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzUpIHRocm93IGVfNS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTY2FubmVyO1xufSgpKTtcbmV4cG9ydHMuU2Nhbm5lciA9IFNjYW5uZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2FubmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7XG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XG52YXIgUmVmbGVjdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWZsZWN0b3IoKSB7XG4gICAgfVxuICAgIFJlZmxlY3Rvci5kZWZpbmVCeUtleXMgPSBmdW5jdGlvbiAobWV0YWRhdGEsIHRhcmdldCwgZXhjbHVkZSkge1xuICAgICAgICBpZiAoZXhjbHVkZSA9PT0gdm9pZCAwKSB7IGV4Y2x1ZGUgPSBbXTsgfVxuICAgICAgICBPYmplY3Qua2V5cyhtZXRhZGF0YSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHApIHsgcmV0dXJuICFleGNsdWRlLmluY2x1ZGVzKHApOyB9KVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKHByb3BlcnR5LCBtZXRhZGF0YVtwcm9wZXJ0eV0sIHRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG4gICAgUmVmbGVjdG9yLmdldCA9IGZ1bmN0aW9uIChtZXRhZGF0YUtleSwgdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0LmdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQpIHx8IFtdO1xuICAgIH07XG4gICAgUmVmbGVjdG9yLnNldCA9IGZ1bmN0aW9uIChtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICB9O1xuICAgIFJlZmxlY3Rvci5oYXMgPSBmdW5jdGlvbiAobWV0YWRhdGFLZXksIHRhcmdldCkge1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5oYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0KTtcbiAgICB9O1xuICAgIFJlZmxlY3Rvci5pc0dsb2JhbE1vZHVsZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuaGFzTWV0YWRhdGEoY29uc3RhbnRzXzEuU0hBUkVEX01PRFVMRV9NRVRBREFUQSwgdGFyZ2V0KTtcbiAgICB9O1xuICAgIFJlZmxlY3Rvci5pc1Byb3ZpZGVyID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5oYXNNZXRhZGF0YShjb25zdGFudHNfMS5QUk9WSURFUl9NRVRBREFUQSwgdGFyZ2V0KTtcbiAgICB9O1xuICAgIFJlZmxlY3Rvci5yZXNvbHZlUHJvdmlkZXJTY29wZSA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YShjb25zdGFudHNfMS5TQ09QRV9NRVRBREFUQSwgcHJvdmlkZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlZmxlY3Rvcjtcbn0oKSk7XG5leHBvcnRzLlJlZmxlY3RvciA9IFJlZmxlY3Rvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZmxlY3Rvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG52YXIgbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9tb2R1bGVcIik7XG52YXIgcmVmbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9yZWZsZWN0b3JcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBSZWdpc3RyeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVnaXN0cnkoKSB7XG4gICAgfVxuICAgIFJlZ2lzdHJ5LmNsZWFyTGF6eUluamVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubGF6eUluamVjdHMuY2xlYXIoKTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmdldExhenlJbmplY3RzID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gX19zcHJlYWQodGhpcy5sYXp5SW5qZWN0cy52YWx1ZXMoKSkuZmlsdGVyKGZ1bmN0aW9uIChwcm92aWRlcikgeyByZXR1cm4gcHJvdmlkZXIudGFyZ2V0ID09PSB0YXJnZXQ7IH0pO1xuICAgIH07XG4gICAgUmVnaXN0cnkuaXNNb2R1bGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pc0R5bmFtaWNNb2R1bGUodGFyZ2V0KSB8fFxuICAgICAgICAgICAgKCF0aGlzLmhhc1Byb3ZpZGVUb2tlbih0YXJnZXQpICYmXG4gICAgICAgICAgICAgICAgIXJlZmxlY3Rvcl8xLlJlZmxlY3Rvci5pc1Byb3ZpZGVyKHRhcmdldCkgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5pc0luamVjdGlvblRva2VuKHRhcmdldCkpKTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5Lmhhc0ZvcndhcmRSZWYgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuICEhKHByb3ZpZGVyICYmIHByb3ZpZGVyLmZvcndhcmRSZWYpO1xuICAgIH07XG4gICAgUmVnaXN0cnkuZ2V0Rm9yd2FyZFJlZiA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gUmVnaXN0cnkuaGFzRm9yd2FyZFJlZihwcm92aWRlcilcbiAgICAgICAgICAgID8gcHJvdmlkZXIuZm9yd2FyZFJlZigpXG4gICAgICAgICAgICA6IHByb3ZpZGVyO1xuICAgIH07XG4gICAgUmVnaXN0cnkuZ2V0UHJvdmlkZXJOYW1lID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHRoaXMuZ2V0UHJvdmlkZXJUb2tlbihwcm92aWRlcik7XG4gICAgICAgIHJldHVybiB1dGlsXzEuVXRpbHMuaXNTeW1ib2wodG9rZW4pID8gdG9rZW4udG9TdHJpbmcoKSA6IHRva2VuLm5hbWU7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5pc0luamVjdGlvblRva2VuID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiBwcm92aWRlciBpbnN0YW5jZW9mIG1vZHVsZV8xLkluamVjdGlvblRva2VuO1xuICAgIH07XG4gICAgUmVnaXN0cnkuZ2V0SW5qZWN0aW9uVG9rZW4gPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbmplY3Rpb25Ub2tlbihwcm92aWRlcilcbiAgICAgICAgICAgID8gcHJvdmlkZXIubmFtZVxuICAgICAgICAgICAgOiBwcm92aWRlcjtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmFzc2VydFByb3ZpZGVyID0gZnVuY3Rpb24gKHZhbCwgY29udGV4dCkge1xuICAgICAgICBpZiAoIXZhbClcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5DaXJjdWxhckRlcGVuZGVuY3lFeGNlcHRpb24oY29udGV4dCk7XG4gICAgICAgIGlmICghKHV0aWxfMS5VdGlscy5pc09iamVjdCh2YWwpIHx8XG4gICAgICAgICAgICAoIXV0aWxfMS5VdGlscy5pc05pbCh2YWwubmFtZSkgJiZcbiAgICAgICAgICAgICAgICAodXRpbF8xLlV0aWxzLmlzRnVuY3Rpb24odmFsKSB8fCB1dGlsXzEuVXRpbHMuaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IpKSkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFByb3ZpZGVyRXhjZXB0aW9uKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmdldFByb3ZpZGVyVG9rZW4gPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm92aWRlciAhPT0gJ3N5bWJvbCdcbiAgICAgICAgICAgID8gdGhpcy5nZXRJbmplY3Rpb25Ub2tlbihwcm92aWRlci5wcm92aWRlIHx8IHByb3ZpZGVyKVxuICAgICAgICAgICAgOiBwcm92aWRlcjtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmlzRHluYW1pY01vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuICEhbW9kdWxlLm1vZHVsZTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmlzRmFjdG9yeVByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiAhIXByb3ZpZGVyLnVzZUZhY3Rvcnk7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5pc1ZhbHVlUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuICEhcHJvdmlkZXIudXNlVmFsdWU7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5pc0NsYXNzUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuICEhcHJvdmlkZXIudXNlQ2xhc3M7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5pc0V4aXN0aW5nUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuICEhcHJvdmlkZXIudXNlRXhpc3Rpbmc7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5oYXNQcm92aWRlVG9rZW4gPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuICEhcHJvdmlkZXIucHJvdmlkZTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmxhenlJbmplY3RzID0gbmV3IFNldCgpO1xuICAgIHJldHVybiBSZWdpc3RyeTtcbn0oKSk7XG5leHBvcnRzLlJlZ2lzdHJ5ID0gUmVnaXN0cnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWdpc3RyeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xudmFyIGluamVjdGlvbl90b2tlbl8xID0gcmVxdWlyZShcIi4vbW9kdWxlL2luamVjdGlvbi10b2tlblwiKTtcbmV4cG9ydHMuQVBQX0lOSVQgPSBuZXcgaW5qZWN0aW9uX3Rva2VuXzEuSW5qZWN0aW9uVG9rZW4oJ0luaXRpYWxpemU8QXBwPicpO1xuZXhwb3J0cy5BUFBfREVTVFJPWSA9IG5ldyBpbmplY3Rpb25fdG9rZW5fMS5JbmplY3Rpb25Ub2tlbignRGVzdHJveTxBcHA+Jyk7XG5leHBvcnRzLk1PRFVMRV9JTklUID0gbmV3IGluamVjdGlvbl90b2tlbl8xLkluamVjdGlvblRva2VuKCdJbml0aWFsaXplPE1vZHVsZT4nKTtcbmV4cG9ydHMuT05FX01PRFVMRSA9IG5ldyBpbmplY3Rpb25fdG9rZW5fMS5JbmplY3Rpb25Ub2tlbignUmVmPE1vZHVsZT4nKTtcbnZhciBJbmplY3RvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEluamVjdG9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEluamVjdG9yKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBJbmplY3Rvcjtcbn0oaW52ZXJzaWZ5XzEuQ29udGFpbmVyKSk7XG5leHBvcnRzLkluamVjdG9yID0gSW5qZWN0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZCkgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG52YXIgVXRpbHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFV0aWxzKCkge1xuICAgIH1cbiAgICBVdGlscy5pc05vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoIXRoaXMuaXNOaWwocHJvY2VzcykgJiZcbiAgICAgICAgICAgIHRoaXMuaXNPYmplY3QocHJvY2Vzcy5yZWxlYXNlKSAmJlxuICAgICAgICAgICAgcHJvY2Vzcy5yZWxlYXNlLm5hbWUgPT09ICdub2RlJyk7XG4gICAgfTtcbiAgICBVdGlscy5wcm9jZXNzRXhpdCA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgIGlmIChjb2RlID09PSB2b2lkIDApIHsgY29kZSA9IDA7IH1cbiAgICAgICAgaWYgKHRoaXMuaXNOb2RlKCkpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdChjb2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVXRpbHMuaXNFbGVjdHJvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTmlsKHdpbmRvdykgJiZcbiAgICAgICAgICAgIHRoaXMuaXNPYmplY3Qod2luZG93LnByb2Nlc3MpICYmXG4gICAgICAgICAgICB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmICghdGhpcy5pc05pbChwcm9jZXNzKSAmJlxuICAgICAgICAgICAgdGhpcy5pc09iamVjdChwcm9jZXNzLnZlcnNpb25zKSAmJlxuICAgICAgICAgICAgIXRoaXMuaXNOaWwocHJvY2Vzcy52ZXJzaW9ucy5lbGVjdHJvbikpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlzT2JqZWN0KG5hdmlnYXRvcikgJiZcbiAgICAgICAgICAgIHRoaXMuaXNTdHJpbmcobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoJ0VsZWN0cm9uJykpO1xuICAgIH07XG4gICAgVXRpbHMubG9hZFBhY2thZ2UgPSBmdW5jdGlvbiAobmFtZSwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgcmVxdWlyZShuYW1lKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeUV4Y2VwdGlvbihuYW1lLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFV0aWxzLmlzRW1wdHkgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuICEoYXJyYXkgJiYgYXJyYXkubGVuZ3RoID4gMCk7XG4gICAgfTtcbiAgICBVdGlscy5nZXREZWZlcnJlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQcm9taXNlKHZhbHVlKSkgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgM107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyLCBfYV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVXRpbHMuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbCAmJiB0aGlzLmlzRnVuY3Rpb24odmFsW1N5bWJvbC5pdGVyYXRvcl0pO1xuICAgIH07XG4gICAgVXRpbHMuaXNQcm9taXNlID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsICYmIHRoaXMuaXNGdW5jdGlvbih2YWwudGhlbik7XG4gICAgfTtcbiAgICBVdGlscy5pc09ic2VydmFibGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWwgJiYgdGhpcy5pc0Z1bmN0aW9uKHZhbC5zdWJzY3JpYmUpO1xuICAgIH07XG4gICAgVXRpbHMuaXNTeW1ib2wgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3ltYm9sJztcbiAgICB9O1xuICAgIFV0aWxzLmlzTmFtZWRGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuICh2YWwgJiZcbiAgICAgICAgICAgICEhdmFsLm5hbWUgJiZcbiAgICAgICAgICAgICh0aGlzLmlzRnVuY3Rpb24odmFsKSB8fCB0aGlzLmlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yKSkpO1xuICAgIH07XG4gICAgVXRpbHMuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG4gICAgfTtcbiAgICBVdGlscy5pc051bWJlciA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xuICAgIH07XG4gICAgVXRpbHMuaXNCb29sZWFuID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nO1xuICAgIH07XG4gICAgVXRpbHMuaXNTdHJpbmcgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbiAgICB9O1xuICAgIFV0aWxzLmlzTmlsID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1VuZGVmaW5lZCh2YWwpIHx8IHZhbCA9PT0gbnVsbDtcbiAgICB9O1xuICAgIFV0aWxzLmlzT2JqZWN0ID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG4gICAgfTtcbiAgICBVdGlscy5pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xuICAgIH07XG4gICAgVXRpbHMucHJvbWlzaWZ5ID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzRnVuY3Rpb24oZm4pKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHByb21pc2lmeSBhIG5vbiBmdW5jdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShmbikpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBmbi5hcHBseSh2b2lkIDAsIF9fc3ByZWFkKGFyZ3MsIFtmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN0W19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlLmFwcGx5KHZvaWQgMCwgX19zcHJlYWQocmVzdCkpO1xuICAgICAgICAgICAgICAgICAgICB9XSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBVdGlscy5nZXRWYWx1ZXMgPSBmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICByZXR1cm4gX19zcHJlYWQoZW50cmllcykubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIF9iID0gX19yZWFkKF9hLCAyKSwgXyA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFV0aWxzLmNvbmNhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByb3BzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBwcm9wc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIF9fc3ByZWFkKHByb3BzKSk7XG4gICAgfTtcbiAgICBVdGlscy5mbGF0dGVuID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXMsIGN1cnJlbnQpIHsgcmV0dXJuIF9fc3ByZWFkKHByZXZpb3VzLCBjdXJyZW50KTsgfSwgW10pO1xuICAgIH07XG4gICAgVXRpbHMub21pdCA9IGZ1bmN0aW9uIChmcm9tKSB7XG4gICAgICAgIHZhciBieSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYnlbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVfMiwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBieV8xID0gX192YWx1ZXMoYnkpLCBieV8xXzEgPSBieV8xLm5leHQoKTsgIWJ5XzFfMS5kb25lOyBieV8xXzEgPSBieV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBieV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZyb21ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ5XzFfMSAmJiAhYnlfMV8xLmRvbmUgJiYgKF9hID0gYnlfMS5yZXR1cm4pKSBfYS5jYWxsKGJ5XzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcm9tO1xuICAgIH07XG4gICAgVXRpbHMuc2VyaWVzID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzMsIF9hLCBwcm9taXNlc18xLCBwcm9taXNlc18xXzEsIHByb21pc2UsIGVfM18xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFswLCA1LCA2LCA3XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlc18xID0gX192YWx1ZXMocHJvbWlzZXMpLCBwcm9taXNlc18xXzEgPSBwcm9taXNlc18xLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhcHJvbWlzZXNfMV8xLmRvbmUpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZXNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBwcm9taXNlXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlc18xXzEgPSBwcm9taXNlc18xLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszLCA3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8zXzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzMgPSB7IGVycm9yOiBlXzNfMSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvbWlzZXNfMV8xICYmICFwcm9taXNlc18xXzEuZG9uZSAmJiAoX2EgPSBwcm9taXNlc18xLnJldHVybikpIF9hLmNhbGwocHJvbWlzZXNfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVXRpbHMuZmlsdGVyV2hlbiA9IGZ1bmN0aW9uIChhcnIsIHN0YXRlbWVudCwgZmlsdGVyKSB7XG4gICAgICAgIHJldHVybiAhIXN0YXRlbWVudCA/IGFyci5maWx0ZXIoZmlsdGVyKSA6IGFycjtcbiAgICB9O1xuICAgIFV0aWxzLnBpY2sgPSBmdW5jdGlvbiAoZnJvbSwgYnkpIHtcbiAgICAgICAgcmV0dXJuIGZyb20uZmlsdGVyKGZ1bmN0aW9uIChmKSB7IHJldHVybiBieS5pbmNsdWRlcyhmKTsgfSk7XG4gICAgfTtcbiAgICBVdGlscy5jcmVhdGVEZWZlcnJlZFByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXNvbHZlO1xuICAgICAgICB2YXIgcmVqZWN0O1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAoX3Jlc29sdmUsIF9yZWplY3QpIHtcbiAgICAgICAgICAgIHJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHJlamVjdCA9IF9yZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XG4gICAgfTtcbiAgICBVdGlscy50cmFuc2Zvcm1SZXN1bHQgPSBmdW5jdGlvbiAocmVzdWx0T3JEZWZlcnJlZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNPYnNlcnZhYmxlKHJlc3VsdE9yRGVmZXJyZWQpKSByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCByZXN1bHRPckRlZmVycmVkLnRvUHJvbWlzZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIsIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFs0LCByZXN1bHRPckRlZmVycmVkXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzIsIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFV0aWxzO1xufSgpKTtcbmV4cG9ydHMuVXRpbHMgPSBVdGlscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSU5KRUNUSU9OID0gU3ltYm9sLmZvcihcIklOSkVDVElPTlwiKTtcbmZ1bmN0aW9uIF9wcm94eUdldHRlcihwcm90bywga2V5LCByZXNvbHZlLCBkb0NhY2hlKSB7XG4gICAgZnVuY3Rpb24gZ2V0dGVyKCkge1xuICAgICAgICBpZiAoZG9DYWNoZSAmJiAhUmVmbGVjdC5oYXNNZXRhZGF0YShJTkpFQ1RJT04sIHRoaXMsIGtleSkpIHtcbiAgICAgICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoSU5KRUNUSU9OLCByZXNvbHZlKCksIHRoaXMsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFJlZmxlY3QuaGFzTWV0YWRhdGEoSU5KRUNUSU9OLCB0aGlzLCBrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YShJTkpFQ1RJT04sIHRoaXMsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldHRlcihuZXdWYWwpIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShJTkpFQ1RJT04sIG5ld1ZhbCwgdGhpcywga2V5KTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCBrZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgc2V0OiBzZXR0ZXJcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG1ha2VQcm9wZXJ0eUluamVjdERlY29yYXRvcihjb250YWluZXIsIGRvQ2FjaGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvdG8sIGtleSkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF9wcm94eUdldHRlcihwcm90bywga2V5LCByZXNvbHZlLCBkb0NhY2hlKTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuZXhwb3J0cy5tYWtlUHJvcGVydHlJbmplY3REZWNvcmF0b3IgPSBtYWtlUHJvcGVydHlJbmplY3REZWNvcmF0b3I7XG5mdW5jdGlvbiBtYWtlUHJvcGVydHlJbmplY3ROYW1lZERlY29yYXRvcihjb250YWluZXIsIGRvQ2FjaGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciByZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXIuZ2V0TmFtZWQoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfcHJveHlHZXR0ZXIocHJvdG8sIGtleSwgcmVzb2x2ZSwgZG9DYWNoZSk7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbmV4cG9ydHMubWFrZVByb3BlcnR5SW5qZWN0TmFtZWREZWNvcmF0b3IgPSBtYWtlUHJvcGVydHlJbmplY3ROYW1lZERlY29yYXRvcjtcbmZ1bmN0aW9uIG1ha2VQcm9wZXJ0eUluamVjdFRhZ2dlZERlY29yYXRvcihjb250YWluZXIsIGRvQ2FjaGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvdG8sIHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5nZXRUYWdnZWQoc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF9wcm94eUdldHRlcihwcm90bywgcHJvcGVydHlOYW1lLCByZXNvbHZlLCBkb0NhY2hlKTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuZXhwb3J0cy5tYWtlUHJvcGVydHlJbmplY3RUYWdnZWREZWNvcmF0b3IgPSBtYWtlUHJvcGVydHlJbmplY3RUYWdnZWREZWNvcmF0b3I7XG5mdW5jdGlvbiBtYWtlUHJvcGVydHlNdWx0aUluamVjdERlY29yYXRvcihjb250YWluZXIsIGRvQ2FjaGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvdG8sIGtleSkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5nZXRBbGwoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF9wcm94eUdldHRlcihwcm90bywga2V5LCByZXNvbHZlLCBkb0NhY2hlKTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuZXhwb3J0cy5tYWtlUHJvcGVydHlNdWx0aUluamVjdERlY29yYXRvciA9IG1ha2VQcm9wZXJ0eU11bHRpSW5qZWN0RGVjb3JhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZGVjb3JhdG9yc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yc1wiKTtcbmZ1bmN0aW9uIGdldERlY29yYXRvcnMoY29udGFpbmVyLCBkb0NhY2hlKSB7XG4gICAgaWYgKGRvQ2FjaGUgPT09IHZvaWQgMCkgeyBkb0NhY2hlID0gdHJ1ZTsgfVxuICAgIHZhciBsYXp5SW5qZWN0ID0gZGVjb3JhdG9yc18xLm1ha2VQcm9wZXJ0eUluamVjdERlY29yYXRvcihjb250YWluZXIsIGRvQ2FjaGUpO1xuICAgIHZhciBsYXp5SW5qZWN0TmFtZWQgPSBkZWNvcmF0b3JzXzEubWFrZVByb3BlcnR5SW5qZWN0TmFtZWREZWNvcmF0b3IoY29udGFpbmVyLCBkb0NhY2hlKTtcbiAgICB2YXIgbGF6eUluamVjdFRhZ2dlZCA9IGRlY29yYXRvcnNfMS5tYWtlUHJvcGVydHlJbmplY3RUYWdnZWREZWNvcmF0b3IoY29udGFpbmVyLCBkb0NhY2hlKTtcbiAgICB2YXIgbGF6eU11bHRpSW5qZWN0ID0gZGVjb3JhdG9yc18xLm1ha2VQcm9wZXJ0eU11bHRpSW5qZWN0RGVjb3JhdG9yKGNvbnRhaW5lciwgZG9DYWNoZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGF6eUluamVjdDogbGF6eUluamVjdCxcbiAgICAgICAgbGF6eUluamVjdE5hbWVkOiBsYXp5SW5qZWN0TmFtZWQsXG4gICAgICAgIGxhenlJbmplY3RUYWdnZWQ6IGxhenlJbmplY3RUYWdnZWQsXG4gICAgICAgIGxhenlNdWx0aUluamVjdDogbGF6eU11bHRpSW5qZWN0XG4gICAgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGdldERlY29yYXRvcnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbmZ1bmN0aW9uIHRhZ1BhcmFtZXRlcihhbm5vdGF0aW9uVGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIHBhcmFtZXRlckluZGV4LCBtZXRhZGF0YSkge1xuICAgIHZhciBtZXRhZGF0YUtleSA9IE1FVEFEQVRBX0tFWS5UQUdHRUQ7XG4gICAgX3RhZ1BhcmFtZXRlck9yUHJvcGVydHkobWV0YWRhdGFLZXksIGFubm90YXRpb25UYXJnZXQsIHByb3BlcnR5TmFtZSwgbWV0YWRhdGEsIHBhcmFtZXRlckluZGV4KTtcbn1cbmV4cG9ydHMudGFnUGFyYW1ldGVyID0gdGFnUGFyYW1ldGVyO1xuZnVuY3Rpb24gdGFnUHJvcGVydHkoYW5ub3RhdGlvblRhcmdldCwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSkge1xuICAgIHZhciBtZXRhZGF0YUtleSA9IE1FVEFEQVRBX0tFWS5UQUdHRURfUFJPUDtcbiAgICBfdGFnUGFyYW1ldGVyT3JQcm9wZXJ0eShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldC5jb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSk7XG59XG5leHBvcnRzLnRhZ1Byb3BlcnR5ID0gdGFnUHJvcGVydHk7XG5mdW5jdGlvbiBfdGFnUGFyYW1ldGVyT3JQcm9wZXJ0eShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSwgcGFyYW1ldGVySW5kZXgpIHtcbiAgICB2YXIgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGEgPSB7fTtcbiAgICB2YXIgaXNQYXJhbWV0ZXJEZWNvcmF0b3IgPSAodHlwZW9mIHBhcmFtZXRlckluZGV4ID09PSBcIm51bWJlclwiKTtcbiAgICB2YXIga2V5ID0gKHBhcmFtZXRlckluZGV4ICE9PSB1bmRlZmluZWQgJiYgaXNQYXJhbWV0ZXJEZWNvcmF0b3IpID8gcGFyYW1ldGVySW5kZXgudG9TdHJpbmcoKSA6IHByb3BlcnR5TmFtZTtcbiAgICBpZiAoaXNQYXJhbWV0ZXJEZWNvcmF0b3IgJiYgcHJvcGVydHlOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuSU5WQUxJRF9ERUNPUkFUT1JfT1BFUkFUSU9OKTtcbiAgICB9XG4gICAgaWYgKFJlZmxlY3QuaGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIGFubm90YXRpb25UYXJnZXQpKSB7XG4gICAgICAgIHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCk7XG4gICAgfVxuICAgIHZhciBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YSA9IHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhW2tleV07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhKSkge1xuICAgICAgICBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YSA9IFtdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YV8xID0gcGFyYW1PclByb3BlcnR5TWV0YWRhdGE7IF9pIDwgcGFyYW1PclByb3BlcnR5TWV0YWRhdGFfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBtID0gcGFyYW1PclByb3BlcnR5TWV0YWRhdGFfMVtfaV07XG4gICAgICAgICAgICBpZiAobS5rZXkgPT09IG1ldGFkYXRhLmtleSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLkRVUExJQ0FURURfTUVUQURBVEEgKyBcIiBcIiArIG0ua2V5LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhLnB1c2gobWV0YWRhdGEpO1xuICAgIHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhW2tleV0gPSBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YTtcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCBwYXJhbXNPclByb3BlcnRpZXNNZXRhZGF0YSwgYW5ub3RhdGlvblRhcmdldCk7XG59XG5mdW5jdGlvbiBfZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0KSB7XG4gICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQpO1xufVxuZnVuY3Rpb24gX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfTtcbn1cbmZ1bmN0aW9uIGRlY29yYXRlKGRlY29yYXRvciwgdGFyZ2V0LCBwYXJhbWV0ZXJJbmRleCkge1xuICAgIGlmICh0eXBlb2YgcGFyYW1ldGVySW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgX2RlY29yYXRlKFtfcGFyYW0ocGFyYW1ldGVySW5kZXgsIGRlY29yYXRvcildLCB0YXJnZXQpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgcGFyYW1ldGVySW5kZXggPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgUmVmbGVjdC5kZWNvcmF0ZShbZGVjb3JhdG9yXSwgdGFyZ2V0LCBwYXJhbWV0ZXJJbmRleCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZGVjb3JhdGUoW2RlY29yYXRvcl0sIHRhcmdldCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWNvcmF0ZSA9IGRlY29yYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JfbXNnc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xudmFyIExhenlTZXJ2aWNlSWRlbnRpZmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYXp5U2VydmljZUlkZW50aWZlcihjYikge1xuICAgICAgICB0aGlzLl9jYiA9IGNiO1xuICAgIH1cbiAgICBMYXp5U2VydmljZUlkZW50aWZlci5wcm90b3R5cGUudW53cmFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2IoKTtcbiAgICB9O1xuICAgIHJldHVybiBMYXp5U2VydmljZUlkZW50aWZlcjtcbn0oKSk7XG5leHBvcnRzLkxhenlTZXJ2aWNlSWRlbnRpZmVyID0gTGF6eVNlcnZpY2VJZGVudGlmZXI7XG5mdW5jdGlvbiBpbmplY3Qoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yX21zZ3NfMS5VTkRFRklORURfSU5KRUNUX0FOTk9UQVRJT04odGFyZ2V0Lm5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuSU5KRUNUX1RBRywgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuaW5qZWN0ID0gaW5qZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JTX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xuZnVuY3Rpb24gaW5qZWN0YWJsZSgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAoUmVmbGVjdC5oYXNPd25NZXRhZGF0YShNRVRBREFUQV9LRVkuUEFSQU1fVFlQRVMsIHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUlNfTVNHUy5EVVBMSUNBVEVEX0lOSkVDVEFCTEVfREVDT1JBVE9SKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHlwZXMgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5ERVNJR05fUEFSQU1fVFlQRVMsIHRhcmdldCkgfHwgW107XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBBUkFNX1RZUEVTLCB0eXBlcywgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xufVxuZXhwb3J0cy5pbmplY3RhYmxlID0gaW5qZWN0YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gbXVsdGlJbmplY3Qoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRywgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMubXVsdGlJbmplY3QgPSBtdWx0aUluamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gbmFtZWQobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWUpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMubmFtZWQgPSBuYW1lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gb3B0aW9uYWwoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLk9QVElPTkFMX1RBRywgdHJ1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5vcHRpb25hbCA9IG9wdGlvbmFsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JTX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG5mdW5jdGlvbiBwb3N0Q29uc3RydWN0KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgaWYgKFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCB0YXJnZXQuY29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JTX01TR1MuTVVMVElQTEVfUE9TVF9DT05TVFJVQ1RfTUVUSE9EUyk7XG4gICAgICAgIH1cbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIG1ldGFkYXRhLCB0YXJnZXQuY29uc3RydWN0b3IpO1xuICAgIH07XG59XG5leHBvcnRzLnBvc3RDb25zdHJ1Y3QgPSBwb3N0Q29uc3RydWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIHRhZ2dlZChtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUHJvcGVydHkodGFyZ2V0LCB0YXJnZXRLZXksIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLnRhZ2dlZCA9IHRhZ2dlZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gdGFyZ2V0TmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLk5BTUVfVEFHLCBuYW1lKTtcbiAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgIH07XG59XG5leHBvcnRzLnRhcmdldE5hbWUgPSB0YXJnZXROYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiB1bm1hbmFnZWQoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUcsIHRydWUpO1xuICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgfTtcbn1cbmV4cG9ydHMudW5tYW5hZ2VkID0gdW5tYW5hZ2VkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgQmluZGluZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZyhzZXJ2aWNlSWRlbnRpZmllciwgc2NvcGUpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW52YWxpZDtcbiAgICAgICAgdGhpcy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHsgcmV0dXJuIHRydWU7IH07XG4gICAgICAgIHRoaXMuaW1wbGVtZW50YXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmFjdG9yeSA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLm9uQWN0aXZhdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuZHluYW1pY1ZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgQmluZGluZy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbG9uZSA9IG5ldyBCaW5kaW5nKHRoaXMuc2VydmljZUlkZW50aWZpZXIsIHRoaXMuc2NvcGUpO1xuICAgICAgICBjbG9uZS5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgY2xvbmUuaW1wbGVtZW50YXRpb25UeXBlID0gdGhpcy5pbXBsZW1lbnRhdGlvblR5cGU7XG4gICAgICAgIGNsb25lLmR5bmFtaWNWYWx1ZSA9IHRoaXMuZHluYW1pY1ZhbHVlO1xuICAgICAgICBjbG9uZS5zY29wZSA9IHRoaXMuc2NvcGU7XG4gICAgICAgIGNsb25lLnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgIGNsb25lLmZhY3RvcnkgPSB0aGlzLmZhY3Rvcnk7XG4gICAgICAgIGNsb25lLnByb3ZpZGVyID0gdGhpcy5wcm92aWRlcjtcbiAgICAgICAgY2xvbmUuY29uc3RyYWludCA9IHRoaXMuY29uc3RyYWludDtcbiAgICAgICAgY2xvbmUub25BY3RpdmF0aW9uID0gdGhpcy5vbkFjdGl2YXRpb247XG4gICAgICAgIGNsb25lLmNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmc7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nID0gQmluZGluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJpbmRpbmdDb3VudCA9IHtcbiAgICBNdWx0aXBsZUJpbmRpbmdzQXZhaWxhYmxlOiAyLFxuICAgIE5vQmluZGluZ3NBdmFpbGFibGU6IDAsXG4gICAgT25seU9uZUJpbmRpbmdBdmFpbGFibGU6IDFcbn07XG5leHBvcnRzLkJpbmRpbmdDb3VudCA9IEJpbmRpbmdDb3VudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EVVBMSUNBVEVEX0lOSkVDVEFCTEVfREVDT1JBVE9SID0gXCJDYW5ub3QgYXBwbHkgQGluamVjdGFibGUgZGVjb3JhdG9yIG11bHRpcGxlIHRpbWVzLlwiO1xuZXhwb3J0cy5EVVBMSUNBVEVEX01FVEFEQVRBID0gXCJNZXRhZGF0YSBrZXkgd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UgaW4gYSBwYXJhbWV0ZXI6XCI7XG5leHBvcnRzLk5VTExfQVJHVU1FTlQgPSBcIk5VTEwgYXJndW1lbnRcIjtcbmV4cG9ydHMuS0VZX05PVF9GT1VORCA9IFwiS2V5IE5vdCBGb3VuZFwiO1xuZXhwb3J0cy5BTUJJR1VPVVNfTUFUQ0ggPSBcIkFtYmlndW91cyBtYXRjaCBmb3VuZCBmb3Igc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLkNBTk5PVF9VTkJJTkQgPSBcIkNvdWxkIG5vdCB1bmJpbmQgc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLk5PVF9SRUdJU1RFUkVEID0gXCJObyBtYXRjaGluZyBiaW5kaW5ncyBmb3VuZCBmb3Igc2VydmljZUlkZW50aWZpZXI6XCI7XG5leHBvcnRzLk1JU1NJTkdfSU5KRUNUQUJMRV9BTk5PVEFUSU9OID0gXCJNaXNzaW5nIHJlcXVpcmVkIEBpbmplY3RhYmxlIGFubm90YXRpb24gaW46XCI7XG5leHBvcnRzLk1JU1NJTkdfSU5KRUNUX0FOTk9UQVRJT04gPSBcIk1pc3NpbmcgcmVxdWlyZWQgQGluamVjdCBvciBAbXVsdGlJbmplY3QgYW5ub3RhdGlvbiBpbjpcIjtcbmV4cG9ydHMuVU5ERUZJTkVEX0lOSkVDVF9BTk5PVEFUSU9OID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gXCJAaW5qZWN0IGNhbGxlZCB3aXRoIHVuZGVmaW5lZCB0aGlzIGNvdWxkIG1lYW4gdGhhdCB0aGUgY2xhc3MgXCIgKyBuYW1lICsgXCIgaGFzIFwiICtcbiAgICAgICAgXCJhIGNpcmN1bGFyIGRlcGVuZGVuY3kgcHJvYmxlbS4gWW91IGNhbiB1c2UgYSBMYXp5U2VydmljZUlkZW50aWZlciB0byAgXCIgK1xuICAgICAgICBcIm92ZXJjb21lIHRoaXMgbGltaXRhdGlvbi5cIjtcbn07XG5leHBvcnRzLkNJUkNVTEFSX0RFUEVOREVOQ1kgPSBcIkNpcmN1bGFyIGRlcGVuZGVuY3kgZm91bmQ6XCI7XG5leHBvcnRzLk5PVF9JTVBMRU1FTlRFRCA9IFwiU29ycnksIHRoaXMgZmVhdHVyZSBpcyBub3QgZnVsbHkgaW1wbGVtZW50ZWQgeWV0LlwiO1xuZXhwb3J0cy5JTlZBTElEX0JJTkRJTkdfVFlQRSA9IFwiSW52YWxpZCBiaW5kaW5nIHR5cGU6XCI7XG5leHBvcnRzLk5PX01PUkVfU05BUFNIT1RTX0FWQUlMQUJMRSA9IFwiTm8gc25hcHNob3QgYXZhaWxhYmxlIHRvIHJlc3RvcmUuXCI7XG5leHBvcnRzLklOVkFMSURfTUlERExFV0FSRV9SRVRVUk4gPSBcIkludmFsaWQgcmV0dXJuIHR5cGUgaW4gbWlkZGxld2FyZS4gTWlkZGxld2FyZSBtdXN0IHJldHVybiFcIjtcbmV4cG9ydHMuSU5WQUxJRF9GVU5DVElPTl9CSU5ESU5HID0gXCJWYWx1ZSBwcm92aWRlZCB0byBmdW5jdGlvbiBiaW5kaW5nIG11c3QgYmUgYSBmdW5jdGlvbiFcIjtcbmV4cG9ydHMuSU5WQUxJRF9UT19TRUxGX1ZBTFVFID0gXCJUaGUgdG9TZWxmIGZ1bmN0aW9uIGNhbiBvbmx5IGJlIGFwcGxpZWQgd2hlbiBhIGNvbnN0cnVjdG9yIGlzIFwiICtcbiAgICBcInVzZWQgYXMgc2VydmljZSBpZGVudGlmaWVyXCI7XG5leHBvcnRzLklOVkFMSURfREVDT1JBVE9SX09QRVJBVElPTiA9IFwiVGhlIEBpbmplY3QgQG11bHRpSW5qZWN0IEB0YWdnZWQgYW5kIEBuYW1lZCBkZWNvcmF0b3JzIFwiICtcbiAgICBcIm11c3QgYmUgYXBwbGllZCB0byB0aGUgcGFyYW1ldGVycyBvZiBhIGNsYXNzIGNvbnN0cnVjdG9yIG9yIGEgY2xhc3MgcHJvcGVydHkuXCI7XG5leHBvcnRzLkFSR1VNRU5UU19MRU5HVEhfTUlTTUFUQ0ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gXCJUaGUgbnVtYmVyIG9mIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBpbiB0aGUgZGVyaXZlZCBjbGFzcyBcIiArXG4gICAgICAgICh2YWx1ZXNbMF0gKyBcIiBtdXN0IGJlID49IHRoYW4gdGhlIG51bWJlciBvZiBjb25zdHJ1Y3RvciBhcmd1bWVudHMgb2YgaXRzIGJhc2UgY2xhc3MuXCIpO1xufTtcbmV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfTVVTVF9CRV9BTl9PQkpFQ1QgPSBcIkludmFsaWQgQ29udGFpbmVyIGNvbnN0cnVjdG9yIGFyZ3VtZW50LiBDb250YWluZXIgb3B0aW9ucyBcIiArXG4gICAgXCJtdXN0IGJlIGFuIG9iamVjdC5cIjtcbmV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9ERUZBVUxUX1NDT1BFID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIERlZmF1bHQgc2NvcGUgbXVzdCBcIiArXG4gICAgXCJiZSBhIHN0cmluZyAoJ3NpbmdsZXRvbicgb3IgJ3RyYW5zaWVudCcpLlwiO1xuZXhwb3J0cy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0FVVE9fQklORF9JTkpFQ1RBQkxFID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIEF1dG8gYmluZCBpbmplY3RhYmxlIG11c3QgXCIgK1xuICAgIFwiYmUgYSBib29sZWFuXCI7XG5leHBvcnRzLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfU0tJUF9CQVNFX0NIRUNLID0gXCJJbnZhbGlkIENvbnRhaW5lciBvcHRpb24uIFNraXAgYmFzZSBjaGVjayBtdXN0IFwiICtcbiAgICBcImJlIGEgYm9vbGVhblwiO1xuZXhwb3J0cy5NVUxUSVBMRV9QT1NUX0NPTlNUUlVDVF9NRVRIT0RTID0gXCJDYW5ub3QgYXBwbHkgQHBvc3RDb25zdHJ1Y3QgZGVjb3JhdG9yIG11bHRpcGxlIHRpbWVzIGluIHRoZSBzYW1lIGNsYXNzXCI7XG5leHBvcnRzLlBPU1RfQ09OU1RSVUNUX0VSUk9SID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YWx1ZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIFwiQHBvc3RDb25zdHJ1Y3QgZXJyb3IgaW4gY2xhc3MgXCIgKyB2YWx1ZXNbMF0gKyBcIjogXCIgKyB2YWx1ZXNbMV07XG59O1xuZXhwb3J0cy5DSVJDVUxBUl9ERVBFTkRFTkNZX0lOX0ZBQ1RPUlkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gXCJJdCBsb29rcyBsaWtlIHRoZXJlIGlzIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSBcIiArXG4gICAgICAgIChcImluIG9uZSBvZiB0aGUgJ1wiICsgdmFsdWVzWzBdICsgXCInIGJpbmRpbmdzLiBQbGVhc2UgaW52ZXN0aWdhdGUgYmluZGluZ3Mgd2l0aFwiKSArXG4gICAgICAgIChcInNlcnZpY2UgaWRlbnRpZmllciAnXCIgKyB2YWx1ZXNbMV0gKyBcIicuXCIpO1xufTtcbmV4cG9ydHMuU1RBQ0tfT1ZFUkZMT1cgPSBcIk1heGltdW0gY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCaW5kaW5nU2NvcGVFbnVtID0ge1xuICAgIFJlcXVlc3Q6IFwiUmVxdWVzdFwiLFxuICAgIFNpbmdsZXRvbjogXCJTaW5nbGV0b25cIixcbiAgICBUcmFuc2llbnQ6IFwiVHJhbnNpZW50XCJcbn07XG5leHBvcnRzLkJpbmRpbmdTY29wZUVudW0gPSBCaW5kaW5nU2NvcGVFbnVtO1xudmFyIEJpbmRpbmdUeXBlRW51bSA9IHtcbiAgICBDb25zdGFudFZhbHVlOiBcIkNvbnN0YW50VmFsdWVcIixcbiAgICBDb25zdHJ1Y3RvcjogXCJDb25zdHJ1Y3RvclwiLFxuICAgIER5bmFtaWNWYWx1ZTogXCJEeW5hbWljVmFsdWVcIixcbiAgICBGYWN0b3J5OiBcIkZhY3RvcnlcIixcbiAgICBGdW5jdGlvbjogXCJGdW5jdGlvblwiLFxuICAgIEluc3RhbmNlOiBcIkluc3RhbmNlXCIsXG4gICAgSW52YWxpZDogXCJJbnZhbGlkXCIsXG4gICAgUHJvdmlkZXI6IFwiUHJvdmlkZXJcIlxufTtcbmV4cG9ydHMuQmluZGluZ1R5cGVFbnVtID0gQmluZGluZ1R5cGVFbnVtO1xudmFyIFRhcmdldFR5cGVFbnVtID0ge1xuICAgIENsYXNzUHJvcGVydHk6IFwiQ2xhc3NQcm9wZXJ0eVwiLFxuICAgIENvbnN0cnVjdG9yQXJndW1lbnQ6IFwiQ29uc3RydWN0b3JBcmd1bWVudFwiLFxuICAgIFZhcmlhYmxlOiBcIlZhcmlhYmxlXCJcbn07XG5leHBvcnRzLlRhcmdldFR5cGVFbnVtID0gVGFyZ2V0VHlwZUVudW07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTkFNRURfVEFHID0gXCJuYW1lZFwiO1xuZXhwb3J0cy5OQU1FX1RBRyA9IFwibmFtZVwiO1xuZXhwb3J0cy5VTk1BTkFHRURfVEFHID0gXCJ1bm1hbmFnZWRcIjtcbmV4cG9ydHMuT1BUSU9OQUxfVEFHID0gXCJvcHRpb25hbFwiO1xuZXhwb3J0cy5JTkpFQ1RfVEFHID0gXCJpbmplY3RcIjtcbmV4cG9ydHMuTVVMVElfSU5KRUNUX1RBRyA9IFwibXVsdGlfaW5qZWN0XCI7XG5leHBvcnRzLlRBR0dFRCA9IFwiaW52ZXJzaWZ5OnRhZ2dlZFwiO1xuZXhwb3J0cy5UQUdHRURfUFJPUCA9IFwiaW52ZXJzaWZ5OnRhZ2dlZF9wcm9wc1wiO1xuZXhwb3J0cy5QQVJBTV9UWVBFUyA9IFwiaW52ZXJzaWZ5OnBhcmFtdHlwZXNcIjtcbmV4cG9ydHMuREVTSUdOX1BBUkFNX1RZUEVTID0gXCJkZXNpZ246cGFyYW10eXBlc1wiO1xuZXhwb3J0cy5QT1NUX0NPTlNUUlVDVCA9IFwicG9zdF9jb25zdHJ1Y3RcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYmluZGluZ18xID0gcmVxdWlyZShcIi4uL2JpbmRpbmdzL2JpbmRpbmdcIik7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhX3JlYWRlcl8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhX3JlYWRlclwiKTtcbnZhciBwbGFubmVyXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvcGxhbm5lclwiKTtcbnZhciByZXNvbHZlcl8xID0gcmVxdWlyZShcIi4uL3Jlc29sdXRpb24vcmVzb2x2ZXJcIik7XG52YXIgYmluZGluZ190b19zeW50YXhfMSA9IHJlcXVpcmUoXCIuLi9zeW50YXgvYmluZGluZ190b19zeW50YXhcIik7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VyaWFsaXphdGlvblwiKTtcbnZhciBjb250YWluZXJfc25hcHNob3RfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lcl9zbmFwc2hvdFwiKTtcbnZhciBsb29rdXBfMSA9IHJlcXVpcmUoXCIuL2xvb2t1cFwiKTtcbnZhciBDb250YWluZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcihjb250YWluZXJPcHRpb25zKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gY29udGFpbmVyT3B0aW9ucyB8fCB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIiArIEVSUk9SX01TR1MuQ09OVEFJTkVSX09QVElPTlNfTVVTVF9CRV9BTl9PQkpFQ1QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRTY29wZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRlZmF1bHRTY29wZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmRlZmF1bHRTY29wZSAhPT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uICYmXG4gICAgICAgICAgICBvcHRpb25zLmRlZmF1bHRTY29wZSAhPT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50ICYmXG4gICAgICAgICAgICBvcHRpb25zLmRlZmF1bHRTY29wZSAhPT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uUmVxdWVzdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfREVGQVVMVF9TQ09QRSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfQVVUT19CSU5EX0lOSkVDVEFCTEUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrcyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX1NLSVBfQkFTRV9DSEVDSyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgYXV0b0JpbmRJbmplY3RhYmxlOiBvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSxcbiAgICAgICAgICAgIGRlZmF1bHRTY29wZTogb3B0aW9ucy5kZWZhdWx0U2NvcGUsXG4gICAgICAgICAgICBza2lwQmFzZUNsYXNzQ2hlY2tzOiBvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkgPSBuZXcgbG9va3VwXzEuTG9va3VwKCk7XG4gICAgICAgIHRoaXMuX3NuYXBzaG90cyA9IFtdO1xuICAgICAgICB0aGlzLl9taWRkbGV3YXJlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVJlYWRlciA9IG5ldyBtZXRhZGF0YV9yZWFkZXJfMS5NZXRhZGF0YVJlYWRlcigpO1xuICAgIH1cbiAgICBDb250YWluZXIubWVyZ2UgPSBmdW5jdGlvbiAoY29udGFpbmVyMSwgY29udGFpbmVyMikge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IENvbnRhaW5lcigpO1xuICAgICAgICB2YXIgYmluZGluZ0RpY3Rpb25hcnkgPSBwbGFubmVyXzEuZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyKTtcbiAgICAgICAgdmFyIGJpbmRpbmdEaWN0aW9uYXJ5MSA9IHBsYW5uZXJfMS5nZXRCaW5kaW5nRGljdGlvbmFyeShjb250YWluZXIxKTtcbiAgICAgICAgdmFyIGJpbmRpbmdEaWN0aW9uYXJ5MiA9IHBsYW5uZXJfMS5nZXRCaW5kaW5nRGljdGlvbmFyeShjb250YWluZXIyKTtcbiAgICAgICAgZnVuY3Rpb24gY29weURpY3Rpb25hcnkob3JpZ2luLCBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgb3JpZ2luLnRyYXZlcnNlKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5hZGQoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZy5jbG9uZSgpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvcHlEaWN0aW9uYXJ5KGJpbmRpbmdEaWN0aW9uYXJ5MSwgYmluZGluZ0RpY3Rpb25hcnkpO1xuICAgICAgICBjb3B5RGljdGlvbmFyeShiaW5kaW5nRGljdGlvbmFyeTIsIGJpbmRpbmdEaWN0aW9uYXJ5KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1vZHVsZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG1vZHVsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ2V0SGVscGVycyA9IHRoaXMuX2dldENvbnRhaW5lck1vZHVsZUhlbHBlcnNGYWN0b3J5KCk7XG4gICAgICAgIGZvciAodmFyIF9hID0gMCwgbW9kdWxlc18xID0gbW9kdWxlczsgX2EgPCBtb2R1bGVzXzEubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudE1vZHVsZSA9IG1vZHVsZXNfMVtfYV07XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyTW9kdWxlSGVscGVycyA9IGdldEhlbHBlcnMoY3VycmVudE1vZHVsZS5pZCk7XG4gICAgICAgICAgICBjdXJyZW50TW9kdWxlLnJlZ2lzdHJ5KGNvbnRhaW5lck1vZHVsZUhlbHBlcnMuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnVuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLmlzYm91bmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5yZWJpbmRGdW5jdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUubG9hZEFzeW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbW9kdWxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBnZXRIZWxwZXJzLCBfYSwgbW9kdWxlc18yLCBjdXJyZW50TW9kdWxlLCBjb250YWluZXJNb2R1bGVIZWxwZXJzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SGVscGVycyA9IHRoaXMuX2dldENvbnRhaW5lck1vZHVsZUhlbHBlcnNGYWN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IDAsIG1vZHVsZXNfMiA9IG1vZHVsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKF9hIDwgbW9kdWxlc18yLmxlbmd0aCkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50TW9kdWxlID0gbW9kdWxlc18yW19hXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMgPSBnZXRIZWxwZXJzKGN1cnJlbnRNb2R1bGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBjdXJyZW50TW9kdWxlLnJlZ2lzdHJ5KGNvbnRhaW5lck1vZHVsZUhlbHBlcnMuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnVuYmluZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLmlzYm91bmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5yZWJpbmRGdW5jdGlvbildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hKys7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtb2R1bGVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBtb2R1bGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbmRpdGlvbkZhY3RvcnkgPSBmdW5jdGlvbiAoZXhwZWN0ZWQpIHsgcmV0dXJuIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5tb2R1bGVJZCA9PT0gZXhwZWN0ZWQ7XG4gICAgICAgIH07IH07XG4gICAgICAgIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgICB2YXIgY29uZGl0aW9uID0gY29uZGl0aW9uRmFjdG9yeShtb2R1bGUuaWQpO1xuICAgICAgICAgICAgX3RoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LnJlbW92ZUJ5Q29uZGl0aW9uKGNvbmRpdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHZhciBzY29wZSA9IHRoaXMub3B0aW9ucy5kZWZhdWx0U2NvcGUgfHwgbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50O1xuICAgICAgICB2YXIgYmluZGluZyA9IG5ldyBiaW5kaW5nXzEuQmluZGluZyhzZXJ2aWNlSWRlbnRpZmllciwgc2NvcGUpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5hZGQoc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmcpO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfdG9fc3ludGF4XzEuQmluZGluZ1RvU3ludGF4KGJpbmRpbmcpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZWJpbmQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdGhpcy51bmJpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5yZW1vdmUoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5DQU5OT1RfVU5CSU5EICsgXCIgXCIgKyBzZXJpYWxpemF0aW9uXzEuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhzZXJ2aWNlSWRlbnRpZmllcikpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkgPSBuZXcgbG9va3VwXzEuTG9va3VwKCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmlzQm91bmQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdmFyIGJvdW5kID0gdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuaGFzS2V5KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKCFib3VuZCAmJiB0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgYm91bmQgPSB0aGlzLnBhcmVudC5pc0JvdW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm91bmQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmlzQm91bmROYW1lZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNCb3VuZFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwgTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZWQpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0JvdW5kVGFnZ2VkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBib3VuZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuaGFzS2V5KHNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgdmFyIGJpbmRpbmdzID0gdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0XzEgPSBwbGFubmVyXzEuY3JlYXRlTW9ja1JlcXVlc3QodGhpcywgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgYm91bmQgPSBiaW5kaW5ncy5zb21lKGZ1bmN0aW9uIChiKSB7IHJldHVybiBiLmNvbnN0cmFpbnQocmVxdWVzdF8xKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFib3VuZCAmJiB0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgYm91bmQgPSB0aGlzLnBhcmVudC5pc0JvdW5kVGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm91bmQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnNuYXBzaG90ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zbmFwc2hvdHMucHVzaChjb250YWluZXJfc25hcHNob3RfMS5Db250YWluZXJTbmFwc2hvdC5vZih0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5jbG9uZSgpLCB0aGlzLl9taWRkbGV3YXJlKSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzbmFwc2hvdCA9IHRoaXMuX3NuYXBzaG90cy5wb3AoKTtcbiAgICAgICAgaWYgKHNuYXBzaG90ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5PX01PUkVfU05BUFNIT1RTX0FWQUlMQUJMRSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkgPSBzbmFwc2hvdC5iaW5kaW5ncztcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZSA9IHNuYXBzaG90Lm1pZGRsZXdhcmU7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKGNvbnRhaW5lck9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IENvbnRhaW5lcihjb250YWluZXJPcHRpb25zIHx8IHRoaXMub3B0aW9ucyk7XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuYXBwbHlNaWRkbGV3YXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWlkZGxld2FyZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG1pZGRsZXdhcmVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluaXRpYWwgPSAodGhpcy5fbWlkZGxld2FyZSkgPyB0aGlzLl9taWRkbGV3YXJlIDogdGhpcy5fcGxhbkFuZFJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZSA9IG1pZGRsZXdhcmVzLnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3VycikgeyByZXR1cm4gY3VycihwcmV2KTsgfSwgaW5pdGlhbCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmFwcGx5Q3VzdG9tTWV0YWRhdGFSZWFkZXIgPSBmdW5jdGlvbiAobWV0YWRhdGFSZWFkZXIpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFSZWFkZXIgPSBtZXRhZGF0YVJlYWRlcjtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQoZmFsc2UsIGZhbHNlLCBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQoZmFsc2UsIGZhbHNlLCBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0TmFtZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwgTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZWQpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldCh0cnVlLCB0cnVlLCBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsVGFnZ2VkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQoZmFsc2UsIHRydWUsIGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5WYXJpYWJsZSwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGxOYW1lZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsVGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lZCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jdGlvbikge1xuICAgICAgICB2YXIgdGVtcENvbnRhaW5lciA9IHRoaXMuY3JlYXRlQ2hpbGQoKTtcbiAgICAgICAgdGVtcENvbnRhaW5lci5iaW5kKGNvbnN0cnVjdG9yRnVuY3Rpb24pLnRvU2VsZigpO1xuICAgICAgICByZXR1cm4gdGVtcENvbnRhaW5lci5nZXQoY29uc3RydWN0b3JGdW5jdGlvbik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9nZXRDb250YWluZXJNb2R1bGVIZWxwZXJzRmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNldE1vZHVsZUlkID0gZnVuY3Rpb24gKGJpbmRpbmdUb1N5bnRheCwgbW9kdWxlSWQpIHtcbiAgICAgICAgICAgIGJpbmRpbmdUb1N5bnRheC5fYmluZGluZy5tb2R1bGVJZCA9IG1vZHVsZUlkO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0QmluZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9iaW5kID0gX3RoaXMuYmluZC5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgYmluZGluZ1RvU3ludGF4ID0gX2JpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHNldE1vZHVsZUlkKGJpbmRpbmdUb1N5bnRheCwgbW9kdWxlSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nVG9TeW50YXg7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0VW5iaW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3VuYmluZCA9IF90aGlzLnVuYmluZC5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgICAgICBfdW5iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRJc2JvdW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2lzQm91bmQgPSBfdGhpcy5pc0JvdW5kLmJpbmQoX3RoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfaXNCb3VuZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0UmViaW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3JlYmluZCA9IF90aGlzLnJlYmluZC5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgYmluZGluZ1RvU3ludGF4ID0gX3JlYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgc2V0TW9kdWxlSWQoYmluZGluZ1RvU3ludGF4LCBtb2R1bGVJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdUb1N5bnRheDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobUlkKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgYmluZEZ1bmN0aW9uOiBnZXRCaW5kRnVuY3Rpb24obUlkKSxcbiAgICAgICAgICAgIGlzYm91bmRGdW5jdGlvbjogZ2V0SXNib3VuZEZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICByZWJpbmRGdW5jdGlvbjogZ2V0UmViaW5kRnVuY3Rpb24obUlkKSxcbiAgICAgICAgICAgIHVuYmluZEZ1bmN0aW9uOiBnZXRVbmJpbmRGdW5jdGlvbihtSWQpXG4gICAgICAgIH0pOyB9O1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZ2V0ID0gZnVuY3Rpb24gKGF2b2lkQ29uc3RyYWludHMsIGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICB2YXIgZGVmYXVsdEFyZ3MgPSB7XG4gICAgICAgICAgICBhdm9pZENvbnN0cmFpbnRzOiBhdm9pZENvbnN0cmFpbnRzLFxuICAgICAgICAgICAgY29udGV4dEludGVyY2VwdG9yOiBmdW5jdGlvbiAoY29udGV4dCkgeyByZXR1cm4gY29udGV4dDsgfSxcbiAgICAgICAgICAgIGlzTXVsdGlJbmplY3Q6IGlzTXVsdGlJbmplY3QsXG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIHNlcnZpY2VJZGVudGlmaWVyOiBzZXJ2aWNlSWRlbnRpZmllcixcbiAgICAgICAgICAgIHRhcmdldFR5cGU6IHRhcmdldFR5cGUsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuX21pZGRsZXdhcmUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX21pZGRsZXdhcmUoZGVmYXVsdEFyZ3MpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkIHx8IHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLklOVkFMSURfTUlERExFV0FSRV9SRVRVUk4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fcGxhbkFuZFJlc29sdmUoKShkZWZhdWx0QXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX3BsYW5BbmRSZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gcGxhbm5lcl8xLnBsYW4oX3RoaXMuX21ldGFkYXRhUmVhZGVyLCBfdGhpcywgYXJncy5pc011bHRpSW5qZWN0LCBhcmdzLnRhcmdldFR5cGUsIGFyZ3Muc2VydmljZUlkZW50aWZpZXIsIGFyZ3Mua2V5LCBhcmdzLnZhbHVlLCBhcmdzLmF2b2lkQ29uc3RyYWludHMpO1xuICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MuY29udGV4dEludGVyY2VwdG9yKGNvbnRleHQpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc29sdmVyXzEucmVzb2x2ZShjb250ZXh0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGFpbmVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBDb250YWluZXJNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lck1vZHVsZShyZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gcmVnaXN0cnk7XG4gICAgfVxuICAgIHJldHVybiBDb250YWluZXJNb2R1bGU7XG59KCkpO1xuZXhwb3J0cy5Db250YWluZXJNb2R1bGUgPSBDb250YWluZXJNb2R1bGU7XG52YXIgQXN5bmNDb250YWluZXJNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jQ29udGFpbmVyTW9kdWxlKHJlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMucmVnaXN0cnkgPSByZWdpc3RyeTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jQ29udGFpbmVyTW9kdWxlO1xufSgpKTtcbmV4cG9ydHMuQXN5bmNDb250YWluZXJNb2R1bGUgPSBBc3luY0NvbnRhaW5lck1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENvbnRhaW5lclNuYXBzaG90ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250YWluZXJTbmFwc2hvdCgpIHtcbiAgICB9XG4gICAgQ29udGFpbmVyU25hcHNob3Qub2YgPSBmdW5jdGlvbiAoYmluZGluZ3MsIG1pZGRsZXdhcmUpIHtcbiAgICAgICAgdmFyIHNuYXBzaG90ID0gbmV3IENvbnRhaW5lclNuYXBzaG90KCk7XG4gICAgICAgIHNuYXBzaG90LmJpbmRpbmdzID0gYmluZGluZ3M7XG4gICAgICAgIHNuYXBzaG90Lm1pZGRsZXdhcmUgPSBtaWRkbGV3YXJlO1xuICAgICAgICByZXR1cm4gc25hcHNob3Q7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGFpbmVyU25hcHNob3Q7XG59KCkpO1xuZXhwb3J0cy5Db250YWluZXJTbmFwc2hvdCA9IENvbnRhaW5lclNuYXBzaG90O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBMb29rdXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExvb2t1cCgpIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBMb29rdXAucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCB2YWx1ZSkge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX21hcC5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAoZW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZW50cnkucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9tYXAuc2V0KHNlcnZpY2VJZGVudGlmaWVyLCBlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAuc2V0KHNlcnZpY2VJZGVudGlmaWVyLCBbdmFsdWVdKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSBudWxsIHx8IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX21hcC5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAoZW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuS0VZX05PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gbnVsbCB8fCBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX21hcC5kZWxldGUoc2VydmljZUlkZW50aWZpZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5LRVlfTk9UX0ZPVU5EKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5yZW1vdmVCeUNvbmRpdGlvbiA9IGZ1bmN0aW9uIChjb25kaXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbWFwLmZvckVhY2goZnVuY3Rpb24gKGVudHJpZXMsIGtleSkge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWRFbnRyaWVzID0gZW50cmllcy5maWx0ZXIoZnVuY3Rpb24gKGVudHJ5KSB7IHJldHVybiAhY29uZGl0aW9uKGVudHJ5KTsgfSk7XG4gICAgICAgICAgICBpZiAodXBkYXRlZEVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9tYXAuc2V0KGtleSwgdXBkYXRlZEVudHJpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLmhhc0tleSA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5oYXMoc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvcHkgPSBuZXcgTG9va3VwKCk7XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7IHJldHVybiBjb3B5LmFkZChrZXksIGIuY2xvbmUoKSk7IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLnRyYXZlcnNlID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIGZ1bmMoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIExvb2t1cDtcbn0oKSk7XG5leHBvcnRzLkxvb2t1cCA9IExvb2t1cDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGtleXMgPSByZXF1aXJlKFwiLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbmV4cG9ydHMuTUVUQURBVEFfS0VZID0ga2V5cztcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lci9jb250YWluZXJcIik7XG5leHBvcnRzLkNvbnRhaW5lciA9IGNvbnRhaW5lcl8xLkNvbnRhaW5lcjtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbmV4cG9ydHMuQmluZGluZ1Njb3BlRW51bSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtO1xuZXhwb3J0cy5CaW5kaW5nVHlwZUVudW0gPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtO1xuZXhwb3J0cy5UYXJnZXRUeXBlRW51bSA9IGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bTtcbnZhciBjb250YWluZXJfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXIvY29udGFpbmVyX21vZHVsZVwiKTtcbmV4cG9ydHMuQXN5bmNDb250YWluZXJNb2R1bGUgPSBjb250YWluZXJfbW9kdWxlXzEuQXN5bmNDb250YWluZXJNb2R1bGU7XG5leHBvcnRzLkNvbnRhaW5lck1vZHVsZSA9IGNvbnRhaW5lcl9tb2R1bGVfMS5Db250YWluZXJNb2R1bGU7XG52YXIgaW5qZWN0YWJsZV8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9pbmplY3RhYmxlXCIpO1xuZXhwb3J0cy5pbmplY3RhYmxlID0gaW5qZWN0YWJsZV8xLmluamVjdGFibGU7XG52YXIgdGFnZ2VkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL3RhZ2dlZFwiKTtcbmV4cG9ydHMudGFnZ2VkID0gdGFnZ2VkXzEudGFnZ2VkO1xudmFyIG5hbWVkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL25hbWVkXCIpO1xuZXhwb3J0cy5uYW1lZCA9IG5hbWVkXzEubmFtZWQ7XG52YXIgaW5qZWN0XzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL2luamVjdFwiKTtcbmV4cG9ydHMuaW5qZWN0ID0gaW5qZWN0XzEuaW5qZWN0O1xuZXhwb3J0cy5MYXp5U2VydmljZUlkZW50aWZlciA9IGluamVjdF8xLkxhenlTZXJ2aWNlSWRlbnRpZmVyO1xudmFyIG9wdGlvbmFsXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL29wdGlvbmFsXCIpO1xuZXhwb3J0cy5vcHRpb25hbCA9IG9wdGlvbmFsXzEub3B0aW9uYWw7XG52YXIgdW5tYW5hZ2VkXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL3VubWFuYWdlZFwiKTtcbmV4cG9ydHMudW5tYW5hZ2VkID0gdW5tYW5hZ2VkXzEudW5tYW5hZ2VkO1xudmFyIG11bHRpX2luamVjdF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9tdWx0aV9pbmplY3RcIik7XG5leHBvcnRzLm11bHRpSW5qZWN0ID0gbXVsdGlfaW5qZWN0XzEubXVsdGlJbmplY3Q7XG52YXIgdGFyZ2V0X25hbWVfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vdGFyZ2V0X25hbWVcIik7XG5leHBvcnRzLnRhcmdldE5hbWUgPSB0YXJnZXRfbmFtZV8xLnRhcmdldE5hbWU7XG52YXIgcG9zdF9jb25zdHJ1Y3RfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vcG9zdF9jb25zdHJ1Y3RcIik7XG5leHBvcnRzLnBvc3RDb25zdHJ1Y3QgPSBwb3N0X2NvbnN0cnVjdF8xLnBvc3RDb25zdHJ1Y3Q7XG52YXIgbWV0YWRhdGFfcmVhZGVyXzEgPSByZXF1aXJlKFwiLi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXJcIik7XG5leHBvcnRzLk1ldGFkYXRhUmVhZGVyID0gbWV0YWRhdGFfcmVhZGVyXzEuTWV0YWRhdGFSZWFkZXI7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2lkXCIpO1xuZXhwb3J0cy5pZCA9IGlkXzEuaWQ7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL2RlY29yYXRvcl91dGlsc1wiKTtcbmV4cG9ydHMuZGVjb3JhdGUgPSBkZWNvcmF0b3JfdXRpbHNfMS5kZWNvcmF0ZTtcbnZhciBjb25zdHJhaW50X2hlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL3N5bnRheC9jb25zdHJhaW50X2hlbHBlcnNcIik7XG5leHBvcnRzLnRyYXZlcnNlQW5jZXJzdG9ycyA9IGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycztcbmV4cG9ydHMudGFnZ2VkQ29uc3RyYWludCA9IGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQ7XG5leHBvcnRzLm5hbWVkQ29uc3RyYWludCA9IGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludDtcbmV4cG9ydHMudHlwZUNvbnN0cmFpbnQgPSBjb25zdHJhaW50X2hlbHBlcnNfMS50eXBlQ29uc3RyYWludDtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xuZXhwb3J0cy5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nID0gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmc7XG52YXIgYmluZGluZ191dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHMvYmluZGluZ191dGlsc1wiKTtcbmV4cG9ydHMubXVsdGlCaW5kVG9TZXJ2aWNlID0gYmluZGluZ191dGlsc18xLm11bHRpQmluZFRvU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgQ29udGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dChjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuICAgIENvbnRleHQucHJvdG90eXBlLmFkZFBsYW4gPSBmdW5jdGlvbiAocGxhbikge1xuICAgICAgICB0aGlzLnBsYW4gPSBwbGFuO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2V0Q3VycmVudFJlcXVlc3QgPSBmdW5jdGlvbiAoY3VycmVudFJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UmVxdWVzdCA9IGN1cnJlbnRSZXF1ZXN0O1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHQ7XG59KCkpO1xuZXhwb3J0cy5Db250ZXh0ID0gQ29udGV4dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBNZXRhZGF0YSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWV0YWRhdGEoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBNZXRhZGF0YS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmtleSA9PT0gTUVUQURBVEFfS0VZLk5BTUVEX1RBRykge1xuICAgICAgICAgICAgcmV0dXJuIFwibmFtZWQ6IFwiICsgdGhpcy52YWx1ZS50b1N0cmluZygpICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ0YWdnZWQ6IHsga2V5OlwiICsgdGhpcy5rZXkudG9TdHJpbmcoKSArIFwiLCB2YWx1ZTogXCIgKyB0aGlzLnZhbHVlICsgXCIgfVwiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTWV0YWRhdGE7XG59KCkpO1xuZXhwb3J0cy5NZXRhZGF0YSA9IE1ldGFkYXRhO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIE1ldGFkYXRhUmVhZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXRhZGF0YVJlYWRlcigpIHtcbiAgICB9XG4gICAgTWV0YWRhdGFSZWFkZXIucHJvdG90eXBlLmdldENvbnN0cnVjdG9yTWV0YWRhdGEgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jKSB7XG4gICAgICAgIHZhciBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuUEFSQU1fVFlQRVMsIGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgICAgIHZhciB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5UQUdHRUQsIGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhOiBjb21waWxlckdlbmVyYXRlZE1ldGFkYXRhLFxuICAgICAgICAgICAgdXNlckdlbmVyYXRlZE1ldGFkYXRhOiB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgfHwge31cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE1ldGFkYXRhUmVhZGVyLnByb3RvdHlwZS5nZXRQcm9wZXJ0aWVzTWV0YWRhdGEgPSBmdW5jdGlvbiAoY29uc3RydWN0b3JGdW5jKSB7XG4gICAgICAgIHZhciB1c2VyR2VuZXJhdGVkTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5UQUdHRURfUFJPUCwgY29uc3RydWN0b3JGdW5jKSB8fCBbXTtcbiAgICAgICAgcmV0dXJuIHVzZXJHZW5lcmF0ZWRNZXRhZGF0YTtcbiAgICB9O1xuICAgIHJldHVybiBNZXRhZGF0YVJlYWRlcjtcbn0oKSk7XG5leHBvcnRzLk1ldGFkYXRhUmVhZGVyID0gTWV0YWRhdGFSZWFkZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQbGFuID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQbGFuKHBhcmVudENvbnRleHQsIHJvb3RSZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucGFyZW50Q29udGV4dCA9IHBhcmVudENvbnRleHQ7XG4gICAgICAgIHRoaXMucm9vdFJlcXVlc3QgPSByb290UmVxdWVzdDtcbiAgICB9XG4gICAgcmV0dXJuIFBsYW47XG59KCkpO1xuZXhwb3J0cy5QbGFuID0gUGxhbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfY291bnRfMSA9IHJlcXVpcmUoXCIuLi9iaW5kaW5ncy9iaW5kaW5nX2NvdW50XCIpO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBleGNlcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiKTtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VyaWFsaXphdGlvblwiKTtcbnZhciBjb250ZXh0XzEgPSByZXF1aXJlKFwiLi9jb250ZXh0XCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi9tZXRhZGF0YVwiKTtcbnZhciBwbGFuXzEgPSByZXF1aXJlKFwiLi9wbGFuXCIpO1xudmFyIHJlZmxlY3Rpb25fdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3JlZmxlY3Rpb25fdXRpbHNcIik7XG52YXIgcmVxdWVzdF8xID0gcmVxdWlyZShcIi4vcmVxdWVzdFwiKTtcbnZhciB0YXJnZXRfMSA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcbmZ1bmN0aW9uIGdldEJpbmRpbmdEaWN0aW9uYXJ5KGNudG5yKSB7XG4gICAgcmV0dXJuIGNudG5yLl9iaW5kaW5nRGljdGlvbmFyeTtcbn1cbmV4cG9ydHMuZ2V0QmluZGluZ0RpY3Rpb25hcnkgPSBnZXRCaW5kaW5nRGljdGlvbmFyeTtcbmZ1bmN0aW9uIF9jcmVhdGVUYXJnZXQoaXNNdWx0aUluamVjdCwgdGFyZ2V0VHlwZSwgc2VydmljZUlkZW50aWZpZXIsIG5hbWUsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgbWV0YWRhdGFLZXkgPSBpc011bHRpSW5qZWN0ID8gTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcgOiBNRVRBREFUQV9LRVkuSU5KRUNUX1RBRztcbiAgICB2YXIgaW5qZWN0TWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShtZXRhZGF0YUtleSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIHZhciB0YXJnZXQgPSBuZXcgdGFyZ2V0XzEuVGFyZ2V0KHRhcmdldFR5cGUsIG5hbWUsIHNlcnZpY2VJZGVudGlmaWVyLCBpbmplY3RNZXRhZGF0YSk7XG4gICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciB0YWdNZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKGtleSwgdmFsdWUpO1xuICAgICAgICB0YXJnZXQubWV0YWRhdGEucHVzaCh0YWdNZXRhZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBfZ2V0QWN0aXZlQmluZGluZ3MobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIHRhcmdldCkge1xuICAgIHZhciBiaW5kaW5ncyA9IGdldEJpbmRpbmdzKGNvbnRleHQuY29udGFpbmVyLCB0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpO1xuICAgIHZhciBhY3RpdmVCaW5kaW5ncyA9IFtdO1xuICAgIGlmIChiaW5kaW5ncy5sZW5ndGggPT09IGJpbmRpbmdfY291bnRfMS5CaW5kaW5nQ291bnQuTm9CaW5kaW5nc0F2YWlsYWJsZSAmJlxuICAgICAgICBjb250ZXh0LmNvbnRhaW5lci5vcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSAmJlxuICAgICAgICB0eXBlb2YgdGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgbWV0YWRhdGFSZWFkZXIuZ2V0Q29uc3RydWN0b3JNZXRhZGF0YSh0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpLmNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGEpIHtcbiAgICAgICAgY29udGV4dC5jb250YWluZXIuYmluZCh0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpLnRvU2VsZigpO1xuICAgICAgICBiaW5kaW5ncyA9IGdldEJpbmRpbmdzKGNvbnRleHQuY29udGFpbmVyLCB0YXJnZXQuc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbiAgICBpZiAoIWF2b2lkQ29uc3RyYWludHMpIHtcbiAgICAgICAgYWN0aXZlQmluZGluZ3MgPSBiaW5kaW5ncy5maWx0ZXIoZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IHJlcXVlc3RfMS5SZXF1ZXN0KGJpbmRpbmcuc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIGJpbmRpbmcsIHRhcmdldCk7XG4gICAgICAgICAgICByZXR1cm4gYmluZGluZy5jb25zdHJhaW50KHJlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFjdGl2ZUJpbmRpbmdzID0gYmluZGluZ3M7XG4gICAgfVxuICAgIF92YWxpZGF0ZUFjdGl2ZUJpbmRpbmdDb3VudCh0YXJnZXQuc2VydmljZUlkZW50aWZpZXIsIGFjdGl2ZUJpbmRpbmdzLCB0YXJnZXQsIGNvbnRleHQuY29udGFpbmVyKTtcbiAgICByZXR1cm4gYWN0aXZlQmluZGluZ3M7XG59XG5mdW5jdGlvbiBfdmFsaWRhdGVBY3RpdmVCaW5kaW5nQ291bnQoc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmdzLCB0YXJnZXQsIGNvbnRhaW5lcikge1xuICAgIHN3aXRjaCAoYmluZGluZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgYmluZGluZ19jb3VudF8xLkJpbmRpbmdDb3VudC5Ob0JpbmRpbmdzQXZhaWxhYmxlOlxuICAgICAgICAgICAgaWYgKHRhcmdldC5pc09wdGlvbmFsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgPSBzZXJpYWxpemF0aW9uXzEuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IEVSUk9SX01TR1MuTk9UX1JFR0lTVEVSRUQ7XG4gICAgICAgICAgICAgICAgbXNnICs9IHNlcmlhbGl6YXRpb25fMS5saXN0TWV0YWRhdGFGb3JUYXJnZXQoc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgbXNnICs9IHNlcmlhbGl6YXRpb25fMS5saXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXIoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllclN0cmluZywgZ2V0QmluZGluZ3MpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIGJpbmRpbmdfY291bnRfMS5CaW5kaW5nQ291bnQuT25seU9uZUJpbmRpbmdBdmFpbGFibGU6XG4gICAgICAgICAgICBpZiAoIXRhcmdldC5pc0FycmF5KCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgYmluZGluZ19jb3VudF8xLkJpbmRpbmdDb3VudC5NdWx0aXBsZUJpbmRpbmdzQXZhaWxhYmxlOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaXNBcnJheSgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nID0gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLkFNQklHVU9VU19NQVRDSCArIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmc7XG4gICAgICAgICAgICAgICAgbXNnICs9IHNlcmlhbGl6YXRpb25fMS5saXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXIoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllclN0cmluZywgZ2V0QmluZGluZ3MpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzO1xuICAgICAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIF9jcmVhdGVTdWJSZXF1ZXN0cyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIHRhcmdldCkge1xuICAgIHZhciBhY3RpdmVCaW5kaW5ncztcbiAgICB2YXIgY2hpbGRSZXF1ZXN0O1xuICAgIGlmIChwYXJlbnRSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgIGFjdGl2ZUJpbmRpbmdzID0gX2dldEFjdGl2ZUJpbmRpbmdzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBjb250ZXh0LCBudWxsLCB0YXJnZXQpO1xuICAgICAgICBjaGlsZFJlcXVlc3QgPSBuZXcgcmVxdWVzdF8xLlJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIG51bGwsIGFjdGl2ZUJpbmRpbmdzLCB0YXJnZXQpO1xuICAgICAgICB2YXIgdGhlUGxhbiA9IG5ldyBwbGFuXzEuUGxhbihjb250ZXh0LCBjaGlsZFJlcXVlc3QpO1xuICAgICAgICBjb250ZXh0LmFkZFBsYW4odGhlUGxhbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IF9nZXRBY3RpdmVCaW5kaW5ncyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgY29udGV4dCwgcGFyZW50UmVxdWVzdCwgdGFyZ2V0KTtcbiAgICAgICAgY2hpbGRSZXF1ZXN0ID0gcGFyZW50UmVxdWVzdC5hZGRDaGlsZFJlcXVlc3QodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0KTtcbiAgICB9XG4gICAgYWN0aXZlQmluZGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICB2YXIgc3ViQ2hpbGRSZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRhcmdldC5pc0FycmF5KCkpIHtcbiAgICAgICAgICAgIHN1YkNoaWxkUmVxdWVzdCA9IGNoaWxkUmVxdWVzdC5hZGRDaGlsZFJlcXVlc3QoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZywgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViQ2hpbGRSZXF1ZXN0ID0gY2hpbGRSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChiaW5kaW5nLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW5zdGFuY2UgJiYgYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBkZXBlbmRlbmNpZXMgPSByZWZsZWN0aW9uX3V0aWxzXzEuZ2V0RGVwZW5kZW5jaWVzKG1ldGFkYXRhUmVhZGVyLCBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSk7XG4gICAgICAgICAgICBpZiAoIWNvbnRleHQuY29udGFpbmVyLm9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrcykge1xuICAgICAgICAgICAgICAgIHZhciBiYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQgPSByZWZsZWN0aW9uX3V0aWxzXzEuZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KG1ldGFkYXRhUmVhZGVyLCBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY2llcy5sZW5ndGggPCBiYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gRVJST1JfTVNHUy5BUkdVTUVOVFNfTEVOR1RIX01JU01BVENIKHJlZmxlY3Rpb25fdXRpbHNfMS5nZXRGdW5jdGlvbk5hbWUoYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXMuZm9yRWFjaChmdW5jdGlvbiAoZGVwZW5kZW5jeSkge1xuICAgICAgICAgICAgICAgIF9jcmVhdGVTdWJSZXF1ZXN0cyhtZXRhZGF0YVJlYWRlciwgZmFsc2UsIGRlcGVuZGVuY3kuc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIHN1YkNoaWxkUmVxdWVzdCwgZGVwZW5kZW5jeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0QmluZGluZ3MoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgIHZhciBiaW5kaW5ncyA9IFtdO1xuICAgIHZhciBiaW5kaW5nRGljdGlvbmFyeSA9IGdldEJpbmRpbmdEaWN0aW9uYXJ5KGNvbnRhaW5lcik7XG4gICAgaWYgKGJpbmRpbmdEaWN0aW9uYXJ5Lmhhc0tleShzZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgYmluZGluZ3MgPSBiaW5kaW5nRGljdGlvbmFyeS5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb250YWluZXIucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGJpbmRpbmdzID0gZ2V0QmluZGluZ3MoY29udGFpbmVyLnBhcmVudCwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbiAgICByZXR1cm4gYmluZGluZ3M7XG59XG5mdW5jdGlvbiBwbGFuKG1ldGFkYXRhUmVhZGVyLCBjb250YWluZXIsIGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlLCBhdm9pZENvbnN0cmFpbnRzKSB7XG4gICAgaWYgKGF2b2lkQ29uc3RyYWludHMgPT09IHZvaWQgMCkgeyBhdm9pZENvbnN0cmFpbnRzID0gZmFsc2U7IH1cbiAgICB2YXIgY29udGV4dCA9IG5ldyBjb250ZXh0XzEuQ29udGV4dChjb250YWluZXIpO1xuICAgIHZhciB0YXJnZXQgPSBfY3JlYXRlVGFyZ2V0KGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBcIlwiLCBrZXksIHZhbHVlKTtcbiAgICB0cnkge1xuICAgICAgICBfY3JlYXRlU3ViUmVxdWVzdHMobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIHNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBudWxsLCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChleGNlcHRpb25zXzEuaXNTdGFja092ZXJmbG93RXhlcHRpb24oZXJyb3IpKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5wbGFuKSB7XG4gICAgICAgICAgICAgICAgc2VyaWFsaXphdGlvbl8xLmNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uKGNvbnRleHQucGxhbi5yb290UmVxdWVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuZXhwb3J0cy5wbGFuID0gcGxhbjtcbmZ1bmN0aW9uIGNyZWF0ZU1vY2tSZXF1ZXN0KGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gbmV3IHRhcmdldF8xLlRhcmdldChsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIFwiXCIsIHNlcnZpY2VJZGVudGlmaWVyLCBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShrZXksIHZhbHVlKSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgY29udGV4dF8xLkNvbnRleHQoY29udGFpbmVyKTtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyByZXF1ZXN0XzEuUmVxdWVzdChzZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgbnVsbCwgW10sIHRhcmdldCk7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG59XG5leHBvcnRzLmNyZWF0ZU1vY2tSZXF1ZXN0ID0gY3JlYXRlTW9ja1JlcXVlc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBRdWVyeWFibGVTdHJpbmcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFF1ZXJ5YWJsZVN0cmluZyhzdHIpIHtcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgfVxuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSA9PT0gMDtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nKSB7XG4gICAgICAgIHZhciByZXZlcnNlU3RyaW5nID0gXCJcIjtcbiAgICAgICAgdmFyIHJldmVyc2VTZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJldmVyc2VTdHJpbmcgPSB0aGlzLnN0ci5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRzV2l0aC5jYWxsKHsgc3RyOiByZXZlcnNlU3RyaW5nIH0sIHJldmVyc2VTZWFyY2hTdHJpbmcpO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0ci5pbmRleE9mKHNlYXJjaFN0cmluZykgIT09IC0xKTtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKGNvbXBhcmVTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyID09PSBjb21wYXJlU3RyaW5nO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXJ5YWJsZVN0cmluZztcbn0oKSk7XG5leHBvcnRzLlF1ZXJ5YWJsZVN0cmluZyA9IFF1ZXJ5YWJsZVN0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGluamVjdF8xID0gcmVxdWlyZShcIi4uL2Fubm90YXRpb24vaW5qZWN0XCIpO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VyaWFsaXphdGlvblwiKTtcbmV4cG9ydHMuZ2V0RnVuY3Rpb25OYW1lID0gc2VyaWFsaXphdGlvbl8xLmdldEZ1bmN0aW9uTmFtZTtcbnZhciB0YXJnZXRfMSA9IHJlcXVpcmUoXCIuL3RhcmdldFwiKTtcbmZ1bmN0aW9uIGdldERlcGVuZGVuY2llcyhtZXRhZGF0YVJlYWRlciwgZnVuYykge1xuICAgIHZhciBjb25zdHJ1Y3Rvck5hbWUgPSBzZXJpYWxpemF0aW9uXzEuZ2V0RnVuY3Rpb25OYW1lKGZ1bmMpO1xuICAgIHZhciB0YXJnZXRzID0gZ2V0VGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgY29uc3RydWN0b3JOYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRhcmdldHM7XG59XG5leHBvcnRzLmdldERlcGVuZGVuY2llcyA9IGdldERlcGVuZGVuY2llcztcbmZ1bmN0aW9uIGdldFRhcmdldHMobWV0YWRhdGFSZWFkZXIsIGNvbnN0cnVjdG9yTmFtZSwgZnVuYywgaXNCYXNlQ2xhc3MpIHtcbiAgICB2YXIgbWV0YWRhdGEgPSBtZXRhZGF0YVJlYWRlci5nZXRDb25zdHJ1Y3Rvck1ldGFkYXRhKGZ1bmMpO1xuICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllcnMgPSBtZXRhZGF0YS5jb21waWxlckdlbmVyYXRlZE1ldGFkYXRhO1xuICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5NSVNTSU5HX0lOSkVDVEFCTEVfQU5OT1RBVElPTiArIFwiIFwiICsgY29uc3RydWN0b3JOYW1lICsgXCIuXCI7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbiAgICB2YXIgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEgPSBtZXRhZGF0YS51c2VyR2VuZXJhdGVkTWV0YWRhdGE7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSk7XG4gICAgdmFyIGhhc1VzZXJEZWNsYXJlZFVua25vd25JbmplY3Rpb25zID0gKGZ1bmMubGVuZ3RoID09PSAwICYmIGtleXMubGVuZ3RoID4gMCk7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAoaGFzVXNlckRlY2xhcmVkVW5rbm93bkluamVjdGlvbnMpID8ga2V5cy5sZW5ndGggOiBmdW5jLmxlbmd0aDtcbiAgICB2YXIgY29uc3RydWN0b3JUYXJnZXRzID0gZ2V0Q29uc3RydWN0b3JBcmdzQXNUYXJnZXRzKGlzQmFzZUNsYXNzLCBjb25zdHJ1Y3Rvck5hbWUsIHNlcnZpY2VJZGVudGlmaWVycywgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEsIGl0ZXJhdGlvbnMpO1xuICAgIHZhciBwcm9wZXJ0eVRhcmdldHMgPSBnZXRDbGFzc1Byb3BzQXNUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBmdW5jKTtcbiAgICB2YXIgdGFyZ2V0cyA9IGNvbnN0cnVjdG9yVGFyZ2V0cy5jb25jYXQocHJvcGVydHlUYXJnZXRzKTtcbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0KGluZGV4LCBpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhKSB7XG4gICAgdmFyIHRhcmdldE1ldGFkYXRhID0gY29uc3RydWN0b3JBcmdzTWV0YWRhdGFbaW5kZXgudG9TdHJpbmcoKV0gfHwgW107XG4gICAgdmFyIG1ldGFkYXRhID0gZm9ybWF0VGFyZ2V0TWV0YWRhdGEodGFyZ2V0TWV0YWRhdGEpO1xuICAgIHZhciBpc01hbmFnZWQgPSBtZXRhZGF0YS51bm1hbmFnZWQgIT09IHRydWU7XG4gICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXJzW2luZGV4XTtcbiAgICB2YXIgaW5qZWN0SWRlbnRpZmllciA9IChtZXRhZGF0YS5pbmplY3QgfHwgbWV0YWRhdGEubXVsdGlJbmplY3QpO1xuICAgIHNlcnZpY2VJZGVudGlmaWVyID0gKGluamVjdElkZW50aWZpZXIpID8gKGluamVjdElkZW50aWZpZXIpIDogc2VydmljZUlkZW50aWZpZXI7XG4gICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyIGluc3RhbmNlb2YgaW5qZWN0XzEuTGF6eVNlcnZpY2VJZGVudGlmZXIpIHtcbiAgICAgICAgc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllci51bndyYXAoKTtcbiAgICB9XG4gICAgaWYgKGlzTWFuYWdlZCkge1xuICAgICAgICB2YXIgaXNPYmplY3QgPSBzZXJ2aWNlSWRlbnRpZmllciA9PT0gT2JqZWN0O1xuICAgICAgICB2YXIgaXNGdW5jdGlvbiA9IHNlcnZpY2VJZGVudGlmaWVyID09PSBGdW5jdGlvbjtcbiAgICAgICAgdmFyIGlzVW5kZWZpbmVkID0gc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIGlzVW5rbm93blR5cGUgPSAoaXNPYmplY3QgfHwgaXNGdW5jdGlvbiB8fCBpc1VuZGVmaW5lZCk7XG4gICAgICAgIGlmICghaXNCYXNlQ2xhc3MgJiYgaXNVbmtub3duVHlwZSkge1xuICAgICAgICAgICAgdmFyIG1zZyA9IEVSUk9SX01TR1MuTUlTU0lOR19JTkpFQ1RfQU5OT1RBVElPTiArIFwiIGFyZ3VtZW50IFwiICsgaW5kZXggKyBcIiBpbiBjbGFzcyBcIiArIGNvbnN0cnVjdG9yTmFtZSArIFwiLlwiO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRhcmdldCA9IG5ldyB0YXJnZXRfMS5UYXJnZXQobGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLkNvbnN0cnVjdG9yQXJndW1lbnQsIG1ldGFkYXRhLnRhcmdldE5hbWUsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgdGFyZ2V0Lm1ldGFkYXRhID0gdGFyZ2V0TWV0YWRhdGE7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZ2V0Q29uc3RydWN0b3JBcmdzQXNUYXJnZXRzKGlzQmFzZUNsYXNzLCBjb25zdHJ1Y3Rvck5hbWUsIHNlcnZpY2VJZGVudGlmaWVycywgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEsIGl0ZXJhdGlvbnMpIHtcbiAgICB2YXIgdGFyZ2V0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGk7XG4gICAgICAgIHZhciB0YXJnZXQgPSBnZXRDb25zdHJ1Y3RvckFyZ3NBc1RhcmdldChpbmRleCwgaXNCYXNlQ2xhc3MsIGNvbnN0cnVjdG9yTmFtZSwgc2VydmljZUlkZW50aWZpZXJzLCBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSk7XG4gICAgICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRzO1xufVxuZnVuY3Rpb24gZ2V0Q2xhc3NQcm9wc0FzVGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgY29uc3RydWN0b3JGdW5jKSB7XG4gICAgdmFyIGNsYXNzUHJvcHNNZXRhZGF0YSA9IG1ldGFkYXRhUmVhZGVyLmdldFByb3BlcnRpZXNNZXRhZGF0YShjb25zdHJ1Y3RvckZ1bmMpO1xuICAgIHZhciB0YXJnZXRzID0gW107XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhjbGFzc1Byb3BzTWV0YWRhdGEpO1xuICAgIGZvciAodmFyIF9pID0gMCwga2V5c18xID0ga2V5czsgX2kgPCBrZXlzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzXzFbX2ldO1xuICAgICAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBjbGFzc1Byb3BzTWV0YWRhdGFba2V5XTtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gZm9ybWF0VGFyZ2V0TWV0YWRhdGEoY2xhc3NQcm9wc01ldGFkYXRhW2tleV0pO1xuICAgICAgICB2YXIgdGFyZ2V0TmFtZSA9IG1ldGFkYXRhLnRhcmdldE5hbWUgfHwga2V5O1xuICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSAobWV0YWRhdGEuaW5qZWN0IHx8IG1ldGFkYXRhLm11bHRpSW5qZWN0KTtcbiAgICAgICAgdmFyIHRhcmdldCA9IG5ldyB0YXJnZXRfMS5UYXJnZXQobGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLkNsYXNzUHJvcGVydHksIHRhcmdldE5hbWUsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgdGFyZ2V0Lm1ldGFkYXRhID0gdGFyZ2V0TWV0YWRhdGE7XG4gICAgICAgIHRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgIH1cbiAgICB2YXIgYmFzZUNvbnN0cnVjdG9yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yRnVuYy5wcm90b3R5cGUpLmNvbnN0cnVjdG9yO1xuICAgIGlmIChiYXNlQ29uc3RydWN0b3IgIT09IE9iamVjdCkge1xuICAgICAgICB2YXIgYmFzZVRhcmdldHMgPSBnZXRDbGFzc1Byb3BzQXNUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBiYXNlQ29uc3RydWN0b3IpO1xuICAgICAgICB0YXJnZXRzID0gdGFyZ2V0cy5jb25jYXQoYmFzZVRhcmdldHMpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmZ1bmN0aW9uIGdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudChtZXRhZGF0YVJlYWRlciwgZnVuYykge1xuICAgIHZhciBiYXNlQ29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZnVuYy5wcm90b3R5cGUpLmNvbnN0cnVjdG9yO1xuICAgIGlmIChiYXNlQ29uc3RydWN0b3IgIT09IE9iamVjdCkge1xuICAgICAgICB2YXIgYmFzZUNvbnN0cnVjdG9yTmFtZSA9IHNlcmlhbGl6YXRpb25fMS5nZXRGdW5jdGlvbk5hbWUoYmFzZUNvbnN0cnVjdG9yKTtcbiAgICAgICAgdmFyIHRhcmdldHMgPSBnZXRUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBiYXNlQ29uc3RydWN0b3JOYW1lLCBiYXNlQ29uc3RydWN0b3IsIHRydWUpO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSB0YXJnZXRzLm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQubWV0YWRhdGEuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG0ua2V5ID09PSBNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBRztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHVubWFuYWdlZENvdW50ID0gW10uY29uY2F0LmFwcGx5KFtdLCBtZXRhZGF0YSkubGVuZ3RoO1xuICAgICAgICB2YXIgZGVwZW5kZW5jeUNvdW50ID0gdGFyZ2V0cy5sZW5ndGggLSB1bm1hbmFnZWRDb3VudDtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3lDb3VudCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkZXBlbmRlbmN5Q291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KG1ldGFkYXRhUmVhZGVyLCBiYXNlQ29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59XG5leHBvcnRzLmdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudCA9IGdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudDtcbmZ1bmN0aW9uIGZvcm1hdFRhcmdldE1ldGFkYXRhKHRhcmdldE1ldGFkYXRhKSB7XG4gICAgdmFyIHRhcmdldE1ldGFkYXRhTWFwID0ge307XG4gICAgdGFyZ2V0TWV0YWRhdGEuZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgICB0YXJnZXRNZXRhZGF0YU1hcFttLmtleS50b1N0cmluZygpXSA9IG0udmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5qZWN0OiB0YXJnZXRNZXRhZGF0YU1hcFtNRVRBREFUQV9LRVkuSU5KRUNUX1RBR10sXG4gICAgICAgIG11bHRpSW5qZWN0OiB0YXJnZXRNZXRhZGF0YU1hcFtNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBR10sXG4gICAgICAgIHRhcmdldE5hbWU6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5OQU1FX1RBR10sXG4gICAgICAgIHVubWFuYWdlZDogdGFyZ2V0TWV0YWRhdGFNYXBbTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUddXG4gICAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgUmVxdWVzdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVxdWVzdChzZXJ2aWNlSWRlbnRpZmllciwgcGFyZW50Q29udGV4dCwgcGFyZW50UmVxdWVzdCwgYmluZGluZ3MsIHRhcmdldCkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHRoaXMucGFyZW50Q29udGV4dCA9IHBhcmVudENvbnRleHQ7XG4gICAgICAgIHRoaXMucGFyZW50UmVxdWVzdCA9IHBhcmVudFJlcXVlc3Q7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLmNoaWxkUmVxdWVzdHMgPSBbXTtcbiAgICAgICAgdGhpcy5iaW5kaW5ncyA9IChBcnJheS5pc0FycmF5KGJpbmRpbmdzKSA/IGJpbmRpbmdzIDogW2JpbmRpbmdzXSk7XG4gICAgICAgIHRoaXMucmVxdWVzdFNjb3BlID0gcGFyZW50UmVxdWVzdCA9PT0gbnVsbFxuICAgICAgICAgICAgPyBuZXcgTWFwKClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuYWRkQ2hpbGRSZXF1ZXN0ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5ncywgdGFyZ2V0KSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5ldyBSZXF1ZXN0KHNlcnZpY2VJZGVudGlmaWVyLCB0aGlzLnBhcmVudENvbnRleHQsIHRoaXMsIGJpbmRpbmdzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLmNoaWxkUmVxdWVzdHMucHVzaChjaGlsZCk7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuICAgIHJldHVybiBSZXF1ZXN0O1xufSgpKTtcbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4vbWV0YWRhdGFcIik7XG52YXIgcXVlcnlhYmxlX3N0cmluZ18xID0gcmVxdWlyZShcIi4vcXVlcnlhYmxlX3N0cmluZ1wiKTtcbnZhciBUYXJnZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRhcmdldCh0eXBlLCBuYW1lLCBzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWRPclRhZ2dlZCkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHRoaXMubmFtZSA9IG5ldyBxdWVyeWFibGVfc3RyaW5nXzEuUXVlcnlhYmxlU3RyaW5nKG5hbWUgfHwgXCJcIik7XG4gICAgICAgIHRoaXMubWV0YWRhdGEgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdmFyIG1ldGFkYXRhSXRlbSA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZWRPclRhZ2dlZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbWV0YWRhdGFJdGVtID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZWRPclRhZ2dlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZWRPclRhZ2dlZCBpbnN0YW5jZW9mIG1ldGFkYXRhXzEuTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhSXRlbSA9IG5hbWVkT3JUYWdnZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGFkYXRhSXRlbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5wdXNoKG1ldGFkYXRhSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5oYXNUYWcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLm1ldGFkYXRhOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIG0gPSBfYVtfaV07XG4gICAgICAgICAgICBpZiAobS5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuaXNBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzVGFnKE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUubWF0Y2hlc0FycmF5ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlc1RhZyhNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRykobmFtZSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzTmFtZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1RhZyhNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuaXNUYWdnZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLnNvbWUoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgIHJldHVybiAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHKSAmJlxuICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcpICYmXG4gICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTkFNRV9UQUcpICYmXG4gICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBRykgJiZcbiAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuaXNPcHRpb25hbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlc1RhZyhNRVRBREFUQV9LRVkuT1BUSU9OQUxfVEFHKSh0cnVlKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuZ2V0TmFtZWRUYWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTmFtZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWV0YWRhdGEuZmlsdGVyKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLmtleSA9PT0gTUVUQURBVEFfS0VZLk5BTUVEX1RBRzsgfSlbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmdldEN1c3RvbVRhZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVGFnZ2VkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLmZpbHRlcihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHKSAmJlxuICAgICAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKSAmJlxuICAgICAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5OQU1FX1RBRykgJiZcbiAgICAgICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBRykgJiZcbiAgICAgICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5tYXRjaGVzTmFtZWRUYWcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVzVGFnKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpKG5hbWUpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5tYXRjaGVzVGFnID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gX3RoaXMubWV0YWRhdGE7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKG0ua2V5ID09PSBrZXkgJiYgbS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFRhcmdldDtcbn0oKSk7XG5leHBvcnRzLlRhcmdldCA9IFRhcmdldDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGVycm9yX21zZ3NfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xuZnVuY3Rpb24gX2luamVjdFByb3BlcnRpZXMoaW5zdGFuY2UsIGNoaWxkUmVxdWVzdHMsIHJlc29sdmVSZXF1ZXN0KSB7XG4gICAgdmFyIHByb3BlcnR5SW5qZWN0aW9uc1JlcXVlc3RzID0gY2hpbGRSZXF1ZXN0cy5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gKGNoaWxkUmVxdWVzdC50YXJnZXQgIT09IG51bGwgJiZcbiAgICAgICAgICAgIGNoaWxkUmVxdWVzdC50YXJnZXQudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLkNsYXNzUHJvcGVydHkpO1xuICAgIH0pO1xuICAgIHZhciBwcm9wZXJ0eUluamVjdGlvbnMgPSBwcm9wZXJ0eUluamVjdGlvbnNSZXF1ZXN0cy5tYXAocmVzb2x2ZVJlcXVlc3QpO1xuICAgIHByb3BlcnR5SW5qZWN0aW9uc1JlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24gKHIsIGluZGV4KSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICBwcm9wZXJ0eU5hbWUgPSByLnRhcmdldC5uYW1lLnZhbHVlKCk7XG4gICAgICAgIHZhciBpbmplY3Rpb24gPSBwcm9wZXJ0eUluamVjdGlvbnNbaW5kZXhdO1xuICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdID0gaW5qZWN0aW9uO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cbmZ1bmN0aW9uIF9jcmVhdGVJbnN0YW5jZShGdW5jLCBpbmplY3Rpb25zKSB7XG4gICAgcmV0dXJuIG5ldyAoRnVuYy5iaW5kLmFwcGx5KEZ1bmMsIFt2b2lkIDBdLmNvbmNhdChpbmplY3Rpb25zKSkpKCk7XG59XG5mdW5jdGlvbiBfcG9zdENvbnN0cnVjdChjb25zdHIsIHJlc3VsdCkge1xuICAgIGlmIChSZWZsZWN0Lmhhc01ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgY29uc3RyKSkge1xuICAgICAgICB2YXIgZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCBjb25zdHIpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0W2RhdGEudmFsdWVdKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9tc2dzXzEuUE9TVF9DT05TVFJVQ1RfRVJST1IoY29uc3RyLm5hbWUsIGUubWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZUluc3RhbmNlKGNvbnN0ciwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICBpZiAoY2hpbGRSZXF1ZXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvckluamVjdGlvbnNSZXF1ZXN0cyA9IGNoaWxkUmVxdWVzdHMuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZFJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hpbGRSZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCAmJiBjaGlsZFJlcXVlc3QudGFyZ2V0LnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5Db25zdHJ1Y3RvckFyZ3VtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvckluamVjdGlvbnMgPSBjb25zdHJ1Y3RvckluamVjdGlvbnNSZXF1ZXN0cy5tYXAocmVzb2x2ZVJlcXVlc3QpO1xuICAgICAgICByZXN1bHQgPSBfY3JlYXRlSW5zdGFuY2UoY29uc3RyLCBjb25zdHJ1Y3RvckluamVjdGlvbnMpO1xuICAgICAgICByZXN1bHQgPSBfaW5qZWN0UHJvcGVydGllcyhyZXN1bHQsIGNoaWxkUmVxdWVzdHMsIHJlc29sdmVSZXF1ZXN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBjb25zdHIoKTtcbiAgICB9XG4gICAgX3Bvc3RDb25zdHJ1Y3QoY29uc3RyLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLnJlc29sdmVJbnN0YW5jZSA9IHJlc29sdmVJbnN0YW5jZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIGV4Y2VwdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9leGNlcHRpb25zXCIpO1xudmFyIHNlcmlhbGl6YXRpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xudmFyIGluc3RhbnRpYXRpb25fMSA9IHJlcXVpcmUoXCIuL2luc3RhbnRpYXRpb25cIik7XG52YXIgaW52b2tlRmFjdG9yeSA9IGZ1bmN0aW9uIChmYWN0b3J5VHlwZSwgc2VydmljZUlkZW50aWZpZXIsIGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXhjZXB0aW9uc18xLmlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uKGVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuQ0lSQ1VMQVJfREVQRU5ERU5DWV9JTl9GQUNUT1JZKGZhY3RvcnlUeXBlLCBzZXJ2aWNlSWRlbnRpZmllci50b1N0cmluZygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbn07XG52YXIgX3Jlc29sdmVSZXF1ZXN0ID0gZnVuY3Rpb24gKHJlcXVlc3RTY29wZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0LnBhcmVudENvbnRleHQuc2V0Q3VycmVudFJlcXVlc3QocmVxdWVzdCk7XG4gICAgICAgIHZhciBiaW5kaW5ncyA9IHJlcXVlc3QuYmluZGluZ3M7XG4gICAgICAgIHZhciBjaGlsZFJlcXVlc3RzID0gcmVxdWVzdC5jaGlsZFJlcXVlc3RzO1xuICAgICAgICB2YXIgdGFyZ2V0SXNBbkFycmF5ID0gcmVxdWVzdC50YXJnZXQgJiYgcmVxdWVzdC50YXJnZXQuaXNBcnJheSgpO1xuICAgICAgICB2YXIgdGFyZ2V0UGFyZW50SXNOb3RBbkFycmF5ID0gIXJlcXVlc3QucGFyZW50UmVxdWVzdCB8fFxuICAgICAgICAgICAgIXJlcXVlc3QucGFyZW50UmVxdWVzdC50YXJnZXQgfHxcbiAgICAgICAgICAgICFyZXF1ZXN0LnRhcmdldCB8fFxuICAgICAgICAgICAgIXJlcXVlc3QucGFyZW50UmVxdWVzdC50YXJnZXQubWF0Y2hlc0FycmF5KHJlcXVlc3QudGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHRhcmdldElzQW5BcnJheSAmJiB0YXJnZXRQYXJlbnRJc05vdEFuQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZFJlcXVlc3RzLm1hcChmdW5jdGlvbiAoY2hpbGRSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9mID0gX3Jlc29sdmVSZXF1ZXN0KHJlcXVlc3RTY29wZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9mKGNoaWxkUmVxdWVzdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QudGFyZ2V0LmlzT3B0aW9uYWwoKSAmJiBiaW5kaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJpbmRpbmdfMSA9IGJpbmRpbmdzWzBdO1xuICAgICAgICAgICAgdmFyIGlzU2luZ2xldG9uID0gYmluZGluZ18xLnNjb3BlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5TaW5nbGV0b247XG4gICAgICAgICAgICB2YXIgaXNSZXF1ZXN0U2luZ2xldG9uID0gYmluZGluZ18xLnNjb3BlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5SZXF1ZXN0O1xuICAgICAgICAgICAgaWYgKGlzU2luZ2xldG9uICYmIGJpbmRpbmdfMS5hY3RpdmF0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ18xLmNhY2hlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzUmVxdWVzdFNpbmdsZXRvbiAmJlxuICAgICAgICAgICAgICAgIHJlcXVlc3RTY29wZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHJlcXVlc3RTY29wZS5oYXMoYmluZGluZ18xLmlkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0U2NvcGUuZ2V0KGJpbmRpbmdfMS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uQ29uc3RhbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGJpbmRpbmdfMS5jYWNoZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYmluZGluZ18xLmNhY2hlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uQ29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBiaW5kaW5nXzEuaW1wbGVtZW50YXRpb25UeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRHluYW1pY1ZhbHVlICYmIGJpbmRpbmdfMS5keW5hbWljVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbnZva2VGYWN0b3J5KFwidG9EeW5hbWljVmFsdWVcIiwgYmluZGluZ18xLnNlcnZpY2VJZGVudGlmaWVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBiaW5kaW5nXzEuZHluYW1pY1ZhbHVlKHJlcXVlc3QucGFyZW50Q29udGV4dCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRmFjdG9yeSAmJiBiaW5kaW5nXzEuZmFjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGludm9rZUZhY3RvcnkoXCJ0b0ZhY3RvcnlcIiwgYmluZGluZ18xLnNlcnZpY2VJZGVudGlmaWVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBiaW5kaW5nXzEuZmFjdG9yeShyZXF1ZXN0LnBhcmVudENvbnRleHQpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLlByb3ZpZGVyICYmIGJpbmRpbmdfMS5wcm92aWRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGludm9rZUZhY3RvcnkoXCJ0b1Byb3ZpZGVyXCIsIGJpbmRpbmdfMS5zZXJ2aWNlSWRlbnRpZmllciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gYmluZGluZ18xLnByb3ZpZGVyKHJlcXVlc3QucGFyZW50Q29udGV4dCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW5zdGFuY2UgJiYgYmluZGluZ18xLmltcGxlbWVudGF0aW9uVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGluc3RhbnRpYXRpb25fMS5yZXNvbHZlSW5zdGFuY2UoYmluZGluZ18xLmltcGxlbWVudGF0aW9uVHlwZSwgY2hpbGRSZXF1ZXN0cywgX3Jlc29sdmVSZXF1ZXN0KHJlcXVlc3RTY29wZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcocmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuSU5WQUxJRF9CSU5ESU5HX1RZUEUgKyBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmluZGluZ18xLm9uQWN0aXZhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYmluZGluZ18xLm9uQWN0aXZhdGlvbihyZXF1ZXN0LnBhcmVudENvbnRleHQsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTaW5nbGV0b24pIHtcbiAgICAgICAgICAgICAgICBiaW5kaW5nXzEuY2FjaGUgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgYmluZGluZ18xLmFjdGl2YXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNSZXF1ZXN0U2luZ2xldG9uICYmXG4gICAgICAgICAgICAgICAgcmVxdWVzdFNjb3BlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgIXJlcXVlc3RTY29wZS5oYXMoYmluZGluZ18xLmlkKSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RTY29wZS5zZXQoYmluZGluZ18xLmlkLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuZnVuY3Rpb24gcmVzb2x2ZShjb250ZXh0KSB7XG4gICAgdmFyIF9mID0gX3Jlc29sdmVSZXF1ZXN0KGNvbnRleHQucGxhbi5yb290UmVxdWVzdC5yZXF1ZXN0U2NvcGUpO1xuICAgIHJldHVybiBfZihjb250ZXh0LnBsYW4ucm9vdFJlcXVlc3QpO1xufVxuZXhwb3J0cy5yZXNvbHZlID0gcmVzb2x2ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX3doZW5fb25fc3ludGF4XCIpO1xudmFyIEJpbmRpbmdJblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ0luU3ludGF4KGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZyA9IGJpbmRpbmc7XG4gICAgfVxuICAgIEJpbmRpbmdJblN5bnRheC5wcm90b3R5cGUuaW5SZXF1ZXN0U2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuc2NvcGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5SZXF1ZXN0O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ0luU3ludGF4LnByb3RvdHlwZS5pblNpbmdsZXRvblNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ0luU3ludGF4LnByb3RvdHlwZS5pblRyYW5zaWVudFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdJblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdJblN5bnRheCA9IEJpbmRpbmdJblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfaW5fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX2luX3N5bnRheFwiKTtcbnZhciBiaW5kaW5nX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ19vbl9zeW50YXhcIik7XG52YXIgYmluZGluZ193aGVuX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nSW5XaGVuT25TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdJbldoZW5PblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgICAgICB0aGlzLl9iaW5kaW5nV2hlblN5bnRheCA9IG5ldyBiaW5kaW5nX3doZW5fc3ludGF4XzEuQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdPblN5bnRheCA9IG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0luU3ludGF4ID0gbmV3IGJpbmRpbmdfaW5fc3ludGF4XzEuQmluZGluZ0luU3ludGF4KGJpbmRpbmcpO1xuICAgIH1cbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLmluUmVxdWVzdFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0luU3ludGF4LmluUmVxdWVzdFNjb3BlKCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLmluU2luZ2xldG9uU2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nSW5TeW50YXguaW5TaW5nbGV0b25TY29wZSgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5pblRyYW5zaWVudFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0luU3ludGF4LmluVHJhbnNpZW50U2NvcGUoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldE5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0SXNEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldElzRGVmYXVsdCgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5JbmplY3RlZEludG8gPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuSW5qZWN0ZWRJbnRvKHBhcmVudCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuUGFyZW50TmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudFRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvcklzKGFuY2VzdG9yKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLm9uQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nT25TeW50YXgub25BY3RpdmF0aW9uKGhhbmRsZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdJbldoZW5PblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdJbldoZW5PblN5bnRheCA9IEJpbmRpbmdJbldoZW5PblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfd2hlbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfd2hlbl9zeW50YXhcIik7XG52YXIgQmluZGluZ09uU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nT25TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ09uU3ludGF4LnByb3RvdHlwZS5vbkFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLm9uQWN0aXZhdGlvbiA9IGhhbmRsZXI7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX3N5bnRheF8xLkJpbmRpbmdXaGVuU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdPblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdPblN5bnRheCA9IEJpbmRpbmdPblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIGJpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXhcIik7XG52YXIgYmluZGluZ193aGVuX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX29uX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nVG9TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdUb1N5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uSW5zdGFuY2U7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gY29uc3RydWN0b3I7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19pbl93aGVuX29uX3N5bnRheF8xLkJpbmRpbmdJbldoZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9TZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2JpbmRpbmcuc2VydmljZUlkZW50aWZpZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLklOVkFMSURfVE9fU0VMRl9WQUxVRSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLl9iaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICByZXR1cm4gdGhpcy50byhzZWxmKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9Db25zdGFudFZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uQ29uc3RhbnRWYWx1ZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jYWNoZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmR5bmFtaWNWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9EeW5hbWljVmFsdWUgPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkR5bmFtaWNWYWx1ZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuZHluYW1pY1ZhbHVlID0gZnVuYztcbiAgICAgICAgdGhpcy5fYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nSW5XaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Db25zdHJ1Y3RvcjtcbiAgICAgICAgdGhpcy5fYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgPSBjb25zdHJ1Y3RvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9GYWN0b3J5ID0gZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GYWN0b3J5O1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmZhY3RvcnkgPSBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0Z1bmN0aW9uID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmdW5jICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLklOVkFMSURfRlVOQ1RJT05fQklORElORyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJpbmRpbmdXaGVuT25TeW50YXggPSB0aGlzLnRvQ29uc3RhbnRWYWx1ZShmdW5jKTtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GdW5jdGlvbjtcbiAgICAgICAgcmV0dXJuIGJpbmRpbmdXaGVuT25TeW50YXg7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvQXV0b0ZhY3RvcnkgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GYWN0b3J5O1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmZhY3RvcnkgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIGF1dG9mYWN0b3J5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29udGV4dC5jb250YWluZXIuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTsgfTtcbiAgICAgICAgICAgIHJldHVybiBhdXRvZmFjdG9yeTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9Qcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLlByb3ZpZGVyO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvU2VydmljZSA9IGZ1bmN0aW9uIChzZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudG9EeW5hbWljVmFsdWUoZnVuY3Rpb24gKGNvbnRleHQpIHsgcmV0dXJuIGNvbnRleHQuY29udGFpbmVyLmdldChzZXJ2aWNlKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ1RvU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ1RvU3ludGF4ID0gQmluZGluZ1RvU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYmluZGluZ19vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfb25fc3ludGF4XCIpO1xudmFyIGJpbmRpbmdfd2hlbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfd2hlbl9zeW50YXhcIik7XG52YXIgQmluZGluZ1doZW5PblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ1doZW5PblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgICAgICB0aGlzLl9iaW5kaW5nV2hlblN5bnRheCA9IG5ldyBiaW5kaW5nX3doZW5fc3ludGF4XzEuQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdPblN5bnRheCA9IG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRJc0RlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0SXNEZWZhdWx0KCk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuSW5qZWN0ZWRJbnRvID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkluamVjdGVkSW50byhwYXJlbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5QYXJlbnROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudFRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3RvcklzKGFuY2VzdG9yKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JOYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JNYXRjaGVzKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyhjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLm9uQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nT25TeW50YXgub25BY3RpdmF0aW9uKGhhbmRsZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdXaGVuT25TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nV2hlbk9uU3ludGF4ID0gQmluZGluZ1doZW5PblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX29uX3N5bnRheFwiKTtcbnZhciBjb25zdHJhaW50X2hlbHBlcnNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0cmFpbnRfaGVscGVyc1wiKTtcbnZhciBCaW5kaW5nV2hlblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ1doZW5TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW4gPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludChuYW1lKTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0SXNEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldElzRGVmYXVsdCA9IChyZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCkgJiZcbiAgICAgICAgICAgICAgICAoIXJlcXVlc3QudGFyZ2V0LmlzTmFtZWQoKSkgJiZcbiAgICAgICAgICAgICAgICAoIXJlcXVlc3QudGFyZ2V0LmlzVGFnZ2VkKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldElzRGVmYXVsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gY29uc3RyYWludF9oZWxwZXJzXzEudGFnZ2VkQ29uc3RyYWludCh0YWcpKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuSW5qZWN0ZWRJbnRvID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnR5cGVDb25zdHJhaW50KHBhcmVudCkocmVxdWVzdC5wYXJlbnRSZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludChuYW1lKShyZXF1ZXN0LnBhcmVudFJlcXVlc3QpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQodGFnKSh2YWx1ZSkocmVxdWVzdC5wYXJlbnRSZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS50eXBlQ29uc3RyYWludChhbmNlc3RvcikpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAhY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLnR5cGVDb25zdHJhaW50KGFuY2VzdG9yKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS5uYW1lZENvbnN0cmFpbnQobmFtZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuICFjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludF9oZWxwZXJzXzEubmFtZWRDb25zdHJhaW50KG5hbWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS50YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS50YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAhY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdXaGVuU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ1doZW5TeW50YXggPSBCaW5kaW5nV2hlblN5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIHRyYXZlcnNlQW5jZXJzdG9ycyA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBjb25zdHJhaW50KSB7XG4gICAgdmFyIHBhcmVudCA9IHJlcXVlc3QucGFyZW50UmVxdWVzdDtcbiAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBjb25zdHJhaW50KHBhcmVudCkgPyB0cnVlIDogdHJhdmVyc2VBbmNlcnN0b3JzKHBhcmVudCwgY29uc3RyYWludCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbmV4cG9ydHMudHJhdmVyc2VBbmNlcnN0b3JzID0gdHJhdmVyc2VBbmNlcnN0b3JzO1xudmFyIHRhZ2dlZENvbnN0cmFpbnQgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiByZXF1ZXN0ICE9PSBudWxsICYmIHJlcXVlc3QudGFyZ2V0ICE9PSBudWxsICYmIHJlcXVlc3QudGFyZ2V0Lm1hdGNoZXNUYWcoa2V5KSh2YWx1ZSk7XG4gICAgfTtcbiAgICBjb25zdHJhaW50Lm1ldGFEYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuIGNvbnN0cmFpbnQ7XG59OyB9O1xuZXhwb3J0cy50YWdnZWRDb25zdHJhaW50ID0gdGFnZ2VkQ29uc3RyYWludDtcbnZhciBuYW1lZENvbnN0cmFpbnQgPSB0YWdnZWRDb25zdHJhaW50KE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpO1xuZXhwb3J0cy5uYW1lZENvbnN0cmFpbnQgPSBuYW1lZENvbnN0cmFpbnQ7XG52YXIgdHlwZUNvbnN0cmFpbnQgPSBmdW5jdGlvbiAodHlwZSkgeyByZXR1cm4gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICB2YXIgYmluZGluZyA9IG51bGw7XG4gICAgaWYgKHJlcXVlc3QgIT09IG51bGwpIHtcbiAgICAgICAgYmluZGluZyA9IHJlcXVlc3QuYmluZGluZ3NbMF07XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHJlcXVlc3QuYmluZGluZ3NbMF0uaW1wbGVtZW50YXRpb25UeXBlO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09IGNvbnN0cnVjdG9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07IH07XG5leHBvcnRzLnR5cGVDb25zdHJhaW50ID0gdHlwZUNvbnN0cmFpbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubXVsdGlCaW5kVG9TZXJ2aWNlID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHR5cGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHR5cGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodCkgeyByZXR1cm4gY29udGFpbmVyLmJpbmQodCkudG9TZXJ2aWNlKHNlcnZpY2UpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG5mdW5jdGlvbiBpc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbihlcnJvcikge1xuICAgIHJldHVybiAoZXJyb3IgaW5zdGFuY2VvZiBSYW5nZUVycm9yIHx8XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPT09IEVSUk9SX01TR1MuU1RBQ0tfT1ZFUkZMT1cpO1xufVxuZXhwb3J0cy5pc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbiA9IGlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaWRDb3VudGVyID0gMDtcbmZ1bmN0aW9uIGlkKCkge1xuICAgIHJldHVybiBpZENvdW50ZXIrKztcbn1cbmV4cG9ydHMuaWQgPSBpZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG5mdW5jdGlvbiBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZXJ2aWNlSWRlbnRpZmllciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBfc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIF9zZXJ2aWNlSWRlbnRpZmllci5uYW1lO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2VydmljZUlkZW50aWZpZXIgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VJZGVudGlmaWVyLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgX3NlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHJldHVybiBfc2VydmljZUlkZW50aWZpZXI7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nID0gZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZztcbmZ1bmN0aW9uIGxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcihjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyLCBnZXRCaW5kaW5ncykge1xuICAgIHZhciByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gXCJcIjtcbiAgICB2YXIgcmVnaXN0ZXJlZEJpbmRpbmdzID0gZ2V0QmluZGluZ3MoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgaWYgKHJlZ2lzdGVyZWRCaW5kaW5ncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IFwiXFxuUmVnaXN0ZXJlZCBiaW5kaW5nczpcIjtcbiAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzLmZvckVhY2goZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gXCJPYmplY3RcIjtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBnZXRGdW5jdGlvbk5hbWUoYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgKyBcIlxcbiBcIiArIG5hbWU7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5jb25zdHJhaW50Lm1ldGFEYXRhKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgKyBcIiAtIFwiICsgYmluZGluZy5jb25zdHJhaW50Lm1ldGFEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3Q7XG59XG5leHBvcnRzLmxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllciA9IGxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcjtcbmZ1bmN0aW9uIGFscmVhZHlEZXBlbmRlbmN5Q2hhaW4ocmVxdWVzdCwgc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICBpZiAocmVxdWVzdC5wYXJlbnRSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVxdWVzdC5wYXJlbnRSZXF1ZXN0LnNlcnZpY2VJZGVudGlmaWVyID09PSBzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhbHJlYWR5RGVwZW5kZW5jeUNoYWluKHJlcXVlc3QucGFyZW50UmVxdWVzdCwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlcGVuZGVuY3lDaGFpblRvU3RyaW5nKHJlcXVlc3QpIHtcbiAgICBmdW5jdGlvbiBfY3JlYXRlU3RyaW5nQXJyKHJlcSwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgeyByZXN1bHQgPSBbXTsgfVxuICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHJlcS5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHJlc3VsdC5wdXNoKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHJlcS5wYXJlbnRSZXF1ZXN0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NyZWF0ZVN0cmluZ0FycihyZXEucGFyZW50UmVxdWVzdCwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB2YXIgc3RyaW5nQXJyID0gX2NyZWF0ZVN0cmluZ0FycihyZXF1ZXN0KTtcbiAgICByZXR1cm4gc3RyaW5nQXJyLnJldmVyc2UoKS5qb2luKFwiIC0tPiBcIik7XG59XG5mdW5jdGlvbiBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihyZXF1ZXN0KSB7XG4gICAgcmVxdWVzdC5jaGlsZFJlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICBpZiAoYWxyZWFkeURlcGVuZGVuY3lDaGFpbihjaGlsZFJlcXVlc3QsIGNoaWxkUmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlcyA9IGRlcGVuZGVuY3lDaGFpblRvU3RyaW5nKGNoaWxkUmVxdWVzdCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5DSVJDVUxBUl9ERVBFTkRFTkNZICsgXCIgXCIgKyBzZXJ2aWNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihjaGlsZFJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uID0gY2lyY3VsYXJEZXBlbmRlbmN5VG9FeGNlcHRpb247XG5mdW5jdGlvbiBsaXN0TWV0YWRhdGFGb3JUYXJnZXQoc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaXNUYWdnZWQoKSB8fCB0YXJnZXQuaXNOYW1lZCgpKSB7XG4gICAgICAgIHZhciBtXzEgPSBcIlwiO1xuICAgICAgICB2YXIgbmFtZWRUYWcgPSB0YXJnZXQuZ2V0TmFtZWRUYWcoKTtcbiAgICAgICAgdmFyIG90aGVyVGFncyA9IHRhcmdldC5nZXRDdXN0b21UYWdzKCk7XG4gICAgICAgIGlmIChuYW1lZFRhZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbV8xICs9IG5hbWVkVGFnLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlclRhZ3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG90aGVyVGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgICAgICBtXzEgKz0gdGFnLnRvU3RyaW5nKCkgKyBcIlxcblwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgKyBcIlxcbiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nICsgXCIgLSBcIiArIG1fMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nO1xuICAgIH1cbn1cbmV4cG9ydHMubGlzdE1ldGFkYXRhRm9yVGFyZ2V0ID0gbGlzdE1ldGFkYXRhRm9yVGFyZ2V0O1xuZnVuY3Rpb24gZ2V0RnVuY3Rpb25OYW1lKHYpIHtcbiAgICBpZiAodi5uYW1lKSB7XG4gICAgICAgIHJldHVybiB2Lm5hbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgbmFtZV8xID0gdi50b1N0cmluZygpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBuYW1lXzEubWF0Y2goL15mdW5jdGlvblxccyooW15cXHMoXSspLyk7XG4gICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogXCJBbm9ueW1vdXMgZnVuY3Rpb246IFwiICsgbmFtZV8xO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0RnVuY3Rpb25OYW1lID0gZ2V0RnVuY3Rpb25OYW1lO1xuIiwiIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoZSk7ZWxzZXt2YXIgdDtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3Q9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/dD1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJih0PXNlbGYpLHQub2JqZWN0SGFzaD1lKCl9fShmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBvKHUsYSl7aWYoIW5bdV0pe2lmKCF0W3VdKXt2YXIgZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFhJiZmKXJldHVybiBmKHUsITApO2lmKGkpcmV0dXJuIGkodSwhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIit1K1wiJ1wiKX12YXIgcz1uW3VdPXtleHBvcnRzOnt9fTt0W3VdWzBdLmNhbGwocy5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbdV1bMV1bZV07cmV0dXJuIG8obj9uOmUpfSxzLHMuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gblt1XS5leHBvcnRzfWZvcih2YXIgaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLHU9MDt1PHIubGVuZ3RoO3UrKylvKHJbdV0pO3JldHVybiBvfSh7MTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihyLG8saSx1LGEsZixzLGMsbCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZChlLHQpe3JldHVybiB0PWgoZSx0KSxnKGUsdCl9ZnVuY3Rpb24gaChlLHQpe2lmKHQ9dHx8e30sdC5hbGdvcml0aG09dC5hbGdvcml0aG18fFwic2hhMVwiLHQuZW5jb2Rpbmc9dC5lbmNvZGluZ3x8XCJoZXhcIix0LmV4Y2x1ZGVWYWx1ZXM9ISF0LmV4Y2x1ZGVWYWx1ZXMsdC5hbGdvcml0aG09dC5hbGdvcml0aG0udG9Mb3dlckNhc2UoKSx0LmVuY29kaW5nPXQuZW5jb2RpbmcudG9Mb3dlckNhc2UoKSx0Lmlnbm9yZVVua25vd249dC5pZ25vcmVVbmtub3duPT09ITAsdC5yZXNwZWN0VHlwZT10LnJlc3BlY3RUeXBlIT09ITEsdC5yZXNwZWN0RnVuY3Rpb25OYW1lcz10LnJlc3BlY3RGdW5jdGlvbk5hbWVzIT09ITEsdC5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzPXQucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcyE9PSExLHQudW5vcmRlcmVkQXJyYXlzPXQudW5vcmRlcmVkQXJyYXlzPT09ITAsdC51bm9yZGVyZWRTZXRzPXQudW5vcmRlcmVkU2V0cyE9PSExLHQudW5vcmRlcmVkT2JqZWN0cz10LnVub3JkZXJlZE9iamVjdHMhPT0hMSx0LnJlcGxhY2VyPXQucmVwbGFjZXJ8fHZvaWQgMCx0LmV4Y2x1ZGVLZXlzPXQuZXhjbHVkZUtleXN8fHZvaWQgMCxcInVuZGVmaW5lZFwiPT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgYXJndW1lbnQgcmVxdWlyZWQuXCIpO2Zvcih2YXIgbj0wO248di5sZW5ndGg7KytuKXZbbl0udG9Mb3dlckNhc2UoKT09PXQuYWxnb3JpdGhtLnRvTG93ZXJDYXNlKCkmJih0LmFsZ29yaXRobT12W25dKTtpZih2LmluZGV4T2YodC5hbGdvcml0aG0pPT09LTEpdGhyb3cgbmV3IEVycm9yKCdBbGdvcml0aG0gXCInK3QuYWxnb3JpdGhtKydcIiAgbm90IHN1cHBvcnRlZC4gc3VwcG9ydGVkIHZhbHVlczogJyt2LmpvaW4oXCIsIFwiKSk7aWYobS5pbmRleE9mKHQuZW5jb2RpbmcpPT09LTEmJlwicGFzc3Rocm91Z2hcIiE9PXQuYWxnb3JpdGhtKXRocm93IG5ldyBFcnJvcignRW5jb2RpbmcgXCInK3QuZW5jb2RpbmcrJ1wiICBub3Qgc3VwcG9ydGVkLiBzdXBwb3J0ZWQgdmFsdWVzOiAnK20uam9pbihcIiwgXCIpKTtyZXR1cm4gdH1mdW5jdGlvbiBwKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpcmV0dXJuITE7dmFyIHQ9L15mdW5jdGlvblxccytcXHcqXFxzKlxcKFxccypcXClcXHMqe1xccytcXFtuYXRpdmUgY29kZVxcXVxccyt9JC9pO3JldHVybiBudWxsIT10LmV4ZWMoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpfWZ1bmN0aW9uIGcoZSx0KXt2YXIgbjtuPVwicGFzc3Rocm91Z2hcIiE9PXQuYWxnb3JpdGhtP2IuY3JlYXRlSGFzaCh0LmFsZ29yaXRobSk6bmV3IHcsXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4ud3JpdGUmJihuLndyaXRlPW4udXBkYXRlLG4uZW5kPW4udXBkYXRlKTt2YXIgcj15KHQsbik7aWYoci5kaXNwYXRjaChlKSxuLnVwZGF0ZXx8bi5lbmQoXCJcIiksbi5kaWdlc3QpcmV0dXJuIG4uZGlnZXN0KFwiYnVmZmVyXCI9PT10LmVuY29kaW5nP3ZvaWQgMDp0LmVuY29kaW5nKTt2YXIgbz1uLnJlYWQoKTtyZXR1cm5cImJ1ZmZlclwiPT09dC5lbmNvZGluZz9vOm8udG9TdHJpbmcodC5lbmNvZGluZyl9ZnVuY3Rpb24geShlLHQsbil7bj1ufHxbXTt2YXIgcj1mdW5jdGlvbihlKXtyZXR1cm4gdC51cGRhdGU/dC51cGRhdGUoZSxcInV0ZjhcIik6dC53cml0ZShlLFwidXRmOFwiKX07cmV0dXJue2Rpc3BhdGNoOmZ1bmN0aW9uKHQpe2UucmVwbGFjZXImJih0PWUucmVwbGFjZXIodCkpO3ZhciBuPXR5cGVvZiB0O3JldHVybiBudWxsPT09dCYmKG49XCJudWxsXCIpLHRoaXNbXCJfXCIrbl0odCl9LF9vYmplY3Q6ZnVuY3Rpb24odCl7dmFyIG89L1xcW29iamVjdCAoLiopXFxdL2ksdT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCksYT1vLmV4ZWModSk7YT1hP2FbMV06XCJ1bmtub3duOltcIit1K1wiXVwiLGE9YS50b0xvd2VyQ2FzZSgpO3ZhciBmPW51bGw7aWYoKGY9bi5pbmRleE9mKHQpKT49MClyZXR1cm4gdGhpcy5kaXNwYXRjaChcIltDSVJDVUxBUjpcIitmK1wiXVwiKTtpZihuLnB1c2godCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkmJmkuaXNCdWZmZXImJmkuaXNCdWZmZXIodCkpcmV0dXJuIHIoXCJidWZmZXI6XCIpLHIodCk7aWYoXCJvYmplY3RcIj09PWF8fFwiZnVuY3Rpb25cIj09PWEpe3ZhciBzPU9iamVjdC5rZXlzKHQpO2UudW5vcmRlcmVkT2JqZWN0cyYmKHM9cy5zb3J0KCkpLGUucmVzcGVjdFR5cGU9PT0hMXx8cCh0KXx8cy5zcGxpY2UoMCwwLFwicHJvdG90eXBlXCIsXCJfX3Byb3RvX19cIixcImNvbnN0cnVjdG9yXCIpLGUuZXhjbHVkZUtleXMmJihzPXMuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiFlLmV4Y2x1ZGVLZXlzKHQpfSkpLHIoXCJvYmplY3Q6XCIrcy5sZW5ndGgrXCI6XCIpO3ZhciBjPXRoaXM7cmV0dXJuIHMuZm9yRWFjaChmdW5jdGlvbihuKXtjLmRpc3BhdGNoKG4pLHIoXCI6XCIpLGUuZXhjbHVkZVZhbHVlc3x8Yy5kaXNwYXRjaCh0W25dKSxyKFwiLFwiKX0pfWlmKCF0aGlzW1wiX1wiK2FdKXtpZihlLmlnbm9yZVVua25vd24pcmV0dXJuIHIoXCJbXCIrYStcIl1cIik7dGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG9iamVjdCB0eXBlIFwiJythKydcIicpfXRoaXNbXCJfXCIrYV0odCl9LF9hcnJheTpmdW5jdGlvbih0LG8pe289XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG8/bzplLnVub3JkZXJlZEFycmF5cyE9PSExO3ZhciBpPXRoaXM7aWYocihcImFycmF5OlwiK3QubGVuZ3RoK1wiOlwiKSwhb3x8dC5sZW5ndGg8PTEpcmV0dXJuIHQuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gaS5kaXNwYXRjaChlKX0pO3ZhciB1PVtdLGE9dC5tYXAoZnVuY3Rpb24odCl7dmFyIHI9bmV3IHcsbz1uLnNsaWNlKCksaT15KGUscixvKTtyZXR1cm4gaS5kaXNwYXRjaCh0KSx1PXUuY29uY2F0KG8uc2xpY2Uobi5sZW5ndGgpKSxyLnJlYWQoKS50b1N0cmluZygpfSk7cmV0dXJuIG49bi5jb25jYXQodSksYS5zb3J0KCksdGhpcy5fYXJyYXkoYSwhMSl9LF9kYXRlOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZGF0ZTpcIitlLnRvSlNPTigpKX0sX3N5bWJvbDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInN5bWJvbDpcIitlLnRvU3RyaW5nKCkpfSxfZXJyb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJlcnJvcjpcIitlLnRvU3RyaW5nKCkpfSxfYm9vbGVhbjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImJvb2w6XCIrZS50b1N0cmluZygpKX0sX3N0cmluZzpmdW5jdGlvbihlKXtyKFwic3RyaW5nOlwiK2UubGVuZ3RoK1wiOlwiKSxyKGUudG9TdHJpbmcoKSl9LF9mdW5jdGlvbjpmdW5jdGlvbih0KXtyKFwiZm46XCIpLHAodCk/dGhpcy5kaXNwYXRjaChcIltuYXRpdmVdXCIpOnRoaXMuZGlzcGF0Y2godC50b1N0cmluZygpKSxlLnJlc3BlY3RGdW5jdGlvbk5hbWVzIT09ITEmJnRoaXMuZGlzcGF0Y2goXCJmdW5jdGlvbi1uYW1lOlwiK1N0cmluZyh0Lm5hbWUpKSxlLnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXMmJnRoaXMuX29iamVjdCh0KX0sX251bWJlcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcIm51bWJlcjpcIitlLnRvU3RyaW5nKCkpfSxfeG1sOmZ1bmN0aW9uKGUpe3JldHVybiByKFwieG1sOlwiK2UudG9TdHJpbmcoKSl9LF9udWxsOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJOdWxsXCIpfSxfdW5kZWZpbmVkOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJVbmRlZmluZWRcIil9LF9yZWdleHA6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJyZWdleDpcIitlLnRvU3RyaW5nKCkpfSxfdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDhjbGFtcGVkYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50OGNsYW1wZWRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50OGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50MTZhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQxNmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImZsb2F0MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9mbG9hdDY0YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJmbG9hdDY0YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJhcnJheWJ1ZmZlcjpcIiksdGhpcy5kaXNwYXRjaChuZXcgVWludDhBcnJheShlKSl9LF91cmw6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1cmw6XCIrZS50b1N0cmluZygpLFwidXRmOFwiKX0sX21hcDpmdW5jdGlvbih0KXtyKFwibWFwOlwiKTt2YXIgbj1BcnJheS5mcm9tKHQpO3JldHVybiB0aGlzLl9hcnJheShuLGUudW5vcmRlcmVkU2V0cyE9PSExKX0sX3NldDpmdW5jdGlvbih0KXtyKFwic2V0OlwiKTt2YXIgbj1BcnJheS5mcm9tKHQpO3JldHVybiB0aGlzLl9hcnJheShuLGUudW5vcmRlcmVkU2V0cyE9PSExKX0sX2Jsb2I6ZnVuY3Rpb24oKXtpZihlLmlnbm9yZVVua25vd24pcmV0dXJuIHIoXCJbYmxvYl1cIik7dGhyb3cgRXJyb3IoJ0hhc2hpbmcgQmxvYiBvYmplY3RzIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkXFxuKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcHVsZW9zL29iamVjdC1oYXNoL2lzc3Vlcy8yNilcXG5Vc2UgXCJvcHRpb25zLnJlcGxhY2VyXCIgb3IgXCJvcHRpb25zLmlnbm9yZVVua25vd25cIlxcbicpfSxfZG9td2luZG93OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJkb213aW5kb3dcIil9LF9wcm9jZXNzOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJwcm9jZXNzXCIpfSxfdGltZXI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInRpbWVyXCIpfSxfcGlwZTpmdW5jdGlvbigpe3JldHVybiByKFwicGlwZVwiKX0sX3RjcDpmdW5jdGlvbigpe3JldHVybiByKFwidGNwXCIpfSxfdWRwOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ1ZHBcIil9LF90dHk6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInR0eVwiKX0sX3N0YXR3YXRjaGVyOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJzdGF0d2F0Y2hlclwiKX0sX3NlY3VyZWNvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInNlY3VyZWNvbnRleHRcIil9LF9jb25uZWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJjb25uZWN0aW9uXCIpfSxfemxpYjpmdW5jdGlvbigpe3JldHVybiByKFwiemxpYlwiKX0sX2NvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImNvbnRleHRcIil9LF9ub2Rlc2NyaXB0OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJub2Rlc2NyaXB0XCIpfSxfaHR0cHBhcnNlcjpmdW5jdGlvbigpe3JldHVybiByKFwiaHR0cHBhcnNlclwiKX0sX2RhdGF2aWV3OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJkYXRhdmlld1wiKX0sX3NpZ25hbDpmdW5jdGlvbigpe3JldHVybiByKFwic2lnbmFsXCIpfSxfZnNldmVudDpmdW5jdGlvbigpe3JldHVybiByKFwiZnNldmVudFwiKX0sX3Rsc3dyYXA6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInRsc3dyYXBcIil9fX1mdW5jdGlvbiB3KCl7cmV0dXJue2J1ZjpcIlwiLHdyaXRlOmZ1bmN0aW9uKGUpe3RoaXMuYnVmKz1lfSxlbmQ6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LHJlYWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5idWZ9fX12YXIgYj1lKFwiY3J5cHRvXCIpO249dC5leHBvcnRzPWQsbi5zaGExPWZ1bmN0aW9uKGUpe3JldHVybiBkKGUpfSxuLmtleXM9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSx7ZXhjbHVkZVZhbHVlczohMCxhbGdvcml0aG06XCJzaGExXCIsZW5jb2Rpbmc6XCJoZXhcIn0pfSxuLk1ENT1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwifSl9LG4ua2V5c01ENT1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwiLGV4Y2x1ZGVWYWx1ZXM6ITB9KX07dmFyIHY9Yi5nZXRIYXNoZXM/Yi5nZXRIYXNoZXMoKS5zbGljZSgpOltcInNoYTFcIixcIm1kNVwiXTt2LnB1c2goXCJwYXNzdGhyb3VnaFwiKTt2YXIgbT1bXCJidWZmZXJcIixcImhleFwiLFwiYmluYXJ5XCIsXCJiYXNlNjRcIl07bi53cml0ZVRvU3RyZWFtPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgbiYmKG49dCx0PXt9KSx0PWgoZSx0KSx5KHQsbikuZGlzcGF0Y2goZSl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV9lODE4MGVmNS5qc1wiLFwiL1wiKX0se2J1ZmZlcjozLGNyeXB0bzo1LGxZcG9JMjoxMH1dLDI6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSx0LHIsbyxpLHUsYSxmLHMpe3ZhciBjPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiOyFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KGUpe3ZhciB0PWUuY2hhckNvZGVBdCgwKTtyZXR1cm4gdD09PWl8fHQ9PT1sPzYyOnQ9PT11fHx0PT09ZD82Mzp0PGE/LTE6dDxhKzEwP3QtYSsyNisyNjp0PHMrMjY/dC1zOnQ8ZisyNj90LWYrMjY6dm9pZCAwfWZ1bmN0aW9uIG4oZSl7ZnVuY3Rpb24gbihlKXtzW2wrK109ZX12YXIgcixpLHUsYSxmLHM7aWYoZS5sZW5ndGglND4wKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDRcIik7dmFyIGM9ZS5sZW5ndGg7Zj1cIj1cIj09PWUuY2hhckF0KGMtMik/MjpcIj1cIj09PWUuY2hhckF0KGMtMSk/MTowLHM9bmV3IG8oMyplLmxlbmd0aC80LWYpLHU9Zj4wP2UubGVuZ3RoLTQ6ZS5sZW5ndGg7dmFyIGw9MDtmb3Iocj0wLGk9MDtyPHU7cis9NCxpKz0zKWE9dChlLmNoYXJBdChyKSk8PDE4fHQoZS5jaGFyQXQocisxKSk8PDEyfHQoZS5jaGFyQXQocisyKSk8PDZ8dChlLmNoYXJBdChyKzMpKSxuKCgxNjcxMTY4MCZhKT4+MTYpLG4oKDY1MjgwJmEpPj44KSxuKDI1NSZhKTtyZXR1cm4gMj09PWY/KGE9dChlLmNoYXJBdChyKSk8PDJ8dChlLmNoYXJBdChyKzEpKT4+NCxuKDI1NSZhKSk6MT09PWYmJihhPXQoZS5jaGFyQXQocikpPDwxMHx0KGUuY2hhckF0KHIrMSkpPDw0fHQoZS5jaGFyQXQocisyKSk+PjIsbihhPj44JjI1NSksbigyNTUmYSkpLHN9ZnVuY3Rpb24gcihlKXtmdW5jdGlvbiB0KGUpe3JldHVybiBjLmNoYXJBdChlKX1mdW5jdGlvbiBuKGUpe3JldHVybiB0KGU+PjE4JjYzKSt0KGU+PjEyJjYzKSt0KGU+PjYmNjMpK3QoNjMmZSl9dmFyIHIsbyxpLHU9ZS5sZW5ndGglMyxhPVwiXCI7Zm9yKHI9MCxpPWUubGVuZ3RoLXU7cjxpO3IrPTMpbz0oZVtyXTw8MTYpKyhlW3IrMV08PDgpK2VbcisyXSxhKz1uKG8pO3N3aXRjaCh1KXtjYXNlIDE6bz1lW2UubGVuZ3RoLTFdLGErPXQobz4+MiksYSs9dChvPDw0JjYzKSxhKz1cIj09XCI7YnJlYWs7Y2FzZSAyOm89KGVbZS5sZW5ndGgtMl08PDgpK2VbZS5sZW5ndGgtMV0sYSs9dChvPj4xMCksYSs9dChvPj40JjYzKSxhKz10KG88PDImNjMpLGErPVwiPVwifXJldHVybiBhfXZhciBvPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5P1VpbnQ4QXJyYXk6QXJyYXksaT1cIitcIi5jaGFyQ29kZUF0KDApLHU9XCIvXCIuY2hhckNvZGVBdCgwKSxhPVwiMFwiLmNoYXJDb2RlQXQoMCksZj1cImFcIi5jaGFyQ29kZUF0KDApLHM9XCJBXCIuY2hhckNvZGVBdCgwKSxsPVwiLVwiLmNoYXJDb2RlQXQoMCksZD1cIl9cIi5jaGFyQ29kZUF0KDApO2UudG9CeXRlQXJyYXk9bixlLmZyb21CeXRlQXJyYXk9cn0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4/dGhpcy5iYXNlNjRqcz17fTpuKX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYlwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDM6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCxyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIG8oZSx0LG4pe2lmKCEodGhpcyBpbnN0YW5jZW9mIG8pKXJldHVybiBuZXcgbyhlLHQsbik7dmFyIHI9dHlwZW9mIGU7aWYoXCJiYXNlNjRcIj09PXQmJlwic3RyaW5nXCI9PT1yKWZvcihlPU4oZSk7ZS5sZW5ndGglNCE9PTA7KWUrPVwiPVwiO3ZhciBpO2lmKFwibnVtYmVyXCI9PT1yKWk9RihlKTtlbHNlIGlmKFwic3RyaW5nXCI9PT1yKWk9by5ieXRlTGVuZ3RoKGUsdCk7ZWxzZXtpZihcIm9iamVjdFwiIT09cil0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLlwiKTtpPUYoZS5sZW5ndGgpfXZhciB1O28uX3VzZVR5cGVkQXJyYXlzP3U9by5fYXVnbWVudChuZXcgVWludDhBcnJheShpKSk6KHU9dGhpcyx1Lmxlbmd0aD1pLHUuX2lzQnVmZmVyPSEwKTt2YXIgYTtpZihvLl91c2VUeXBlZEFycmF5cyYmXCJudW1iZXJcIj09dHlwZW9mIGUuYnl0ZUxlbmd0aCl1Ll9zZXQoZSk7ZWxzZSBpZihPKGUpKWZvcihhPTA7YTxpO2ErKylvLmlzQnVmZmVyKGUpP3VbYV09ZS5yZWFkVUludDgoYSk6dVthXT1lW2FdO2Vsc2UgaWYoXCJzdHJpbmdcIj09PXIpdS53cml0ZShlLDAsdCk7ZWxzZSBpZihcIm51bWJlclwiPT09ciYmIW8uX3VzZVR5cGVkQXJyYXlzJiYhbilmb3IoYT0wO2E8aTthKyspdVthXT0wO3JldHVybiB1fWZ1bmN0aW9uIGwoZSx0LG4scil7bj1OdW1iZXIobil8fDA7dmFyIGk9ZS5sZW5ndGgtbjtyPyhyPU51bWJlcihyKSxyPmkmJihyPWkpKTpyPWk7dmFyIHU9dC5sZW5ndGg7JCh1JTI9PT0wLFwiSW52YWxpZCBoZXggc3RyaW5nXCIpLHI+dS8yJiYocj11LzIpO2Zvcih2YXIgYT0wO2E8cjthKyspe3ZhciBmPXBhcnNlSW50KHQuc3Vic3RyKDIqYSwyKSwxNik7JCghaXNOYU4oZiksXCJJbnZhbGlkIGhleCBzdHJpbmdcIiksZVtuK2FdPWZ9cmV0dXJuIG8uX2NoYXJzV3JpdHRlbj0yKmEsYX1mdW5jdGlvbiBkKGUsdCxuLHIpe3ZhciBpPW8uX2NoYXJzV3JpdHRlbj1XKFYodCksZSxuLHIpO3JldHVybiBpfWZ1bmN0aW9uIGgoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcocSh0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gcChlLHQsbixyKXtyZXR1cm4gaChlLHQsbixyKX1mdW5jdGlvbiBnKGUsdCxuLHIpe3ZhciBpPW8uX2NoYXJzV3JpdHRlbj1XKFIodCksZSxuLHIpO3JldHVybiBpfWZ1bmN0aW9uIHkoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoUCh0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gdyhlLHQsbil7cmV0dXJuIDA9PT10JiZuPT09ZS5sZW5ndGg/Ry5mcm9tQnl0ZUFycmF5KGUpOkcuZnJvbUJ5dGVBcnJheShlLnNsaWNlKHQsbikpfWZ1bmN0aW9uIGIoZSx0LG4pe3ZhciByPVwiXCIsbz1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBpPXQ7aTxuO2krKyllW2ldPD0xMjc/KHIrPUoobykrU3RyaW5nLmZyb21DaGFyQ29kZShlW2ldKSxvPVwiXCIpOm8rPVwiJVwiK2VbaV0udG9TdHJpbmcoMTYpO3JldHVybiByK0oobyl9ZnVuY3Rpb24gdihlLHQsbil7dmFyIHI9XCJcIjtuPU1hdGgubWluKGUubGVuZ3RoLG4pO2Zvcih2YXIgbz10O288bjtvKyspcis9U3RyaW5nLmZyb21DaGFyQ29kZShlW29dKTtyZXR1cm4gcn1mdW5jdGlvbiBtKGUsdCxuKXtyZXR1cm4gdihlLHQsbil9ZnVuY3Rpb24gXyhlLHQsbil7dmFyIHI9ZS5sZW5ndGg7KCF0fHx0PDApJiYodD0wKSwoIW58fG48MHx8bj5yKSYmKG49cik7Zm9yKHZhciBvPVwiXCIsaT10O2k8bjtpKyspbys9SChlW2ldKTtyZXR1cm4gb31mdW5jdGlvbiBFKGUsdCxuKXtmb3IodmFyIHI9ZS5zbGljZSh0LG4pLG89XCJcIixpPTA7aTxyLmxlbmd0aDtpKz0yKW8rPVN0cmluZy5mcm9tQ2hhckNvZGUocltpXSsyNTYqcltpKzFdKTtyZXR1cm4gb31mdW5jdGlvbiBJKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCsxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpO3JldHVybiBuPyhpPWVbdF0sdCsxPG8mJihpfD1lW3QrMV08PDgpKTooaT1lW3RdPDw4LHQrMTxvJiYoaXw9ZVt0KzFdKSksaX19ZnVuY3Rpb24gQShlLHQsbixyKXtyfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbz1lLmxlbmd0aDtpZighKHQ+PW8pKXt2YXIgaTtyZXR1cm4gbj8odCsyPG8mJihpPWVbdCsyXTw8MTYpLHQrMTxvJiYoaXw9ZVt0KzFdPDw4KSxpfD1lW3RdLHQrMzxvJiYoaSs9ZVt0KzNdPDwyND4+PjApKToodCsxPG8mJihpPWVbdCsxXTw8MTYpLHQrMjxvJiYoaXw9ZVt0KzJdPDw4KSx0KzM8byYmKGl8PWVbdCszXSksaSs9ZVt0XTw8MjQ+Pj4wKSxpfX1mdW5jdGlvbiBCKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCsxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpPUkoZSx0LG4sITApLHU9MzI3NjgmaTtyZXR1cm4gdT8oNjU1MzUtaSsxKSotMTppfX1mdW5jdGlvbiBMKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpPUEoZSx0LG4sITApLHU9MjE0NzQ4MzY0OCZpO3JldHVybiB1Pyg0Mjk0OTY3Mjk1LWkrMSkqLTE6aX19ZnVuY3Rpb24gVShlLHQsbixyKXtyZXR1cm4gcnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSxRLnJlYWQoZSx0LG4sMjMsNCl9ZnVuY3Rpb24geChlLHQsbixyKXtyZXR1cm4gcnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHQrNzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSxRLnJlYWQoZSx0LG4sNTIsOCl9ZnVuY3Rpb24gUyhlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobisxPGUubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEsodCw2NTUzNSkpO3ZhciBpPWUubGVuZ3RoO2lmKCEobj49aSkpZm9yKHZhciB1PTAsYT1NYXRoLm1pbihpLW4sMik7dTxhO3UrKyllW24rdV09KHQmMjU1PDw4KihyP3U6MS11KSk+Pj44KihyP3U6MS11KX1mdW5jdGlvbiBqKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzM8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksSyh0LDQyOTQ5NjcyOTUpKTt2YXIgaT1lLmxlbmd0aDtpZighKG4+PWkpKWZvcih2YXIgdT0wLGE9TWF0aC5taW4oaS1uLDQpO3U8YTt1KyspZVtuK3VdPXQ+Pj44KihyP3U6My11KSYyNTV9ZnVuY3Rpb24gQyhlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobisxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLHoodCwzMjc2NywtMzI3NjgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHwodD49MD9TKGUsdCxuLHIsbyk6UyhlLDY1NTM1K3QrMSxuLHIsbykpfWZ1bmN0aW9uIGsoZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSx6KHQsMjE0NzQ4MzY0NywtMjE0NzQ4MzY0OCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fCh0Pj0wP2ooZSx0LG4scixvKTpqKGUsNDI5NDk2NzI5NSt0KzEsbixyLG8pKX1mdW5jdGlvbiBUKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWCh0LDMuNDAyODIzNDY2Mzg1Mjg4NmUzOCwtMy40MDI4MjM0NjYzODUyODg2ZTM4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8US53cml0ZShlLHQsbixyLDIzLDQpfWZ1bmN0aW9uIE0oZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rNzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxYKHQsMS43OTc2OTMxMzQ4NjIzMTU3ZTMwOCwtMS43OTc2OTMxMzQ4NjIzMTU3ZTMwOCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fFEud3JpdGUoZSx0LG4sciw1Miw4KX1mdW5jdGlvbiBOKGUpe3JldHVybiBlLnRyaW0/ZS50cmltKCk6ZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpfWZ1bmN0aW9uIFkoZSx0LG4pe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlP246KGU9fn5lLGU+PXQ/dDplPj0wP2U6KGUrPXQsZT49MD9lOjApKX1mdW5jdGlvbiBGKGUpe3JldHVybiBlPX5+TWF0aC5jZWlsKCtlKSxlPDA/MDplfWZ1bmN0aW9uIEQoZSl7cmV0dXJuKEFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGUpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKX0pKGUpfWZ1bmN0aW9uIE8oZSl7cmV0dXJuIEQoZSl8fG8uaXNCdWZmZXIoZSl8fGUmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZcIm51bWJlclwiPT10eXBlb2YgZS5sZW5ndGh9ZnVuY3Rpb24gSChlKXtyZXR1cm4gZTwxNj9cIjBcIitlLnRvU3RyaW5nKDE2KTplLnRvU3RyaW5nKDE2KX1mdW5jdGlvbiBWKGUpe2Zvcih2YXIgdD1bXSxuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWUuY2hhckNvZGVBdChuKTtpZihyPD0xMjcpdC5wdXNoKGUuY2hhckNvZGVBdChuKSk7ZWxzZXt2YXIgbz1uO3I+PTU1Mjk2JiZyPD01NzM0MyYmbisrO2Zvcih2YXIgaT1lbmNvZGVVUklDb21wb25lbnQoZS5zbGljZShvLG4rMSkpLnN1YnN0cigxKS5zcGxpdChcIiVcIiksdT0wO3U8aS5sZW5ndGg7dSsrKXQucHVzaChwYXJzZUludChpW3VdLDE2KSl9fXJldHVybiB0fWZ1bmN0aW9uIHEoZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl0LnB1c2goMjU1JmUuY2hhckNvZGVBdChuKSk7cmV0dXJuIHR9ZnVuY3Rpb24gUChlKXtmb3IodmFyIHQsbixyLG89W10saT0wO2k8ZS5sZW5ndGg7aSsrKXQ9ZS5jaGFyQ29kZUF0KGkpLG49dD4+OCxyPXQlMjU2LG8ucHVzaChyKSxvLnB1c2gobik7cmV0dXJuIG99ZnVuY3Rpb24gUihlKXtyZXR1cm4gRy50b0J5dGVBcnJheShlKX1mdW5jdGlvbiBXKGUsdCxuLHIpe2Zvcih2YXIgbz0wO288ciYmIShvK24+PXQubGVuZ3RofHxvPj1lLmxlbmd0aCk7bysrKXRbbytuXT1lW29dO3JldHVybiBvfWZ1bmN0aW9uIEooZSl7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZSl9Y2F0Y2godCl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNjU1MzMpfX1mdW5jdGlvbiBLKGUsdCl7JChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksJChlPj0wLFwic3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWVcIiksJChlPD10LFwidmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZVwiKSwkKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24geihlLHQsbil7JChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksJChlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLCQoZT49bixcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIiksJChNYXRoLmZsb29yKGUpPT09ZSxcInZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50XCIpfWZ1bmN0aW9uIFgoZSx0LG4peyQoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLCQoZTw9dCxcInZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZVwiKSwkKGU+PW4sXCJ2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlXCIpfWZ1bmN0aW9uICQoZSx0KXtpZighZSl0aHJvdyBuZXcgRXJyb3IodHx8XCJGYWlsZWQgYXNzZXJ0aW9uXCIpfXZhciBHPWUoXCJiYXNlNjQtanNcIiksUT1lKFwiaWVlZTc1NFwiKTtuLkJ1ZmZlcj1vLG4uU2xvd0J1ZmZlcj1vLG4uSU5TUEVDVF9NQVhfQllURVM9NTAsby5wb29sU2l6ZT04MTkyLG8uX3VzZVR5cGVkQXJyYXlzPWZ1bmN0aW9uKCl7dHJ5e3ZhciBlPW5ldyBBcnJheUJ1ZmZlcigwKSx0PW5ldyBVaW50OEFycmF5KGUpO3JldHVybiB0LmZvbz1mdW5jdGlvbigpe3JldHVybiA0Mn0sNDI9PT10LmZvbygpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnN1YmFycmF5fWNhdGNoKG4pe3JldHVybiExfX0oKSxvLmlzRW5jb2Rpbmc9ZnVuY3Rpb24oZSl7c3dpdGNoKFN0cmluZyhlKS50b0xvd2VyQ2FzZSgpKXtjYXNlXCJoZXhcIjpjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOmNhc2VcImJhc2U2NFwiOmNhc2VcInJhd1wiOmNhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnJldHVybiEwO2RlZmF1bHQ6cmV0dXJuITF9fSxvLmlzQnVmZmVyPWZ1bmN0aW9uKGUpe3JldHVybiEobnVsbD09PWV8fHZvaWQgMD09PWV8fCFlLl9pc0J1ZmZlcil9LG8uYnl0ZUxlbmd0aD1mdW5jdGlvbihlLHQpe3ZhciBuO3N3aXRjaChlKz1cIlwiLHR8fFwidXRmOFwiKXtjYXNlXCJoZXhcIjpuPWUubGVuZ3RoLzI7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6bj1WKGUpLmxlbmd0aDticmVhaztjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOmNhc2VcInJhd1wiOm49ZS5sZW5ndGg7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6bj1SKGUpLmxlbmd0aDticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpuPTIqZS5sZW5ndGg7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiBufSxvLmNvbmNhdD1mdW5jdGlvbihlLHQpe2lmKCQoRChlKSxcIlVzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxubGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuXCIpLDA9PT1lLmxlbmd0aClyZXR1cm4gbmV3IG8oMCk7aWYoMT09PWUubGVuZ3RoKXJldHVybiBlWzBdO3ZhciBuO2lmKFwibnVtYmVyXCIhPXR5cGVvZiB0KWZvcih0PTAsbj0wO248ZS5sZW5ndGg7bisrKXQrPWVbbl0ubGVuZ3RoO3ZhciByPW5ldyBvKHQpLGk9MDtmb3Iobj0wO248ZS5sZW5ndGg7bisrKXt2YXIgdT1lW25dO3UuY29weShyLGkpLGkrPXUubGVuZ3RofXJldHVybiByfSxvLnByb3RvdHlwZS53cml0ZT1mdW5jdGlvbihlLHQsbixyKXtpZihpc0Zpbml0ZSh0KSlpc0Zpbml0ZShuKXx8KHI9bixuPXZvaWQgMCk7ZWxzZXt2YXIgbz1yO3I9dCx0PW4sbj1vfXQ9TnVtYmVyKHQpfHwwO3ZhciBpPXRoaXMubGVuZ3RoLXQ7bj8obj1OdW1iZXIobiksbj5pJiYobj1pKSk6bj1pLHI9U3RyaW5nKHJ8fFwidXRmOFwiKS50b0xvd2VyQ2FzZSgpO3ZhciB1O3N3aXRjaChyKXtjYXNlXCJoZXhcIjp1PWwodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6dT1kKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImFzY2lpXCI6dT1oKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImJpbmFyeVwiOnU9cCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjp1PWcodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6dT15KHRoaXMsZSx0LG4pO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gdX0sby5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPXRoaXM7aWYoZT1TdHJpbmcoZXx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCksdD1OdW1iZXIodCl8fDAsbj12b2lkIDAhPT1uP051bWJlcihuKTpuPXIubGVuZ3RoLG49PT10KXJldHVyblwiXCI7dmFyIG87c3dpdGNoKGUpe2Nhc2VcImhleFwiOm89XyhyLHQsbik7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6bz1iKHIsdCxuKTticmVhaztjYXNlXCJhc2NpaVwiOm89dihyLHQsbik7YnJlYWs7Y2FzZVwiYmluYXJ5XCI6bz1tKHIsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjpvPXcocix0LG4pO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm89RShyLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiBvfSxvLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm57dHlwZTpcIkJ1ZmZlclwiLGRhdGE6QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyfHx0aGlzLDApfX0sby5wcm90b3R5cGUuY29weT1mdW5jdGlvbihlLHQsbixyKXt2YXIgaT10aGlzO2lmKG58fChuPTApLHJ8fDA9PT1yfHwocj10aGlzLmxlbmd0aCksdHx8KHQ9MCksciE9PW4mJjAhPT1lLmxlbmd0aCYmMCE9PWkubGVuZ3RoKXskKHI+PW4sXCJzb3VyY2VFbmQgPCBzb3VyY2VTdGFydFwiKSwkKHQ+PTAmJnQ8ZS5sZW5ndGgsXCJ0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzXCIpLCQobj49MCYmbjxpLmxlbmd0aCxcInNvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHNcIiksJChyPj0wJiZyPD1pLmxlbmd0aCxcInNvdXJjZUVuZCBvdXQgb2YgYm91bmRzXCIpLHI+dGhpcy5sZW5ndGgmJihyPXRoaXMubGVuZ3RoKSxlLmxlbmd0aC10PHItbiYmKHI9ZS5sZW5ndGgtdCtuKTt2YXIgdT1yLW47aWYodTwxMDB8fCFvLl91c2VUeXBlZEFycmF5cylmb3IodmFyIGE9MDthPHU7YSsrKWVbYSt0XT10aGlzW2Erbl07ZWxzZSBlLl9zZXQodGhpcy5zdWJhcnJheShuLG4rdSksdCl9fSxvLnByb3RvdHlwZS5zbGljZT1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMubGVuZ3RoO2lmKGU9WShlLG4sMCksdD1ZKHQsbixuKSxvLl91c2VUeXBlZEFycmF5cylyZXR1cm4gby5fYXVnbWVudCh0aGlzLnN1YmFycmF5KGUsdCkpO2Zvcih2YXIgcj10LWUsaT1uZXcgbyhyLCh2b2lkIDApLCghMCkpLHU9MDt1PHI7dSsrKWlbdV09dGhpc1t1K2VdO3JldHVybiBpfSxvLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGNvbnNvbGUubG9nKFwiLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuXCIpLHRoaXMucmVhZFVJbnQ4KGUpfSxvLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gY29uc29sZS5sb2coXCIuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy53cml0ZVVJbnQ4KGUsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50OD1mdW5jdGlvbihlLHQpe2lmKHR8fCgkKHZvaWQgMCE9PWUmJm51bGwhPT1lLFwibWlzc2luZyBvZmZzZXRcIiksJChlPHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZT49dGhpcy5sZW5ndGgpKXJldHVybiB0aGlzW2VdfSxvLnByb3RvdHlwZS5yZWFkVUludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gSSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEEodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIG9mZnNldFwiKSwkKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpe3ZhciBuPTEyOCZ0aGlzW2VdO3JldHVybiBuPygyNTUtdGhpc1tlXSsxKSotMTp0aGlzW2VdfX0sby5wcm90b3R5cGUucmVhZEludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQih0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEIodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50MzJMRT1mdW5jdGlvbihlLHQpe3JldHVybiBMKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZEludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gTCh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRGbG9hdExFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIFUodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkRmxvYXRCRT1mdW5jdGlvbihlLHQpe3JldHVybiBVKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZERvdWJsZUxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHgodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkRG91YmxlQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4geCh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLndyaXRlVUludDg9ZnVuY3Rpb24oZSx0LG4pe258fCgkKHZvaWQgMCE9PWUmJm51bGwhPT1lLFwibWlzc2luZyB2YWx1ZVwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0PHRoaXMubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEsoZSwyNTUpKSx0Pj10aGlzLmxlbmd0aHx8KHRoaXNbdF09ZSl9LG8ucHJvdG90eXBlLndyaXRlVUludDE2TEU9ZnVuY3Rpb24oZSx0LG4pe1ModGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe1ModGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe2oodGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDMyQkU9ZnVuY3Rpb24oZSx0LG4pe2oodGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIHZhbHVlXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQ8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseihlLDEyNywtMTI4KSksdD49dGhpcy5sZW5ndGh8fChlPj0wP3RoaXMud3JpdGVVSW50OChlLHQsbik6dGhpcy53cml0ZVVJbnQ4KDI1NStlKzEsdCxuKSl9LG8ucHJvdG90eXBlLndyaXRlSW50MTZMRT1mdW5jdGlvbihlLHQsbil7Qyh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQxNkJFPWZ1bmN0aW9uKGUsdCxuKXtDKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe2sodGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlSW50MzJCRT1mdW5jdGlvbihlLHQsbil7ayh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVGbG9hdExFPWZ1bmN0aW9uKGUsdCxuKXtUKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZUZsb2F0QkU9ZnVuY3Rpb24oZSx0LG4pe1QodGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlRG91YmxlTEU9ZnVuY3Rpb24oZSx0LG4pe00odGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlRG91YmxlQkU9ZnVuY3Rpb24oZSx0LG4pe00odGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLmZpbGw9ZnVuY3Rpb24oZSx0LG4pe2lmKGV8fChlPTApLHR8fCh0PTApLG58fChuPXRoaXMubGVuZ3RoKSxcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9ZS5jaGFyQ29kZUF0KDApKSwkKFwibnVtYmVyXCI9PXR5cGVvZiBlJiYhaXNOYU4oZSksXCJ2YWx1ZSBpcyBub3QgYSBudW1iZXJcIiksJChuPj10LFwiZW5kIDwgc3RhcnRcIiksbiE9PXQmJjAhPT10aGlzLmxlbmd0aCl7JCh0Pj0wJiZ0PHRoaXMubGVuZ3RoLFwic3RhcnQgb3V0IG9mIGJvdW5kc1wiKSwkKG4+PTAmJm48PXRoaXMubGVuZ3RoLFwiZW5kIG91dCBvZiBib3VuZHNcIik7Zm9yKHZhciByPXQ7cjxuO3IrKyl0aGlzW3JdPWV9fSxvLnByb3RvdHlwZS5pbnNwZWN0PWZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9dGhpcy5sZW5ndGgscj0wO3I8dDtyKyspaWYoZVtyXT1IKHRoaXNbcl0pLHI9PT1uLklOU1BFQ1RfTUFYX0JZVEVTKXtlW3IrMV09XCIuLi5cIjticmVha31yZXR1cm5cIjxCdWZmZXIgXCIrZS5qb2luKFwiIFwiKStcIj5cIn0sby5wcm90b3R5cGUudG9BcnJheUJ1ZmZlcj1mdW5jdGlvbigpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5KXtpZihvLl91c2VUeXBlZEFycmF5cylyZXR1cm4gbmV3IG8odGhpcykuYnVmZmVyO2Zvcih2YXIgZT1uZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aCksdD0wLG49ZS5sZW5ndGg7dDxuO3QrPTEpZVt0XT10aGlzW3RdO3JldHVybiBlLmJ1ZmZlcn10aHJvdyBuZXcgRXJyb3IoXCJCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKX07dmFyIFo9by5wcm90b3R5cGU7by5fYXVnbWVudD1mdW5jdGlvbihlKXtyZXR1cm4gZS5faXNCdWZmZXI9ITAsZS5fZ2V0PWUuZ2V0LGUuX3NldD1lLnNldCxlLmdldD1aLmdldCxlLnNldD1aLnNldCxlLndyaXRlPVoud3JpdGUsZS50b1N0cmluZz1aLnRvU3RyaW5nLGUudG9Mb2NhbGVTdHJpbmc9Wi50b1N0cmluZyxlLnRvSlNPTj1aLnRvSlNPTixlLmNvcHk9Wi5jb3B5LGUuc2xpY2U9Wi5zbGljZSxlLnJlYWRVSW50OD1aLnJlYWRVSW50OCxlLnJlYWRVSW50MTZMRT1aLnJlYWRVSW50MTZMRSxlLnJlYWRVSW50MTZCRT1aLnJlYWRVSW50MTZCRSxlLnJlYWRVSW50MzJMRT1aLnJlYWRVSW50MzJMRSxlLnJlYWRVSW50MzJCRT1aLnJlYWRVSW50MzJCRSxlLnJlYWRJbnQ4PVoucmVhZEludDgsZS5yZWFkSW50MTZMRT1aLnJlYWRJbnQxNkxFLGUucmVhZEludDE2QkU9Wi5yZWFkSW50MTZCRSxlLnJlYWRJbnQzMkxFPVoucmVhZEludDMyTEUsZS5yZWFkSW50MzJCRT1aLnJlYWRJbnQzMkJFLGUucmVhZEZsb2F0TEU9Wi5yZWFkRmxvYXRMRSxlLnJlYWRGbG9hdEJFPVoucmVhZEZsb2F0QkUsZS5yZWFkRG91YmxlTEU9Wi5yZWFkRG91YmxlTEUsZS5yZWFkRG91YmxlQkU9Wi5yZWFkRG91YmxlQkUsZS53cml0ZVVJbnQ4PVoud3JpdGVVSW50OCxlLndyaXRlVUludDE2TEU9Wi53cml0ZVVJbnQxNkxFLGUud3JpdGVVSW50MTZCRT1aLndyaXRlVUludDE2QkUsZS53cml0ZVVJbnQzMkxFPVoud3JpdGVVSW50MzJMRSxlLndyaXRlVUludDMyQkU9Wi53cml0ZVVJbnQzMkJFLGUud3JpdGVJbnQ4PVoud3JpdGVJbnQ4LGUud3JpdGVJbnQxNkxFPVoud3JpdGVJbnQxNkxFLGUud3JpdGVJbnQxNkJFPVoud3JpdGVJbnQxNkJFLGUud3JpdGVJbnQzMkxFPVoud3JpdGVJbnQzMkxFLGUud3JpdGVJbnQzMkJFPVoud3JpdGVJbnQzMkJFLGUud3JpdGVGbG9hdExFPVoud3JpdGVGbG9hdExFLGUud3JpdGVGbG9hdEJFPVoud3JpdGVGbG9hdEJFLGUud3JpdGVEb3VibGVMRT1aLndyaXRlRG91YmxlTEUsZS53cml0ZURvdWJsZUJFPVoud3JpdGVEb3VibGVCRSxlLmZpbGw9Wi5maWxsLGUuaW5zcGVjdD1aLmluc3BlY3QsZS50b0FycmF5QnVmZmVyPVoudG9BcnJheUJ1ZmZlcixlfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlclwiKX0se1wiYmFzZTY0LWpzXCI6MixidWZmZXI6MyxpZWVlNzU0OjExLGxZcG9JMjoxMH1dLDQ6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtpZihlLmxlbmd0aCVwIT09MCl7dmFyIG49ZS5sZW5ndGgrKHAtZS5sZW5ndGglcCk7ZT1vLmNvbmNhdChbZSxnXSxuKX1mb3IodmFyIHI9W10saT10P2UucmVhZEludDMyQkU6ZS5yZWFkSW50MzJMRSx1PTA7dTxlLmxlbmd0aDt1Kz1wKXIucHVzaChpLmNhbGwoZSx1KSk7cmV0dXJuIHJ9ZnVuY3Rpb24gZChlLHQsbil7Zm9yKHZhciByPW5ldyBvKHQpLGk9bj9yLndyaXRlSW50MzJCRTpyLndyaXRlSW50MzJMRSx1PTA7dTxlLmxlbmd0aDt1KyspaS5jYWxsKHIsZVt1XSw0KnUsITApO3JldHVybiByfWZ1bmN0aW9uIGgoZSx0LG4scil7by5pc0J1ZmZlcihlKXx8KGU9bmV3IG8oZSkpO3ZhciBpPXQobChlLHIpLGUubGVuZ3RoKnkpO3JldHVybiBkKGksbixyKX12YXIgbz1lKFwiYnVmZmVyXCIpLkJ1ZmZlcixwPTQsZz1uZXcgbyhwKTtnLmZpbGwoMCk7dmFyIHk9ODt0LmV4cG9ydHM9e2hhc2g6aH19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9oZWxwZXJzLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSw1OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHQscixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBsKGUsdCxuKXtvLmlzQnVmZmVyKHQpfHwodD1uZXcgbyh0KSksby5pc0J1ZmZlcihuKXx8KG49bmV3IG8obikpLHQubGVuZ3RoPm0/dD1lKHQpOnQubGVuZ3RoPG0mJih0PW8uY29uY2F0KFt0LF9dLG0pKTtmb3IodmFyIHI9bmV3IG8obSksaT1uZXcgbyhtKSx1PTA7dTxtO3UrKylyW3VdPTU0XnRbdV0saVt1XT05Ml50W3VdO3ZhciBhPWUoby5jb25jYXQoW3Isbl0pKTtyZXR1cm4gZShvLmNvbmNhdChbaSxhXSkpfWZ1bmN0aW9uIGQoZSx0KXtlPWV8fFwic2hhMVwiO3ZhciBuPXZbZV0scj1bXSxpPTA7cmV0dXJuIG58fGgoXCJhbGdvcml0aG06XCIsZSxcImlzIG5vdCB5ZXQgc3VwcG9ydGVkXCIpLHt1cGRhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIG8uaXNCdWZmZXIoZSl8fChlPW5ldyBvKGUpKSxyLnB1c2goZSksaSs9ZS5sZW5ndGgsdGhpc30sZGlnZXN0OmZ1bmN0aW9uKGUpe3ZhciBpPW8uY29uY2F0KHIpLHU9dD9sKG4sdCxpKTpuKGkpO3JldHVybiByPW51bGwsZT91LnRvU3RyaW5nKGUpOnV9fX1mdW5jdGlvbiBoKCl7dmFyIGU9W10uc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oXCIgXCIpO3Rocm93IG5ldyBFcnJvcihbZSxcIndlIGFjY2VwdCBwdWxsIHJlcXVlc3RzXCIsXCJodHRwOi8vZ2l0aHViLmNvbS9kb21pbmljdGFyci9jcnlwdG8tYnJvd3NlcmlmeVwiXS5qb2luKFwiXFxuXCIpKX1mdW5jdGlvbiBwKGUsdCl7Zm9yKHZhciBuIGluIGUpdChlW25dLG4pfXZhciBvPWUoXCJidWZmZXJcIikuQnVmZmVyLGc9ZShcIi4vc2hhXCIpLHk9ZShcIi4vc2hhMjU2XCIpLHc9ZShcIi4vcm5nXCIpLGI9ZShcIi4vbWQ1XCIpLHY9e3NoYTE6ZyxzaGEyNTY6eSxtZDU6Yn0sbT02NCxfPW5ldyBvKG0pO18uZmlsbCgwKSxuLmNyZWF0ZUhhc2g9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSl9LG4uY3JlYXRlSG1hYz1mdW5jdGlvbihlLHQpe3JldHVybiBkKGUsdCl9LG4ucmFuZG9tQnl0ZXM9ZnVuY3Rpb24oZSx0KXtpZighdHx8IXQuY2FsbClyZXR1cm4gbmV3IG8odyhlKSk7dHJ5e3QuY2FsbCh0aGlzLHZvaWQgMCxuZXcgbyh3KGUpKSl9Y2F0Y2gobil7dChuKX19LHAoW1wiY3JlYXRlQ3JlZGVudGlhbHNcIixcImNyZWF0ZUNpcGhlclwiLFwiY3JlYXRlQ2lwaGVyaXZcIixcImNyZWF0ZURlY2lwaGVyXCIsXCJjcmVhdGVEZWNpcGhlcml2XCIsXCJjcmVhdGVTaWduXCIsXCJjcmVhdGVWZXJpZnlcIixcImNyZWF0ZURpZmZpZUhlbGxtYW5cIixcInBia2RmMlwiXSxmdW5jdGlvbihlKXtuW2VdPWZ1bmN0aW9uKCl7aChcInNvcnJ5LFwiLGUsXCJpcyBub3QgaW1wbGVtZW50ZWQgeWV0XCIpfX0pfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9tZDVcIjo2LFwiLi9ybmdcIjo3LFwiLi9zaGFcIjo4LFwiLi9zaGEyNTZcIjo5LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDY6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtlW3Q+PjVdfD0xMjg8PHQlMzIsZVsodCs2ND4+Pjk8PDQpKzE0XT10O2Zvcih2YXIgbj0xNzMyNTg0MTkzLHI9LTI3MTczMzg3OSxvPS0xNzMyNTg0MTk0LGk9MjcxNzMzODc4LHU9MDt1PGUubGVuZ3RoO3UrPTE2KXt2YXIgYT1uLGY9cixzPW8sYz1pO249aChuLHIsbyxpLGVbdSswXSw3LC02ODA4NzY5MzYpLGk9aChpLG4scixvLGVbdSsxXSwxMiwtMzg5NTY0NTg2KSxvPWgobyxpLG4scixlW3UrMl0sMTcsNjA2MTA1ODE5KSxyPWgocixvLGksbixlW3UrM10sMjIsLTEwNDQ1MjUzMzApLG49aChuLHIsbyxpLGVbdSs0XSw3LC0xNzY0MTg4OTcpLGk9aChpLG4scixvLGVbdSs1XSwxMiwxMjAwMDgwNDI2KSxvPWgobyxpLG4scixlW3UrNl0sMTcsLTE0NzMyMzEzNDEpLHI9aChyLG8saSxuLGVbdSs3XSwyMiwtNDU3MDU5ODMpLG49aChuLHIsbyxpLGVbdSs4XSw3LDE3NzAwMzU0MTYpLGk9aChpLG4scixvLGVbdSs5XSwxMiwtMTk1ODQxNDQxNyksbz1oKG8saSxuLHIsZVt1KzEwXSwxNywtNDIwNjMpLHI9aChyLG8saSxuLGVbdSsxMV0sMjIsLTE5OTA0MDQxNjIpLG49aChuLHIsbyxpLGVbdSsxMl0sNywxODA0NjAzNjgyKSxpPWgoaSxuLHIsbyxlW3UrMTNdLDEyLC00MDM0MTEwMSksbz1oKG8saSxuLHIsZVt1KzE0XSwxNywtMTUwMjAwMjI5MCkscj1oKHIsbyxpLG4sZVt1KzE1XSwyMiwxMjM2NTM1MzI5KSxuPXAobixyLG8saSxlW3UrMV0sNSwtMTY1Nzk2NTEwKSxpPXAoaSxuLHIsbyxlW3UrNl0sOSwtMTA2OTUwMTYzMiksbz1wKG8saSxuLHIsZVt1KzExXSwxNCw2NDM3MTc3MTMpLHI9cChyLG8saSxuLGVbdSswXSwyMCwtMzczODk3MzAyKSxuPXAobixyLG8saSxlW3UrNV0sNSwtNzAxNTU4NjkxKSxpPXAoaSxuLHIsbyxlW3UrMTBdLDksMzgwMTYwODMpLG89cChvLGksbixyLGVbdSsxNV0sMTQsLTY2MDQ3ODMzNSkscj1wKHIsbyxpLG4sZVt1KzRdLDIwLC00MDU1Mzc4NDgpLG49cChuLHIsbyxpLGVbdSs5XSw1LDU2ODQ0NjQzOCksaT1wKGksbixyLG8sZVt1KzE0XSw5LC0xMDE5ODAzNjkwKSxvPXAobyxpLG4scixlW3UrM10sMTQsLTE4NzM2Mzk2MSkscj1wKHIsbyxpLG4sZVt1KzhdLDIwLDExNjM1MzE1MDEpLG49cChuLHIsbyxpLGVbdSsxM10sNSwtMTQ0NDY4MTQ2NyksaT1wKGksbixyLG8sZVt1KzJdLDksLTUxNDAzNzg0KSxvPXAobyxpLG4scixlW3UrN10sMTQsMTczNTMyODQ3Mykscj1wKHIsbyxpLG4sZVt1KzEyXSwyMCwtMTkyNjYwNzczNCksbj1nKG4scixvLGksZVt1KzVdLDQsLTM3ODU1OCksaT1nKGksbixyLG8sZVt1KzhdLDExLC0yMDIyNTc0NDYzKSxvPWcobyxpLG4scixlW3UrMTFdLDE2LDE4MzkwMzA1NjIpLHI9ZyhyLG8saSxuLGVbdSsxNF0sMjMsLTM1MzA5NTU2KSxuPWcobixyLG8saSxlW3UrMV0sNCwtMTUzMDk5MjA2MCksaT1nKGksbixyLG8sZVt1KzRdLDExLDEyNzI4OTMzNTMpLG89ZyhvLGksbixyLGVbdSs3XSwxNiwtMTU1NDk3NjMyKSxyPWcocixvLGksbixlW3UrMTBdLDIzLC0xMDk0NzMwNjQwKSxuPWcobixyLG8saSxlW3UrMTNdLDQsNjgxMjc5MTc0KSxpPWcoaSxuLHIsbyxlW3UrMF0sMTEsLTM1ODUzNzIyMiksbz1nKG8saSxuLHIsZVt1KzNdLDE2LC03MjI1MjE5NzkpLHI9ZyhyLG8saSxuLGVbdSs2XSwyMyw3NjAyOTE4OSksbj1nKG4scixvLGksZVt1KzldLDQsLTY0MDM2NDQ4NyksaT1nKGksbixyLG8sZVt1KzEyXSwxMSwtNDIxODE1ODM1KSxvPWcobyxpLG4scixlW3UrMTVdLDE2LDUzMDc0MjUyMCkscj1nKHIsbyxpLG4sZVt1KzJdLDIzLC05OTUzMzg2NTEpLG49eShuLHIsbyxpLGVbdSswXSw2LC0xOTg2MzA4NDQpLGk9eShpLG4scixvLGVbdSs3XSwxMCwxMTI2ODkxNDE1KSxvPXkobyxpLG4scixlW3UrMTRdLDE1LC0xNDE2MzU0OTA1KSxyPXkocixvLGksbixlW3UrNV0sMjEsLTU3NDM0MDU1KSxuPXkobixyLG8saSxlW3UrMTJdLDYsMTcwMDQ4NTU3MSksaT15KGksbixyLG8sZVt1KzNdLDEwLC0xODk0OTg2NjA2KSxvPXkobyxpLG4scixlW3UrMTBdLDE1LC0xMDUxNTIzKSxyPXkocixvLGksbixlW3UrMV0sMjEsLTIwNTQ5MjI3OTkpLG49eShuLHIsbyxpLGVbdSs4XSw2LDE4NzMzMTMzNTkpLGk9eShpLG4scixvLGVbdSsxNV0sMTAsLTMwNjExNzQ0KSxvPXkobyxpLG4scixlW3UrNl0sMTUsLTE1NjAxOTgzODApLHI9eShyLG8saSxuLGVbdSsxM10sMjEsMTMwOTE1MTY0OSksbj15KG4scixvLGksZVt1KzRdLDYsLTE0NTUyMzA3MCksaT15KGksbixyLG8sZVt1KzExXSwxMCwtMTEyMDIxMDM3OSksbz15KG8saSxuLHIsZVt1KzJdLDE1LDcxODc4NzI1OSkscj15KHIsbyxpLG4sZVt1KzldLDIxLC0zNDM0ODU1NTEpLG49dyhuLGEpLHI9dyhyLGYpLG89dyhvLHMpLGk9dyhpLGMpfXJldHVybiBBcnJheShuLHIsbyxpKX1mdW5jdGlvbiBkKGUsdCxuLHIsbyxpKXtyZXR1cm4gdyhiKHcodyh0LGUpLHcocixpKSksbyksbil9ZnVuY3Rpb24gaChlLHQsbixyLG8saSx1KXtyZXR1cm4gZCh0Jm58fnQmcixlLHQsbyxpLHUpfWZ1bmN0aW9uIHAoZSx0LG4scixvLGksdSl7cmV0dXJuIGQodCZyfG4mfnIsZSx0LG8saSx1KX1mdW5jdGlvbiBnKGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKHRebl5yLGUsdCxvLGksdSl9ZnVuY3Rpb24geShlLHQsbixyLG8saSx1KXtyZXR1cm4gZChuXih0fH5yKSxlLHQsbyxpLHUpfWZ1bmN0aW9uIHcoZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpLHI9KGU+PjE2KSsodD4+MTYpKyhuPj4xNik7cmV0dXJuIHI8PDE2fDY1NTM1Jm59ZnVuY3Rpb24gYihlLHQpe3JldHVybiBlPDx0fGU+Pj4zMi10fXZhciB2PWUoXCIuL2hlbHBlcnNcIik7dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiB2Lmhhc2goZSxsLDE2KX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSw3OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKGUsbixyLG8saSx1LGEsZixzKXshZnVuY3Rpb24oKXt2YXIgZSxuLHI9dGhpcztlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCx0LG49bmV3IEFycmF5KGUpLHI9MDtyPGU7cisrKTA9PSgzJnIpJiYodD00Mjk0OTY3Mjk2Kk1hdGgucmFuZG9tKCkpLG5bcl09dD4+PigoMyZyKTw8MykmMjU1O3JldHVybiBufSxyLmNyeXB0byYmY3J5cHRvLmdldFJhbmRvbVZhbHVlcyYmKG49ZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXModCksdH0pLHQuZXhwb3J0cz1ufHxlfSgpfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSw4OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKG4scixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBsKGUsdCl7ZVt0Pj41XXw9MTI4PDwyNC10JTMyLGVbKHQrNjQ+Pjk8PDQpKzE1XT10O2Zvcih2YXIgbj1BcnJheSg4MCkscj0xNzMyNTg0MTkzLG89LTI3MTczMzg3OSxpPS0xNzMyNTg0MTk0LHU9MjcxNzMzODc4LGE9LTEwMDk1ODk3NzYsZj0wO2Y8ZS5sZW5ndGg7Zis9MTYpe2Zvcih2YXIgcz1yLGM9byxsPWkseT11LHc9YSxiPTA7Yjw4MDtiKyspe2I8MTY/bltiXT1lW2YrYl06bltiXT1nKG5bYi0zXV5uW2ItOF1ebltiLTE0XV5uW2ItMTZdLDEpO3ZhciB2PXAocChnKHIsNSksZChiLG8saSx1KSkscChwKGEsbltiXSksaChiKSkpO2E9dSx1PWksaT1nKG8sMzApLG89cixyPXZ9cj1wKHIscyksbz1wKG8sYyksaT1wKGksbCksdT1wKHUseSksYT1wKGEsdyl9cmV0dXJuIEFycmF5KHIsbyxpLHUsYSl9ZnVuY3Rpb24gZChlLHQsbixyKXtyZXR1cm4gZTwyMD90Jm58fnQmcjplPDQwP3Rebl5yOmU8NjA/dCZufHQmcnxuJnI6dF5uXnJ9ZnVuY3Rpb24gaChlKXtyZXR1cm4gZTwyMD8xNTE4NTAwMjQ5OmU8NDA/MTg1OTc3NTM5MzplPDYwPy0xODk0MDA3NTg4Oi04OTk0OTc1MTR9ZnVuY3Rpb24gcChlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn1mdW5jdGlvbiBnKGUsdCl7cmV0dXJuIGU8PHR8ZT4+PjMyLXR9dmFyIHk9ZShcIi4vaGVscGVyc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHkuaGFzaChlLGwsMjAsITApfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDk6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe3ZhciBsPWUoXCIuL2hlbHBlcnNcIiksZD1mdW5jdGlvbihlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn0saD1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+dHxlPDwzMi10fSxwPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fSxnPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZSZ0Xn5lJm59LHk9ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlJnReZSZuXnQmbn0sdz1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDIpXmgoZSwxMyleaChlLDIyKTtcbn0sYj1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDYpXmgoZSwxMSleaChlLDI1KX0sdj1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDcpXmgoZSwxOClecChlLDMpfSxtPWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsMTcpXmgoZSwxOSlecChlLDEwKX0sXz1mdW5jdGlvbihlLHQpe3ZhciBuLHIsbyxpLHUsYSxmLHMsYyxsLGgscCxfPW5ldyBBcnJheSgxMTE2MzUyNDA4LDE4OTk0NDc0NDEsMzA0OTMyMzQ3MSwzOTIxMDA5NTczLDk2MTk4NzE2MywxNTA4OTcwOTkzLDI0NTM2MzU3NDgsMjg3MDc2MzIyMSwzNjI0MzgxMDgwLDMxMDU5ODQwMSw2MDcyMjUyNzgsMTQyNjg4MTk4NywxOTI1MDc4Mzg4LDIxNjIwNzgyMDYsMjYxNDg4ODEwMywzMjQ4MjIyNTgwLDM4MzUzOTA0MDEsNDAyMjIyNDc3NCwyNjQzNDcwNzgsNjA0ODA3NjI4LDc3MDI1NTk4MywxMjQ5MTUwMTIyLDE1NTUwODE2OTIsMTk5NjA2NDk4NiwyNTU0MjIwODgyLDI4MjE4MzQzNDksMjk1Mjk5NjgwOCwzMjEwMzEzNjcxLDMzMzY1NzE4OTEsMzU4NDUyODcxMSwxMTM5MjY5OTMsMzM4MjQxODk1LDY2NjMwNzIwNSw3NzM1Mjk5MTIsMTI5NDc1NzM3MiwxMzk2MTgyMjkxLDE2OTUxODM3MDAsMTk4NjY2MTA1MSwyMTc3MDI2MzUwLDI0NTY5NTYwMzcsMjczMDQ4NTkyMSwyODIwMzAyNDExLDMyNTk3MzA4MDAsMzM0NTc2NDc3MSwzNTE2MDY1ODE3LDM2MDAzNTI4MDQsNDA5NDU3MTkwOSwyNzU0MjMzNDQsNDMwMjI3NzM0LDUwNjk0ODYxNiw2NTkwNjA1NTYsODgzOTk3ODc3LDk1ODEzOTU3MSwxMzIyODIyMjE4LDE1MzcwMDIwNjMsMTc0Nzg3Mzc3OSwxOTU1NTYyMjIyLDIwMjQxMDQ4MTUsMjIyNzczMDQ1MiwyMzYxODUyNDI0LDI0Mjg0MzY0NzQsMjc1NjczNDE4NywzMjA0MDMxNDc5LDMzMjkzMjUyOTgpLEU9bmV3IEFycmF5KDE3NzkwMzM3MDMsMzE0NDEzNDI3NywxMDEzOTA0MjQyLDI3NzM0ODA3NjIsMTM1OTg5MzExOSwyNjAwODIyOTI0LDUyODczNDYzNSwxNTQxNDU5MjI1KSxJPW5ldyBBcnJheSg2NCk7ZVt0Pj41XXw9MTI4PDwyNC10JTMyLGVbKHQrNjQ+Pjk8PDQpKzE1XT10O2Zvcih2YXIgYz0wO2M8ZS5sZW5ndGg7Yys9MTYpe249RVswXSxyPUVbMV0sbz1FWzJdLGk9RVszXSx1PUVbNF0sYT1FWzVdLGY9RVs2XSxzPUVbN107Zm9yKHZhciBsPTA7bDw2NDtsKyspbDwxNj9JW2xdPWVbbCtjXTpJW2xdPWQoZChkKG0oSVtsLTJdKSxJW2wtN10pLHYoSVtsLTE1XSkpLElbbC0xNl0pLGg9ZChkKGQoZChzLGIodSkpLGcodSxhLGYpKSxfW2xdKSxJW2xdKSxwPWQodyhuKSx5KG4scixvKSkscz1mLGY9YSxhPXUsdT1kKGksaCksaT1vLG89cixyPW4sbj1kKGgscCk7RVswXT1kKG4sRVswXSksRVsxXT1kKHIsRVsxXSksRVsyXT1kKG8sRVsyXSksRVszXT1kKGksRVszXSksRVs0XT1kKHUsRVs0XSksRVs1XT1kKGEsRVs1XSksRVs2XT1kKGYsRVs2XSksRVs3XT1kKHMsRVs3XSl9cmV0dXJuIEV9O3QuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4gbC5oYXNoKGUsXywzMiwhMCl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhMjU2LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjEwfV0sMTA6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSxuLHIsbyxpLHUsYSxmLHMpe2Z1bmN0aW9uIGMoKXt9dmFyIGU9dC5leHBvcnRzPXt9O2UubmV4dFRpY2s9ZnVuY3Rpb24oKXt2YXIgZT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuc2V0SW1tZWRpYXRlLHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LnBvc3RNZXNzYWdlJiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtpZihlKXJldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShlKX07aWYodCl7dmFyIG49W107cmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGZ1bmN0aW9uKGUpe3ZhciB0PWUuc291cmNlO2lmKCh0PT09d2luZG93fHxudWxsPT09dCkmJlwicHJvY2Vzcy10aWNrXCI9PT1lLmRhdGEmJihlLnN0b3BQcm9wYWdhdGlvbigpLG4ubGVuZ3RoPjApKXt2YXIgcj1uLnNoaWZ0KCk7cigpfX0sITApLGZ1bmN0aW9uKGUpe24ucHVzaChlKSx3aW5kb3cucG9zdE1lc3NhZ2UoXCJwcm9jZXNzLXRpY2tcIixcIipcIil9fXJldHVybiBmdW5jdGlvbihlKXtzZXRUaW1lb3V0KGUsMCl9fSgpLGUudGl0bGU9XCJicm93c2VyXCIsZS5icm93c2VyPSEwLGUuZW52PXt9LGUuYXJndj1bXSxlLm9uPWMsZS5hZGRMaXN0ZW5lcj1jLGUub25jZT1jLGUub2ZmPWMsZS5yZW1vdmVMaXN0ZW5lcj1jLGUucmVtb3ZlQWxsTGlzdGVuZXJzPWMsZS5lbWl0PWMsZS5iaW5kaW5nPWZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpfSxlLmN3ZD1mdW5jdGlvbigpe3JldHVyblwiL1wifSxlLmNoZGlyPWZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZFwiKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzXCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV0sMTE6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSx0LHIsbyxpLHUsYSxmLHMpe24ucmVhZD1mdW5jdGlvbihlLHQsbixyLG8pe3ZhciBpLHUsYT04Km8tci0xLGY9KDE8PGEpLTEscz1mPj4xLGM9LTcsbD1uP28tMTowLGQ9bj8tMToxLGg9ZVt0K2xdO2ZvcihsKz1kLGk9aCYoMTw8LWMpLTEsaD4+PS1jLGMrPWE7Yz4wO2k9MjU2KmkrZVt0K2xdLGwrPWQsYy09OCk7Zm9yKHU9aSYoMTw8LWMpLTEsaT4+PS1jLGMrPXI7Yz4wO3U9MjU2KnUrZVt0K2xdLGwrPWQsYy09OCk7aWYoMD09PWkpaT0xLXM7ZWxzZXtpZihpPT09ZilyZXR1cm4gdT9OYU46KGg/LTE6MSkqKDEvMCk7dSs9TWF0aC5wb3coMixyKSxpLT1zfXJldHVybihoPy0xOjEpKnUqTWF0aC5wb3coMixpLXIpfSxuLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgdSxhLGYscz04Kmktby0xLGM9KDE8PHMpLTEsbD1jPj4xLGQ9MjM9PT1vP01hdGgucG93KDIsLTI0KS1NYXRoLnBvdygyLC03Nyk6MCxoPXI/MDppLTEscD1yPzE6LTEsZz10PDB8fDA9PT10JiYxL3Q8MD8xOjA7Zm9yKHQ9TWF0aC5hYnModCksaXNOYU4odCl8fHQ9PT0xLzA/KGE9aXNOYU4odCk/MTowLHU9Yyk6KHU9TWF0aC5mbG9vcihNYXRoLmxvZyh0KS9NYXRoLkxOMiksdCooZj1NYXRoLnBvdygyLC11KSk8MSYmKHUtLSxmKj0yKSx0Kz11K2w+PTE/ZC9mOmQqTWF0aC5wb3coMiwxLWwpLHQqZj49MiYmKHUrKyxmLz0yKSx1K2w+PWM/KGE9MCx1PWMpOnUrbD49MT8oYT0odCpmLTEpKk1hdGgucG93KDIsbyksdSs9bCk6KGE9dCpNYXRoLnBvdygyLGwtMSkqTWF0aC5wb3coMixvKSx1PTApKTtvPj04O2VbbitoXT0yNTUmYSxoKz1wLGEvPTI1NixvLT04KTtmb3IodT11PDxvfGEscys9bztzPjA7ZVtuK2hdPTI1NSZ1LGgrPXAsdS89MjU2LHMtPTgpO2VbbitoLXBdfD0xMjgqZ319KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9pZWVlNzU0XCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV19LHt9LFsxXSkoMSl9KTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoQykgTWljcm9zb2Z0LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxudmFyIFJlZmxlY3Q7XHJcbihmdW5jdGlvbiAoUmVmbGVjdCkge1xyXG4gICAgLy8gTWV0YWRhdGEgUHJvcG9zYWxcclxuICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvXHJcbiAgICAoZnVuY3Rpb24gKGZhY3RvcnkpIHtcclxuICAgICAgICB2YXIgcm9vdCA9IHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxyXG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHRoaXMgPT09IFwib2JqZWN0XCIgPyB0aGlzIDpcclxuICAgICAgICAgICAgICAgICAgICBGdW5jdGlvbihcInJldHVybiB0aGlzO1wiKSgpO1xyXG4gICAgICAgIHZhciBleHBvcnRlciA9IG1ha2VFeHBvcnRlcihSZWZsZWN0KTtcclxuICAgICAgICBpZiAodHlwZW9mIHJvb3QuUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICByb290LlJlZmxlY3QgPSBSZWZsZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXhwb3J0ZXIgPSBtYWtlRXhwb3J0ZXIocm9vdC5SZWZsZWN0LCBleHBvcnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZhY3RvcnkoZXhwb3J0ZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1ha2VFeHBvcnRlcih0YXJnZXQsIHByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRba2V5XSAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cylcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyhrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9KShmdW5jdGlvbiAoZXhwb3J0ZXIpIHtcclxuICAgICAgICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuICAgICAgICAvLyBmZWF0dXJlIHRlc3QgZm9yIFN5bWJvbCBzdXBwb3J0XHJcbiAgICAgICAgdmFyIHN1cHBvcnRzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiO1xyXG4gICAgICAgIHZhciB0b1ByaW1pdGl2ZVN5bWJvbCA9IHN1cHBvcnRzU3ltYm9sICYmIHR5cGVvZiBTeW1ib2wudG9QcmltaXRpdmUgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wudG9QcmltaXRpdmUgOiBcIkBAdG9QcmltaXRpdmVcIjtcclxuICAgICAgICB2YXIgaXRlcmF0b3JTeW1ib2wgPSBzdXBwb3J0c1N5bWJvbCAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sLml0ZXJhdG9yIDogXCJAQGl0ZXJhdG9yXCI7XHJcbiAgICAgICAgdmFyIHN1cHBvcnRzQ3JlYXRlID0gdHlwZW9mIE9iamVjdC5jcmVhdGUgPT09IFwiZnVuY3Rpb25cIjsgLy8gZmVhdHVyZSB0ZXN0IGZvciBPYmplY3QuY3JlYXRlIHN1cHBvcnRcclxuICAgICAgICB2YXIgc3VwcG9ydHNQcm90byA9IHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXk7IC8vIGZlYXR1cmUgdGVzdCBmb3IgX19wcm90b19fIHN1cHBvcnRcclxuICAgICAgICB2YXIgZG93bkxldmVsID0gIXN1cHBvcnRzQ3JlYXRlICYmICFzdXBwb3J0c1Byb3RvO1xyXG4gICAgICAgIHZhciBIYXNoTWFwID0ge1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYW4gb2JqZWN0IGluIGRpY3Rpb25hcnkgbW9kZSAoYS5rLmEuIFwic2xvd1wiIG1vZGUgaW4gdjgpXHJcbiAgICAgICAgICAgIGNyZWF0ZTogc3VwcG9ydHNDcmVhdGVcclxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoT2JqZWN0LmNyZWF0ZShudWxsKSk7IH1cclxuICAgICAgICAgICAgICAgIDogc3VwcG9ydHNQcm90b1xyXG4gICAgICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoeyBfX3Byb3RvX186IG51bGwgfSk7IH1cclxuICAgICAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KHt9KTsgfSxcclxuICAgICAgICAgICAgaGFzOiBkb3duTGV2ZWxcclxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBoYXNPd24uY2FsbChtYXAsIGtleSk7IH1cclxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBrZXkgaW4gbWFwOyB9LFxyXG4gICAgICAgICAgICBnZXQ6IGRvd25MZXZlbFxyXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGhhc093bi5jYWxsKG1hcCwga2V5KSA/IG1hcFtrZXldIDogdW5kZWZpbmVkOyB9XHJcbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gbWFwW2tleV07IH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBMb2FkIGdsb2JhbCBvciBzaGltIHZlcnNpb25zIG9mIE1hcCwgU2V0LCBhbmQgV2Vha01hcFxyXG4gICAgICAgIHZhciBmdW5jdGlvblByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihGdW5jdGlvbik7XHJcbiAgICAgICAgdmFyIHVzZVBvbHlmaWxsID0gdHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnZbXCJSRUZMRUNUX01FVEFEQVRBX1VTRV9NQVBfUE9MWUZJTExcIl0gPT09IFwidHJ1ZVwiO1xyXG4gICAgICAgIHZhciBfTWFwID0gIXVzZVBvbHlmaWxsICYmIHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgTWFwLnByb3RvdHlwZS5lbnRyaWVzID09PSBcImZ1bmN0aW9uXCIgPyBNYXAgOiBDcmVhdGVNYXBQb2x5ZmlsbCgpO1xyXG4gICAgICAgIHZhciBfU2V0ID0gIXVzZVBvbHlmaWxsICYmIHR5cGVvZiBTZXQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5lbnRyaWVzID09PSBcImZ1bmN0aW9uXCIgPyBTZXQgOiBDcmVhdGVTZXRQb2x5ZmlsbCgpO1xyXG4gICAgICAgIHZhciBfV2Vha01hcCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgV2Vha01hcCA9PT0gXCJmdW5jdGlvblwiID8gV2Vha01hcCA6IENyZWF0ZVdlYWtNYXBQb2x5ZmlsbCgpO1xyXG4gICAgICAgIC8vIFtbTWV0YWRhdGFdXSBpbnRlcm5hbCBzbG90XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzXHJcbiAgICAgICAgdmFyIE1ldGFkYXRhID0gbmV3IF9XZWFrTWFwKCk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQXBwbGllcyBhIHNldCBvZiBkZWNvcmF0b3JzIHRvIGEgcHJvcGVydHkgb2YgYSB0YXJnZXQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSBkZWNvcmF0b3JzIEFuIGFycmF5IG9mIGRlY29yYXRvcnMuXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IHRvIGRlY29yYXRlLlxyXG4gICAgICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzIChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIHRoZSB0YXJnZXQga2V5LlxyXG4gICAgICAgICAqIEByZW1hcmtzIERlY29yYXRvcnMgYXJlIGFwcGxpZWQgaW4gcmV2ZXJzZSBvcmRlci5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIEV4YW1wbGUgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIsXHJcbiAgICAgICAgICogICAgICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIixcclxuICAgICAgICAgKiAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpKSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIixcclxuICAgICAgICAgKiAgICAgICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIixcclxuICAgICAgICAgKiAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKSkpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc0FycmF5KGRlY29yYXRvcnMpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KGF0dHJpYnV0ZXMpICYmICFJc1VuZGVmaW5lZChhdHRyaWJ1dGVzKSAmJiAhSXNOdWxsKGF0dHJpYnV0ZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIGlmIChJc051bGwoYXR0cmlidXRlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRGVjb3JhdGVQcm9wZXJ0eShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghSXNBcnJheShkZWNvcmF0b3JzKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzQ29uc3RydWN0b3IodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRGVjb3JhdGVDb25zdHJ1Y3RvcihkZWNvcmF0b3JzLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiZGVjb3JhdGVcIiwgZGVjb3JhdGUpO1xyXG4gICAgICAgIC8vIDQuMS4yIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jcmVmbGVjdC5tZXRhZGF0YVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgZGVmYXVsdCBtZXRhZGF0YSBkZWNvcmF0b3IgZmFjdG9yeSB0aGF0IGNhbiBiZSB1c2VkIG9uIGEgY2xhc3MsIGNsYXNzIG1lbWJlciwgb3IgcGFyYW1ldGVyLlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBUaGUga2V5IGZvciB0aGUgbWV0YWRhdGEgZW50cnkuXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhVmFsdWUgVGhlIHZhbHVlIGZvciB0aGUgbWV0YWRhdGEgZW50cnkuXHJcbiAgICAgICAgICogQHJldHVybnMgQSBkZWNvcmF0b3IgZnVuY3Rpb24uXHJcbiAgICAgICAgICogQHJlbWFya3NcclxuICAgICAgICAgKiBJZiBgbWV0YWRhdGFLZXlgIGlzIGFscmVhZHkgZGVmaW5lZCBmb3IgdGhlIHRhcmdldCBhbmQgdGFyZ2V0IGtleSwgdGhlXHJcbiAgICAgICAgICogbWV0YWRhdGFWYWx1ZSBmb3IgdGhhdCBrZXkgd2lsbCBiZSBvdmVyd3JpdHRlbi5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yLCBUeXBlU2NyaXB0IG9ubHkpXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUsIFR5cGVTY3JpcHQgb25seSlcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxyXG4gICAgICAgICAqICAgICAgICAgcHJvcGVydHk7XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkgJiYgIUlzUHJvcGVydHlLZXkocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWNvcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwibWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluZSBhIHVuaXF1ZSBtZXRhZGF0YSBlbnRyeSBvbiB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFWYWx1ZSBBIHZhbHVlIHRoYXQgY29udGFpbnMgYXR0YWNoZWQgbWV0YWRhdGEuXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0byBkZWZpbmUgbWV0YWRhdGEuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gZGVjb3JhdG9yIGZhY3RvcnkgYXMgbWV0YWRhdGEtcHJvZHVjaW5nIGFubm90YXRpb24uXHJcbiAgICAgICAgICogICAgIGZ1bmN0aW9uIE15QW5ub3RhdGlvbihvcHRpb25zKTogRGVjb3JhdG9yIHtcclxuICAgICAgICAgKiAgICAgICAgIHJldHVybiAodGFyZ2V0LCBrZXk/KSA9PiBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgdGFyZ2V0LCBrZXkpO1xyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBkZWZpbmVNZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImRlZmluZU1ldGFkYXRhXCIsIGRlZmluZU1ldGFkYXRhKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4gaGFzIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEga2V5IHdhcyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW47IG90aGVyd2lzZSwgYGZhbHNlYC5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBoYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImhhc01ldGFkYXRhXCIsIGhhc01ldGFkYXRhKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB0YXJnZXQgb2JqZWN0IGhhcyB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG1ldGFkYXRhIGtleSB3YXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdDsgb3RoZXJ3aXNlLCBgZmFsc2VgLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiaGFzT3duTWV0YWRhdGFcIiwgaGFzT3duTWV0YWRhdGEpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IG9uIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4uXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBrZXkgaWYgZm91bmQ7IG90aGVyd2lzZSwgYHVuZGVmaW5lZGAuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRNZXRhZGF0YVwiLCBnZXRNZXRhZGF0YSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgb24gdGhlIHRhcmdldCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBrZXkgaWYgZm91bmQ7IG90aGVyd2lzZSwgYHVuZGVmaW5lZGAuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0T3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRPd25NZXRhZGF0YVwiLCBnZXRPd25NZXRhZGF0YSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgbWV0YWRhdGEga2V5cyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4uXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHVuaXF1ZSBtZXRhZGF0YSBrZXlzLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5TWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImdldE1ldGFkYXRhS2V5c1wiLCBnZXRNZXRhZGF0YUtleXMpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIHVuaXF1ZSBtZXRhZGF0YSBrZXlzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHVuaXF1ZSBtZXRhZGF0YSBrZXlzLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImdldE93bk1ldGFkYXRhS2V5c1wiLCBnZXRPd25NZXRhZGF0YUtleXMpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlbGV0ZXMgdGhlIG1ldGFkYXRhIGVudHJ5IGZyb20gdGhlIHRhcmdldCBvYmplY3Qgd2l0aCB0aGUgcHJvdmlkZWQga2V5LlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBlbnRyeSB3YXMgZm91bmQgYW5kIGRlbGV0ZWQ7IG90aGVyd2lzZSwgZmFsc2UuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgLypDcmVhdGUqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghbWV0YWRhdGFNYXAuZGVsZXRlKG1ldGFkYXRhS2V5KSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhTWFwLnNpemUgPiAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRNZXRhZGF0YSA9IE1ldGFkYXRhLmdldCh0YXJnZXQpO1xyXG4gICAgICAgICAgICB0YXJnZXRNZXRhZGF0YS5kZWxldGUocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0TWV0YWRhdGEuc2l6ZSA+IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgTWV0YWRhdGEuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImRlbGV0ZU1ldGFkYXRhXCIsIGRlbGV0ZU1ldGFkYXRhKTtcclxuICAgICAgICBmdW5jdGlvbiBEZWNvcmF0ZUNvbnN0cnVjdG9yKGRlY29yYXRvcnMsIHRhcmdldCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRvciA9IGRlY29yYXRvcnNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdGVkID0gZGVjb3JhdG9yKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKGRlY29yYXRlZCkgJiYgIUlzTnVsbChkZWNvcmF0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc0NvbnN0cnVjdG9yKGRlY29yYXRlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBkZWNvcmF0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gRGVjb3JhdGVQcm9wZXJ0eShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0ZWQgPSBkZWNvcmF0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKGRlY29yYXRlZCkgJiYgIUlzTnVsbChkZWNvcmF0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChkZWNvcmF0ZWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvciA9IGRlY29yYXRlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCBDcmVhdGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gTWV0YWRhdGEuZ2V0KE8pO1xyXG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQodGFyZ2V0TWV0YWRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUNyZWF0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEgPSBuZXcgX01hcCgpO1xyXG4gICAgICAgICAgICAgICAgTWV0YWRhdGEuc2V0KE8sIHRhcmdldE1ldGFkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSB0YXJnZXRNZXRhZGF0YS5nZXQoUCk7XHJcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghQ3JlYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YU1hcCA9IG5ldyBfTWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRNZXRhZGF0YS5zZXQoUCwgbWV0YWRhdGFNYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YU1hcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMy4xLjEuMSBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5aGFzbWV0YWRhdGFcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XHJcbiAgICAgICAgICAgIHZhciBoYXNPd24gPSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcclxuICAgICAgICAgICAgaWYgKGhhc093bilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcclxuICAgICAgICAgICAgaWYgKCFJc051bGwocGFyZW50KSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDMuMS4yLjEgT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWhhc293bm1ldGFkYXRhXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xyXG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gVG9Cb29sZWFuKG1ldGFkYXRhTWFwLmhhcyhNZXRhZGF0YUtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAzLjEuMy4xIE9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlnZXRtZXRhZGF0YVxyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcclxuICAgICAgICAgICAgdmFyIGhhc093biA9IE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcclxuICAgICAgICAgICAgaWYgKCFJc051bGwocGFyZW50KSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAzLjEuNC4xIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlnZXRvd25tZXRhZGF0YVxyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcclxuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YU1hcC5nZXQoTWV0YWRhdGFLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAzLjEuNS4xIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUsIE8sIFApXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlkZWZpbmVvd25tZXRhZGF0YVxyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUsIE8sIFApIHtcclxuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIHRydWUpO1xyXG4gICAgICAgICAgICBtZXRhZGF0YU1hcC5zZXQoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAzLjEuNi4xIE9yZGluYXJ5TWV0YWRhdGFLZXlzKE8sIFApXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnltZXRhZGF0YWtleXNcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeU1ldGFkYXRhS2V5cyhPLCBQKSB7XHJcbiAgICAgICAgICAgIHZhciBvd25LZXlzID0gT3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUCk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xyXG4gICAgICAgICAgICBpZiAocGFyZW50ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG93bktleXM7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRLZXlzID0gT3JkaW5hcnlNZXRhZGF0YUtleXMocGFyZW50LCBQKTtcclxuICAgICAgICAgICAgaWYgKHBhcmVudEtleXMubGVuZ3RoIDw9IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3duS2V5cztcclxuICAgICAgICAgICAgaWYgKG93bktleXMubGVuZ3RoIDw9IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50S2V5cztcclxuICAgICAgICAgICAgdmFyIHNldCA9IG5ldyBfU2V0KCk7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgb3duS2V5c18xID0gb3duS2V5czsgX2kgPCBvd25LZXlzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gb3duS2V5c18xW19pXTtcclxuICAgICAgICAgICAgICAgIHZhciBoYXNLZXkgPSBzZXQuaGFzKGtleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0tleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldC5hZGQoa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBfYSA9IDAsIHBhcmVudEtleXNfMSA9IHBhcmVudEtleXM7IF9hIDwgcGFyZW50S2V5c18xLmxlbmd0aDsgX2ErKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IHBhcmVudEtleXNfMVtfYV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzS2V5ID0gc2V0LmhhcyhrZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXQuYWRkKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDMuMS43LjEgT3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUClcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeW93bm1ldGFkYXRha2V5c1xyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgICAgICAgICB2YXIga2V5c09iaiA9IG1ldGFkYXRhTWFwLmtleXMoKTtcclxuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gR2V0SXRlcmF0b3Ioa2V5c09iaik7XHJcbiAgICAgICAgICAgIHZhciBrID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKTtcclxuICAgICAgICAgICAgICAgIGlmICghbmV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXMubGVuZ3RoID0gaztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBuZXh0VmFsdWUgPSBJdGVyYXRvclZhbHVlKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlzW2tdID0gbmV4dFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDYgRUNNQVNjcmlwdCBEYXRhIFR5cDBlcyBhbmQgVmFsdWVzXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1kYXRhLXR5cGVzLWFuZC12YWx1ZXNcclxuICAgICAgICBmdW5jdGlvbiBUeXBlKHgpIHtcclxuICAgICAgICAgICAgaWYgKHggPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvKiBOdWxsICovO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiB4KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6IHJldHVybiAwIC8qIFVuZGVmaW5lZCAqLztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiAyIC8qIEJvb2xlYW4gKi87XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiAzIC8qIFN0cmluZyAqLztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzeW1ib2xcIjogcmV0dXJuIDQgLyogU3ltYm9sICovO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gNSAvKiBOdW1iZXIgKi87XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6IHJldHVybiB4ID09PSBudWxsID8gMSAvKiBOdWxsICovIDogNiAvKiBPYmplY3QgKi87XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gNiAvKiBPYmplY3QgKi87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNi4xLjEgVGhlIFVuZGVmaW5lZCBUeXBlXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy11bmRlZmluZWQtdHlwZVxyXG4gICAgICAgIGZ1bmN0aW9uIElzVW5kZWZpbmVkKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHggPT09IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNi4xLjIgVGhlIE51bGwgVHlwZVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMtbnVsbC10eXBlXHJcbiAgICAgICAgZnVuY3Rpb24gSXNOdWxsKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHggPT09IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDYuMS41IFRoZSBTeW1ib2wgVHlwZVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMtc3ltYm9sLXR5cGVcclxuICAgICAgICBmdW5jdGlvbiBJc1N5bWJvbCh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNi4xLjcgVGhlIE9iamVjdCBUeXBlXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LXR5cGVcclxuICAgICAgICBmdW5jdGlvbiBJc09iamVjdCh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIiA/IHggIT09IG51bGwgOiB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjEgVHlwZSBDb252ZXJzaW9uXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdHlwZS1jb252ZXJzaW9uXHJcbiAgICAgICAgLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcclxuICAgICAgICBmdW5jdGlvbiBUb1ByaW1pdGl2ZShpbnB1dCwgUHJlZmVycmVkVHlwZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKFR5cGUoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDAgLyogVW5kZWZpbmVkICovOiByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEgLyogTnVsbCAqLzogcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyIC8qIEJvb2xlYW4gKi86IHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgMyAvKiBTdHJpbmcgKi86IHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiBTeW1ib2wgKi86IHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgNSAvKiBOdW1iZXIgKi86IHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaGludCA9IFByZWZlcnJlZFR5cGUgPT09IDMgLyogU3RyaW5nICovID8gXCJzdHJpbmdcIiA6IFByZWZlcnJlZFR5cGUgPT09IDUgLyogTnVtYmVyICovID8gXCJudW1iZXJcIiA6IFwiZGVmYXVsdFwiO1xyXG4gICAgICAgICAgICB2YXIgZXhvdGljVG9QcmltID0gR2V0TWV0aG9kKGlucHV0LCB0b1ByaW1pdGl2ZVN5bWJvbCk7XHJcbiAgICAgICAgICAgIGlmIChleG90aWNUb1ByaW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGV4b3RpY1RvUHJpbS5jYWxsKGlucHV0LCBoaW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChJc09iamVjdChyZXN1bHQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIGhpbnQgPT09IFwiZGVmYXVsdFwiID8gXCJudW1iZXJcIiA6IGhpbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjEuMS4xIE9yZGluYXJ5VG9QcmltaXRpdmUoTywgaGludClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcmRpbmFyeXRvcHJpbWl0aXZlXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlUb1ByaW1pdGl2ZShPLCBoaW50KSB7XHJcbiAgICAgICAgICAgIGlmIChoaW50ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9TdHJpbmdfMSA9IE8udG9TdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh0b1N0cmluZ18xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0b1N0cmluZ18xLmNhbGwoTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlT2YgPSBPLnZhbHVlT2Y7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh2YWx1ZU9mKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZU9mLmNhbGwoTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlT2YgPSBPLnZhbHVlT2Y7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh2YWx1ZU9mKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZU9mLmNhbGwoTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRvU3RyaW5nXzIgPSBPLnRvU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodG9TdHJpbmdfMikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdG9TdHJpbmdfMi5jYWxsKE8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMS4yIFRvQm9vbGVhbihhcmd1bWVudClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvMjAxNi8jc2VjLXRvYm9vbGVhblxyXG4gICAgICAgIGZ1bmN0aW9uIFRvQm9vbGVhbihhcmd1bWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISFhcmd1bWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4xLjEyIFRvU3RyaW5nKGFyZ3VtZW50KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvc3RyaW5nXHJcbiAgICAgICAgZnVuY3Rpb24gVG9TdHJpbmcoYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBhcmd1bWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4xLjE0IFRvUHJvcGVydHlLZXkoYXJndW1lbnQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxyXG4gICAgICAgIGZ1bmN0aW9uIFRvUHJvcGVydHlLZXkoYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGtleSA9IFRvUHJpbWl0aXZlKGFyZ3VtZW50LCAzIC8qIFN0cmluZyAqLyk7XHJcbiAgICAgICAgICAgIGlmIChJc1N5bWJvbChrZXkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICAgICAgcmV0dXJuIFRvU3RyaW5nKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMiBUZXN0aW5nIGFuZCBDb21wYXJpc29uIE9wZXJhdGlvbnNcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10ZXN0aW5nLWFuZC1jb21wYXJpc29uLW9wZXJhdGlvbnNcclxuICAgICAgICAvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzYXJyYXlcclxuICAgICAgICBmdW5jdGlvbiBJc0FycmF5KGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5XHJcbiAgICAgICAgICAgICAgICA/IEFycmF5LmlzQXJyYXkoYXJndW1lbnQpXHJcbiAgICAgICAgICAgICAgICA6IGFyZ3VtZW50IGluc3RhbmNlb2YgT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgPyBhcmd1bWVudCBpbnN0YW5jZW9mIEFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpID09PSBcIltvYmplY3QgQXJyYXldXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMi4zIElzQ2FsbGFibGUoYXJndW1lbnQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxyXG4gICAgICAgIGZ1bmN0aW9uIElzQ2FsbGFibGUoYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gTk9URTogVGhpcyBpcyBhbiBhcHByb3hpbWF0aW9uIGFzIHdlIGNhbm5vdCBjaGVjayBmb3IgW1tDYWxsXV0gaW50ZXJuYWwgbWV0aG9kLlxyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09PSBcImZ1bmN0aW9uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMi40IElzQ29uc3RydWN0b3IoYXJndW1lbnQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNjb25zdHJ1Y3RvclxyXG4gICAgICAgIGZ1bmN0aW9uIElzQ29uc3RydWN0b3IoYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gTk9URTogVGhpcyBpcyBhbiBhcHByb3hpbWF0aW9uIGFzIHdlIGNhbm5vdCBjaGVjayBmb3IgW1tDb25zdHJ1Y3RdXSBpbnRlcm5hbCBtZXRob2QuXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT09IFwiZnVuY3Rpb25cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4yLjcgSXNQcm9wZXJ0eUtleShhcmd1bWVudClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc3Byb3BlcnR5a2V5XHJcbiAgICAgICAgZnVuY3Rpb24gSXNQcm9wZXJ0eUtleShhcmd1bWVudCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKFR5cGUoYXJndW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMgLyogU3RyaW5nICovOiByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiBTeW1ib2wgKi86IHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMyBPcGVyYXRpb25zIG9uIE9iamVjdHNcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcGVyYXRpb25zLW9uLW9iamVjdHNcclxuICAgICAgICAvLyA3LjMuOSBHZXRNZXRob2QoViwgUClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXRtZXRob2RcclxuICAgICAgICBmdW5jdGlvbiBHZXRNZXRob2QoViwgUCkge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9IFZbUF07XHJcbiAgICAgICAgICAgIGlmIChmdW5jID09PSB1bmRlZmluZWQgfHwgZnVuYyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmICghSXNDYWxsYWJsZShmdW5jKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuNCBPcGVyYXRpb25zIG9uIEl0ZXJhdG9yIE9iamVjdHNcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcGVyYXRpb25zLW9uLWl0ZXJhdG9yLW9iamVjdHNcclxuICAgICAgICBmdW5jdGlvbiBHZXRJdGVyYXRvcihvYmopIHtcclxuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IEdldE1ldGhvZChvYmosIGl0ZXJhdG9yU3ltYm9sKTtcclxuICAgICAgICAgICAgaWYgKCFJc0NhbGxhYmxlKG1ldGhvZCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7IC8vIGZyb20gQ2FsbFxyXG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBtZXRob2QuY2FsbChvYmopO1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KGl0ZXJhdG9yKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjQuNCBJdGVyYXRvclZhbHVlKGl0ZXJSZXN1bHQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLzIwMTYvI3NlYy1pdGVyYXRvcnZhbHVlXHJcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JWYWx1ZShpdGVyUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVyUmVzdWx0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjQuNSBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXRlcmF0b3JzdGVwXHJcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IGZhbHNlIDogcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWl0ZXJhdG9yY2xvc2VcclxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBmID0gaXRlcmF0b3JbXCJyZXR1cm5cIl07XHJcbiAgICAgICAgICAgIGlmIChmKVxyXG4gICAgICAgICAgICAgICAgZi5jYWxsKGl0ZXJhdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gOS4xIE9yZGluYXJ5IE9iamVjdCBJbnRlcm5hbCBNZXRob2RzIGFuZCBJbnRlcm5hbCBTbG90c1xyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9yZGluYXJ5LW9iamVjdC1pbnRlcm5hbC1tZXRob2RzLWFuZC1pbnRlcm5hbC1zbG90c1xyXG4gICAgICAgIC8vIDkuMS4xLjEgT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9yZGluYXJ5Z2V0cHJvdG90eXBlb2ZcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pIHtcclxuICAgICAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIE8gIT09IFwiZnVuY3Rpb25cIiB8fCBPID09PSBmdW5jdGlvblByb3RvdHlwZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcclxuICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCBkb2Vzbid0IHNldCBfX3Byb3RvX18gaW4gRVM1LCBhcyBpdCdzIG5vbi1zdGFuZGFyZC5cclxuICAgICAgICAgICAgLy8gVHJ5IHRvIGRldGVybWluZSB0aGUgc3VwZXJjbGFzcyBjb25zdHJ1Y3Rvci4gQ29tcGF0aWJsZSBpbXBsZW1lbnRhdGlvbnNcclxuICAgICAgICAgICAgLy8gbXVzdCBlaXRoZXIgc2V0IF9fcHJvdG9fXyBvbiBhIHN1YmNsYXNzIGNvbnN0cnVjdG9yIHRvIHRoZSBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLFxyXG4gICAgICAgICAgICAvLyBvciBlbnN1cmUgZWFjaCBjbGFzcyBoYXMgYSB2YWxpZCBgY29uc3RydWN0b3JgIHByb3BlcnR5IG9uIGl0cyBwcm90b3R5cGUgdGhhdFxyXG4gICAgICAgICAgICAvLyBwb2ludHMgYmFjayB0byB0aGUgY29uc3RydWN0b3IuXHJcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgbm90IHRoZSBzYW1lIGFzIEZ1bmN0aW9uLltbUHJvdG90eXBlXV0sIHRoZW4gdGhpcyBpcyBkZWZpbmF0ZWx5IGluaGVyaXRlZC5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIGluIEVTNiBvciB3aGVuIHVzaW5nIF9fcHJvdG9fXyBpbiBhIGNvbXBhdGlibGUgYnJvd3Nlci5cclxuICAgICAgICAgICAgaWYgKHByb3RvICE9PSBmdW5jdGlvblByb3RvdHlwZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcclxuICAgICAgICAgICAgLy8gSWYgdGhlIHN1cGVyIHByb3RvdHlwZSBpcyBPYmplY3QucHJvdG90eXBlLCBudWxsLCBvciB1bmRlZmluZWQsIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXHJcbiAgICAgICAgICAgIHZhciBwcm90b3R5cGUgPSBPLnByb3RvdHlwZTtcclxuICAgICAgICAgICAgdmFyIHByb3RvdHlwZVByb3RvID0gcHJvdG90eXBlICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpO1xyXG4gICAgICAgICAgICBpZiAocHJvdG90eXBlUHJvdG8gPT0gbnVsbCB8fCBwcm90b3R5cGVQcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcclxuICAgICAgICAgICAgLy8gSWYgdGhlIGNvbnN0cnVjdG9yIHdhcyBub3QgYSBmdW5jdGlvbiwgdGhlbiB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBoZXJpdGFnZS5cclxuICAgICAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gcHJvdG90eXBlUHJvdG8uY29uc3RydWN0b3I7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcclxuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBzb21lIGtpbmQgb2Ygc2VsZi1yZWZlcmVuY2UsIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXHJcbiAgICAgICAgICAgIGlmIChjb25zdHJ1Y3RvciA9PT0gTylcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcclxuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHByZXR0eSBnb29kIGd1ZXNzIGF0IHRoZSBoZXJpdGFnZS5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBuYWl2ZSBNYXAgc2hpbVxyXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZU1hcFBvbHlmaWxsKCkge1xyXG4gICAgICAgICAgICB2YXIgY2FjaGVTZW50aW5lbCA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgYXJyYXlTZW50aW5lbCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgTWFwSXRlcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gTWFwSXRlcmF0b3Ioa2V5cywgdmFsdWVzLCBzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0ga2V5cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZVtcIkBAaXRlcmF0b3JcIl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xyXG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XHJcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuX2tleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9zZWxlY3Rvcih0aGlzLl9rZXlzW2luZGV4XSwgdGhpcy5fdmFsdWVzW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCArIDEgPj0gdGhpcy5fa2V5cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGFycmF5U2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiByZXN1bHQsIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGUudGhyb3cgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6IHRydWUgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWFwSXRlcmF0b3I7XHJcbiAgICAgICAgICAgIH0oKSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gTWFwKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IC0yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1hcC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9rZXlzLmxlbmd0aDsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKSA+PSAwOyB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gdGhpcy5fdmFsdWVzW2luZGV4XSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuX2tleXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gaW5kZXggKyAxOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzW2kgLSAxXSA9IHRoaXMuX2tleXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbaSAtIDFdID0gdGhpcy5fdmFsdWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMubGVuZ3RoLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5sZW5ndGgtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5fY2FjaGVLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSAtMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0S2V5KTsgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0VmFsdWUpOyB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0RW50cnkpOyB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZVtcIkBAaXRlcmF0b3JcIl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmVudHJpZXMoKTsgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzKCk7IH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLl9maW5kID0gZnVuY3Rpb24gKGtleSwgaW5zZXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlS2V5ICE9PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IHRoaXMuX2tleXMuaW5kZXhPZih0aGlzLl9jYWNoZUtleSA9IGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWNoZUluZGV4IDwgMCAmJiBpbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IHRoaXMuX2tleXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hcDtcclxuICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0S2V5KGtleSwgXykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRWYWx1ZShfLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVudHJ5KGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbmFpdmUgU2V0IHNoaW1cclxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVTZXRQb2x5ZmlsbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBTZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IF9NYXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQucHJvdG90eXBlLCBcInNpemVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLnNpemU7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5oYXModmFsdWUpOyB9O1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5zZXQodmFsdWUsIHZhbHVlKSwgdGhpczsgfTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuZGVsZXRlKHZhbHVlKTsgfTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7IHRoaXMuX21hcC5jbGVhcigpOyB9O1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLmtleXMoKTsgfTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLnZhbHVlcygpOyB9O1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLmVudHJpZXMoKTsgfTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5rZXlzKCk7IH07XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMua2V5cygpOyB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNldDtcclxuICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbmFpdmUgV2Vha01hcCBzaGltXHJcbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlV2Vha01hcFBvbHlmaWxsKCkge1xyXG4gICAgICAgICAgICB2YXIgVVVJRF9TSVpFID0gMTY7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gSGFzaE1hcC5jcmVhdGUoKTtcclxuICAgICAgICAgICAgdmFyIHJvb3RLZXkgPSBDcmVhdGVVbmlxdWVLZXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBXZWFrTWFwKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBIYXNoTWFwLmhhcyh0YWJsZSwgdGhpcy5fa2V5KSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gSGFzaE1hcC5nZXQodGFibGUsIHRoaXMuX2tleSkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVbdGhpcy5fa2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gZGVsZXRlIHRhYmxlW3RoaXMuX2tleV0gOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBub3QgYSByZWFsIGNsZWFyLCBqdXN0IG1ha2VzIHRoZSBwcmV2aW91cyBkYXRhIHVucmVhY2hhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFdlYWtNYXA7XHJcbiAgICAgICAgICAgIH0oKSk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIENyZWF0ZVVuaXF1ZUtleSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXk7XHJcbiAgICAgICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IFwiQEBXZWFrTWFwQEBcIiArIENyZWF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChIYXNoTWFwLmhhcyhrZXlzLCBrZXkpKTtcclxuICAgICAgICAgICAgICAgIGtleXNba2V5XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgY3JlYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bi5jYWxsKHRhcmdldCwgcm9vdEtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCByb290S2V5LCB7IHZhbHVlOiBIYXNoTWFwLmNyZWF0ZSgpIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtyb290S2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBGaWxsUmFuZG9tQnl0ZXMoYnVmZmVyLCBzaXplKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXJbaV0gPSBNYXRoLnJhbmRvbSgpICogMHhmZiB8IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIEdlblJhbmRvbUJ5dGVzKHNpemUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVWludDhBcnJheSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1zQ3J5cHRvICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRmlsbFJhbmRvbUJ5dGVzKG5ldyBVaW50OEFycmF5KHNpemUpLCBzaXplKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBGaWxsUmFuZG9tQnl0ZXMobmV3IEFycmF5KHNpemUpLCBzaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBDcmVhdGVVVUlEKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBHZW5SYW5kb21CeXRlcyhVVUlEX1NJWkUpO1xyXG4gICAgICAgICAgICAgICAgLy8gbWFyayBhcyByYW5kb20gLSBSRkMgNDEyMiDCpyA0LjRcclxuICAgICAgICAgICAgICAgIGRhdGFbNl0gPSBkYXRhWzZdICYgMHg0ZiB8IDB4NDA7XHJcbiAgICAgICAgICAgICAgICBkYXRhWzhdID0gZGF0YVs4XSAmIDB4YmYgfCAweDgwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBVVUlEX1NJWkU7ICsrb2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ5dGUgPSBkYXRhW29mZnNldF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA9PT0gNCB8fCBvZmZzZXQgPT09IDYgfHwgb2Zmc2V0ID09PSA4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCItXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ5dGUgPCAxNilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBieXRlLnRvU3RyaW5nKDE2KS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB1c2VzIGEgaGV1cmlzdGljIHVzZWQgYnkgdjggYW5kIGNoYWtyYSB0byBmb3JjZSBhbiBvYmplY3QgaW50byBkaWN0aW9uYXJ5IG1vZGUuXHJcbiAgICAgICAgZnVuY3Rpb24gTWFrZURpY3Rpb25hcnkob2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5fXyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGVsZXRlIG9iai5fXztcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoUmVmbGVjdCB8fCAoUmVmbGVjdCA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlZmxlY3QuanMubWFwIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cblxuLyoqXG4gKiBAbm90ZSBUaGlzIGZpbGUgZXhpc3RzIG1lcmVseSBhcyBhbiBlYXN5IHJlZmVyZW5jZSBmb3IgZm9sa3MgYWRkaW5nIGl0IHRvIHRoZWlyIGNvbmZpZ3VyYXRpb24gZW50cmllc1xuICovXG5cbigoKSA9PiB7XG4gIGlmICh3aW5kb3cud2VicGFja1BsdWdpblNlcnZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZSA9IHRydWU7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGdsb2JhbC1yZXF1aXJlXG4gIHJlcXVpcmUoJy4vbGliL2NsaWVudCcpO1xufSkoKTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGVycm9yLCBpbmZvLCByZWZyZXNoLCB3YXJuIH0gPSByZXF1aXJlKCcuL2NsaWVudC1sb2cnKTtcblxuY29uc3QgeyBhcHBseSwgY2hlY2ssIHN0YXR1cyB9ID0gbW9kdWxlLmhvdDtcbmxldCBsYXRlc3QgPSB0cnVlO1xuXG5jb25zdCBobXIgPSB7XG4gIG9uVW5hY2NlcHRlZChkYXRhKSB7XG4gICAgd2FybignQ2hhbmdlIGluIHVuYWNjZXB0ZWQgbW9kdWxlKHMpOlxcbicsIGRhdGEpO1xuICAgIHdhcm4oZGF0YSk7XG4gIH0sXG4gIG9uRGVjbGluZWQoZGF0YSkge1xuICAgIHdhcm4oJ0NoYW5nZSBpbiBkZWNsaW5lZCBtb2R1bGUocyk6XFxuJywgZGF0YSk7XG4gIH0sXG4gIG9uRXJyb3JlZChkYXRhKSB7XG4gICAgZXJyb3IoJ0Vycm9yIGluIG1vZHVsZShzKTpcXG4nLCBkYXRhKTtcbiAgfVxufTtcblxuY29uc3QgcmVwbGFjZSA9IGFzeW5jIChoYXNoKSA9PiB7XG4gIGlmIChoYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgbGF0ZXN0ID0gaGFzaC5pbmNsdWRlcyhfX3dlYnBhY2tfaGFzaF9fKTtcbiAgfVxuXG4gIGlmICghbGF0ZXN0KSB7XG4gICAgY29uc3QgaG1yU3RhdHVzID0gc3RhdHVzKCk7XG5cbiAgICBpZiAoaG1yU3RhdHVzID09PSAnYWJvcnQnIHx8IGhtclN0YXR1cyA9PT0gJ2ZhaWwnKSB7XG4gICAgICB3YXJuKGBBbiBITVIgdXBkYXRlIHdhcyB0cmlnZ2VyZWQsIGJ1dCAke2htclN0YXR1c31lZC4gJHtyZWZyZXNofWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtb2R1bGVzID0gYXdhaXQgY2hlY2soZmFsc2UpO1xuXG4gICAgaWYgKCFtb2R1bGVzKSB7XG4gICAgICB3YXJuKGBObyBtb2R1bGVzIGZvdW5kIGZvciByZXBsYWNlbWVudC4gJHtyZWZyZXNofWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG1vZHVsZXMgPSBhd2FpdCBhcHBseShobXIpO1xuXG4gICAgaWYgKG1vZHVsZXMpIHtcbiAgICAgIGxhdGVzdCA9IHRydWU7XG4gICAgICBpbmZvKGBCdWlsZCAke2hhc2guc2xpY2UoMCwgNyl9IHJlcGxhY2VkOlxcbmAsIG1vZHVsZXMpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHJlcGxhY2UgfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGVycm9yLCBpbmZvLCB3YXJuIH0gPSBjb25zb2xlO1xuY29uc3QgbG9nID0ge1xuICBlcnJvcjogZXJyb3IuYmluZChjb25zb2xlLCAn4qyhIHdwczonKSxcbiAgaW5mbzogaW5mby5iaW5kKGNvbnNvbGUsICfirKEgd3BzOicpLFxuICByZWZyZXNoOiAnUGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2UnLFxuICB3YXJuOiB3YXJuLmJpbmQoY29uc29sZSwgJ+KsoSB3cHM6Jylcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nO1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgcmVwbGFjZSB9ID0gcmVxdWlyZSgnLi9jbGllbnQtaG1yJyk7XG5jb25zdCB7IGVycm9yLCBpbmZvLCByZWZyZXNoLCB3YXJuIH0gPSByZXF1aXJlKCcuL2NsaWVudC1sb2cnKTtcbmNvbnN0IHsgaW5pdDogaW5pdFByb2dyZXNzIH0gPSByZXF1aXJlKCcuL292ZXJsYXlzL3Byb2dyZXNzJyk7XG5jb25zdCB7IGluaXQ6IGluaXRNaW5pbWFsUHJvZ3Jlc3MgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbCcpO1xuY29uc3QgeyBpbml0OiBpbml0U3RhdHVzIH0gPSByZXF1aXJlKCcuL292ZXJsYXlzL3N0YXR1cycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWYsIG5vLXVudXNlZC12YXJzXG5jb25zdCBvcHRpb25zID0gyo7JkMm5yZRvc8edyozJucedcztcbmNvbnN0IHsgYWRkcmVzcywgY2xpZW50LCBwcm9ncmVzcywgc2VjdXJlLCBzdGF0dXMgfSA9IG9wdGlvbnM7XG5jb25zdCBwcm90b2NvbCA9IHNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbmNvbnN0IHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoYCR7cHJvdG9jb2x9Oi8vJHsoY2xpZW50IHx8IHt9KS5hZGRyZXNzIHx8IGFkZHJlc3N9L3dwc2ApO1xuXG4vLyBwcmV2ZW50cyBFQ09OTlJFU0VUIGVycm9ycyBvbiB0aGUgc2VydmVyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4gc29ja2V0LmNsb3NlKCkpO1xuXG5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG4gIGNvbnN0IHsgZXJyb3JzLCBoYXNoID0gJzw/PicsIHdhcm5pbmdzIH0gPSBkYXRhIHx8IHt9O1xuICBjb25zdCBzaG9ydEhhc2ggPSBoYXNoLnNsaWNlKDAsIDcpO1xuXG4gIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgY2FzZSAnY29ubmVjdGVkJzpcbiAgICAgIGluZm8oJ1dlYlNvY2tldCBjb25uZWN0ZWQnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Vycm9ycyc6XG4gICAgICBlcnJvcihgQnVpbGQgJHtzaG9ydEhhc2h9IHByb2R1Y2VkIGVycm9yczpcXG5gLCBlcnJvcnMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVsb2FkJzpcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgcmVwbGFjZShoYXNoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dhcm5pbmdzJzpcbiAgICAgIHdhcm4oYEJ1aWxkICR7c2hvcnRIYXNofSBwcm9kdWNlZCB3YXJuaW5nczpcXG5gLCB3YXJuaW5ncyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICB9XG59KTtcblxuc29ja2V0Lm9uY2xvc2UgPSAoKSA9PiB3YXJuKGBUaGUgY2xpZW50IFdlYlNvY2tldCB3YXMgY2xvc2VkLiAke3JlZnJlc2h9YCk7XG5cbmlmIChwcm9ncmVzcyA9PT0gJ21pbmltYWwnKSB7XG4gIGluaXRNaW5pbWFsUHJvZ3Jlc3Mob3B0aW9ucywgc29ja2V0KTtcbn0gZWxzZSBpZiAocHJvZ3Jlc3MpIHtcbiAgaW5pdFByb2dyZXNzKG9wdGlvbnMsIHNvY2tldCk7XG59XG5cbmlmIChzdGF0dXMpIHtcbiAgaW5pdFN0YXR1cyhvcHRpb25zLCBzb2NrZXQpO1xufVxuXG5pZiAobW9kdWxlLmhvdCkge1xuICBpbmZvKCdIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGFjdGl2ZScpO1xuXG4gIGlmIChvcHRpb25zLmxpdmVSZWxvYWQpIHtcbiAgICBpbmZvKCdMaXZlIFJlbG9hZCB0YWtpbmcgcHJlY2VkZW5jZSBvdmVyIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQnKTtcbiAgfVxufSBlbHNlIHtcbiAgd2FybignSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBpbmFjdGl2ZScpO1xufVxuXG5pZiAoIW1vZHVsZS5ob3QgJiYgb3B0aW9ucy5saXZlUmVsb2FkKSB7XG4gIGluZm8oJ0xpdmUgUmVsb2FkIGlzIGFjdGl2ZScpO1xufVxuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbCwgTWF0aGV1cyBHb27Dp2FsdmVzIGRhIFNpbHZhXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtcHJvZ3Jlc3MtbWluaW1hbCc7XG5jb25zdCBodG1sID0gYFxuPGRpdiBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1oaWRkZW5cIj5cbiAgPGRpdiBpZD1cIiR7bnN9LWJhclwiPjwvZGl2PlxuPC9kaXY+XG5gO1xuY29uc3QgY3NzID0gYFxuIyR7bnN9IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogNHB4O1xuICB3aWR0aDogMTAwdnc7XG59XG5cbiMke25zfS1iYXIge1xuICB3aWR0aDogMCU7XG4gIGhlaWdodDogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg2LCAyMjMsIDE3Mik7XG4gIHRyYW5zaXRpb246IHdpZHRoIDFzIGVhc2UtaW4tb3V0O1xufVxuXG4uJHtuc30taGlkZGVue1xuICBkaXNwbGF5OiBub25lO1xufVxuYDtcblxuY29uc3QgdXBkYXRlID0gKHBlcmNlbnQpID0+IHtcbiAgY29uc3QgYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWJhcmApO1xuICBiYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xufTtcblxuY29uc3QgcmVzZXQgPSAod3JhcHBlcikgPT4ge1xuICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWhpZGRlbmApO1xuICBzZXRUaW1lb3V0KCgpID0+IHVwZGF0ZSgwKSwgMWUzKTtcbn07XG5cbmNvbnN0IGluaXQgPSAob3B0aW9ucywgc29ja2V0KSA9PiB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgYWRkSHRtbChodG1sKTtcbiAgICBhZGRDc3MoY3NzKTtcbiAgfSk7XG5cbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG5cbiAgICBpZiAoYWN0aW9uICE9PSAncHJvZ3Jlc3MnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudCA9IE1hdGguZmxvb3IoZGF0YS5wZXJjZW50ICogMTAwKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG5cbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LWhpZGRlbmApO1xuXG4gICAgaWYgKGRhdGEucGVyY2VudCA9PT0gMSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNldCh3cmFwcGVyKSwgNWUzKTtcbiAgICB9XG5cbiAgICB1cGRhdGUocGVyY2VudCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXRcbn07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsLCBNYXRoZXVzIEdvbsOnYWx2ZXMgZGEgU2lsdmFcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGFkZENzcywgYWRkSHRtbCB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IG5zID0gJ3dwcy1wcm9ncmVzcyc7XG5jb25zdCBjc3MgPSBgXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuczo0MDAsNzAwJyk7XG5cbiMke25zfXtcbiAgd2lkdGg6IDIwMHB4O1xuICBoZWlnaHQ6IDIwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1JTtcbiAgdG9wOiA1JTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMjVzIGVhc2UtaW4tb3V0O1xuICB6LWluZGV4OiAxMDAwO1xufVxuXG4jJHtuc30tYmcge1xuICBmaWxsOiAjMjgyZDM1O1xufVxuXG4jJHtuc30tZmlsbCB7XG4gIGZpbGw6IHJnYmEoMCwgMCwgMCwgMCk7XG4gIHN0cm9rZTogcmdiKDE4NiwgMjIzLCAxNzIpO1xuICBzdHJva2UtZGFzaGFycmF5OiAyMTkuOTkwNzgzNjkxNDA2MjU7XG4gIHN0cm9rZS1kYXNob2Zmc2V0OiAtMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBzdHJva2Utd2lkdGg6IDEwO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyl0cmFuc2xhdGUoMHB4LCAtODBweCk7XG4gIHRyYW5zaXRpb246IHN0cm9rZS1kYXNob2Zmc2V0IDFzO1xufVxuXG4jJHtuc30tcGVyY2VudCB7XG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmaWxsOiAjZmZmZmZmO1xufVxuXG4jJHtuc30tcGVyY2VudC12YWx1ZSB7XG4gIGFsaWdubWVudC1iYXNlbGluZTogbWlkZGxlO1xuICB0ZXh0LWFuY2hvcjogbWlkZGxlO1xufVxuXG4jJHtuc30tcGVyY2VudC1zdXBlciB7XG4gIGZpbGw6ICNiZGMzYzc7XG4gIGZvbnQtc2l6ZTogLjQ1ZW07XG4gIGJhc2VsaW5lLXNoaWZ0OiAxMCU7XG59XG5cbi4ke25zfS1ub3NlbGVjdCB7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30taGlkZGVuLWRpc3BsYXkge1xuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDEpO1xuXHRcdC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcblx0fVxuXHQ5OSUge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdG9wYWNpdHk6IDA7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0XHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdH1cblx0MTAwJSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRvcGFjaXR5OiAwO1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdFx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xuXHR9XG59XG5cbi4ke25zfS1oaWRkZW57XG4gIGFuaW1hdGlvbjogJHtuc30taGlkZGVuLWRpc3BsYXkgLjNzO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOmZvcndhcmRzO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbn1cbmA7XG5cbmNvbnN0IGh0bWwgPSBgXG48c3ZnIGlkPVwiJHtuc31cIiBjbGFzcz1cIiR7bnN9LW5vc2VsZWN0ICR7bnN9LWhpZGRlblwiIHg9XCIwcHhcIiB5PVwiMHB4XCIgdmlld0JveD1cIjAgMCA4MCA4MFwiPlxuICA8Y2lyY2xlIGlkPVwiJHtuc30tYmdcIiBjeD1cIjUwJVwiIGN5PVwiNTAlXCIgcj1cIjM1XCI+PC9jaXJjbGU+XG4gIDxwYXRoIGlkPVwiJHtuc30tZmlsbFwiIGQ9XCJNNSw0MGEzNSwzNSAwIDEsMCA3MCwwYTM1LDM1IDAgMSwwIC03MCwwXCIgLz5cbiAgPHRleHQgaWQ9XCIke25zfS1wZXJjZW50XCIgeD1cIjUwJVwiIHk9XCI1MSVcIj48dHNwYW4gaWQ9XCIke25zfS1wZXJjZW50LXZhbHVlXCI+MDwvdHNwYW4+PHRzcGFuIGlkPVwiJHtuc30tcGVyY2VudC1zdXBlclwiPiU8L3RzcGFuPjwvdGV4dD5cbjwvc3ZnPlxuYDtcblxuY29uc3QgdXBkYXRlID0gKHBlcmNlbnQpID0+IHtcbiAgY29uc3QgbWF4ID0gLTIxOS45OTA3ODM2OTE0MDYyNTtcbiAgY29uc3QgdmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tcGVyY2VudC12YWx1ZWApO1xuICBjb25zdCB0cmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1maWxsYCk7XG4gIGNvbnN0IG9mZnNldCA9ICgoMTAwIC0gcGVyY2VudCkgLyAxMDApICogbWF4O1xuXG4gIHRyYWNrLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgc3Ryb2tlLWRhc2hvZmZzZXQ6ICR7b2Zmc2V0fWApO1xuICB2YWx1ZS5pbm5lckhUTUwgPSBwZXJjZW50LnRvU3RyaW5nKCk7XG59O1xuXG5jb25zdCByZXNldCA9IChzdmcpID0+IHtcbiAgc3ZnLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWhpZGRlbmApO1xuICBzZXRUaW1lb3V0KCgpID0+IHVwZGF0ZSgwKSwgMWUzKTtcbn07XG5cbmNvbnN0IGluaXQgPSAob3B0aW9ucywgc29ja2V0KSA9PiB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgYWRkQ3NzKGNzcyk7XG4gICAgYWRkSHRtbChodG1sKTtcbiAgfSk7XG5cbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG5cbiAgICBpZiAoYWN0aW9uICE9PSAncHJvZ3Jlc3MnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudCA9IE1hdGguZmxvb3IoZGF0YS5wZXJjZW50ICogMTAwKTtcbiAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc31gKTtcblxuICAgIGlmICghc3ZnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gd2UgY2FuIHNhZmVseSBjYWxsIHRoaXMgZXZlbiBpZiBpdCBkb2Vzbid0IGhhdmUgdGhlIGNsYXNzXG4gICAgc3ZnLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LWhpZGRlbmApO1xuXG4gICAgaWYgKGRhdGEucGVyY2VudCA9PT0gMSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNldChzdmcpLCA1ZTMpO1xuICAgIH1cblxuICAgIHVwZGF0ZShwZXJjZW50KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgYWRkQ3NzLCBhZGRIdG1sLCBzb2NrZXRNZXNzYWdlIH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgbnMgPSAnd3BzLXN0YXR1cyc7XG5jb25zdCBjc3MgPSBgXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuczo0MDAsNzAwJyk7XG5cbiMke25zfSB7XG4gIGJhY2tncm91bmQ6ICMyODJkMzU7XG4gIGJvcmRlci1yYWRpdXM6IDAuNmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRmb250LWZhbWlseTogJ09wZW4gU2FucycsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG5cdGZvbnQtc2l6ZTogMTBweDtcbiAgaGVpZ2h0OiA5MCU7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXgtaGVpZ2h0OiAyMGVtO1xuICBtaW4taGVpZ2h0OiAyMGVtO1xuICBvcGFjaXR5OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nLWJvdHRvbTogM2VtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjI1cyBlYXNlLWluLW91dDtcbiAgd2lkdGg6IDk1JTtcbn1cblxuQGtleWZyYW1lcyAke25zfS1oaWRkZW4tZGlzcGxheSB7XG5cdDAlIHtcblx0XHRvcGFjaXR5OiAxO1xuXHR9XG5cdDk5JSB7XG5cdFx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdFx0b3BhY2l0eTogMDtcblx0fVxuXHQxMDAlIHtcblx0XHRkaXNwbGF5OiBub25lO1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cbn1cblxuIyR7bnN9LiR7bnN9LWhpZGRlbiB7XG4gIGFuaW1hdGlvbjogJHtuc30taGlkZGVuLWRpc3BsYXkgLjNzO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOmZvcndhcmRzO1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30uJHtuc30tbWluIHtcbiAgYW5pbWF0aW9uOiBtaW5pbWl6ZSAxMHM7XG4gIGJvdHRvbTogMmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogNmVtO1xuICBtaW4taGVpZ2h0OiA2ZW07XG4gIHBhZGRpbmctYm90dG9tOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAyZW07XG4gIHdpZHRoOiA2ZW07XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LWJlYWNvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4jJHtuc30tdGl0bGUge1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxLjJlbTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwLjZlbSAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS10aXRsZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbiMke25zfS10aXRsZS1lcnJvcnMge1xuICBjb2xvcjogI2ZmNWY1ODtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBwYWRkaW5nLWxlZnQ6IDFlbTtcbn1cblxuIyR7bnN9LXRpdGxlLXdhcm5pbmdzIHtcbiAgY29sb3I6ICNmZmJkMmU7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgcGFkZGluZy1sZWZ0OiAxZW07XG59XG5cbiMke25zfS1wcm9ibGVtcyB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIHBhZGRpbmc6IDFlbSAyZW07XG59XG5cbiMke25zfS1wcm9ibGVtcyBwcmUge1xuICBjb2xvcjogI2RkZDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMS4zZW07XG5cdGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG4jJHtuc30tcHJvYmxlbXMgcHJlIGVtIHtcbiAgYmFja2dyb3VuZDogI2ZmNWY1ODtcbiAgYm9yZGVyLXJhZGl1czogMC4zZW07XG4gIGNvbG9yOiAjNjQxZTE2O1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGxpbmUtaGVpZ2h0OiAzZW07XG4gIG1hcmdpbi1yaWdodDogMC40ZW07XG4gIHBhZGRpbmc6IDAuMWVtIDAuNGVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG5wcmUjJHtuc30td2FybmluZ3MgZW0ge1xuICBiYWNrZ3JvdW5kOiAjZmZiZDJlO1xuICBjb2xvcjogIzNlMjcyMztcbn1cblxucHJlIyR7bnN9LXN1Y2Nlc3Mge1xuICBkaXNwbGF5OiBub25lO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbnByZSMke25zfS1zdWNjZXNzIGVtIHtcbiAgYmFja2dyb3VuZDogIzdmYjkwMDtcbiAgY29sb3I6ICMwMDRkNDA7XG59XG5cbiMke25zfS1wcm9ibGVtcy4ke25zfS1zdWNjZXNzICMke25zfS1zdWNjZXNzIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LXByb2JsZW1zIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LW5hdiB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgcGFkZGluZzogMS4yZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tbmF2IHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LW5hdjpob3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbiMke25zfS1uYXYgZGl2IHtcbiAgYmFja2dyb3VuZDogI2ZmNWY1ODtcbiAgYm9yZGVyLXJhZGl1czogMS4yZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBoZWlnaHQ6IDEuMmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxLjJlbTtcbn1cblxuZGl2IyR7bnN9LW1pbiB7XG4gIGJhY2tncm91bmQ6ICNmZmJkMmU7XG4gIG1hcmdpbi1sZWZ0OiAwLjhlbTtcbn1cblxuIyR7bnN9LWJlYWNvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDNlbTtcbiAgZGlzcGxheTogbm9uZTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBoZWlnaHQ6IDNlbTtcbiAgbWFyZ2luOiAxLjZlbSBhdXRvO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAzZW07XG59XG5cbiMke25zfS1iZWFjb246YmVmb3JlLCAjJHtuc30tYmVhY29uOmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEyNywxODUsMCwgMC4yKTtcbiAgYm9yZGVyLXJhZGl1czogM2VtO1xuICBvcGFjaXR5OiAwO1xufVxuXG4jJHtuc30tYmVhY29uOmJlZm9yZSB7XG4gIGFuaW1hdGlvbjogJHtuc30tcHVsc2UgM3MgaW5maW5pdGUgbGluZWFyO1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xufVxuXG4jJHtuc30tYmVhY29uOmFmdGVyIHtcbiAgYW5pbWF0aW9uOiAke25zfS1wdWxzZSAzcyAycyBpbmZpbml0ZSBsaW5lYXI7XG59XG5cblxuQGtleWZyYW1lcyAke25zfS1wdWxzZSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC42KTtcbiAgfVxuICAzMyUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgfVxufVxuXG4jJHtuc30tYmVhY29uIG1hcmsge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEyNywgMTg1LCAwLCAxKTtcbiAgYm9yZGVyLXJhZGl1czogMTAwJSAxMDAlO1xuICBoZWlnaHQ6IDFlbTtcbiAgbGVmdDogMWVtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMWVtO1xuICB3aWR0aDogMWVtO1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LWVycm9yIG1hcmsge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LWVycm9yOmJlZm9yZSwgIyR7bnN9LWJlYWNvbi5lcnJvcjphZnRlciB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCA5NSwgODgsIDAuMik7XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30td2FybmluZyBtYXJrIHtcbiAgYmFja2dyb3VuZDogI2ZmYmQyZTtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS13YXJuaW5nOmJlZm9yZSwgIyR7bnN9LWJlYWNvbi53YXJuaW5nOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDE4OSwgNDYsIDAuMik7XG59XG5gO1xuXG5jb25zdCBodG1sID0gYFxuPGFzaWRlIGlkPVwiJHtuc31cIiBjbGFzcz1cIiR7bnN9LWhpZGRlblwiIHRpdGxlPVwiYnVpbGQgc3RhdHVzXCI+XG4gIDxmaWd1cmUgaWQ9XCIke25zfS1iZWFjb25cIj5cbiAgICA8bWFyay8+XG4gIDwvZmlndXJlPlxuICA8bmF2IGlkPVwiJHtuc30tbmF2XCI+XG4gICAgPGRpdiBpZD1cIiR7bnN9LWNsb3NlXCIgdGl0bGU9XCJjbG9zZVwiPjwvZGl2PlxuICAgIDxkaXYgaWQ9XCIke25zfS1taW5cIiB0aXRsZT1cIm1pbm1pemVcIj48L2Rpdj5cbiAgPC9uYXY+XG4gIDxoMSBpZD1cIiR7bnN9LXRpdGxlXCI+XG4gICAgYnVpbGQgc3RhdHVzXG4gICAgPGVtIGlkPVwiJHtuc30tdGl0bGUtZXJyb3JzXCI+PC9lbT5cbiAgICA8ZW0gaWQ9XCIke25zfS10aXRsZS13YXJuaW5nc1wiPjwvZW0+XG4gIDwvaDE+XG4gIDxhcnRpY2xlIGlkPVwiJHtuc30tcHJvYmxlbXNcIj5cbiAgICA8cHJlIGlkPVwiJHtuc30tc3VjY2Vzc1wiPjxlbT5CdWlsZCBTdWNjZXNzZnVsPC9lbT48L3ByZT5cbiAgICA8cHJlIGlkPVwiJHtuc30tZXJyb3JzXCI+PC9wcmU+XG4gICAgPHByZSBpZD1cIiR7bnN9LXdhcm5pbmdzXCI+PC9wcmU+XG4gIDwvYXJ0aWNsZT5cbjwvYXNpZGU+XG5gO1xuXG5jb25zdCBpbml0ID0gKG9wdGlvbnMsIHNvY2tldCkgPT4ge1xuICBjb25zdCBoaWRkZW4gPSBgJHtuc30taGlkZGVuYDtcbiAgbGV0IGFzaWRlO1xuICBsZXQgYmVhY29uO1xuICBsZXQgcHJvYmxlbXM7XG4gIGxldCBwcmVFcnJvcnM7XG4gIGxldCBwcmVXYXJuaW5ncztcbiAgbGV0IHRpdGxlRXJyb3JzO1xuICBsZXQgdGl0bGVXYXJuaW5ncztcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBwcmVFcnJvcnMuaW5uZXJIVE1MID0gJyc7XG4gICAgcHJlV2FybmluZ3MuaW5uZXJIVE1MID0gJyc7XG4gICAgcHJvYmxlbXMuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tc3VjY2Vzc2ApO1xuICAgIGJlYWNvbi5jbGFzc05hbWUgPSAnJztcbiAgfTtcblxuICBjb25zdCBhZGRFcnJvcnMgPSAoZXJyb3JzKSA9PiB7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIGJlYWNvbi5jbGFzc0xpc3QuYWRkKGAke25zfS1lcnJvcmApO1xuXG4gICAgICBmb3IgKGNvbnN0IGVycm9yIG9mIGVycm9ycykge1xuICAgICAgICBjb25zdCBtYXJrdXAgPSBgPGVtPkVycm9yPC9lbT4gaW4gJHtlcnJvcn1gO1xuICAgICAgICBhZGRIdG1sKG1hcmt1cCwgcHJlRXJyb3JzKTtcbiAgICAgIH1cblxuICAgICAgdGl0bGVFcnJvcnMuaW5uZXJUZXh0ID0gYCR7ZXJyb3JzLmxlbmd0aH0gRXJyb3IocylgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZUVycm9ycy5pbm5lclRleHQgPSAnJztcbiAgICB9XG4gICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFdhcm5pbmdzID0gKHdhcm5pbmdzKSA9PiB7XG4gICAgaWYgKHdhcm5pbmdzLmxlbmd0aCkge1xuICAgICAgaWYgKCFiZWFjb24uY2xhc3NMaXN0LmNvbnRhaW5zKGAke25zfS1lcnJvcmApKSB7XG4gICAgICAgIGJlYWNvbi5jbGFzc0xpc3QuYWRkKGAke25zfS13YXJuaW5nYCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgd2FybmluZyBvZiB3YXJuaW5ncykge1xuICAgICAgICBjb25zdCBtYXJrdXAgPSBgPGVtPldhcm5pbmc8L2VtPiBpbiAke3dhcm5pbmd9YDtcbiAgICAgICAgYWRkSHRtbChtYXJrdXAsIHByZVdhcm5pbmdzKTtcbiAgICAgIH1cblxuICAgICAgdGl0bGVXYXJuaW5ncy5pbm5lclRleHQgPSBgJHt3YXJuaW5ncy5sZW5ndGh9IFdhcm5pbmcocylgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZVdhcm5pbmdzLmlubmVyVGV4dCA9ICcnO1xuICAgIH1cblxuICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcbiAgfTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGFkZENzcyhjc3MpO1xuICAgIFthc2lkZV0gPSBhZGRIdG1sKGh0bWwpO1xuICAgIGJlYWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1iZWFjb25gKTtcbiAgICBwcm9ibGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1wcm9ibGVtc2ApO1xuICAgIHByZUVycm9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1lcnJvcnNgKTtcbiAgICBwcmVXYXJuaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS13YXJuaW5nc2ApO1xuICAgIHRpdGxlRXJyb3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXRpdGxlLWVycm9yc2ApO1xuICAgIHRpdGxlV2FybmluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tdGl0bGUtd2FybmluZ3NgKTtcblxuICAgIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWNsb3NlYCk7XG4gICAgY29uc3QgbWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LW1pbmApO1xuXG4gICAgYXNpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1taW5gKTtcbiAgICB9KTtcblxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgYXNpZGUuY2xhc3NMaXN0LmFkZChgJHtuc30taGlkZGVuYCk7XG4gICAgfSk7XG5cbiAgICBtaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgYXNpZGUuY2xhc3NMaXN0LmFkZChgJHtuc30tbWluYCk7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9KTtcblxuICBzb2NrZXRNZXNzYWdlKHNvY2tldCwgKGFjdGlvbiwgZGF0YSkgPT4ge1xuICAgIGlmICghYXNpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSAncHJvYmxlbXMnOlxuICAgICAgICByZXNldCgpO1xuICAgICAgICBhZGRFcnJvcnMoZGF0YS5lcnJvcnMpO1xuICAgICAgICBhZGRXYXJuaW5ncyhkYXRhLndhcm5pbmdzKTtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICBpZiAoIXByZUVycm9ycy5jaGlsZHJlbi5sZW5ndGggJiYgIXByZVdhcm5pbmdzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHByb2JsZW1zLmNsYXNzTGlzdC5hZGQoYCR7bnN9LXN1Y2Nlc3NgKTtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXNpZGUuY2xhc3NMaXN0LmFkZChoaWRkZW4pLCAzZTMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgYWRkSHRtbCA9IChodG1sLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IG5vZGVzID0gW107XG5cbiAgZGl2LmlubmVySFRNTCA9IGh0bWwudHJpbSgpO1xuXG4gIHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuICAgIG5vZGVzLnB1c2goKHBhcmVudCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChkaXYuZmlyc3RDaGlsZCkpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGVzO1xufTtcblxuY29uc3QgYWRkQ3NzID0gKGNzcykgPT4ge1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKGNzcy5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG5cbiAgLy8gYXBwZW5kIHRoZSBzdHlsZXNoZWV0IGZvciB0aGUgc3ZnXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufTtcblxuY29uc3Qgc29ja2V0TWVzc2FnZSA9IChzb2NrZXQsIGhhbmRsZXIpID0+IHtcbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG4gICAgaGFuZGxlcihhY3Rpb24sIGRhdGEpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBhZGRDc3MsIGFkZEh0bWwsIHNvY2tldE1lc3NhZ2UgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfdGhpcyA9IHRoaXM7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29yZV8xID0gcmVxdWlyZShcIkBvbmUvY29yZVwiKTtcbnZhciBhcHBfcG9wdXBfbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9wb3B1cC9hcHAucG9wdXAubW9kdWxlXCIpO1xuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXBwO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGFwcCA9IG5ldyBjb3JlXzEuT25lRmFjdG9yeShhcHBfcG9wdXBfbW9kdWxlXzEuQXBwUG9wdXBNb2R1bGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGFwcC5zdGFydCgpXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQG9uZS9jb3JlXCIpO1xudmFyIEFwcFBvcHVwTW9kdWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcFBvcHVwTW9kdWxlKCkge1xuICAgIH1cbiAgICBBcHBQb3B1cE1vZHVsZSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBjb3JlXzEuTW9kdWxlKClcbiAgICBdLCBBcHBQb3B1cE1vZHVsZSk7XG4gICAgcmV0dXJuIEFwcFBvcHVwTW9kdWxlO1xufSgpKTtcbmV4cG9ydHMuQXBwUG9wdXBNb2R1bGUgPSBBcHBQb3B1cE1vZHVsZTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdHhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdllBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0R0E7QUFDQTs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzbUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBRUE7QUFDQTtBQUNBLGFBRUE7Ozs7Ozs7Ozs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeFhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==
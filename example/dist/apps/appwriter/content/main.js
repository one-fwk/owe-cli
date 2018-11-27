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
/******/ 			var chunkId = "content/main";
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
/******/ 	return hotCreateRequire(1)(__webpack_require__.s = 1);
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

/***/ "./content/app.content.module.ts":
/*!***************************************!*\
  !*** ./content/app.content.module.ts ***!
  \***************************************/
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
var AppContentModule = /** @class */ (function () {
    function AppContentModule() {
    }
    AppContentModule = __decorate([
        core_1.Module()
    ], AppContentModule);
    return AppContentModule;
}());
exports.AppContentModule = AppContentModule;


/***/ }),

/***/ "./main-7399fe1582d02aae4971cd4295d6a819.ts":
/*!**************************************************!*\
  !*** ./main-7399fe1582d02aae4971cd4295d6a819.ts ***!
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
var app_content_module_1 = __webpack_require__(/*! ./content/app.content.module */ "./content/app.content.module.ts");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new core_1.OneFactory(app_content_module_1.AppContentModule);
                return [4 /*yield*/, app.start()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });


/***/ }),

/***/ 1:
/*!************************************************************************************!*\
  !*** multi ./main-7399fe1582d02aae4971cd4295d6a819.ts webpack-plugin-serve/client ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/example/apps/appwriter/main-7399fe1582d02aae4971cd4295d6a819.ts */"./main-7399fe1582d02aae4971cd4295d6a819.ts");
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"../../../node_modules/webpack-plugin-serve/client.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvYm9vdHN0cmFwLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZGVjb3JhdG9ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvaW5qZWN0LmRlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvaW5qZWN0YWJsZS5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL2ludmVyc2lmeS5kZWNvcmF0b3JzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZGVjb3JhdG9ycy9tb2R1bGUvZ2xvYmFsLmRlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZGVjb3JhdG9ycy9tb2R1bGUvbW9kdWxlLmRlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbW9kdWxlL3JlcXVlc3Qtc2NvcGUuZGVjb3JhdG9yLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZGVjb3JhdG9ycy9tb2R1bGUvdHJhbnNpZW50LXNjb3BlLmRlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbXVsdGktaW5qZWN0LmRlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy16b25lLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMvY2lyY3VsYXItZGVwZW5kZW5jeS5leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL2ludmFsaWQtbW9kdWxlLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL2ludmFsaWQtcHJvdmlkZXIuZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMvbWlzc2luZy1pbmplY3Rpb24tdG9rZW4uZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMvbWlzc2luZy1yZXF1aXJlZC1kZXBlbmRlbmN5LmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL211bHRpLXByb3ZpZGVyLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL3J1bnRpbWUuZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMvdW5rbm93bi1leHBvcnQuZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMvdW5rbm93bi1tb2R1bGUuZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMvdW5rbm93bi1wcm92aWRlci5leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvbWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9mYWN0b3J5LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZm9yd2FyZC1yZWYuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL21ldGFkYXRhLXN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tb2R1bGUvY29tcGlsZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tb2R1bGUvY29udGFpbmVyLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvbW9kdWxlL2luamVjdGlvbi10b2tlbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL21vZHVsZS9tb2R1bGUtdG9rZW4tZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL21vZHVsZS9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tb2R1bGUvc2Nhbm5lci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL3JlZmxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL3JlZ2lzdHJ5LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvdG9rZW5zLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnktaW5qZWN0LWRlY29yYXRvcnMvbGliL2RlY29yYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5LWluamVjdC1kZWNvcmF0b3JzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vZGVjb3JhdG9yX3V0aWxzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9pbmplY3QuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL2luamVjdGFibGUuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL211bHRpX2luamVjdC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vbmFtZWQuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL29wdGlvbmFsLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9wb3N0X2NvbnN0cnVjdC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vdGFnZ2VkLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi90YXJnZXRfbmFtZS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vdW5tYW5hZ2VkLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYmluZGluZ3MvYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2JpbmRpbmdzL2JpbmRpbmdfY291bnQuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb25zdGFudHMvZXJyb3JfbXNncy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29uc3RhbnRzL21ldGFkYXRhX2tleXMuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb250YWluZXIvY29udGFpbmVyLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29udGFpbmVyL2NvbnRhaW5lcl9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb250YWluZXIvY29udGFpbmVyX3NuYXBzaG90LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29udGFpbmVyL2xvb2t1cC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2ludmVyc2lmeS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL2NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL21ldGFkYXRhX3JlYWRlci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3BsYW4uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9wbGFubmVyLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvcXVlcnlhYmxlX3N0cmluZy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3JlZmxlY3Rpb25fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvdGFyZ2V0LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcmVzb2x1dGlvbi9pbnN0YW50aWF0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcmVzb2x1dGlvbi9yZXNvbHZlci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX2luX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX2luX3doZW5fb25fc3ludGF4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvc3ludGF4L2JpbmRpbmdfb25fc3ludGF4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvc3ludGF4L2JpbmRpbmdfdG9fc3ludGF4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvc3ludGF4L2JpbmRpbmdfd2hlbl9vbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ193aGVuX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9jb25zdHJhaW50X2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi91dGlscy9iaW5kaW5nX3V0aWxzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvdXRpbHMvZXhjZXB0aW9ucy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3V0aWxzL2lkLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvdXRpbHMvc2VyaWFsaXphdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9vYmplY3QtaGFzaC9kaXN0L29iamVjdF9oYXNoLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9yZWZsZWN0LW1ldGFkYXRhL1JlZmxlY3QuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1wbHVnaW4tc2VydmUvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQtaG1yLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQtbG9nLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1wbHVnaW4tc2VydmUvbGliL292ZXJsYXlzL3Byb2dyZXNzLW1pbmltYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1wbHVnaW4tc2VydmUvbGliL292ZXJsYXlzL3Byb2dyZXNzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9vdmVybGF5cy9zdGF0dXMuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1wbHVnaW4tc2VydmUvbGliL292ZXJsYXlzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY29udGVudC9hcHAuY29udGVudC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi03Mzk5ZmUxNTgyZDAyYWFlNDk3MWNkNDI5NWQ2YTgxOS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIndwcy1obXIuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJ3cHMtaG1yLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImY4ZjFkNDYzYWU0YjJmMDcwN2Y2XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImNvbnRlbnQvbWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgxKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBmYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9mYWN0b3J5XCIpO1xuZnVuY3Rpb24gYm9vdHN0cmFwKG1vZHVsZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZhY3Rvcnk7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGZhY3RvcnkgPSBuZXcgZmFjdG9yeV8xLk9uZUZhY3RvcnkobW9kdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBmYWN0b3J5LnN0YXJ0KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuYm9vdHN0cmFwID0gYm9vdHN0cmFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9vdHN0cmFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TSEFSRURfTU9EVUxFX01FVEFEQVRBID0gU3ltYm9sLmZvcignTWV0YWRhdGE8U2hhcmVkTW9kdWxlPicpO1xuZXhwb3J0cy5TQ09QRV9NRVRBREFUQSA9IFN5bWJvbC5mb3IoJ01ldGFkYXRhPFNjb3BlPicpO1xuZXhwb3J0cy5QUk9WSURFUl9NRVRBREFUQSA9IFN5bWJvbC5mb3IoJ01ldGFkYXRhPFByb3ZpZGVyPicpO1xuZXhwb3J0cy5NRVRBREFUQSA9IHtcbiAgICBJTVBPUlRTOiAnaW1wb3J0cycsXG4gICAgRVhQT1JUUzogJ2V4cG9ydHMnLFxuICAgIFBST1ZJREVSUzogJ3Byb3ZpZGVycycsXG59O1xuZXhwb3J0cy5TQ09QRVMgPSB7XG4gICAgU0lOR0xFVE9OOiAnc2luZ2xldG9uLXNjb3BlJyxcbiAgICBUUkFOU0lFTlQ6ICd0cmFuc2llbnQtc2NvcGUnLFxuICAgIFJFUVVFU1Q6ICdyZXF1ZXN0LXNjb3BlJyxcbn07XG5leHBvcnRzLlBST1ZJREVSX1RZUEVTID0ge1xuICAgIEZBQ1RPUlk6ICd1c2UtZmFjdG9yeScsXG4gICAgQ0xBU1M6ICd1c2UtY2xhc3MnLFxuICAgIEVYSVNUSU5HOiAndXNlLWV4aXN0aW5nJyxcbiAgICBWQUxVRTogJ3VzZS12YWx1ZScsXG4gICAgREVGQVVMVDogJ3Byb3ZpZGVyJyxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vaW52ZXJzaWZ5LmRlY29yYXRvcnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vaW5qZWN0YWJsZS5kZWNvcmF0b3JcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vbXVsdGktaW5qZWN0LmRlY29yYXRvclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9pbmplY3QuZGVjb3JhdG9yXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21vZHVsZVwiKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG52YXIgcmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuLi9yZWdpc3RyeVwiKTtcbmZ1bmN0aW9uIGNyZWF0ZUxhenlJbmplY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobGF6eUluamVjdCwgcHJvdmlkZXIpIHtcbiAgICAgICAgcmVnaXN0cnlfMS5SZWdpc3RyeS5hc3NlcnRQcm92aWRlcihwcm92aWRlcik7XG4gICAgICAgIGxhenlJbmplY3QocHJvdmlkZXIpKHRhcmdldCwgcHJvcGVydHkpO1xuICAgIH07XG59XG5leHBvcnRzLmNyZWF0ZUxhenlJbmplY3Rpb24gPSBjcmVhdGVMYXp5SW5qZWN0aW9uO1xuZnVuY3Rpb24gSW5qZWN0KHByb3ZpZGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5KSB7XG4gICAgICAgIGlmICghcmVnaXN0cnlfMS5SZWdpc3RyeS5oYXNGb3J3YXJkUmVmKHByb3ZpZGVyKSkge1xuICAgICAgICAgICAgcmVnaXN0cnlfMS5SZWdpc3RyeS5hc3NlcnRQcm92aWRlcihwcm92aWRlciwgdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRJbmplY3Rpb25Ub2tlbihwcm92aWRlcik7XG4gICAgICAgICAgICByZXR1cm4gaW52ZXJzaWZ5XzEuaW5qZWN0KHRva2VuKSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgICByZWdpc3RyeV8xLlJlZ2lzdHJ5LmxhenlJbmplY3RzLmFkZCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldC5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIGZvcndhcmRSZWY6IHByb3ZpZGVyLFxuICAgICAgICAgICAgbGF6eUluamVjdDogY3JlYXRlTGF6eUluamVjdGlvbih0YXJnZXQsIHByb3BlcnR5KSxcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuSW5qZWN0ID0gSW5qZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5qZWN0LmRlY29yYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xuZnVuY3Rpb24gSW5qZWN0YWJsZSgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKGNvbnN0YW50c18xLlBST1ZJREVSX01FVEFEQVRBLCB0cnVlLCB0YXJnZXQpO1xuICAgICAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCkodGFyZ2V0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5JbmplY3RhYmxlID0gSW5qZWN0YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluamVjdGFibGUuZGVjb3JhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmV4cG9ydHMuT3B0aW9uYWwgPSBpbnZlcnNpZnlfMS5vcHRpb25hbDtcbmV4cG9ydHMuUG9zdENvbnN0cnVjdCA9IGludmVyc2lmeV8xLnBvc3RDb25zdHJ1Y3Q7XG5leHBvcnRzLlRhcmdldE5hbWUgPSBpbnZlcnNpZnlfMS50YXJnZXROYW1lO1xuZXhwb3J0cy5Vbm1hbmFnZWQgPSBpbnZlcnNpZnlfMS51bm1hbmFnZWQ7XG5leHBvcnRzLkRlY29yYXRlID0gaW52ZXJzaWZ5XzEuZGVjb3JhdGU7XG5leHBvcnRzLlRhZ2dlZCA9IGludmVyc2lmeV8xLnRhZ2dlZDtcbmV4cG9ydHMuTmFtZWQgPSBpbnZlcnNpZnlfMS5uYW1lZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludmVyc2lmeS5kZWNvcmF0b3JzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uLy4uL2NvbnN0YW50c1wiKTtcbmZ1bmN0aW9uIEdsb2JhbCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKGNvbnN0YW50c18xLlNIQVJFRF9NT0RVTEVfTUVUQURBVEEsIHRydWUsIHRhcmdldCk7XG4gICAgfTtcbn1cbmV4cG9ydHMuR2xvYmFsID0gR2xvYmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2xvYmFsLmRlY29yYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tb2R1bGUuZGVjb3JhdG9yXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2dsb2JhbC5kZWNvcmF0b3JcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vcmVxdWVzdC1zY29wZS5kZWNvcmF0b3JcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vdHJhbnNpZW50LXNjb3BlLmRlY29yYXRvclwiKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG52YXIgcmVmbGVjdG9yXzEgPSByZXF1aXJlKFwiLi4vLi4vcmVmbGVjdG9yXCIpO1xuZnVuY3Rpb24gTW9kdWxlKG1ldGFkYXRhKSB7XG4gICAgaWYgKG1ldGFkYXRhID09PSB2b2lkIDApIHsgbWV0YWRhdGEgPSB7fTsgfVxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJlZmxlY3Rvcl8xLlJlZmxlY3Rvci5kZWZpbmVCeUtleXMobWV0YWRhdGEsIHRhcmdldCk7XG4gICAgICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSh0YXJnZXQpO1xuICAgIH07XG59XG5leHBvcnRzLk1vZHVsZSA9IE1vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZHVsZS5kZWNvcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29uc3RhbnRzXCIpO1xuZnVuY3Rpb24gUmVxdWVzdFNjb3BlKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoY29uc3RhbnRzXzEuU0NPUEVfTUVUQURBVEEsIGNvbnN0YW50c18xLlNDT1BFUy5SRVFVRVNULCB0YXJnZXQpO1xuICAgIH07XG59XG5leHBvcnRzLlJlcXVlc3RTY29wZSA9IFJlcXVlc3RTY29wZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcXVlc3Qtc2NvcGUuZGVjb3JhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uLy4uL2NvbnN0YW50c1wiKTtcbmZ1bmN0aW9uIFRyYW5zaWVudFNjb3BlKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoY29uc3RhbnRzXzEuU0NPUEVfTUVUQURBVEEsIGNvbnN0YW50c18xLlNDT1BFUy5UUkFOU0lFTlQsIHRhcmdldCk7XG4gICAgfTtcbn1cbmV4cG9ydHMuVHJhbnNpZW50U2NvcGUgPSBUcmFuc2llbnRTY29wZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYW5zaWVudC1zY29wZS5kZWNvcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbnZhciByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uL3JlZ2lzdHJ5XCIpO1xuZnVuY3Rpb24gTXVsdGlJbmplY3QodG9rZW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXksIGluZGV4KSB7XG4gICAgICAgIGlmICghcmVnaXN0cnlfMS5SZWdpc3RyeS5pc0luamVjdGlvblRva2VuKHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLk1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbignQE11bHRpSW5qZWN0KCknKTtcbiAgICAgICAgfVxuICAgICAgICBpbnZlcnNpZnlfMS5tdWx0aUluamVjdCh0b2tlbi5uYW1lKSh0YXJnZXQsIHByb3BlcnR5S2V5LCBpbmRleCk7XG4gICAgfTtcbn1cbmV4cG9ydHMuTXVsdGlJbmplY3QgPSBNdWx0aUluamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW11bHRpLWluamVjdC5kZWNvcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRXhjZXB0aW9uc0hhbmRsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV4Y2VwdGlvbnNIYW5kbGVyKCkge1xuICAgIH1cbiAgICBFeGNlcHRpb25zSGFuZGxlci5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbi5zdGFjayk7XG4gICAgfTtcbiAgICByZXR1cm4gRXhjZXB0aW9uc0hhbmRsZXI7XG59KCkpO1xuZXhwb3J0cy5FeGNlcHRpb25zSGFuZGxlciA9IEV4Y2VwdGlvbnNIYW5kbGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhjZXB0aW9ucy1oYW5kbGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBleGNlcHRpb25zX2hhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL2V4Y2VwdGlvbnMtaGFuZGxlclwiKTtcbnZhciBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4vbWVzc2FnZXNcIik7XG52YXIgRXhjZXB0aW9uc1pvbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV4Y2VwdGlvbnNab25lKCkge1xuICAgIH1cbiAgICBFeGNlcHRpb25zWm9uZS5ydW4gPSBmdW5jdGlvbiAoem9uZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgem9uZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGNlcHRpb25IYW5kbGVyLmhhbmRsZShlXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbWVzc2FnZXNfMS5VTkhBTkRMRURfUlVOVElNRV9FWENFUFRJT047XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBFeGNlcHRpb25zWm9uZS5leGNlcHRpb25IYW5kbGVyID0gbmV3IGV4Y2VwdGlvbnNfaGFuZGxlcl8xLkV4Y2VwdGlvbnNIYW5kbGVyKCk7XG4gICAgcmV0dXJuIEV4Y2VwdGlvbnNab25lO1xufSgpKTtcbmV4cG9ydHMuRXhjZXB0aW9uc1pvbmUgPSBFeGNlcHRpb25zWm9uZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4Y2VwdGlvbnMtem9uZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi4vbWVzc2FnZXNcIik7XG52YXIgQ2lyY3VsYXJEZXBlbmRlbmN5RXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2lyY3VsYXJEZXBlbmRlbmN5RXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENpcmN1bGFyRGVwZW5kZW5jeUV4Y2VwdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlc18xLkNpcmN1bGFyRGVwZW5kZW5jeU1lc3NhZ2UoY29udGV4dCkpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBDaXJjdWxhckRlcGVuZGVuY3lFeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5DaXJjdWxhckRlcGVuZGVuY3lFeGNlcHRpb24gPSBDaXJjdWxhckRlcGVuZGVuY3lFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaXJjdWxhci1kZXBlbmRlbmN5LmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9jaXJjdWxhci1kZXBlbmRlbmN5LmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9taXNzaW5nLXJlcXVpcmVkLWRlcGVuZGVuY3kuZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2ludmFsaWQtbW9kdWxlLmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tdWx0aS1wcm92aWRlci5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vdW5rbm93bi1wcm92aWRlci5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vaW52YWxpZC1wcm92aWRlci5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vbWlzc2luZy1pbmplY3Rpb24tdG9rZW4uZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3Vua25vd24tZXhwb3J0LmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi91bmtub3duLW1vZHVsZS5leGNlcHRpb25cIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4uL21lc3NhZ2VzXCIpO1xudmFyIEludmFsaWRNb2R1bGVFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnZhbGlkTW9kdWxlRXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEludmFsaWRNb2R1bGVFeGNlcHRpb24odHJhY2UpIHtcbiAgICAgICAgaWYgKHRyYWNlID09PSB2b2lkIDApIHsgdHJhY2UgPSBbXTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc2NvcGUgPSB0cmFjZS5tYXAoZnVuY3Rpb24gKG1vZHVsZSkgeyByZXR1cm4gbW9kdWxlLm5hbWU7IH0pLmpvaW4oJyAtPiAnKTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlc18xLkludmFsaWRNb2R1bGVNZXNzYWdlKHNjb3BlKSkgfHwgdGhpcztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSW52YWxpZE1vZHVsZUV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLkludmFsaWRNb2R1bGVFeGNlcHRpb24gPSBJbnZhbGlkTW9kdWxlRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW52YWxpZC1tb2R1bGUuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgSW52YWxpZFByb3ZpZGVyRXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW52YWxpZFByb3ZpZGVyRXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEludmFsaWRQcm92aWRlckV4Y2VwdGlvbihwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgKHByb3ZpZGVyLm5hbWUgfHxcbiAgICAgICAgICAgIHByb3ZpZGVyLnRvU3RyaW5nKCkpICsgXCIgaXMgaW52YWxpZC4gTXVzdCBiZSBhbiBJbmplY3Rpb25Ub2tlbiBvciBJbmplY3RhYmxlXCIpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBJbnZhbGlkUHJvdmlkZXJFeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5JbnZhbGlkUHJvdmlkZXJFeGNlcHRpb24gPSBJbnZhbGlkUHJvdmlkZXJFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnZhbGlkLXByb3ZpZGVyLmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi4vbWVzc2FnZXNcIik7XG52YXIgTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlc18xLk1pc3NpbmdJbmplY3Rpb25Ub2tlbk1lc3NhZ2UoY29udGV4dCkpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBNaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5NaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb24gPSBNaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1taXNzaW5nLWluamVjdGlvbi10b2tlbi5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi4vbWVzc2FnZXNcIik7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIE1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5RXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lFeGNlcHRpb24obmFtZSwgcmVhc29uKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlc18xLk1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lNZXNzYWdlKG5hbWUsIHJlYXNvbikpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBNaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5RXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeUV4Y2VwdGlvbiA9IE1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1taXNzaW5nLXJlcXVpcmVkLWRlcGVuZGVuY3kuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuLi9tZXNzYWdlc1wiKTtcbnZhciBNdWx0aVByb3ZpZGVyRXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTXVsdGlQcm92aWRlckV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNdWx0aVByb3ZpZGVyRXhjZXB0aW9uKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2VzXzEuTXVsdGlQcm92aWRlck1lc3NhZ2UobmFtZSkpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBNdWx0aVByb3ZpZGVyRXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuTXVsdGlQcm92aWRlckV4Y2VwdGlvbiA9IE11bHRpUHJvdmlkZXJFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aS1wcm92aWRlci5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJ1bnRpbWVFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSdW50aW1lRXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJ1bnRpbWVFeGNlcHRpb24obXNnKSB7XG4gICAgICAgIGlmIChtc2cgPT09IHZvaWQgMCkgeyBtc2cgPSAnJzsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBtc2cpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm1zZyA9IG1zZztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSdW50aW1lRXhjZXB0aW9uLnByb3RvdHlwZS53aGF0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tc2c7XG4gICAgfTtcbiAgICByZXR1cm4gUnVudGltZUV4Y2VwdGlvbjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuUnVudGltZUV4Y2VwdGlvbiA9IFJ1bnRpbWVFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ydW50aW1lLmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi4vbWVzc2FnZXNcIik7XG52YXIgVW5rbm93bkV4cG9ydEV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVua25vd25FeHBvcnRFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVW5rbm93bkV4cG9ydEV4Y2VwdGlvbihuYW1lLCBleHBvcnRlZCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZXNfMS5Vbmtub3duRXhwb3J0TWVzc2FnZShuYW1lLCBleHBvcnRlZCkpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBVbmtub3duRXhwb3J0RXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuVW5rbm93bkV4cG9ydEV4Y2VwdGlvbiA9IFVua25vd25FeHBvcnRFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmtub3duLWV4cG9ydC5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciBVbmtub3duTW9kdWxlRXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVW5rbm93bk1vZHVsZUV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVbmtub3duTW9kdWxlRXhjZXB0aW9uKHRyYWNlKSB7XG4gICAgICAgIGlmICh0cmFjZSA9PT0gdm9pZCAwKSB7IHRyYWNlID0gW107IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNjb3BlID0gdHJhY2UubWFwKGZ1bmN0aW9uIChtb2R1bGUpIHsgcmV0dXJuIG1vZHVsZS5uYW1lOyB9KS5qb2luKCcgLT4gJyk7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJOZXN0IGNhbm5vdCBzZWxlY3QgZ2l2ZW4gbW9kdWxlIChpdCBkb2VzIG5vdCBleGlzdCBpbiBjdXJyZW50IGNvbnRleHQpLiBTY29wZSBbXCIgKyBzY29wZSArIFwiXVwiKSB8fCB0aGlzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBVbmtub3duTW9kdWxlRXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuVW5rbm93bk1vZHVsZUV4Y2VwdGlvbiA9IFVua25vd25Nb2R1bGVFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmtub3duLW1vZHVsZS5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uLy4uL3JlZ2lzdHJ5XCIpO1xudmFyIFVua25vd25Qcm92aWRlckV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVua25vd25Qcm92aWRlckV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVbmtub3duUHJvdmlkZXJFeGNlcHRpb24ocHJvdmlkZXIsIG1vZHVsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbmFtZSA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJOYW1lKHByb3ZpZGVyKTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBuYW1lICsgXCIgY291bGQgbm90IGJlIGZvdW5kIGluIFwiICsgbW9kdWxlLm5hbWUpIHx8IHRoaXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFVua25vd25Qcm92aWRlckV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLlVua25vd25Qcm92aWRlckV4Y2VwdGlvbiA9IFVua25vd25Qcm92aWRlckV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVua25vd24tcHJvdmlkZXIuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2V4Y2VwdGlvbnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vbWVzc2FnZXNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vZXhjZXB0aW9ucy16b25lXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2V4Y2VwdGlvbnMtaGFuZGxlclwiKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW52YWxpZE1vZHVsZU1lc3NhZ2UgPSBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICByZXR1cm4gXCJOZXN0IGNhbm5vdCBjcmVhdGUgdGhlIG1vZHVsZSBpbnN0YW5jZS4gT2Z0ZW4sIHRoaXMgaXMgYmVjYXVzZSBvZiBhIGNpcmN1bGFyIGRlcGVuZGVuY3kgYmV0d2VlbiBtb2R1bGVzLiBVc2UgZm9yd2FyZFJlZigpIHRvIGF2b2lkIGl0LiAoUmVhZCBtb3JlIGh0dHBzOi8vZG9jcy5uZXN0anMuY29tL2FkdmFuY2VkL2NpcmN1bGFyLWRlcGVuZGVuY3kpLiBTY29wZSBbXCIgKyBzY29wZSArIFwiXVwiO1xufTtcbmV4cG9ydHMuVW5rbm93bkV4cG9ydE1lc3NhZ2UgPSBmdW5jdGlvbiAobW9kdWxlLCBleHBvcnRlZCkge1xuICAgIHJldHVybiBcIk5lc3QgY2Fubm90IGV4cG9ydCBhIGNvbXBvbmVudC9tb2R1bGUgKFwiICsgZXhwb3J0ZWQgKyBcIikgdGhhdCBpcyBub3QgYSBwYXJ0IG9mIHRoZSBjdXJyZW50bHkgcHJvY2Vzc2VkIG1vZHVsZSAoXCIgKyBtb2R1bGUgKyBcIikuIFBsZWFzZSB2ZXJpZnkgd2hldGhlciBlYWNoIGV4cG9ydGVkIHVuaXQgaXMgYXZhaWxhYmxlIGluIHRoaXMgcGFydGljdWxhciBjb250ZXh0LlwiO1xufTtcbmV4cG9ydHMuTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeU1lc3NhZ2UgPSBmdW5jdGlvbiAobmFtZSwgcmVhc29uKSB7XG4gICAgcmV0dXJuIFwiVGhlIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIgcGFja2FnZSBpcyBtaXNzaW5nLiBQbGVhc2UsIG1ha2Ugc3VyZSB0byBpbnN0YWxsIHRoaXMgbGlicmFyeSAoJCB5YXJuIGFkZCBcIiArIG5hbWUgKyBcIikgdG8gdGFrZSBhZHZhbnRhZ2Ugb2YgXCIgKyByZWFzb24gKyBcIi5cIjtcbn07XG5leHBvcnRzLkNpcmN1bGFyRGVwZW5kZW5jeU1lc3NhZ2UgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHJldHVybiBcIkEgY2lyY3VsYXIgZGVwZW5kZW5jeSBoYXMgYmVlbiBkZXRlY3RlZCBpbnNpZGUgXCIgKyBjb250ZXh0ICsgXCIuIFBsZWFzZSwgbWFrZSBzdXJlIHRoYXQgZWFjaCBzaWRlIG9mIGEgYmlkaXJlY3Rpb25hbCByZWxhdGlvbnNoaXBzIGFyZSBkZWNvcmF0ZWQgd2l0aCBcXFwiZm9yd2FyZFJlZigpXFxcIi5cIjtcbn07XG5leHBvcnRzLk11bHRpUHJvdmlkZXJNZXNzYWdlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gXCJQcm92aWRlciBcIiArIG5hbWUgKyBcIiBpcyBhbHJlYWR5IGJvdW5kLiBTZXQgdGhlIG11bHRpIHByb3BlcnR5IHRvIHRydWUsIHRvIGFsbG93IG11bHRpcGxlIHByb3ZpZGVycyBiZWluZyBib3VuZCB0byB0aGlzIHRva2VuXCI7XG59O1xuZXhwb3J0cy5NaXNzaW5nSW5qZWN0aW9uVG9rZW5NZXNzYWdlID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICByZXR1cm4gXCJZb3UgY2FuIG9ubHkgdXNlIGFuIEluamVjdGlvblRva2VuIGluIFwiICsgY29udGV4dDtcbn07XG5leHBvcnRzLlVOSEFORExFRF9SVU5USU1FX0VYQ0VQVElPTiA9ICdVbmhhbmRsZWQgUnVudGltZSBFeGNlcHRpb24uJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lc3NhZ2VzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtb2R1bGVfMSA9IHJlcXVpcmUoXCIuL21vZHVsZVwiKTtcbnZhciB0b2tlbnNfMSA9IHJlcXVpcmUoXCIuL3Rva2Vuc1wiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbnZhciByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4vcmVnaXN0cnlcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBPbmVGYWN0b3J5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPbmVGYWN0b3J5KG1vZHVsZSkge1xuICAgICAgICB0aGlzLm1vZHVsZSA9IG1vZHVsZTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBuZXcgbW9kdWxlXzEuT25lQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuc2Nhbm5lciA9IG5ldyBtb2R1bGVfMS5TY2FubmVyKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gICAgT25lRmFjdG9yeS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgZXJyb3JzXzEuRXhjZXB0aW9uc1pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB0aGlzLnNjYW5uZXIuc2Nhbih0aGlzLm1vZHVsZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuaW5pdCgpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVGYWN0b3J5LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIGVycm9yc18xLkV4Y2VwdGlvbnNab25lLnJ1bihmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdXRpbF8xLlV0aWxzLnNlcmllcyh0aGlzLmNvbnRhaW5lci5nZXRBbGxQcm92aWRlcnModG9rZW5zXzEuQVBQX0RFU1RST1kpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lRmFjdG9yeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHV0aWxfMS5VdGlscy5zZXJpZXModGhpcy5jb250YWluZXIuZ2V0QWxsUHJvdmlkZXJzKHRva2Vuc18xLkFQUF9JTklUKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUZhY3RvcnkucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvbnRhaW5lci5nZXRQcm92aWRlcihwcm92aWRlciwgbW9kdWxlLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBbGw6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgIGlmICghcmVnaXN0cnlfMS5SZWdpc3RyeS5pc0luamVjdGlvblRva2VuKHRva2VuKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uKCdPbmVGYWN0b3J5LnNlbGVjdCgpLmdldEFsbCgpJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jb250YWluZXIuZ2V0QWxsUHJvdmlkZXJzKHRva2VuLCBtb2R1bGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhczogZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvbnRhaW5lci5pc1Byb3ZpZGVyQm91bmQocHJvdmlkZXIsIG1vZHVsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH07XG4gICAgT25lRmFjdG9yeS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5pc1Byb3ZpZGVyQm91bmQocHJvdmlkZXIpO1xuICAgIH07XG4gICAgT25lRmFjdG9yeS5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgIGlmICghcmVnaXN0cnlfMS5SZWdpc3RyeS5pc0luamVjdGlvblRva2VuKHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLk1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbignT25lRmFjdG9yeS5nZXRBbGwoKScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXRBbGxQcm92aWRlcnModG9rZW4pO1xuICAgIH07XG4gICAgT25lRmFjdG9yeS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXRQcm92aWRlcihwcm92aWRlcik7XG4gICAgfTtcbiAgICByZXR1cm4gT25lRmFjdG9yeTtcbn0oKSk7XG5leHBvcnRzLk9uZUZhY3RvcnkgPSBPbmVGYWN0b3J5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmFjdG9yeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZm9yd2FyZFJlZiA9IGZ1bmN0aW9uIChmb3J3YXJkUmVmKSB7IHJldHVybiAoe1xuICAgIGZvcndhcmRSZWY6IGZvcndhcmRSZWYsXG59KTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZvcndhcmQtcmVmLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21vZHVsZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9jb25zdGFudHNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vZGVjb3JhdG9yc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9ib290c3RyYXBcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vZmFjdG9yeVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9mb3J3YXJkLXJlZlwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9yZWZsZWN0b3JcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vZXJyb3JzXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21ldGFkYXRhLXN0b3JhZ2VcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vcmVnaXN0cnlcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vdG9rZW5zXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3V0aWxcIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgQmFzZU1ldGFkYXRhU3RvcmFnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFzZU1ldGFkYXRhU3RvcmFnZSgpIHtcbiAgICB9XG4gICAgQmFzZU1ldGFkYXRhU3RvcmFnZS5maW5kQnlUYXJnZXQgPSBmdW5jdGlvbiAobWV0YWRhdGEsIHRhcmdldCkge1xuICAgICAgICByZXR1cm4gX19zcHJlYWQobWV0YWRhdGEudmFsdWVzKCkpLmZpbmQoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB2YWx1ZS50YXJnZXQgPT09IHRhcmdldDsgfSk7XG4gICAgfTtcbiAgICBCYXNlTWV0YWRhdGFTdG9yYWdlLmZpbmRCeVRhcmdldFByb3BlcnR5ID0gZnVuY3Rpb24gKG1ldGFkYXRhLCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgIHZhciBmaW5kQnlQcm9wZXJ0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX3NwcmVhZChtZXRhZGF0YS52YWx1ZXMoKSkuZmluZChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHZhbHVlLnRhcmdldCA9PT0gdGFyZ2V0ICYmIHZhbHVlLnByb3BlcnR5S2V5ID09PSBwcm9wZXJ0eUtleTsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB1dGlsXzEuVXRpbHMuaXNOaWwocHJvcGVydHlLZXkpXG4gICAgICAgICAgICA/IHRoaXMuZmluZEJ5VGFyZ2V0KG1ldGFkYXRhLCB0YXJnZXQpXG4gICAgICAgICAgICA6IGZpbmRCeVByb3BlcnR5KCk7XG4gICAgfTtcbiAgICBCYXNlTWV0YWRhdGFTdG9yYWdlLmZpbHRlckJ5VGFyZ2V0UHJvcGVydHkgPSBmdW5jdGlvbiAobWV0YWRhdGEsIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgdmFyIGZpbHRlckJ5UHJvcGVydHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19zcHJlYWQobWV0YWRhdGEudmFsdWVzKCkpLmZpbHRlcihmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHZhbHVlLnRhcmdldCA9PT0gdGFyZ2V0ICYmIHZhbHVlLnByb3BlcnR5S2V5ID09PSBwcm9wZXJ0eUtleTsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB1dGlsXzEuVXRpbHMuaXNOaWwocHJvcGVydHlLZXkpXG4gICAgICAgICAgICA/IHRoaXMuZmlsdGVyQnlUYXJnZXQobWV0YWRhdGEsIHRhcmdldClcbiAgICAgICAgICAgIDogZmlsdGVyQnlQcm9wZXJ0eSgpO1xuICAgIH07XG4gICAgQmFzZU1ldGFkYXRhU3RvcmFnZS5maWx0ZXJCeVRhcmdldCA9IGZ1bmN0aW9uIChtZXRhZGF0YSwgdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZChtZXRhZGF0YS52YWx1ZXMoKSkuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdmFsdWUudGFyZ2V0ID09PSB0YXJnZXQ7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEJhc2VNZXRhZGF0YVN0b3JhZ2U7XG59KCkpO1xuZXhwb3J0cy5CYXNlTWV0YWRhdGFTdG9yYWdlID0gQmFzZU1ldGFkYXRhU3RvcmFnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1ldGFkYXRhLXN0b3JhZ2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICByZXR1cm4gdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbW9kdWxlX3Rva2VuX2ZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL21vZHVsZS10b2tlbi1mYWN0b3J5XCIpO1xudmFyIHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi4vcmVnaXN0cnlcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgTW9kdWxlQ29tcGlsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZHVsZUNvbXBpbGVyKCkge1xuICAgICAgICB0aGlzLm1vZHVsZVRva2VuRmFjdG9yeSA9IG5ldyBtb2R1bGVfdG9rZW5fZmFjdG9yeV8xLk1vZHVsZVRva2VuRmFjdG9yeSgpO1xuICAgIH1cbiAgICBNb2R1bGVDb21waWxlci5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChtb2R1bGUsIHNjb3BlKSB7XG4gICAgICAgIGlmIChzY29wZSA9PT0gdm9pZCAwKSB7IHNjb3BlID0gW107IH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCB0YXJnZXQsIGR5bmFtaWNNZXRhZGF0YSwgdG9rZW47XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdGhpcy5leHRyYWN0TWV0YWRhdGEobW9kdWxlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCB0YXJnZXQgPSBfYS50YXJnZXQsIGR5bmFtaWNNZXRhZGF0YSA9IF9hLmR5bmFtaWNNZXRhZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5tb2R1bGVUb2tlbkZhY3RvcnkuY3JlYXRlKHRhcmdldCwgc2NvcGUsIGR5bmFtaWNNZXRhZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHsgdGFyZ2V0OiB0YXJnZXQsIGR5bmFtaWNNZXRhZGF0YTogZHluYW1pY01ldGFkYXRhLCB0b2tlbjogdG9rZW4gfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTW9kdWxlQ29tcGlsZXIucHJvdG90eXBlLmV4dHJhY3RNZXRhZGF0YSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZVJlZiwgX2EsIHRhcmdldCwgZHluYW1pY01ldGFkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHV0aWxfMS5VdGlscy5nZXREZWZlcnJlZChtb2R1bGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUmVmID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzRHluYW1pY01vZHVsZShtb2R1bGVSZWYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB7IHRhcmdldDogbW9kdWxlIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBtb2R1bGVSZWYsIHRhcmdldCA9IF9hLm1vZHVsZSwgZHluYW1pY01ldGFkYXRhID0gX19yZXN0KF9hLCBbXCJtb2R1bGVcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB7IHRhcmdldDogdGFyZ2V0LCBkeW5hbWljTWV0YWRhdGE6IGR5bmFtaWNNZXRhZGF0YSB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTW9kdWxlQ29tcGlsZXI7XG59KCkpO1xuZXhwb3J0cy5Nb2R1bGVDb21waWxlciA9IE1vZHVsZUNvbXBpbGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcGlsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZCkgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29tcGlsZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGVyXCIpO1xudmFyIHJlZmxlY3Rvcl8xID0gcmVxdWlyZShcIi4uL3JlZmxlY3RvclwiKTtcbnZhciByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uL3JlZ2lzdHJ5XCIpO1xudmFyIG1vZHVsZV8xID0gcmVxdWlyZShcIi4vbW9kdWxlXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbnZhciBPbmVDb250YWluZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9uZUNvbnRhaW5lcigpIHtcbiAgICAgICAgdGhpcy5tb2R1bGVDb21waWxlciA9IG5ldyBjb21waWxlcl8xLk1vZHVsZUNvbXBpbGVyKCk7XG4gICAgICAgIHRoaXMuZ2xvYmFsTW9kdWxlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1vZHVsZU9yZGVyID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLnByb3ZpZGVyVG9rZW5zID0gW107XG4gICAgICAgIHRoaXMuZHluYW1pY01vZHVsZXNNZXRhZGF0YSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXRNb2R1bGVzRnJvbSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuICF1dGlsXzEuVXRpbHMuaXNOaWwobW9kdWxlKVxuICAgICAgICAgICAgPyBbdGhpcy5nZXRNb2R1bGUobW9kdWxlKV1cbiAgICAgICAgICAgIDogdGhpcy5nZXRNb2R1bGVWYWx1ZXMoKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuaXNQcm92aWRlckJvdW5kID0gZnVuY3Rpb24gKHByb3ZpZGVyLCBtb2R1bGUpIHtcbiAgICAgICAgdmFyIHRva2VuID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlclRva2VuKHByb3ZpZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TW9kdWxlc0Zyb20obW9kdWxlKS5zb21lKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHByb3ZpZGVycyA9IF9hLnByb3ZpZGVycztcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlcnMuaXNCb3VuZCh0b2tlbik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKHRvUmVwbGFjZSwgb3B0aW9ucykge1xuICAgICAgICBfX3NwcmVhZCh0aGlzLm1vZHVsZXMudmFsdWVzKCkpLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICAgICAgbW9kdWxlLnJlcGxhY2UodG9SZXBsYWNlLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldFByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyLCBzY29wZSwgX2EpIHtcbiAgICAgICAgdmFyIHN0cmljdCA9IChfYSA9PT0gdm9pZCAwID8ge30gOiBfYSkuc3RyaWN0O1xuICAgICAgICB2YXIgZV8xLCBfYjtcbiAgICAgICAgdmFyIHRva2VuID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlclRva2VuKHByb3ZpZGVyKTtcbiAgICAgICAgaWYgKHN0cmljdCkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZV8yID0gdGhpcy5nZXRNb2R1bGUoc2NvcGUpO1xuICAgICAgICAgICAgaWYgKG1vZHVsZV8yLnByb3ZpZGVycy5pc0JvdW5kKHRva2VuKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2R1bGVfMi5wcm92aWRlcnMuZ2V0KHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2MgPSBfX3ZhbHVlcyh0aGlzLm1vZHVsZXMudmFsdWVzKCkpLCBfZCA9IF9jLm5leHQoKTsgIV9kLmRvbmU7IF9kID0gX2MubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm92aWRlcnMgPSBfZC52YWx1ZS5wcm92aWRlcnM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm92aWRlcnMuaXNCb3VuZCh0b2tlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcnMuZ2V0KHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2QgJiYgIV9kLmRvbmUgJiYgKF9iID0gX2MucmV0dXJuKSkgX2IuY2FsbChfYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVW5rbm93blByb3ZpZGVyRXhjZXB0aW9uKHByb3ZpZGVyLCBzY29wZSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldEFsbFByb3ZpZGVycyA9IGZ1bmN0aW9uIChwcm92aWRlciwgdGFyZ2V0KSB7XG4gICAgICAgIGlmICghcmVnaXN0cnlfMS5SZWdpc3RyeS5pc0luamVjdGlvblRva2VuKHByb3ZpZGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLk1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbignQ29udGFpbmVyLmdldEFsbFByb3ZpZGVycygpJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRva2VuID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlclRva2VuKHByb3ZpZGVyKTtcbiAgICAgICAgcmV0dXJuIHV0aWxfMS5VdGlscy5mbGF0dGVuKHRoaXMuZ2V0TW9kdWxlc0Zyb20odGFyZ2V0KS5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgcHJvdmlkZXJzID0gX2EucHJvdmlkZXJzO1xuICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVycy5pc0JvdW5kKHRva2VuKSA/IHByb3ZpZGVycy5nZXRBbGwodG9rZW4pIDogW107XG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0TW9kdWxlVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdXRpbF8xLlV0aWxzLmdldFZhbHVlcyh0aGlzLm1vZHVsZXMuZW50cmllcygpKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuaGFzTW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNb2R1bGVWYWx1ZXMoKS5zb21lKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IF9hLnRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQgPT09IG1vZHVsZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldE1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TW9kdWxlVmFsdWVzKCkuZmluZChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBfYS50YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0ID09PSBtb2R1bGU7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXRNb2R1bGVCeVRva2VuID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2R1bGVzLmhhcyh0b2tlbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5Vbmtub3duTW9kdWxlRXhjZXB0aW9uKFtdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVzLmdldCh0b2tlbik7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldFJldmVyc2VkTW9kdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkKHRoaXMubW9kdWxlcy5lbnRyaWVzKCkpLnJldmVyc2UoKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0TW9kdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlcztcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYWRkUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHRva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGU7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUgPSB0aGlzLmdldE1vZHVsZUJ5VG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBtb2R1bGUuYWRkUHJvdmlkZXIocHJvdmlkZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmFkZEV4cG9ydGVkID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgdG9rZW4pIHtcbiAgICAgICAgdmFyIG1vZHVsZSA9IHRoaXMuZ2V0TW9kdWxlQnlUb2tlbih0b2tlbik7XG4gICAgICAgIG1vZHVsZS5hZGRFeHBvcnRlZChjb21wb25lbnQpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5hZGRHbG9iYWxNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTW9kdWxlcy5hZGQobW9kdWxlKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYWRkTW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSwgc2NvcGUpIHtcbiAgICAgICAgaWYgKHNjb3BlID09PSB2b2lkIDApIHsgc2NvcGUgPSBbXTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIHRhcmdldCwgZHluYW1pY01ldGFkYXRhLCB0b2tlbiwgb25lTW9kdWxlLCBtb2R1bGVzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb2R1bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRNb2R1bGVFeGNlcHRpb24oc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLm1vZHVsZUNvbXBpbGVyLmNvbXBpbGUobW9kdWxlLCBzY29wZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdGFyZ2V0ID0gX2EudGFyZ2V0LCBkeW5hbWljTWV0YWRhdGEgPSBfYS5keW5hbWljTWV0YWRhdGEsIHRva2VuID0gX2EudG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmhhcyh0b2tlbikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZU1vZHVsZSA9IG5ldyBtb2R1bGVfMS5PbmVNb2R1bGUodGFyZ2V0LCBzY29wZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmVNb2R1bGUuYWRkR2xvYmFsUHJvdmlkZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXMuc2V0KHRva2VuLCBvbmVNb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlcyA9IHV0aWxfMS5VdGlscy5jb25jYXQoc2NvcGUsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZER5bmFtaWNNZXRhZGF0YSh0b2tlbiwgZHluYW1pY01ldGFkYXRhLCBtb2R1bGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmxlY3Rvcl8xLlJlZmxlY3Rvci5pc0dsb2JhbE1vZHVsZSh0YXJnZXQpICYmIHRoaXMuYWRkR2xvYmFsTW9kdWxlKG9uZU1vZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYWRkRHluYW1pY01ldGFkYXRhID0gZnVuY3Rpb24gKHRva2VuLCBkeW5hbWljTW9kdWxlTWV0YWRhdGEsIHNjb3BlKSB7XG4gICAgICAgIGlmICghZHluYW1pY01vZHVsZU1ldGFkYXRhKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmR5bmFtaWNNb2R1bGVzTWV0YWRhdGEuc2V0KHRva2VuLCBkeW5hbWljTW9kdWxlTWV0YWRhdGEpO1xuICAgICAgICB0aGlzLmFkZER5bmFtaWNNb2R1bGVzKGR5bmFtaWNNb2R1bGVNZXRhZGF0YS5pbXBvcnRzLCBzY29wZSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmFkZER5bmFtaWNNb2R1bGVzID0gZnVuY3Rpb24gKG1vZHVsZXMsIHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChtb2R1bGVzID09PSB2b2lkIDApIHsgbW9kdWxlcyA9IFtdOyB9XG4gICAgICAgIG1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7IHJldHVybiBfdGhpcy5hZGRNb2R1bGUobW9kdWxlLCBzY29wZSk7IH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5iaW5kR2xvYmFsU2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHsgcmV0dXJuIF90aGlzLmJpbmRHbG9iYWxzVG9JbXBvcnRzKG1vZHVsZSk7IH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5iaW5kR2xvYmFsc1RvSW1wb3J0cyA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5nbG9iYWxNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKGdsb2JhbE1vZHVsZSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmJpbmRHbG9iYWxNb2R1bGVUb01vZHVsZShtb2R1bGUsIGdsb2JhbE1vZHVsZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5iaW5kR2xvYmFsTW9kdWxlVG9Nb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlLCBnbG9iYWxNb2R1bGUpIHtcbiAgICAgICAgaWYgKG1vZHVsZSA9PT0gZ2xvYmFsTW9kdWxlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBtb2R1bGUuYWRkSW1wb3J0KGdsb2JhbE1vZHVsZSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmFkZEltcG9ydCA9IGZ1bmN0aW9uIChyZWxhdGVkTW9kdWxlLCB0b2tlbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlLCBzY29wZSwgcmVsYXRlZE1vZHVsZVRva2VuLCByZWxhdGVkO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZHVsZXMuaGFzKHRva2VuKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlID0gdGhpcy5nZXRNb2R1bGVCeVRva2VuKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlID0gdXRpbF8xLlV0aWxzLmNvbmNhdChtb2R1bGUuc2NvcGUsIG1vZHVsZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLm1vZHVsZUNvbXBpbGVyLmNvbXBpbGUocmVsYXRlZE1vZHVsZSwgc2NvcGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZE1vZHVsZVRva2VuID0gKF9hLnNlbnQoKSkudG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkID0gdGhpcy5nZXRNb2R1bGVCeVRva2VuKHJlbGF0ZWRNb2R1bGVUb2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUuYWRkSW1wb3J0KHJlbGF0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldER5bmFtaWNNZXRhZGF0YUJ5VG9rZW4gPSBmdW5jdGlvbiAodG9rZW4sIGtleSkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSB0aGlzLmR5bmFtaWNNb2R1bGVzTWV0YWRhdGEuZ2V0KHRva2VuKTtcbiAgICAgICAgcmV0dXJuIG1ldGFkYXRhICYmIG1ldGFkYXRhW2tleV0gPyBtZXRhZGF0YVtrZXldIDogW107XG4gICAgfTtcbiAgICByZXR1cm4gT25lQ29udGFpbmVyO1xufSgpKTtcbmV4cG9ydHMuT25lQ29udGFpbmVyID0gT25lQ29udGFpbmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGFpbmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3NjYW5uZXJcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vbW9kdWxlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2NvbXBpbGVyXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9pbmplY3Rpb24tdG9rZW5cIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSW5qZWN0aW9uVG9rZW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluamVjdGlvblRva2VuKGRlc2MpIHtcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzYztcbiAgICAgICAgdGhpcy5uYW1lID0gU3ltYm9sLmZvcihcIkluamVjdGlvblRva2VuPFwiICsgdGhpcy5kZXNjICsgXCI+XCIpO1xuICAgIH1cbiAgICByZXR1cm4gSW5qZWN0aW9uVG9rZW47XG59KCkpO1xuZXhwb3J0cy5JbmplY3Rpb25Ub2tlbiA9IEluamVjdGlvblRva2VuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5qZWN0aW9uLXRva2VuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGhhc2ggPSByZXF1aXJlKFwib2JqZWN0LWhhc2hcIik7XG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xudmFyIE1vZHVsZVRva2VuRmFjdG9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9kdWxlVG9rZW5GYWN0b3J5KCkge1xuICAgIH1cbiAgICBNb2R1bGVUb2tlbkZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICh0YXJnZXQsIHNjb3BlLCBkeW5hbWljTW9kdWxlTWV0YWRhdGEpIHtcbiAgICAgICAgdmFyIHJlZmxlY3RlZFNjb3BlID0gdGhpcy5yZWZsZWN0U2NvcGUodGFyZ2V0KTtcbiAgICAgICAgdmFyIGlzU2luZ2xlU2NvcGVkID0gcmVmbGVjdGVkU2NvcGUgPT09IHRydWU7XG4gICAgICAgIHZhciBvcGFxdWVUb2tlbiA9IHtcbiAgICAgICAgICAgIG1vZHVsZTogdGhpcy5nZXRNb2R1bGVOYW1lKHRhcmdldCksXG4gICAgICAgICAgICBkeW5hbWljOiB0aGlzLmdldER5bmFtaWNNZXRhZGF0YVRva2VuKGR5bmFtaWNNb2R1bGVNZXRhZGF0YSksXG4gICAgICAgICAgICBzY29wZTogaXNTaW5nbGVTY29wZWQgPyB0aGlzLmdldFNjb3BlU3RhY2soc2NvcGUpIDogcmVmbGVjdGVkU2NvcGUsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBoYXNoKG9wYXF1ZVRva2VuKTtcbiAgICB9O1xuICAgIE1vZHVsZVRva2VuRmFjdG9yeS5wcm90b3R5cGUuZ2V0RHluYW1pY01ldGFkYXRhVG9rZW4gPSBmdW5jdGlvbiAoZHluYW1pY01vZHVsZU1ldGFkYXRhKSB7XG4gICAgICAgIHJldHVybiBkeW5hbWljTW9kdWxlTWV0YWRhdGEgPyBKU09OLnN0cmluZ2lmeShkeW5hbWljTW9kdWxlTWV0YWRhdGEpIDogJyc7XG4gICAgfTtcbiAgICBNb2R1bGVUb2tlbkZhY3RvcnkucHJvdG90eXBlLmdldE1vZHVsZU5hbWUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQubmFtZTtcbiAgICB9O1xuICAgIE1vZHVsZVRva2VuRmFjdG9yeS5wcm90b3R5cGUuZ2V0U2NvcGVTdGFjayA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmV2ZXJzZWRTY29wZSA9IHNjb3BlLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIGZpcnN0R2xvYmFsSW5kZXggPSByZXZlcnNlZFNjb3BlLmZpbmRJbmRleChmdW5jdGlvbiAocykgeyByZXR1cm4gX3RoaXMucmVmbGVjdFNjb3BlKHMpID09PSAnZ2xvYmFsJzsgfSk7XG4gICAgICAgIHNjb3BlLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIHN0YWNrID0gZmlyc3RHbG9iYWxJbmRleCA+PSAwXG4gICAgICAgICAgICA/IHNjb3BlLnNsaWNlKHNjb3BlLmxlbmd0aCAtIGZpcnN0R2xvYmFsSW5kZXggLSAxKVxuICAgICAgICAgICAgOiBzY29wZTtcbiAgICAgICAgcmV0dXJuIHN0YWNrLm1hcChmdW5jdGlvbiAobW9kdWxlKSB7IHJldHVybiBtb2R1bGUubmFtZTsgfSk7XG4gICAgfTtcbiAgICBNb2R1bGVUb2tlbkZhY3RvcnkucHJvdG90eXBlLnJlZmxlY3RTY29wZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgdmFyIHNjb3BlID0gUmVmbGVjdC5nZXRNZXRhZGF0YShjb25zdGFudHNfMS5TSEFSRURfTU9EVUxFX01FVEFEQVRBLCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gc2NvcGUgPyBzY29wZSA6ICdnbG9iYWwnO1xuICAgIH07XG4gICAgcmV0dXJuIE1vZHVsZVRva2VuRmFjdG9yeTtcbn0oKSk7XG5leHBvcnRzLk1vZHVsZVRva2VuRmFjdG9yeSA9IE1vZHVsZVRva2VuRmFjdG9yeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZHVsZS10b2tlbi1mYWN0b3J5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG52YXIgaW52ZXJzaWZ5X2luamVjdF9kZWNvcmF0b3JzXzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5LWluamVjdC1kZWNvcmF0b3JzXCIpO1xudmFyIHRva2Vuc18xID0gcmVxdWlyZShcIi4uL3Rva2Vuc1wiKTtcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XG52YXIgcmVmbGVjdG9yXzEgPSByZXF1aXJlKFwiLi4vcmVmbGVjdG9yXCIpO1xudmFyIHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi4vcmVnaXN0cnlcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xudmFyIE9uZU1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT25lTW9kdWxlKHRhcmdldCwgc2NvcGUsIGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5pbXBvcnRzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmluamVjdGFibGVzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLnByb3ZpZGVycyA9IG5ldyBpbnZlcnNpZnlfMS5Db250YWluZXIoKTtcbiAgICAgICAgdGhpcy5sYXp5SW5qZWN0ID0gaW52ZXJzaWZ5X2luamVjdF9kZWNvcmF0b3JzXzEuZGVmYXVsdCh0aGlzLnByb3ZpZGVycykubGF6eUluamVjdDtcbiAgICAgICAgdGhpcy5leHBvcnRzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZWQgPSB1dGlsXzEuVXRpbHMuY3JlYXRlRGVmZXJyZWRQcm9taXNlKCk7XG4gICAgfVxuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYWRkSW1wb3J0ID0gZnVuY3Rpb24gKHJlbGF0ZWRNb2R1bGUpIHtcbiAgICAgICAgdGhpcy5pbXBvcnRzLmFkZChyZWxhdGVkTW9kdWxlKTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYWRkUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgdGhpcy5pbmplY3RhYmxlcy5hZGQocHJvdmlkZXIpO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5wcm92aWRlckNvbnRhaW5lckhhc1Rva2VuID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZCh0aGlzLmluamVjdGFibGVzLnZhbHVlcygpKS5zb21lKGZ1bmN0aW9uIChwcm92aWRlcikgeyByZXR1cm4gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlclRva2VuKHByb3ZpZGVyKSA9PT0gdG9rZW47IH0pO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS52YWxpZGF0ZUV4cG9ydGVkID0gZnVuY3Rpb24gKHRva2VuLCBleHBvcnRlZCkge1xuICAgICAgICBpZiAodGhpcy5wcm92aWRlckNvbnRhaW5lckhhc1Rva2VuKHRva2VuKSlcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgdmFyIGltcG9ydGVkID0gX19zcHJlYWQodGhpcy5pbXBvcnRzLnZhbHVlcygpKTtcbiAgICAgICAgdmFyIGltcG9ydGVkUmVmTmFtZXMgPSBpbXBvcnRlZFxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbTsgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gX2EudGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0OyB9KTtcbiAgICAgICAgaWYgKCFpbXBvcnRlZFJlZk5hbWVzLmluY2x1ZGVzKHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlVua25vd25FeHBvcnRFeGNlcHRpb24odGhpcy50YXJnZXQubmFtZSwgZXhwb3J0ZWQubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5hZGRFeHBvcnRlZCA9IGZ1bmN0aW9uIChleHBvcnRlZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYWRkRXhwb3J0ZWRVbml0ID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy5leHBvcnRzLmFkZChfdGhpcy52YWxpZGF0ZUV4cG9ydGVkKHRva2VuLCBleHBvcnRlZCkpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAocmVnaXN0cnlfMS5SZWdpc3RyeS5pc0R5bmFtaWNNb2R1bGUoZXhwb3J0ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYWRkRXhwb3J0ZWRVbml0KGV4cG9ydGVkLm1vZHVsZSk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkRXhwb3J0ZWRVbml0KHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJUb2tlbihleHBvcnRlZCkpO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5nZXRQcm92aWRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZChbXG4gICAgICAgICAgICB0b2tlbnNfMS5JbmplY3RvclxuICAgICAgICBdLCB0aGlzLmluamVjdGFibGVzLnZhbHVlcygpLCB0aGlzLmdldFJlbGF0ZWRQcm92aWRlcnMoKS52YWx1ZXMoKSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmxpbmtSZWxhdGVkUHJvdmlkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvdmlkZXJzID0gdGhpcy5nZXRSZWxhdGVkUHJvdmlkZXJzKCk7XG4gICAgICAgIHByb3ZpZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICAgICAgdmFyIHJlZiA9IF90aGlzLmNvbnRhaW5lci5nZXRQcm92aWRlcihwcm92aWRlciwgX3RoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgIF90aGlzLnByb3ZpZGVycy5iaW5kKHByb3ZpZGVyKS50b0NvbnN0YW50VmFsdWUocmVmKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmdldFJlbGF0ZWRQcm92aWRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB2YXIgcHJvdmlkZXJTY29wZSA9IG5ldyBTZXQoKTtcbiAgICAgICAgdmFyIGZpbmQgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgICB2YXIgZV8yLCBfYTtcbiAgICAgICAgICAgIG1vZHVsZSA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0Rm9yd2FyZFJlZihtb2R1bGUpO1xuICAgICAgICAgICAgaWYgKHJlZmxlY3Rvcl8xLlJlZmxlY3Rvci5pc1Byb3ZpZGVyKG1vZHVsZSkpIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlclNjb3BlLmFkZChtb2R1bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhtb2R1bGUuZXhwb3J0cyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWxhdGVkID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY29udGFpbmVyLmhhc01vZHVsZShyZWxhdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSBfdGhpcy5jb250YWluZXIuZ2V0TW9kdWxlKHJlbGF0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmQocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyU2NvcGUuYWRkKHJlbGF0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcy5pbXBvcnRzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciByZWxhdGVkID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgZmluZChyZWxhdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm92aWRlclNjb3BlO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5iaW5kUHJvdmlkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8zLCBfYSwgX2IsIF9jLCBwcm92aWRlciwgaXNNdWx0aSwgdG9rZW4sIG5hbWVfMSwgdHlwZSwgZV8zXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtSZWxhdGVkUHJvdmlkZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kLnRyeXMucHVzaChbMSwgNiwgNywgOF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSBfX3ZhbHVlcyh0aGlzLmluamVjdGFibGVzKSwgX2MgPSBfYi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIV9jLmRvbmUpIHJldHVybiBbMywgNV07XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlciA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNNdWx0aSA9IHByb3ZpZGVyLm11bHRpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyVG9rZW4ocHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc011bHRpICYmIHRoaXMuY29udGFpbmVyLnByb3ZpZGVyVG9rZW5zLmluY2x1ZGVzKHRva2VuKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVfMSA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJOYW1lKHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTXVsdGlQcm92aWRlckV4Y2VwdGlvbihuYW1lXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucHJvdmlkZXJUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdGhpcy5nZXRQcm92aWRlclR5cGUocHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLmJpbmQodG9rZW4sIHR5cGUsIHByb3ZpZGVyKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2MgPSBfYi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfM18xID0gX2Quc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV8zID0geyBlcnJvcjogZV8zXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uICh0b1JlcGxhY2UsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5hZGRQcm92aWRlcihfX2Fzc2lnbih7IHByb3ZpZGU6IHRvUmVwbGFjZSB9LCBvcHRpb25zKSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZSwgX2E7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm92aWRlcnMuaXNCb3VuZCh0aGlzLnRhcmdldCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5iaW5kUHJvdmlkZXJzKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVycy5iaW5kKHRoaXMudGFyZ2V0KS50b1NlbGYoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZSA9IHRoaXMucHJvdmlkZXJzLmdldCh0aGlzLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IG1vZHVsZS5vbk1vZHVsZUluaXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9hKSByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBtb2R1bGUub25Nb2R1bGVJbml0KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IChfYi5zZW50KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdXRpbF8xLlV0aWxzLnNlcmllcyh0aGlzLmNvbnRhaW5lci5nZXRBbGxQcm92aWRlcnModG9rZW5zXzEuTU9EVUxFX0lOSVQsIHRoaXMudGFyZ2V0KSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmdldFByb3ZpZGVyVHlwZSA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICBpZiAocmVnaXN0cnlfMS5SZWdpc3RyeS5pc0ZhY3RvcnlQcm92aWRlcihwcm92aWRlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5GQUNUT1JZO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNWYWx1ZVByb3ZpZGVyKHByb3ZpZGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLlZBTFVFO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNDbGFzc1Byb3ZpZGVyKHByb3ZpZGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLkNMQVNTO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNFeGlzdGluZ1Byb3ZpZGVyKHByb3ZpZGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLkVYSVNUSU5HO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5ERUZBVUxUO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5nZXRQcm92aWRlciA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgdmFyIHRva2VuID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlclRva2VuKHJlZik7XG4gICAgICAgIHZhciBwcm92aWRlciA9ICh0aGlzLmdldFByb3ZpZGVycygpLmZpbmQoZnVuY3Rpb24gKHByb3ZpZGVyKSB7IHJldHVybiBwcm92aWRlciA9PT0gdG9rZW47IH0pKTtcbiAgICAgICAgaWYgKCFwcm92aWRlcilcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5Vbmtub3duUHJvdmlkZXJFeGNlcHRpb24ocmVmLCB0aGlzLnRhcmdldCk7XG4gICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuZ2V0RGVwZW5kZW5jaWVzID0gZnVuY3Rpb24gKGRlcGVuZGVuY2llcykge1xuICAgICAgICBpZiAoZGVwZW5kZW5jaWVzID09PSB2b2lkIDApIHsgZGVwZW5kZW5jaWVzID0gW107IH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCBQcm9taXNlLmFsbChkZXBlbmRlbmNpZXMubWFwKGZ1bmN0aW9uIChkZXBlbmRlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0Rm9yd2FyZFJlZihkZXBlbmRlbmN5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RyeV8xLlJlZ2lzdHJ5LmFzc2VydFByb3ZpZGVyKHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3ZpZGVyID0gX3RoaXMuZ2V0UHJvdmlkZXIocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29udGFpbmVyLmdldFByb3ZpZGVyKHByb3ZpZGVyLCBfdGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIsIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5iaW5kRmFjdG9yeVByb3ZpZGVyID0gZnVuY3Rpb24gKHRva2VuLCBwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGVwcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB0aGlzLmdldERlcGVuZGVuY2llcyhwcm92aWRlci5kZXBzKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvdmlkZXIuc2NvcGUgPT09IGNvbnN0YW50c18xLlNDT1BFUy5UUkFOU0lFTlQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHRoaXMucHJvdmlkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmluZCh0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b0R5bmFtaWNWYWx1ZShmdW5jdGlvbiAoKSB7IHJldHVybiBwcm92aWRlci51c2VGYWN0b3J5LmFwcGx5KHByb3ZpZGVyLCBfX3NwcmVhZChkZXBzKSk7IH0pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdGhpcy5wcm92aWRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJpbmQodG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1Byb3ZpZGVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3ZpZGVyLnVzZUZhY3RvcnkuYXBwbHkocHJvdmlkZXIsIF9fc3ByZWFkKGRlcHMpKTsgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYmluZFByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyLCBzY29wZSkge1xuICAgICAgICB2YXIgYmluZGluZyA9IHRoaXMucHJvdmlkZXJzLmJpbmQocHJvdmlkZXIpLnRvU2VsZigpO1xuICAgICAgICBzd2l0Y2ggKHNjb3BlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50c18xLlNDT1BFUy5UUkFOU0lFTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmcuaW5UcmFuc2llbnRTY29wZSgpO1xuICAgICAgICAgICAgY2FzZSBjb25zdGFudHNfMS5TQ09QRVMuUkVRVUVTVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZy5pblJlcXVlc3RTY29wZSgpO1xuICAgICAgICAgICAgY2FzZSBjb25zdGFudHNfMS5TQ09QRVMuU0lOR0xFVE9OOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZy5pblNpbmdsZXRvblNjb3BlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYmluZENsYXNzUHJvdmlkZXIgPSBmdW5jdGlvbiAodG9rZW4sIHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVycy5iaW5kKHRva2VuKS50byhwcm92aWRlci51c2VDbGFzcyk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmJpbmRWYWx1ZVByb3ZpZGVyID0gZnVuY3Rpb24gKHRva2VuLCBwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm92aWRlcnMuYmluZCh0b2tlbikudG9Db25zdGFudFZhbHVlKHByb3ZpZGVyLnVzZVZhbHVlKTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYmluZEV4aXN0aW5nUHJvdmlkZXIgPSBmdW5jdGlvbiAodG9rZW4sIHByb3ZpZGVyKSB7XG4gICAgICAgIHZhciBleGlzdGluZ1Rva2VuID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRJbmplY3Rpb25Ub2tlbihwcm92aWRlci51c2VFeGlzdGluZyk7XG4gICAgICAgIHZhciBleGlzdGluZyA9IHRoaXMucHJvdmlkZXJzLmdldChleGlzdGluZ1Rva2VuKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvdmlkZXJzLmJpbmQodG9rZW4pLnRvQ29uc3RhbnRWYWx1ZShleGlzdGluZyk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAodG9rZW4sIHR5cGUsIHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzY29wZSwgbGF6eUluamVjdHM7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZSA9PT0gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuREVGQVVMVCkpIHJldHVybiBbMywgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZSA9IHJlZmxlY3Rvcl8xLlJlZmxlY3Rvci5yZXNvbHZlUHJvdmlkZXJTY29wZShwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5SW5qZWN0cyA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0TGF6eUluamVjdHMocHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUluamVjdHMuZm9yRWFjaChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF6eUluamVjdCA9IF9hLmxhenlJbmplY3QsIGZvcndhcmRSZWYgPSBfYS5mb3J3YXJkUmVmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0Rm9yd2FyZFJlZihmb3J3YXJkUmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXp5SW5qZWN0KF90aGlzLmxhenlJbmplY3QsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kUHJvdmlkZXIocHJvdmlkZXIsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGUgPT09IGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLkZBQ1RPUlkpKSByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLmJpbmRGYWN0b3J5UHJvdmlkZXIodG9rZW4sIHByb3ZpZGVyKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5WQUxVRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFZhbHVlUHJvdmlkZXIodG9rZW4sIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLkNMQVNTKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kQ2xhc3NQcm92aWRlcih0b2tlbiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuRVhJU1RJTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRFeGlzdGluZ1Byb3ZpZGVyKHRva2VuLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmFkZEdsb2JhbFByb3ZpZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wcm92aWRlcnMuYmluZCh0b2tlbnNfMS5JbmplY3RvcikudG9Db25zdGFudFZhbHVlKHRoaXMucHJvdmlkZXJzKTtcbiAgICAgICAgdGhpcy5wcm92aWRlcnMuYmluZChjb250YWluZXJfMS5PbmVDb250YWluZXIpLnRvQ29uc3RhbnRWYWx1ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzLmJpbmQodG9rZW5zXzEuT05FX01PRFVMRS5uYW1lKS50b0NvbnN0YW50VmFsdWUodGhpcyk7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzXG4gICAgICAgICAgICAuYmluZCh0b2tlbnNfMS5JbmplY3RvcilcbiAgICAgICAgICAgIC50b0NvbnN0YW50VmFsdWUodGhpcy5wcm92aWRlcnMpXG4gICAgICAgICAgICAud2hlbkluamVjdGVkSW50byh0aGlzLnRhcmdldCk7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzXG4gICAgICAgICAgICAuYmluZChjb250YWluZXJfMS5PbmVDb250YWluZXIpXG4gICAgICAgICAgICAudG9Db25zdGFudFZhbHVlKHRoaXMuY29udGFpbmVyKVxuICAgICAgICAgICAgLndoZW5JbmplY3RlZEludG8odGhpcy50YXJnZXQpO1xuICAgIH07XG4gICAgcmV0dXJuIE9uZU1vZHVsZTtcbn0oKSk7XG5leHBvcnRzLk9uZU1vZHVsZSA9IE9uZU1vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZHVsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG59O1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZCkgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gICAgcmV0dXJuIGFyO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG52YXIgcmVmbGVjdG9yXzEgPSByZXF1aXJlKFwiLi4vcmVmbGVjdG9yXCIpO1xudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcbnZhciByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uL3JlZ2lzdHJ5XCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xudmFyIFNjYW5uZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjYW5uZXIoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cbiAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdGhpcy5zY2FuRm9yTW9kdWxlcyhtb2R1bGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLnNjYW5Nb2R1bGVzRm9yRGVwZW5kZW5jaWVzKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5iaW5kR2xvYmFsU2NvcGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5jcmVhdGVNb2R1bGVzKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLmNyZWF0ZU1vZHVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0cmF2ZXJzZSwgcm9vdE1vZHVsZTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmF2ZXJzZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZV8xLCBfYSwgaW1wb3J0cywgaW1wb3J0c18xLCBpbXBvcnRzXzFfMSwgaW5uZXJNb2R1bGUsIGVfMV8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydHMgPSBtb2R1bGUuaW1wb3J0cy52YWx1ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCA2LCA3LCA4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0c18xID0gX192YWx1ZXMoaW1wb3J0cyksIGltcG9ydHNfMV8xID0gaW1wb3J0c18xLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhaW1wb3J0c18xXzEuZG9uZSkgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lck1vZHVsZSA9IGltcG9ydHNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdHJhdmVyc2UoaW5uZXJNb2R1bGUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydHNfMV8xID0gaW1wb3J0c18xLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVfMV8xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0c18xXzEgJiYgIWltcG9ydHNfMV8xLmRvbmUgJiYgKF9hID0gaW1wb3J0c18xLnJldHVybikpIF9hLmNhbGwoaW1wb3J0c18xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbNCwgUHJvbWlzZS5hbGwoX19zcHJlYWQoaW1wb3J0cykubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZCA9IF9hLmNyZWF0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgbW9kdWxlLmNyZWF0ZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm1vZHVsZU9yZGVyLmFkZChtb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdE1vZHVsZSA9IHRoaXMuY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldE1vZHVsZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWx1ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5uZXh0KCkudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRyYXZlcnNlKHJvb3RNb2R1bGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuRm9yTW9kdWxlcyA9IGZ1bmN0aW9uIChtb2R1bGUsIHNjb3BlLCBjdHhSZWdpc3RyeSkge1xuICAgICAgICBpZiAoc2NvcGUgPT09IHZvaWQgMCkgeyBzY29wZSA9IFtdOyB9XG4gICAgICAgIGlmIChjdHhSZWdpc3RyeSA9PT0gdm9pZCAwKSB7IGN0eFJlZ2lzdHJ5ID0gW107IH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMiwgX2EsIGltcG9ydHMsIG1vZHVsZXMsIG1vZHVsZXNfMSwgbW9kdWxlc18xXzEsIGlubmVyTW9kdWxlLCBzY29wZWRNb2R1bGVzLCBlXzJfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB0aGlzLnN0b3JlTW9kdWxlKG1vZHVsZSwgc2NvcGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4UmVnaXN0cnkucHVzaChtb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ2lzdHJ5XzEuUmVnaXN0cnkuaGFzRm9yd2FyZFJlZihtb2R1bGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlID0gbW9kdWxlLmZvcndhcmRSZWYoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydHMgPSByZWZsZWN0b3JfMS5SZWZsZWN0b3IuZ2V0KGNvbnN0YW50c18xLk1FVEFEQVRBLklNUE9SVFMsIG1vZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5pc0R5bmFtaWNNb2R1bGUobW9kdWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX19zcHJlYWQoaW1wb3J0cywgKG1vZHVsZS5pbXBvcnRzIHx8IFtdKSkgOiBpbXBvcnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzIsIDcsIDgsIDldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfMSA9IF9fdmFsdWVzKG1vZHVsZXMpLCBtb2R1bGVzXzFfMSA9IG1vZHVsZXNfMS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIW1vZHVsZXNfMV8xLmRvbmUpIHJldHVybiBbMywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lck1vZHVsZSA9IG1vZHVsZXNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eFJlZ2lzdHJ5LmluY2x1ZGVzKGlubmVyTW9kdWxlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVkTW9kdWxlcyA9IHV0aWxfMS5VdGlscy5jb25jYXQoc2NvcGUsIG1vZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuc2NhbkZvck1vZHVsZXMoaW5uZXJNb2R1bGUsIHNjb3BlZE1vZHVsZXMsIGN0eFJlZ2lzdHJ5KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc18xXzEgPSBtb2R1bGVzXzEubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzMsIDldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzJfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2R1bGVzXzFfMSAmJiAhbW9kdWxlc18xXzEuZG9uZSAmJiAoX2EgPSBtb2R1bGVzXzEucmV0dXJuKSkgX2EuY2FsbChtb2R1bGVzXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnN0b3JlTW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSwgc2NvcGUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWdpc3RyeV8xLlJlZ2lzdHJ5Lmhhc0ZvcndhcmRSZWYobW9kdWxlKSkgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5jb250YWluZXIuYWRkTW9kdWxlKG1vZHVsZS5mb3J3YXJkUmVmKCksIHNjb3BlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbNCwgdGhpcy5jb250YWluZXIuYWRkTW9kdWxlKG1vZHVsZSwgc2NvcGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5zdG9yZUltcG9ydCA9IGZ1bmN0aW9uIChyZWxhdGVkLCB0b2tlbiwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbGF0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkNpcmN1bGFyRGVwZW5kZW5jeUV4Y2VwdGlvbihjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVnaXN0cnlfMS5SZWdpc3RyeS5oYXNGb3J3YXJkUmVmKHJlbGF0ZWQpKSByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLmNvbnRhaW5lci5hZGRJbXBvcnQocmVsYXRlZC5mb3J3YXJkUmVmKCksIHRva2VuKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbNCwgdGhpcy5jb250YWluZXIuYWRkSW1wb3J0KHJlbGF0ZWQsIHRva2VuKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuc2Nhbk1vZHVsZXNGb3JEZXBlbmRlbmNpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzMsIF9hLCBtb2R1bGVzLCBtb2R1bGVzXzIsIG1vZHVsZXNfMl8xLCBfYiwgdG9rZW4sIG1vZHVsZV8xLCBlXzNfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXMgPSB0aGlzLmNvbnRhaW5lci5nZXRSZXZlcnNlZE1vZHVsZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2MudHJ5cy5wdXNoKFsxLCA3LCA4LCA5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzXzIgPSBfX3ZhbHVlcyhtb2R1bGVzKSwgbW9kdWxlc18yXzEgPSBtb2R1bGVzXzIubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFtb2R1bGVzXzJfMS5kb25lKSByZXR1cm4gWzMsIDZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSBfX3JlYWQobW9kdWxlc18yXzEudmFsdWUsIDIpLCB0b2tlbiA9IF9iWzBdLCBtb2R1bGVfMSA9IF9iWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLnJlZmxlY3RJbXBvcnRzKG1vZHVsZV8xLnRhcmdldCwgdG9rZW4sIG1vZHVsZV8xLnRhcmdldC5uYW1lKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5yZWZsZWN0UHJvdmlkZXJzKG1vZHVsZV8xLnRhcmdldCwgdG9rZW4pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZsZWN0RXhwb3J0cyhtb2R1bGVfMS50YXJnZXQsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc18yXzEgPSBtb2R1bGVzXzIubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzMsIDldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzNfMSA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMyA9IHsgZXJyb3I6IGVfM18xIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2R1bGVzXzJfMSAmJiAhbW9kdWxlc18yXzEuZG9uZSAmJiAoX2EgPSBtb2R1bGVzXzIucmV0dXJuKSkgX2EuY2FsbChtb2R1bGVzXzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnJlZmxlY3RQcm92aWRlcnMgPSBmdW5jdGlvbiAobW9kdWxlLCB0b2tlbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV80LCBfYSwgcHJvdmlkZXJzLCBwcm92aWRlcnNfMSwgcHJvdmlkZXJzXzFfMSwgcHJvdmlkZXIsIGVfNF8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzID0gdGhpcy5nZXREeW5hbWljTWV0YWRhdGEobW9kdWxlLCB0b2tlbiwgY29uc3RhbnRzXzEuTUVUQURBVEEuUFJPVklERVJTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCA2LCA3LCA4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnNfMSA9IF9fdmFsdWVzKHByb3ZpZGVycyksIHByb3ZpZGVyc18xXzEgPSBwcm92aWRlcnNfMS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXByb3ZpZGVyc18xXzEuZG9uZSkgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyID0gcHJvdmlkZXJzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5zdG9yZVByb3ZpZGVyKHByb3ZpZGVyLCB0b2tlbildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyc18xXzEgPSBwcm92aWRlcnNfMS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfNF8xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV80ID0geyBlcnJvcjogZV80XzEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3ZpZGVyc18xXzEgJiYgIXByb3ZpZGVyc18xXzEuZG9uZSAmJiAoX2EgPSBwcm92aWRlcnNfMS5yZXR1cm4pKSBfYS5jYWxsKHByb3ZpZGVyc18xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV80KSB0aHJvdyBlXzQuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5zdG9yZVByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyLCB0b2tlbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdGhpcy5jb250YWluZXIuYWRkUHJvdmlkZXIocHJvdmlkZXIsIHRva2VuKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuZ2V0RHluYW1pY01ldGFkYXRhID0gZnVuY3Rpb24gKG1vZHVsZSwgdG9rZW4sIG1ldGFkYXRhS2V5KSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZChyZWZsZWN0b3JfMS5SZWZsZWN0b3IuZ2V0KG1ldGFkYXRhS2V5LCBtb2R1bGUpLCB0aGlzLmNvbnRhaW5lci5nZXREeW5hbWljTWV0YWRhdGFCeVRva2VuKHRva2VuLCBtZXRhZGF0YUtleSkpO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUucmVmbGVjdEV4cG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlLCB0b2tlbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZXhwb3J0cyA9IHRoaXMuZ2V0RHluYW1pY01ldGFkYXRhKG1vZHVsZSwgdG9rZW4sIGNvbnN0YW50c18xLk1FVEFEQVRBLkVYUE9SVFMpO1xuICAgICAgICBleHBvcnRzLmZvckVhY2goZnVuY3Rpb24gKGV4cG9ydGVkQ29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuc3RvcmVFeHBvcnRlZChleHBvcnRlZENvbXBvbmVudCwgdG9rZW4pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnN0b3JlRXhwb3J0ZWQgPSBmdW5jdGlvbiAoY29tcG9uZW50LCB0b2tlbikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFeHBvcnRlZChjb21wb25lbnQsIHRva2VuKTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnJlZmxlY3RJbXBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZSwgdG9rZW4sIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfNSwgX2EsIG1vZHVsZXMsIG1vZHVsZXNfMywgbW9kdWxlc18zXzEsIHJlbGF0ZWQsIGVfNV8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlcyA9IHRoaXMuZ2V0RHluYW1pY01ldGFkYXRhKG1vZHVsZSwgdG9rZW4sIGNvbnN0YW50c18xLk1FVEFEQVRBLklNUE9SVFMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDYsIDcsIDhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfMyA9IF9fdmFsdWVzKG1vZHVsZXMpLCBtb2R1bGVzXzNfMSA9IG1vZHVsZXNfMy5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIW1vZHVsZXNfM18xLmRvbmUpIHJldHVybiBbMywgNV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkID0gbW9kdWxlc18zXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuc3RvcmVJbXBvcnQocmVsYXRlZCwgdG9rZW4sIGNvbnRleHQpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzXzNfMSA9IG1vZHVsZXNfMy5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfNV8xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV81ID0geyBlcnJvcjogZV81XzEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZHVsZXNfM18xICYmICFtb2R1bGVzXzNfMS5kb25lICYmIChfYSA9IG1vZHVsZXNfMy5yZXR1cm4pKSBfYS5jYWxsKG1vZHVsZXNfMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNSkgdGhyb3cgZV81LmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNjYW5uZXI7XG59KCkpO1xuZXhwb3J0cy5TY2FubmVyID0gU2Nhbm5lcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjYW5uZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTtcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcbnZhciBSZWZsZWN0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlZmxlY3RvcigpIHtcbiAgICB9XG4gICAgUmVmbGVjdG9yLmRlZmluZUJ5S2V5cyA9IGZ1bmN0aW9uIChtZXRhZGF0YSwgdGFyZ2V0LCBleGNsdWRlKSB7XG4gICAgICAgIGlmIChleGNsdWRlID09PSB2b2lkIDApIHsgZXhjbHVkZSA9IFtdOyB9XG4gICAgICAgIE9iamVjdC5rZXlzKG1ldGFkYXRhKVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAocCkgeyByZXR1cm4gIWV4Y2x1ZGUuaW5jbHVkZXMocCk7IH0pXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEocHJvcGVydHksIG1ldGFkYXRhW3Byb3BlcnR5XSwgdGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcbiAgICBSZWZsZWN0b3IuZ2V0ID0gZnVuY3Rpb24gKG1ldGFkYXRhS2V5LCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCkgfHwgW107XG4gICAgfTtcbiAgICBSZWZsZWN0b3Iuc2V0ID0gZnVuY3Rpb24gKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgIH07XG4gICAgUmVmbGVjdG9yLmhhcyA9IGZ1bmN0aW9uIChtZXRhZGF0YUtleSwgdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0Lmhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQpO1xuICAgIH07XG4gICAgUmVmbGVjdG9yLmlzR2xvYmFsTW9kdWxlID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5oYXNNZXRhZGF0YShjb25zdGFudHNfMS5TSEFSRURfTU9EVUxFX01FVEFEQVRBLCB0YXJnZXQpO1xuICAgIH07XG4gICAgUmVmbGVjdG9yLmlzUHJvdmlkZXIgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0Lmhhc01ldGFkYXRhKGNvbnN0YW50c18xLlBST1ZJREVSX01FVEFEQVRBLCB0YXJnZXQpO1xuICAgIH07XG4gICAgUmVmbGVjdG9yLnJlc29sdmVQcm92aWRlclNjb3BlID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0LmdldE1ldGFkYXRhKGNvbnN0YW50c18xLlNDT1BFX01FVEFEQVRBLCBwcm92aWRlcik7XG4gICAgfTtcbiAgICByZXR1cm4gUmVmbGVjdG9yO1xufSgpKTtcbmV4cG9ydHMuUmVmbGVjdG9yID0gUmVmbGVjdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVmbGVjdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZCkgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gICAgcmV0dXJuIGFyO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbnZhciBtb2R1bGVfMSA9IHJlcXVpcmUoXCIuL21vZHVsZVwiKTtcbnZhciByZWZsZWN0b3JfMSA9IHJlcXVpcmUoXCIuL3JlZmxlY3RvclwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xudmFyIFJlZ2lzdHJ5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWdpc3RyeSgpIHtcbiAgICB9XG4gICAgUmVnaXN0cnkuY2xlYXJMYXp5SW5qZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5sYXp5SW5qZWN0cy5jbGVhcigpO1xuICAgIH07XG4gICAgUmVnaXN0cnkuZ2V0TGF6eUluamVjdHMgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZCh0aGlzLmxhenlJbmplY3RzLnZhbHVlcygpKS5maWx0ZXIoZnVuY3Rpb24gKHByb3ZpZGVyKSB7IHJldHVybiBwcm92aWRlci50YXJnZXQgPT09IHRhcmdldDsgfSk7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5pc01vZHVsZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlzRHluYW1pY01vZHVsZSh0YXJnZXQpIHx8XG4gICAgICAgICAgICAoIXRoaXMuaGFzUHJvdmlkZVRva2VuKHRhcmdldCkgJiZcbiAgICAgICAgICAgICAgICAhcmVmbGVjdG9yXzEuUmVmbGVjdG9yLmlzUHJvdmlkZXIodGFyZ2V0KSAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmlzSW5qZWN0aW9uVG9rZW4odGFyZ2V0KSkpO1xuICAgIH07XG4gICAgUmVnaXN0cnkuaGFzRm9yd2FyZFJlZiA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gISEocHJvdmlkZXIgJiYgcHJvdmlkZXIuZm9yd2FyZFJlZik7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5nZXRGb3J3YXJkUmVmID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiBSZWdpc3RyeS5oYXNGb3J3YXJkUmVmKHByb3ZpZGVyKVxuICAgICAgICAgICAgPyBwcm92aWRlci5mb3J3YXJkUmVmKClcbiAgICAgICAgICAgIDogcHJvdmlkZXI7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5nZXRQcm92aWRlck5hbWUgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgdmFyIHRva2VuID0gdGhpcy5nZXRQcm92aWRlclRva2VuKHByb3ZpZGVyKTtcbiAgICAgICAgcmV0dXJuIHV0aWxfMS5VdGlscy5pc1N5bWJvbCh0b2tlbikgPyB0b2tlbi50b1N0cmluZygpIDogdG9rZW4ubmFtZTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmlzSW5qZWN0aW9uVG9rZW4gPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyIGluc3RhbmNlb2YgbW9kdWxlXzEuSW5qZWN0aW9uVG9rZW47XG4gICAgfTtcbiAgICBSZWdpc3RyeS5nZXRJbmplY3Rpb25Ub2tlbiA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0luamVjdGlvblRva2VuKHByb3ZpZGVyKVxuICAgICAgICAgICAgPyBwcm92aWRlci5uYW1lXG4gICAgICAgICAgICA6IHByb3ZpZGVyO1xuICAgIH07XG4gICAgUmVnaXN0cnkuYXNzZXJ0UHJvdmlkZXIgPSBmdW5jdGlvbiAodmFsLCBjb250ZXh0KSB7XG4gICAgICAgIGlmICghdmFsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkNpcmN1bGFyRGVwZW5kZW5jeUV4Y2VwdGlvbihjb250ZXh0KTtcbiAgICAgICAgaWYgKCEodXRpbF8xLlV0aWxzLmlzT2JqZWN0KHZhbCkgfHxcbiAgICAgICAgICAgICghdXRpbF8xLlV0aWxzLmlzTmlsKHZhbC5uYW1lKSAmJlxuICAgICAgICAgICAgICAgICh1dGlsXzEuVXRpbHMuaXNGdW5jdGlvbih2YWwpIHx8IHV0aWxfMS5VdGlscy5pc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3RvcikpKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5JbnZhbGlkUHJvdmlkZXJFeGNlcHRpb24odmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG4gICAgUmVnaXN0cnkuZ2V0UHJvdmlkZXJUb2tlbiA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHByb3ZpZGVyICE9PSAnc3ltYm9sJ1xuICAgICAgICAgICAgPyB0aGlzLmdldEluamVjdGlvblRva2VuKHByb3ZpZGVyLnByb3ZpZGUgfHwgcHJvdmlkZXIpXG4gICAgICAgICAgICA6IHByb3ZpZGVyO1xuICAgIH07XG4gICAgUmVnaXN0cnkuaXNEeW5hbWljTW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICByZXR1cm4gISFtb2R1bGUubW9kdWxlO1xuICAgIH07XG4gICAgUmVnaXN0cnkuaXNGYWN0b3J5UHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuICEhcHJvdmlkZXIudXNlRmFjdG9yeTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmlzVmFsdWVQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gISFwcm92aWRlci51c2VWYWx1ZTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmlzQ2xhc3NQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gISFwcm92aWRlci51c2VDbGFzcztcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmlzRXhpc3RpbmdQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gISFwcm92aWRlci51c2VFeGlzdGluZztcbiAgICB9O1xuICAgIFJlZ2lzdHJ5Lmhhc1Byb3ZpZGVUb2tlbiA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gISFwcm92aWRlci5wcm92aWRlO1xuICAgIH07XG4gICAgUmVnaXN0cnkubGF6eUluamVjdHMgPSBuZXcgU2V0KCk7XG4gICAgcmV0dXJuIFJlZ2lzdHJ5O1xufSgpKTtcbmV4cG9ydHMuUmVnaXN0cnkgPSBSZWdpc3RyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZ2lzdHJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG52YXIgaW5qZWN0aW9uX3Rva2VuXzEgPSByZXF1aXJlKFwiLi9tb2R1bGUvaW5qZWN0aW9uLXRva2VuXCIpO1xuZXhwb3J0cy5BUFBfSU5JVCA9IG5ldyBpbmplY3Rpb25fdG9rZW5fMS5JbmplY3Rpb25Ub2tlbignSW5pdGlhbGl6ZTxBcHA+Jyk7XG5leHBvcnRzLkFQUF9ERVNUUk9ZID0gbmV3IGluamVjdGlvbl90b2tlbl8xLkluamVjdGlvblRva2VuKCdEZXN0cm95PEFwcD4nKTtcbmV4cG9ydHMuTU9EVUxFX0lOSVQgPSBuZXcgaW5qZWN0aW9uX3Rva2VuXzEuSW5qZWN0aW9uVG9rZW4oJ0luaXRpYWxpemU8TW9kdWxlPicpO1xuZXhwb3J0cy5PTkVfTU9EVUxFID0gbmV3IGluamVjdGlvbl90b2tlbl8xLkluamVjdGlvblRva2VuKCdSZWY8TW9kdWxlPicpO1xudmFyIEluamVjdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5qZWN0b3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5qZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEluamVjdG9yO1xufShpbnZlcnNpZnlfMS5Db250YWluZXIpKTtcbmV4cG9ydHMuSW5qZWN0b3IgPSBJbmplY3Rvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbnZhciBVdGlscyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVXRpbHMoKSB7XG4gICAgfVxuICAgIFV0aWxzLmlzTm9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICghdGhpcy5pc05pbChwcm9jZXNzKSAmJlxuICAgICAgICAgICAgdGhpcy5pc09iamVjdChwcm9jZXNzLnJlbGVhc2UpICYmXG4gICAgICAgICAgICBwcm9jZXNzLnJlbGVhc2UubmFtZSA9PT0gJ25vZGUnKTtcbiAgICB9O1xuICAgIFV0aWxzLnByb2Nlc3NFeGl0ID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgaWYgKGNvZGUgPT09IHZvaWQgMCkgeyBjb2RlID0gMDsgfVxuICAgICAgICBpZiAodGhpcy5pc05vZGUoKSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KGNvZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBVdGlscy5pc0VsZWN0cm9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNOaWwod2luZG93KSAmJlxuICAgICAgICAgICAgdGhpcy5pc09iamVjdCh3aW5kb3cucHJvY2VzcykgJiZcbiAgICAgICAgICAgIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzTmlsKHByb2Nlc3MpICYmXG4gICAgICAgICAgICB0aGlzLmlzT2JqZWN0KHByb2Nlc3MudmVyc2lvbnMpICYmXG4gICAgICAgICAgICAhdGhpcy5pc05pbChwcm9jZXNzLnZlcnNpb25zLmVsZWN0cm9uKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gKHRoaXMuaXNPYmplY3QobmF2aWdhdG9yKSAmJlxuICAgICAgICAgICAgdGhpcy5pc1N0cmluZyhuYXZpZ2F0b3IudXNlckFnZW50KSAmJlxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcygnRWxlY3Ryb24nKSk7XG4gICAgfTtcbiAgICBVdGlscy5sb2FkUGFja2FnZSA9IGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDIsICwgM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCByZXF1aXJlKG5hbWUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIsIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5NaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5RXhjZXB0aW9uKG5hbWUsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVXRpbHMuaXNFbXB0eSA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgICAgICByZXR1cm4gIShhcnJheSAmJiBhcnJheS5sZW5ndGggPiAwKTtcbiAgICB9O1xuICAgIFV0aWxzLmdldERlZmVycmVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1Byb21pc2UodmFsdWUpKSByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB2YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzIsIF9hXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVdGlscy5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsICYmIHRoaXMuaXNGdW5jdGlvbih2YWxbU3ltYm9sLml0ZXJhdG9yXSk7XG4gICAgfTtcbiAgICBVdGlscy5pc1Byb21pc2UgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWwgJiYgdGhpcy5pc0Z1bmN0aW9uKHZhbC50aGVuKTtcbiAgICB9O1xuICAgIFV0aWxzLmlzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbCAmJiB0aGlzLmlzRnVuY3Rpb24odmFsLnN1YnNjcmliZSk7XG4gICAgfTtcbiAgICBVdGlscy5pc1N5bWJvbCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzeW1ib2wnO1xuICAgIH07XG4gICAgVXRpbHMuaXNOYW1lZEZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gKHZhbCAmJlxuICAgICAgICAgICAgISF2YWwubmFtZSAmJlxuICAgICAgICAgICAgKHRoaXMuaXNGdW5jdGlvbih2YWwpIHx8IHRoaXMuaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IpKSk7XG4gICAgfTtcbiAgICBVdGlscy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICAgIFV0aWxzLmlzTnVtYmVyID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG4gICAgfTtcbiAgICBVdGlscy5pc0Jvb2xlYW4gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnYm9vbGVhbic7XG4gICAgfTtcbiAgICBVdGlscy5pc1N0cmluZyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xuICAgIH07XG4gICAgVXRpbHMuaXNOaWwgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVW5kZWZpbmVkKHZhbCkgfHwgdmFsID09PSBudWxsO1xuICAgIH07XG4gICAgVXRpbHMuaXNPYmplY3QgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcbiAgICB9O1xuICAgIFV0aWxzLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfTtcbiAgICBVdGlscy5wcm9taXNpZnkgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNGdW5jdGlvbihmbikpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgcHJvbWlzaWZ5IGEgbm9uIGZ1bmN0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGZuKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KHZvaWQgMCwgX19zcHJlYWQoYXJncywgW2Z1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN0ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUuYXBwbHkodm9pZCAwLCBfX3NwcmVhZChyZXN0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1dKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFV0aWxzLmdldFZhbHVlcyA9IGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZChlbnRyaWVzKS5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgX2IgPSBfX3JlYWQoX2EsIDIpLCBfID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVXRpbHMuY29uY2F0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJvcHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHByb3BzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgX19zcHJlYWQocHJvcHMpKTtcbiAgICB9O1xuICAgIFV0aWxzLmZsYXR0ZW4gPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCkgeyByZXR1cm4gX19zcHJlYWQocHJldmlvdXMsIGN1cnJlbnQpOyB9LCBbXSk7XG4gICAgfTtcbiAgICBVdGlscy5vbWl0ID0gZnVuY3Rpb24gKGZyb20pIHtcbiAgICAgICAgdmFyIGJ5ID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBieVtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZV8yLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGJ5XzEgPSBfX3ZhbHVlcyhieSksIGJ5XzFfMSA9IGJ5XzEubmV4dCgpOyAhYnlfMV8xLmRvbmU7IGJ5XzFfMSA9IGJ5XzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGJ5XzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICBkZWxldGUgZnJvbVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoYnlfMV8xICYmICFieV8xXzEuZG9uZSAmJiAoX2EgPSBieV8xLnJldHVybikpIF9hLmNhbGwoYnlfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyb207XG4gICAgfTtcbiAgICBVdGlscy5zZXJpZXMgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMywgX2EsIHByb21pc2VzXzEsIHByb21pc2VzXzFfMSwgcHJvbWlzZSwgZV8zXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzAsIDUsIDYsIDddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzXzEgPSBfX3ZhbHVlcyhwcm9taXNlcyksIHByb21pc2VzXzFfMSA9IHByb21pc2VzXzEubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFwcm9taXNlc18xXzEuZG9uZSkgcmV0dXJuIFszLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHByb21pc2VdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzXzFfMSA9IHByb21pc2VzXzEubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzMsIDddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzNfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMyA9IHsgZXJyb3I6IGVfM18xIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9taXNlc18xXzEgJiYgIXByb21pc2VzXzFfMS5kb25lICYmIChfYSA9IHByb21pc2VzXzEucmV0dXJuKSkgX2EuY2FsbChwcm9taXNlc18xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVdGlscy5maWx0ZXJXaGVuID0gZnVuY3Rpb24gKGFyciwgc3RhdGVtZW50LCBmaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuICEhc3RhdGVtZW50ID8gYXJyLmZpbHRlcihmaWx0ZXIpIDogYXJyO1xuICAgIH07XG4gICAgVXRpbHMucGljayA9IGZ1bmN0aW9uIChmcm9tLCBieSkge1xuICAgICAgICByZXR1cm4gZnJvbS5maWx0ZXIoZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGJ5LmluY2x1ZGVzKGYpOyB9KTtcbiAgICB9O1xuICAgIFV0aWxzLmNyZWF0ZURlZmVycmVkUHJvbWlzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc29sdmU7XG4gICAgICAgIHZhciByZWplY3Q7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChfcmVzb2x2ZSwgX3JlamVjdCkge1xuICAgICAgICAgICAgcmVzb2x2ZSA9IF9yZXNvbHZlO1xuICAgICAgICAgICAgcmVqZWN0ID0gX3JlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZDtcbiAgICB9O1xuICAgIFV0aWxzLnRyYW5zZm9ybVJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHRPckRlZmVycmVkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc09ic2VydmFibGUocmVzdWx0T3JEZWZlcnJlZCkpIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHJlc3VsdE9yRGVmZXJyZWQudG9Qcm9taXNlKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiwgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzQsIHJlc3VsdE9yRGVmZXJyZWRdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiwgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gVXRpbHM7XG59KCkpO1xuZXhwb3J0cy5VdGlscyA9IFV0aWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBJTkpFQ1RJT04gPSBTeW1ib2wuZm9yKFwiSU5KRUNUSU9OXCIpO1xuZnVuY3Rpb24gX3Byb3h5R2V0dGVyKHByb3RvLCBrZXksIHJlc29sdmUsIGRvQ2FjaGUpIHtcbiAgICBmdW5jdGlvbiBnZXR0ZXIoKSB7XG4gICAgICAgIGlmIChkb0NhY2hlICYmICFSZWZsZWN0Lmhhc01ldGFkYXRhKElOSkVDVElPTiwgdGhpcywga2V5KSkge1xuICAgICAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShJTkpFQ1RJT04sIHJlc29sdmUoKSwgdGhpcywga2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVmbGVjdC5oYXNNZXRhZGF0YShJTkpFQ1RJT04sIHRoaXMsIGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldE1ldGFkYXRhKElOSkVDVElPTiwgdGhpcywga2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKElOSkVDVElPTiwgbmV3VmFsLCB0aGlzLCBrZXkpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIGtleSwge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICBzZXQ6IHNldHRlclxuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFrZVByb3BlcnR5SW5qZWN0RGVjb3JhdG9yKGNvbnRhaW5lciwgZG9DYWNoZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwcm90bywga2V5KSB7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyLmdldChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3Byb3h5R2V0dGVyKHByb3RvLCBrZXksIHJlc29sdmUsIGRvQ2FjaGUpO1xuICAgICAgICB9O1xuICAgIH07XG59XG5leHBvcnRzLm1ha2VQcm9wZXJ0eUluamVjdERlY29yYXRvciA9IG1ha2VQcm9wZXJ0eUluamVjdERlY29yYXRvcjtcbmZ1bmN0aW9uIG1ha2VQcm9wZXJ0eUluamVjdE5hbWVkRGVjb3JhdG9yKGNvbnRhaW5lciwgZG9DYWNoZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvdG8sIGtleSkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5nZXROYW1lZChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF9wcm94eUdldHRlcihwcm90bywga2V5LCByZXNvbHZlLCBkb0NhY2hlKTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuZXhwb3J0cy5tYWtlUHJvcGVydHlJbmplY3ROYW1lZERlY29yYXRvciA9IG1ha2VQcm9wZXJ0eUluamVjdE5hbWVkRGVjb3JhdG9yO1xuZnVuY3Rpb24gbWFrZVByb3BlcnR5SW5qZWN0VGFnZ2VkRGVjb3JhdG9yKGNvbnRhaW5lciwgZG9DYWNoZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwcm90bywgcHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyLmdldFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3Byb3h5R2V0dGVyKHByb3RvLCBwcm9wZXJ0eU5hbWUsIHJlc29sdmUsIGRvQ2FjaGUpO1xuICAgICAgICB9O1xuICAgIH07XG59XG5leHBvcnRzLm1ha2VQcm9wZXJ0eUluamVjdFRhZ2dlZERlY29yYXRvciA9IG1ha2VQcm9wZXJ0eUluamVjdFRhZ2dlZERlY29yYXRvcjtcbmZ1bmN0aW9uIG1ha2VQcm9wZXJ0eU11bHRpSW5qZWN0RGVjb3JhdG9yKGNvbnRhaW5lciwgZG9DYWNoZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwcm90bywga2V5KSB7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyLmdldEFsbChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3Byb3h5R2V0dGVyKHByb3RvLCBrZXksIHJlc29sdmUsIGRvQ2FjaGUpO1xuICAgICAgICB9O1xuICAgIH07XG59XG5leHBvcnRzLm1ha2VQcm9wZXJ0eU11bHRpSW5qZWN0RGVjb3JhdG9yID0gbWFrZVByb3BlcnR5TXVsdGlJbmplY3REZWNvcmF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBkZWNvcmF0b3JzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JzXCIpO1xuZnVuY3Rpb24gZ2V0RGVjb3JhdG9ycyhjb250YWluZXIsIGRvQ2FjaGUpIHtcbiAgICBpZiAoZG9DYWNoZSA9PT0gdm9pZCAwKSB7IGRvQ2FjaGUgPSB0cnVlOyB9XG4gICAgdmFyIGxhenlJbmplY3QgPSBkZWNvcmF0b3JzXzEubWFrZVByb3BlcnR5SW5qZWN0RGVjb3JhdG9yKGNvbnRhaW5lciwgZG9DYWNoZSk7XG4gICAgdmFyIGxhenlJbmplY3ROYW1lZCA9IGRlY29yYXRvcnNfMS5tYWtlUHJvcGVydHlJbmplY3ROYW1lZERlY29yYXRvcihjb250YWluZXIsIGRvQ2FjaGUpO1xuICAgIHZhciBsYXp5SW5qZWN0VGFnZ2VkID0gZGVjb3JhdG9yc18xLm1ha2VQcm9wZXJ0eUluamVjdFRhZ2dlZERlY29yYXRvcihjb250YWluZXIsIGRvQ2FjaGUpO1xuICAgIHZhciBsYXp5TXVsdGlJbmplY3QgPSBkZWNvcmF0b3JzXzEubWFrZVByb3BlcnR5TXVsdGlJbmplY3REZWNvcmF0b3IoY29udGFpbmVyLCBkb0NhY2hlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBsYXp5SW5qZWN0OiBsYXp5SW5qZWN0LFxuICAgICAgICBsYXp5SW5qZWN0TmFtZWQ6IGxhenlJbmplY3ROYW1lZCxcbiAgICAgICAgbGF6eUluamVjdFRhZ2dlZDogbGF6eUluamVjdFRhZ2dlZCxcbiAgICAgICAgbGF6eU11bHRpSW5qZWN0OiBsYXp5TXVsdGlJbmplY3RcbiAgICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0RGVjb3JhdG9ycztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xuZnVuY3Rpb24gdGFnUGFyYW1ldGVyKGFubm90YXRpb25UYXJnZXQsIHByb3BlcnR5TmFtZSwgcGFyYW1ldGVySW5kZXgsIG1ldGFkYXRhKSB7XG4gICAgdmFyIG1ldGFkYXRhS2V5ID0gTUVUQURBVEFfS0VZLlRBR0dFRDtcbiAgICBfdGFnUGFyYW1ldGVyT3JQcm9wZXJ0eShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCwgcHJvcGVydHlOYW1lLCBtZXRhZGF0YSwgcGFyYW1ldGVySW5kZXgpO1xufVxuZXhwb3J0cy50YWdQYXJhbWV0ZXIgPSB0YWdQYXJhbWV0ZXI7XG5mdW5jdGlvbiB0YWdQcm9wZXJ0eShhbm5vdGF0aW9uVGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIG1ldGFkYXRhKSB7XG4gICAgdmFyIG1ldGFkYXRhS2V5ID0gTUVUQURBVEFfS0VZLlRBR0dFRF9QUk9QO1xuICAgIF90YWdQYXJhbWV0ZXJPclByb3BlcnR5KG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0LmNvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWUsIG1ldGFkYXRhKTtcbn1cbmV4cG9ydHMudGFnUHJvcGVydHkgPSB0YWdQcm9wZXJ0eTtcbmZ1bmN0aW9uIF90YWdQYXJhbWV0ZXJPclByb3BlcnR5KG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIG1ldGFkYXRhLCBwYXJhbWV0ZXJJbmRleCkge1xuICAgIHZhciBwYXJhbXNPclByb3BlcnRpZXNNZXRhZGF0YSA9IHt9O1xuICAgIHZhciBpc1BhcmFtZXRlckRlY29yYXRvciA9ICh0eXBlb2YgcGFyYW1ldGVySW5kZXggPT09IFwibnVtYmVyXCIpO1xuICAgIHZhciBrZXkgPSAocGFyYW1ldGVySW5kZXggIT09IHVuZGVmaW5lZCAmJiBpc1BhcmFtZXRlckRlY29yYXRvcikgPyBwYXJhbWV0ZXJJbmRleC50b1N0cmluZygpIDogcHJvcGVydHlOYW1lO1xuICAgIGlmIChpc1BhcmFtZXRlckRlY29yYXRvciAmJiBwcm9wZXJ0eU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX0RFQ09SQVRPUl9PUEVSQVRJT04pO1xuICAgIH1cbiAgICBpZiAoUmVmbGVjdC5oYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgYW5ub3RhdGlvblRhcmdldCkpIHtcbiAgICAgICAgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhID0gcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGFba2V5XTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFyYW1PclByb3BlcnR5TWV0YWRhdGEpKSB7XG4gICAgICAgIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhID0gW107XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhXzEgPSBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YTsgX2kgPCBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIG0gPSBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YV8xW19pXTtcbiAgICAgICAgICAgIGlmIChtLmtleSA9PT0gbWV0YWRhdGEua2V5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuRFVQTElDQVRFRF9NRVRBREFUQSArIFwiIFwiICsgbS5rZXkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFyYW1PclByb3BlcnR5TWV0YWRhdGEucHVzaChtZXRhZGF0YSk7XG4gICAgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGFba2V5XSA9IHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhO1xuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhLCBhbm5vdGF0aW9uVGFyZ2V0KTtcbn1cbmZ1bmN0aW9uIF9kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQpIHtcbiAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCk7XG59XG5mdW5jdGlvbiBfcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9O1xufVxuZnVuY3Rpb24gZGVjb3JhdGUoZGVjb3JhdG9yLCB0YXJnZXQsIHBhcmFtZXRlckluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbWV0ZXJJbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBfZGVjb3JhdGUoW19wYXJhbShwYXJhbWV0ZXJJbmRleCwgZGVjb3JhdG9yKV0sIHRhcmdldCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBwYXJhbWV0ZXJJbmRleCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBSZWZsZWN0LmRlY29yYXRlKFtkZWNvcmF0b3JdLCB0YXJnZXQsIHBhcmFtZXRlckluZGV4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9kZWNvcmF0ZShbZGVjb3JhdG9yXSwgdGFyZ2V0KTtcbiAgICB9XG59XG5leHBvcnRzLmRlY29yYXRlID0gZGVjb3JhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlcnJvcl9tc2dzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG52YXIgTGF6eVNlcnZpY2VJZGVudGlmZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExhenlTZXJ2aWNlSWRlbnRpZmVyKGNiKSB7XG4gICAgICAgIHRoaXMuX2NiID0gY2I7XG4gICAgfVxuICAgIExhenlTZXJ2aWNlSWRlbnRpZmVyLnByb3RvdHlwZS51bndyYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYigpO1xuICAgIH07XG4gICAgcmV0dXJuIExhenlTZXJ2aWNlSWRlbnRpZmVyO1xufSgpKTtcbmV4cG9ydHMuTGF6eVNlcnZpY2VJZGVudGlmZXIgPSBMYXp5U2VydmljZUlkZW50aWZlcjtcbmZ1bmN0aW9uIGluamVjdChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfbXNnc18xLlVOREVGSU5FRF9JTkpFQ1RfQU5OT1RBVElPTih0YXJnZXQubmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5pbmplY3QgPSBpbmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUlNfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG5mdW5jdGlvbiBpbmplY3RhYmxlKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChSZWZsZWN0Lmhhc093bk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QQVJBTV9UWVBFUywgdGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SU19NU0dTLkRVUExJQ0FURURfSU5KRUNUQUJMRV9ERUNPUkFUT1IpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0eXBlcyA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLkRFU0lHTl9QQVJBTV9UWVBFUywgdGFyZ2V0KSB8fCBbXTtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShNRVRBREFUQV9LRVkuUEFSQU1fVFlQRVMsIHR5cGVzLCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG59XG5leHBvcnRzLmluamVjdGFibGUgPSBpbmplY3RhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiBtdWx0aUluamVjdChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5tdWx0aUluamVjdCA9IG11bHRpSW5qZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiBuYW1lZChuYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZSk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5uYW1lZCA9IG5hbWVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiBvcHRpb25hbCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuT1BUSU9OQUxfVEFHLCB0cnVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUHJvcGVydHkodGFyZ2V0LCB0YXJnZXRLZXksIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLm9wdGlvbmFsID0gb3B0aW9uYWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUlNfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbmZ1bmN0aW9uIHBvc3RDb25zdHJ1Y3QoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgcHJvcGVydHlLZXkpO1xuICAgICAgICBpZiAoUmVmbGVjdC5oYXNPd25NZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIHRhcmdldC5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUlNfTVNHUy5NVUxUSVBMRV9QT1NUX0NPTlNUUlVDVF9NRVRIT0RTKTtcbiAgICAgICAgfVxuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgbWV0YWRhdGEsIHRhcmdldC5jb25zdHJ1Y3Rvcik7XG4gICAgfTtcbn1cbmV4cG9ydHMucG9zdENvbnN0cnVjdCA9IHBvc3RDb25zdHJ1Y3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gdGFnZ2VkKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMudGFnZ2VkID0gdGFnZ2VkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiB0YXJnZXROYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuTkFNRV9UQUcsIG5hbWUpO1xuICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgfTtcbn1cbmV4cG9ydHMudGFyZ2V0TmFtZSA9IHRhcmdldE5hbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIHVubWFuYWdlZCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBRywgdHJ1ZSk7XG4gICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICB9O1xufVxuZXhwb3J0cy51bm1hbmFnZWQgPSB1bm1hbmFnZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBCaW5kaW5nID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nKHNlcnZpY2VJZGVudGlmaWVyLCBzY29wZSkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5JbnZhbGlkO1xuICAgICAgICB0aGlzLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgICAgICAgdGhpcy5pbXBsZW1lbnRhdGlvblR5cGUgPSBudWxsO1xuICAgICAgICB0aGlzLmNhY2hlID0gbnVsbDtcbiAgICAgICAgdGhpcy5mYWN0b3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMub25BY3RpdmF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5keW5hbWljVmFsdWUgPSBudWxsO1xuICAgIH1cbiAgICBCaW5kaW5nLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsb25lID0gbmV3IEJpbmRpbmcodGhpcy5zZXJ2aWNlSWRlbnRpZmllciwgdGhpcy5zY29wZSk7XG4gICAgICAgIGNsb25lLmFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICBjbG9uZS5pbXBsZW1lbnRhdGlvblR5cGUgPSB0aGlzLmltcGxlbWVudGF0aW9uVHlwZTtcbiAgICAgICAgY2xvbmUuZHluYW1pY1ZhbHVlID0gdGhpcy5keW5hbWljVmFsdWU7XG4gICAgICAgIGNsb25lLnNjb3BlID0gdGhpcy5zY29wZTtcbiAgICAgICAgY2xvbmUudHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgY2xvbmUuZmFjdG9yeSA9IHRoaXMuZmFjdG9yeTtcbiAgICAgICAgY2xvbmUucHJvdmlkZXIgPSB0aGlzLnByb3ZpZGVyO1xuICAgICAgICBjbG9uZS5jb25zdHJhaW50ID0gdGhpcy5jb25zdHJhaW50O1xuICAgICAgICBjbG9uZS5vbkFjdGl2YXRpb24gPSB0aGlzLm9uQWN0aXZhdGlvbjtcbiAgICAgICAgY2xvbmUuY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZztcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmcgPSBCaW5kaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQmluZGluZ0NvdW50ID0ge1xuICAgIE11bHRpcGxlQmluZGluZ3NBdmFpbGFibGU6IDIsXG4gICAgTm9CaW5kaW5nc0F2YWlsYWJsZTogMCxcbiAgICBPbmx5T25lQmluZGluZ0F2YWlsYWJsZTogMVxufTtcbmV4cG9ydHMuQmluZGluZ0NvdW50ID0gQmluZGluZ0NvdW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRVUExJQ0FURURfSU5KRUNUQUJMRV9ERUNPUkFUT1IgPSBcIkNhbm5vdCBhcHBseSBAaW5qZWN0YWJsZSBkZWNvcmF0b3IgbXVsdGlwbGUgdGltZXMuXCI7XG5leHBvcnRzLkRVUExJQ0FURURfTUVUQURBVEEgPSBcIk1ldGFkYXRhIGtleSB3YXMgdXNlZCBtb3JlIHRoYW4gb25jZSBpbiBhIHBhcmFtZXRlcjpcIjtcbmV4cG9ydHMuTlVMTF9BUkdVTUVOVCA9IFwiTlVMTCBhcmd1bWVudFwiO1xuZXhwb3J0cy5LRVlfTk9UX0ZPVU5EID0gXCJLZXkgTm90IEZvdW5kXCI7XG5leHBvcnRzLkFNQklHVU9VU19NQVRDSCA9IFwiQW1iaWd1b3VzIG1hdGNoIGZvdW5kIGZvciBzZXJ2aWNlSWRlbnRpZmllcjpcIjtcbmV4cG9ydHMuQ0FOTk9UX1VOQklORCA9IFwiQ291bGQgbm90IHVuYmluZCBzZXJ2aWNlSWRlbnRpZmllcjpcIjtcbmV4cG9ydHMuTk9UX1JFR0lTVEVSRUQgPSBcIk5vIG1hdGNoaW5nIGJpbmRpbmdzIGZvdW5kIGZvciBzZXJ2aWNlSWRlbnRpZmllcjpcIjtcbmV4cG9ydHMuTUlTU0lOR19JTkpFQ1RBQkxFX0FOTk9UQVRJT04gPSBcIk1pc3NpbmcgcmVxdWlyZWQgQGluamVjdGFibGUgYW5ub3RhdGlvbiBpbjpcIjtcbmV4cG9ydHMuTUlTU0lOR19JTkpFQ1RfQU5OT1RBVElPTiA9IFwiTWlzc2luZyByZXF1aXJlZCBAaW5qZWN0IG9yIEBtdWx0aUluamVjdCBhbm5vdGF0aW9uIGluOlwiO1xuZXhwb3J0cy5VTkRFRklORURfSU5KRUNUX0FOTk9UQVRJT04gPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBcIkBpbmplY3QgY2FsbGVkIHdpdGggdW5kZWZpbmVkIHRoaXMgY291bGQgbWVhbiB0aGF0IHRoZSBjbGFzcyBcIiArIG5hbWUgKyBcIiBoYXMgXCIgK1xuICAgICAgICBcImEgY2lyY3VsYXIgZGVwZW5kZW5jeSBwcm9ibGVtLiBZb3UgY2FuIHVzZSBhIExhenlTZXJ2aWNlSWRlbnRpZmVyIHRvICBcIiArXG4gICAgICAgIFwib3ZlcmNvbWUgdGhpcyBsaW1pdGF0aW9uLlwiO1xufTtcbmV4cG9ydHMuQ0lSQ1VMQVJfREVQRU5ERU5DWSA9IFwiQ2lyY3VsYXIgZGVwZW5kZW5jeSBmb3VuZDpcIjtcbmV4cG9ydHMuTk9UX0lNUExFTUVOVEVEID0gXCJTb3JyeSwgdGhpcyBmZWF0dXJlIGlzIG5vdCBmdWxseSBpbXBsZW1lbnRlZCB5ZXQuXCI7XG5leHBvcnRzLklOVkFMSURfQklORElOR19UWVBFID0gXCJJbnZhbGlkIGJpbmRpbmcgdHlwZTpcIjtcbmV4cG9ydHMuTk9fTU9SRV9TTkFQU0hPVFNfQVZBSUxBQkxFID0gXCJObyBzbmFwc2hvdCBhdmFpbGFibGUgdG8gcmVzdG9yZS5cIjtcbmV4cG9ydHMuSU5WQUxJRF9NSURETEVXQVJFX1JFVFVSTiA9IFwiSW52YWxpZCByZXR1cm4gdHlwZSBpbiBtaWRkbGV3YXJlLiBNaWRkbGV3YXJlIG11c3QgcmV0dXJuIVwiO1xuZXhwb3J0cy5JTlZBTElEX0ZVTkNUSU9OX0JJTkRJTkcgPSBcIlZhbHVlIHByb3ZpZGVkIHRvIGZ1bmN0aW9uIGJpbmRpbmcgbXVzdCBiZSBhIGZ1bmN0aW9uIVwiO1xuZXhwb3J0cy5JTlZBTElEX1RPX1NFTEZfVkFMVUUgPSBcIlRoZSB0b1NlbGYgZnVuY3Rpb24gY2FuIG9ubHkgYmUgYXBwbGllZCB3aGVuIGEgY29uc3RydWN0b3IgaXMgXCIgK1xuICAgIFwidXNlZCBhcyBzZXJ2aWNlIGlkZW50aWZpZXJcIjtcbmV4cG9ydHMuSU5WQUxJRF9ERUNPUkFUT1JfT1BFUkFUSU9OID0gXCJUaGUgQGluamVjdCBAbXVsdGlJbmplY3QgQHRhZ2dlZCBhbmQgQG5hbWVkIGRlY29yYXRvcnMgXCIgK1xuICAgIFwibXVzdCBiZSBhcHBsaWVkIHRvIHRoZSBwYXJhbWV0ZXJzIG9mIGEgY2xhc3MgY29uc3RydWN0b3Igb3IgYSBjbGFzcyBwcm9wZXJ0eS5cIjtcbmV4cG9ydHMuQVJHVU1FTlRTX0xFTkdUSF9NSVNNQVRDSCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFsdWVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBcIlRoZSBudW1iZXIgb2YgY29uc3RydWN0b3IgYXJndW1lbnRzIGluIHRoZSBkZXJpdmVkIGNsYXNzIFwiICtcbiAgICAgICAgKHZhbHVlc1swXSArIFwiIG11c3QgYmUgPj0gdGhhbiB0aGUgbnVtYmVyIG9mIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBvZiBpdHMgYmFzZSBjbGFzcy5cIik7XG59O1xuZXhwb3J0cy5DT05UQUlORVJfT1BUSU9OU19NVVNUX0JFX0FOX09CSkVDVCA9IFwiSW52YWxpZCBDb250YWluZXIgY29uc3RydWN0b3IgYXJndW1lbnQuIENvbnRhaW5lciBvcHRpb25zIFwiICtcbiAgICBcIm11c3QgYmUgYW4gb2JqZWN0LlwiO1xuZXhwb3J0cy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0RFRkFVTFRfU0NPUEUgPSBcIkludmFsaWQgQ29udGFpbmVyIG9wdGlvbi4gRGVmYXVsdCBzY29wZSBtdXN0IFwiICtcbiAgICBcImJlIGEgc3RyaW5nICgnc2luZ2xldG9uJyBvciAndHJhbnNpZW50JykuXCI7XG5leHBvcnRzLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfQVVUT19CSU5EX0lOSkVDVEFCTEUgPSBcIkludmFsaWQgQ29udGFpbmVyIG9wdGlvbi4gQXV0byBiaW5kIGluamVjdGFibGUgbXVzdCBcIiArXG4gICAgXCJiZSBhIGJvb2xlYW5cIjtcbmV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9TS0lQX0JBU0VfQ0hFQ0sgPSBcIkludmFsaWQgQ29udGFpbmVyIG9wdGlvbi4gU2tpcCBiYXNlIGNoZWNrIG11c3QgXCIgK1xuICAgIFwiYmUgYSBib29sZWFuXCI7XG5leHBvcnRzLk1VTFRJUExFX1BPU1RfQ09OU1RSVUNUX01FVEhPRFMgPSBcIkNhbm5vdCBhcHBseSBAcG9zdENvbnN0cnVjdCBkZWNvcmF0b3IgbXVsdGlwbGUgdGltZXMgaW4gdGhlIHNhbWUgY2xhc3NcIjtcbmV4cG9ydHMuUE9TVF9DT05TVFJVQ1RfRVJST1IgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gXCJAcG9zdENvbnN0cnVjdCBlcnJvciBpbiBjbGFzcyBcIiArIHZhbHVlc1swXSArIFwiOiBcIiArIHZhbHVlc1sxXTtcbn07XG5leHBvcnRzLkNJUkNVTEFSX0RFUEVOREVOQ1lfSU5fRkFDVE9SWSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFsdWVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBcIkl0IGxvb2tzIGxpa2UgdGhlcmUgaXMgYSBjaXJjdWxhciBkZXBlbmRlbmN5IFwiICtcbiAgICAgICAgKFwiaW4gb25lIG9mIHRoZSAnXCIgKyB2YWx1ZXNbMF0gKyBcIicgYmluZGluZ3MuIFBsZWFzZSBpbnZlc3RpZ2F0ZSBiaW5kaW5ncyB3aXRoXCIpICtcbiAgICAgICAgKFwic2VydmljZSBpZGVudGlmaWVyICdcIiArIHZhbHVlc1sxXSArIFwiJy5cIik7XG59O1xuZXhwb3J0cy5TVEFDS19PVkVSRkxPVyA9IFwiTWF4aW11bSBjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJpbmRpbmdTY29wZUVudW0gPSB7XG4gICAgUmVxdWVzdDogXCJSZXF1ZXN0XCIsXG4gICAgU2luZ2xldG9uOiBcIlNpbmdsZXRvblwiLFxuICAgIFRyYW5zaWVudDogXCJUcmFuc2llbnRcIlxufTtcbmV4cG9ydHMuQmluZGluZ1Njb3BlRW51bSA9IEJpbmRpbmdTY29wZUVudW07XG52YXIgQmluZGluZ1R5cGVFbnVtID0ge1xuICAgIENvbnN0YW50VmFsdWU6IFwiQ29uc3RhbnRWYWx1ZVwiLFxuICAgIENvbnN0cnVjdG9yOiBcIkNvbnN0cnVjdG9yXCIsXG4gICAgRHluYW1pY1ZhbHVlOiBcIkR5bmFtaWNWYWx1ZVwiLFxuICAgIEZhY3Rvcnk6IFwiRmFjdG9yeVwiLFxuICAgIEZ1bmN0aW9uOiBcIkZ1bmN0aW9uXCIsXG4gICAgSW5zdGFuY2U6IFwiSW5zdGFuY2VcIixcbiAgICBJbnZhbGlkOiBcIkludmFsaWRcIixcbiAgICBQcm92aWRlcjogXCJQcm92aWRlclwiXG59O1xuZXhwb3J0cy5CaW5kaW5nVHlwZUVudW0gPSBCaW5kaW5nVHlwZUVudW07XG52YXIgVGFyZ2V0VHlwZUVudW0gPSB7XG4gICAgQ2xhc3NQcm9wZXJ0eTogXCJDbGFzc1Byb3BlcnR5XCIsXG4gICAgQ29uc3RydWN0b3JBcmd1bWVudDogXCJDb25zdHJ1Y3RvckFyZ3VtZW50XCIsXG4gICAgVmFyaWFibGU6IFwiVmFyaWFibGVcIlxufTtcbmV4cG9ydHMuVGFyZ2V0VHlwZUVudW0gPSBUYXJnZXRUeXBlRW51bTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5OQU1FRF9UQUcgPSBcIm5hbWVkXCI7XG5leHBvcnRzLk5BTUVfVEFHID0gXCJuYW1lXCI7XG5leHBvcnRzLlVOTUFOQUdFRF9UQUcgPSBcInVubWFuYWdlZFwiO1xuZXhwb3J0cy5PUFRJT05BTF9UQUcgPSBcIm9wdGlvbmFsXCI7XG5leHBvcnRzLklOSkVDVF9UQUcgPSBcImluamVjdFwiO1xuZXhwb3J0cy5NVUxUSV9JTkpFQ1RfVEFHID0gXCJtdWx0aV9pbmplY3RcIjtcbmV4cG9ydHMuVEFHR0VEID0gXCJpbnZlcnNpZnk6dGFnZ2VkXCI7XG5leHBvcnRzLlRBR0dFRF9QUk9QID0gXCJpbnZlcnNpZnk6dGFnZ2VkX3Byb3BzXCI7XG5leHBvcnRzLlBBUkFNX1RZUEVTID0gXCJpbnZlcnNpZnk6cGFyYW10eXBlc1wiO1xuZXhwb3J0cy5ERVNJR05fUEFSQU1fVFlQRVMgPSBcImRlc2lnbjpwYXJhbXR5cGVzXCI7XG5leHBvcnRzLlBPU1RfQ09OU1RSVUNUID0gXCJwb3N0X2NvbnN0cnVjdFwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBiaW5kaW5nXzEgPSByZXF1aXJlKFwiLi4vYmluZGluZ3MvYmluZGluZ1wiKTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfcmVhZGVyXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFfcmVhZGVyXCIpO1xudmFyIHBsYW5uZXJfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9wbGFubmVyXCIpO1xudmFyIHJlc29sdmVyXzEgPSByZXF1aXJlKFwiLi4vcmVzb2x1dGlvbi9yZXNvbHZlclwiKTtcbnZhciBiaW5kaW5nX3RvX3N5bnRheF8xID0gcmVxdWlyZShcIi4uL3N5bnRheC9iaW5kaW5nX3RvX3N5bnRheFwiKTtcbnZhciBpZF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2lkXCIpO1xudmFyIHNlcmlhbGl6YXRpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xudmFyIGNvbnRhaW5lcl9zbmFwc2hvdF8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyX3NuYXBzaG90XCIpO1xudmFyIGxvb2t1cF8xID0gcmVxdWlyZShcIi4vbG9va3VwXCIpO1xudmFyIENvbnRhaW5lciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyKGNvbnRhaW5lck9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBjb250YWluZXJPcHRpb25zIHx8IHt9O1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5DT05UQUlORVJfT1BUSU9OU19NVVNUX0JFX0FOX09CSkVDVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdFNjb3BlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZGVmYXVsdFNjb3BlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZGVmYXVsdFNjb3BlICE9PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5TaW5nbGV0b24gJiZcbiAgICAgICAgICAgIG9wdGlvbnMuZGVmYXVsdFNjb3BlICE9PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5UcmFuc2llbnQgJiZcbiAgICAgICAgICAgIG9wdGlvbnMuZGVmYXVsdFNjb3BlICE9PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5SZXF1ZXN0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIiArIEVSUk9SX01TR1MuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9ERUZBVUxUX1NDT1BFKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5hdXRvQmluZEluamVjdGFibGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5hdXRvQmluZEluamVjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5hdXRvQmluZEluamVjdGFibGUgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIiArIEVSUk9SX01TR1MuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9BVVRPX0JJTkRfSU5KRUNUQUJMRSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfU0tJUF9CQVNFX0NIRUNLKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBhdXRvQmluZEluamVjdGFibGU6IG9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlLFxuICAgICAgICAgICAgZGVmYXVsdFNjb3BlOiBvcHRpb25zLmRlZmF1bHRTY29wZSxcbiAgICAgICAgICAgIHNraXBCYXNlQ2xhc3NDaGVja3M6IG9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeSA9IG5ldyBsb29rdXBfMS5Mb29rdXAoKTtcbiAgICAgICAgdGhpcy5fc25hcHNob3RzID0gW107XG4gICAgICAgIHRoaXMuX21pZGRsZXdhcmUgPSBudWxsO1xuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhUmVhZGVyID0gbmV3IG1ldGFkYXRhX3JlYWRlcl8xLk1ldGFkYXRhUmVhZGVyKCk7XG4gICAgfVxuICAgIENvbnRhaW5lci5tZXJnZSA9IGZ1bmN0aW9uIChjb250YWluZXIxLCBjb250YWluZXIyKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XG4gICAgICAgIHZhciBiaW5kaW5nRGljdGlvbmFyeSA9IHBsYW5uZXJfMS5nZXRCaW5kaW5nRGljdGlvbmFyeShjb250YWluZXIpO1xuICAgICAgICB2YXIgYmluZGluZ0RpY3Rpb25hcnkxID0gcGxhbm5lcl8xLmdldEJpbmRpbmdEaWN0aW9uYXJ5KGNvbnRhaW5lcjEpO1xuICAgICAgICB2YXIgYmluZGluZ0RpY3Rpb25hcnkyID0gcGxhbm5lcl8xLmdldEJpbmRpbmdEaWN0aW9uYXJ5KGNvbnRhaW5lcjIpO1xuICAgICAgICBmdW5jdGlvbiBjb3B5RGljdGlvbmFyeShvcmlnaW4sIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBvcmlnaW4udHJhdmVyc2UoZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChiaW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmFkZChiaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5nLmNsb25lKCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29weURpY3Rpb25hcnkoYmluZGluZ0RpY3Rpb25hcnkxLCBiaW5kaW5nRGljdGlvbmFyeSk7XG4gICAgICAgIGNvcHlEaWN0aW9uYXJ5KGJpbmRpbmdEaWN0aW9uYXJ5MiwgYmluZGluZ0RpY3Rpb25hcnkpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbW9kdWxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZXRIZWxwZXJzID0gdGhpcy5fZ2V0Q29udGFpbmVyTW9kdWxlSGVscGVyc0ZhY3RvcnkoKTtcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBtb2R1bGVzXzEgPSBtb2R1bGVzOyBfYSA8IG1vZHVsZXNfMS5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50TW9kdWxlID0gbW9kdWxlc18xW19hXTtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJNb2R1bGVIZWxwZXJzID0gZ2V0SGVscGVycyhjdXJyZW50TW9kdWxlLmlkKTtcbiAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUucmVnaXN0cnkoY29udGFpbmVyTW9kdWxlSGVscGVycy5iaW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMudW5iaW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMuaXNib3VuZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnJlYmluZEZ1bmN0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5sb2FkQXN5bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtb2R1bGVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBtb2R1bGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGdldEhlbHBlcnMsIF9hLCBtb2R1bGVzXzIsIGN1cnJlbnRNb2R1bGUsIGNvbnRhaW5lck1vZHVsZUhlbHBlcnM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRIZWxwZXJzID0gdGhpcy5fZ2V0Q29udGFpbmVyTW9kdWxlSGVscGVyc0ZhY3RvcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gMCwgbW9kdWxlc18yID0gbW9kdWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoX2EgPCBtb2R1bGVzXzIubGVuZ3RoKSkgcmV0dXJuIFszLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUgPSBtb2R1bGVzXzJbX2FdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyTW9kdWxlSGVscGVycyA9IGdldEhlbHBlcnMoY3VycmVudE1vZHVsZS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIGN1cnJlbnRNb2R1bGUucmVnaXN0cnkoY29udGFpbmVyTW9kdWxlSGVscGVycy5iaW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMudW5iaW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMuaXNib3VuZEZ1bmN0aW9uLCBjb250YWluZXJNb2R1bGVIZWxwZXJzLnJlYmluZEZ1bmN0aW9uKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2ErKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG1vZHVsZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG1vZHVsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29uZGl0aW9uRmFjdG9yeSA9IGZ1bmN0aW9uIChleHBlY3RlZCkgeyByZXR1cm4gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm1vZHVsZUlkID09PSBleHBlY3RlZDtcbiAgICAgICAgfTsgfTtcbiAgICAgICAgbW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgICAgIHZhciBjb25kaXRpb24gPSBjb25kaXRpb25GYWN0b3J5KG1vZHVsZS5pZCk7XG4gICAgICAgICAgICBfdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkucmVtb3ZlQnlDb25kaXRpb24oY29uZGl0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdmFyIHNjb3BlID0gdGhpcy5vcHRpb25zLmRlZmF1bHRTY29wZSB8fCBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5UcmFuc2llbnQ7XG4gICAgICAgIHZhciBiaW5kaW5nID0gbmV3IGJpbmRpbmdfMS5CaW5kaW5nKHNlcnZpY2VJZGVudGlmaWVyLCBzY29wZSk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LmFkZChzZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZyk7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ190b19zeW50YXhfMS5CaW5kaW5nVG9TeW50YXgoYmluZGluZyk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlYmluZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB0aGlzLnVuYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLmJpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LnJlbW92ZShzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLkNBTk5PVF9VTkJJTkQgKyBcIiBcIiArIHNlcmlhbGl6YXRpb25fMS5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUudW5iaW5kQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeSA9IG5ldyBsb29rdXBfMS5Mb29rdXAoKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuaXNCb3VuZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB2YXIgYm91bmQgPSB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5oYXNLZXkoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAoIWJvdW5kICYmIHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBib3VuZCA9IHRoaXMucGFyZW50LmlzQm91bmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib3VuZDtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuaXNCb3VuZE5hbWVkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0JvdW5kVGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lZCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmlzQm91bmRUYWdnZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGJvdW5kID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5oYXNLZXkoc2VydmljZUlkZW50aWZpZXIpKSB7XG4gICAgICAgICAgICB2YXIgYmluZGluZ3MgPSB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5nZXQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RfMSA9IHBsYW5uZXJfMS5jcmVhdGVNb2NrUmVxdWVzdCh0aGlzLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICBib3VuZCA9IGJpbmRpbmdzLnNvbWUoZnVuY3Rpb24gKGIpIHsgcmV0dXJuIGIuY29uc3RyYWludChyZXF1ZXN0XzEpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWJvdW5kICYmIHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBib3VuZCA9IHRoaXMucGFyZW50LmlzQm91bmRUYWdnZWQoc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib3VuZDtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuc25hcHNob3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3NuYXBzaG90cy5wdXNoKGNvbnRhaW5lcl9zbmFwc2hvdF8xLkNvbnRhaW5lclNuYXBzaG90Lm9mKHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LmNsb25lKCksIHRoaXMuX21pZGRsZXdhcmUpKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNuYXBzaG90ID0gdGhpcy5fc25hcHNob3RzLnBvcCgpO1xuICAgICAgICBpZiAoc25hcHNob3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTk9fTU9SRV9TTkFQU0hPVFNfQVZBSUxBQkxFKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeSA9IHNuYXBzaG90LmJpbmRpbmdzO1xuICAgICAgICB0aGlzLl9taWRkbGV3YXJlID0gc25hcHNob3QubWlkZGxld2FyZTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAoY29udGFpbmVyT3B0aW9ucykge1xuICAgICAgICB2YXIgY2hpbGQgPSBuZXcgQ29udGFpbmVyKGNvbnRhaW5lck9wdGlvbnMgfHwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hcHBseU1pZGRsZXdhcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtaWRkbGV3YXJlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbWlkZGxld2FyZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5pdGlhbCA9ICh0aGlzLl9taWRkbGV3YXJlKSA/IHRoaXMuX21pZGRsZXdhcmUgOiB0aGlzLl9wbGFuQW5kUmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLl9taWRkbGV3YXJlID0gbWlkZGxld2FyZXMucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBjdXJyKSB7IHJldHVybiBjdXJyKHByZXYpOyB9LCBpbml0aWFsKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuYXBwbHlDdXN0b21NZXRhZGF0YVJlYWRlciA9IGZ1bmN0aW9uIChtZXRhZGF0YVJlYWRlcikge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YVJlYWRlciA9IG1ldGFkYXRhUmVhZGVyO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldChmYWxzZSwgZmFsc2UsIGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5WYXJpYWJsZSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRUYWdnZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldChmYWxzZSwgZmFsc2UsIGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5WYXJpYWJsZSwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXROYW1lZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lZCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KHRydWUsIHRydWUsIGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5WYXJpYWJsZSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGxUYWdnZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldChmYWxzZSwgdHJ1ZSwgbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldEFsbE5hbWVkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxUYWdnZWQoc2VydmljZUlkZW50aWZpZXIsIE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIChjb25zdHJ1Y3RvckZ1bmN0aW9uKSB7XG4gICAgICAgIHZhciB0ZW1wQ29udGFpbmVyID0gdGhpcy5jcmVhdGVDaGlsZCgpO1xuICAgICAgICB0ZW1wQ29udGFpbmVyLmJpbmQoY29uc3RydWN0b3JGdW5jdGlvbikudG9TZWxmKCk7XG4gICAgICAgIHJldHVybiB0ZW1wQ29udGFpbmVyLmdldChjb25zdHJ1Y3RvckZ1bmN0aW9uKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2dldENvbnRhaW5lck1vZHVsZUhlbHBlcnNGYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc2V0TW9kdWxlSWQgPSBmdW5jdGlvbiAoYmluZGluZ1RvU3ludGF4LCBtb2R1bGVJZCkge1xuICAgICAgICAgICAgYmluZGluZ1RvU3ludGF4Ll9iaW5kaW5nLm1vZHVsZUlkID0gbW9kdWxlSWQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRCaW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAobW9kdWxlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2JpbmQgPSBfdGhpcy5iaW5kLmJpbmQoX3RoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBiaW5kaW5nVG9TeW50YXggPSBfYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgc2V0TW9kdWxlSWQoYmluZGluZ1RvU3ludGF4LCBtb2R1bGVJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdUb1N5bnRheDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRVbmJpbmRGdW5jdGlvbiA9IGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHZhciBfdW5iaW5kID0gX3RoaXMudW5iaW5kLmJpbmQoX3RoaXMpO1xuICAgICAgICAgICAgICAgIF91bmJpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldElzYm91bmRGdW5jdGlvbiA9IGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHZhciBfaXNCb3VuZCA9IF90aGlzLmlzQm91bmQuYmluZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9pc0JvdW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRSZWJpbmRGdW5jdGlvbiA9IGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHZhciBfcmViaW5kID0gX3RoaXMucmViaW5kLmJpbmQoX3RoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBiaW5kaW5nVG9TeW50YXggPSBfcmViaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICBzZXRNb2R1bGVJZChiaW5kaW5nVG9TeW50YXgsIG1vZHVsZUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ1RvU3ludGF4O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtSWQpIHsgcmV0dXJuICh7XG4gICAgICAgICAgICBiaW5kRnVuY3Rpb246IGdldEJpbmRGdW5jdGlvbihtSWQpLFxuICAgICAgICAgICAgaXNib3VuZEZ1bmN0aW9uOiBnZXRJc2JvdW5kRnVuY3Rpb24obUlkKSxcbiAgICAgICAgICAgIHJlYmluZEZ1bmN0aW9uOiBnZXRSZWJpbmRGdW5jdGlvbihtSWQpLFxuICAgICAgICAgICAgdW5iaW5kRnVuY3Rpb246IGdldFVuYmluZEZ1bmN0aW9uKG1JZClcbiAgICAgICAgfSk7IH07XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9nZXQgPSBmdW5jdGlvbiAoYXZvaWRDb25zdHJhaW50cywgaXNNdWx0aUluamVjdCwgdGFyZ2V0VHlwZSwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgICAgIHZhciBkZWZhdWx0QXJncyA9IHtcbiAgICAgICAgICAgIGF2b2lkQ29uc3RyYWludHM6IGF2b2lkQ29uc3RyYWludHMsXG4gICAgICAgICAgICBjb250ZXh0SW50ZXJjZXB0b3I6IGZ1bmN0aW9uIChjb250ZXh0KSB7IHJldHVybiBjb250ZXh0OyB9LFxuICAgICAgICAgICAgaXNNdWx0aUluamVjdDogaXNNdWx0aUluamVjdCxcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgc2VydmljZUlkZW50aWZpZXI6IHNlcnZpY2VJZGVudGlmaWVyLFxuICAgICAgICAgICAgdGFyZ2V0VHlwZTogdGFyZ2V0VHlwZSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fbWlkZGxld2FyZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fbWlkZGxld2FyZShkZWZhdWx0QXJncyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQgfHwgcmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuSU5WQUxJRF9NSURETEVXQVJFX1JFVFVSTik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9wbGFuQW5kUmVzb2x2ZSgpKGRlZmF1bHRBcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fcGxhbkFuZFJlc29sdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBwbGFubmVyXzEucGxhbihfdGhpcy5fbWV0YWRhdGFSZWFkZXIsIF90aGlzLCBhcmdzLmlzTXVsdGlJbmplY3QsIGFyZ3MudGFyZ2V0VHlwZSwgYXJncy5zZXJ2aWNlSWRlbnRpZmllciwgYXJncy5rZXksIGFyZ3MudmFsdWUsIGFyZ3MuYXZvaWRDb25zdHJhaW50cyk7XG4gICAgICAgICAgICBjb250ZXh0ID0gYXJncy5jb250ZXh0SW50ZXJjZXB0b3IoY29udGV4dCk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzb2x2ZXJfMS5yZXNvbHZlKGNvbnRleHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBDb250YWluZXI7XG59KCkpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpZF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2lkXCIpO1xudmFyIENvbnRhaW5lck1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyTW9kdWxlKHJlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMucmVnaXN0cnkgPSByZWdpc3RyeTtcbiAgICB9XG4gICAgcmV0dXJuIENvbnRhaW5lck1vZHVsZTtcbn0oKSk7XG5leHBvcnRzLkNvbnRhaW5lck1vZHVsZSA9IENvbnRhaW5lck1vZHVsZTtcbnZhciBBc3luY0NvbnRhaW5lck1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNDb250YWluZXJNb2R1bGUocmVnaXN0cnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNDb250YWluZXJNb2R1bGU7XG59KCkpO1xuZXhwb3J0cy5Bc3luY0NvbnRhaW5lck1vZHVsZSA9IEFzeW5jQ29udGFpbmVyTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQ29udGFpbmVyU25hcHNob3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lclNuYXBzaG90KCkge1xuICAgIH1cbiAgICBDb250YWluZXJTbmFwc2hvdC5vZiA9IGZ1bmN0aW9uIChiaW5kaW5ncywgbWlkZGxld2FyZSkge1xuICAgICAgICB2YXIgc25hcHNob3QgPSBuZXcgQ29udGFpbmVyU25hcHNob3QoKTtcbiAgICAgICAgc25hcHNob3QuYmluZGluZ3MgPSBiaW5kaW5ncztcbiAgICAgICAgc25hcHNob3QubWlkZGxld2FyZSA9IG1pZGRsZXdhcmU7XG4gICAgICAgIHJldHVybiBzbmFwc2hvdDtcbiAgICB9O1xuICAgIHJldHVybiBDb250YWluZXJTbmFwc2hvdDtcbn0oKSk7XG5leHBvcnRzLkNvbnRhaW5lclNuYXBzaG90ID0gQ29udGFpbmVyU25hcHNob3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIExvb2t1cCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG9va3VwKCkge1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIExvb2t1cC5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwO1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIHZhbHVlKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gbnVsbCB8fCBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fbWFwLmdldChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmIChlbnRyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlbnRyeS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX21hcC5zZXQoc2VydmljZUlkZW50aWZpZXIsIGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5zZXQoc2VydmljZUlkZW50aWZpZXIsIFt2YWx1ZV0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fbWFwLmdldChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmIChlbnRyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5LRVlfTk9UX0ZPVU5EKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSBudWxsIHx8IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fbWFwLmRlbGV0ZShzZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLktFWV9OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLnJlbW92ZUJ5Q29uZGl0aW9uID0gZnVuY3Rpb24gKGNvbmRpdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9tYXAuZm9yRWFjaChmdW5jdGlvbiAoZW50cmllcywga2V5KSB7XG4gICAgICAgICAgICB2YXIgdXBkYXRlZEVudHJpZXMgPSBlbnRyaWVzLmZpbHRlcihmdW5jdGlvbiAoZW50cnkpIHsgcmV0dXJuICFjb25kaXRpb24oZW50cnkpOyB9KTtcbiAgICAgICAgICAgIGlmICh1cGRhdGVkRW50cmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21hcC5zZXQoa2V5LCB1cGRhdGVkRW50cmllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuaGFzS2V5ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gbnVsbCB8fCBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmhhcyhzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29weSA9IG5ldyBMb29rdXAoKTtcbiAgICAgICAgdGhpcy5fbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGIpIHsgcmV0dXJuIGNvcHkuYWRkKGtleSwgYi5jbG9uZSgpKTsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUudHJhdmVyc2UgPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB0aGlzLl9tYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgZnVuYyhrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTG9va3VwO1xufSgpKTtcbmV4cG9ydHMuTG9va3VwID0gTG9va3VwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIga2V5cyA9IHJlcXVpcmUoXCIuL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xuZXhwb3J0cy5NRVRBREFUQV9LRVkgPSBrZXlzO1xudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyL2NvbnRhaW5lclwiKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gY29udGFpbmVyXzEuQ29udGFpbmVyO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xuZXhwb3J0cy5CaW5kaW5nU2NvcGVFbnVtID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW07XG5leHBvcnRzLkJpbmRpbmdUeXBlRW51bSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW07XG5leHBvcnRzLlRhcmdldFR5cGVFbnVtID0gbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtO1xudmFyIGNvbnRhaW5lcl9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lci9jb250YWluZXJfbW9kdWxlXCIpO1xuZXhwb3J0cy5Bc3luY0NvbnRhaW5lck1vZHVsZSA9IGNvbnRhaW5lcl9tb2R1bGVfMS5Bc3luY0NvbnRhaW5lck1vZHVsZTtcbmV4cG9ydHMuQ29udGFpbmVyTW9kdWxlID0gY29udGFpbmVyX21vZHVsZV8xLkNvbnRhaW5lck1vZHVsZTtcbnZhciBpbmplY3RhYmxlXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL2luamVjdGFibGVcIik7XG5leHBvcnRzLmluamVjdGFibGUgPSBpbmplY3RhYmxlXzEuaW5qZWN0YWJsZTtcbnZhciB0YWdnZWRfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vdGFnZ2VkXCIpO1xuZXhwb3J0cy50YWdnZWQgPSB0YWdnZWRfMS50YWdnZWQ7XG52YXIgbmFtZWRfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vbmFtZWRcIik7XG5leHBvcnRzLm5hbWVkID0gbmFtZWRfMS5uYW1lZDtcbnZhciBpbmplY3RfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vaW5qZWN0XCIpO1xuZXhwb3J0cy5pbmplY3QgPSBpbmplY3RfMS5pbmplY3Q7XG5leHBvcnRzLkxhenlTZXJ2aWNlSWRlbnRpZmVyID0gaW5qZWN0XzEuTGF6eVNlcnZpY2VJZGVudGlmZXI7XG52YXIgb3B0aW9uYWxfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vb3B0aW9uYWxcIik7XG5leHBvcnRzLm9wdGlvbmFsID0gb3B0aW9uYWxfMS5vcHRpb25hbDtcbnZhciB1bm1hbmFnZWRfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vdW5tYW5hZ2VkXCIpO1xuZXhwb3J0cy51bm1hbmFnZWQgPSB1bm1hbmFnZWRfMS51bm1hbmFnZWQ7XG52YXIgbXVsdGlfaW5qZWN0XzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL211bHRpX2luamVjdFwiKTtcbmV4cG9ydHMubXVsdGlJbmplY3QgPSBtdWx0aV9pbmplY3RfMS5tdWx0aUluamVjdDtcbnZhciB0YXJnZXRfbmFtZV8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi90YXJnZXRfbmFtZVwiKTtcbmV4cG9ydHMudGFyZ2V0TmFtZSA9IHRhcmdldF9uYW1lXzEudGFyZ2V0TmFtZTtcbnZhciBwb3N0X2NvbnN0cnVjdF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9wb3N0X2NvbnN0cnVjdFwiKTtcbmV4cG9ydHMucG9zdENvbnN0cnVjdCA9IHBvc3RfY29uc3RydWN0XzEucG9zdENvbnN0cnVjdDtcbnZhciBtZXRhZGF0YV9yZWFkZXJfMSA9IHJlcXVpcmUoXCIuL3BsYW5uaW5nL21ldGFkYXRhX3JlYWRlclwiKTtcbmV4cG9ydHMuTWV0YWRhdGFSZWFkZXIgPSBtZXRhZGF0YV9yZWFkZXJfMS5NZXRhZGF0YVJlYWRlcjtcbnZhciBpZF8xID0gcmVxdWlyZShcIi4vdXRpbHMvaWRcIik7XG5leHBvcnRzLmlkID0gaWRfMS5pZDtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZXhwb3J0cy5kZWNvcmF0ZSA9IGRlY29yYXRvcl91dGlsc18xLmRlY29yYXRlO1xudmFyIGNvbnN0cmFpbnRfaGVscGVyc18xID0gcmVxdWlyZShcIi4vc3ludGF4L2NvbnN0cmFpbnRfaGVscGVyc1wiKTtcbmV4cG9ydHMudHJhdmVyc2VBbmNlcnN0b3JzID0gY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzO1xuZXhwb3J0cy50YWdnZWRDb25zdHJhaW50ID0gY29uc3RyYWludF9oZWxwZXJzXzEudGFnZ2VkQ29uc3RyYWludDtcbmV4cG9ydHMubmFtZWRDb25zdHJhaW50ID0gY29uc3RyYWludF9oZWxwZXJzXzEubmFtZWRDb25zdHJhaW50O1xuZXhwb3J0cy50eXBlQ29uc3RyYWludCA9IGNvbnN0cmFpbnRfaGVscGVyc18xLnR5cGVDb25zdHJhaW50O1xudmFyIHNlcmlhbGl6YXRpb25fMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3NlcmlhbGl6YXRpb25cIik7XG5leHBvcnRzLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcgPSBzZXJpYWxpemF0aW9uXzEuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZztcbnZhciBiaW5kaW5nX3V0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlscy9iaW5kaW5nX3V0aWxzXCIpO1xuZXhwb3J0cy5tdWx0aUJpbmRUb1NlcnZpY2UgPSBiaW5kaW5nX3V0aWxzXzEubXVsdGlCaW5kVG9TZXJ2aWNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBDb250ZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0KGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9XG4gICAgQ29udGV4dC5wcm90b3R5cGUuYWRkUGxhbiA9IGZ1bmN0aW9uIChwbGFuKSB7XG4gICAgICAgIHRoaXMucGxhbiA9IHBsYW47XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zZXRDdXJyZW50UmVxdWVzdCA9IGZ1bmN0aW9uIChjdXJyZW50UmVxdWVzdCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRSZXF1ZXN0ID0gY3VycmVudFJlcXVlc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dDtcbn0oKSk7XG5leHBvcnRzLkNvbnRleHQgPSBDb250ZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIE1ldGFkYXRhID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXRhZGF0YShrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIE1ldGFkYXRhLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMua2V5ID09PSBNRVRBREFUQV9LRVkuTkFNRURfVEFHKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJuYW1lZDogXCIgKyB0aGlzLnZhbHVlLnRvU3RyaW5nKCkgKyBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcInRhZ2dlZDogeyBrZXk6XCIgKyB0aGlzLmtleS50b1N0cmluZygpICsgXCIsIHZhbHVlOiBcIiArIHRoaXMudmFsdWUgKyBcIiB9XCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBNZXRhZGF0YTtcbn0oKSk7XG5leHBvcnRzLk1ldGFkYXRhID0gTWV0YWRhdGE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgTWV0YWRhdGFSZWFkZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1ldGFkYXRhUmVhZGVyKCkge1xuICAgIH1cbiAgICBNZXRhZGF0YVJlYWRlci5wcm90b3R5cGUuZ2V0Q29uc3RydWN0b3JNZXRhZGF0YSA9IGZ1bmN0aW9uIChjb25zdHJ1Y3RvckZ1bmMpIHtcbiAgICAgICAgdmFyIGNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QQVJBTV9UWVBFUywgY29uc3RydWN0b3JGdW5jKTtcbiAgICAgICAgdmFyIHVzZXJHZW5lcmF0ZWRNZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLlRBR0dFRCwgY29uc3RydWN0b3JGdW5jKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGE6IGNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGEsXG4gICAgICAgICAgICB1c2VyR2VuZXJhdGVkTWV0YWRhdGE6IHVzZXJHZW5lcmF0ZWRNZXRhZGF0YSB8fCB7fVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTWV0YWRhdGFSZWFkZXIucHJvdG90eXBlLmdldFByb3BlcnRpZXNNZXRhZGF0YSA9IGZ1bmN0aW9uIChjb25zdHJ1Y3RvckZ1bmMpIHtcbiAgICAgICAgdmFyIHVzZXJHZW5lcmF0ZWRNZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLlRBR0dFRF9QUk9QLCBjb25zdHJ1Y3RvckZ1bmMpIHx8IFtdO1xuICAgICAgICByZXR1cm4gdXNlckdlbmVyYXRlZE1ldGFkYXRhO1xuICAgIH07XG4gICAgcmV0dXJuIE1ldGFkYXRhUmVhZGVyO1xufSgpKTtcbmV4cG9ydHMuTWV0YWRhdGFSZWFkZXIgPSBNZXRhZGF0YVJlYWRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBsYW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBsYW4ocGFyZW50Q29udGV4dCwgcm9vdFJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRDb250ZXh0ID0gcGFyZW50Q29udGV4dDtcbiAgICAgICAgdGhpcy5yb290UmVxdWVzdCA9IHJvb3RSZXF1ZXN0O1xuICAgIH1cbiAgICByZXR1cm4gUGxhbjtcbn0oKSk7XG5leHBvcnRzLlBsYW4gPSBQbGFuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYmluZGluZ19jb3VudF8xID0gcmVxdWlyZShcIi4uL2JpbmRpbmdzL2JpbmRpbmdfY291bnRcIik7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIGV4Y2VwdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9leGNlcHRpb25zXCIpO1xudmFyIHNlcmlhbGl6YXRpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xudmFyIGNvbnRleHRfMSA9IHJlcXVpcmUoXCIuL2NvbnRleHRcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuL21ldGFkYXRhXCIpO1xudmFyIHBsYW5fMSA9IHJlcXVpcmUoXCIuL3BsYW5cIik7XG52YXIgcmVmbGVjdGlvbl91dGlsc18xID0gcmVxdWlyZShcIi4vcmVmbGVjdGlvbl91dGlsc1wiKTtcbnZhciByZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi9yZXF1ZXN0XCIpO1xudmFyIHRhcmdldF8xID0gcmVxdWlyZShcIi4vdGFyZ2V0XCIpO1xuZnVuY3Rpb24gZ2V0QmluZGluZ0RpY3Rpb25hcnkoY250bnIpIHtcbiAgICByZXR1cm4gY250bnIuX2JpbmRpbmdEaWN0aW9uYXJ5O1xufVxuZXhwb3J0cy5nZXRCaW5kaW5nRGljdGlvbmFyeSA9IGdldEJpbmRpbmdEaWN0aW9uYXJ5O1xuZnVuY3Rpb24gX2NyZWF0ZVRhcmdldChpc011bHRpSW5qZWN0LCB0YXJnZXRUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwgbmFtZSwga2V5LCB2YWx1ZSkge1xuICAgIHZhciBtZXRhZGF0YUtleSA9IGlzTXVsdGlJbmplY3QgPyBNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRyA6IE1FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHO1xuICAgIHZhciBpbmplY3RNZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgdmFyIHRhcmdldCA9IG5ldyB0YXJnZXRfMS5UYXJnZXQodGFyZ2V0VHlwZSwgbmFtZSwgc2VydmljZUlkZW50aWZpZXIsIGluamVjdE1ldGFkYXRhKTtcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHRhZ01ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHRhcmdldC5tZXRhZGF0YS5wdXNoKHRhZ01ldGFkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIF9nZXRBY3RpdmVCaW5kaW5ncyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgY29udGV4dCwgcGFyZW50UmVxdWVzdCwgdGFyZ2V0KSB7XG4gICAgdmFyIGJpbmRpbmdzID0gZ2V0QmluZGluZ3MoY29udGV4dC5jb250YWluZXIsIHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgdmFyIGFjdGl2ZUJpbmRpbmdzID0gW107XG4gICAgaWYgKGJpbmRpbmdzLmxlbmd0aCA9PT0gYmluZGluZ19jb3VudF8xLkJpbmRpbmdDb3VudC5Ob0JpbmRpbmdzQXZhaWxhYmxlICYmXG4gICAgICAgIGNvbnRleHQuY29udGFpbmVyLm9wdGlvbnMuYXV0b0JpbmRJbmplY3RhYmxlICYmXG4gICAgICAgIHR5cGVvZiB0YXJnZXQuc2VydmljZUlkZW50aWZpZXIgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBtZXRhZGF0YVJlYWRlci5nZXRDb25zdHJ1Y3Rvck1ldGFkYXRhKHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcikuY29tcGlsZXJHZW5lcmF0ZWRNZXRhZGF0YSkge1xuICAgICAgICBjb250ZXh0LmNvbnRhaW5lci5iaW5kKHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcikudG9TZWxmKCk7XG4gICAgICAgIGJpbmRpbmdzID0gZ2V0QmluZGluZ3MoY29udGV4dC5jb250YWluZXIsIHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfVxuICAgIGlmICghYXZvaWRDb25zdHJhaW50cykge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IGJpbmRpbmdzLmZpbHRlcihmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgcmVxdWVzdF8xLlJlcXVlc3QoYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgcGFyZW50UmVxdWVzdCwgYmluZGluZywgdGFyZ2V0KTtcbiAgICAgICAgICAgIHJldHVybiBiaW5kaW5nLmNvbnN0cmFpbnQocmVxdWVzdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWN0aXZlQmluZGluZ3MgPSBiaW5kaW5ncztcbiAgICB9XG4gICAgX3ZhbGlkYXRlQWN0aXZlQmluZGluZ0NvdW50KHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllciwgYWN0aXZlQmluZGluZ3MsIHRhcmdldCwgY29udGV4dC5jb250YWluZXIpO1xuICAgIHJldHVybiBhY3RpdmVCaW5kaW5ncztcbn1cbmZ1bmN0aW9uIF92YWxpZGF0ZUFjdGl2ZUJpbmRpbmdDb3VudChzZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZ3MsIHRhcmdldCwgY29udGFpbmVyKSB7XG4gICAgc3dpdGNoIChiaW5kaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSBiaW5kaW5nX2NvdW50XzEuQmluZGluZ0NvdW50Lk5vQmluZGluZ3NBdmFpbGFibGU6XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmlzT3B0aW9uYWwoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllclN0cmluZyA9IHNlcmlhbGl6YXRpb25fMS5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5OT1RfUkVHSVNURVJFRDtcbiAgICAgICAgICAgICAgICBtc2cgKz0gc2VyaWFsaXphdGlvbl8xLmxpc3RNZXRhZGF0YUZvclRhcmdldChzZXJ2aWNlSWRlbnRpZmllclN0cmluZywgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBtc2cgKz0gc2VyaWFsaXphdGlvbl8xLmxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcihjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nLCBnZXRCaW5kaW5ncyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgYmluZGluZ19jb3VudF8xLkJpbmRpbmdDb3VudC5Pbmx5T25lQmluZGluZ0F2YWlsYWJsZTpcbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmlzQXJyYXkoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBiaW5kaW5nX2NvdW50XzEuQmluZGluZ0NvdW50Lk11bHRpcGxlQmluZGluZ3NBdmFpbGFibGU6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAoIXRhcmdldC5pc0FycmF5KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgPSBzZXJpYWxpemF0aW9uXzEuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IEVSUk9SX01TR1MuQU1CSUdVT1VTX01BVENIICsgXCIgXCIgKyBzZXJ2aWNlSWRlbnRpZmllclN0cmluZztcbiAgICAgICAgICAgICAgICBtc2cgKz0gc2VyaWFsaXphdGlvbl8xLmxpc3RSZWdpc3RlcmVkQmluZGluZ3NGb3JTZXJ2aWNlSWRlbnRpZmllcihjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nLCBnZXRCaW5kaW5ncyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZVN1YlJlcXVlc3RzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBzZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgcGFyZW50UmVxdWVzdCwgdGFyZ2V0KSB7XG4gICAgdmFyIGFjdGl2ZUJpbmRpbmdzO1xuICAgIHZhciBjaGlsZFJlcXVlc3Q7XG4gICAgaWYgKHBhcmVudFJlcXVlc3QgPT09IG51bGwpIHtcbiAgICAgICAgYWN0aXZlQmluZGluZ3MgPSBfZ2V0QWN0aXZlQmluZGluZ3MobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIGNvbnRleHQsIG51bGwsIHRhcmdldCk7XG4gICAgICAgIGNoaWxkUmVxdWVzdCA9IG5ldyByZXF1ZXN0XzEuUmVxdWVzdChzZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgbnVsbCwgYWN0aXZlQmluZGluZ3MsIHRhcmdldCk7XG4gICAgICAgIHZhciB0aGVQbGFuID0gbmV3IHBsYW5fMS5QbGFuKGNvbnRleHQsIGNoaWxkUmVxdWVzdCk7XG4gICAgICAgIGNvbnRleHQuYWRkUGxhbih0aGVQbGFuKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFjdGl2ZUJpbmRpbmdzID0gX2dldEFjdGl2ZUJpbmRpbmdzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBjb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCB0YXJnZXQpO1xuICAgICAgICBjaGlsZFJlcXVlc3QgPSBwYXJlbnRSZXF1ZXN0LmFkZENoaWxkUmVxdWVzdCh0YXJnZXQuc2VydmljZUlkZW50aWZpZXIsIGFjdGl2ZUJpbmRpbmdzLCB0YXJnZXQpO1xuICAgIH1cbiAgICBhY3RpdmVCaW5kaW5ncy5mb3JFYWNoKGZ1bmN0aW9uIChiaW5kaW5nKSB7XG4gICAgICAgIHZhciBzdWJDaGlsZFJlcXVlc3QgPSBudWxsO1xuICAgICAgICBpZiAodGFyZ2V0LmlzQXJyYXkoKSkge1xuICAgICAgICAgICAgc3ViQ2hpbGRSZXF1ZXN0ID0gY2hpbGRSZXF1ZXN0LmFkZENoaWxkUmVxdWVzdChiaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5nLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJDaGlsZFJlcXVlc3QgPSBjaGlsZFJlcXVlc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJpbmRpbmcudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5JbnN0YW5jZSAmJiBiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGRlcGVuZGVuY2llcyA9IHJlZmxlY3Rpb25fdXRpbHNfMS5nZXREZXBlbmRlbmNpZXMobWV0YWRhdGFSZWFkZXIsIGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlKTtcbiAgICAgICAgICAgIGlmICghY29udGV4dC5jb250YWluZXIub3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudCA9IHJlZmxlY3Rpb25fdXRpbHNfMS5nZXRCYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQobWV0YWRhdGFSZWFkZXIsIGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jaWVzLmxlbmd0aCA8IGJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBFUlJPUl9NU0dTLkFSR1VNRU5UU19MRU5HVEhfTUlTTUFUQ0gocmVmbGVjdGlvbl91dGlsc18xLmdldEZ1bmN0aW9uTmFtZShiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXBlbmRlbmN5KSB7XG4gICAgICAgICAgICAgICAgX2NyZWF0ZVN1YlJlcXVlc3RzKG1ldGFkYXRhUmVhZGVyLCBmYWxzZSwgZGVwZW5kZW5jeS5zZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgc3ViQ2hpbGRSZXF1ZXN0LCBkZXBlbmRlbmN5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRCaW5kaW5ncyhjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgdmFyIGJpbmRpbmdzID0gW107XG4gICAgdmFyIGJpbmRpbmdEaWN0aW9uYXJ5ID0gZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyKTtcbiAgICBpZiAoYmluZGluZ0RpY3Rpb25hcnkuaGFzS2V5KHNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICBiaW5kaW5ncyA9IGJpbmRpbmdEaWN0aW9uYXJ5LmdldChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRhaW5lci5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgYmluZGluZ3MgPSBnZXRCaW5kaW5ncyhjb250YWluZXIucGFyZW50LCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfVxuICAgIHJldHVybiBiaW5kaW5ncztcbn1cbmZ1bmN0aW9uIHBsYW4obWV0YWRhdGFSZWFkZXIsIGNvbnRhaW5lciwgaXNNdWx0aUluamVjdCwgdGFyZ2V0VHlwZSwgc2VydmljZUlkZW50aWZpZXIsIGtleSwgdmFsdWUsIGF2b2lkQ29uc3RyYWludHMpIHtcbiAgICBpZiAoYXZvaWRDb25zdHJhaW50cyA9PT0gdm9pZCAwKSB7IGF2b2lkQ29uc3RyYWludHMgPSBmYWxzZTsgfVxuICAgIHZhciBjb250ZXh0ID0gbmV3IGNvbnRleHRfMS5Db250ZXh0KGNvbnRhaW5lcik7XG4gICAgdmFyIHRhcmdldCA9IF9jcmVhdGVUYXJnZXQoaXNNdWx0aUluamVjdCwgdGFyZ2V0VHlwZSwgc2VydmljZUlkZW50aWZpZXIsIFwiXCIsIGtleSwgdmFsdWUpO1xuICAgIHRyeSB7XG4gICAgICAgIF9jcmVhdGVTdWJSZXF1ZXN0cyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIG51bGwsIHRhcmdldCk7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGV4Y2VwdGlvbnNfMS5pc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbihlcnJvcikpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LnBsYW4pIHtcbiAgICAgICAgICAgICAgICBzZXJpYWxpemF0aW9uXzEuY2lyY3VsYXJEZXBlbmRlbmN5VG9FeGNlcHRpb24oY29udGV4dC5wbGFuLnJvb3RSZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG59XG5leHBvcnRzLnBsYW4gPSBwbGFuO1xuZnVuY3Rpb24gY3JlYXRlTW9ja1JlcXVlc3QoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgIHZhciB0YXJnZXQgPSBuZXcgdGFyZ2V0XzEuVGFyZ2V0KGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5WYXJpYWJsZSwgXCJcIiwgc2VydmljZUlkZW50aWZpZXIsIG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKGtleSwgdmFsdWUpKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBjb250ZXh0XzEuQ29udGV4dChjb250YWluZXIpO1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IHJlcXVlc3RfMS5SZXF1ZXN0KHNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBudWxsLCBbXSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gcmVxdWVzdDtcbn1cbmV4cG9ydHMuY3JlYXRlTW9ja1JlcXVlc3QgPSBjcmVhdGVNb2NrUmVxdWVzdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFF1ZXJ5YWJsZVN0cmluZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUXVlcnlhYmxlU3RyaW5nKHN0cikge1xuICAgICAgICB0aGlzLnN0ciA9IHN0cjtcbiAgICB9XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcpID09PSAwO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcpIHtcbiAgICAgICAgdmFyIHJldmVyc2VTdHJpbmcgPSBcIlwiO1xuICAgICAgICB2YXIgcmV2ZXJzZVNlYXJjaFN0cmluZyA9IHNlYXJjaFN0cmluZy5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICAgICAgcmV2ZXJzZVN0cmluZyA9IHRoaXMuc3RyLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydHNXaXRoLmNhbGwoeyBzdHI6IHJldmVyc2VTdHJpbmcgfSwgcmV2ZXJzZVNlYXJjaFN0cmluZyk7XG4gICAgfTtcbiAgICBRdWVyeWFibGVTdHJpbmcucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZykge1xuICAgICAgICByZXR1cm4gKHRoaXMuc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSAhPT0gLTEpO1xuICAgIH07XG4gICAgUXVlcnlhYmxlU3RyaW5nLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAoY29tcGFyZVN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHIgPT09IGNvbXBhcmVTdHJpbmc7XG4gICAgfTtcbiAgICBRdWVyeWFibGVTdHJpbmcucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfTtcbiAgICByZXR1cm4gUXVlcnlhYmxlU3RyaW5nO1xufSgpKTtcbmV4cG9ydHMuUXVlcnlhYmxlU3RyaW5nID0gUXVlcnlhYmxlU3RyaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW5qZWN0XzEgPSByZXF1aXJlKFwiLi4vYW5ub3RhdGlvbi9pbmplY3RcIik7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIHNlcmlhbGl6YXRpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zZXJpYWxpemF0aW9uXCIpO1xuZXhwb3J0cy5nZXRGdW5jdGlvbk5hbWUgPSBzZXJpYWxpemF0aW9uXzEuZ2V0RnVuY3Rpb25OYW1lO1xudmFyIHRhcmdldF8xID0gcmVxdWlyZShcIi4vdGFyZ2V0XCIpO1xuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jaWVzKG1ldGFkYXRhUmVhZGVyLCBmdW5jKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yTmFtZSA9IHNlcmlhbGl6YXRpb25fMS5nZXRGdW5jdGlvbk5hbWUoZnVuYyk7XG4gICAgdmFyIHRhcmdldHMgPSBnZXRUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBjb25zdHJ1Y3Rvck5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmV4cG9ydHMuZ2V0RGVwZW5kZW5jaWVzID0gZ2V0RGVwZW5kZW5jaWVzO1xuZnVuY3Rpb24gZ2V0VGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgY29uc3RydWN0b3JOYW1lLCBmdW5jLCBpc0Jhc2VDbGFzcykge1xuICAgIHZhciBtZXRhZGF0YSA9IG1ldGFkYXRhUmVhZGVyLmdldENvbnN0cnVjdG9yTWV0YWRhdGEoZnVuYyk7XG4gICAgdmFyIHNlcnZpY2VJZGVudGlmaWVycyA9IG1ldGFkYXRhLmNvbXBpbGVyR2VuZXJhdGVkTWV0YWRhdGE7XG4gICAgaWYgKHNlcnZpY2VJZGVudGlmaWVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLk1JU1NJTkdfSU5KRUNUQUJMRV9BTk5PVEFUSU9OICsgXCIgXCIgKyBjb25zdHJ1Y3Rvck5hbWUgKyBcIi5cIjtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuICAgIHZhciBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSA9IG1ldGFkYXRhLnVzZXJHZW5lcmF0ZWRNZXRhZGF0YTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhKTtcbiAgICB2YXIgaGFzVXNlckRlY2xhcmVkVW5rbm93bkluamVjdGlvbnMgPSAoZnVuYy5sZW5ndGggPT09IDAgJiYga2V5cy5sZW5ndGggPiAwKTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IChoYXNVc2VyRGVjbGFyZWRVbmtub3duSW5qZWN0aW9ucykgPyBrZXlzLmxlbmd0aCA6IGZ1bmMubGVuZ3RoO1xuICAgIHZhciBjb25zdHJ1Y3RvclRhcmdldHMgPSBnZXRDb25zdHJ1Y3RvckFyZ3NBc1RhcmdldHMoaXNCYXNlQ2xhc3MsIGNvbnN0cnVjdG9yTmFtZSwgc2VydmljZUlkZW50aWZpZXJzLCBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSwgaXRlcmF0aW9ucyk7XG4gICAgdmFyIHByb3BlcnR5VGFyZ2V0cyA9IGdldENsYXNzUHJvcHNBc1RhcmdldHMobWV0YWRhdGFSZWFkZXIsIGZ1bmMpO1xuICAgIHZhciB0YXJnZXRzID0gY29uc3RydWN0b3JUYXJnZXRzLmNvbmNhdChwcm9wZXJ0eVRhcmdldHMpO1xuICAgIHJldHVybiB0YXJnZXRzO1xufVxuZnVuY3Rpb24gZ2V0Q29uc3RydWN0b3JBcmdzQXNUYXJnZXQoaW5kZXgsIGlzQmFzZUNsYXNzLCBjb25zdHJ1Y3Rvck5hbWUsIHNlcnZpY2VJZGVudGlmaWVycywgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEpIHtcbiAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YVtpbmRleC50b1N0cmluZygpXSB8fCBbXTtcbiAgICB2YXIgbWV0YWRhdGEgPSBmb3JtYXRUYXJnZXRNZXRhZGF0YSh0YXJnZXRNZXRhZGF0YSk7XG4gICAgdmFyIGlzTWFuYWdlZCA9IG1ldGFkYXRhLnVubWFuYWdlZCAhPT0gdHJ1ZTtcbiAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcnNbaW5kZXhdO1xuICAgIHZhciBpbmplY3RJZGVudGlmaWVyID0gKG1ldGFkYXRhLmluamVjdCB8fCBtZXRhZGF0YS5tdWx0aUluamVjdCk7XG4gICAgc2VydmljZUlkZW50aWZpZXIgPSAoaW5qZWN0SWRlbnRpZmllcikgPyAoaW5qZWN0SWRlbnRpZmllcikgOiBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgaW5zdGFuY2VvZiBpbmplY3RfMS5MYXp5U2VydmljZUlkZW50aWZlcikge1xuICAgICAgICBzZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyLnVud3JhcCgpO1xuICAgIH1cbiAgICBpZiAoaXNNYW5hZ2VkKSB7XG4gICAgICAgIHZhciBpc09iamVjdCA9IHNlcnZpY2VJZGVudGlmaWVyID09PSBPYmplY3Q7XG4gICAgICAgIHZhciBpc0Z1bmN0aW9uID0gc2VydmljZUlkZW50aWZpZXIgPT09IEZ1bmN0aW9uO1xuICAgICAgICB2YXIgaXNVbmRlZmluZWQgPSBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgaXNVbmtub3duVHlwZSA9IChpc09iamVjdCB8fCBpc0Z1bmN0aW9uIHx8IGlzVW5kZWZpbmVkKTtcbiAgICAgICAgaWYgKCFpc0Jhc2VDbGFzcyAmJiBpc1Vua25vd25UeXBlKSB7XG4gICAgICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5NSVNTSU5HX0lOSkVDVF9BTk5PVEFUSU9OICsgXCIgYXJndW1lbnQgXCIgKyBpbmRleCArIFwiIGluIGNsYXNzIFwiICsgY29uc3RydWN0b3JOYW1lICsgXCIuXCI7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFyZ2V0ID0gbmV3IHRhcmdldF8xLlRhcmdldChsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uQ29uc3RydWN0b3JBcmd1bWVudCwgbWV0YWRhdGEudGFyZ2V0TmFtZSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB0YXJnZXQubWV0YWRhdGEgPSB0YXJnZXRNZXRhZGF0YTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvckFyZ3NBc1RhcmdldHMoaXNCYXNlQ2xhc3MsIGNvbnN0cnVjdG9yTmFtZSwgc2VydmljZUlkZW50aWZpZXJzLCBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSwgaXRlcmF0aW9ucykge1xuICAgIHZhciB0YXJnZXRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYXRpb25zOyBpKyspIHtcbiAgICAgICAgdmFyIGluZGV4ID0gaTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0KGluZGV4LCBpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhKTtcbiAgICAgICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldHM7XG59XG5mdW5jdGlvbiBnZXRDbGFzc1Byb3BzQXNUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBjb25zdHJ1Y3RvckZ1bmMpIHtcbiAgICB2YXIgY2xhc3NQcm9wc01ldGFkYXRhID0gbWV0YWRhdGFSZWFkZXIuZ2V0UHJvcGVydGllc01ldGFkYXRhKGNvbnN0cnVjdG9yRnVuYyk7XG4gICAgdmFyIHRhcmdldHMgPSBbXTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGNsYXNzUHJvcHNNZXRhZGF0YSk7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBrZXlzXzEgPSBrZXlzOyBfaSA8IGtleXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNfMVtfaV07XG4gICAgICAgIHZhciB0YXJnZXRNZXRhZGF0YSA9IGNsYXNzUHJvcHNNZXRhZGF0YVtrZXldO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBmb3JtYXRUYXJnZXRNZXRhZGF0YShjbGFzc1Byb3BzTWV0YWRhdGFba2V5XSk7XG4gICAgICAgIHZhciB0YXJnZXROYW1lID0gbWV0YWRhdGEudGFyZ2V0TmFtZSB8fCBrZXk7XG4gICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllciA9IChtZXRhZGF0YS5pbmplY3QgfHwgbWV0YWRhdGEubXVsdGlJbmplY3QpO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gbmV3IHRhcmdldF8xLlRhcmdldChsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uQ2xhc3NQcm9wZXJ0eSwgdGFyZ2V0TmFtZSwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICB0YXJnZXQubWV0YWRhdGEgPSB0YXJnZXRNZXRhZGF0YTtcbiAgICAgICAgdGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBiYXNlQ29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3JGdW5jLnByb3RvdHlwZSkuY29uc3RydWN0b3I7XG4gICAgaWYgKGJhc2VDb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XG4gICAgICAgIHZhciBiYXNlVGFyZ2V0cyA9IGdldENsYXNzUHJvcHNBc1RhcmdldHMobWV0YWRhdGFSZWFkZXIsIGJhc2VDb25zdHJ1Y3Rvcik7XG4gICAgICAgIHRhcmdldHMgPSB0YXJnZXRzLmNvbmNhdChiYXNlVGFyZ2V0cyk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRzO1xufVxuZnVuY3Rpb24gZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KG1ldGFkYXRhUmVhZGVyLCBmdW5jKSB7XG4gICAgdmFyIGJhc2VDb25zdHJ1Y3RvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihmdW5jLnByb3RvdHlwZSkuY29uc3RydWN0b3I7XG4gICAgaWYgKGJhc2VDb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XG4gICAgICAgIHZhciBiYXNlQ29uc3RydWN0b3JOYW1lID0gc2VyaWFsaXphdGlvbl8xLmdldEZ1bmN0aW9uTmFtZShiYXNlQ29uc3RydWN0b3IpO1xuICAgICAgICB2YXIgdGFyZ2V0cyA9IGdldFRhcmdldHMobWV0YWRhdGFSZWFkZXIsIGJhc2VDb25zdHJ1Y3Rvck5hbWUsIGJhc2VDb25zdHJ1Y3RvciwgdHJ1ZSk7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHRhcmdldHMubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdC5tZXRhZGF0YS5maWx0ZXIoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbS5rZXkgPT09IE1FVEFEQVRBX0tFWS5VTk1BTkFHRURfVEFHO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdW5tYW5hZ2VkQ291bnQgPSBbXS5jb25jYXQuYXBwbHkoW10sIG1ldGFkYXRhKS5sZW5ndGg7XG4gICAgICAgIHZhciBkZXBlbmRlbmN5Q291bnQgPSB0YXJnZXRzLmxlbmd0aCAtIHVubWFuYWdlZENvdW50O1xuICAgICAgICBpZiAoZGVwZW5kZW5jeUNvdW50ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlcGVuZGVuY3lDb3VudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRCYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQobWV0YWRhdGFSZWFkZXIsIGJhc2VDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50ID0gZ2V0QmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50O1xuZnVuY3Rpb24gZm9ybWF0VGFyZ2V0TWV0YWRhdGEodGFyZ2V0TWV0YWRhdGEpIHtcbiAgICB2YXIgdGFyZ2V0TWV0YWRhdGFNYXAgPSB7fTtcbiAgICB0YXJnZXRNZXRhZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIHRhcmdldE1ldGFkYXRhTWFwW20ua2V5LnRvU3RyaW5nKCldID0gbS52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbmplY3Q6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5JTkpFQ1RfVEFHXSxcbiAgICAgICAgbXVsdGlJbmplY3Q6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHXSxcbiAgICAgICAgdGFyZ2V0TmFtZTogdGFyZ2V0TWV0YWRhdGFNYXBbTUVUQURBVEFfS0VZLk5BTUVfVEFHXSxcbiAgICAgICAgdW5tYW5hZ2VkOiB0YXJnZXRNZXRhZGF0YU1hcFtNRVRBREFUQV9LRVkuVU5NQU5BR0VEX1RBR11cbiAgICB9O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaWRfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9pZFwiKTtcbnZhciBSZXF1ZXN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZXF1ZXN0KHNlcnZpY2VJZGVudGlmaWVyLCBwYXJlbnRDb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCBiaW5kaW5ncywgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMuc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5wYXJlbnRDb250ZXh0ID0gcGFyZW50Q29udGV4dDtcbiAgICAgICAgdGhpcy5wYXJlbnRSZXF1ZXN0ID0gcGFyZW50UmVxdWVzdDtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMuY2hpbGRSZXF1ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLmJpbmRpbmdzID0gKEFycmF5LmlzQXJyYXkoYmluZGluZ3MpID8gYmluZGluZ3MgOiBbYmluZGluZ3NdKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2NvcGUgPSBwYXJlbnRSZXF1ZXN0ID09PSBudWxsXG4gICAgICAgICAgICA/IG5ldyBNYXAoKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5hZGRDaGlsZFJlcXVlc3QgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmdzLCB0YXJnZXQpIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbmV3IFJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIHRoaXMucGFyZW50Q29udGV4dCwgdGhpcywgYmluZGluZ3MsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuY2hpbGRSZXF1ZXN0cy5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH07XG4gICAgcmV0dXJuIFJlcXVlc3Q7XG59KCkpO1xuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBpZF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2lkXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi9tZXRhZGF0YVwiKTtcbnZhciBxdWVyeWFibGVfc3RyaW5nXzEgPSByZXF1aXJlKFwiLi9xdWVyeWFibGVfc3RyaW5nXCIpO1xudmFyIFRhcmdldCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGFyZ2V0KHR5cGUsIG5hbWUsIHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZE9yVGFnZ2VkKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5uYW1lID0gbmV3IHF1ZXJ5YWJsZV9zdHJpbmdfMS5RdWVyeWFibGVTdHJpbmcobmFtZSB8fCBcIlwiKTtcbiAgICAgICAgdGhpcy5tZXRhZGF0YSA9IG5ldyBBcnJheSgpO1xuICAgICAgICB2YXIgbWV0YWRhdGFJdGVtID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lZE9yVGFnZ2VkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtZXRhZGF0YUl0ZW0gPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lZE9yVGFnZ2VkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lZE9yVGFnZ2VkIGluc3RhbmNlb2YgbWV0YWRhdGFfMS5NZXRhZGF0YSkge1xuICAgICAgICAgICAgbWV0YWRhdGFJdGVtID0gbmFtZWRPclRhZ2dlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWV0YWRhdGFJdGVtICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLnB1c2gobWV0YWRhdGFJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBUYXJnZXQucHJvdG90eXBlLmhhc1RhZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMubWV0YWRhdGE7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbSA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmIChtLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5pc0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNUYWcoTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5tYXRjaGVzQXJyYXkgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVzVGFnKE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKShuYW1lKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuaXNOYW1lZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzVGFnKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5pc1RhZ2dlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWV0YWRhdGEuc29tZShmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgcmV0dXJuIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLklOSkVDVF9UQUcpICYmXG4gICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRykgJiZcbiAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5OQU1FX1RBRykgJiZcbiAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5VTk1BTkFHRURfVEFHKSAmJlxuICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk5BTUVEX1RBRyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5pc09wdGlvbmFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVzVGFnKE1FVEFEQVRBX0tFWS5PUFRJT05BTF9UQUcpKHRydWUpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5nZXROYW1lZFRhZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNOYW1lZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5maWx0ZXIoZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0ua2V5ID09PSBNRVRBREFUQV9LRVkuTkFNRURfVEFHOyB9KVswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUuZ2V0Q3VzdG9tVGFncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUYWdnZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWV0YWRhdGEuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLklOSkVDVF9UQUcpICYmXG4gICAgICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcpICYmXG4gICAgICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk5BTUVfVEFHKSAmJlxuICAgICAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5VTk1BTkFHRURfVEFHKSAmJlxuICAgICAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLm1hdGNoZXNOYW1lZFRhZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoZXNUYWcoTUVUQURBVEFfS0VZLk5BTUVEX1RBRykobmFtZSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLm1hdGNoZXNUYWcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBfdGhpcy5tZXRhZGF0YTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBpZiAobS5rZXkgPT09IGtleSAmJiBtLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gVGFyZ2V0O1xufSgpKTtcbmV4cG9ydHMuVGFyZ2V0ID0gVGFyZ2V0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXJyb3JfbXNnc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG5mdW5jdGlvbiBfaW5qZWN0UHJvcGVydGllcyhpbnN0YW5jZSwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpIHtcbiAgICB2YXIgcHJvcGVydHlJbmplY3Rpb25zUmVxdWVzdHMgPSBjaGlsZFJlcXVlc3RzLmZpbHRlcihmdW5jdGlvbiAoY2hpbGRSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiAoY2hpbGRSZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgY2hpbGRSZXF1ZXN0LnRhcmdldC50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uQ2xhc3NQcm9wZXJ0eSk7XG4gICAgfSk7XG4gICAgdmFyIHByb3BlcnR5SW5qZWN0aW9ucyA9IHByb3BlcnR5SW5qZWN0aW9uc1JlcXVlc3RzLm1hcChyZXNvbHZlUmVxdWVzdCk7XG4gICAgcHJvcGVydHlJbmplY3Rpb25zUmVxdWVzdHMuZm9yRWFjaChmdW5jdGlvbiAociwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIHByb3BlcnR5TmFtZSA9IHIudGFyZ2V0Lm5hbWUudmFsdWUoKTtcbiAgICAgICAgdmFyIGluamVjdGlvbiA9IHByb3BlcnR5SW5qZWN0aW9uc1tpbmRleF07XG4gICAgICAgIGluc3RhbmNlW3Byb3BlcnR5TmFtZV0gPSBpbmplY3Rpb247XG4gICAgfSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuZnVuY3Rpb24gX2NyZWF0ZUluc3RhbmNlKEZ1bmMsIGluamVjdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IChGdW5jLmJpbmQuYXBwbHkoRnVuYywgW3ZvaWQgMF0uY29uY2F0KGluamVjdGlvbnMpKSkoKTtcbn1cbmZ1bmN0aW9uIF9wb3N0Q29uc3RydWN0KGNvbnN0ciwgcmVzdWx0KSB7XG4gICAgaWYgKFJlZmxlY3QuaGFzTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCBjb25zdHIpKSB7XG4gICAgICAgIHZhciBkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIGNvbnN0cik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHRbZGF0YS52YWx1ZV0oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yX21zZ3NfMS5QT1NUX0NPTlNUUlVDVF9FUlJPUihjb25zdHIubmFtZSwgZS5tZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiByZXNvbHZlSW5zdGFuY2UoY29uc3RyLCBjaGlsZFJlcXVlc3RzLCByZXNvbHZlUmVxdWVzdCkge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGlmIChjaGlsZFJlcXVlc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9ySW5qZWN0aW9uc1JlcXVlc3RzID0gY2hpbGRSZXF1ZXN0cy5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIChjaGlsZFJlcXVlc3QudGFyZ2V0ICE9PSBudWxsICYmIGNoaWxkUmVxdWVzdC50YXJnZXQudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLkNvbnN0cnVjdG9yQXJndW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9ySW5qZWN0aW9ucyA9IGNvbnN0cnVjdG9ySW5qZWN0aW9uc1JlcXVlc3RzLm1hcChyZXNvbHZlUmVxdWVzdCk7XG4gICAgICAgIHJlc3VsdCA9IF9jcmVhdGVJbnN0YW5jZShjb25zdHIsIGNvbnN0cnVjdG9ySW5qZWN0aW9ucyk7XG4gICAgICAgIHJlc3VsdCA9IF9pbmplY3RQcm9wZXJ0aWVzKHJlc3VsdCwgY2hpbGRSZXF1ZXN0cywgcmVzb2x2ZVJlcXVlc3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IGNvbnN0cigpO1xuICAgIH1cbiAgICBfcG9zdENvbnN0cnVjdChjb25zdHIsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMucmVzb2x2ZUluc3RhbmNlID0gcmVzb2x2ZUluc3RhbmNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgZXhjZXB0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIik7XG52YXIgc2VyaWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlcmlhbGl6YXRpb25cIik7XG52YXIgaW5zdGFudGlhdGlvbl8xID0gcmVxdWlyZShcIi4vaW5zdGFudGlhdGlvblwiKTtcbnZhciBpbnZva2VGYWN0b3J5ID0gZnVuY3Rpb24gKGZhY3RvcnlUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwgZm4pIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChleGNlcHRpb25zXzEuaXNTdGFja092ZXJmbG93RXhlcHRpb24oZXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5DSVJDVUxBUl9ERVBFTkRFTkNZX0lOX0ZBQ1RPUlkoZmFjdG9yeVR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufTtcbnZhciBfcmVzb2x2ZVJlcXVlc3QgPSBmdW5jdGlvbiAocmVxdWVzdFNjb3BlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3QucGFyZW50Q29udGV4dC5zZXRDdXJyZW50UmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgICAgdmFyIGJpbmRpbmdzID0gcmVxdWVzdC5iaW5kaW5ncztcbiAgICAgICAgdmFyIGNoaWxkUmVxdWVzdHMgPSByZXF1ZXN0LmNoaWxkUmVxdWVzdHM7XG4gICAgICAgIHZhciB0YXJnZXRJc0FuQXJyYXkgPSByZXF1ZXN0LnRhcmdldCAmJiByZXF1ZXN0LnRhcmdldC5pc0FycmF5KCk7XG4gICAgICAgIHZhciB0YXJnZXRQYXJlbnRJc05vdEFuQXJyYXkgPSAhcmVxdWVzdC5wYXJlbnRSZXF1ZXN0IHx8XG4gICAgICAgICAgICAhcmVxdWVzdC5wYXJlbnRSZXF1ZXN0LnRhcmdldCB8fFxuICAgICAgICAgICAgIXJlcXVlc3QudGFyZ2V0IHx8XG4gICAgICAgICAgICAhcmVxdWVzdC5wYXJlbnRSZXF1ZXN0LnRhcmdldC5tYXRjaGVzQXJyYXkocmVxdWVzdC50YXJnZXQuc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAodGFyZ2V0SXNBbkFycmF5ICYmIHRhcmdldFBhcmVudElzTm90QW5BcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkUmVxdWVzdHMubWFwKGZ1bmN0aW9uIChjaGlsZFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2YgPSBfcmVzb2x2ZVJlcXVlc3QocmVxdWVzdFNjb3BlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2YoY2hpbGRSZXF1ZXN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC50YXJnZXQuaXNPcHRpb25hbCgpICYmIGJpbmRpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmluZGluZ18xID0gYmluZGluZ3NbMF07XG4gICAgICAgICAgICB2YXIgaXNTaW5nbGV0b24gPSBiaW5kaW5nXzEuc2NvcGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbjtcbiAgICAgICAgICAgIHZhciBpc1JlcXVlc3RTaW5nbGV0b24gPSBiaW5kaW5nXzEuc2NvcGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlJlcXVlc3Q7XG4gICAgICAgICAgICBpZiAoaXNTaW5nbGV0b24gJiYgYmluZGluZ18xLmFjdGl2YXRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nXzEuY2FjaGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNSZXF1ZXN0U2luZ2xldG9uICYmXG4gICAgICAgICAgICAgICAgcmVxdWVzdFNjb3BlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgcmVxdWVzdFNjb3BlLmhhcyhiaW5kaW5nXzEuaWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RTY29wZS5nZXQoYmluZGluZ18xLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Db25zdGFudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYmluZGluZ18xLmNhY2hlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBiaW5kaW5nXzEuY2FjaGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Db25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGJpbmRpbmdfMS5pbXBsZW1lbnRhdGlvblR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5EeW5hbWljVmFsdWUgJiYgYmluZGluZ18xLmR5bmFtaWNWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGludm9rZUZhY3RvcnkoXCJ0b0R5bmFtaWNWYWx1ZVwiLCBiaW5kaW5nXzEuc2VydmljZUlkZW50aWZpZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJpbmRpbmdfMS5keW5hbWljVmFsdWUocmVxdWVzdC5wYXJlbnRDb250ZXh0KTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GYWN0b3J5ICYmIGJpbmRpbmdfMS5mYWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW52b2tlRmFjdG9yeShcInRvRmFjdG9yeVwiLCBiaW5kaW5nXzEuc2VydmljZUlkZW50aWZpZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJpbmRpbmdfMS5mYWN0b3J5KHJlcXVlc3QucGFyZW50Q29udGV4dCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZGluZ18xLnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uUHJvdmlkZXIgJiYgYmluZGluZ18xLnByb3ZpZGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW52b2tlRmFjdG9yeShcInRvUHJvdmlkZXJcIiwgYmluZGluZ18xLnNlcnZpY2VJZGVudGlmaWVyLCBmdW5jdGlvbiAoKSB7IHJldHVybiBiaW5kaW5nXzEucHJvdmlkZXIocmVxdWVzdC5wYXJlbnRDb250ZXh0KTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5JbnN0YW5jZSAmJiBiaW5kaW5nXzEuaW1wbGVtZW50YXRpb25UeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5zdGFudGlhdGlvbl8xLnJlc29sdmVJbnN0YW5jZShiaW5kaW5nXzEuaW1wbGVtZW50YXRpb25UeXBlLCBjaGlsZFJlcXVlc3RzLCBfcmVzb2x2ZVJlcXVlc3QocmVxdWVzdFNjb3BlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBzZXJpYWxpemF0aW9uXzEuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhyZXF1ZXN0LnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX0JJTkRJTkdfVFlQRSArIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBiaW5kaW5nXzEub25BY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBiaW5kaW5nXzEub25BY3RpdmF0aW9uKHJlcXVlc3QucGFyZW50Q29udGV4dCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1NpbmdsZXRvbikge1xuICAgICAgICAgICAgICAgIGJpbmRpbmdfMS5jYWNoZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBiaW5kaW5nXzEuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1JlcXVlc3RTaW5nbGV0b24gJiZcbiAgICAgICAgICAgICAgICByZXF1ZXN0U2NvcGUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAhcmVxdWVzdFNjb3BlLmhhcyhiaW5kaW5nXzEuaWQpKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdFNjb3BlLnNldChiaW5kaW5nXzEuaWQsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5mdW5jdGlvbiByZXNvbHZlKGNvbnRleHQpIHtcbiAgICB2YXIgX2YgPSBfcmVzb2x2ZVJlcXVlc3QoY29udGV4dC5wbGFuLnJvb3RSZXF1ZXN0LnJlcXVlc3RTY29wZSk7XG4gICAgcmV0dXJuIF9mKGNvbnRleHQucGxhbi5yb290UmVxdWVzdCk7XG59XG5leHBvcnRzLnJlc29sdmUgPSByZXNvbHZlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfd2hlbl9vbl9zeW50YXhcIik7XG52YXIgQmluZGluZ0luU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nSW5TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ0luU3ludGF4LnByb3RvdHlwZS5pblJlcXVlc3RTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlJlcXVlc3Q7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5TeW50YXgucHJvdG90eXBlLmluU2luZ2xldG9uU2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuc2NvcGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5TaW5nbGV0b247XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5TeW50YXgucHJvdG90eXBlLmluVHJhbnNpZW50U2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuc2NvcGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5UcmFuc2llbnQ7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ0luU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ0luU3ludGF4ID0gQmluZGluZ0luU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYmluZGluZ19pbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfaW5fc3ludGF4XCIpO1xudmFyIGJpbmRpbmdfb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX29uX3N5bnRheFwiKTtcbnZhciBiaW5kaW5nX3doZW5fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX3doZW5fc3ludGF4XCIpO1xudmFyIEJpbmRpbmdJbldoZW5PblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ0luV2hlbk9uU3ludGF4KGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZyA9IGJpbmRpbmc7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4ID0gbmV3IGJpbmRpbmdfd2hlbl9zeW50YXhfMS5CaW5kaW5nV2hlblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ09uU3ludGF4ID0gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nSW5TeW50YXggPSBuZXcgYmluZGluZ19pbl9zeW50YXhfMS5CaW5kaW5nSW5TeW50YXgoYmluZGluZyk7XG4gICAgfVxuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUuaW5SZXF1ZXN0U2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nSW5TeW50YXguaW5SZXF1ZXN0U2NvcGUoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUuaW5TaW5nbGV0b25TY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdJblN5bnRheC5pblNpbmdsZXRvblNjb3BlKCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLmluVHJhbnNpZW50U2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nSW5TeW50YXguaW5UcmFuc2llbnRTY29wZSgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW4oY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0TmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRJc0RlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0SXNEZWZhdWx0KCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldFRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkluamVjdGVkSW50byA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5JbmplY3RlZEludG8ocGFyZW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5QYXJlbnROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuUGFyZW50VGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9ySXMoYW5jZXN0b3IpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3RvcklzKGFuY2VzdG9yKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yTmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JOYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyhjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyhjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUub25BY3RpdmF0aW9uID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdPblN5bnRheC5vbkFjdGl2YXRpb24oaGFuZGxlcik7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ0luV2hlbk9uU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ0luV2hlbk9uU3ludGF4ID0gQmluZGluZ0luV2hlbk9uU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYmluZGluZ193aGVuX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nT25TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdPblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nT25TeW50YXgucHJvdG90eXBlLm9uQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcub25BY3RpdmF0aW9uID0gaGFuZGxlcjtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fc3ludGF4XzEuQmluZGluZ1doZW5TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ09uU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ09uU3ludGF4ID0gQmluZGluZ09uU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgYmluZGluZ19pbl93aGVuX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ19pbl93aGVuX29uX3N5bnRheFwiKTtcbnZhciBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX3doZW5fb25fc3ludGF4XCIpO1xudmFyIEJpbmRpbmdUb1N5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ1RvU3ludGF4KGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZyA9IGJpbmRpbmc7XG4gICAgfVxuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG8gPSBmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5JbnN0YW5jZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgPSBjb25zdHJ1Y3RvcjtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX2luX3doZW5fb25fc3ludGF4XzEuQmluZGluZ0luV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b1NlbGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIiArIEVSUk9SX01TR1MuSU5WQUxJRF9UT19TRUxGX1ZBTFVFKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMuX2JpbmRpbmcuc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHJldHVybiB0aGlzLnRvKHNlbGYpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0NvbnN0YW50VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Db25zdGFudFZhbHVlO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNhY2hlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuZHluYW1pY1ZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0R5bmFtaWNWYWx1ZSA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRHluYW1pY1ZhbHVlO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNhY2hlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYmluZGluZy5keW5hbWljVmFsdWUgPSBmdW5jO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSA9IG51bGw7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19pbl93aGVuX29uX3N5bnRheF8xLkJpbmRpbmdJbldoZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9Db25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkNvbnN0cnVjdG9yO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSA9IGNvbnN0cnVjdG9yO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0ZhY3RvcnkgPSBmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkZhY3Rvcnk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuZmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvRnVuY3Rpb24gPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICBpZiAodHlwZW9mIGZ1bmMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuSU5WQUxJRF9GVU5DVElPTl9CSU5ESU5HKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmluZGluZ1doZW5PblN5bnRheCA9IHRoaXMudG9Db25zdGFudFZhbHVlKGZ1bmMpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkZ1bmN0aW9uO1xuICAgICAgICByZXR1cm4gYmluZGluZ1doZW5PblN5bnRheDtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9BdXRvRmFjdG9yeSA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkZhY3Rvcnk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuZmFjdG9yeSA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgYXV0b2ZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb250ZXh0LmNvbnRhaW5lci5nZXQoc2VydmljZUlkZW50aWZpZXIpOyB9O1xuICAgICAgICAgICAgcmV0dXJuIGF1dG9mYWN0b3J5O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b1Byb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uUHJvdmlkZXI7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9TZXJ2aWNlID0gZnVuY3Rpb24gKHNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50b0R5bmFtaWNWYWx1ZShmdW5jdGlvbiAoY29udGV4dCkgeyByZXR1cm4gY29udGV4dC5jb250YWluZXIuZ2V0KHNlcnZpY2UpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nVG9TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nVG9TeW50YXggPSBCaW5kaW5nVG9TeW50YXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBiaW5kaW5nX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ19vbl9zeW50YXhcIik7XG52YXIgYmluZGluZ193aGVuX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nV2hlbk9uU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nV2hlbk9uU3ludGF4KGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZyA9IGJpbmRpbmc7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4ID0gbmV3IGJpbmRpbmdfd2hlbl9zeW50YXhfMS5CaW5kaW5nV2hlblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ09uU3ludGF4ID0gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH1cbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW4oY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldE5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldElzRGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRJc0RlZmF1bHQoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldFRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5JbmplY3RlZEludG8gPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuSW5qZWN0ZWRJbnRvKHBhcmVudCk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudE5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuUGFyZW50VGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvcklzKGFuY2VzdG9yKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9ySXMoYW5jZXN0b3IpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yTmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yVGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JNYXRjaGVzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JNYXRjaGVzKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUub25BY3RpdmF0aW9uID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdPblN5bnRheC5vbkFjdGl2YXRpb24oaGFuZGxlcik7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ1doZW5PblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdXaGVuT25TeW50YXggPSBCaW5kaW5nV2hlbk9uU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYmluZGluZ19vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfb25fc3ludGF4XCIpO1xudmFyIGNvbnN0cmFpbnRfaGVscGVyc18xID0gcmVxdWlyZShcIi4vY29uc3RyYWludF9oZWxwZXJzXCIpO1xudmFyIEJpbmRpbmdXaGVuU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nV2hlblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbiA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGNvbnN0cmFpbnQ7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gY29uc3RyYWludF9oZWxwZXJzXzEubmFtZWRDb25zdHJhaW50KG5hbWUpO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRJc0RlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SXNEZWZhdWx0ID0gKHJlcXVlc3QudGFyZ2V0ICE9PSBudWxsKSAmJlxuICAgICAgICAgICAgICAgICghcmVxdWVzdC50YXJnZXQuaXNOYW1lZCgpKSAmJlxuICAgICAgICAgICAgICAgICghcmVxdWVzdC50YXJnZXQuaXNUYWdnZWQoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0SXNEZWZhdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXRUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50X2hlbHBlcnNfMS50YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5JbmplY3RlZEludG8gPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHlwZUNvbnN0cmFpbnQocGFyZW50KShyZXF1ZXN0LnBhcmVudFJlcXVlc3QpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEubmFtZWRDb25zdHJhaW50KG5hbWUpKHJlcXVlc3QucGFyZW50UmVxdWVzdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudGFnZ2VkQ29uc3RyYWludCh0YWcpKHZhbHVlKShyZXF1ZXN0LnBhcmVudFJlcXVlc3QpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLnR5cGVDb25zdHJhaW50KGFuY2VzdG9yKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuICFjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludF9oZWxwZXJzXzEudHlwZUNvbnN0cmFpbnQoYW5jZXN0b3IpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludChuYW1lKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS5uYW1lZENvbnN0cmFpbnQobmFtZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQodGFnKSh2YWx1ZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAhY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQodGFnKSh2YWx1ZSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuICFjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICByZXR1cm4gQmluZGluZ1doZW5TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nV2hlblN5bnRheCA9IEJpbmRpbmdXaGVuU3ludGF4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgdHJhdmVyc2VBbmNlcnN0b3JzID0gZnVuY3Rpb24gKHJlcXVlc3QsIGNvbnN0cmFpbnQpIHtcbiAgICB2YXIgcGFyZW50ID0gcmVxdWVzdC5wYXJlbnRSZXF1ZXN0O1xuICAgIGlmIChwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnQocGFyZW50KSA/IHRydWUgOiB0cmF2ZXJzZUFuY2Vyc3RvcnMocGFyZW50LCBjb25zdHJhaW50KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuZXhwb3J0cy50cmF2ZXJzZUFuY2Vyc3RvcnMgPSB0cmF2ZXJzZUFuY2Vyc3RvcnM7XG52YXIgdGFnZ2VkQ29uc3RyYWludCA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBjb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QgIT09IG51bGwgJiYgcmVxdWVzdC50YXJnZXQgIT09IG51bGwgJiYgcmVxdWVzdC50YXJnZXQubWF0Y2hlc1RhZyhrZXkpKHZhbHVlKTtcbiAgICB9O1xuICAgIGNvbnN0cmFpbnQubWV0YURhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShrZXksIHZhbHVlKTtcbiAgICByZXR1cm4gY29uc3RyYWludDtcbn07IH07XG5leHBvcnRzLnRhZ2dlZENvbnN0cmFpbnQgPSB0YWdnZWRDb25zdHJhaW50O1xudmFyIG5hbWVkQ29uc3RyYWludCA9IHRhZ2dlZENvbnN0cmFpbnQoTUVUQURBVEFfS0VZLk5BTUVEX1RBRyk7XG5leHBvcnRzLm5hbWVkQ29uc3RyYWludCA9IG5hbWVkQ29uc3RyYWludDtcbnZhciB0eXBlQ29uc3RyYWludCA9IGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgIHZhciBiaW5kaW5nID0gbnVsbDtcbiAgICBpZiAocmVxdWVzdCAhPT0gbnVsbCkge1xuICAgICAgICBiaW5kaW5nID0gcmVxdWVzdC5iaW5kaW5nc1swXTtcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgc2VydmljZUlkZW50aWZpZXIgPSBiaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VJZGVudGlmaWVyID09PSB0eXBlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gcmVxdWVzdC5iaW5kaW5nc1swXS5pbXBsZW1lbnRhdGlvblR5cGU7XG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gY29uc3RydWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTsgfTtcbmV4cG9ydHMudHlwZUNvbnN0cmFpbnQgPSB0eXBlQ29uc3RyYWludDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tdWx0aUJpbmRUb1NlcnZpY2UgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdHlwZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdHlwZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0eXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7IHJldHVybiBjb250YWluZXIuYmluZCh0KS50b1NlcnZpY2Uoc2VydmljZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbmZ1bmN0aW9uIGlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uKGVycm9yKSB7XG4gICAgcmV0dXJuIChlcnJvciBpbnN0YW5jZW9mIFJhbmdlRXJyb3IgfHxcbiAgICAgICAgZXJyb3IubWVzc2FnZSA9PT0gRVJST1JfTVNHUy5TVEFDS19PVkVSRkxPVyk7XG59XG5leHBvcnRzLmlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uID0gaXNTdGFja092ZXJmbG93RXhlcHRpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpZENvdW50ZXIgPSAwO1xuZnVuY3Rpb24gaWQoKSB7XG4gICAgcmV0dXJuIGlkQ291bnRlcisrO1xufVxuZXhwb3J0cy5pZCA9IGlkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbmZ1bmN0aW9uIGdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICBpZiAodHlwZW9mIHNlcnZpY2VJZGVudGlmaWVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdmFyIF9zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICByZXR1cm4gX3NlcnZpY2VJZGVudGlmaWVyLm5hbWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBzZXJ2aWNlSWRlbnRpZmllciA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgICByZXR1cm4gc2VydmljZUlkZW50aWZpZXIudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBfc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIF9zZXJ2aWNlSWRlbnRpZmllcjtcbiAgICB9XG59XG5leHBvcnRzLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcgPSBnZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nO1xuZnVuY3Rpb24gbGlzdFJlZ2lzdGVyZWRCaW5kaW5nc0ZvclNlcnZpY2VJZGVudGlmaWVyKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIsIGdldEJpbmRpbmdzKSB7XG4gICAgdmFyIHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgPSBcIlwiO1xuICAgIHZhciByZWdpc3RlcmVkQmluZGluZ3MgPSBnZXRCaW5kaW5ncyhjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICBpZiAocmVnaXN0ZXJlZEJpbmRpbmdzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gXCJcXG5SZWdpc3RlcmVkIGJpbmRpbmdzOlwiO1xuICAgICAgICByZWdpc3RlcmVkQmluZGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBcIk9iamVjdFwiO1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IGdldEZ1bmN0aW9uTmFtZShiaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCArIFwiXFxuIFwiICsgbmFtZTtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLmNvbnN0cmFpbnQubWV0YURhdGEpIHtcbiAgICAgICAgICAgICAgICByZWdpc3RlcmVkQmluZGluZ3NMaXN0ID0gcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCArIFwiIC0gXCIgKyBiaW5kaW5nLmNvbnN0cmFpbnQubWV0YURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdDtcbn1cbmV4cG9ydHMubGlzdFJlZ2lzdGVyZWRCaW5kaW5nc0ZvclNlcnZpY2VJZGVudGlmaWVyID0gbGlzdFJlZ2lzdGVyZWRCaW5kaW5nc0ZvclNlcnZpY2VJZGVudGlmaWVyO1xuZnVuY3Rpb24gYWxyZWFkeURlcGVuZGVuY3lDaGFpbihyZXF1ZXN0LCBzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgIGlmIChyZXF1ZXN0LnBhcmVudFJlcXVlc3QgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXF1ZXN0LnBhcmVudFJlcXVlc3Quc2VydmljZUlkZW50aWZpZXIgPT09IHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFscmVhZHlEZXBlbmRlbmN5Q2hhaW4ocmVxdWVzdC5wYXJlbnRSZXF1ZXN0LCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVwZW5kZW5jeUNoYWluVG9TdHJpbmcocmVxdWVzdCkge1xuICAgIGZ1bmN0aW9uIF9jcmVhdGVTdHJpbmdBcnIocmVxLCByZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSB7IHJlc3VsdCA9IFtdOyB9XG4gICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllciA9IGdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcocmVxLnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgcmVzdWx0LnB1c2goc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICBpZiAocmVxLnBhcmVudFJlcXVlc3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBfY3JlYXRlU3RyaW5nQXJyKHJlcS5wYXJlbnRSZXF1ZXN0LCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHZhciBzdHJpbmdBcnIgPSBfY3JlYXRlU3RyaW5nQXJyKHJlcXVlc3QpO1xuICAgIHJldHVybiBzdHJpbmdBcnIucmV2ZXJzZSgpLmpvaW4oXCIgLS0+IFwiKTtcbn1cbmZ1bmN0aW9uIGNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uKHJlcXVlc3QpIHtcbiAgICByZXF1ZXN0LmNoaWxkUmVxdWVzdHMuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChhbHJlYWR5RGVwZW5kZW5jeUNoYWluKGNoaWxkUmVxdWVzdCwgY2hpbGRSZXF1ZXN0LnNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgdmFyIHNlcnZpY2VzID0gZGVwZW5kZW5jeUNoYWluVG9TdHJpbmcoY2hpbGRSZXF1ZXN0KTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLkNJUkNVTEFSX0RFUEVOREVOQ1kgKyBcIiBcIiArIHNlcnZpY2VzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uKGNoaWxkUmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuY2lyY3VsYXJEZXBlbmRlbmN5VG9FeGNlcHRpb24gPSBjaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbjtcbmZ1bmN0aW9uIGxpc3RNZXRhZGF0YUZvclRhcmdldChzZXJ2aWNlSWRlbnRpZmllclN0cmluZywgdGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5pc1RhZ2dlZCgpIHx8IHRhcmdldC5pc05hbWVkKCkpIHtcbiAgICAgICAgdmFyIG1fMSA9IFwiXCI7XG4gICAgICAgIHZhciBuYW1lZFRhZyA9IHRhcmdldC5nZXROYW1lZFRhZygpO1xuICAgICAgICB2YXIgb3RoZXJUYWdzID0gdGFyZ2V0LmdldEN1c3RvbVRhZ3MoKTtcbiAgICAgICAgaWYgKG5hbWVkVGFnICE9PSBudWxsKSB7XG4gICAgICAgICAgICBtXzEgKz0gbmFtZWRUYWcudG9TdHJpbmcoKSArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyVGFncyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3RoZXJUYWdzLmZvckVhY2goZnVuY3Rpb24gKHRhZykge1xuICAgICAgICAgICAgICAgIG1fMSArPSB0YWcudG9TdHJpbmcoKSArIFwiXFxuXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCIgXCIgKyBzZXJ2aWNlSWRlbnRpZmllclN0cmluZyArIFwiXFxuIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmcgKyBcIiAtIFwiICsgbV8xO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiIFwiICsgc2VydmljZUlkZW50aWZpZXJTdHJpbmc7XG4gICAgfVxufVxuZXhwb3J0cy5saXN0TWV0YWRhdGFGb3JUYXJnZXQgPSBsaXN0TWV0YWRhdGFGb3JUYXJnZXQ7XG5mdW5jdGlvbiBnZXRGdW5jdGlvbk5hbWUodikge1xuICAgIGlmICh2Lm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHYubmFtZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBuYW1lXzEgPSB2LnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBtYXRjaCA9IG5hbWVfMS5tYXRjaCgvXmZ1bmN0aW9uXFxzKihbXlxccyhdKykvKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBcIkFub255bW91cyBmdW5jdGlvbjogXCIgKyBuYW1lXzE7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRGdW5jdGlvbk5hbWUgPSBnZXRGdW5jdGlvbk5hbWU7XG4iLCIhZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShlKTtlbHNle3ZhciB0O1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/dD13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD90PWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKHQ9c2VsZiksdC5vYmplY3RIYXNoPWUoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIG8odSxhKXtpZighblt1XSl7aWYoIXRbdV0pe3ZhciBmPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWEmJmYpcmV0dXJuIGYodSwhMCk7aWYoaSlyZXR1cm4gaSh1LCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3UrXCInXCIpfXZhciBzPW5bdV09e2V4cG9ydHM6e319O3RbdV1bMF0uY2FsbChzLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFt1XVsxXVtlXTtyZXR1cm4gbyhuP246ZSl9LHMscy5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW3VdLmV4cG9ydHN9Zm9yKHZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsdT0wO3U8ci5sZW5ndGg7dSsrKW8oclt1XSk7cmV0dXJuIG99KHsxOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHIsbyxpLHUsYSxmLHMsYyxsKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBkKGUsdCl7cmV0dXJuIHQ9aChlLHQpLGcoZSx0KX1mdW5jdGlvbiBoKGUsdCl7aWYodD10fHx7fSx0LmFsZ29yaXRobT10LmFsZ29yaXRobXx8XCJzaGExXCIsdC5lbmNvZGluZz10LmVuY29kaW5nfHxcImhleFwiLHQuZXhjbHVkZVZhbHVlcz0hIXQuZXhjbHVkZVZhbHVlcyx0LmFsZ29yaXRobT10LmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpLHQuZW5jb2Rpbmc9dC5lbmNvZGluZy50b0xvd2VyQ2FzZSgpLHQuaWdub3JlVW5rbm93bj10Lmlnbm9yZVVua25vd249PT0hMCx0LnJlc3BlY3RUeXBlPXQucmVzcGVjdFR5cGUhPT0hMSx0LnJlc3BlY3RGdW5jdGlvbk5hbWVzPXQucmVzcGVjdEZ1bmN0aW9uTmFtZXMhPT0hMSx0LnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXM9dC5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzIT09ITEsdC51bm9yZGVyZWRBcnJheXM9dC51bm9yZGVyZWRBcnJheXM9PT0hMCx0LnVub3JkZXJlZFNldHM9dC51bm9yZGVyZWRTZXRzIT09ITEsdC51bm9yZGVyZWRPYmplY3RzPXQudW5vcmRlcmVkT2JqZWN0cyE9PSExLHQucmVwbGFjZXI9dC5yZXBsYWNlcnx8dm9pZCAwLHQuZXhjbHVkZUtleXM9dC5leGNsdWRlS2V5c3x8dm9pZCAwLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcIk9iamVjdCBhcmd1bWVudCByZXF1aXJlZC5cIik7Zm9yKHZhciBuPTA7bjx2Lmxlbmd0aDsrK24pdltuXS50b0xvd2VyQ2FzZSgpPT09dC5hbGdvcml0aG0udG9Mb3dlckNhc2UoKSYmKHQuYWxnb3JpdGhtPXZbbl0pO2lmKHYuaW5kZXhPZih0LmFsZ29yaXRobSk9PT0tMSl0aHJvdyBuZXcgRXJyb3IoJ0FsZ29yaXRobSBcIicrdC5hbGdvcml0aG0rJ1wiICBub3Qgc3VwcG9ydGVkLiBzdXBwb3J0ZWQgdmFsdWVzOiAnK3Yuam9pbihcIiwgXCIpKTtpZihtLmluZGV4T2YodC5lbmNvZGluZyk9PT0tMSYmXCJwYXNzdGhyb3VnaFwiIT09dC5hbGdvcml0aG0pdGhyb3cgbmV3IEVycm9yKCdFbmNvZGluZyBcIicrdC5lbmNvZGluZysnXCIgIG5vdCBzdXBwb3J0ZWQuIHN1cHBvcnRlZCB2YWx1ZXM6ICcrbS5qb2luKFwiLCBcIikpO3JldHVybiB0fWZ1bmN0aW9uIHAoZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSlyZXR1cm4hMTt2YXIgdD0vXmZ1bmN0aW9uXFxzK1xcdypcXHMqXFwoXFxzKlxcKVxccyp7XFxzK1xcW25hdGl2ZSBjb2RlXFxdXFxzK30kL2k7cmV0dXJuIG51bGwhPXQuZXhlYyhGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSl9ZnVuY3Rpb24gZyhlLHQpe3ZhciBuO249XCJwYXNzdGhyb3VnaFwiIT09dC5hbGdvcml0aG0/Yi5jcmVhdGVIYXNoKHQuYWxnb3JpdGhtKTpuZXcgdyxcInVuZGVmaW5lZFwiPT10eXBlb2Ygbi53cml0ZSYmKG4ud3JpdGU9bi51cGRhdGUsbi5lbmQ9bi51cGRhdGUpO3ZhciByPXkodCxuKTtpZihyLmRpc3BhdGNoKGUpLG4udXBkYXRlfHxuLmVuZChcIlwiKSxuLmRpZ2VzdClyZXR1cm4gbi5kaWdlc3QoXCJidWZmZXJcIj09PXQuZW5jb2Rpbmc/dm9pZCAwOnQuZW5jb2RpbmcpO3ZhciBvPW4ucmVhZCgpO3JldHVyblwiYnVmZmVyXCI9PT10LmVuY29kaW5nP286by50b1N0cmluZyh0LmVuY29kaW5nKX1mdW5jdGlvbiB5KGUsdCxuKXtuPW58fFtdO3ZhciByPWZ1bmN0aW9uKGUpe3JldHVybiB0LnVwZGF0ZT90LnVwZGF0ZShlLFwidXRmOFwiKTp0LndyaXRlKGUsXCJ1dGY4XCIpfTtyZXR1cm57ZGlzcGF0Y2g6ZnVuY3Rpb24odCl7ZS5yZXBsYWNlciYmKHQ9ZS5yZXBsYWNlcih0KSk7dmFyIG49dHlwZW9mIHQ7cmV0dXJuIG51bGw9PT10JiYobj1cIm51bGxcIiksdGhpc1tcIl9cIituXSh0KX0sX29iamVjdDpmdW5jdGlvbih0KXt2YXIgbz0vXFxbb2JqZWN0ICguKilcXF0vaSx1PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KSxhPW8uZXhlYyh1KTthPWE/YVsxXTpcInVua25vd246W1wiK3UrXCJdXCIsYT1hLnRvTG93ZXJDYXNlKCk7dmFyIGY9bnVsbDtpZigoZj1uLmluZGV4T2YodCkpPj0wKXJldHVybiB0aGlzLmRpc3BhdGNoKFwiW0NJUkNVTEFSOlwiK2YrXCJdXCIpO2lmKG4ucHVzaCh0KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgaSYmaS5pc0J1ZmZlciYmaS5pc0J1ZmZlcih0KSlyZXR1cm4gcihcImJ1ZmZlcjpcIikscih0KTtpZihcIm9iamVjdFwiPT09YXx8XCJmdW5jdGlvblwiPT09YSl7dmFyIHM9T2JqZWN0LmtleXModCk7ZS51bm9yZGVyZWRPYmplY3RzJiYocz1zLnNvcnQoKSksZS5yZXNwZWN0VHlwZT09PSExfHxwKHQpfHxzLnNwbGljZSgwLDAsXCJwcm90b3R5cGVcIixcIl9fcHJvdG9fX1wiLFwiY29uc3RydWN0b3JcIiksZS5leGNsdWRlS2V5cyYmKHM9cy5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIWUuZXhjbHVkZUtleXModCl9KSkscihcIm9iamVjdDpcIitzLmxlbmd0aCtcIjpcIik7dmFyIGM9dGhpcztyZXR1cm4gcy5mb3JFYWNoKGZ1bmN0aW9uKG4pe2MuZGlzcGF0Y2gobikscihcIjpcIiksZS5leGNsdWRlVmFsdWVzfHxjLmRpc3BhdGNoKHRbbl0pLHIoXCIsXCIpfSl9aWYoIXRoaXNbXCJfXCIrYV0pe2lmKGUuaWdub3JlVW5rbm93bilyZXR1cm4gcihcIltcIithK1wiXVwiKTt0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gb2JqZWN0IHR5cGUgXCInK2ErJ1wiJyl9dGhpc1tcIl9cIithXSh0KX0sX2FycmF5OmZ1bmN0aW9uKHQsbyl7bz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygbz9vOmUudW5vcmRlcmVkQXJyYXlzIT09ITE7dmFyIGk9dGhpcztpZihyKFwiYXJyYXk6XCIrdC5sZW5ndGgrXCI6XCIpLCFvfHx0Lmxlbmd0aDw9MSlyZXR1cm4gdC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBpLmRpc3BhdGNoKGUpfSk7dmFyIHU9W10sYT10Lm1hcChmdW5jdGlvbih0KXt2YXIgcj1uZXcgdyxvPW4uc2xpY2UoKSxpPXkoZSxyLG8pO3JldHVybiBpLmRpc3BhdGNoKHQpLHU9dS5jb25jYXQoby5zbGljZShuLmxlbmd0aCkpLHIucmVhZCgpLnRvU3RyaW5nKCl9KTtyZXR1cm4gbj1uLmNvbmNhdCh1KSxhLnNvcnQoKSx0aGlzLl9hcnJheShhLCExKX0sX2RhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJkYXRlOlwiK2UudG9KU09OKCkpfSxfc3ltYm9sOmZ1bmN0aW9uKGUpe3JldHVybiByKFwic3ltYm9sOlwiK2UudG9TdHJpbmcoKSl9LF9lcnJvcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImVycm9yOlwiK2UudG9TdHJpbmcoKSl9LF9ib29sZWFuOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiYm9vbDpcIitlLnRvU3RyaW5nKCkpfSxfc3RyaW5nOmZ1bmN0aW9uKGUpe3IoXCJzdHJpbmc6XCIrZS5sZW5ndGgrXCI6XCIpLHIoZS50b1N0cmluZygpKX0sX2Z1bmN0aW9uOmZ1bmN0aW9uKHQpe3IoXCJmbjpcIikscCh0KT90aGlzLmRpc3BhdGNoKFwiW25hdGl2ZV1cIik6dGhpcy5kaXNwYXRjaCh0LnRvU3RyaW5nKCkpLGUucmVzcGVjdEZ1bmN0aW9uTmFtZXMhPT0hMSYmdGhpcy5kaXNwYXRjaChcImZ1bmN0aW9uLW5hbWU6XCIrU3RyaW5nKHQubmFtZSkpLGUucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcyYmdGhpcy5fb2JqZWN0KHQpfSxfbnVtYmVyOmZ1bmN0aW9uKGUpe3JldHVybiByKFwibnVtYmVyOlwiK2UudG9TdHJpbmcoKSl9LF94bWw6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ4bWw6XCIrZS50b1N0cmluZygpKX0sX251bGw6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIk51bGxcIil9LF91bmRlZmluZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIlVuZGVmaW5lZFwiKX0sX3JlZ2V4cDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInJlZ2V4OlwiK2UudG9TdHJpbmcoKSl9LF91aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDhhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50OGNsYW1wZWRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4Y2xhbXBlZGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDE2YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MTZhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfZmxvYXQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZmxvYXQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0NjRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImZsb2F0NjRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9hcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImFycmF5YnVmZmVyOlwiKSx0aGlzLmRpc3BhdGNoKG5ldyBVaW50OEFycmF5KGUpKX0sX3VybDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVybDpcIitlLnRvU3RyaW5nKCksXCJ1dGY4XCIpfSxfbWFwOmZ1bmN0aW9uKHQpe3IoXCJtYXA6XCIpO3ZhciBuPUFycmF5LmZyb20odCk7cmV0dXJuIHRoaXMuX2FycmF5KG4sZS51bm9yZGVyZWRTZXRzIT09ITEpfSxfc2V0OmZ1bmN0aW9uKHQpe3IoXCJzZXQ6XCIpO3ZhciBuPUFycmF5LmZyb20odCk7cmV0dXJuIHRoaXMuX2FycmF5KG4sZS51bm9yZGVyZWRTZXRzIT09ITEpfSxfYmxvYjpmdW5jdGlvbigpe2lmKGUuaWdub3JlVW5rbm93bilyZXR1cm4gcihcIltibG9iXVwiKTt0aHJvdyBFcnJvcignSGFzaGluZyBCbG9iIG9iamVjdHMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcXG4oc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wdWxlb3Mvb2JqZWN0LWhhc2gvaXNzdWVzLzI2KVxcblVzZSBcIm9wdGlvbnMucmVwbGFjZXJcIiBvciBcIm9wdGlvbnMuaWdub3JlVW5rbm93blwiXFxuJyl9LF9kb213aW5kb3c6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImRvbXdpbmRvd1wiKX0sX3Byb2Nlc3M6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInByb2Nlc3NcIil9LF90aW1lcjpmdW5jdGlvbigpe3JldHVybiByKFwidGltZXJcIil9LF9waXBlOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJwaXBlXCIpfSxfdGNwOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ0Y3BcIil9LF91ZHA6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInVkcFwiKX0sX3R0eTpmdW5jdGlvbigpe3JldHVybiByKFwidHR5XCIpfSxfc3RhdHdhdGNoZXI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInN0YXR3YXRjaGVyXCIpfSxfc2VjdXJlY29udGV4dDpmdW5jdGlvbigpe3JldHVybiByKFwic2VjdXJlY29udGV4dFwiKX0sX2Nvbm5lY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gcihcImNvbm5lY3Rpb25cIil9LF96bGliOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ6bGliXCIpfSxfY29udGV4dDpmdW5jdGlvbigpe3JldHVybiByKFwiY29udGV4dFwiKX0sX25vZGVzY3JpcHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcIm5vZGVzY3JpcHRcIil9LF9odHRwcGFyc2VyOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJodHRwcGFyc2VyXCIpfSxfZGF0YXZpZXc6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImRhdGF2aWV3XCIpfSxfc2lnbmFsOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJzaWduYWxcIil9LF9mc2V2ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJmc2V2ZW50XCIpfSxfdGxzd3JhcDpmdW5jdGlvbigpe3JldHVybiByKFwidGxzd3JhcFwiKX19fWZ1bmN0aW9uIHcoKXtyZXR1cm57YnVmOlwiXCIsd3JpdGU6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LGVuZDpmdW5jdGlvbihlKXt0aGlzLmJ1Zis9ZX0scmVhZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJ1Zn19fXZhciBiPWUoXCJjcnlwdG9cIik7bj10LmV4cG9ydHM9ZCxuLnNoYTE9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSl9LG4ua2V5cz1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHtleGNsdWRlVmFsdWVzOiEwLGFsZ29yaXRobTpcInNoYTFcIixlbmNvZGluZzpcImhleFwifSl9LG4uTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCJ9KX0sbi5rZXlzTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCIsZXhjbHVkZVZhbHVlczohMH0pfTt2YXIgdj1iLmdldEhhc2hlcz9iLmdldEhhc2hlcygpLnNsaWNlKCk6W1wic2hhMVwiLFwibWQ1XCJdO3YucHVzaChcInBhc3N0aHJvdWdoXCIpO3ZhciBtPVtcImJ1ZmZlclwiLFwiaGV4XCIsXCJiaW5hcnlcIixcImJhc2U2NFwiXTtuLndyaXRlVG9TdHJlYW09ZnVuY3Rpb24oZSx0LG4pe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBuJiYobj10LHQ9e30pLHQ9aChlLHQpLHkodCxuKS5kaXNwYXRjaChlKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlX2U4MTgwZWY1LmpzXCIsXCIvXCIpfSx7YnVmZmVyOjMsY3J5cHRvOjUsbFlwb0kyOjEwfV0sMjpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLHQscixvLGksdSxhLGYscyl7dmFyIGM9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7IWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQoZSl7dmFyIHQ9ZS5jaGFyQ29kZUF0KDApO3JldHVybiB0PT09aXx8dD09PWw/NjI6dD09PXV8fHQ9PT1kPzYzOnQ8YT8tMTp0PGErMTA/dC1hKzI2KzI2OnQ8cysyNj90LXM6dDxmKzI2P3QtZisyNjp2b2lkIDB9ZnVuY3Rpb24gbihlKXtmdW5jdGlvbiBuKGUpe3NbbCsrXT1lfXZhciByLGksdSxhLGYscztpZihlLmxlbmd0aCU0PjApdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNFwiKTt2YXIgYz1lLmxlbmd0aDtmPVwiPVwiPT09ZS5jaGFyQXQoYy0yKT8yOlwiPVwiPT09ZS5jaGFyQXQoYy0xKT8xOjAscz1uZXcgbygzKmUubGVuZ3RoLzQtZiksdT1mPjA/ZS5sZW5ndGgtNDplLmxlbmd0aDt2YXIgbD0wO2ZvcihyPTAsaT0wO3I8dTtyKz00LGkrPTMpYT10KGUuY2hhckF0KHIpKTw8MTh8dChlLmNoYXJBdChyKzEpKTw8MTJ8dChlLmNoYXJBdChyKzIpKTw8Nnx0KGUuY2hhckF0KHIrMykpLG4oKDE2NzExNjgwJmEpPj4xNiksbigoNjUyODAmYSk+PjgpLG4oMjU1JmEpO3JldHVybiAyPT09Zj8oYT10KGUuY2hhckF0KHIpKTw8Mnx0KGUuY2hhckF0KHIrMSkpPj40LG4oMjU1JmEpKToxPT09ZiYmKGE9dChlLmNoYXJBdChyKSk8PDEwfHQoZS5jaGFyQXQocisxKSk8PDR8dChlLmNoYXJBdChyKzIpKT4+MixuKGE+PjgmMjU1KSxuKDI1NSZhKSksc31mdW5jdGlvbiByKGUpe2Z1bmN0aW9uIHQoZSl7cmV0dXJuIGMuY2hhckF0KGUpfWZ1bmN0aW9uIG4oZSl7cmV0dXJuIHQoZT4+MTgmNjMpK3QoZT4+MTImNjMpK3QoZT4+NiY2MykrdCg2MyZlKX12YXIgcixvLGksdT1lLmxlbmd0aCUzLGE9XCJcIjtmb3Iocj0wLGk9ZS5sZW5ndGgtdTtyPGk7cis9MylvPShlW3JdPDwxNikrKGVbcisxXTw8OCkrZVtyKzJdLGErPW4obyk7c3dpdGNoKHUpe2Nhc2UgMTpvPWVbZS5sZW5ndGgtMV0sYSs9dChvPj4yKSxhKz10KG88PDQmNjMpLGErPVwiPT1cIjticmVhaztjYXNlIDI6bz0oZVtlLmxlbmd0aC0yXTw8OCkrZVtlLmxlbmd0aC0xXSxhKz10KG8+PjEwKSxhKz10KG8+PjQmNjMpLGErPXQobzw8MiY2MyksYSs9XCI9XCJ9cmV0dXJuIGF9dmFyIG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXk/VWludDhBcnJheTpBcnJheSxpPVwiK1wiLmNoYXJDb2RlQXQoMCksdT1cIi9cIi5jaGFyQ29kZUF0KDApLGE9XCIwXCIuY2hhckNvZGVBdCgwKSxmPVwiYVwiLmNoYXJDb2RlQXQoMCkscz1cIkFcIi5jaGFyQ29kZUF0KDApLGw9XCItXCIuY2hhckNvZGVBdCgwKSxkPVwiX1wiLmNoYXJDb2RlQXQoMCk7ZS50b0J5dGVBcnJheT1uLGUuZnJvbUJ5dGVBcnJheT1yfShcInVuZGVmaW5lZFwiPT10eXBlb2Ygbj90aGlzLmJhc2U2NGpzPXt9Om4pfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliXCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV0sMzpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbih0LHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbyhlLHQsbil7aWYoISh0aGlzIGluc3RhbmNlb2YgbykpcmV0dXJuIG5ldyBvKGUsdCxuKTt2YXIgcj10eXBlb2YgZTtpZihcImJhc2U2NFwiPT09dCYmXCJzdHJpbmdcIj09PXIpZm9yKGU9TihlKTtlLmxlbmd0aCU0IT09MDspZSs9XCI9XCI7dmFyIGk7aWYoXCJudW1iZXJcIj09PXIpaT1GKGUpO2Vsc2UgaWYoXCJzdHJpbmdcIj09PXIpaT1vLmJ5dGVMZW5ndGgoZSx0KTtlbHNle2lmKFwib2JqZWN0XCIhPT1yKXRocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuXCIpO2k9RihlLmxlbmd0aCl9dmFyIHU7by5fdXNlVHlwZWRBcnJheXM/dT1vLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGkpKToodT10aGlzLHUubGVuZ3RoPWksdS5faXNCdWZmZXI9ITApO3ZhciBhO2lmKG8uX3VzZVR5cGVkQXJyYXlzJiZcIm51bWJlclwiPT10eXBlb2YgZS5ieXRlTGVuZ3RoKXUuX3NldChlKTtlbHNlIGlmKE8oZSkpZm9yKGE9MDthPGk7YSsrKW8uaXNCdWZmZXIoZSk/dVthXT1lLnJlYWRVSW50OChhKTp1W2FdPWVbYV07ZWxzZSBpZihcInN0cmluZ1wiPT09cil1LndyaXRlKGUsMCx0KTtlbHNlIGlmKFwibnVtYmVyXCI9PT1yJiYhby5fdXNlVHlwZWRBcnJheXMmJiFuKWZvcihhPTA7YTxpO2ErKyl1W2FdPTA7cmV0dXJuIHV9ZnVuY3Rpb24gbChlLHQsbixyKXtuPU51bWJlcihuKXx8MDt2YXIgaT1lLmxlbmd0aC1uO3I/KHI9TnVtYmVyKHIpLHI+aSYmKHI9aSkpOnI9aTt2YXIgdT10Lmxlbmd0aDskKHUlMj09PTAsXCJJbnZhbGlkIGhleCBzdHJpbmdcIikscj51LzImJihyPXUvMik7Zm9yKHZhciBhPTA7YTxyO2ErKyl7dmFyIGY9cGFyc2VJbnQodC5zdWJzdHIoMiphLDIpLDE2KTskKCFpc05hTihmKSxcIkludmFsaWQgaGV4IHN0cmluZ1wiKSxlW24rYV09Zn1yZXR1cm4gby5fY2hhcnNXcml0dGVuPTIqYSxhfWZ1bmN0aW9uIGQoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoVih0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gaChlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhxKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiBwKGUsdCxuLHIpe3JldHVybiBoKGUsdCxuLHIpfWZ1bmN0aW9uIGcoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoUih0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24geShlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhQKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiB3KGUsdCxuKXtyZXR1cm4gMD09PXQmJm49PT1lLmxlbmd0aD9HLmZyb21CeXRlQXJyYXkoZSk6Ry5mcm9tQnl0ZUFycmF5KGUuc2xpY2UodCxuKSl9ZnVuY3Rpb24gYihlLHQsbil7dmFyIHI9XCJcIixvPVwiXCI7bj1NYXRoLm1pbihlLmxlbmd0aCxuKTtmb3IodmFyIGk9dDtpPG47aSsrKWVbaV08PTEyNz8ocis9SihvKStTdHJpbmcuZnJvbUNoYXJDb2RlKGVbaV0pLG89XCJcIik6bys9XCIlXCIrZVtpXS50b1N0cmluZygxNik7cmV0dXJuIHIrSihvKX1mdW5jdGlvbiB2KGUsdCxuKXt2YXIgcj1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBvPXQ7bzxuO28rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbb10pO3JldHVybiByfWZ1bmN0aW9uIG0oZSx0LG4pe3JldHVybiB2KGUsdCxuKX1mdW5jdGlvbiBfKGUsdCxuKXt2YXIgcj1lLmxlbmd0aDsoIXR8fHQ8MCkmJih0PTApLCghbnx8bjwwfHxuPnIpJiYobj1yKTtmb3IodmFyIG89XCJcIixpPXQ7aTxuO2krKylvKz1IKGVbaV0pO3JldHVybiBvfWZ1bmN0aW9uIEUoZSx0LG4pe2Zvcih2YXIgcj1lLnNsaWNlKHQsbiksbz1cIlwiLGk9MDtpPHIubGVuZ3RoO2krPTIpbys9U3RyaW5nLmZyb21DaGFyQ29kZShyW2ldKzI1NipyW2krMV0pO3JldHVybiBvfWZ1bmN0aW9uIEkoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk7cmV0dXJuIG4/KGk9ZVt0XSx0KzE8byYmKGl8PWVbdCsxXTw8OCkpOihpPWVbdF08PDgsdCsxPG8mJihpfD1lW3QrMV0pKSxpfX1mdW5jdGlvbiBBKGUsdCxuLHIpe3J8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpO3JldHVybiBuPyh0KzI8byYmKGk9ZVt0KzJdPDwxNiksdCsxPG8mJihpfD1lW3QrMV08PDgpLGl8PWVbdF0sdCszPG8mJihpKz1lW3QrM108PDI0Pj4+MCkpOih0KzE8byYmKGk9ZVt0KzFdPDwxNiksdCsyPG8mJihpfD1lW3QrMl08PDgpLHQrMzxvJiYoaXw9ZVt0KzNdKSxpKz1lW3RdPDwyND4+PjApLGl9fWZ1bmN0aW9uIEIoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk9SShlLHQsbiwhMCksdT0zMjc2OCZpO3JldHVybiB1Pyg2NTUzNS1pKzEpKi0xOml9fWZ1bmN0aW9uIEwoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk9QShlLHQsbiwhMCksdT0yMTQ3NDgzNjQ4Jmk7cmV0dXJuIHU/KDQyOTQ5NjcyOTUtaSsxKSotMTppfX1mdW5jdGlvbiBVKGUsdCxuLHIpe3JldHVybiByfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLFEucmVhZChlLHQsbiwyMyw0KX1mdW5jdGlvbiB4KGUsdCxuLHIpe3JldHVybiByfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodCs3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLFEucmVhZChlLHQsbiw1Miw4KX1mdW5jdGlvbiBTKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzE8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksSyh0LDY1NTM1KSk7dmFyIGk9ZS5sZW5ndGg7aWYoIShuPj1pKSlmb3IodmFyIHU9MCxhPU1hdGgubWluKGktbiwyKTt1PGE7dSsrKWVbbit1XT0odCYyNTU8PDgqKHI/dToxLXUpKT4+PjgqKHI/dToxLXUpfWZ1bmN0aW9uIGooZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMzxlLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxLKHQsNDI5NDk2NzI5NSkpO3ZhciBpPWUubGVuZ3RoO2lmKCEobj49aSkpZm9yKHZhciB1PTAsYT1NYXRoLm1pbihpLW4sNCk7dTxhO3UrKyllW24rdV09dD4+PjgqKHI/dTozLXUpJjI1NX1mdW5jdGlvbiBDKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseih0LDMyNzY3LC0zMjc2OCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fCh0Pj0wP1MoZSx0LG4scixvKTpTKGUsNjU1MzUrdCsxLG4scixvKSl9ZnVuY3Rpb24gayhlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobiszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLHoodCwyMTQ3NDgzNjQ3LC0yMTQ3NDgzNjQ4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8KHQ+PTA/aihlLHQsbixyLG8pOmooZSw0Mjk0OTY3Mjk1K3QrMSxuLHIsbykpfWZ1bmN0aW9uIFQoZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxYKHQsMy40MDI4MjM0NjYzODUyODg2ZTM4LC0zLjQwMjgyMzQ2NjM4NTI4ODZlMzgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHxRLndyaXRlKGUsdCxuLHIsMjMsNCl9ZnVuY3Rpb24gTShlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobis3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFgodCwxLjc5NzY5MzEzNDg2MjMxNTdlMzA4LC0xLjc5NzY5MzEzNDg2MjMxNTdlMzA4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8US53cml0ZShlLHQsbixyLDUyLDgpfWZ1bmN0aW9uIE4oZSl7cmV0dXJuIGUudHJpbT9lLnRyaW0oKTplLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIil9ZnVuY3Rpb24gWShlLHQsbil7cmV0dXJuXCJudW1iZXJcIiE9dHlwZW9mIGU/bjooZT1+fmUsZT49dD90OmU+PTA/ZTooZSs9dCxlPj0wP2U6MCkpfWZ1bmN0aW9uIEYoZSl7cmV0dXJuIGU9fn5NYXRoLmNlaWwoK2UpLGU8MD8wOmV9ZnVuY3Rpb24gRChlKXtyZXR1cm4oQXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfSkoZSl9ZnVuY3Rpb24gTyhlKXtyZXR1cm4gRChlKXx8by5pc0J1ZmZlcihlKXx8ZSYmXCJvYmplY3RcIj09dHlwZW9mIGUmJlwibnVtYmVyXCI9PXR5cGVvZiBlLmxlbmd0aH1mdW5jdGlvbiBIKGUpe3JldHVybiBlPDE2P1wiMFwiK2UudG9TdHJpbmcoMTYpOmUudG9TdHJpbmcoMTYpfWZ1bmN0aW9uIFYoZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZS5jaGFyQ29kZUF0KG4pO2lmKHI8PTEyNyl0LnB1c2goZS5jaGFyQ29kZUF0KG4pKTtlbHNle3ZhciBvPW47cj49NTUyOTYmJnI8PTU3MzQzJiZuKys7Zm9yKHZhciBpPWVuY29kZVVSSUNvbXBvbmVudChlLnNsaWNlKG8sbisxKSkuc3Vic3RyKDEpLnNwbGl0KFwiJVwiKSx1PTA7dTxpLmxlbmd0aDt1KyspdC5wdXNoKHBhcnNlSW50KGlbdV0sMTYpKX19cmV0dXJuIHR9ZnVuY3Rpb24gcShlKXtmb3IodmFyIHQ9W10sbj0wO248ZS5sZW5ndGg7bisrKXQucHVzaCgyNTUmZS5jaGFyQ29kZUF0KG4pKTtyZXR1cm4gdH1mdW5jdGlvbiBQKGUpe2Zvcih2YXIgdCxuLHIsbz1bXSxpPTA7aTxlLmxlbmd0aDtpKyspdD1lLmNoYXJDb2RlQXQoaSksbj10Pj44LHI9dCUyNTYsby5wdXNoKHIpLG8ucHVzaChuKTtyZXR1cm4gb31mdW5jdGlvbiBSKGUpe3JldHVybiBHLnRvQnl0ZUFycmF5KGUpfWZ1bmN0aW9uIFcoZSx0LG4scil7Zm9yKHZhciBvPTA7bzxyJiYhKG8rbj49dC5sZW5ndGh8fG8+PWUubGVuZ3RoKTtvKyspdFtvK25dPWVbb107cmV0dXJuIG99ZnVuY3Rpb24gSihlKXt0cnl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlKX1jYXRjaCh0KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg2NTUzMyl9fWZ1bmN0aW9uIEsoZSx0KXskKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSwkKGU+PTAsXCJzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZVwiKSwkKGU8PXQsXCJ2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlXCIpLCQoTWF0aC5mbG9vcihlKT09PWUsXCJ2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudFwiKX1mdW5jdGlvbiB6KGUsdCxuKXskKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSwkKGU8PXQsXCJ2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcIiksJChlPj1uLFwidmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVwiKSwkKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24gWChlLHQsbil7JChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksJChlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLCQoZT49bixcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIil9ZnVuY3Rpb24gJChlLHQpe2lmKCFlKXRocm93IG5ldyBFcnJvcih0fHxcIkZhaWxlZCBhc3NlcnRpb25cIil9dmFyIEc9ZShcImJhc2U2NC1qc1wiKSxRPWUoXCJpZWVlNzU0XCIpO24uQnVmZmVyPW8sbi5TbG93QnVmZmVyPW8sbi5JTlNQRUNUX01BWF9CWVRFUz01MCxvLnBvb2xTaXplPTgxOTIsby5fdXNlVHlwZWRBcnJheXM9ZnVuY3Rpb24oKXt0cnl7dmFyIGU9bmV3IEFycmF5QnVmZmVyKDApLHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIHQuZm9vPWZ1bmN0aW9uKCl7cmV0dXJuIDQyfSw0Mj09PXQuZm9vKCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuc3ViYXJyYXl9Y2F0Y2gobil7cmV0dXJuITF9fSgpLG8uaXNFbmNvZGluZz1mdW5jdGlvbihlKXtzd2l0Y2goU3RyaW5nKGUpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOmNhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwiYmFzZTY0XCI6Y2FzZVwicmF3XCI6Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LG8uaXNCdWZmZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIShudWxsPT09ZXx8dm9pZCAwPT09ZXx8IWUuX2lzQnVmZmVyKX0sby5ieXRlTGVuZ3RoPWZ1bmN0aW9uKGUsdCl7dmFyIG47c3dpdGNoKGUrPVwiXCIsdHx8XCJ1dGY4XCIpe2Nhc2VcImhleFwiOm49ZS5sZW5ndGgvMjticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpuPVYoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwicmF3XCI6bj1lLmxlbmd0aDticmVhaztjYXNlXCJiYXNlNjRcIjpuPVIoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm49MiplLmxlbmd0aDticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG59LG8uY29uY2F0PWZ1bmN0aW9uKGUsdCl7aWYoJChEKGUpLFwiVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG5saXN0IHNob3VsZCBiZSBhbiBBcnJheS5cIiksMD09PWUubGVuZ3RoKXJldHVybiBuZXcgbygwKTtpZigxPT09ZS5sZW5ndGgpcmV0dXJuIGVbMF07dmFyIG47aWYoXCJudW1iZXJcIiE9dHlwZW9mIHQpZm9yKHQ9MCxuPTA7bjxlLmxlbmd0aDtuKyspdCs9ZVtuXS5sZW5ndGg7dmFyIHI9bmV3IG8odCksaT0wO2ZvcihuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciB1PWVbbl07dS5jb3B5KHIsaSksaSs9dS5sZW5ndGh9cmV0dXJuIHJ9LG8ucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIpe2lmKGlzRmluaXRlKHQpKWlzRmluaXRlKG4pfHwocj1uLG49dm9pZCAwKTtlbHNle3ZhciBvPXI7cj10LHQ9bixuPW99dD1OdW1iZXIodCl8fDA7dmFyIGk9dGhpcy5sZW5ndGgtdDtuPyhuPU51bWJlcihuKSxuPmkmJihuPWkpKTpuPWkscj1TdHJpbmcocnx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCk7dmFyIHU7c3dpdGNoKHIpe2Nhc2VcImhleFwiOnU9bCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjp1PWQodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYXNjaWlcIjp1PWgodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYmluYXJ5XCI6dT1wKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOnU9Zyh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjp1PXkodGhpcyxlLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiB1fSxvLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbihlLHQsbil7dmFyIHI9dGhpcztpZihlPVN0cmluZyhlfHxcInV0ZjhcIikudG9Mb3dlckNhc2UoKSx0PU51bWJlcih0KXx8MCxuPXZvaWQgMCE9PW4/TnVtYmVyKG4pOm49ci5sZW5ndGgsbj09PXQpcmV0dXJuXCJcIjt2YXIgbztzd2l0Y2goZSl7Y2FzZVwiaGV4XCI6bz1fKHIsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpvPWIocix0LG4pO2JyZWFrO2Nhc2VcImFzY2lpXCI6bz12KHIsdCxuKTticmVhaztjYXNlXCJiaW5hcnlcIjpvPW0ocix0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm89dyhyLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6bz1FKHIsdCxuKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG99LG8ucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybnt0eXBlOlwiQnVmZmVyXCIsZGF0YTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnJ8fHRoaXMsMCl9fSxvLnByb3RvdHlwZS5jb3B5PWZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBpPXRoaXM7aWYobnx8KG49MCkscnx8MD09PXJ8fChyPXRoaXMubGVuZ3RoKSx0fHwodD0wKSxyIT09biYmMCE9PWUubGVuZ3RoJiYwIT09aS5sZW5ndGgpeyQocj49bixcInNvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0XCIpLCQodD49MCYmdDxlLmxlbmd0aCxcInRhcmdldFN0YXJ0IG91dCBvZiBib3VuZHNcIiksJChuPj0wJiZuPGkubGVuZ3RoLFwic291cmNlU3RhcnQgb3V0IG9mIGJvdW5kc1wiKSwkKHI+PTAmJnI8PWkubGVuZ3RoLFwic291cmNlRW5kIG91dCBvZiBib3VuZHNcIikscj50aGlzLmxlbmd0aCYmKHI9dGhpcy5sZW5ndGgpLGUubGVuZ3RoLXQ8ci1uJiYocj1lLmxlbmd0aC10K24pO3ZhciB1PXItbjtpZih1PDEwMHx8IW8uX3VzZVR5cGVkQXJyYXlzKWZvcih2YXIgYT0wO2E8dTthKyspZVthK3RdPXRoaXNbYStuXTtlbHNlIGUuX3NldCh0aGlzLnN1YmFycmF5KG4sbit1KSx0KX19LG8ucHJvdG90eXBlLnNsaWNlPWZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5sZW5ndGg7aWYoZT1ZKGUsbiwwKSx0PVkodCxuLG4pLG8uX3VzZVR5cGVkQXJyYXlzKXJldHVybiBvLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoZSx0KSk7Zm9yKHZhciByPXQtZSxpPW5ldyBvKHIsKHZvaWQgMCksKCEwKSksdT0wO3U8cjt1KyspaVt1XT10aGlzW3UrZV07cmV0dXJuIGl9LG8ucHJvdG90eXBlLmdldD1mdW5jdGlvbihlKXtyZXR1cm4gY29uc29sZS5sb2coXCIuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy5yZWFkVUludDgoZSl9LG8ucHJvdG90eXBlLnNldD1mdW5jdGlvbihlLHQpe3JldHVybiBjb25zb2xlLmxvZyhcIi5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLlwiKSx0aGlzLndyaXRlVUludDgoZSx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIG9mZnNldFwiKSwkKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpcmV0dXJuIHRoaXNbZV19LG8ucHJvdG90eXBlLnJlYWRVSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEkodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBBKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEludDg9ZnVuY3Rpb24oZSx0KXtpZih0fHwoJCh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQoZTx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGU+PXRoaXMubGVuZ3RoKSl7dmFyIG49MTI4JnRoaXNbZV07cmV0dXJuIG4/KDI1NS10aGlzW2VdKzEpKi0xOnRoaXNbZV19fSxvLnByb3RvdHlwZS5yZWFkSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBCKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZEludDE2QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQih0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBMKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEZsb2F0TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gVSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRGbG9hdEJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIFUodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkRG91YmxlTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4geCh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWREb3VibGVCRT1mdW5jdGlvbihlLHQpe3JldHVybiB4KHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUud3JpdGVVSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KCQodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIHZhbHVlXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQ8dGhpcy5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksSyhlLDI1NSkpLHQ+PXRoaXMubGVuZ3RofHwodGhpc1t0XT1lKX0sby5wcm90b3R5cGUud3JpdGVVSW50MTZMRT1mdW5jdGlvbihlLHQsbil7Uyh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MTZCRT1mdW5jdGlvbihlLHQsbil7Uyh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MzJMRT1mdW5jdGlvbihlLHQsbil7aih0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVVSW50MzJCRT1mdW5jdGlvbihlLHQsbil7aih0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoJCh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3NpbmcgdmFsdWVcIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodDx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSx6KGUsMTI3LC0xMjgpKSx0Pj10aGlzLmxlbmd0aHx8KGU+PTA/dGhpcy53cml0ZVVJbnQ4KGUsdCxuKTp0aGlzLndyaXRlVUludDgoMjU1K2UrMSx0LG4pKX0sby5wcm90b3R5cGUud3JpdGVJbnQxNkxFPWZ1bmN0aW9uKGUsdCxuKXtDKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe0ModGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlSW50MzJMRT1mdW5jdGlvbihlLHQsbil7ayh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxuKXtrKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZUZsb2F0TEU9ZnVuY3Rpb24oZSx0LG4pe1QodGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlRmxvYXRCRT1mdW5jdGlvbihlLHQsbil7VCh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVEb3VibGVMRT1mdW5jdGlvbihlLHQsbil7TSh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVEb3VibGVCRT1mdW5jdGlvbihlLHQsbil7TSh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUuZmlsbD1mdW5jdGlvbihlLHQsbil7aWYoZXx8KGU9MCksdHx8KHQ9MCksbnx8KG49dGhpcy5sZW5ndGgpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1lLmNoYXJDb2RlQXQoMCkpLCQoXCJudW1iZXJcIj09dHlwZW9mIGUmJiFpc05hTihlKSxcInZhbHVlIGlzIG5vdCBhIG51bWJlclwiKSwkKG4+PXQsXCJlbmQgPCBzdGFydFwiKSxuIT09dCYmMCE9PXRoaXMubGVuZ3RoKXskKHQ+PTAmJnQ8dGhpcy5sZW5ndGgsXCJzdGFydCBvdXQgb2YgYm91bmRzXCIpLCQobj49MCYmbjw9dGhpcy5sZW5ndGgsXCJlbmQgb3V0IG9mIGJvdW5kc1wiKTtmb3IodmFyIHI9dDtyPG47cisrKXRoaXNbcl09ZX19LG8ucHJvdG90eXBlLmluc3BlY3Q9ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD10aGlzLmxlbmd0aCxyPTA7cjx0O3IrKylpZihlW3JdPUgodGhpc1tyXSkscj09PW4uSU5TUEVDVF9NQVhfQllURVMpe2VbcisxXT1cIi4uLlwiO2JyZWFrfXJldHVyblwiPEJ1ZmZlciBcIitlLmpvaW4oXCIgXCIpK1wiPlwifSxvLnByb3RvdHlwZS50b0FycmF5QnVmZmVyPWZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXkpe2lmKG8uX3VzZVR5cGVkQXJyYXlzKXJldHVybiBuZXcgbyh0aGlzKS5idWZmZXI7Zm9yKHZhciBlPW5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKSx0PTAsbj1lLmxlbmd0aDt0PG47dCs9MSllW3RdPXRoaXNbdF07cmV0dXJuIGUuYnVmZmVyfXRocm93IG5ldyBFcnJvcihcIkJ1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpfTt2YXIgWj1vLnByb3RvdHlwZTtvLl9hdWdtZW50PWZ1bmN0aW9uKGUpe3JldHVybiBlLl9pc0J1ZmZlcj0hMCxlLl9nZXQ9ZS5nZXQsZS5fc2V0PWUuc2V0LGUuZ2V0PVouZ2V0LGUuc2V0PVouc2V0LGUud3JpdGU9Wi53cml0ZSxlLnRvU3RyaW5nPVoudG9TdHJpbmcsZS50b0xvY2FsZVN0cmluZz1aLnRvU3RyaW5nLGUudG9KU09OPVoudG9KU09OLGUuY29weT1aLmNvcHksZS5zbGljZT1aLnNsaWNlLGUucmVhZFVJbnQ4PVoucmVhZFVJbnQ4LGUucmVhZFVJbnQxNkxFPVoucmVhZFVJbnQxNkxFLGUucmVhZFVJbnQxNkJFPVoucmVhZFVJbnQxNkJFLGUucmVhZFVJbnQzMkxFPVoucmVhZFVJbnQzMkxFLGUucmVhZFVJbnQzMkJFPVoucmVhZFVJbnQzMkJFLGUucmVhZEludDg9Wi5yZWFkSW50OCxlLnJlYWRJbnQxNkxFPVoucmVhZEludDE2TEUsZS5yZWFkSW50MTZCRT1aLnJlYWRJbnQxNkJFLGUucmVhZEludDMyTEU9Wi5yZWFkSW50MzJMRSxlLnJlYWRJbnQzMkJFPVoucmVhZEludDMyQkUsZS5yZWFkRmxvYXRMRT1aLnJlYWRGbG9hdExFLGUucmVhZEZsb2F0QkU9Wi5yZWFkRmxvYXRCRSxlLnJlYWREb3VibGVMRT1aLnJlYWREb3VibGVMRSxlLnJlYWREb3VibGVCRT1aLnJlYWREb3VibGVCRSxlLndyaXRlVUludDg9Wi53cml0ZVVJbnQ4LGUud3JpdGVVSW50MTZMRT1aLndyaXRlVUludDE2TEUsZS53cml0ZVVJbnQxNkJFPVoud3JpdGVVSW50MTZCRSxlLndyaXRlVUludDMyTEU9Wi53cml0ZVVJbnQzMkxFLGUud3JpdGVVSW50MzJCRT1aLndyaXRlVUludDMyQkUsZS53cml0ZUludDg9Wi53cml0ZUludDgsZS53cml0ZUludDE2TEU9Wi53cml0ZUludDE2TEUsZS53cml0ZUludDE2QkU9Wi53cml0ZUludDE2QkUsZS53cml0ZUludDMyTEU9Wi53cml0ZUludDMyTEUsZS53cml0ZUludDMyQkU9Wi53cml0ZUludDMyQkUsZS53cml0ZUZsb2F0TEU9Wi53cml0ZUZsb2F0TEUsZS53cml0ZUZsb2F0QkU9Wi53cml0ZUZsb2F0QkUsZS53cml0ZURvdWJsZUxFPVoud3JpdGVEb3VibGVMRSxlLndyaXRlRG91YmxlQkU9Wi53cml0ZURvdWJsZUJFLGUuZmlsbD1aLmZpbGwsZS5pbnNwZWN0PVouaW5zcGVjdCxlLnRvQXJyYXlCdWZmZXI9Wi50b0FycmF5QnVmZmVyLGV9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpfSx7XCJiYXNlNjQtanNcIjoyLGJ1ZmZlcjozLGllZWU3NTQ6MTEsbFlwb0kyOjEwfV0sNDpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2lmKGUubGVuZ3RoJXAhPT0wKXt2YXIgbj1lLmxlbmd0aCsocC1lLmxlbmd0aCVwKTtlPW8uY29uY2F0KFtlLGddLG4pfWZvcih2YXIgcj1bXSxpPXQ/ZS5yZWFkSW50MzJCRTplLnJlYWRJbnQzMkxFLHU9MDt1PGUubGVuZ3RoO3UrPXApci5wdXNoKGkuY2FsbChlLHUpKTtyZXR1cm4gcn1mdW5jdGlvbiBkKGUsdCxuKXtmb3IodmFyIHI9bmV3IG8odCksaT1uP3Iud3JpdGVJbnQzMkJFOnIud3JpdGVJbnQzMkxFLHU9MDt1PGUubGVuZ3RoO3UrKylpLmNhbGwocixlW3VdLDQqdSwhMCk7cmV0dXJuIHJ9ZnVuY3Rpb24gaChlLHQsbixyKXtvLmlzQnVmZmVyKGUpfHwoZT1uZXcgbyhlKSk7dmFyIGk9dChsKGUsciksZS5sZW5ndGgqeSk7cmV0dXJuIGQoaSxuLHIpfXZhciBvPWUoXCJidWZmZXJcIikuQnVmZmVyLHA9NCxnPW5ldyBvKHApO2cuZmlsbCgwKTt2YXIgeT04O3QuZXhwb3J0cz17aGFzaDpofX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2hlbHBlcnMuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDU6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCxyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0LG4pe28uaXNCdWZmZXIodCl8fCh0PW5ldyBvKHQpKSxvLmlzQnVmZmVyKG4pfHwobj1uZXcgbyhuKSksdC5sZW5ndGg+bT90PWUodCk6dC5sZW5ndGg8bSYmKHQ9by5jb25jYXQoW3QsX10sbSkpO2Zvcih2YXIgcj1uZXcgbyhtKSxpPW5ldyBvKG0pLHU9MDt1PG07dSsrKXJbdV09NTRedFt1XSxpW3VdPTkyXnRbdV07dmFyIGE9ZShvLmNvbmNhdChbcixuXSkpO3JldHVybiBlKG8uY29uY2F0KFtpLGFdKSl9ZnVuY3Rpb24gZChlLHQpe2U9ZXx8XCJzaGExXCI7dmFyIG49dltlXSxyPVtdLGk9MDtyZXR1cm4gbnx8aChcImFsZ29yaXRobTpcIixlLFwiaXMgbm90IHlldCBzdXBwb3J0ZWRcIikse3VwZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gby5pc0J1ZmZlcihlKXx8KGU9bmV3IG8oZSkpLHIucHVzaChlKSxpKz1lLmxlbmd0aCx0aGlzfSxkaWdlc3Q6ZnVuY3Rpb24oZSl7dmFyIGk9by5jb25jYXQociksdT10P2wobix0LGkpOm4oaSk7cmV0dXJuIHI9bnVsbCxlP3UudG9TdHJpbmcoZSk6dX19fWZ1bmN0aW9uIGgoKXt2YXIgZT1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbihcIiBcIik7dGhyb3cgbmV3IEVycm9yKFtlLFwid2UgYWNjZXB0IHB1bGwgcmVxdWVzdHNcIixcImh0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5XCJdLmpvaW4oXCJcXG5cIikpfWZ1bmN0aW9uIHAoZSx0KXtmb3IodmFyIG4gaW4gZSl0KGVbbl0sbil9dmFyIG89ZShcImJ1ZmZlclwiKS5CdWZmZXIsZz1lKFwiLi9zaGFcIikseT1lKFwiLi9zaGEyNTZcIiksdz1lKFwiLi9ybmdcIiksYj1lKFwiLi9tZDVcIiksdj17c2hhMTpnLHNoYTI1Njp5LG1kNTpifSxtPTY0LF89bmV3IG8obSk7Xy5maWxsKDApLG4uY3JlYXRlSGFzaD1mdW5jdGlvbihlKXtyZXR1cm4gZChlKX0sbi5jcmVhdGVIbWFjPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGQoZSx0KX0sbi5yYW5kb21CeXRlcz1mdW5jdGlvbihlLHQpe2lmKCF0fHwhdC5jYWxsKXJldHVybiBuZXcgbyh3KGUpKTt0cnl7dC5jYWxsKHRoaXMsdm9pZCAwLG5ldyBvKHcoZSkpKX1jYXRjaChuKXt0KG4pfX0scChbXCJjcmVhdGVDcmVkZW50aWFsc1wiLFwiY3JlYXRlQ2lwaGVyXCIsXCJjcmVhdGVDaXBoZXJpdlwiLFwiY3JlYXRlRGVjaXBoZXJcIixcImNyZWF0ZURlY2lwaGVyaXZcIixcImNyZWF0ZVNpZ25cIixcImNyZWF0ZVZlcmlmeVwiLFwiY3JlYXRlRGlmZmllSGVsbG1hblwiLFwicGJrZGYyXCJdLGZ1bmN0aW9uKGUpe25bZV09ZnVuY3Rpb24oKXtoKFwic29ycnksXCIsZSxcImlzIG5vdCBpbXBsZW1lbnRlZCB5ZXRcIil9fSl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL21kNVwiOjYsXCIuL3JuZ1wiOjcsXCIuL3NoYVwiOjgsXCIuL3NoYTI1NlwiOjksYnVmZmVyOjMsbFlwb0kyOjEwfV0sNjpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2VbdD4+NV18PTEyODw8dCUzMixlWyh0KzY0Pj4+OTw8NCkrMTRdPXQ7Zm9yKHZhciBuPTE3MzI1ODQxOTMscj0tMjcxNzMzODc5LG89LTE3MzI1ODQxOTQsaT0yNzE3MzM4NzgsdT0wO3U8ZS5sZW5ndGg7dSs9MTYpe3ZhciBhPW4sZj1yLHM9byxjPWk7bj1oKG4scixvLGksZVt1KzBdLDcsLTY4MDg3NjkzNiksaT1oKGksbixyLG8sZVt1KzFdLDEyLC0zODk1NjQ1ODYpLG89aChvLGksbixyLGVbdSsyXSwxNyw2MDYxMDU4MTkpLHI9aChyLG8saSxuLGVbdSszXSwyMiwtMTA0NDUyNTMzMCksbj1oKG4scixvLGksZVt1KzRdLDcsLTE3NjQxODg5NyksaT1oKGksbixyLG8sZVt1KzVdLDEyLDEyMDAwODA0MjYpLG89aChvLGksbixyLGVbdSs2XSwxNywtMTQ3MzIzMTM0MSkscj1oKHIsbyxpLG4sZVt1KzddLDIyLC00NTcwNTk4Myksbj1oKG4scixvLGksZVt1KzhdLDcsMTc3MDAzNTQxNiksaT1oKGksbixyLG8sZVt1KzldLDEyLC0xOTU4NDE0NDE3KSxvPWgobyxpLG4scixlW3UrMTBdLDE3LC00MjA2Mykscj1oKHIsbyxpLG4sZVt1KzExXSwyMiwtMTk5MDQwNDE2Miksbj1oKG4scixvLGksZVt1KzEyXSw3LDE4MDQ2MDM2ODIpLGk9aChpLG4scixvLGVbdSsxM10sMTIsLTQwMzQxMTAxKSxvPWgobyxpLG4scixlW3UrMTRdLDE3LC0xNTAyMDAyMjkwKSxyPWgocixvLGksbixlW3UrMTVdLDIyLDEyMzY1MzUzMjkpLG49cChuLHIsbyxpLGVbdSsxXSw1LC0xNjU3OTY1MTApLGk9cChpLG4scixvLGVbdSs2XSw5LC0xMDY5NTAxNjMyKSxvPXAobyxpLG4scixlW3UrMTFdLDE0LDY0MzcxNzcxMykscj1wKHIsbyxpLG4sZVt1KzBdLDIwLC0zNzM4OTczMDIpLG49cChuLHIsbyxpLGVbdSs1XSw1LC03MDE1NTg2OTEpLGk9cChpLG4scixvLGVbdSsxMF0sOSwzODAxNjA4Myksbz1wKG8saSxuLHIsZVt1KzE1XSwxNCwtNjYwNDc4MzM1KSxyPXAocixvLGksbixlW3UrNF0sMjAsLTQwNTUzNzg0OCksbj1wKG4scixvLGksZVt1KzldLDUsNTY4NDQ2NDM4KSxpPXAoaSxuLHIsbyxlW3UrMTRdLDksLTEwMTk4MDM2OTApLG89cChvLGksbixyLGVbdSszXSwxNCwtMTg3MzYzOTYxKSxyPXAocixvLGksbixlW3UrOF0sMjAsMTE2MzUzMTUwMSksbj1wKG4scixvLGksZVt1KzEzXSw1LC0xNDQ0NjgxNDY3KSxpPXAoaSxuLHIsbyxlW3UrMl0sOSwtNTE0MDM3ODQpLG89cChvLGksbixyLGVbdSs3XSwxNCwxNzM1MzI4NDczKSxyPXAocixvLGksbixlW3UrMTJdLDIwLC0xOTI2NjA3NzM0KSxuPWcobixyLG8saSxlW3UrNV0sNCwtMzc4NTU4KSxpPWcoaSxuLHIsbyxlW3UrOF0sMTEsLTIwMjI1NzQ0NjMpLG89ZyhvLGksbixyLGVbdSsxMV0sMTYsMTgzOTAzMDU2Mikscj1nKHIsbyxpLG4sZVt1KzE0XSwyMywtMzUzMDk1NTYpLG49ZyhuLHIsbyxpLGVbdSsxXSw0LC0xNTMwOTkyMDYwKSxpPWcoaSxuLHIsbyxlW3UrNF0sMTEsMTI3Mjg5MzM1Myksbz1nKG8saSxuLHIsZVt1KzddLDE2LC0xNTU0OTc2MzIpLHI9ZyhyLG8saSxuLGVbdSsxMF0sMjMsLTEwOTQ3MzA2NDApLG49ZyhuLHIsbyxpLGVbdSsxM10sNCw2ODEyNzkxNzQpLGk9ZyhpLG4scixvLGVbdSswXSwxMSwtMzU4NTM3MjIyKSxvPWcobyxpLG4scixlW3UrM10sMTYsLTcyMjUyMTk3OSkscj1nKHIsbyxpLG4sZVt1KzZdLDIzLDc2MDI5MTg5KSxuPWcobixyLG8saSxlW3UrOV0sNCwtNjQwMzY0NDg3KSxpPWcoaSxuLHIsbyxlW3UrMTJdLDExLC00MjE4MTU4MzUpLG89ZyhvLGksbixyLGVbdSsxNV0sMTYsNTMwNzQyNTIwKSxyPWcocixvLGksbixlW3UrMl0sMjMsLTk5NTMzODY1MSksbj15KG4scixvLGksZVt1KzBdLDYsLTE5ODYzMDg0NCksaT15KGksbixyLG8sZVt1KzddLDEwLDExMjY4OTE0MTUpLG89eShvLGksbixyLGVbdSsxNF0sMTUsLTE0MTYzNTQ5MDUpLHI9eShyLG8saSxuLGVbdSs1XSwyMSwtNTc0MzQwNTUpLG49eShuLHIsbyxpLGVbdSsxMl0sNiwxNzAwNDg1NTcxKSxpPXkoaSxuLHIsbyxlW3UrM10sMTAsLTE4OTQ5ODY2MDYpLG89eShvLGksbixyLGVbdSsxMF0sMTUsLTEwNTE1MjMpLHI9eShyLG8saSxuLGVbdSsxXSwyMSwtMjA1NDkyMjc5OSksbj15KG4scixvLGksZVt1KzhdLDYsMTg3MzMxMzM1OSksaT15KGksbixyLG8sZVt1KzE1XSwxMCwtMzA2MTE3NDQpLG89eShvLGksbixyLGVbdSs2XSwxNSwtMTU2MDE5ODM4MCkscj15KHIsbyxpLG4sZVt1KzEzXSwyMSwxMzA5MTUxNjQ5KSxuPXkobixyLG8saSxlW3UrNF0sNiwtMTQ1NTIzMDcwKSxpPXkoaSxuLHIsbyxlW3UrMTFdLDEwLC0xMTIwMjEwMzc5KSxvPXkobyxpLG4scixlW3UrMl0sMTUsNzE4Nzg3MjU5KSxyPXkocixvLGksbixlW3UrOV0sMjEsLTM0MzQ4NTU1MSksbj13KG4sYSkscj13KHIsZiksbz13KG8scyksaT13KGksYyl9cmV0dXJuIEFycmF5KG4scixvLGkpfWZ1bmN0aW9uIGQoZSx0LG4scixvLGkpe3JldHVybiB3KGIodyh3KHQsZSksdyhyLGkpKSxvKSxuKX1mdW5jdGlvbiBoKGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKHQmbnx+dCZyLGUsdCxvLGksdSl9ZnVuY3Rpb24gcChlLHQsbixyLG8saSx1KXtyZXR1cm4gZCh0JnJ8biZ+cixlLHQsbyxpLHUpfWZ1bmN0aW9uIGcoZSx0LG4scixvLGksdSl7cmV0dXJuIGQodF5uXnIsZSx0LG8saSx1KX1mdW5jdGlvbiB5KGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKG5eKHR8fnIpLGUsdCxvLGksdSl9ZnVuY3Rpb24gdyhlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn1mdW5jdGlvbiBiKGUsdCl7cmV0dXJuIGU8PHR8ZT4+PjMyLXR9dmFyIHY9ZShcIi4vaGVscGVyc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHYuaGFzaChlLGwsMTYpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L21kNS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDc6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSxuLHIsbyxpLHUsYSxmLHMpeyFmdW5jdGlvbigpe3ZhciBlLG4scj10aGlzO2U9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHQsbj1uZXcgQXJyYXkoZSkscj0wO3I8ZTtyKyspMD09KDMmcikmJih0PTQyOTQ5NjcyOTYqTWF0aC5yYW5kb20oKSksbltyXT10Pj4+KCgzJnIpPDwzKSYyNTU7cmV0dXJuIG59LHIuY3J5cHRvJiZjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzJiYobj1mdW5jdGlvbihlKXt2YXIgdD1uZXcgVWludDhBcnJheShlKTtyZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh0KSx0fSksdC5leHBvcnRzPW58fGV9KCl9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9ybmcuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDg6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtlW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsodCs2ND4+OTw8NCkrMTVdPXQ7Zm9yKHZhciBuPUFycmF5KDgwKSxyPTE3MzI1ODQxOTMsbz0tMjcxNzMzODc5LGk9LTE3MzI1ODQxOTQsdT0yNzE3MzM4NzgsYT0tMTAwOTU4OTc3NixmPTA7ZjxlLmxlbmd0aDtmKz0xNil7Zm9yKHZhciBzPXIsYz1vLGw9aSx5PXUsdz1hLGI9MDtiPDgwO2IrKyl7YjwxNj9uW2JdPWVbZitiXTpuW2JdPWcobltiLTNdXm5bYi04XV5uW2ItMTRdXm5bYi0xNl0sMSk7dmFyIHY9cChwKGcociw1KSxkKGIsbyxpLHUpKSxwKHAoYSxuW2JdKSxoKGIpKSk7YT11LHU9aSxpPWcobywzMCksbz1yLHI9dn1yPXAocixzKSxvPXAobyxjKSxpPXAoaSxsKSx1PXAodSx5KSxhPXAoYSx3KX1yZXR1cm4gQXJyYXkocixvLGksdSxhKX1mdW5jdGlvbiBkKGUsdCxuLHIpe3JldHVybiBlPDIwP3Qmbnx+dCZyOmU8NDA/dF5uXnI6ZTw2MD90Jm58dCZyfG4mcjp0Xm5ecn1mdW5jdGlvbiBoKGUpe3JldHVybiBlPDIwPzE1MTg1MDAyNDk6ZTw0MD8xODU5Nzc1MzkzOmU8NjA/LTE4OTQwMDc1ODg6LTg5OTQ5NzUxNH1mdW5jdGlvbiBwKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufWZ1bmN0aW9uIGcoZSx0KXtyZXR1cm4gZTw8dHxlPj4+MzItdH12YXIgeT1lKFwiLi9oZWxwZXJzXCIpO3QuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4geS5oYXNoKGUsbCwyMCwhMCl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjEwfV0sOTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7dmFyIGw9ZShcIi4vaGVscGVyc1wiKSxkPWZ1bmN0aW9uKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufSxoPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fGU8PDMyLXR9LHA9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+PnR9LGc9ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlJnRefmUmbn0seT1mdW5jdGlvbihlLHQsbil7cmV0dXJuIGUmdF5lJm5edCZufSx3PWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsMileaChlLDEzKV5oKGUsMjIpO1xufSxiPWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsNileaChlLDExKV5oKGUsMjUpfSx2PWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsNyleaChlLDE4KV5wKGUsMyl9LG09ZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSwxNyleaChlLDE5KV5wKGUsMTApfSxfPWZ1bmN0aW9uKGUsdCl7dmFyIG4scixvLGksdSxhLGYscyxjLGwsaCxwLF89bmV3IEFycmF5KDExMTYzNTI0MDgsMTg5OTQ0NzQ0MSwzMDQ5MzIzNDcxLDM5MjEwMDk1NzMsOTYxOTg3MTYzLDE1MDg5NzA5OTMsMjQ1MzYzNTc0OCwyODcwNzYzMjIxLDM2MjQzODEwODAsMzEwNTk4NDAxLDYwNzIyNTI3OCwxNDI2ODgxOTg3LDE5MjUwNzgzODgsMjE2MjA3ODIwNiwyNjE0ODg4MTAzLDMyNDgyMjI1ODAsMzgzNTM5MDQwMSw0MDIyMjI0Nzc0LDI2NDM0NzA3OCw2MDQ4MDc2MjgsNzcwMjU1OTgzLDEyNDkxNTAxMjIsMTU1NTA4MTY5MiwxOTk2MDY0OTg2LDI1NTQyMjA4ODIsMjgyMTgzNDM0OSwyOTUyOTk2ODA4LDMyMTAzMTM2NzEsMzMzNjU3MTg5MSwzNTg0NTI4NzExLDExMzkyNjk5MywzMzgyNDE4OTUsNjY2MzA3MjA1LDc3MzUyOTkxMiwxMjk0NzU3MzcyLDEzOTYxODIyOTEsMTY5NTE4MzcwMCwxOTg2NjYxMDUxLDIxNzcwMjYzNTAsMjQ1Njk1NjAzNywyNzMwNDg1OTIxLDI4MjAzMDI0MTEsMzI1OTczMDgwMCwzMzQ1NzY0NzcxLDM1MTYwNjU4MTcsMzYwMDM1MjgwNCw0MDk0NTcxOTA5LDI3NTQyMzM0NCw0MzAyMjc3MzQsNTA2OTQ4NjE2LDY1OTA2MDU1Niw4ODM5OTc4NzcsOTU4MTM5NTcxLDEzMjI4MjIyMTgsMTUzNzAwMjA2MywxNzQ3ODczNzc5LDE5NTU1NjIyMjIsMjAyNDEwNDgxNSwyMjI3NzMwNDUyLDIzNjE4NTI0MjQsMjQyODQzNjQ3NCwyNzU2NzM0MTg3LDMyMDQwMzE0NzksMzMyOTMyNTI5OCksRT1uZXcgQXJyYXkoMTc3OTAzMzcwMywzMTQ0MTM0Mjc3LDEwMTM5MDQyNDIsMjc3MzQ4MDc2MiwxMzU5ODkzMTE5LDI2MDA4MjI5MjQsNTI4NzM0NjM1LDE1NDE0NTkyMjUpLEk9bmV3IEFycmF5KDY0KTtlW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsodCs2ND4+OTw8NCkrMTVdPXQ7Zm9yKHZhciBjPTA7YzxlLmxlbmd0aDtjKz0xNil7bj1FWzBdLHI9RVsxXSxvPUVbMl0saT1FWzNdLHU9RVs0XSxhPUVbNV0sZj1FWzZdLHM9RVs3XTtmb3IodmFyIGw9MDtsPDY0O2wrKylsPDE2P0lbbF09ZVtsK2NdOklbbF09ZChkKGQobShJW2wtMl0pLElbbC03XSksdihJW2wtMTVdKSksSVtsLTE2XSksaD1kKGQoZChkKHMsYih1KSksZyh1LGEsZikpLF9bbF0pLElbbF0pLHA9ZCh3KG4pLHkobixyLG8pKSxzPWYsZj1hLGE9dSx1PWQoaSxoKSxpPW8sbz1yLHI9bixuPWQoaCxwKTtFWzBdPWQobixFWzBdKSxFWzFdPWQocixFWzFdKSxFWzJdPWQobyxFWzJdKSxFWzNdPWQoaSxFWzNdKSxFWzRdPWQodSxFWzRdKSxFWzVdPWQoYSxFWzVdKSxFWzZdPWQoZixFWzZdKSxFWzddPWQocyxFWzddKX1yZXR1cm4gRX07dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBsLmhhc2goZSxfLDMyLCEwKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSwxMDpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLG4scixvLGksdSxhLGYscyl7ZnVuY3Rpb24gYygpe312YXIgZT10LmV4cG9ydHM9e307ZS5uZXh0VGljaz1mdW5jdGlvbigpe3ZhciBlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5zZXRJbW1lZGlhdGUsdD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cucG9zdE1lc3NhZ2UmJndpbmRvdy5hZGRFdmVudExpc3RlbmVyO2lmKGUpcmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGUpfTtpZih0KXt2YXIgbj1bXTtyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zb3VyY2U7aWYoKHQ9PT13aW5kb3d8fG51bGw9PT10KSYmXCJwcm9jZXNzLXRpY2tcIj09PWUuZGF0YSYmKGUuc3RvcFByb3BhZ2F0aW9uKCksbi5sZW5ndGg+MCkpe3ZhciByPW4uc2hpZnQoKTtyKCl9fSwhMCksZnVuY3Rpb24oZSl7bi5wdXNoKGUpLHdpbmRvdy5wb3N0TWVzc2FnZShcInByb2Nlc3MtdGlja1wiLFwiKlwiKX19cmV0dXJuIGZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoZSwwKX19KCksZS50aXRsZT1cImJyb3dzZXJcIixlLmJyb3dzZXI9ITAsZS5lbnY9e30sZS5hcmd2PVtdLGUub249YyxlLmFkZExpc3RlbmVyPWMsZS5vbmNlPWMsZS5vZmY9YyxlLnJlbW92ZUxpc3RlbmVyPWMsZS5yZW1vdmVBbGxMaXN0ZW5lcnM9YyxlLmVtaXQ9YyxlLmJpbmRpbmc9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIil9LGUuY3dkPWZ1bmN0aW9uKCl7cmV0dXJuXCIvXCJ9LGUuY2hkaXI9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkXCIpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3NcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSwxMTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLHQscixvLGksdSxhLGYscyl7bi5yZWFkPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIGksdSxhPTgqby1yLTEsZj0oMTw8YSktMSxzPWY+PjEsYz0tNyxsPW4/by0xOjAsZD1uPy0xOjEsaD1lW3QrbF07Zm9yKGwrPWQsaT1oJigxPDwtYyktMSxoPj49LWMsYys9YTtjPjA7aT0yNTYqaStlW3QrbF0sbCs9ZCxjLT04KTtmb3IodT1pJigxPDwtYyktMSxpPj49LWMsYys9cjtjPjA7dT0yNTYqdStlW3QrbF0sbCs9ZCxjLT04KTtpZigwPT09aSlpPTEtcztlbHNle2lmKGk9PT1mKXJldHVybiB1P05hTjooaD8tMToxKSooMS8wKTt1Kz1NYXRoLnBvdygyLHIpLGktPXN9cmV0dXJuKGg/LTE6MSkqdSpNYXRoLnBvdygyLGktcil9LG4ud3JpdGU9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciB1LGEsZixzPTgqaS1vLTEsYz0oMTw8cyktMSxsPWM+PjEsZD0yMz09PW8/TWF0aC5wb3coMiwtMjQpLU1hdGgucG93KDIsLTc3KTowLGg9cj8wOmktMSxwPXI/MTotMSxnPXQ8MHx8MD09PXQmJjEvdDwwPzE6MDtmb3IodD1NYXRoLmFicyh0KSxpc05hTih0KXx8dD09PTEvMD8oYT1pc05hTih0KT8xOjAsdT1jKToodT1NYXRoLmZsb29yKE1hdGgubG9nKHQpL01hdGguTE4yKSx0KihmPU1hdGgucG93KDIsLXUpKTwxJiYodS0tLGYqPTIpLHQrPXUrbD49MT9kL2Y6ZCpNYXRoLnBvdygyLDEtbCksdCpmPj0yJiYodSsrLGYvPTIpLHUrbD49Yz8oYT0wLHU9Yyk6dStsPj0xPyhhPSh0KmYtMSkqTWF0aC5wb3coMixvKSx1Kz1sKTooYT10Kk1hdGgucG93KDIsbC0xKSpNYXRoLnBvdygyLG8pLHU9MCkpO28+PTg7ZVtuK2hdPTI1NSZhLGgrPXAsYS89MjU2LG8tPTgpO2Zvcih1PXU8PG98YSxzKz1vO3M+MDtlW24raF09MjU1JnUsaCs9cCx1Lz0yNTYscy09OCk7ZVtuK2gtcF18PTEyOCpnfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2llZWU3NTRcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XX0se30sWzFdKSgxKX0pOyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChDKSBNaWNyb3NvZnQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG52YXIgUmVmbGVjdDtcclxuKGZ1bmN0aW9uIChSZWZsZWN0KSB7XHJcbiAgICAvLyBNZXRhZGF0YSBQcm9wb3NhbFxyXG4gICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS9cclxuICAgIChmdW5jdGlvbiAoZmFjdG9yeSkge1xyXG4gICAgICAgIHZhciByb290ID0gdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XHJcbiAgICAgICAgICAgIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6XHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcyA9PT0gXCJvYmplY3RcIiA/IHRoaXMgOlxyXG4gICAgICAgICAgICAgICAgICAgIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXM7XCIpKCk7XHJcbiAgICAgICAgdmFyIGV4cG9ydGVyID0gbWFrZUV4cG9ydGVyKFJlZmxlY3QpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygcm9vdC5SZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJvb3QuUmVmbGVjdCA9IFJlZmxlY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBleHBvcnRlciA9IG1ha2VFeHBvcnRlcihyb290LlJlZmxlY3QsIGV4cG9ydGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmFjdG9yeShleHBvcnRlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gbWFrZUV4cG9ydGVyKHRhcmdldCwgcHJldmlvdXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHsgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzKVxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pKGZ1bmN0aW9uIChleHBvcnRlcikge1xyXG4gICAgICAgIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG4gICAgICAgIC8vIGZlYXR1cmUgdGVzdCBmb3IgU3ltYm9sIHN1cHBvcnRcclxuICAgICAgICB2YXIgc3VwcG9ydHNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCI7XHJcbiAgICAgICAgdmFyIHRvUHJpbWl0aXZlU3ltYm9sID0gc3VwcG9ydHNTeW1ib2wgJiYgdHlwZW9mIFN5bWJvbC50b1ByaW1pdGl2ZSAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbC50b1ByaW1pdGl2ZSA6IFwiQEB0b1ByaW1pdGl2ZVwiO1xyXG4gICAgICAgIHZhciBpdGVyYXRvclN5bWJvbCA9IHN1cHBvcnRzU3ltYm9sICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wuaXRlcmF0b3IgOiBcIkBAaXRlcmF0b3JcIjtcclxuICAgICAgICB2YXIgc3VwcG9ydHNDcmVhdGUgPSB0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiOyAvLyBmZWF0dXJlIHRlc3QgZm9yIE9iamVjdC5jcmVhdGUgc3VwcG9ydFxyXG4gICAgICAgIHZhciBzdXBwb3J0c1Byb3RvID0geyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheTsgLy8gZmVhdHVyZSB0ZXN0IGZvciBfX3Byb3RvX18gc3VwcG9ydFxyXG4gICAgICAgIHZhciBkb3duTGV2ZWwgPSAhc3VwcG9ydHNDcmVhdGUgJiYgIXN1cHBvcnRzUHJvdG87XHJcbiAgICAgICAgdmFyIEhhc2hNYXAgPSB7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBvYmplY3QgaW4gZGljdGlvbmFyeSBtb2RlIChhLmsuYS4gXCJzbG93XCIgbW9kZSBpbiB2OClcclxuICAgICAgICAgICAgY3JlYXRlOiBzdXBwb3J0c0NyZWF0ZVxyXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeShPYmplY3QuY3JlYXRlKG51bGwpKTsgfVxyXG4gICAgICAgICAgICAgICAgOiBzdXBwb3J0c1Byb3RvXHJcbiAgICAgICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeSh7IF9fcHJvdG9fXzogbnVsbCB9KTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoe30pOyB9LFxyXG4gICAgICAgICAgICBoYXM6IGRvd25MZXZlbFxyXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGhhc093bi5jYWxsKG1hcCwga2V5KTsgfVxyXG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGtleSBpbiBtYXA7IH0sXHJcbiAgICAgICAgICAgIGdldDogZG93bkxldmVsXHJcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwobWFwLCBrZXkpID8gbWFwW2tleV0gOiB1bmRlZmluZWQ7IH1cclxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBtYXBba2V5XTsgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIExvYWQgZ2xvYmFsIG9yIHNoaW0gdmVyc2lvbnMgb2YgTWFwLCBTZXQsIGFuZCBXZWFrTWFwXHJcbiAgICAgICAgdmFyIGZ1bmN0aW9uUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKEZ1bmN0aW9uKTtcclxuICAgICAgICB2YXIgdXNlUG9seWZpbGwgPSB0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudltcIlJFRkxFQ1RfTUVUQURBVEFfVVNFX01BUF9QT0xZRklMTFwiXSA9PT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgdmFyIF9NYXAgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBNYXAucHJvdG90eXBlLmVudHJpZXMgPT09IFwiZnVuY3Rpb25cIiA/IE1hcCA6IENyZWF0ZU1hcFBvbHlmaWxsKCk7XHJcbiAgICAgICAgdmFyIF9TZXQgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIFNldCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTZXQucHJvdG90eXBlLmVudHJpZXMgPT09IFwiZnVuY3Rpb25cIiA/IFNldCA6IENyZWF0ZVNldFBvbHlmaWxsKCk7XHJcbiAgICAgICAgdmFyIF9XZWFrTWFwID0gIXVzZVBvbHlmaWxsICYmIHR5cGVvZiBXZWFrTWFwID09PSBcImZ1bmN0aW9uXCIgPyBXZWFrTWFwIDogQ3JlYXRlV2Vha01hcFBvbHlmaWxsKCk7XHJcbiAgICAgICAgLy8gW1tNZXRhZGF0YV1dIGludGVybmFsIHNsb3RcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeS1vYmplY3QtaW50ZXJuYWwtbWV0aG9kcy1hbmQtaW50ZXJuYWwtc2xvdHNcclxuICAgICAgICB2YXIgTWV0YWRhdGEgPSBuZXcgX1dlYWtNYXAoKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBcHBsaWVzIGEgc2V0IG9mIGRlY29yYXRvcnMgdG8gYSBwcm9wZXJ0eSBvZiBhIHRhcmdldCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIGRlY29yYXRvcnMgQW4gYXJyYXkgb2YgZGVjb3JhdG9ycy5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgdG8gZGVjb3JhdGUuXHJcbiAgICAgICAgICogQHBhcmFtIGF0dHJpYnV0ZXMgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgdGhlIHRhcmdldCBrZXkuXHJcbiAgICAgICAgICogQHJlbWFya3MgRGVjb3JhdG9ycyBhcmUgYXBwbGllZCBpbiByZXZlcnNlIG9yZGVyLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgRXhhbXBsZSA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIixcclxuICAgICAgICAgKiAgICAgICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiLFxyXG4gICAgICAgICAqICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIikpKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiLFxyXG4gICAgICAgICAqICAgICAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiLFxyXG4gICAgICAgICAqICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpKSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBkZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzQXJyYXkoZGVjb3JhdG9ycykpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QoYXR0cmlidXRlcykgJiYgIUlzVW5kZWZpbmVkKGF0dHJpYnV0ZXMpICYmICFJc051bGwoYXR0cmlidXRlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzTnVsbChhdHRyaWJ1dGVzKSlcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBEZWNvcmF0ZVByb3BlcnR5KGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc0FycmF5KGRlY29yYXRvcnMpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIGlmICghSXNDb25zdHJ1Y3Rvcih0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBEZWNvcmF0ZUNvbnN0cnVjdG9yKGRlY29yYXRvcnMsIHRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJkZWNvcmF0ZVwiLCBkZWNvcmF0ZSk7XHJcbiAgICAgICAgLy8gNC4xLjIgUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSlcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNyZWZsZWN0Lm1ldGFkYXRhXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBkZWZhdWx0IG1ldGFkYXRhIGRlY29yYXRvciBmYWN0b3J5IHRoYXQgY2FuIGJlIHVzZWQgb24gYSBjbGFzcywgY2xhc3MgbWVtYmVyLCBvciBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IFRoZSBrZXkgZm9yIHRoZSBtZXRhZGF0YSBlbnRyeS5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFWYWx1ZSBUaGUgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBlbnRyeS5cclxuICAgICAgICAgKiBAcmV0dXJucyBBIGRlY29yYXRvciBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAcmVtYXJrc1xyXG4gICAgICAgICAqIElmIGBtZXRhZGF0YUtleWAgaXMgYWxyZWFkeSBkZWZpbmVkIGZvciB0aGUgdGFyZ2V0IGFuZCB0YXJnZXQga2V5LCB0aGVcclxuICAgICAgICAgKiBtZXRhZGF0YVZhbHVlIGZvciB0aGF0IGtleSB3aWxsIGJlIG92ZXJ3cml0dGVuLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IsIFR5cGVTY3JpcHQgb25seSlcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSwgVHlwZVNjcmlwdCBvbmx5KVxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICogICAgICAgICBwcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QoKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QoKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZGVjb3JhdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSAmJiAhSXNQcm9wZXJ0eUtleShwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlY29yYXRvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5lIGEgdW5pcXVlIG1ldGFkYXRhIGVudHJ5IG9uIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YVZhbHVlIEEgdmFsdWUgdGhhdCBjb250YWlucyBhdHRhY2hlZCBtZXRhZGF0YS5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRvIGRlZmluZSBtZXRhZGF0YS5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBkZWNvcmF0b3IgZmFjdG9yeSBhcyBtZXRhZGF0YS1wcm9kdWNpbmcgYW5ub3RhdGlvbi5cclxuICAgICAgICAgKiAgICAgZnVuY3Rpb24gTXlBbm5vdGF0aW9uKG9wdGlvbnMpOiBEZWNvcmF0b3Ige1xyXG4gICAgICAgICAqICAgICAgICAgcmV0dXJuICh0YXJnZXQsIGtleT8pID0+IFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCB0YXJnZXQsIGtleSk7XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGRlZmluZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiZGVmaW5lTWV0YWRhdGFcIiwgZGVmaW5lTWV0YWRhdGEpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbiBoYXMgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBrZXkgd2FzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbjsgb3RoZXJ3aXNlLCBgZmFsc2VgLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlIYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiaGFzTWV0YWRhdGFcIiwgaGFzTWV0YWRhdGEpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHRhcmdldCBvYmplY3QgaGFzIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEga2V5IHdhcyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0OyBvdGhlcndpc2UsIGBmYWxzZWAuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJoYXNPd25NZXRhZGF0YVwiLCBoYXNPd25NZXRhZGF0YSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbi5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGtleSBpZiBmb3VuZDsgb3RoZXJ3aXNlLCBgdW5kZWZpbmVkYC5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImdldE1ldGFkYXRhXCIsIGdldE1ldGFkYXRhKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBvbiB0aGUgdGFyZ2V0IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGtleSBpZiBmb3VuZDsgb3RoZXJ3aXNlLCBgdW5kZWZpbmVkYC5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImdldE93bk1ldGFkYXRhXCIsIGdldE93bk1ldGFkYXRhKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSBrZXlzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbi5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgdW5pcXVlIG1ldGFkYXRhIGtleXMuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldE1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlNZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0TWV0YWRhdGFLZXlzXCIsIGdldE1ldGFkYXRhS2V5cyk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgdW5pcXVlIG1ldGFkYXRhIGtleXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgdW5pcXVlIG1ldGFkYXRhIGtleXMuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlPd25NZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0T3duTWV0YWRhdGFLZXlzXCIsIGdldE93bk1ldGFkYXRhS2V5cyk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVsZXRlcyB0aGUgbWV0YWRhdGEgZW50cnkgZnJvbSB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBwcm92aWRlZCBrZXkuXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG1ldGFkYXRhIGVudHJ5IHdhcyBmb3VuZCBhbmQgZGVsZXRlZDsgb3RoZXJ3aXNlLCBmYWxzZS5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcCh0YXJnZXQsIHByb3BlcnR5S2V5LCAvKkNyZWF0ZSovIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFtZXRhZGF0YU1hcC5kZWxldGUobWV0YWRhdGFLZXkpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobWV0YWRhdGFNYXAuc2l6ZSA+IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gTWV0YWRhdGEuZ2V0KHRhcmdldCk7XHJcbiAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhLmRlbGV0ZShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRNZXRhZGF0YS5zaXplID4gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBNZXRhZGF0YS5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiZGVsZXRlTWV0YWRhdGFcIiwgZGVsZXRlTWV0YWRhdGEpO1xyXG4gICAgICAgIGZ1bmN0aW9uIERlY29yYXRlQ29uc3RydWN0b3IoZGVjb3JhdG9ycywgdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0ZWQgPSBkZWNvcmF0b3IodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQoZGVjb3JhdGVkKSAmJiAhSXNOdWxsKGRlY29yYXRlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzQ29uc3RydWN0b3IoZGVjb3JhdGVkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGRlY29yYXRlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBEZWNvcmF0ZVByb3BlcnR5KGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRlZCA9IGRlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKTtcclxuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQoZGVjb3JhdGVkKSAmJiAhSXNOdWxsKGRlY29yYXRlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KGRlY29yYXRlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yID0gZGVjb3JhdGVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIENyZWF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBNZXRhZGF0YS5nZXQoTyk7XHJcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZCh0YXJnZXRNZXRhZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghQ3JlYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRNZXRhZGF0YSA9IG5ldyBfTWFwKCk7XHJcbiAgICAgICAgICAgICAgICBNZXRhZGF0YS5zZXQoTywgdGFyZ2V0TWV0YWRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IHRhcmdldE1ldGFkYXRhLmdldChQKTtcclxuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFDcmVhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIG1ldGFkYXRhTWFwID0gbmV3IF9NYXAoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhLnNldChQLCBtZXRhZGF0YU1hcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1ldGFkYXRhTWFwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAzLjEuMS4xIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnloYXNtZXRhZGF0YVxyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcclxuICAgICAgICAgICAgdmFyIGhhc093biA9IE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xyXG4gICAgICAgICAgICBpZiAoIUlzTnVsbChwYXJlbnQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMy4xLjIuMSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5aGFzb3dubWV0YWRhdGFcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiBUb0Jvb2xlYW4obWV0YWRhdGFNYXAuaGFzKE1ldGFkYXRhS2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDMuMS4zLjEgT3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWdldG1ldGFkYXRhXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xyXG4gICAgICAgICAgICB2YXIgaGFzT3duID0gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xyXG4gICAgICAgICAgICBpZiAoIUlzTnVsbChwYXJlbnQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDMuMS40LjEgT3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWdldG93bm1ldGFkYXRhXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xyXG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGFkYXRhTWFwLmdldChNZXRhZGF0YUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDMuMS41LjEgT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUClcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWRlZmluZW93bm1ldGFkYXRhXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUCkge1xyXG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhTWFwLnNldChNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDMuMS42LjEgT3JkaW5hcnlNZXRhZGF0YUtleXMoTywgUClcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeW1ldGFkYXRha2V5c1xyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5TWV0YWRhdGFLZXlzKE8sIFApIHtcclxuICAgICAgICAgICAgdmFyIG93bktleXMgPSBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3duS2V5cztcclxuICAgICAgICAgICAgdmFyIHBhcmVudEtleXMgPSBPcmRpbmFyeU1ldGFkYXRhS2V5cyhwYXJlbnQsIFApO1xyXG4gICAgICAgICAgICBpZiAocGFyZW50S2V5cy5sZW5ndGggPD0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBvd25LZXlzO1xyXG4gICAgICAgICAgICBpZiAob3duS2V5cy5sZW5ndGggPD0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRLZXlzO1xyXG4gICAgICAgICAgICB2YXIgc2V0ID0gbmV3IF9TZXQoKTtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBvd25LZXlzXzEgPSBvd25LZXlzOyBfaSA8IG93bktleXNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBvd25LZXlzXzFbX2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc0tleSA9IHNldC5oYXMoa2V5KTtcclxuICAgICAgICAgICAgICAgIGlmICghaGFzS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgcGFyZW50S2V5c18xID0gcGFyZW50S2V5czsgX2EgPCBwYXJlbnRLZXlzXzEubGVuZ3RoOyBfYSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcGFyZW50S2V5c18xW19hXTtcclxuICAgICAgICAgICAgICAgIHZhciBoYXNLZXkgPSBzZXQuaGFzKGtleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0tleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldC5hZGQoa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ga2V5cztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMy4xLjcuMSBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5b3dubWV0YWRhdGFrZXlzXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUCkge1xyXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICAgICAgICAgIHZhciBrZXlzT2JqID0gbWV0YWRhdGFNYXAua2V5cygpO1xyXG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBHZXRJdGVyYXRvcihrZXlzT2JqKTtcclxuICAgICAgICAgICAgdmFyIGsgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5cy5sZW5ndGggPSBrO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG5leHRWYWx1ZSA9IEl0ZXJhdG9yVmFsdWUobmV4dCk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXNba10gPSBuZXh0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBrKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNiBFQ01BU2NyaXB0IERhdGEgVHlwMGVzIGFuZCBWYWx1ZXNcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWRhdGEtdHlwZXMtYW5kLXZhbHVlc1xyXG4gICAgICAgIGZ1bmN0aW9uIFR5cGUoeCkge1xyXG4gICAgICAgICAgICBpZiAoeCA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiAxIC8qIE51bGwgKi87XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHgpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjogcmV0dXJuIDAgLyogVW5kZWZpbmVkICovO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIDIgLyogQm9vbGVhbiAqLztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIDMgLyogU3RyaW5nICovO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInN5bWJvbFwiOiByZXR1cm4gNCAvKiBTeW1ib2wgKi87XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiA1IC8qIE51bWJlciAqLztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjogcmV0dXJuIHggPT09IG51bGwgPyAxIC8qIE51bGwgKi8gOiA2IC8qIE9iamVjdCAqLztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiA2IC8qIE9iamVjdCAqLztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA2LjEuMSBUaGUgVW5kZWZpbmVkIFR5cGVcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzLXVuZGVmaW5lZC10eXBlXHJcbiAgICAgICAgZnVuY3Rpb24gSXNVbmRlZmluZWQoeCkge1xyXG4gICAgICAgICAgICByZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA2LjEuMiBUaGUgTnVsbCBUeXBlXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy1udWxsLXR5cGVcclxuICAgICAgICBmdW5jdGlvbiBJc051bGwoeCkge1xyXG4gICAgICAgICAgICByZXR1cm4geCA9PT0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNi4xLjUgVGhlIFN5bWJvbCBUeXBlXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy1zeW1ib2wtdHlwZVxyXG4gICAgICAgIGZ1bmN0aW9uIElzU3ltYm9sKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA2LjEuNyBUaGUgT2JqZWN0IFR5cGVcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QtdHlwZVxyXG4gICAgICAgIGZ1bmN0aW9uIElzT2JqZWN0KHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcIm9iamVjdFwiID8geCAhPT0gbnVsbCA6IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMSBUeXBlIENvbnZlcnNpb25cclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10eXBlLWNvbnZlcnNpb25cclxuICAgICAgICAvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxyXG4gICAgICAgIGZ1bmN0aW9uIFRvUHJpbWl0aXZlKGlucHV0LCBQcmVmZXJyZWRUeXBlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoVHlwZShpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMCAvKiBVbmRlZmluZWQgKi86IHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBOdWxsICovOiByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIgLyogQm9vbGVhbiAqLzogcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIFN0cmluZyAqLzogcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIFN5bWJvbCAqLzogcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1IC8qIE51bWJlciAqLzogcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBoaW50ID0gUHJlZmVycmVkVHlwZSA9PT0gMyAvKiBTdHJpbmcgKi8gPyBcInN0cmluZ1wiIDogUHJlZmVycmVkVHlwZSA9PT0gNSAvKiBOdW1iZXIgKi8gPyBcIm51bWJlclwiIDogXCJkZWZhdWx0XCI7XHJcbiAgICAgICAgICAgIHZhciBleG90aWNUb1ByaW0gPSBHZXRNZXRob2QoaW5wdXQsIHRvUHJpbWl0aXZlU3ltYm9sKTtcclxuICAgICAgICAgICAgaWYgKGV4b3RpY1RvUHJpbSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZXhvdGljVG9QcmltLmNhbGwoaW5wdXQsIGhpbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzT2JqZWN0KHJlc3VsdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlUb1ByaW1pdGl2ZShpbnB1dCwgaGludCA9PT0gXCJkZWZhdWx0XCIgPyBcIm51bWJlclwiIDogaGludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMS4xLjEgT3JkaW5hcnlUb1ByaW1pdGl2ZShPLCBoaW50KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9yZGluYXJ5dG9wcmltaXRpdmVcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeVRvUHJpbWl0aXZlKE8sIGhpbnQpIHtcclxuICAgICAgICAgICAgaWYgKGhpbnQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b1N0cmluZ18xID0gTy50b1N0cmluZztcclxuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHRvU3RyaW5nXzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRvU3RyaW5nXzEuY2FsbChPKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVPZiA9IE8udmFsdWVPZjtcclxuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHZhbHVlT2YpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlT2YuY2FsbChPKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVPZiA9IE8udmFsdWVPZjtcclxuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHZhbHVlT2YpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlT2YuY2FsbChPKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9TdHJpbmdfMiA9IE8udG9TdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh0b1N0cmluZ18yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0b1N0cmluZ18yLmNhbGwoTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4xLjIgVG9Cb29sZWFuKGFyZ3VtZW50KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8yMDE2LyNzZWMtdG9ib29sZWFuXHJcbiAgICAgICAgZnVuY3Rpb24gVG9Cb29sZWFuKGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIWFyZ3VtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjEuMTIgVG9TdHJpbmcoYXJndW1lbnQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9zdHJpbmdcclxuICAgICAgICBmdW5jdGlvbiBUb1N0cmluZyhhcmd1bWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIGFyZ3VtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjEuMTQgVG9Qcm9wZXJ0eUtleShhcmd1bWVudClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XHJcbiAgICAgICAgZnVuY3Rpb24gVG9Qcm9wZXJ0eUtleShhcmd1bWVudCkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gVG9QcmltaXRpdmUoYXJndW1lbnQsIDMgLyogU3RyaW5nICovKTtcclxuICAgICAgICAgICAgaWYgKElzU3ltYm9sKGtleSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgICAgICAgICByZXR1cm4gVG9TdHJpbmcoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4yIFRlc3RpbmcgYW5kIENvbXBhcmlzb24gT3BlcmF0aW9uc1xyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRlc3RpbmctYW5kLWNvbXBhcmlzb24tb3BlcmF0aW9uc1xyXG4gICAgICAgIC8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNhcnJheVxyXG4gICAgICAgIGZ1bmN0aW9uIElzQXJyYXkoYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXlcclxuICAgICAgICAgICAgICAgID8gQXJyYXkuaXNBcnJheShhcmd1bWVudClcclxuICAgICAgICAgICAgICAgIDogYXJndW1lbnQgaW5zdGFuY2VvZiBPYmplY3RcclxuICAgICAgICAgICAgICAgICAgICA/IGFyZ3VtZW50IGluc3RhbmNlb2YgQXJyYXlcclxuICAgICAgICAgICAgICAgICAgICA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4yLjMgSXNDYWxsYWJsZShhcmd1bWVudClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXHJcbiAgICAgICAgZnVuY3Rpb24gSXNDYWxsYWJsZShhcmd1bWVudCkge1xyXG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGFuIGFwcHJveGltYXRpb24gYXMgd2UgY2Fubm90IGNoZWNrIGZvciBbW0NhbGxdXSBpbnRlcm5hbCBtZXRob2QuXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT09IFwiZnVuY3Rpb25cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4yLjQgSXNDb25zdHJ1Y3Rvcihhcmd1bWVudClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc2NvbnN0cnVjdG9yXHJcbiAgICAgICAgZnVuY3Rpb24gSXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xyXG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGFuIGFwcHJveGltYXRpb24gYXMgd2UgY2Fubm90IGNoZWNrIGZvciBbW0NvbnN0cnVjdF1dIGludGVybmFsIG1ldGhvZC5cclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJmdW5jdGlvblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjIuNyBJc1Byb3BlcnR5S2V5KGFyZ3VtZW50KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzcHJvcGVydHlrZXlcclxuICAgICAgICBmdW5jdGlvbiBJc1Byb3BlcnR5S2V5KGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoVHlwZShhcmd1bWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMyAvKiBTdHJpbmcgKi86IHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIFN5bWJvbCAqLzogcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4zIE9wZXJhdGlvbnMgb24gT2JqZWN0c1xyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9wZXJhdGlvbnMtb24tb2JqZWN0c1xyXG4gICAgICAgIC8vIDcuMy45IEdldE1ldGhvZChWLCBQKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxyXG4gICAgICAgIGZ1bmN0aW9uIEdldE1ldGhvZChWLCBQKSB7XHJcbiAgICAgICAgICAgIHZhciBmdW5jID0gVltQXTtcclxuICAgICAgICAgICAgaWYgKGZ1bmMgPT09IHVuZGVmaW5lZCB8fCBmdW5jID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKCFJc0NhbGxhYmxlKGZ1bmMpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuYztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy40IE9wZXJhdGlvbnMgb24gSXRlcmF0b3IgT2JqZWN0c1xyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9wZXJhdGlvbnMtb24taXRlcmF0b3Itb2JqZWN0c1xyXG4gICAgICAgIGZ1bmN0aW9uIEdldEl0ZXJhdG9yKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gR2V0TWV0aG9kKG9iaiwgaXRlcmF0b3JTeW1ib2wpO1xyXG4gICAgICAgICAgICBpZiAoIUlzQ2FsbGFibGUobWV0aG9kKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTsgLy8gZnJvbSBDYWxsXHJcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG1ldGhvZC5jYWxsKG9iaik7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QoaXRlcmF0b3IpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuNC40IEl0ZXJhdG9yVmFsdWUoaXRlclJlc3VsdClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvMjAxNi8jc2VjLWl0ZXJhdG9ydmFsdWVcclxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvclZhbHVlKGl0ZXJSZXN1bHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZXJSZXN1bHQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuNC41IEl0ZXJhdG9yU3RlcChpdGVyYXRvcilcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pdGVyYXRvcnN0ZXBcclxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gZmFsc2UgOiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXRlcmF0b3JjbG9zZVxyXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpIHtcclxuICAgICAgICAgICAgdmFyIGYgPSBpdGVyYXRvcltcInJldHVyblwiXTtcclxuICAgICAgICAgICAgaWYgKGYpXHJcbiAgICAgICAgICAgICAgICBmLmNhbGwoaXRlcmF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA5LjEgT3JkaW5hcnkgT2JqZWN0IEludGVybmFsIE1ldGhvZHMgYW5kIEludGVybmFsIFNsb3RzXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzXHJcbiAgICAgICAgLy8gOS4xLjEuMSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnlnZXRwcm90b3R5cGVvZlxyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTykge1xyXG4gICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTyk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTyAhPT0gXCJmdW5jdGlvblwiIHx8IE8gPT09IGZ1bmN0aW9uUHJvdG90eXBlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xyXG4gICAgICAgICAgICAvLyBUeXBlU2NyaXB0IGRvZXNuJ3Qgc2V0IF9fcHJvdG9fXyBpbiBFUzUsIGFzIGl0J3Mgbm9uLXN0YW5kYXJkLlxyXG4gICAgICAgICAgICAvLyBUcnkgdG8gZGV0ZXJtaW5lIHRoZSBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLiBDb21wYXRpYmxlIGltcGxlbWVudGF0aW9uc1xyXG4gICAgICAgICAgICAvLyBtdXN0IGVpdGhlciBzZXQgX19wcm90b19fIG9uIGEgc3ViY2xhc3MgY29uc3RydWN0b3IgdG8gdGhlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IsXHJcbiAgICAgICAgICAgIC8vIG9yIGVuc3VyZSBlYWNoIGNsYXNzIGhhcyBhIHZhbGlkIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgb24gaXRzIHByb3RvdHlwZSB0aGF0XHJcbiAgICAgICAgICAgIC8vIHBvaW50cyBiYWNrIHRvIHRoZSBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgdGhlIHNhbWUgYXMgRnVuY3Rpb24uW1tQcm90b3R5cGVdXSwgdGhlbiB0aGlzIGlzIGRlZmluYXRlbHkgaW5oZXJpdGVkLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBjYXNlIHdoZW4gaW4gRVM2IG9yIHdoZW4gdXNpbmcgX19wcm90b19fIGluIGEgY29tcGF0aWJsZSBicm93c2VyLlxyXG4gICAgICAgICAgICBpZiAocHJvdG8gIT09IGZ1bmN0aW9uUHJvdG90eXBlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgc3VwZXIgcHJvdG90eXBlIGlzIE9iamVjdC5wcm90b3R5cGUsIG51bGwsIG9yIHVuZGVmaW5lZCwgdGhlbiB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBoZXJpdGFnZS5cclxuICAgICAgICAgICAgdmFyIHByb3RvdHlwZSA9IE8ucHJvdG90eXBlO1xyXG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlUHJvdG8gPSBwcm90b3R5cGUgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChwcm90b3R5cGVQcm90byA9PSBudWxsIHx8IHByb3RvdHlwZVByb3RvID09PSBPYmplY3QucHJvdG90eXBlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgY29uc3RydWN0b3Igd2FzIG5vdCBhIGZ1bmN0aW9uLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxyXG4gICAgICAgICAgICB2YXIgY29uc3RydWN0b3IgPSBwcm90b3R5cGVQcm90by5jb25zdHJ1Y3RvcjtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHNvbWUga2luZCBvZiBzZWxmLXJlZmVyZW5jZSwgdGhlbiB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBoZXJpdGFnZS5cclxuICAgICAgICAgICAgaWYgKGNvbnN0cnVjdG9yID09PSBPKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xyXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgcHJldHR5IGdvb2QgZ3Vlc3MgYXQgdGhlIGhlcml0YWdlLlxyXG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG5haXZlIE1hcCBzaGltXHJcbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlTWFwUG9seWZpbGwoKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWNoZVNlbnRpbmVsID0ge307XHJcbiAgICAgICAgICAgIHZhciBhcnJheVNlbnRpbmVsID0gW107XHJcbiAgICAgICAgICAgIHZhciBNYXBJdGVyYXRvciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBNYXBJdGVyYXRvcihrZXlzLCB2YWx1ZXMsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBrZXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XHJcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcclxuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2luZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fa2V5cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3NlbGVjdG9yKHRoaXMuX2tleXNbaW5kZXhdLCB0aGlzLl92YWx1ZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA+PSB0aGlzLl9rZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHJlc3VsdCwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS50aHJvdyA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGUucmV0dXJuID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGFycmF5U2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXBJdGVyYXRvcjtcclxuICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBNYXAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWFwLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2tleXMubGVuZ3RoOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpID49IDA7IH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgPyB0aGlzLl92YWx1ZXNbaW5kZXhdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5fa2V5cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBpbmRleCArIDE7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXNbaSAtIDFdID0gdGhpcy5fa2V5c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1tpIC0gMV0gPSB0aGlzLl92YWx1ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5sZW5ndGgtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLmxlbmd0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSB0aGlzLl9jYWNoZUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IC0yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSAtMjtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRLZXkpOyB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRWYWx1ZSk7IH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRFbnRyeSk7IH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZW50cmllcygpOyB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmVudHJpZXMoKTsgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuX2ZpbmQgPSBmdW5jdGlvbiAoa2V5LCBpbnNlcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVLZXkgIT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gdGhpcy5fa2V5cy5pbmRleE9mKHRoaXMuX2NhY2hlS2V5ID0ga2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlSW5kZXggPCAwICYmIGluc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gdGhpcy5fa2V5cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVJbmRleDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWFwO1xyXG4gICAgICAgICAgICB9KCkpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRLZXkoa2V5LCBfKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFZhbHVlKF8sIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RW50cnkoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBuYWl2ZSBTZXQgc2hpbVxyXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZVNldFBvbHlmaWxsKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFNldCgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgX01hcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAuc2l6ZTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdGhpcy5fbWFwLmhhcyh2YWx1ZSk7IH07XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdGhpcy5fbWFwLnNldCh2YWx1ZSwgdmFsdWUpLCB0aGlzOyB9O1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5kZWxldGUodmFsdWUpOyB9O1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHsgdGhpcy5fbWFwLmNsZWFyKCk7IH07XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAua2V5cygpOyB9O1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAudmFsdWVzKCk7IH07XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAuZW50cmllcygpOyB9O1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZVtcIkBAaXRlcmF0b3JcIl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmtleXMoKTsgfTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5rZXlzKCk7IH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2V0O1xyXG4gICAgICAgICAgICB9KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBuYWl2ZSBXZWFrTWFwIHNoaW1cclxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVXZWFrTWFwUG9seWZpbGwoKSB7XHJcbiAgICAgICAgICAgIHZhciBVVUlEX1NJWkUgPSAxNjtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBIYXNoTWFwLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgcm9vdEtleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFdlYWtNYXAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUgIT09IHVuZGVmaW5lZCA/IEhhc2hNYXAuaGFzKHRhYmxlLCB0aGlzLl9rZXkpIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBIYXNoTWFwLmdldCh0YWJsZSwgdGhpcy5fa2V5KSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZVt0aGlzLl9rZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBkZWxldGUgdGFibGVbdGhpcy5fa2V5XSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IG5vdCBhIHJlYWwgY2xlYXIsIGp1c3QgbWFrZXMgdGhlIHByZXZpb3VzIGRhdGEgdW5yZWFjaGFibGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXkgPSBDcmVhdGVVbmlxdWVLZXkoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gV2Vha01hcDtcclxuICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gQ3JlYXRlVW5pcXVlS2V5KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleTtcclxuICAgICAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gXCJAQFdlYWtNYXBAQFwiICsgQ3JlYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKEhhc2hNYXAuaGFzKGtleXMsIGtleSkpO1xyXG4gICAgICAgICAgICAgICAga2V5c1trZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCBjcmVhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaGFzT3duLmNhbGwodGFyZ2V0LCByb290S2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY3JlYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHJvb3RLZXksIHsgdmFsdWU6IEhhc2hNYXAuY3JlYXRlKCkgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Jvb3RLZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIEZpbGxSYW5kb21CeXRlcyhidWZmZXIsIHNpemUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IE1hdGgucmFuZG9tKCkgKiAweGZmIHwgMDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gR2VuUmFuZG9tQnl0ZXMoc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVaW50OEFycmF5ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbXNDcnlwdG8gIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxsUmFuZG9tQnl0ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSksIHNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZpbGxSYW5kb21CeXRlcyhuZXcgQXJyYXkoc2l6ZSksIHNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIENyZWF0ZVVVSUQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEdlblJhbmRvbUJ5dGVzKFVVSURfU0laRSk7XHJcbiAgICAgICAgICAgICAgICAvLyBtYXJrIGFzIHJhbmRvbSAtIFJGQyA0MTIyIMKnIDQuNFxyXG4gICAgICAgICAgICAgICAgZGF0YVs2XSA9IGRhdGFbNl0gJiAweDRmIHwgMHg0MDtcclxuICAgICAgICAgICAgICAgIGRhdGFbOF0gPSBkYXRhWzhdICYgMHhiZiB8IDB4ODA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IFVVSURfU0laRTsgKytvZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnl0ZSA9IGRhdGFbb2Zmc2V0XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID09PSA0IHx8IG9mZnNldCA9PT0gNiB8fCBvZmZzZXQgPT09IDgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIi1cIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnl0ZSA8IDE2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGJ5dGUudG9TdHJpbmcoMTYpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHVzZXMgYSBoZXVyaXN0aWMgdXNlZCBieSB2OCBhbmQgY2hha3JhIHRvIGZvcmNlIGFuIG9iamVjdCBpbnRvIGRpY3Rpb25hcnkgbW9kZS5cclxuICAgICAgICBmdW5jdGlvbiBNYWtlRGljdGlvbmFyeShvYmopIHtcclxuICAgICAgICAgICAgb2JqLl9fID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkZWxldGUgb2JqLl9fO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KShSZWZsZWN0IHx8IChSZWZsZWN0ID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVmbGVjdC5qcy5tYXAiLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuXG4vKipcbiAqIEBub3RlIFRoaXMgZmlsZSBleGlzdHMgbWVyZWx5IGFzIGFuIGVhc3kgcmVmZXJlbmNlIGZvciBmb2xrcyBhZGRpbmcgaXQgdG8gdGhlaXIgY29uZmlndXJhdGlvbiBlbnRyaWVzXG4gKi9cblxuKCgpID0+IHtcbiAgaWYgKHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlID0gdHJ1ZTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ2xvYmFsLXJlcXVpcmVcbiAgcmVxdWlyZSgnLi9saWIvY2xpZW50Jyk7XG59KSgpO1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgZXJyb3IsIGluZm8sIHJlZnJlc2gsIHdhcm4gfSA9IHJlcXVpcmUoJy4vY2xpZW50LWxvZycpO1xuXG5jb25zdCB7IGFwcGx5LCBjaGVjaywgc3RhdHVzIH0gPSBtb2R1bGUuaG90O1xubGV0IGxhdGVzdCA9IHRydWU7XG5cbmNvbnN0IGhtciA9IHtcbiAgb25VbmFjY2VwdGVkKGRhdGEpIHtcbiAgICB3YXJuKCdDaGFuZ2UgaW4gdW5hY2NlcHRlZCBtb2R1bGUocyk6XFxuJywgZGF0YSk7XG4gICAgd2FybihkYXRhKTtcbiAgfSxcbiAgb25EZWNsaW5lZChkYXRhKSB7XG4gICAgd2FybignQ2hhbmdlIGluIGRlY2xpbmVkIG1vZHVsZShzKTpcXG4nLCBkYXRhKTtcbiAgfSxcbiAgb25FcnJvcmVkKGRhdGEpIHtcbiAgICBlcnJvcignRXJyb3IgaW4gbW9kdWxlKHMpOlxcbicsIGRhdGEpO1xuICB9XG59O1xuXG5jb25zdCByZXBsYWNlID0gYXN5bmMgKGhhc2gpID0+IHtcbiAgaWYgKGhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBsYXRlc3QgPSBoYXNoLmluY2x1ZGVzKF9fd2VicGFja19oYXNoX18pO1xuICB9XG5cbiAgaWYgKCFsYXRlc3QpIHtcbiAgICBjb25zdCBobXJTdGF0dXMgPSBzdGF0dXMoKTtcblxuICAgIGlmIChobXJTdGF0dXMgPT09ICdhYm9ydCcgfHwgaG1yU3RhdHVzID09PSAnZmFpbCcpIHtcbiAgICAgIHdhcm4oYEFuIEhNUiB1cGRhdGUgd2FzIHRyaWdnZXJlZCwgYnV0ICR7aG1yU3RhdHVzfWVkLiAke3JlZnJlc2h9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG1vZHVsZXMgPSBhd2FpdCBjaGVjayhmYWxzZSk7XG5cbiAgICBpZiAoIW1vZHVsZXMpIHtcbiAgICAgIHdhcm4oYE5vIG1vZHVsZXMgZm91bmQgZm9yIHJlcGxhY2VtZW50LiAke3JlZnJlc2h9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbW9kdWxlcyA9IGF3YWl0IGFwcGx5KGhtcik7XG5cbiAgICBpZiAobW9kdWxlcykge1xuICAgICAgbGF0ZXN0ID0gdHJ1ZTtcbiAgICAgIGluZm8oYEJ1aWxkICR7aGFzaC5zbGljZSgwLCA3KX0gcmVwbGFjZWQ6XFxuYCwgbW9kdWxlcyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVwbGFjZSB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgZXJyb3IsIGluZm8sIHdhcm4gfSA9IGNvbnNvbGU7XG5jb25zdCBsb2cgPSB7XG4gIGVycm9yOiBlcnJvci5iaW5kKGNvbnNvbGUsICfirKEgd3BzOicpLFxuICBpbmZvOiBpbmZvLmJpbmQoY29uc29sZSwgJ+KsoSB3cHM6JyksXG4gIHJlZnJlc2g6ICdQbGVhc2UgcmVmcmVzaCB0aGUgcGFnZScsXG4gIHdhcm46IHdhcm4uYmluZChjb25zb2xlLCAn4qyhIHdwczonKVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2c7XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyByZXBsYWNlIH0gPSByZXF1aXJlKCcuL2NsaWVudC1obXInKTtcbmNvbnN0IHsgZXJyb3IsIGluZm8sIHJlZnJlc2gsIHdhcm4gfSA9IHJlcXVpcmUoJy4vY2xpZW50LWxvZycpO1xuY29uc3QgeyBpbml0OiBpbml0UHJvZ3Jlc3MgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvcHJvZ3Jlc3MnKTtcbmNvbnN0IHsgaW5pdDogaW5pdE1pbmltYWxQcm9ncmVzcyB9ID0gcmVxdWlyZSgnLi9vdmVybGF5cy9wcm9ncmVzcy1taW5pbWFsJyk7XG5jb25zdCB7IGluaXQ6IGluaXRTdGF0dXMgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvc3RhdHVzJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZiwgbm8tdW51c2VkLXZhcnNcbmNvbnN0IG9wdGlvbnMgPSDKjsmQybnJlG9zx53KjMm5x51zO1xuY29uc3QgeyBhZGRyZXNzLCBjbGllbnQsIHByb2dyZXNzLCBzZWN1cmUsIHN0YXR1cyB9ID0gb3B0aW9ucztcbmNvbnN0IHByb3RvY29sID0gc2VjdXJlID8gJ3dzcycgOiAnd3MnO1xuY29uc3Qgc29ja2V0ID0gbmV3IFdlYlNvY2tldChgJHtwcm90b2NvbH06Ly8keyhjbGllbnQgfHwge30pLmFkZHJlc3MgfHwgYWRkcmVzc30vd3BzYCk7XG5cbi8vIHByZXZlbnRzIEVDT05OUkVTRVQgZXJyb3JzIG9uIHRoZSBzZXJ2ZXJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiBzb2NrZXQuY2xvc2UoKSk7XG5cbnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgY29uc3QgeyBhY3Rpb24sIGRhdGEgfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgY29uc3QgeyBlcnJvcnMsIGhhc2ggPSAnPD8+Jywgd2FybmluZ3MgfSA9IGRhdGEgfHwge307XG4gIGNvbnN0IHNob3J0SGFzaCA9IGhhc2guc2xpY2UoMCwgNyk7XG5cbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlICdjb25uZWN0ZWQnOlxuICAgICAgaW5mbygnV2ViU29ja2V0IGNvbm5lY3RlZCcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZXJyb3JzJzpcbiAgICAgIGVycm9yKGBCdWlsZCAke3Nob3J0SGFzaH0gcHJvZHVjZWQgZXJyb3JzOlxcbmAsIGVycm9ycyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICByZXBsYWNlKGhhc2gpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnd2FybmluZ3MnOlxuICAgICAgd2FybihgQnVpbGQgJHtzaG9ydEhhc2h9IHByb2R1Y2VkIHdhcm5pbmdzOlxcbmAsIHdhcm5pbmdzKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gIH1cbn0pO1xuXG5zb2NrZXQub25jbG9zZSA9ICgpID0+IHdhcm4oYFRoZSBjbGllbnQgV2ViU29ja2V0IHdhcyBjbG9zZWQuICR7cmVmcmVzaH1gKTtcblxuaWYgKHByb2dyZXNzID09PSAnbWluaW1hbCcpIHtcbiAgaW5pdE1pbmltYWxQcm9ncmVzcyhvcHRpb25zLCBzb2NrZXQpO1xufSBlbHNlIGlmIChwcm9ncmVzcykge1xuICBpbml0UHJvZ3Jlc3Mob3B0aW9ucywgc29ja2V0KTtcbn1cblxuaWYgKHN0YXR1cykge1xuICBpbml0U3RhdHVzKG9wdGlvbnMsIHNvY2tldCk7XG59XG5cbmlmIChtb2R1bGUuaG90KSB7XG4gIGluZm8oJ0hvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgYWN0aXZlJyk7XG5cbiAgaWYgKG9wdGlvbnMubGl2ZVJlbG9hZCkge1xuICAgIGluZm8oJ0xpdmUgUmVsb2FkIHRha2luZyBwcmVjZWRlbmNlIG92ZXIgSG90IE1vZHVsZSBSZXBsYWNlbWVudCcpO1xuICB9XG59IGVsc2Uge1xuICB3YXJuKCdIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGluYWN0aXZlJyk7XG59XG5cbmlmICghbW9kdWxlLmhvdCAmJiBvcHRpb25zLmxpdmVSZWxvYWQpIHtcbiAgaW5mbygnTGl2ZSBSZWxvYWQgaXMgYWN0aXZlJyk7XG59XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsLCBNYXRoZXVzIEdvbsOnYWx2ZXMgZGEgU2lsdmFcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGFkZENzcywgYWRkSHRtbCB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IG5zID0gJ3dwcy1wcm9ncmVzcy1taW5pbWFsJztcbmNvbnN0IGh0bWwgPSBgXG48ZGl2IGlkPVwiJHtuc31cIiBjbGFzcz1cIiR7bnN9LWhpZGRlblwiPlxuICA8ZGl2IGlkPVwiJHtuc30tYmFyXCI+PC9kaXY+XG48L2Rpdj5cbmA7XG5jb25zdCBjc3MgPSBgXG4jJHtuc30ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiA0cHg7XG4gIHdpZHRoOiAxMDB2dztcbn1cblxuIyR7bnN9LWJhciB7XG4gIHdpZHRoOiAwJTtcbiAgaGVpZ2h0OiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxODYsIDIyMywgMTcyKTtcbiAgdHJhbnNpdGlvbjogd2lkdGggMXMgZWFzZS1pbi1vdXQ7XG59XG5cbi4ke25zfS1oaWRkZW57XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5gO1xuXG5jb25zdCB1cGRhdGUgPSAocGVyY2VudCkgPT4ge1xuICBjb25zdCBiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tYmFyYCk7XG4gIGJhci5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XG59O1xuXG5jb25zdCByZXNldCA9ICh3cmFwcGVyKSA9PiB7XG4gIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChgJHtuc30taGlkZGVuYCk7XG4gIHNldFRpbWVvdXQoKCkgPT4gdXBkYXRlKDApLCAxZTMpO1xufTtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBhZGRIdG1sKGh0bWwpO1xuICAgIGFkZENzcyhjc3MpO1xuICB9KTtcblxuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcblxuICAgIGlmIChhY3Rpb24gIT09ICdwcm9ncmVzcycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5mbG9vcihkYXRhLnBlcmNlbnQgKiAxMDApO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc31gKTtcblxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30taGlkZGVuYCk7XG5cbiAgICBpZiAoZGF0YS5wZXJjZW50ID09PSAxKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc2V0KHdyYXBwZXIpLCA1ZTMpO1xuICAgIH1cblxuICAgIHVwZGF0ZShwZXJjZW50KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdFxufTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGwsIE1hdGhldXMgR29uw6dhbHZlcyBkYSBTaWx2YVxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgYWRkQ3NzLCBhZGRIdG1sIH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgbnMgPSAnd3BzLXByb2dyZXNzJztcbmNvbnN0IGNzcyA9IGBcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zOjQwMCw3MDAnKTtcblxuIyR7bnN9e1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDUlO1xuICB0b3A6IDUlO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XG4gIHotaW5kZXg6IDEwMDA7XG59XG5cbiMke25zfS1iZyB7XG4gIGZpbGw6ICMyODJkMzU7XG59XG5cbiMke25zfS1maWxsIHtcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAwKTtcbiAgc3Ryb2tlOiByZ2IoMTg2LCAyMjMsIDE3Mik7XG4gIHN0cm9rZS1kYXNoYXJyYXk6IDIxOS45OTA3ODM2OTE0MDYyNTtcbiAgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0yMTkuOTkwNzgzNjkxNDA2MjU7XG4gIHN0cm9rZS13aWR0aDogMTA7XG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKXRyYW5zbGF0ZSgwcHgsIC04MHB4KTtcbiAgdHJhbnNpdGlvbjogc3Ryb2tlLWRhc2hvZmZzZXQgMXM7XG59XG5cbiMke25zfS1wZXJjZW50IHtcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZpbGw6ICNmZmZmZmY7XG59XG5cbiMke25zfS1wZXJjZW50LXZhbHVlIHtcbiAgYWxpZ25tZW50LWJhc2VsaW5lOiBtaWRkbGU7XG4gIHRleHQtYW5jaG9yOiBtaWRkbGU7XG59XG5cbiMke25zfS1wZXJjZW50LXN1cGVyIHtcbiAgZmlsbDogI2JkYzNjNztcbiAgZm9udC1zaXplOiAuNDVlbTtcbiAgYmFzZWxpbmUtc2hpZnQ6IDEwJTtcbn1cblxuLiR7bnN9LW5vc2VsZWN0IHtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuQGtleWZyYW1lcyAke25zfS1oaWRkZW4tZGlzcGxheSB7XG5cdDAlIHtcblx0XHRvcGFjaXR5OiAxO1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMSk7XG5cdFx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuXHR9XG5cdDk5JSB7XG5cdFx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdFx0b3BhY2l0eTogMDtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDApO1xuXHRcdC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0fVxuXHQxMDAlIHtcblx0XHRkaXNwbGF5OiBub25lO1xuXHRcdG9wYWNpdHk6IDA7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0XHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdH1cbn1cblxuLiR7bnN9LWhpZGRlbntcbiAgYW5pbWF0aW9uOiAke25zfS1oaWRkZW4tZGlzcGxheSAuM3M7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6Zm9yd2FyZHM7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuYDtcblxuY29uc3QgaHRtbCA9IGBcbjxzdmcgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30tbm9zZWxlY3QgJHtuc30taGlkZGVuXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCI+XG4gIDxjaXJjbGUgaWQ9XCIke25zfS1iZ1wiIGN4PVwiNTAlXCIgY3k9XCI1MCVcIiByPVwiMzVcIj48L2NpcmNsZT5cbiAgPHBhdGggaWQ9XCIke25zfS1maWxsXCIgZD1cIk01LDQwYTM1LDM1IDAgMSwwIDcwLDBhMzUsMzUgMCAxLDAgLTcwLDBcIiAvPlxuICA8dGV4dCBpZD1cIiR7bnN9LXBlcmNlbnRcIiB4PVwiNTAlXCIgeT1cIjUxJVwiPjx0c3BhbiBpZD1cIiR7bnN9LXBlcmNlbnQtdmFsdWVcIj4wPC90c3Bhbj48dHNwYW4gaWQ9XCIke25zfS1wZXJjZW50LXN1cGVyXCI+JTwvdHNwYW4+PC90ZXh0PlxuPC9zdmc+XG5gO1xuXG5jb25zdCB1cGRhdGUgPSAocGVyY2VudCkgPT4ge1xuICBjb25zdCBtYXggPSAtMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBjb25zdCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1wZXJjZW50LXZhbHVlYCk7XG4gIGNvbnN0IHRyYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWZpbGxgKTtcbiAgY29uc3Qgb2Zmc2V0ID0gKCgxMDAgLSBwZXJjZW50KSAvIDEwMCkgKiBtYXg7XG5cbiAgdHJhY2suc2V0QXR0cmlidXRlKCdzdHlsZScsIGBzdHJva2UtZGFzaG9mZnNldDogJHtvZmZzZXR9YCk7XG4gIHZhbHVlLmlubmVySFRNTCA9IHBlcmNlbnQudG9TdHJpbmcoKTtcbn07XG5cbmNvbnN0IHJlc2V0ID0gKHN2ZykgPT4ge1xuICBzdmcuY2xhc3NMaXN0LmFkZChgJHtuc30taGlkZGVuYCk7XG4gIHNldFRpbWVvdXQoKCkgPT4gdXBkYXRlKDApLCAxZTMpO1xufTtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBhZGRDc3MoY3NzKTtcbiAgICBhZGRIdG1sKGh0bWwpO1xuICB9KTtcblxuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcblxuICAgIGlmIChhY3Rpb24gIT09ICdwcm9ncmVzcycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5mbG9vcihkYXRhLnBlcmNlbnQgKiAxMDApO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuXG4gICAgaWYgKCFzdmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB3ZSBjYW4gc2FmZWx5IGNhbGwgdGhpcyBldmVuIGlmIGl0IGRvZXNuJ3QgaGF2ZSB0aGUgY2xhc3NcbiAgICBzdmcuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30taGlkZGVuYCk7XG5cbiAgICBpZiAoZGF0YS5wZXJjZW50ID09PSAxKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc2V0KHN2ZyksIDVlMyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKHBlcmNlbnQpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwsIHNvY2tldE1lc3NhZ2UgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtc3RhdHVzJztcbmNvbnN0IGNzcyA9IGBcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zOjQwMCw3MDAnKTtcblxuIyR7bnN9IHtcbiAgYmFja2dyb3VuZDogIzI4MmQzNTtcbiAgYm9yZGVyLXJhZGl1czogMC42ZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiAxMHB4O1xuICBoZWlnaHQ6IDkwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIG1heC1oZWlnaHQ6IDIwZW07XG4gIG1pbi1oZWlnaHQ6IDIwZW07XG4gIG9wYWNpdHk6IDE7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmctYm90dG9tOiAzZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMjVzIGVhc2UtaW4tb3V0O1xuICB3aWR0aDogOTUlO1xufVxuXG5Aa2V5ZnJhbWVzICR7bnN9LWhpZGRlbi1kaXNwbGF5IHtcblx0MCUge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0OTklIHtcblx0XHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG5cdDEwMCUge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0b3BhY2l0eTogMDtcblx0fVxufVxuXG4jJHtuc30uJHtuc30taGlkZGVuIHtcbiAgYW5pbWF0aW9uOiAke25zfS1oaWRkZW4tZGlzcGxheSAuM3M7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6Zm9yd2FyZHM7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbiMke25zfS4ke25zfS1taW4ge1xuICBhbmltYXRpb246IG1pbmltaXplIDEwcztcbiAgYm90dG9tOiAyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgaGVpZ2h0OiA2ZW07XG4gIG1pbi1oZWlnaHQ6IDZlbTtcbiAgcGFkZGluZy1ib3R0b206IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDJlbTtcbiAgd2lkdGg6IDZlbTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tYmVhY29uIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbiMke25zfS10aXRsZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDEuMmVtO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDAuNmVtIDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LXRpdGxlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LXRpdGxlLWVycm9ycyB7XG4gIGNvbG9yOiAjZmY1ZjU4O1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIHBhZGRpbmctbGVmdDogMWVtO1xufVxuXG4jJHtuc30tdGl0bGUtd2FybmluZ3Mge1xuICBjb2xvcjogI2ZmYmQyZTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBwYWRkaW5nLWxlZnQ6IDFlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMWVtIDJlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHByZSB7XG4gIGNvbG9yOiAjZGRkO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxLjNlbTtcblx0Zm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbiMke25zfS1wcm9ibGVtcyBwcmUgZW0ge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcbiAgY29sb3I6ICM2NDFlMTY7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDNlbTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjRlbTtcbiAgcGFkZGluZzogMC4xZW0gMC40ZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbnByZSMke25zfS13YXJuaW5ncyBlbSB7XG4gIGJhY2tncm91bmQ6ICNmZmJkMmU7XG4gIGNvbG9yOiAjM2UyNzIzO1xufVxuXG5wcmUjJHtuc30tc3VjY2VzcyB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucHJlIyR7bnN9LXN1Y2Nlc3MgZW0ge1xuICBiYWNrZ3JvdW5kOiAjN2ZiOTAwO1xuICBjb2xvcjogIzAwNGQ0MDtcbn1cblxuIyR7bnN9LXByb2JsZW1zLiR7bnN9LXN1Y2Nlc3MgIyR7bnN9LXN1Y2Nlc3Mge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tcHJvYmxlbXMge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2IHtcbiAgb3BhY2l0eTogMC41O1xuICBwYWRkaW5nOiAxLjJlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS1uYXYge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2OmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuIyR7bnN9LW5hdiBkaXYge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAxLjJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogMS4yZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEuMmVtO1xufVxuXG5kaXYjJHtuc30tbWluIHtcbiAgYmFja2dyb3VuZDogI2ZmYmQyZTtcbiAgbWFyZ2luLWxlZnQ6IDAuOGVtO1xufVxuXG4jJHtuc30tYmVhY29uIHtcbiAgYm9yZGVyLXJhZGl1czogM2VtO1xuICBkaXNwbGF5OiBub25lO1xuICBmb250LXNpemU6IDEwcHg7XG4gIGhlaWdodDogM2VtO1xuICBtYXJnaW46IDEuNmVtIGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDNlbTtcbn1cblxuIyR7bnN9LWJlYWNvbjpiZWZvcmUsICMke25zfS1iZWFjb246YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LDE4NSwwLCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiAzZW07XG4gIG9wYWNpdHk6IDA7XG59XG5cbiMke25zfS1iZWFjb246YmVmb3JlIHtcbiAgYW5pbWF0aW9uOiAke25zfS1wdWxzZSAzcyBpbmZpbml0ZSBsaW5lYXI7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG5cbiMke25zfS1iZWFjb246YWZ0ZXIge1xuICBhbmltYXRpb246ICR7bnN9LXB1bHNlIDNzIDJzIGluZmluaXRlIGxpbmVhcjtcbn1cblxuXG5Aa2V5ZnJhbWVzICR7bnN9LXB1bHNlIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjYpO1xuICB9XG4gIDMzJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICB9XG59XG5cbiMke25zfS1iZWFjb24gbWFyayB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LCAxODUsIDAsIDEpO1xuICBib3JkZXItcmFkaXVzOiAxMDAlIDEwMCU7XG4gIGhlaWdodDogMWVtO1xuICBsZWZ0OiAxZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxZW07XG4gIHdpZHRoOiAxZW07XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3IgbWFyayB7XG4gIGJhY2tncm91bmQ6ICNmZjVmNTg7XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3I6YmVmb3JlLCAjJHtuc30tYmVhY29uLmVycm9yOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDk1LCA4OCwgMC4yKTtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS13YXJuaW5nIG1hcmsge1xuICBiYWNrZ3JvdW5kOiAjZmZiZDJlO1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LXdhcm5pbmc6YmVmb3JlLCAjJHtuc30tYmVhY29uLndhcm5pbmc6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTg5LCA0NiwgMC4yKTtcbn1cbmA7XG5cbmNvbnN0IGh0bWwgPSBgXG48YXNpZGUgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30taGlkZGVuXCIgdGl0bGU9XCJidWlsZCBzdGF0dXNcIj5cbiAgPGZpZ3VyZSBpZD1cIiR7bnN9LWJlYWNvblwiPlxuICAgIDxtYXJrLz5cbiAgPC9maWd1cmU+XG4gIDxuYXYgaWQ9XCIke25zfS1uYXZcIj5cbiAgICA8ZGl2IGlkPVwiJHtuc30tY2xvc2VcIiB0aXRsZT1cImNsb3NlXCI+PC9kaXY+XG4gICAgPGRpdiBpZD1cIiR7bnN9LW1pblwiIHRpdGxlPVwibWlubWl6ZVwiPjwvZGl2PlxuICA8L25hdj5cbiAgPGgxIGlkPVwiJHtuc30tdGl0bGVcIj5cbiAgICBidWlsZCBzdGF0dXNcbiAgICA8ZW0gaWQ9XCIke25zfS10aXRsZS1lcnJvcnNcIj48L2VtPlxuICAgIDxlbSBpZD1cIiR7bnN9LXRpdGxlLXdhcm5pbmdzXCI+PC9lbT5cbiAgPC9oMT5cbiAgPGFydGljbGUgaWQ9XCIke25zfS1wcm9ibGVtc1wiPlxuICAgIDxwcmUgaWQ9XCIke25zfS1zdWNjZXNzXCI+PGVtPkJ1aWxkIFN1Y2Nlc3NmdWw8L2VtPjwvcHJlPlxuICAgIDxwcmUgaWQ9XCIke25zfS1lcnJvcnNcIj48L3ByZT5cbiAgICA8cHJlIGlkPVwiJHtuc30td2FybmluZ3NcIj48L3ByZT5cbiAgPC9hcnRpY2xlPlxuPC9hc2lkZT5cbmA7XG5cbmNvbnN0IGluaXQgPSAob3B0aW9ucywgc29ja2V0KSA9PiB7XG4gIGNvbnN0IGhpZGRlbiA9IGAke25zfS1oaWRkZW5gO1xuICBsZXQgYXNpZGU7XG4gIGxldCBiZWFjb247XG4gIGxldCBwcm9ibGVtcztcbiAgbGV0IHByZUVycm9ycztcbiAgbGV0IHByZVdhcm5pbmdzO1xuICBsZXQgdGl0bGVFcnJvcnM7XG4gIGxldCB0aXRsZVdhcm5pbmdzO1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIHByZUVycm9ycy5pbm5lckhUTUwgPSAnJztcbiAgICBwcmVXYXJuaW5ncy5pbm5lckhUTUwgPSAnJztcbiAgICBwcm9ibGVtcy5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1zdWNjZXNzYCk7XG4gICAgYmVhY29uLmNsYXNzTmFtZSA9ICcnO1xuICB9O1xuXG4gIGNvbnN0IGFkZEVycm9ycyA9IChlcnJvcnMpID0+IHtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgYmVhY29uLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWVycm9yYCk7XG5cbiAgICAgIGZvciAoY29uc3QgZXJyb3Igb2YgZXJyb3JzKSB7XG4gICAgICAgIGNvbnN0IG1hcmt1cCA9IGA8ZW0+RXJyb3I8L2VtPiBpbiAke2Vycm9yfWA7XG4gICAgICAgIGFkZEh0bWwobWFya3VwLCBwcmVFcnJvcnMpO1xuICAgICAgfVxuXG4gICAgICB0aXRsZUVycm9ycy5pbm5lclRleHQgPSBgJHtlcnJvcnMubGVuZ3RofSBFcnJvcihzKWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlRXJyb3JzLmlubmVyVGV4dCA9ICcnO1xuICAgIH1cbiAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG4gIH07XG5cbiAgY29uc3QgYWRkV2FybmluZ3MgPSAod2FybmluZ3MpID0+IHtcbiAgICBpZiAod2FybmluZ3MubGVuZ3RoKSB7XG4gICAgICBpZiAoIWJlYWNvbi5jbGFzc0xpc3QuY29udGFpbnMoYCR7bnN9LWVycm9yYCkpIHtcbiAgICAgICAgYmVhY29uLmNsYXNzTGlzdC5hZGQoYCR7bnN9LXdhcm5pbmdgKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCB3YXJuaW5nIG9mIHdhcm5pbmdzKSB7XG4gICAgICAgIGNvbnN0IG1hcmt1cCA9IGA8ZW0+V2FybmluZzwvZW0+IGluICR7d2FybmluZ31gO1xuICAgICAgICBhZGRIdG1sKG1hcmt1cCwgcHJlV2FybmluZ3MpO1xuICAgICAgfVxuXG4gICAgICB0aXRsZVdhcm5pbmdzLmlubmVyVGV4dCA9IGAke3dhcm5pbmdzLmxlbmd0aH0gV2FybmluZyhzKWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlV2FybmluZ3MuaW5uZXJUZXh0ID0gJyc7XG4gICAgfVxuXG4gICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICB9O1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgYWRkQ3NzKGNzcyk7XG4gICAgW2FzaWRlXSA9IGFkZEh0bWwoaHRtbCk7XG4gICAgYmVhY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWJlYWNvbmApO1xuICAgIHByb2JsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXByb2JsZW1zYCk7XG4gICAgcHJlRXJyb3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWVycm9yc2ApO1xuICAgIHByZVdhcm5pbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXdhcm5pbmdzYCk7XG4gICAgdGl0bGVFcnJvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tdGl0bGUtZXJyb3JzYCk7XG4gICAgdGl0bGVXYXJuaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS10aXRsZS13YXJuaW5nc2ApO1xuXG4gICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tY2xvc2VgKTtcbiAgICBjb25zdCBtaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tbWluYCk7XG5cbiAgICBhc2lkZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LW1pbmApO1xuICAgIH0pO1xuXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBhc2lkZS5jbGFzc0xpc3QuYWRkKGAke25zfS1oaWRkZW5gKTtcbiAgICB9KTtcblxuICAgIG1pbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBhc2lkZS5jbGFzc0xpc3QuYWRkKGAke25zfS1taW5gKTtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHNvY2tldE1lc3NhZ2Uoc29ja2V0LCAoYWN0aW9uLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFhc2lkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICdwcm9ibGVtcyc6XG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIGFkZEVycm9ycyhkYXRhLmVycm9ycyk7XG4gICAgICAgIGFkZFdhcm5pbmdzKGRhdGEud2FybmluZ3MpO1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgIGlmICghcHJlRXJyb3JzLmNoaWxkcmVuLmxlbmd0aCAmJiAhcHJlV2FybmluZ3MuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgcHJvYmxlbXMuY2xhc3NMaXN0LmFkZChgJHtuc30tc3VjY2Vzc2ApO1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhc2lkZS5jbGFzc0xpc3QuYWRkKGhpZGRlbiksIDNlMyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQgfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCBhZGRIdG1sID0gKGh0bWwsIHBhcmVudCkgPT4ge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgbm9kZXMgPSBbXTtcblxuICBkaXYuaW5uZXJIVE1MID0gaHRtbC50cmltKCk7XG5cbiAgd2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XG4gICAgbm9kZXMucHVzaCgocGFyZW50IHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKGRpdi5maXJzdENoaWxkKSk7XG4gIH1cblxuICByZXR1cm4gbm9kZXM7XG59O1xuXG5jb25zdCBhZGRDc3MgPSAoY3NzKSA9PiB7XG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICBpZiAoY3NzLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cblxuICAvLyBhcHBlbmQgdGhlIHN0eWxlc2hlZXQgZm9yIHRoZSBzdmdcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59O1xuXG5jb25zdCBzb2NrZXRNZXNzYWdlID0gKHNvY2tldCwgaGFuZGxlcikgPT4ge1xuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBoYW5kbGVyKGFjdGlvbiwgZGF0YSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGFkZENzcywgYWRkSHRtbCwgc29ja2V0TWVzc2FnZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29yZV8xID0gcmVxdWlyZShcIkBvbmUvY29yZVwiKTtcbnZhciBBcHBDb250ZW50TW9kdWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcENvbnRlbnRNb2R1bGUoKSB7XG4gICAgfVxuICAgIEFwcENvbnRlbnRNb2R1bGUgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgY29yZV8xLk1vZHVsZSgpXG4gICAgXSwgQXBwQ29udGVudE1vZHVsZSk7XG4gICAgcmV0dXJuIEFwcENvbnRlbnRNb2R1bGU7XG59KCkpO1xuZXhwb3J0cy5BcHBDb250ZW50TW9kdWxlID0gQXBwQ29udGVudE1vZHVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfdGhpcyA9IHRoaXM7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29yZV8xID0gcmVxdWlyZShcIkBvbmUvY29yZVwiKTtcbnZhciBhcHBfY29udGVudF9tb2R1bGVfMSA9IHJlcXVpcmUoXCIuL2NvbnRlbnQvYXBwLmNvbnRlbnQubW9kdWxlXCIpO1xuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXBwO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGFwcCA9IG5ldyBjb3JlXzEuT25lRmFjdG9yeShhcHBfY29udGVudF9tb2R1bGVfMS5BcHBDb250ZW50TW9kdWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBhcHAuc3RhcnQoKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH0pO1xuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0eEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDelFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUNBOzs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNtQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FFQTtBQUNBO0FBQ0EsYUFFQTs7Ozs7Ozs7Ozs7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9
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
/******/ 			var chunkId = "background";
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
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
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

/***/ "./background/app.background.module.ts":
/*!*********************************************!*\
  !*** ./background/app.background.module.ts ***!
  \*********************************************/
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
var AppBackgroundModule = /** @class */ (function () {
    function AppBackgroundModule() {
    }
    AppBackgroundModule = __decorate([
        core_1.Module()
    ], AppBackgroundModule);
    return AppBackgroundModule;
}());
exports.AppBackgroundModule = AppBackgroundModule;


/***/ }),

/***/ "./main-304adeb7608af232dc8d0078fc272c84.ts":
/*!**************************************************!*\
  !*** ./main-304adeb7608af232dc8d0078fc272c84.ts ***!
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
var app_background_module_1 = __webpack_require__(/*! ./background/app.background.module */ "./background/app.background.module.ts");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new core_1.OneFactory(app_background_module_1.AppBackgroundModule);
                return [4 /*yield*/, app.start()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });


/***/ }),

/***/ 0:
/*!************************************************************************************!*\
  !*** multi ./main-304adeb7608af232dc8d0078fc272c84.ts webpack-plugin-serve/client ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /mnt/c/Users/marcus-sa/Git/one-web-ext-cli/example/apps/appwriter/main-304adeb7608af232dc8d0078fc272c84.ts */"./main-304adeb7608af232dc8d0078fc272c84.ts");
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"../../../node_modules/webpack-plugin-serve/client.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL2luamVjdC5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL2luamVjdGFibGUuZGVjb3JhdG9yLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZGVjb3JhdG9ycy9pbnZlcnNpZnkuZGVjb3JhdG9ycy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbW9kdWxlL2dsb2JhbC5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbW9kdWxlL21vZHVsZS5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL21vZHVsZS9yZXF1ZXN0LXNjb3BlLmRlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2RlY29yYXRvcnMvbW9kdWxlL3RyYW5zaWVudC1zY29wZS5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9kZWNvcmF0b3JzL211bHRpLWluamVjdC5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy1oYW5kbGVyLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMtem9uZS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL2NpcmN1bGFyLWRlcGVuZGVuY3kuZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2V4Y2VwdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9pbnZhbGlkLW1vZHVsZS5leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9pbnZhbGlkLXByb3ZpZGVyLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL21pc3NpbmctaW5qZWN0aW9uLXRva2VuLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL21pc3NpbmctcmVxdWlyZWQtZGVwZW5kZW5jeS5leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9tdWx0aS1wcm92aWRlci5leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9lcnJvcnMvZXhjZXB0aW9ucy9ydW50aW1lLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL3Vua25vd24tZXhwb3J0LmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL3Vua25vd24tbW9kdWxlLmV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2Vycm9ycy9leGNlcHRpb25zL3Vua25vd24tcHJvdmlkZXIuZXhjZXB0aW9uLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL2luZGV4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZXJyb3JzL21lc3NhZ2VzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL2ZvcndhcmQtcmVmLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tZXRhZGF0YS1zdG9yYWdlLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvbW9kdWxlL2NvbXBpbGVyLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvbW9kdWxlL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL21vZHVsZS9pbmplY3Rpb24tdG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tb2R1bGUvbW9kdWxlLXRva2VuLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9tb2R1bGUvbW9kdWxlLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL0BvbmUvY29yZS9saWIvbW9kdWxlL3NjYW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9yZWZsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvQG9uZS9jb3JlL2xpYi9yZWdpc3RyeS5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9Ab25lL2NvcmUvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5LWluamVjdC1kZWNvcmF0b3JzL2xpYi9kZWNvcmF0b3JzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS1pbmplY3QtZGVjb3JhdG9ycy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL2RlY29yYXRvcl91dGlscy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vaW5qZWN0LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9pbmplY3RhYmxlLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9tdWx0aV9pbmplY3QuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL25hbWVkLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvYW5ub3RhdGlvbi9vcHRpb25hbC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vcG9zdF9jb25zdHJ1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL3RhZ2dlZC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2Fubm90YXRpb24vdGFyZ2V0X25hbWUuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9hbm5vdGF0aW9uL3VubWFuYWdlZC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2JpbmRpbmdzL2JpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9iaW5kaW5ncy9iaW5kaW5nX2NvdW50LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29uc3RhbnRzL2Vycm9yX21zZ3MuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9jb25zdGFudHMvbGl0ZXJhbF90eXBlcy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29udGFpbmVyL2NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnRhaW5lci9jb250YWluZXJfbW9kdWxlLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvY29udGFpbmVyL2NvbnRhaW5lcl9zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL2NvbnRhaW5lci9sb29rdXAuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9pbnZlcnNpZnkuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9jb250ZXh0LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9wbGFuLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvcGxhbm5lci5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3F1ZXJ5YWJsZV9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9wbGFubmluZy9yZWZsZWN0aW9uX3V0aWxzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvcGxhbm5pbmcvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3BsYW5uaW5nL3RhcmdldC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3Jlc29sdXRpb24vaW5zdGFudGlhdGlvbi5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3Jlc29sdXRpb24vcmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ19pbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvYmluZGluZ19pbl93aGVuX29uX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX29uX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX3RvX3N5bnRheC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3N5bnRheC9iaW5kaW5nX3doZW5fb25fc3ludGF4LmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvc3ludGF4L2JpbmRpbmdfd2hlbl9zeW50YXguanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi9zeW50YXgvY29uc3RyYWludF9oZWxwZXJzLmpzIiwid2VicGFjazovLy8vbW50L2MvVXNlcnMvbWFyY3VzLXNhL0dpdC9vbmUtd2ViLWV4dC1jbGkvbm9kZV9tb2R1bGVzL2ludmVyc2lmeS9saWIvdXRpbHMvYmluZGluZ191dGlscy5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3V0aWxzL2V4Y2VwdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvaW52ZXJzaWZ5L2xpYi91dGlscy9pZC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9pbnZlcnNpZnkvbGliL3V0aWxzL3NlcmlhbGl6YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvb2JqZWN0LWhhc2gvZGlzdC9vYmplY3RfaGFzaC5qcyIsIndlYnBhY2s6Ly8vL21udC9jL1VzZXJzL21hcmN1cy1zYS9HaXQvb25lLXdlYi1leHQtY2xpL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy9tbnQvYy9Vc2Vycy9tYXJjdXMtc2EvR2l0L29uZS13ZWItZXh0LWNsaS9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS9SZWZsZWN0LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50LWhtci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50LWxvZy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9vdmVybGF5cy9wcm9ncmVzcy1taW5pbWFsLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9vdmVybGF5cy9wcm9ncmVzcy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvb3ZlcmxheXMvc3RhdHVzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9vdmVybGF5cy91dGlsLmpzIiwid2VicGFjazovLy8uL2JhY2tncm91bmQvYXBwLmJhY2tncm91bmQubW9kdWxlLnRzIiwid2VicGFjazovLy8uL21haW4tMzA0YWRlYjc2MDhhZjIzMmRjOGQwMDc4ZmMyNzJjODQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJ3cHMtaG1yLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwid3BzLWhtci5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJmOGYxZDQ2M2FlNGIyZjA3MDdmNlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJiYWNrZ3JvdW5kXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL2ZhY3RvcnlcIik7XG5mdW5jdGlvbiBib290c3RyYXAobW9kdWxlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yeSA9IG5ldyBmYWN0b3J5XzEuT25lRmFjdG9yeShtb2R1bGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIGZhY3Rvcnkuc3RhcnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5ib290c3RyYXAgPSBib290c3RyYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib290c3RyYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNIQVJFRF9NT0RVTEVfTUVUQURBVEEgPSBTeW1ib2wuZm9yKCdNZXRhZGF0YTxTaGFyZWRNb2R1bGU+Jyk7XG5leHBvcnRzLlNDT1BFX01FVEFEQVRBID0gU3ltYm9sLmZvcignTWV0YWRhdGE8U2NvcGU+Jyk7XG5leHBvcnRzLlBST1ZJREVSX01FVEFEQVRBID0gU3ltYm9sLmZvcignTWV0YWRhdGE8UHJvdmlkZXI+Jyk7XG5leHBvcnRzLk1FVEFEQVRBID0ge1xuICAgIElNUE9SVFM6ICdpbXBvcnRzJyxcbiAgICBFWFBPUlRTOiAnZXhwb3J0cycsXG4gICAgUFJPVklERVJTOiAncHJvdmlkZXJzJyxcbn07XG5leHBvcnRzLlNDT1BFUyA9IHtcbiAgICBTSU5HTEVUT046ICdzaW5nbGV0b24tc2NvcGUnLFxuICAgIFRSQU5TSUVOVDogJ3RyYW5zaWVudC1zY29wZScsXG4gICAgUkVRVUVTVDogJ3JlcXVlc3Qtc2NvcGUnLFxufTtcbmV4cG9ydHMuUFJPVklERVJfVFlQRVMgPSB7XG4gICAgRkFDVE9SWTogJ3VzZS1mYWN0b3J5JyxcbiAgICBDTEFTUzogJ3VzZS1jbGFzcycsXG4gICAgRVhJU1RJTkc6ICd1c2UtZXhpc3RpbmcnLFxuICAgIFZBTFVFOiAndXNlLXZhbHVlJyxcbiAgICBERUZBVUxUOiAncHJvdmlkZXInLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9pbnZlcnNpZnkuZGVjb3JhdG9yc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9pbmplY3RhYmxlLmRlY29yYXRvclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tdWx0aS1pbmplY3QuZGVjb3JhdG9yXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2luamVjdC5kZWNvcmF0b3JcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vbW9kdWxlXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbnZhciByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uL3JlZ2lzdHJ5XCIpO1xuZnVuY3Rpb24gY3JlYXRlTGF6eUluamVjdGlvbih0YXJnZXQsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsYXp5SW5qZWN0LCBwcm92aWRlcikge1xuICAgICAgICByZWdpc3RyeV8xLlJlZ2lzdHJ5LmFzc2VydFByb3ZpZGVyKHByb3ZpZGVyKTtcbiAgICAgICAgbGF6eUluamVjdChwcm92aWRlcikodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuY3JlYXRlTGF6eUluamVjdGlvbiA9IGNyZWF0ZUxhenlJbmplY3Rpb247XG5mdW5jdGlvbiBJbmplY3QocHJvdmlkZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICAgICAgaWYgKCFyZWdpc3RyeV8xLlJlZ2lzdHJ5Lmhhc0ZvcndhcmRSZWYocHJvdmlkZXIpKSB7XG4gICAgICAgICAgICByZWdpc3RyeV8xLlJlZ2lzdHJ5LmFzc2VydFByb3ZpZGVyKHByb3ZpZGVyLCB0YXJnZXQuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldEluamVjdGlvblRva2VuKHByb3ZpZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBpbnZlcnNpZnlfMS5pbmplY3QodG9rZW4pKHRhcmdldCwgcHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICAgIHJlZ2lzdHJ5XzEuUmVnaXN0cnkubGF6eUluamVjdHMuYWRkKHtcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgZm9yd2FyZFJlZjogcHJvdmlkZXIsXG4gICAgICAgICAgICBsYXp5SW5qZWN0OiBjcmVhdGVMYXp5SW5qZWN0aW9uKHRhcmdldCwgcHJvcGVydHkpLFxuICAgICAgICB9KTtcbiAgICB9O1xufVxuZXhwb3J0cy5JbmplY3QgPSBJbmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmplY3QuZGVjb3JhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5mdW5jdGlvbiBJbmplY3RhYmxlKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoY29uc3RhbnRzXzEuUFJPVklERVJfTUVUQURBVEEsIHRydWUsIHRhcmdldCk7XG4gICAgICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSh0YXJnZXQpO1xuICAgIH07XG59XG5leHBvcnRzLkluamVjdGFibGUgPSBJbmplY3RhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5qZWN0YWJsZS5kZWNvcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xuZXhwb3J0cy5PcHRpb25hbCA9IGludmVyc2lmeV8xLm9wdGlvbmFsO1xuZXhwb3J0cy5Qb3N0Q29uc3RydWN0ID0gaW52ZXJzaWZ5XzEucG9zdENvbnN0cnVjdDtcbmV4cG9ydHMuVGFyZ2V0TmFtZSA9IGludmVyc2lmeV8xLnRhcmdldE5hbWU7XG5leHBvcnRzLlVubWFuYWdlZCA9IGludmVyc2lmeV8xLnVubWFuYWdlZDtcbmV4cG9ydHMuRGVjb3JhdGUgPSBpbnZlcnNpZnlfMS5kZWNvcmF0ZTtcbmV4cG9ydHMuVGFnZ2VkID0gaW52ZXJzaWZ5XzEudGFnZ2VkO1xuZXhwb3J0cy5OYW1lZCA9IGludmVyc2lmeV8xLm5hbWVkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW52ZXJzaWZ5LmRlY29yYXRvcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29uc3RhbnRzXCIpO1xuZnVuY3Rpb24gR2xvYmFsKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoY29uc3RhbnRzXzEuU0hBUkVEX01PRFVMRV9NRVRBREFUQSwgdHJ1ZSwgdGFyZ2V0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5HbG9iYWwgPSBHbG9iYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nbG9iYWwuZGVjb3JhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21vZHVsZS5kZWNvcmF0b3JcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vZ2xvYmFsLmRlY29yYXRvclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9yZXF1ZXN0LXNjb3BlLmRlY29yYXRvclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi90cmFuc2llbnQtc2NvcGUuZGVjb3JhdG9yXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbnZhciByZWZsZWN0b3JfMSA9IHJlcXVpcmUoXCIuLi8uLi9yZWZsZWN0b3JcIik7XG5mdW5jdGlvbiBNb2R1bGUobWV0YWRhdGEpIHtcbiAgICBpZiAobWV0YWRhdGEgPT09IHZvaWQgMCkgeyBtZXRhZGF0YSA9IHt9OyB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmVmbGVjdG9yXzEuUmVmbGVjdG9yLmRlZmluZUJ5S2V5cyhtZXRhZGF0YSwgdGFyZ2V0KTtcbiAgICAgICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpKHRhcmdldCk7XG4gICAgfTtcbn1cbmV4cG9ydHMuTW9kdWxlID0gTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kdWxlLmRlY29yYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb25zdGFudHNcIik7XG5mdW5jdGlvbiBSZXF1ZXN0U2NvcGUoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShjb25zdGFudHNfMS5TQ09QRV9NRVRBREFUQSwgY29uc3RhbnRzXzEuU0NPUEVTLlJFUVVFU1QsIHRhcmdldCk7XG4gICAgfTtcbn1cbmV4cG9ydHMuUmVxdWVzdFNjb3BlID0gUmVxdWVzdFNjb3BlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVxdWVzdC1zY29wZS5kZWNvcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29uc3RhbnRzXCIpO1xuZnVuY3Rpb24gVHJhbnNpZW50U2NvcGUoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShjb25zdGFudHNfMS5TQ09QRV9NRVRBREFUQSwgY29uc3RhbnRzXzEuU0NPUEVTLlRSQU5TSUVOVCwgdGFyZ2V0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5UcmFuc2llbnRTY29wZSA9IFRyYW5zaWVudFNjb3BlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhbnNpZW50LXNjb3BlLmRlY29yYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xudmFyIHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi4vcmVnaXN0cnlcIik7XG5mdW5jdGlvbiBNdWx0aUluamVjdCh0b2tlbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKCFyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzSW5qZWN0aW9uVG9rZW4odG9rZW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uKCdATXVsdGlJbmplY3QoKScpO1xuICAgICAgICB9XG4gICAgICAgIGludmVyc2lmeV8xLm11bHRpSW5qZWN0KHRva2VuLm5hbWUpKHRhcmdldCwgcHJvcGVydHlLZXksIGluZGV4KTtcbiAgICB9O1xufVxuZXhwb3J0cy5NdWx0aUluamVjdCA9IE11bHRpSW5qZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGktaW5qZWN0LmRlY29yYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFeGNlcHRpb25zSGFuZGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXhjZXB0aW9uc0hhbmRsZXIoKSB7XG4gICAgfVxuICAgIEV4Y2VwdGlvbnNIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGUgPSBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXhjZXB0aW9uLnN0YWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBFeGNlcHRpb25zSGFuZGxlcjtcbn0oKSk7XG5leHBvcnRzLkV4Y2VwdGlvbnNIYW5kbGVyID0gRXhjZXB0aW9uc0hhbmRsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGNlcHRpb25zLWhhbmRsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGV4Y2VwdGlvbnNfaGFuZGxlcl8xID0gcmVxdWlyZShcIi4vZXhjZXB0aW9ucy1oYW5kbGVyXCIpO1xudmFyIG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi9tZXNzYWdlc1wiKTtcbnZhciBFeGNlcHRpb25zWm9uZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXhjZXB0aW9uc1pvbmUoKSB7XG4gICAgfVxuICAgIEV4Y2VwdGlvbnNab25lLnJ1biA9IGZ1bmN0aW9uICh6b25lKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDIsICwgM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB6b25lKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4Y2VwdGlvbkhhbmRsZXIuaGFuZGxlKGVfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBtZXNzYWdlc18xLlVOSEFORExFRF9SVU5USU1FX0VYQ0VQVElPTjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEV4Y2VwdGlvbnNab25lLmV4Y2VwdGlvbkhhbmRsZXIgPSBuZXcgZXhjZXB0aW9uc19oYW5kbGVyXzEuRXhjZXB0aW9uc0hhbmRsZXIoKTtcbiAgICByZXR1cm4gRXhjZXB0aW9uc1pvbmU7XG59KCkpO1xuZXhwb3J0cy5FeGNlcHRpb25zWm9uZSA9IEV4Y2VwdGlvbnNab25lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhjZXB0aW9ucy16b25lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuLi9tZXNzYWdlc1wiKTtcbnZhciBDaXJjdWxhckRlcGVuZGVuY3lFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDaXJjdWxhckRlcGVuZGVuY3lFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2lyY3VsYXJEZXBlbmRlbmN5RXhjZXB0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2VzXzEuQ2lyY3VsYXJEZXBlbmRlbmN5TWVzc2FnZShjb250ZXh0KSkgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENpcmN1bGFyRGVwZW5kZW5jeUV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLkNpcmN1bGFyRGVwZW5kZW5jeUV4Y2VwdGlvbiA9IENpcmN1bGFyRGVwZW5kZW5jeUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNpcmN1bGFyLWRlcGVuZGVuY3kuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2NpcmN1bGFyLWRlcGVuZGVuY3kuZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21pc3NpbmctcmVxdWlyZWQtZGVwZW5kZW5jeS5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vaW52YWxpZC1tb2R1bGUuZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL211bHRpLXByb3ZpZGVyLmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi91bmtub3duLXByb3ZpZGVyLmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9pbnZhbGlkLXByb3ZpZGVyLmV4Y2VwdGlvblwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9taXNzaW5nLWluamVjdGlvbi10b2tlbi5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vdW5rbm93bi1leHBvcnQuZXhjZXB0aW9uXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3Vua25vd24tbW9kdWxlLmV4Y2VwdGlvblwiKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIG1lc3NhZ2VzXzEgPSByZXF1aXJlKFwiLi4vbWVzc2FnZXNcIik7XG52YXIgSW52YWxpZE1vZHVsZUV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEludmFsaWRNb2R1bGVFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW52YWxpZE1vZHVsZUV4Y2VwdGlvbih0cmFjZSkge1xuICAgICAgICBpZiAodHJhY2UgPT09IHZvaWQgMCkgeyB0cmFjZSA9IFtdOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzY29wZSA9IHRyYWNlLm1hcChmdW5jdGlvbiAobW9kdWxlKSB7IHJldHVybiBtb2R1bGUubmFtZTsgfSkuam9pbignIC0+ICcpO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2VzXzEuSW52YWxpZE1vZHVsZU1lc3NhZ2Uoc2NvcGUpKSB8fCB0aGlzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBJbnZhbGlkTW9kdWxlRXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuSW52YWxpZE1vZHVsZUV4Y2VwdGlvbiA9IEludmFsaWRNb2R1bGVFeGNlcHRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnZhbGlkLW1vZHVsZS5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciBJbnZhbGlkUHJvdmlkZXJFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnZhbGlkUHJvdmlkZXJFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW52YWxpZFByb3ZpZGVyRXhjZXB0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCAocHJvdmlkZXIubmFtZSB8fFxuICAgICAgICAgICAgcHJvdmlkZXIudG9TdHJpbmcoKSkgKyBcIiBpcyBpbnZhbGlkLiBNdXN0IGJlIGFuIEluamVjdGlvblRva2VuIG9yIEluamVjdGFibGVcIikgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEludmFsaWRQcm92aWRlckV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLkludmFsaWRQcm92aWRlckV4Y2VwdGlvbiA9IEludmFsaWRQcm92aWRlckV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludmFsaWQtcHJvdmlkZXIuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuLi9tZXNzYWdlc1wiKTtcbnZhciBNaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2VzXzEuTWlzc2luZ0luamVjdGlvblRva2VuTWVzc2FnZShjb250ZXh0KSkgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbjtcbn0ocnVudGltZV9leGNlcHRpb25fMS5SdW50aW1lRXhjZXB0aW9uKSk7XG5leHBvcnRzLk1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbiA9IE1pc3NpbmdJbmplY3Rpb25Ub2tlbkV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1pc3NpbmctaW5qZWN0aW9uLXRva2VuLmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuLi9tZXNzYWdlc1wiKTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeUV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeUV4Y2VwdGlvbihuYW1lLCByZWFzb24pIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2VzXzEuTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeU1lc3NhZ2UobmFtZSwgcmVhc29uKSkgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lFeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5NaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5RXhjZXB0aW9uID0gTWlzc2luZ1JlcXVpcmVkRGVwZW5kZW5jeUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1pc3NpbmctcmVxdWlyZWQtZGVwZW5kZW5jeS5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfZXhjZXB0aW9uXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lLmV4Y2VwdGlvblwiKTtcbnZhciBtZXNzYWdlc18xID0gcmVxdWlyZShcIi4uL21lc3NhZ2VzXCIpO1xudmFyIE11bHRpUHJvdmlkZXJFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNdWx0aVByb3ZpZGVyRXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE11bHRpUHJvdmlkZXJFeGNlcHRpb24obmFtZSkge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVzc2FnZXNfMS5NdWx0aVByb3ZpZGVyTWVzc2FnZShuYW1lKSkgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE11bHRpUHJvdmlkZXJFeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5NdWx0aVByb3ZpZGVyRXhjZXB0aW9uID0gTXVsdGlQcm92aWRlckV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW11bHRpLXByb3ZpZGVyLmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUnVudGltZUV4Y2VwdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJ1bnRpbWVFeGNlcHRpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUnVudGltZUV4Y2VwdGlvbihtc2cpIHtcbiAgICAgICAgaWYgKG1zZyA9PT0gdm9pZCAwKSB7IG1zZyA9ICcnOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1zZykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubXNnID0gbXNnO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJ1bnRpbWVFeGNlcHRpb24ucHJvdG90eXBlLndoYXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1zZztcbiAgICB9O1xuICAgIHJldHVybiBSdW50aW1lRXhjZXB0aW9uO1xufShFcnJvcikpO1xuZXhwb3J0cy5SdW50aW1lRXhjZXB0aW9uID0gUnVudGltZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ1bnRpbWUuZXhjZXB0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lX2V4Y2VwdGlvbl8xID0gcmVxdWlyZShcIi4vcnVudGltZS5leGNlcHRpb25cIik7XG52YXIgbWVzc2FnZXNfMSA9IHJlcXVpcmUoXCIuLi9tZXNzYWdlc1wiKTtcbnZhciBVbmtub3duRXhwb3J0RXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVW5rbm93bkV4cG9ydEV4Y2VwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVbmtub3duRXhwb3J0RXhjZXB0aW9uKG5hbWUsIGV4cG9ydGVkKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlc18xLlVua25vd25FeHBvcnRNZXNzYWdlKG5hbWUsIGV4cG9ydGVkKSkgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFVua25vd25FeHBvcnRFeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5Vbmtub3duRXhwb3J0RXhjZXB0aW9uID0gVW5rbm93bkV4cG9ydEV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVua25vd24tZXhwb3J0LmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIFVua25vd25Nb2R1bGVFeGNlcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVbmtub3duTW9kdWxlRXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVua25vd25Nb2R1bGVFeGNlcHRpb24odHJhY2UpIHtcbiAgICAgICAgaWYgKHRyYWNlID09PSB2b2lkIDApIHsgdHJhY2UgPSBbXTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc2NvcGUgPSB0cmFjZS5tYXAoZnVuY3Rpb24gKG1vZHVsZSkgeyByZXR1cm4gbW9kdWxlLm5hbWU7IH0pLmpvaW4oJyAtPiAnKTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBcIk5lc3QgY2Fubm90IHNlbGVjdCBnaXZlbiBtb2R1bGUgKGl0IGRvZXMgbm90IGV4aXN0IGluIGN1cnJlbnQgY29udGV4dCkuIFNjb3BlIFtcIiArIHNjb3BlICsgXCJdXCIpIHx8IHRoaXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFVua25vd25Nb2R1bGVFeGNlcHRpb247XG59KHJ1bnRpbWVfZXhjZXB0aW9uXzEuUnVudGltZUV4Y2VwdGlvbikpO1xuZXhwb3J0cy5Vbmtub3duTW9kdWxlRXhjZXB0aW9uID0gVW5rbm93bk1vZHVsZUV4Y2VwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVua25vd24tbW9kdWxlLmV4Y2VwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV9leGNlcHRpb25fMSA9IHJlcXVpcmUoXCIuL3J1bnRpbWUuZXhjZXB0aW9uXCIpO1xudmFyIHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi4vLi4vcmVnaXN0cnlcIik7XG52YXIgVW5rbm93blByb3ZpZGVyRXhjZXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVW5rbm93blByb3ZpZGVyRXhjZXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVua25vd25Qcm92aWRlckV4Y2VwdGlvbihwcm92aWRlciwgbW9kdWxlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBuYW1lID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlck5hbWUocHJvdmlkZXIpO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgZm91bmQgaW4gXCIgKyBtb2R1bGUubmFtZSkgfHwgdGhpcztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVW5rbm93blByb3ZpZGVyRXhjZXB0aW9uO1xufShydW50aW1lX2V4Y2VwdGlvbl8xLlJ1bnRpbWVFeGNlcHRpb24pKTtcbmV4cG9ydHMuVW5rbm93blByb3ZpZGVyRXhjZXB0aW9uID0gVW5rbm93blByb3ZpZGVyRXhjZXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5rbm93bi1wcm92aWRlci5leGNlcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vZXhjZXB0aW9uc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tZXNzYWdlc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9leGNlcHRpb25zLXpvbmVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vZXhjZXB0aW9ucy1oYW5kbGVyXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbnZhbGlkTW9kdWxlTWVzc2FnZSA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgIHJldHVybiBcIk5lc3QgY2Fubm90IGNyZWF0ZSB0aGUgbW9kdWxlIGluc3RhbmNlLiBPZnRlbiwgdGhpcyBpcyBiZWNhdXNlIG9mIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSBiZXR3ZWVuIG1vZHVsZXMuIFVzZSBmb3J3YXJkUmVmKCkgdG8gYXZvaWQgaXQuIChSZWFkIG1vcmUgaHR0cHM6Ly9kb2NzLm5lc3Rqcy5jb20vYWR2YW5jZWQvY2lyY3VsYXItZGVwZW5kZW5jeSkuIFNjb3BlIFtcIiArIHNjb3BlICsgXCJdXCI7XG59O1xuZXhwb3J0cy5Vbmtub3duRXhwb3J0TWVzc2FnZSA9IGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydGVkKSB7XG4gICAgcmV0dXJuIFwiTmVzdCBjYW5ub3QgZXhwb3J0IGEgY29tcG9uZW50L21vZHVsZSAoXCIgKyBleHBvcnRlZCArIFwiKSB0aGF0IGlzIG5vdCBhIHBhcnQgb2YgdGhlIGN1cnJlbnRseSBwcm9jZXNzZWQgbW9kdWxlIChcIiArIG1vZHVsZSArIFwiKS4gUGxlYXNlIHZlcmlmeSB3aGV0aGVyIGVhY2ggZXhwb3J0ZWQgdW5pdCBpcyBhdmFpbGFibGUgaW4gdGhpcyBwYXJ0aWN1bGFyIGNvbnRleHQuXCI7XG59O1xuZXhwb3J0cy5NaXNzaW5nUmVxdWlyZWREZXBlbmRlbmN5TWVzc2FnZSA9IGZ1bmN0aW9uIChuYW1lLCByZWFzb24pIHtcbiAgICByZXR1cm4gXCJUaGUgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBwYWNrYWdlIGlzIG1pc3NpbmcuIFBsZWFzZSwgbWFrZSBzdXJlIHRvIGluc3RhbGwgdGhpcyBsaWJyYXJ5ICgkIHlhcm4gYWRkIFwiICsgbmFtZSArIFwiKSB0byB0YWtlIGFkdmFudGFnZSBvZiBcIiArIHJlYXNvbiArIFwiLlwiO1xufTtcbmV4cG9ydHMuQ2lyY3VsYXJEZXBlbmRlbmN5TWVzc2FnZSA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgcmV0dXJuIFwiQSBjaXJjdWxhciBkZXBlbmRlbmN5IGhhcyBiZWVuIGRldGVjdGVkIGluc2lkZSBcIiArIGNvbnRleHQgKyBcIi4gUGxlYXNlLCBtYWtlIHN1cmUgdGhhdCBlYWNoIHNpZGUgb2YgYSBiaWRpcmVjdGlvbmFsIHJlbGF0aW9uc2hpcHMgYXJlIGRlY29yYXRlZCB3aXRoIFxcXCJmb3J3YXJkUmVmKClcXFwiLlwiO1xufTtcbmV4cG9ydHMuTXVsdGlQcm92aWRlck1lc3NhZ2UgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBcIlByb3ZpZGVyIFwiICsgbmFtZSArIFwiIGlzIGFscmVhZHkgYm91bmQuIFNldCB0aGUgbXVsdGkgcHJvcGVydHkgdG8gdHJ1ZSwgdG8gYWxsb3cgbXVsdGlwbGUgcHJvdmlkZXJzIGJlaW5nIGJvdW5kIHRvIHRoaXMgdG9rZW5cIjtcbn07XG5leHBvcnRzLk1pc3NpbmdJbmplY3Rpb25Ub2tlbk1lc3NhZ2UgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHJldHVybiBcIllvdSBjYW4gb25seSB1c2UgYW4gSW5qZWN0aW9uVG9rZW4gaW4gXCIgKyBjb250ZXh0O1xufTtcbmV4cG9ydHMuVU5IQU5ETEVEX1JVTlRJTUVfRVhDRVBUSU9OID0gJ1VuaGFuZGxlZCBSdW50aW1lIEV4Y2VwdGlvbi4nO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVzc2FnZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG1vZHVsZV8xID0gcmVxdWlyZShcIi4vbW9kdWxlXCIpO1xudmFyIHRva2Vuc18xID0gcmVxdWlyZShcIi4vdG9rZW5zXCIpO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xudmFyIHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9yZWdpc3RyeVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xudmFyIE9uZUZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9uZUZhY3RvcnkobW9kdWxlKSB7XG4gICAgICAgIHRoaXMubW9kdWxlID0gbW9kdWxlO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG5ldyBtb2R1bGVfMS5PbmVDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy5zY2FubmVyID0gbmV3IG1vZHVsZV8xLlNjYW5uZXIodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgICBPbmVGYWN0b3J5LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCBlcnJvcnNfMS5FeGNlcHRpb25zWm9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHRoaXMuc2Nhbm5lci5zY2FuKHRoaXMubW9kdWxlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5pbml0KCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUZhY3RvcnkucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgZXJyb3JzXzEuRXhjZXB0aW9uc1pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB1dGlsXzEuVXRpbHMuc2VyaWVzKHRoaXMuY29udGFpbmVyLmdldEFsbFByb3ZpZGVycyh0b2tlbnNfMS5BUFBfREVTVFJPWSkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVGYWN0b3J5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdXRpbF8xLlV0aWxzLnNlcmllcyh0aGlzLmNvbnRhaW5lci5nZXRBbGxQcm92aWRlcnModG9rZW5zXzEuQVBQX0lOSVQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lRmFjdG9yeS5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29udGFpbmVyLmdldFByb3ZpZGVyKHByb3ZpZGVyLCBtb2R1bGUsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEFsbDogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzSW5qZWN0aW9uVG9rZW4odG9rZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5NaXNzaW5nSW5qZWN0aW9uVG9rZW5FeGNlcHRpb24oJ09uZUZhY3Rvcnkuc2VsZWN0KCkuZ2V0QWxsKCknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvbnRhaW5lci5nZXRBbGxQcm92aWRlcnModG9rZW4sIG1vZHVsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzOiBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29udGFpbmVyLmlzUHJvdmlkZXJCb3VuZChwcm92aWRlciwgbW9kdWxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBPbmVGYWN0b3J5LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmlzUHJvdmlkZXJCb3VuZChwcm92aWRlcik7XG4gICAgfTtcbiAgICBPbmVGYWN0b3J5LnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgaWYgKCFyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzSW5qZWN0aW9uVG9rZW4odG9rZW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uKCdPbmVGYWN0b3J5LmdldEFsbCgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmdldEFsbFByb3ZpZGVycyh0b2tlbik7XG4gICAgfTtcbiAgICBPbmVGYWN0b3J5LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmdldFByb3ZpZGVyKHByb3ZpZGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBPbmVGYWN0b3J5O1xufSgpKTtcbmV4cG9ydHMuT25lRmFjdG9yeSA9IE9uZUZhY3Rvcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mYWN0b3J5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mb3J3YXJkUmVmID0gZnVuY3Rpb24gKGZvcndhcmRSZWYpIHsgcmV0dXJuICh7XG4gICAgZm9yd2FyZFJlZjogZm9yd2FyZFJlZixcbn0pOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9yd2FyZC1yZWYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vbW9kdWxlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9kZWNvcmF0b3JzXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2Jvb3RzdHJhcFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9mYWN0b3J5XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2ZvcndhcmQtcmVmXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3JlZmxlY3RvclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9lcnJvcnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vbWV0YWRhdGEtc3RvcmFnZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9yZWdpc3RyeVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi90b2tlbnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vdXRpbFwiKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBCYXNlTWV0YWRhdGFTdG9yYWdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYXNlTWV0YWRhdGFTdG9yYWdlKCkge1xuICAgIH1cbiAgICBCYXNlTWV0YWRhdGFTdG9yYWdlLmZpbmRCeVRhcmdldCA9IGZ1bmN0aW9uIChtZXRhZGF0YSwgdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZChtZXRhZGF0YS52YWx1ZXMoKSkuZmluZChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHZhbHVlLnRhcmdldCA9PT0gdGFyZ2V0OyB9KTtcbiAgICB9O1xuICAgIEJhc2VNZXRhZGF0YVN0b3JhZ2UuZmluZEJ5VGFyZ2V0UHJvcGVydHkgPSBmdW5jdGlvbiAobWV0YWRhdGEsIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgdmFyIGZpbmRCeVByb3BlcnR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fc3ByZWFkKG1ldGFkYXRhLnZhbHVlcygpKS5maW5kKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdmFsdWUudGFyZ2V0ID09PSB0YXJnZXQgJiYgdmFsdWUucHJvcGVydHlLZXkgPT09IHByb3BlcnR5S2V5OyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHV0aWxfMS5VdGlscy5pc05pbChwcm9wZXJ0eUtleSlcbiAgICAgICAgICAgID8gdGhpcy5maW5kQnlUYXJnZXQobWV0YWRhdGEsIHRhcmdldClcbiAgICAgICAgICAgIDogZmluZEJ5UHJvcGVydHkoKTtcbiAgICB9O1xuICAgIEJhc2VNZXRhZGF0YVN0b3JhZ2UuZmlsdGVyQnlUYXJnZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChtZXRhZGF0YSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICB2YXIgZmlsdGVyQnlQcm9wZXJ0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX3NwcmVhZChtZXRhZGF0YS52YWx1ZXMoKSkuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdmFsdWUudGFyZ2V0ID09PSB0YXJnZXQgJiYgdmFsdWUucHJvcGVydHlLZXkgPT09IHByb3BlcnR5S2V5OyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHV0aWxfMS5VdGlscy5pc05pbChwcm9wZXJ0eUtleSlcbiAgICAgICAgICAgID8gdGhpcy5maWx0ZXJCeVRhcmdldChtZXRhZGF0YSwgdGFyZ2V0KVxuICAgICAgICAgICAgOiBmaWx0ZXJCeVByb3BlcnR5KCk7XG4gICAgfTtcbiAgICBCYXNlTWV0YWRhdGFTdG9yYWdlLmZpbHRlckJ5VGFyZ2V0ID0gZnVuY3Rpb24gKG1ldGFkYXRhLCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkKG1ldGFkYXRhLnZhbHVlcygpKS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB2YWx1ZS50YXJnZXQgPT09IHRhcmdldDsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZU1ldGFkYXRhU3RvcmFnZTtcbn0oKSk7XG5leHBvcnRzLkJhc2VNZXRhZGF0YVN0b3JhZ2UgPSBCYXNlTWV0YWRhdGFTdG9yYWdlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWV0YWRhdGEtc3RvcmFnZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgIHJldHVybiB0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtb2R1bGVfdG9rZW5fZmFjdG9yeV8xID0gcmVxdWlyZShcIi4vbW9kdWxlLXRva2VuLWZhY3RvcnlcIik7XG52YXIgcmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuLi9yZWdpc3RyeVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbnZhciBNb2R1bGVDb21waWxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9kdWxlQ29tcGlsZXIoKSB7XG4gICAgICAgIHRoaXMubW9kdWxlVG9rZW5GYWN0b3J5ID0gbmV3IG1vZHVsZV90b2tlbl9mYWN0b3J5XzEuTW9kdWxlVG9rZW5GYWN0b3J5KCk7XG4gICAgfVxuICAgIE1vZHVsZUNvbXBpbGVyLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKG1vZHVsZSwgc2NvcGUpIHtcbiAgICAgICAgaWYgKHNjb3BlID09PSB2b2lkIDApIHsgc2NvcGUgPSBbXTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIHRhcmdldCwgZHluYW1pY01ldGFkYXRhLCB0b2tlbjtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB0aGlzLmV4dHJhY3RNZXRhZGF0YShtb2R1bGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIHRhcmdldCA9IF9hLnRhcmdldCwgZHluYW1pY01ldGFkYXRhID0gX2EuZHluYW1pY01ldGFkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLm1vZHVsZVRva2VuRmFjdG9yeS5jcmVhdGUodGFyZ2V0LCBzY29wZSwgZHluYW1pY01ldGFkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgeyB0YXJnZXQ6IHRhcmdldCwgZHluYW1pY01ldGFkYXRhOiBkeW5hbWljTWV0YWRhdGEsIHRva2VuOiB0b2tlbiB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNb2R1bGVDb21waWxlci5wcm90b3R5cGUuZXh0cmFjdE1ldGFkYXRhID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlUmVmLCBfYSwgdGFyZ2V0LCBkeW5hbWljTWV0YWRhdGE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCwgdXRpbF8xLlV0aWxzLmdldERlZmVycmVkKG1vZHVsZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVSZWYgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZ2lzdHJ5XzEuUmVnaXN0cnkuaXNEeW5hbWljTW9kdWxlKG1vZHVsZVJlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHsgdGFyZ2V0OiBtb2R1bGUgfV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IG1vZHVsZVJlZiwgdGFyZ2V0ID0gX2EubW9kdWxlLCBkeW5hbWljTWV0YWRhdGEgPSBfX3Jlc3QoX2EsIFtcIm1vZHVsZVwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHsgdGFyZ2V0OiB0YXJnZXQsIGR5bmFtaWNNZXRhZGF0YTogZHluYW1pY01ldGFkYXRhIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBNb2R1bGVDb21waWxlcjtcbn0oKSk7XG5leHBvcnRzLk1vZHVsZUNvbXBpbGVyID0gTW9kdWxlQ29tcGlsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21waWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb21waWxlcl8xID0gcmVxdWlyZShcIi4vY29tcGlsZXJcIik7XG52YXIgcmVmbGVjdG9yXzEgPSByZXF1aXJlKFwiLi4vcmVmbGVjdG9yXCIpO1xudmFyIHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi4vcmVnaXN0cnlcIik7XG52YXIgbW9kdWxlXzEgPSByZXF1aXJlKFwiLi9tb2R1bGVcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xudmFyIE9uZUNvbnRhaW5lciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT25lQ29udGFpbmVyKCkge1xuICAgICAgICB0aGlzLm1vZHVsZUNvbXBpbGVyID0gbmV3IGNvbXBpbGVyXzEuTW9kdWxlQ29tcGlsZXIoKTtcbiAgICAgICAgdGhpcy5nbG9iYWxNb2R1bGVzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLm1vZHVsZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubW9kdWxlT3JkZXIgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMucHJvdmlkZXJUb2tlbnMgPSBbXTtcbiAgICAgICAgdGhpcy5keW5hbWljTW9kdWxlc01ldGFkYXRhID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldE1vZHVsZXNGcm9tID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICByZXR1cm4gIXV0aWxfMS5VdGlscy5pc05pbChtb2R1bGUpXG4gICAgICAgICAgICA/IFt0aGlzLmdldE1vZHVsZShtb2R1bGUpXVxuICAgICAgICAgICAgOiB0aGlzLmdldE1vZHVsZVZhbHVlcygpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5pc1Byb3ZpZGVyQm91bmQgPSBmdW5jdGlvbiAocHJvdmlkZXIsIG1vZHVsZSkge1xuICAgICAgICB2YXIgdG9rZW4gPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyVG9rZW4ocHJvdmlkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNb2R1bGVzRnJvbShtb2R1bGUpLnNvbWUoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgcHJvdmlkZXJzID0gX2EucHJvdmlkZXJzO1xuICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVycy5pc0JvdW5kKHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAodG9SZXBsYWNlLCBvcHRpb25zKSB7XG4gICAgICAgIF9fc3ByZWFkKHRoaXMubW9kdWxlcy52YWx1ZXMoKSkuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgICAgICBtb2R1bGUucmVwbGFjZSh0b1JlcGxhY2UsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0UHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHNjb3BlLCBfYSkge1xuICAgICAgICB2YXIgc3RyaWN0ID0gKF9hID09PSB2b2lkIDAgPyB7fSA6IF9hKS5zdHJpY3Q7XG4gICAgICAgIHZhciBlXzEsIF9iO1xuICAgICAgICB2YXIgdG9rZW4gPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyVG9rZW4ocHJvdmlkZXIpO1xuICAgICAgICBpZiAoc3RyaWN0KSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlXzIgPSB0aGlzLmdldE1vZHVsZShzY29wZSk7XG4gICAgICAgICAgICBpZiAobW9kdWxlXzIucHJvdmlkZXJzLmlzQm91bmQodG9rZW4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZHVsZV8yLnByb3ZpZGVycy5nZXQodG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfYyA9IF9fdmFsdWVzKHRoaXMubW9kdWxlcy52YWx1ZXMoKSksIF9kID0gX2MubmV4dCgpOyAhX2QuZG9uZTsgX2QgPSBfYy5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3ZpZGVycyA9IF9kLnZhbHVlLnByb3ZpZGVycztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3ZpZGVycy5pc0JvdW5kKHRva2VuKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVycy5nZXQodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfZCAmJiAhX2QuZG9uZSAmJiAoX2IgPSBfYy5yZXR1cm4pKSBfYi5jYWxsKF9jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5Vbmtub3duUHJvdmlkZXJFeGNlcHRpb24ocHJvdmlkZXIsIHNjb3BlKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsUHJvdmlkZXJzID0gZnVuY3Rpb24gKHByb3ZpZGVyLCB0YXJnZXQpIHtcbiAgICAgICAgaWYgKCFyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzSW5qZWN0aW9uVG9rZW4ocHJvdmlkZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTWlzc2luZ0luamVjdGlvblRva2VuRXhjZXB0aW9uKCdDb250YWluZXIuZ2V0QWxsUHJvdmlkZXJzKCknKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG9rZW4gPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyVG9rZW4ocHJvdmlkZXIpO1xuICAgICAgICByZXR1cm4gdXRpbF8xLlV0aWxzLmZsYXR0ZW4odGhpcy5nZXRNb2R1bGVzRnJvbSh0YXJnZXQpLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBwcm92aWRlcnMgPSBfYS5wcm92aWRlcnM7XG4gICAgICAgICAgICByZXR1cm4gcHJvdmlkZXJzLmlzQm91bmQodG9rZW4pID8gcHJvdmlkZXJzLmdldEFsbCh0b2tlbikgOiBbXTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXRNb2R1bGVWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB1dGlsXzEuVXRpbHMuZ2V0VmFsdWVzKHRoaXMubW9kdWxlcy5lbnRyaWVzKCkpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5oYXNNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1vZHVsZVZhbHVlcygpLnNvbWUoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gX2EudGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldCA9PT0gbW9kdWxlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0TW9kdWxlID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNb2R1bGVWYWx1ZXMoKS5maW5kKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IF9hLnRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQgPT09IG1vZHVsZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmdldE1vZHVsZUJ5VG9rZW4gPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZHVsZXMuaGFzKHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlVua25vd25Nb2R1bGVFeGNlcHRpb24oW10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMuZ2V0KHRva2VuKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0UmV2ZXJzZWRNb2R1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19zcHJlYWQodGhpcy5tb2R1bGVzLmVudHJpZXMoKSkucmV2ZXJzZSgpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5nZXRNb2R1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVzO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5hZGRQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZSA9IHRoaXMuZ2V0TW9kdWxlQnlUb2tlbih0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIG1vZHVsZS5hZGRQcm92aWRlcihwcm92aWRlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYWRkRXhwb3J0ZWQgPSBmdW5jdGlvbiAoY29tcG9uZW50LCB0b2tlbikge1xuICAgICAgICB2YXIgbW9kdWxlID0gdGhpcy5nZXRNb2R1bGVCeVRva2VuKHRva2VuKTtcbiAgICAgICAgbW9kdWxlLmFkZEV4cG9ydGVkKGNvbXBvbmVudCk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmFkZEdsb2JhbE1vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxNb2R1bGVzLmFkZChtb2R1bGUpO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5hZGRNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlLCBzY29wZSkge1xuICAgICAgICBpZiAoc2NvcGUgPT09IHZvaWQgMCkgeyBzY29wZSA9IFtdOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgdGFyZ2V0LCBkeW5hbWljTWV0YWRhdGEsIHRva2VuLCBvbmVNb2R1bGUsIG1vZHVsZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vZHVsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZE1vZHVsZUV4Y2VwdGlvbihzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMubW9kdWxlQ29tcGlsZXIuY29tcGlsZShtb2R1bGUsIHNjb3BlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCB0YXJnZXQgPSBfYS50YXJnZXQsIGR5bmFtaWNNZXRhZGF0YSA9IF9hLmR5bmFtaWNNZXRhZGF0YSwgdG9rZW4gPSBfYS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZHVsZXMuaGFzKHRva2VuKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25lTW9kdWxlID0gbmV3IG1vZHVsZV8xLk9uZU1vZHVsZSh0YXJnZXQsIHNjb3BlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZU1vZHVsZS5hZGRHbG9iYWxQcm92aWRlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlcy5zZXQodG9rZW4sIG9uZU1vZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzID0gdXRpbF8xLlV0aWxzLmNvbmNhdChzY29wZSwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRHluYW1pY01ldGFkYXRhKHRva2VuLCBkeW5hbWljTWV0YWRhdGEsIG1vZHVsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmbGVjdG9yXzEuUmVmbGVjdG9yLmlzR2xvYmFsTW9kdWxlKHRhcmdldCkgJiYgdGhpcy5hZGRHbG9iYWxNb2R1bGUob25lTW9kdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lQ29udGFpbmVyLnByb3RvdHlwZS5hZGREeW5hbWljTWV0YWRhdGEgPSBmdW5jdGlvbiAodG9rZW4sIGR5bmFtaWNNb2R1bGVNZXRhZGF0YSwgc2NvcGUpIHtcbiAgICAgICAgaWYgKCFkeW5hbWljTW9kdWxlTWV0YWRhdGEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuZHluYW1pY01vZHVsZXNNZXRhZGF0YS5zZXQodG9rZW4sIGR5bmFtaWNNb2R1bGVNZXRhZGF0YSk7XG4gICAgICAgIHRoaXMuYWRkRHluYW1pY01vZHVsZXMoZHluYW1pY01vZHVsZU1ldGFkYXRhLmltcG9ydHMsIHNjb3BlKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYWRkRHluYW1pY01vZHVsZXMgPSBmdW5jdGlvbiAobW9kdWxlcywgc2NvcGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKG1vZHVsZXMgPT09IHZvaWQgMCkgeyBtb2R1bGVzID0gW107IH1cbiAgICAgICAgbW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHsgcmV0dXJuIF90aGlzLmFkZE1vZHVsZShtb2R1bGUsIHNjb3BlKTsgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmJpbmRHbG9iYWxTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkgeyByZXR1cm4gX3RoaXMuYmluZEdsb2JhbHNUb0ltcG9ydHMobW9kdWxlKTsgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmJpbmRHbG9iYWxzVG9JbXBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmdsb2JhbE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZ2xvYmFsTW9kdWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuYmluZEdsb2JhbE1vZHVsZVRvTW9kdWxlKG1vZHVsZSwgZ2xvYmFsTW9kdWxlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVDb250YWluZXIucHJvdG90eXBlLmJpbmRHbG9iYWxNb2R1bGVUb01vZHVsZSA9IGZ1bmN0aW9uIChtb2R1bGUsIGdsb2JhbE1vZHVsZSkge1xuICAgICAgICBpZiAobW9kdWxlID09PSBnbG9iYWxNb2R1bGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG1vZHVsZS5hZGRJbXBvcnQoZ2xvYmFsTW9kdWxlKTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuYWRkSW1wb3J0ID0gZnVuY3Rpb24gKHJlbGF0ZWRNb2R1bGUsIHRva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGUsIHNjb3BlLCByZWxhdGVkTW9kdWxlVG9rZW4sIHJlbGF0ZWQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kdWxlcy5oYXModG9rZW4pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUgPSB0aGlzLmdldE1vZHVsZUJ5VG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgPSB1dGlsXzEuVXRpbHMuY29uY2F0KG1vZHVsZS5zY29wZSwgbW9kdWxlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMubW9kdWxlQ29tcGlsZXIuY29tcGlsZShyZWxhdGVkTW9kdWxlLCBzY29wZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkTW9kdWxlVG9rZW4gPSAoX2Euc2VudCgpKS50b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWQgPSB0aGlzLmdldE1vZHVsZUJ5VG9rZW4ocmVsYXRlZE1vZHVsZVRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZS5hZGRJbXBvcnQocmVsYXRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZUNvbnRhaW5lci5wcm90b3R5cGUuZ2V0RHluYW1pY01ldGFkYXRhQnlUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbiwga2V5KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHRoaXMuZHluYW1pY01vZHVsZXNNZXRhZGF0YS5nZXQodG9rZW4pO1xuICAgICAgICByZXR1cm4gbWV0YWRhdGEgJiYgbWV0YWRhdGFba2V5XSA/IG1ldGFkYXRhW2tleV0gOiBbXTtcbiAgICB9O1xuICAgIHJldHVybiBPbmVDb250YWluZXI7XG59KCkpO1xuZXhwb3J0cy5PbmVDb250YWluZXIgPSBPbmVDb250YWluZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250YWluZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vc2Nhbm5lclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9tb2R1bGVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vY29tcGlsZXJcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vY29udGFpbmVyXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2luamVjdGlvbi10b2tlblwiKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBJbmplY3Rpb25Ub2tlbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5qZWN0aW9uVG9rZW4oZGVzYykge1xuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjO1xuICAgICAgICB0aGlzLm5hbWUgPSBTeW1ib2wuZm9yKFwiSW5qZWN0aW9uVG9rZW48XCIgKyB0aGlzLmRlc2MgKyBcIj5cIik7XG4gICAgfVxuICAgIHJldHVybiBJbmplY3Rpb25Ub2tlbjtcbn0oKSk7XG5leHBvcnRzLkluamVjdGlvblRva2VuID0gSW5qZWN0aW9uVG9rZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmplY3Rpb24tdG9rZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaGFzaCA9IHJlcXVpcmUoXCJvYmplY3QtaGFzaFwiKTtcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG52YXIgTW9kdWxlVG9rZW5GYWN0b3J5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNb2R1bGVUb2tlbkZhY3RvcnkoKSB7XG4gICAgfVxuICAgIE1vZHVsZVRva2VuRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHRhcmdldCwgc2NvcGUsIGR5bmFtaWNNb2R1bGVNZXRhZGF0YSkge1xuICAgICAgICB2YXIgcmVmbGVjdGVkU2NvcGUgPSB0aGlzLnJlZmxlY3RTY29wZSh0YXJnZXQpO1xuICAgICAgICB2YXIgaXNTaW5nbGVTY29wZWQgPSByZWZsZWN0ZWRTY29wZSA9PT0gdHJ1ZTtcbiAgICAgICAgdmFyIG9wYXF1ZVRva2VuID0ge1xuICAgICAgICAgICAgbW9kdWxlOiB0aGlzLmdldE1vZHVsZU5hbWUodGFyZ2V0KSxcbiAgICAgICAgICAgIGR5bmFtaWM6IHRoaXMuZ2V0RHluYW1pY01ldGFkYXRhVG9rZW4oZHluYW1pY01vZHVsZU1ldGFkYXRhKSxcbiAgICAgICAgICAgIHNjb3BlOiBpc1NpbmdsZVNjb3BlZCA/IHRoaXMuZ2V0U2NvcGVTdGFjayhzY29wZSkgOiByZWZsZWN0ZWRTY29wZSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGhhc2gob3BhcXVlVG9rZW4pO1xuICAgIH07XG4gICAgTW9kdWxlVG9rZW5GYWN0b3J5LnByb3RvdHlwZS5nZXREeW5hbWljTWV0YWRhdGFUb2tlbiA9IGZ1bmN0aW9uIChkeW5hbWljTW9kdWxlTWV0YWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGR5bmFtaWNNb2R1bGVNZXRhZGF0YSA/IEpTT04uc3RyaW5naWZ5KGR5bmFtaWNNb2R1bGVNZXRhZGF0YSkgOiAnJztcbiAgICB9O1xuICAgIE1vZHVsZVRva2VuRmFjdG9yeS5wcm90b3R5cGUuZ2V0TW9kdWxlTmFtZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5uYW1lO1xuICAgIH07XG4gICAgTW9kdWxlVG9rZW5GYWN0b3J5LnByb3RvdHlwZS5nZXRTY29wZVN0YWNrID0gZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXZlcnNlZFNjb3BlID0gc2NvcGUucmV2ZXJzZSgpO1xuICAgICAgICB2YXIgZmlyc3RHbG9iYWxJbmRleCA9IHJldmVyc2VkU2NvcGUuZmluZEluZGV4KGZ1bmN0aW9uIChzKSB7IHJldHVybiBfdGhpcy5yZWZsZWN0U2NvcGUocykgPT09ICdnbG9iYWwnOyB9KTtcbiAgICAgICAgc2NvcGUucmV2ZXJzZSgpO1xuICAgICAgICB2YXIgc3RhY2sgPSBmaXJzdEdsb2JhbEluZGV4ID49IDBcbiAgICAgICAgICAgID8gc2NvcGUuc2xpY2Uoc2NvcGUubGVuZ3RoIC0gZmlyc3RHbG9iYWxJbmRleCAtIDEpXG4gICAgICAgICAgICA6IHNjb3BlO1xuICAgICAgICByZXR1cm4gc3RhY2subWFwKGZ1bmN0aW9uIChtb2R1bGUpIHsgcmV0dXJuIG1vZHVsZS5uYW1lOyB9KTtcbiAgICB9O1xuICAgIE1vZHVsZVRva2VuRmFjdG9yeS5wcm90b3R5cGUucmVmbGVjdFNjb3BlID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICB2YXIgc2NvcGUgPSBSZWZsZWN0LmdldE1ldGFkYXRhKGNvbnN0YW50c18xLlNIQVJFRF9NT0RVTEVfTUVUQURBVEEsIHRhcmdldCk7XG4gICAgICAgIHJldHVybiBzY29wZSA/IHNjb3BlIDogJ2dsb2JhbCc7XG4gICAgfTtcbiAgICByZXR1cm4gTW9kdWxlVG9rZW5GYWN0b3J5O1xufSgpKTtcbmV4cG9ydHMuTW9kdWxlVG9rZW5GYWN0b3J5ID0gTW9kdWxlVG9rZW5GYWN0b3J5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kdWxlLXRva2VuLWZhY3RvcnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbnZhciBpbnZlcnNpZnlfaW5qZWN0X2RlY29yYXRvcnNfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnktaW5qZWN0LWRlY29yYXRvcnNcIik7XG52YXIgdG9rZW5zXzEgPSByZXF1aXJlKFwiLi4vdG9rZW5zXCIpO1xudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKTtcbnZhciByZWZsZWN0b3JfMSA9IHJlcXVpcmUoXCIuLi9yZWZsZWN0b3JcIik7XG52YXIgcmVnaXN0cnlfMSA9IHJlcXVpcmUoXCIuLi9yZWdpc3RyeVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG52YXIgT25lTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPbmVNb2R1bGUodGFyZ2V0LCBzY29wZSwgY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmltcG9ydHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuaW5qZWN0YWJsZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzID0gbmV3IGludmVyc2lmeV8xLkNvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLmxhenlJbmplY3QgPSBpbnZlcnNpZnlfaW5qZWN0X2RlY29yYXRvcnNfMS5kZWZhdWx0KHRoaXMucHJvdmlkZXJzKS5sYXp5SW5qZWN0O1xuICAgICAgICB0aGlzLmV4cG9ydHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlZCA9IHV0aWxfMS5VdGlscy5jcmVhdGVEZWZlcnJlZFByb21pc2UoKTtcbiAgICB9XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5hZGRJbXBvcnQgPSBmdW5jdGlvbiAocmVsYXRlZE1vZHVsZSkge1xuICAgICAgICB0aGlzLmltcG9ydHMuYWRkKHJlbGF0ZWRNb2R1bGUpO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5hZGRQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICB0aGlzLmluamVjdGFibGVzLmFkZChwcm92aWRlcik7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLnByb3ZpZGVyQ29udGFpbmVySGFzVG9rZW4gPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkKHRoaXMuaW5qZWN0YWJsZXMudmFsdWVzKCkpLnNvbWUoZnVuY3Rpb24gKHByb3ZpZGVyKSB7IHJldHVybiByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyVG9rZW4ocHJvdmlkZXIpID09PSB0b2tlbjsgfSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLnZhbGlkYXRlRXhwb3J0ZWQgPSBmdW5jdGlvbiAodG9rZW4sIGV4cG9ydGVkKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3ZpZGVyQ29udGFpbmVySGFzVG9rZW4odG9rZW4pKVxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB2YXIgaW1wb3J0ZWQgPSBfX3NwcmVhZCh0aGlzLmltcG9ydHMudmFsdWVzKCkpO1xuICAgICAgICB2YXIgaW1wb3J0ZWRSZWZOYW1lcyA9IGltcG9ydGVkXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtOyB9KVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBfYS50YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiB0YXJnZXQ7IH0pO1xuICAgICAgICBpZiAoIWltcG9ydGVkUmVmTmFtZXMuaW5jbHVkZXModG9rZW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVW5rbm93bkV4cG9ydEV4Y2VwdGlvbih0aGlzLnRhcmdldC5uYW1lLCBleHBvcnRlZC5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmFkZEV4cG9ydGVkID0gZnVuY3Rpb24gKGV4cG9ydGVkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBhZGRFeHBvcnRlZFVuaXQgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmV4cG9ydHMuYWRkKF90aGlzLnZhbGlkYXRlRXhwb3J0ZWQodG9rZW4sIGV4cG9ydGVkKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzRHluYW1pY01vZHVsZShleHBvcnRlZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBhZGRFeHBvcnRlZFVuaXQoZXhwb3J0ZWQubW9kdWxlKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRFeHBvcnRlZFVuaXQocmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlclRva2VuKGV4cG9ydGVkKSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmdldFByb3ZpZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkKFtcbiAgICAgICAgICAgIHRva2Vuc18xLkluamVjdG9yXG4gICAgICAgIF0sIHRoaXMuaW5qZWN0YWJsZXMudmFsdWVzKCksIHRoaXMuZ2V0UmVsYXRlZFByb3ZpZGVycygpLnZhbHVlcygpKTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUubGlua1JlbGF0ZWRQcm92aWRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwcm92aWRlcnMgPSB0aGlzLmdldFJlbGF0ZWRQcm92aWRlcnMoKTtcbiAgICAgICAgcHJvdmlkZXJzLmZvckVhY2goZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICB2YXIgcmVmID0gX3RoaXMuY29udGFpbmVyLmdldFByb3ZpZGVyKHByb3ZpZGVyLCBfdGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgX3RoaXMucHJvdmlkZXJzLmJpbmQocHJvdmlkZXIpLnRvQ29uc3RhbnRWYWx1ZShyZWYpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuZ2V0UmVsYXRlZFByb3ZpZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIHZhciBwcm92aWRlclNjb3BlID0gbmV3IFNldCgpO1xuICAgICAgICB2YXIgZmluZCA9IGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICAgICAgICAgIHZhciBlXzIsIF9hO1xuICAgICAgICAgICAgbW9kdWxlID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRGb3J3YXJkUmVmKG1vZHVsZSk7XG4gICAgICAgICAgICBpZiAocmVmbGVjdG9yXzEuUmVmbGVjdG9yLmlzUHJvdmlkZXIobW9kdWxlKSkge1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyU2NvcGUuYWRkKG1vZHVsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKG1vZHVsZS5leHBvcnRzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlbGF0ZWQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb250YWluZXIuaGFzTW9kdWxlKHJlbGF0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IF90aGlzLmNvbnRhaW5lci5nZXRNb2R1bGUocmVsYXRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZChyZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJTY29wZS5hZGQocmVsYXRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzLmltcG9ydHMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlbGF0ZWQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICBmaW5kKHJlbGF0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyU2NvcGU7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmJpbmRQcm92aWRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzMsIF9hLCBfYiwgX2MsIHByb3ZpZGVyLCBpc011bHRpLCB0b2tlbiwgbmFtZV8xLCB0eXBlLCBlXzNfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2QpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9kLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlua1JlbGF0ZWRQcm92aWRlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2QudHJ5cy5wdXNoKFsxLCA2LCA3LCA4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IF9fdmFsdWVzKHRoaXMuaW5qZWN0YWJsZXMpLCBfYyA9IF9iLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhX2MuZG9uZSkgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc011bHRpID0gcHJvdmlkZXIubXVsdGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHJlZ2lzdHJ5XzEuUmVnaXN0cnkuZ2V0UHJvdmlkZXJUb2tlbihwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTXVsdGkgJiYgdGhpcy5jb250YWluZXIucHJvdmlkZXJUb2tlbnMuaW5jbHVkZXModG9rZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZV8xID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRQcm92aWRlck5hbWUocHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5NdWx0aVByb3ZpZGVyRXhjZXB0aW9uKG5hbWVfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5wcm92aWRlclRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0aGlzLmdldFByb3ZpZGVyVHlwZShwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuYmluZCh0b2tlbiwgdHlwZSwgcHJvdmlkZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Quc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYyA9IF9iLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8zXzEgPSBfZC5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzMgPSB7IGVycm9yOiBlXzNfMSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKHRvUmVwbGFjZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmFkZFByb3ZpZGVyKF9fYXNzaWduKHsgcHJvdmlkZTogdG9SZXBsYWNlIH0sIG9wdGlvbnMpKTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlLCBfYTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3ZpZGVycy5pc0JvdW5kKHRoaXMudGFyZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLmJpbmRQcm92aWRlcnMoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLmJpbmQodGhpcy50YXJnZXQpLnRvU2VsZigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlID0gdGhpcy5wcm92aWRlcnMuZ2V0KHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gbW9kdWxlLm9uTW9kdWxlSW5pdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2EpIHJldHVybiBbMywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIG1vZHVsZS5vbk1vZHVsZUluaXQoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gKF9iLnNlbnQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB1dGlsXzEuVXRpbHMuc2VyaWVzKHRoaXMuY29udGFpbmVyLmdldEFsbFByb3ZpZGVycyh0b2tlbnNfMS5NT0RVTEVfSU5JVCwgdGhpcy50YXJnZXQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuZ2V0UHJvdmlkZXJUeXBlID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIGlmIChyZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzRmFjdG9yeVByb3ZpZGVyKHByb3ZpZGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLkZBQ1RPUlk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVnaXN0cnlfMS5SZWdpc3RyeS5pc1ZhbHVlUHJvdmlkZXIocHJvdmlkZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuVkFMVUU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVnaXN0cnlfMS5SZWdpc3RyeS5pc0NsYXNzUHJvdmlkZXIocHJvdmlkZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuQ0xBU1M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVnaXN0cnlfMS5SZWdpc3RyeS5pc0V4aXN0aW5nUHJvdmlkZXIocHJvdmlkZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuRVhJU1RJTkc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLkRFRkFVTFQ7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmdldFByb3ZpZGVyID0gZnVuY3Rpb24gKHJlZikge1xuICAgICAgICB2YXIgdG9rZW4gPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldFByb3ZpZGVyVG9rZW4ocmVmKTtcbiAgICAgICAgdmFyIHByb3ZpZGVyID0gKHRoaXMuZ2V0UHJvdmlkZXJzKCkuZmluZChmdW5jdGlvbiAocHJvdmlkZXIpIHsgcmV0dXJuIHByb3ZpZGVyID09PSB0b2tlbjsgfSkpO1xuICAgICAgICBpZiAoIXByb3ZpZGVyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlVua25vd25Qcm92aWRlckV4Y2VwdGlvbihyZWYsIHRoaXMudGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5nZXREZXBlbmRlbmNpZXMgPSBmdW5jdGlvbiAoZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIGlmIChkZXBlbmRlbmNpZXMgPT09IHZvaWQgMCkgeyBkZXBlbmRlbmNpZXMgPSBbXTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIFByb21pc2UuYWxsKGRlcGVuZGVuY2llcy5tYXAoZnVuY3Rpb24gKGRlcGVuZGVuY3kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRGb3J3YXJkUmVmKGRlcGVuZGVuY3kpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdHJ5XzEuUmVnaXN0cnkuYXNzZXJ0UHJvdmlkZXIocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvdmlkZXIgPSBfdGhpcy5nZXRQcm92aWRlcihyZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jb250YWluZXIuZ2V0UHJvdmlkZXIocHJvdmlkZXIsIF90aGlzLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiwgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPbmVNb2R1bGUucHJvdG90eXBlLmJpbmRGYWN0b3J5UHJvdmlkZXIgPSBmdW5jdGlvbiAodG9rZW4sIHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkZXBzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHRoaXMuZ2V0RGVwZW5kZW5jaWVzKHByb3ZpZGVyLmRlcHMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm92aWRlci5zY29wZSA9PT0gY29uc3RhbnRzXzEuU0NPUEVTLlRSQU5TSUVOVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdGhpcy5wcm92aWRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5iaW5kKHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvRHluYW1pY1ZhbHVlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3ZpZGVyLnVzZUZhY3RvcnkuYXBwbHkocHJvdmlkZXIsIF9fc3ByZWFkKGRlcHMpKTsgfSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0aGlzLnByb3ZpZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmluZCh0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvUHJvdmlkZXIoZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvdmlkZXIudXNlRmFjdG9yeS5hcHBseShwcm92aWRlciwgX19zcHJlYWQoZGVwcykpOyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5iaW5kUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHNjb3BlKSB7XG4gICAgICAgIHZhciBiaW5kaW5nID0gdGhpcy5wcm92aWRlcnMuYmluZChwcm92aWRlcikudG9TZWxmKCk7XG4gICAgICAgIHN3aXRjaCAoc2NvcGUpIHtcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzXzEuU0NPUEVTLlRSQU5TSUVOVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZy5pblRyYW5zaWVudFNjb3BlKCk7XG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50c18xLlNDT1BFUy5SRVFVRVNUOlxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nLmluUmVxdWVzdFNjb3BlKCk7XG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50c18xLlNDT1BFUy5TSU5HTEVUT046XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nLmluU2luZ2xldG9uU2NvcGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5iaW5kQ2xhc3NQcm92aWRlciA9IGZ1bmN0aW9uICh0b2tlbiwgcHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvdmlkZXJzLmJpbmQodG9rZW4pLnRvKHByb3ZpZGVyLnVzZUNsYXNzKTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYmluZFZhbHVlUHJvdmlkZXIgPSBmdW5jdGlvbiAodG9rZW4sIHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVycy5iaW5kKHRva2VuKS50b0NvbnN0YW50VmFsdWUocHJvdmlkZXIudXNlVmFsdWUpO1xuICAgIH07XG4gICAgT25lTW9kdWxlLnByb3RvdHlwZS5iaW5kRXhpc3RpbmdQcm92aWRlciA9IGZ1bmN0aW9uICh0b2tlbiwgcHJvdmlkZXIpIHtcbiAgICAgICAgdmFyIGV4aXN0aW5nVG9rZW4gPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmdldEluamVjdGlvblRva2VuKHByb3ZpZGVyLnVzZUV4aXN0aW5nKTtcbiAgICAgICAgdmFyIGV4aXN0aW5nID0gdGhpcy5wcm92aWRlcnMuZ2V0KGV4aXN0aW5nVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5wcm92aWRlcnMuYmluZCh0b2tlbikudG9Db25zdGFudFZhbHVlKGV4aXN0aW5nKTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uICh0b2tlbiwgdHlwZSwgcHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNjb3BlLCBsYXp5SW5qZWN0cztcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0eXBlID09PSBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5ERUZBVUxUKSkgcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlID0gcmVmbGVjdG9yXzEuUmVmbGVjdG9yLnJlc29sdmVQcm92aWRlclNjb3BlKHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlJbmplY3RzID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRMYXp5SW5qZWN0cyhwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5SW5qZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXp5SW5qZWN0ID0gX2EubGF6eUluamVjdCwgZm9yd2FyZFJlZiA9IF9hLmZvcndhcmRSZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gcmVnaXN0cnlfMS5SZWdpc3RyeS5nZXRGb3J3YXJkUmVmKGZvcndhcmRSZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhenlJbmplY3QoX3RoaXMubGF6eUluamVjdCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRQcm92aWRlcihwcm92aWRlciwgc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHlwZSA9PT0gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuRkFDVE9SWSkpIHJldHVybiBbMywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuYmluZEZhY3RvcnlQcm92aWRlcih0b2tlbiwgcHJvdmlkZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IGNvbnN0YW50c18xLlBST1ZJREVSX1RZUEVTLlZBTFVFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kVmFsdWVQcm92aWRlcih0b2tlbiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gY29uc3RhbnRzXzEuUFJPVklERVJfVFlQRVMuQ0xBU1MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRDbGFzc1Byb3ZpZGVyKHRva2VuLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBjb25zdGFudHNfMS5QUk9WSURFUl9UWVBFUy5FWElTVElORykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZEV4aXN0aW5nUHJvdmlkZXIodG9rZW4sIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9uZU1vZHVsZS5wcm90b3R5cGUuYWRkR2xvYmFsUHJvdmlkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnByb3ZpZGVycy5iaW5kKHRva2Vuc18xLkluamVjdG9yKS50b0NvbnN0YW50VmFsdWUodGhpcy5wcm92aWRlcnMpO1xuICAgICAgICB0aGlzLnByb3ZpZGVycy5iaW5kKGNvbnRhaW5lcl8xLk9uZUNvbnRhaW5lcikudG9Db25zdGFudFZhbHVlKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5wcm92aWRlcnMuYmluZCh0b2tlbnNfMS5PTkVfTU9EVUxFLm5hbWUpLnRvQ29uc3RhbnRWYWx1ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm92aWRlcnNcbiAgICAgICAgICAgIC5iaW5kKHRva2Vuc18xLkluamVjdG9yKVxuICAgICAgICAgICAgLnRvQ29uc3RhbnRWYWx1ZSh0aGlzLnByb3ZpZGVycylcbiAgICAgICAgICAgIC53aGVuSW5qZWN0ZWRJbnRvKHRoaXMudGFyZ2V0KTtcbiAgICAgICAgdGhpcy5wcm92aWRlcnNcbiAgICAgICAgICAgIC5iaW5kKGNvbnRhaW5lcl8xLk9uZUNvbnRhaW5lcilcbiAgICAgICAgICAgIC50b0NvbnN0YW50VmFsdWUodGhpcy5jb250YWluZXIpXG4gICAgICAgICAgICAud2hlbkluamVjdGVkSW50byh0aGlzLnRhcmdldCk7XG4gICAgfTtcbiAgICByZXR1cm4gT25lTW9kdWxlO1xufSgpKTtcbmV4cG9ydHMuT25lTW9kdWxlID0gT25lTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kdWxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbnZhciByZWZsZWN0b3JfMSA9IHJlcXVpcmUoXCIuLi9yZWZsZWN0b3JcIik7XG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xudmFyIHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi4vcmVnaXN0cnlcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgU2Nhbm5lciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2Nhbm5lcihjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB0aGlzLnNjYW5Gb3JNb2R1bGVzKG1vZHVsZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuc2Nhbk1vZHVsZXNGb3JEZXBlbmRlbmNpZXMoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmJpbmRHbG9iYWxTY29wZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLmNyZWF0ZU1vZHVsZXMoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuY3JlYXRlTW9kdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRyYXZlcnNlLCByb290TW9kdWxlO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYXZlcnNlID0gZnVuY3Rpb24gKG1vZHVsZSkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlXzEsIF9hLCBpbXBvcnRzLCBpbXBvcnRzXzEsIGltcG9ydHNfMV8xLCBpbm5lck1vZHVsZSwgZV8xXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0cyA9IG1vZHVsZS5pbXBvcnRzLnZhbHVlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDYsIDcsIDhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRzXzEgPSBfX3ZhbHVlcyhpbXBvcnRzKSwgaW1wb3J0c18xXzEgPSBpbXBvcnRzXzEubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFpbXBvcnRzXzFfMS5kb25lKSByZXR1cm4gWzMsIDVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyTW9kdWxlID0gaW1wb3J0c18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0cmF2ZXJzZShpbm5lck1vZHVsZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0c18xXzEgPSBpbXBvcnRzXzEubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZV8xXzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0geyBlcnJvcjogZV8xXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbXBvcnRzXzFfMSAmJiAhaW1wb3J0c18xXzEuZG9uZSAmJiAoX2EgPSBpbXBvcnRzXzEucmV0dXJuKSkgX2EuY2FsbChpbXBvcnRzXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFs0LCBQcm9taXNlLmFsbChfX3NwcmVhZChpbXBvcnRzKS5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkID0gX2EuY3JlYXRlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBtb2R1bGUuY3JlYXRlKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIubW9kdWxlT3JkZXIuYWRkKG1vZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH07XG4gICAgICAgICAgICAgICAgICAgICAgICByb290TW9kdWxlID0gdGhpcy5jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0TW9kdWxlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdHJhdmVyc2Uocm9vdE1vZHVsZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnNjYW5Gb3JNb2R1bGVzID0gZnVuY3Rpb24gKG1vZHVsZSwgc2NvcGUsIGN0eFJlZ2lzdHJ5KSB7XG4gICAgICAgIGlmIChzY29wZSA9PT0gdm9pZCAwKSB7IHNjb3BlID0gW107IH1cbiAgICAgICAgaWYgKGN0eFJlZ2lzdHJ5ID09PSB2b2lkIDApIHsgY3R4UmVnaXN0cnkgPSBbXTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8yLCBfYSwgaW1wb3J0cywgbW9kdWxlcywgbW9kdWxlc18xLCBtb2R1bGVzXzFfMSwgaW5uZXJNb2R1bGUsIHNjb3BlZE1vZHVsZXMsIGVfMl8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQsIHRoaXMuc3RvcmVNb2R1bGUobW9kdWxlLCBzY29wZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHhSZWdpc3RyeS5wdXNoKG1vZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVnaXN0cnlfMS5SZWdpc3RyeS5oYXNGb3J3YXJkUmVmKG1vZHVsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUgPSBtb2R1bGUuZm9yd2FyZFJlZigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0cyA9IHJlZmxlY3Rvcl8xLlJlZmxlY3Rvci5nZXQoY29uc3RhbnRzXzEuTUVUQURBVEEuSU1QT1JUUywgbW9kdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXMgPSByZWdpc3RyeV8xLlJlZ2lzdHJ5LmlzRHluYW1pY01vZHVsZShtb2R1bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfX3NwcmVhZChpbXBvcnRzLCAobW9kdWxlLmltcG9ydHMgfHwgW10pKSA6IGltcG9ydHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMiwgNywgOCwgOV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc18xID0gX192YWx1ZXMobW9kdWxlcyksIG1vZHVsZXNfMV8xID0gbW9kdWxlc18xLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhbW9kdWxlc18xXzEuZG9uZSkgcmV0dXJuIFszLCA2XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyTW9kdWxlID0gbW9kdWxlc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4UmVnaXN0cnkuaW5jbHVkZXMoaW5uZXJNb2R1bGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgNV07XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZWRNb2R1bGVzID0gdXRpbF8xLlV0aWxzLmNvbmNhdChzY29wZSwgbW9kdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5zY2FuRm9yTW9kdWxlcyhpbm5lck1vZHVsZSwgc2NvcGVkTW9kdWxlcywgY3R4UmVnaXN0cnkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzXzFfMSA9IG1vZHVsZXNfMS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMywgOV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMl8xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV8yID0geyBlcnJvcjogZV8yXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgOV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZHVsZXNfMV8xICYmICFtb2R1bGVzXzFfMS5kb25lICYmIChfYSA9IG1vZHVsZXNfMS5yZXR1cm4pKSBfYS5jYWxsKG1vZHVsZXNfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuc3RvcmVNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlLCBzY29wZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZ2lzdHJ5XzEuUmVnaXN0cnkuaGFzRm9yd2FyZFJlZihtb2R1bGUpKSByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLmNvbnRhaW5lci5hZGRNb2R1bGUobW9kdWxlLmZvcndhcmRSZWYoKSwgc2NvcGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIsIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFs0LCB0aGlzLmNvbnRhaW5lci5hZGRNb2R1bGUobW9kdWxlLCBzY29wZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnN0b3JlSW1wb3J0ID0gZnVuY3Rpb24gKHJlbGF0ZWQsIHRva2VuLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVsYXRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuQ2lyY3VsYXJEZXBlbmRlbmN5RXhjZXB0aW9uKGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWdpc3RyeV8xLlJlZ2lzdHJ5Lmhhc0ZvcndhcmRSZWYocmVsYXRlZCkpIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuY29udGFpbmVyLmFkZEltcG9ydChyZWxhdGVkLmZvcndhcmRSZWYoKSwgdG9rZW4pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIsIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFs0LCB0aGlzLmNvbnRhaW5lci5hZGRJbXBvcnQocmVsYXRlZCwgdG9rZW4pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5zY2FuTW9kdWxlc0ZvckRlcGVuZGVuY2llcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMywgX2EsIG1vZHVsZXMsIG1vZHVsZXNfMiwgbW9kdWxlc18yXzEsIF9iLCB0b2tlbiwgbW9kdWxlXzEsIGVfM18xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlcyA9IHRoaXMuY29udGFpbmVyLmdldFJldmVyc2VkTW9kdWxlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYy50cnlzLnB1c2goWzEsIDcsIDgsIDldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfMiA9IF9fdmFsdWVzKG1vZHVsZXMpLCBtb2R1bGVzXzJfMSA9IG1vZHVsZXNfMi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYy5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIW1vZHVsZXNfMl8xLmRvbmUpIHJldHVybiBbMywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IF9fcmVhZChtb2R1bGVzXzJfMS52YWx1ZSwgMiksIHRva2VuID0gX2JbMF0sIG1vZHVsZV8xID0gX2JbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMucmVmbGVjdEltcG9ydHMobW9kdWxlXzEudGFyZ2V0LCB0b2tlbiwgbW9kdWxlXzEudGFyZ2V0Lm5hbWUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLnJlZmxlY3RQcm92aWRlcnMobW9kdWxlXzEudGFyZ2V0LCB0b2tlbildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZmxlY3RFeHBvcnRzKG1vZHVsZV8xLnRhcmdldCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzXzJfMSA9IG1vZHVsZXNfMi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMywgOV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfM18xID0gX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV8zID0geyBlcnJvcjogZV8zXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgOV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZHVsZXNfMl8xICYmICFtb2R1bGVzXzJfMS5kb25lICYmIChfYSA9IG1vZHVsZXNfMi5yZXR1cm4pKSBfYS5jYWxsKG1vZHVsZXNfMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUucmVmbGVjdFByb3ZpZGVycyA9IGZ1bmN0aW9uIChtb2R1bGUsIHRva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzQsIF9hLCBwcm92aWRlcnMsIHByb3ZpZGVyc18xLCBwcm92aWRlcnNfMV8xLCBwcm92aWRlciwgZV80XzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnMgPSB0aGlzLmdldER5bmFtaWNNZXRhZGF0YShtb2R1bGUsIHRva2VuLCBjb25zdGFudHNfMS5NRVRBREFUQS5QUk9WSURFUlMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDYsIDcsIDhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyc18xID0gX192YWx1ZXMocHJvdmlkZXJzKSwgcHJvdmlkZXJzXzFfMSA9IHByb3ZpZGVyc18xLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhcHJvdmlkZXJzXzFfMS5kb25lKSByZXR1cm4gWzMsIDVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIgPSBwcm92aWRlcnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLnN0b3JlUHJvdmlkZXIocHJvdmlkZXIsIHRva2VuKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJzXzFfMSA9IHByb3ZpZGVyc18xLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV80XzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzQgPSB7IGVycm9yOiBlXzRfMSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvdmlkZXJzXzFfMSAmJiAhcHJvdmlkZXJzXzFfMS5kb25lICYmIChfYSA9IHByb3ZpZGVyc18xLnJldHVybikpIF9hLmNhbGwocHJvdmlkZXJzXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzQpIHRocm93IGVfNC5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNjYW5uZXIucHJvdG90eXBlLnN0b3JlUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHRva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCB0aGlzLmNvbnRhaW5lci5hZGRQcm92aWRlcihwcm92aWRlciwgdG9rZW4pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5nZXREeW5hbWljTWV0YWRhdGEgPSBmdW5jdGlvbiAobW9kdWxlLCB0b2tlbiwgbWV0YWRhdGFLZXkpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkKHJlZmxlY3Rvcl8xLlJlZmxlY3Rvci5nZXQobWV0YWRhdGFLZXksIG1vZHVsZSksIHRoaXMuY29udGFpbmVyLmdldER5bmFtaWNNZXRhZGF0YUJ5VG9rZW4odG9rZW4sIG1ldGFkYXRhS2V5KSk7XG4gICAgfTtcbiAgICBTY2FubmVyLnByb3RvdHlwZS5yZWZsZWN0RXhwb3J0cyA9IGZ1bmN0aW9uIChtb2R1bGUsIHRva2VuKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBleHBvcnRzID0gdGhpcy5nZXREeW5hbWljTWV0YWRhdGEobW9kdWxlLCB0b2tlbiwgY29uc3RhbnRzXzEuTUVUQURBVEEuRVhQT1JUUyk7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaChmdW5jdGlvbiAoZXhwb3J0ZWRDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5zdG9yZUV4cG9ydGVkKGV4cG9ydGVkQ29tcG9uZW50LCB0b2tlbik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUuc3RvcmVFeHBvcnRlZCA9IGZ1bmN0aW9uIChjb21wb25lbnQsIHRva2VuKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV4cG9ydGVkKGNvbXBvbmVudCwgdG9rZW4pO1xuICAgIH07XG4gICAgU2Nhbm5lci5wcm90b3R5cGUucmVmbGVjdEltcG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlLCB0b2tlbiwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV81LCBfYSwgbW9kdWxlcywgbW9kdWxlc18zLCBtb2R1bGVzXzNfMSwgcmVsYXRlZCwgZV81XzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzID0gdGhpcy5nZXREeW5hbWljTWV0YWRhdGEobW9kdWxlLCB0b2tlbiwgY29uc3RhbnRzXzEuTUVUQURBVEEuSU1QT1JUUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgNiwgNywgOF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc18zID0gX192YWx1ZXMobW9kdWxlcyksIG1vZHVsZXNfM18xID0gbW9kdWxlc18zLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhbW9kdWxlc18zXzEuZG9uZSkgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWQgPSBtb2R1bGVzXzNfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5zdG9yZUltcG9ydChyZWxhdGVkLCB0b2tlbiwgY29udGV4dCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfM18xID0gbW9kdWxlc18zLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV81XzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzUgPSB7IGVycm9yOiBlXzVfMSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kdWxlc18zXzEgJiYgIW1vZHVsZXNfM18xLmRvbmUgJiYgKF9hID0gbW9kdWxlc18zLnJldHVybikpIF9hLmNhbGwobW9kdWxlc18zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV81KSB0aHJvdyBlXzUuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2Nhbm5lcjtcbn0oKSk7XG5leHBvcnRzLlNjYW5uZXIgPSBTY2FubmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2Nhbm5lci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCJyZWZsZWN0LW1ldGFkYXRhXCIpO1xudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xudmFyIFJlZmxlY3RvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVmbGVjdG9yKCkge1xuICAgIH1cbiAgICBSZWZsZWN0b3IuZGVmaW5lQnlLZXlzID0gZnVuY3Rpb24gKG1ldGFkYXRhLCB0YXJnZXQsIGV4Y2x1ZGUpIHtcbiAgICAgICAgaWYgKGV4Y2x1ZGUgPT09IHZvaWQgMCkgeyBleGNsdWRlID0gW107IH1cbiAgICAgICAgT2JqZWN0LmtleXMobWV0YWRhdGEpXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChwKSB7IHJldHVybiAhZXhjbHVkZS5pbmNsdWRlcyhwKTsgfSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShwcm9wZXJ0eSwgbWV0YWRhdGFbcHJvcGVydHldLCB0YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xuICAgIFJlZmxlY3Rvci5nZXQgPSBmdW5jdGlvbiAobWV0YWRhdGFLZXksIHRhcmdldCkge1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0KSB8fCBbXTtcbiAgICB9O1xuICAgIFJlZmxlY3Rvci5zZXQgPSBmdW5jdGlvbiAobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgfTtcbiAgICBSZWZsZWN0b3IuaGFzID0gZnVuY3Rpb24gKG1ldGFkYXRhS2V5LCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuaGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCk7XG4gICAgfTtcbiAgICBSZWZsZWN0b3IuaXNHbG9iYWxNb2R1bGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0Lmhhc01ldGFkYXRhKGNvbnN0YW50c18xLlNIQVJFRF9NT0RVTEVfTUVUQURBVEEsIHRhcmdldCk7XG4gICAgfTtcbiAgICBSZWZsZWN0b3IuaXNQcm92aWRlciA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuaGFzTWV0YWRhdGEoY29uc3RhbnRzXzEuUFJPVklERVJfTUVUQURBVEEsIHRhcmdldCk7XG4gICAgfTtcbiAgICBSZWZsZWN0b3IucmVzb2x2ZVByb3ZpZGVyU2NvcGUgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoY29uc3RhbnRzXzEuU0NPUEVfTUVUQURBVEEsIHByb3ZpZGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBSZWZsZWN0b3I7XG59KCkpO1xuZXhwb3J0cy5SZWZsZWN0b3IgPSBSZWZsZWN0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWZsZWN0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWQgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgICByZXR1cm4gYXI7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xudmFyIG1vZHVsZV8xID0gcmVxdWlyZShcIi4vbW9kdWxlXCIpO1xudmFyIHJlZmxlY3Rvcl8xID0gcmVxdWlyZShcIi4vcmVmbGVjdG9yXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgUmVnaXN0cnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlZ2lzdHJ5KCkge1xuICAgIH1cbiAgICBSZWdpc3RyeS5jbGVhckxhenlJbmplY3RzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxhenlJbmplY3RzLmNsZWFyKCk7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5nZXRMYXp5SW5qZWN0cyA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkKHRoaXMubGF6eUluamVjdHMudmFsdWVzKCkpLmZpbHRlcihmdW5jdGlvbiAocHJvdmlkZXIpIHsgcmV0dXJuIHByb3ZpZGVyLnRhcmdldCA9PT0gdGFyZ2V0OyB9KTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmlzTW9kdWxlID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaXNEeW5hbWljTW9kdWxlKHRhcmdldCkgfHxcbiAgICAgICAgICAgICghdGhpcy5oYXNQcm92aWRlVG9rZW4odGFyZ2V0KSAmJlxuICAgICAgICAgICAgICAgICFyZWZsZWN0b3JfMS5SZWZsZWN0b3IuaXNQcm92aWRlcih0YXJnZXQpICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuaXNJbmplY3Rpb25Ub2tlbih0YXJnZXQpKSk7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5oYXNGb3J3YXJkUmVmID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiAhIShwcm92aWRlciAmJiBwcm92aWRlci5mb3J3YXJkUmVmKTtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmdldEZvcndhcmRSZWYgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIFJlZ2lzdHJ5Lmhhc0ZvcndhcmRSZWYocHJvdmlkZXIpXG4gICAgICAgICAgICA/IHByb3ZpZGVyLmZvcndhcmRSZWYoKVxuICAgICAgICAgICAgOiBwcm92aWRlcjtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmdldFByb3ZpZGVyTmFtZSA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmdldFByb3ZpZGVyVG9rZW4ocHJvdmlkZXIpO1xuICAgICAgICByZXR1cm4gdXRpbF8xLlV0aWxzLmlzU3ltYm9sKHRva2VuKSA/IHRva2VuLnRvU3RyaW5nKCkgOiB0b2tlbi5uYW1lO1xuICAgIH07XG4gICAgUmVnaXN0cnkuaXNJbmplY3Rpb25Ub2tlbiA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gcHJvdmlkZXIgaW5zdGFuY2VvZiBtb2R1bGVfMS5JbmplY3Rpb25Ub2tlbjtcbiAgICB9O1xuICAgIFJlZ2lzdHJ5LmdldEluamVjdGlvblRva2VuID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSW5qZWN0aW9uVG9rZW4ocHJvdmlkZXIpXG4gICAgICAgICAgICA/IHByb3ZpZGVyLm5hbWVcbiAgICAgICAgICAgIDogcHJvdmlkZXI7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5hc3NlcnRQcm92aWRlciA9IGZ1bmN0aW9uICh2YWwsIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCF2YWwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuQ2lyY3VsYXJEZXBlbmRlbmN5RXhjZXB0aW9uKGNvbnRleHQpO1xuICAgICAgICBpZiAoISh1dGlsXzEuVXRpbHMuaXNPYmplY3QodmFsKSB8fFxuICAgICAgICAgICAgKCF1dGlsXzEuVXRpbHMuaXNOaWwodmFsLm5hbWUpICYmXG4gICAgICAgICAgICAgICAgKHV0aWxfMS5VdGlscy5pc0Z1bmN0aW9uKHZhbCkgfHwgdXRpbF8xLlV0aWxzLmlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yKSkpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkludmFsaWRQcm92aWRlckV4Y2VwdGlvbih2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5nZXRQcm92aWRlclRva2VuID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvdmlkZXIgIT09ICdzeW1ib2wnXG4gICAgICAgICAgICA/IHRoaXMuZ2V0SW5qZWN0aW9uVG9rZW4ocHJvdmlkZXIucHJvdmlkZSB8fCBwcm92aWRlcilcbiAgICAgICAgICAgIDogcHJvdmlkZXI7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5pc0R5bmFtaWNNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgICAgIHJldHVybiAhIW1vZHVsZS5tb2R1bGU7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5pc0ZhY3RvcnlQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gISFwcm92aWRlci51c2VGYWN0b3J5O1xuICAgIH07XG4gICAgUmVnaXN0cnkuaXNWYWx1ZVByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiAhIXByb3ZpZGVyLnVzZVZhbHVlO1xuICAgIH07XG4gICAgUmVnaXN0cnkuaXNDbGFzc1Byb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiAhIXByb3ZpZGVyLnVzZUNsYXNzO1xuICAgIH07XG4gICAgUmVnaXN0cnkuaXNFeGlzdGluZ1Byb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiAhIXByb3ZpZGVyLnVzZUV4aXN0aW5nO1xuICAgIH07XG4gICAgUmVnaXN0cnkuaGFzUHJvdmlkZVRva2VuID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiAhIXByb3ZpZGVyLnByb3ZpZGU7XG4gICAgfTtcbiAgICBSZWdpc3RyeS5sYXp5SW5qZWN0cyA9IG5ldyBTZXQoKTtcbiAgICByZXR1cm4gUmVnaXN0cnk7XG59KCkpO1xuZXhwb3J0cy5SZWdpc3RyeSA9IFJlZ2lzdHJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVnaXN0cnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbnZhciBpbmplY3Rpb25fdG9rZW5fMSA9IHJlcXVpcmUoXCIuL21vZHVsZS9pbmplY3Rpb24tdG9rZW5cIik7XG5leHBvcnRzLkFQUF9JTklUID0gbmV3IGluamVjdGlvbl90b2tlbl8xLkluamVjdGlvblRva2VuKCdJbml0aWFsaXplPEFwcD4nKTtcbmV4cG9ydHMuQVBQX0RFU1RST1kgPSBuZXcgaW5qZWN0aW9uX3Rva2VuXzEuSW5qZWN0aW9uVG9rZW4oJ0Rlc3Ryb3k8QXBwPicpO1xuZXhwb3J0cy5NT0RVTEVfSU5JVCA9IG5ldyBpbmplY3Rpb25fdG9rZW5fMS5JbmplY3Rpb25Ub2tlbignSW5pdGlhbGl6ZTxNb2R1bGU+Jyk7XG5leHBvcnRzLk9ORV9NT0RVTEUgPSBuZXcgaW5qZWN0aW9uX3Rva2VuXzEuSW5qZWN0aW9uVG9rZW4oJ1JlZjxNb2R1bGU+Jyk7XG52YXIgSW5qZWN0b3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbmplY3RvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbmplY3RvcigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSW5qZWN0b3I7XG59KGludmVyc2lmeV8xLkNvbnRhaW5lcikpO1xuZXhwb3J0cy5JbmplY3RvciA9IEluamVjdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZCA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWQpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICAgIHJldHVybiBhcjtcbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xudmFyIFV0aWxzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVdGlscygpIHtcbiAgICB9XG4gICAgVXRpbHMuaXNOb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKCF0aGlzLmlzTmlsKHByb2Nlc3MpICYmXG4gICAgICAgICAgICB0aGlzLmlzT2JqZWN0KHByb2Nlc3MucmVsZWFzZSkgJiZcbiAgICAgICAgICAgIHByb2Nlc3MucmVsZWFzZS5uYW1lID09PSAnbm9kZScpO1xuICAgIH07XG4gICAgVXRpbHMucHJvY2Vzc0V4aXQgPSBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICBpZiAoY29kZSA9PT0gdm9pZCAwKSB7IGNvZGUgPSAwOyB9XG4gICAgICAgIGlmICh0aGlzLmlzTm9kZSgpKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoY29kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFV0aWxzLmlzRWxlY3Ryb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc05pbCh3aW5kb3cpICYmXG4gICAgICAgICAgICB0aGlzLmlzT2JqZWN0KHdpbmRvdy5wcm9jZXNzKSAmJlxuICAgICAgICAgICAgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMuaXNOaWwocHJvY2VzcykgJiZcbiAgICAgICAgICAgIHRoaXMuaXNPYmplY3QocHJvY2Vzcy52ZXJzaW9ucykgJiZcbiAgICAgICAgICAgICF0aGlzLmlzTmlsKHByb2Nlc3MudmVyc2lvbnMuZWxlY3Ryb24pKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiAodGhpcy5pc09iamVjdChuYXZpZ2F0b3IpICYmXG4gICAgICAgICAgICB0aGlzLmlzU3RyaW5nKG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKCdFbGVjdHJvbicpKTtcbiAgICB9O1xuICAgIFV0aWxzLmxvYWRQYWNrYWdlID0gZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGVfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCAzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHJlcXVpcmUobmFtZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiwgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLk1pc3NpbmdSZXF1aXJlZERlcGVuZGVuY3lFeGNlcHRpb24obmFtZSwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVdGlscy5pc0VtcHR5ID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgIHJldHVybiAhKGFycmF5ICYmIGFycmF5Lmxlbmd0aCA+IDApO1xuICAgIH07XG4gICAgVXRpbHMuZ2V0RGVmZXJyZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUHJvbWlzZSh2YWx1ZSkpIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDNdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiwgX2FdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFV0aWxzLmlzSXRlcmFibGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWwgJiYgdGhpcy5pc0Z1bmN0aW9uKHZhbFtTeW1ib2wuaXRlcmF0b3JdKTtcbiAgICB9O1xuICAgIFV0aWxzLmlzUHJvbWlzZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbCAmJiB0aGlzLmlzRnVuY3Rpb24odmFsLnRoZW4pO1xuICAgIH07XG4gICAgVXRpbHMuaXNPYnNlcnZhYmxlID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsICYmIHRoaXMuaXNGdW5jdGlvbih2YWwuc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIFV0aWxzLmlzU3ltYm9sID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N5bWJvbCc7XG4gICAgfTtcbiAgICBVdGlscy5pc05hbWVkRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiAodmFsICYmXG4gICAgICAgICAgICAhIXZhbC5uYW1lICYmXG4gICAgICAgICAgICAodGhpcy5pc0Z1bmN0aW9uKHZhbCkgfHwgdGhpcy5pc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3RvcikpKTtcbiAgICB9O1xuICAgIFV0aWxzLmlzRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xuICAgIH07XG4gICAgVXRpbHMuaXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbiAgICB9O1xuICAgIFV0aWxzLmlzQm9vbGVhbiA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdib29sZWFuJztcbiAgICB9O1xuICAgIFV0aWxzLmlzU3RyaW5nID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG4gICAgfTtcbiAgICBVdGlscy5pc05pbCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNVbmRlZmluZWQodmFsKSB8fCB2YWwgPT09IG51bGw7XG4gICAgfTtcbiAgICBVdGlscy5pc09iamVjdCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xuICAgIH07XG4gICAgVXRpbHMuaXNVbmRlZmluZWQgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbiAgICB9O1xuICAgIFV0aWxzLnByb21pc2lmeSA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc0Z1bmN0aW9uKGZuKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBwcm9taXNpZnkgYSBub24gZnVuY3Rpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoZm4pKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkodm9pZCAwLCBfX3NwcmVhZChhcmdzLCBbZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3QgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZS5hcHBseSh2b2lkIDAsIF9fc3ByZWFkKHJlc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgfV0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgVXRpbHMuZ2V0VmFsdWVzID0gZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgICAgcmV0dXJuIF9fc3ByZWFkKGVudHJpZXMpLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBfYiA9IF9fcmVhZChfYSwgMiksIF8gPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVdGlscy5jb25jYXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgcHJvcHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBfX3NwcmVhZChwcm9wcykpO1xuICAgIH07XG4gICAgVXRpbHMuZmxhdHRlbiA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBjdXJyZW50KSB7IHJldHVybiBfX3NwcmVhZChwcmV2aW91cywgY3VycmVudCk7IH0sIFtdKTtcbiAgICB9O1xuICAgIFV0aWxzLm9taXQgPSBmdW5jdGlvbiAoZnJvbSkge1xuICAgICAgICB2YXIgYnkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGJ5W19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlXzIsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgYnlfMSA9IF9fdmFsdWVzKGJ5KSwgYnlfMV8xID0gYnlfMS5uZXh0KCk7ICFieV8xXzEuZG9uZTsgYnlfMV8xID0gYnlfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gYnlfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmcm9tW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChieV8xXzEgJiYgIWJ5XzFfMS5kb25lICYmIChfYSA9IGJ5XzEucmV0dXJuKSkgX2EuY2FsbChieV8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnJvbTtcbiAgICB9O1xuICAgIFV0aWxzLnNlcmllcyA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8zLCBfYSwgcHJvbWlzZXNfMSwgcHJvbWlzZXNfMV8xLCBwcm9taXNlLCBlXzNfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMCwgNSwgNiwgN10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXNfMSA9IF9fdmFsdWVzKHByb21pc2VzKSwgcHJvbWlzZXNfMV8xID0gcHJvbWlzZXNfMS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXByb21pc2VzXzFfMS5kb25lKSByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2VzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgcHJvbWlzZV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXNfMV8xID0gcHJvbWlzZXNfMS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMywgN107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfM18xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV8zID0geyBlcnJvcjogZV8zXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgN107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb21pc2VzXzFfMSAmJiAhcHJvbWlzZXNfMV8xLmRvbmUgJiYgKF9hID0gcHJvbWlzZXNfMS5yZXR1cm4pKSBfYS5jYWxsKHByb21pc2VzXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFV0aWxzLmZpbHRlcldoZW4gPSBmdW5jdGlvbiAoYXJyLCBzdGF0ZW1lbnQsIGZpbHRlcikge1xuICAgICAgICByZXR1cm4gISFzdGF0ZW1lbnQgPyBhcnIuZmlsdGVyKGZpbHRlcikgOiBhcnI7XG4gICAgfTtcbiAgICBVdGlscy5waWNrID0gZnVuY3Rpb24gKGZyb20sIGJ5KSB7XG4gICAgICAgIHJldHVybiBmcm9tLmZpbHRlcihmdW5jdGlvbiAoZikgeyByZXR1cm4gYnkuaW5jbHVkZXMoZik7IH0pO1xuICAgIH07XG4gICAgVXRpbHMuY3JlYXRlRGVmZXJyZWRQcm9taXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzb2x2ZTtcbiAgICAgICAgdmFyIHJlamVjdDtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKF9yZXNvbHZlLCBfcmVqZWN0KSB7XG4gICAgICAgICAgICByZXNvbHZlID0gX3Jlc29sdmU7XG4gICAgICAgICAgICByZWplY3QgPSBfcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xuICAgIH07XG4gICAgVXRpbHMudHJhbnNmb3JtUmVzdWx0ID0gZnVuY3Rpb24gKHJlc3VsdE9yRGVmZXJyZWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzT2JzZXJ2YWJsZShyZXN1bHRPckRlZmVycmVkKSkgcmV0dXJuIFszLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgcmVzdWx0T3JEZWZlcnJlZC50b1Byb21pc2UoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbNCwgcmVzdWx0T3JEZWZlcnJlZF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBVdGlscztcbn0oKSk7XG5leHBvcnRzLlV0aWxzID0gVXRpbHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIElOSkVDVElPTiA9IFN5bWJvbC5mb3IoXCJJTkpFQ1RJT05cIik7XG5mdW5jdGlvbiBfcHJveHlHZXR0ZXIocHJvdG8sIGtleSwgcmVzb2x2ZSwgZG9DYWNoZSkge1xuICAgIGZ1bmN0aW9uIGdldHRlcigpIHtcbiAgICAgICAgaWYgKGRvQ2FjaGUgJiYgIVJlZmxlY3QuaGFzTWV0YWRhdGEoSU5KRUNUSU9OLCB0aGlzLCBrZXkpKSB7XG4gICAgICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKElOSkVDVElPTiwgcmVzb2x2ZSgpLCB0aGlzLCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChSZWZsZWN0Lmhhc01ldGFkYXRhKElOSkVDVElPTiwgdGhpcywga2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoSU5KRUNUSU9OLCB0aGlzLCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoSU5KRUNUSU9OLCBuZXdWYWwsIHRoaXMsIGtleSk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIHNldDogc2V0dGVyXG4gICAgfSk7XG59XG5mdW5jdGlvbiBtYWtlUHJvcGVydHlJbmplY3REZWNvcmF0b3IoY29udGFpbmVyLCBkb0NhY2hlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciByZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXIuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfcHJveHlHZXR0ZXIocHJvdG8sIGtleSwgcmVzb2x2ZSwgZG9DYWNoZSk7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbmV4cG9ydHMubWFrZVByb3BlcnR5SW5qZWN0RGVjb3JhdG9yID0gbWFrZVByb3BlcnR5SW5qZWN0RGVjb3JhdG9yO1xuZnVuY3Rpb24gbWFrZVByb3BlcnR5SW5qZWN0TmFtZWREZWNvcmF0b3IoY29udGFpbmVyLCBkb0NhY2hlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgbmFtZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwcm90bywga2V5KSB7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyLmdldE5hbWVkKHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3Byb3h5R2V0dGVyKHByb3RvLCBrZXksIHJlc29sdmUsIGRvQ2FjaGUpO1xuICAgICAgICB9O1xuICAgIH07XG59XG5leHBvcnRzLm1ha2VQcm9wZXJ0eUluamVjdE5hbWVkRGVjb3JhdG9yID0gbWFrZVByb3BlcnR5SW5qZWN0TmFtZWREZWNvcmF0b3I7XG5mdW5jdGlvbiBtYWtlUHJvcGVydHlJbmplY3RUYWdnZWREZWNvcmF0b3IoY29udGFpbmVyLCBkb0NhY2hlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIHZhciByZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXIuZ2V0VGFnZ2VkKHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfcHJveHlHZXR0ZXIocHJvdG8sIHByb3BlcnR5TmFtZSwgcmVzb2x2ZSwgZG9DYWNoZSk7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbmV4cG9ydHMubWFrZVByb3BlcnR5SW5qZWN0VGFnZ2VkRGVjb3JhdG9yID0gbWFrZVByb3BlcnR5SW5qZWN0VGFnZ2VkRGVjb3JhdG9yO1xuZnVuY3Rpb24gbWFrZVByb3BlcnR5TXVsdGlJbmplY3REZWNvcmF0b3IoY29udGFpbmVyLCBkb0NhY2hlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciByZXNvbHZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXIuZ2V0QWxsKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfcHJveHlHZXR0ZXIocHJvdG8sIGtleSwgcmVzb2x2ZSwgZG9DYWNoZSk7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbmV4cG9ydHMubWFrZVByb3BlcnR5TXVsdGlJbmplY3REZWNvcmF0b3IgPSBtYWtlUHJvcGVydHlNdWx0aUluamVjdERlY29yYXRvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGRlY29yYXRvcnNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcnNcIik7XG5mdW5jdGlvbiBnZXREZWNvcmF0b3JzKGNvbnRhaW5lciwgZG9DYWNoZSkge1xuICAgIGlmIChkb0NhY2hlID09PSB2b2lkIDApIHsgZG9DYWNoZSA9IHRydWU7IH1cbiAgICB2YXIgbGF6eUluamVjdCA9IGRlY29yYXRvcnNfMS5tYWtlUHJvcGVydHlJbmplY3REZWNvcmF0b3IoY29udGFpbmVyLCBkb0NhY2hlKTtcbiAgICB2YXIgbGF6eUluamVjdE5hbWVkID0gZGVjb3JhdG9yc18xLm1ha2VQcm9wZXJ0eUluamVjdE5hbWVkRGVjb3JhdG9yKGNvbnRhaW5lciwgZG9DYWNoZSk7XG4gICAgdmFyIGxhenlJbmplY3RUYWdnZWQgPSBkZWNvcmF0b3JzXzEubWFrZVByb3BlcnR5SW5qZWN0VGFnZ2VkRGVjb3JhdG9yKGNvbnRhaW5lciwgZG9DYWNoZSk7XG4gICAgdmFyIGxhenlNdWx0aUluamVjdCA9IGRlY29yYXRvcnNfMS5tYWtlUHJvcGVydHlNdWx0aUluamVjdERlY29yYXRvcihjb250YWluZXIsIGRvQ2FjaGUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxhenlJbmplY3Q6IGxhenlJbmplY3QsXG4gICAgICAgIGxhenlJbmplY3ROYW1lZDogbGF6eUluamVjdE5hbWVkLFxuICAgICAgICBsYXp5SW5qZWN0VGFnZ2VkOiBsYXp5SW5qZWN0VGFnZ2VkLFxuICAgICAgICBsYXp5TXVsdGlJbmplY3Q6IGxhenlNdWx0aUluamVjdFxuICAgIH07XG59XG5leHBvcnRzLmRlZmF1bHQgPSBnZXREZWNvcmF0b3JzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRVJST1JfTVNHUyA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG5mdW5jdGlvbiB0YWdQYXJhbWV0ZXIoYW5ub3RhdGlvblRhcmdldCwgcHJvcGVydHlOYW1lLCBwYXJhbWV0ZXJJbmRleCwgbWV0YWRhdGEpIHtcbiAgICB2YXIgbWV0YWRhdGFLZXkgPSBNRVRBREFUQV9LRVkuVEFHR0VEO1xuICAgIF90YWdQYXJhbWV0ZXJPclByb3BlcnR5KG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIG1ldGFkYXRhLCBwYXJhbWV0ZXJJbmRleCk7XG59XG5leHBvcnRzLnRhZ1BhcmFtZXRlciA9IHRhZ1BhcmFtZXRlcjtcbmZ1bmN0aW9uIHRhZ1Byb3BlcnR5KGFubm90YXRpb25UYXJnZXQsIHByb3BlcnR5TmFtZSwgbWV0YWRhdGEpIHtcbiAgICB2YXIgbWV0YWRhdGFLZXkgPSBNRVRBREFUQV9LRVkuVEFHR0VEX1BST1A7XG4gICAgX3RhZ1BhcmFtZXRlck9yUHJvcGVydHkobWV0YWRhdGFLZXksIGFubm90YXRpb25UYXJnZXQuY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSwgbWV0YWRhdGEpO1xufVxuZXhwb3J0cy50YWdQcm9wZXJ0eSA9IHRhZ1Byb3BlcnR5O1xuZnVuY3Rpb24gX3RhZ1BhcmFtZXRlck9yUHJvcGVydHkobWV0YWRhdGFLZXksIGFubm90YXRpb25UYXJnZXQsIHByb3BlcnR5TmFtZSwgbWV0YWRhdGEsIHBhcmFtZXRlckluZGV4KSB7XG4gICAgdmFyIHBhcmFtc09yUHJvcGVydGllc01ldGFkYXRhID0ge307XG4gICAgdmFyIGlzUGFyYW1ldGVyRGVjb3JhdG9yID0gKHR5cGVvZiBwYXJhbWV0ZXJJbmRleCA9PT0gXCJudW1iZXJcIik7XG4gICAgdmFyIGtleSA9IChwYXJhbWV0ZXJJbmRleCAhPT0gdW5kZWZpbmVkICYmIGlzUGFyYW1ldGVyRGVjb3JhdG9yKSA/IHBhcmFtZXRlckluZGV4LnRvU3RyaW5nKCkgOiBwcm9wZXJ0eU5hbWU7XG4gICAgaWYgKGlzUGFyYW1ldGVyRGVjb3JhdG9yICYmIHByb3BlcnR5TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLklOVkFMSURfREVDT1JBVE9SX09QRVJBVElPTik7XG4gICAgfVxuICAgIGlmIChSZWZsZWN0Lmhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbm5vdGF0aW9uVGFyZ2V0KSkge1xuICAgICAgICBwYXJhbXNPclByb3BlcnRpZXNNZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEobWV0YWRhdGFLZXksIGFubm90YXRpb25UYXJnZXQpO1xuICAgIH1cbiAgICB2YXIgcGFyYW1PclByb3BlcnR5TWV0YWRhdGEgPSBwYXJhbXNPclByb3BlcnRpZXNNZXRhZGF0YVtrZXldO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYXJhbU9yUHJvcGVydHlNZXRhZGF0YSkpIHtcbiAgICAgICAgcGFyYW1PclByb3BlcnR5TWV0YWRhdGEgPSBbXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgcGFyYW1PclByb3BlcnR5TWV0YWRhdGFfMSA9IHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhOyBfaSA8IHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbSA9IHBhcmFtT3JQcm9wZXJ0eU1ldGFkYXRhXzFbX2ldO1xuICAgICAgICAgICAgaWYgKG0ua2V5ID09PSBtZXRhZGF0YS5rZXkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5EVVBMSUNBVEVEX01FVEFEQVRBICsgXCIgXCIgKyBtLmtleS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXJhbU9yUHJvcGVydHlNZXRhZGF0YS5wdXNoKG1ldGFkYXRhKTtcbiAgICBwYXJhbXNPclByb3BlcnRpZXNNZXRhZGF0YVtrZXldID0gcGFyYW1PclByb3BlcnR5TWV0YWRhdGE7XG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShtZXRhZGF0YUtleSwgcGFyYW1zT3JQcm9wZXJ0aWVzTWV0YWRhdGEsIGFubm90YXRpb25UYXJnZXQpO1xufVxuZnVuY3Rpb24gX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCkge1xuICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0KTtcbn1cbmZ1bmN0aW9uIF9wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH07XG59XG5mdW5jdGlvbiBkZWNvcmF0ZShkZWNvcmF0b3IsIHRhcmdldCwgcGFyYW1ldGVySW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtZXRlckluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIF9kZWNvcmF0ZShbX3BhcmFtKHBhcmFtZXRlckluZGV4LCBkZWNvcmF0b3IpXSwgdGFyZ2V0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHBhcmFtZXRlckluZGV4ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIFJlZmxlY3QuZGVjb3JhdGUoW2RlY29yYXRvcl0sIHRhcmdldCwgcGFyYW1ldGVySW5kZXgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2RlY29yYXRlKFtkZWNvcmF0b3JdLCB0YXJnZXQpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVjb3JhdGUgPSBkZWNvcmF0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGVycm9yX21zZ3NfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvZXJyb3JfbXNnc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbnZhciBMYXp5U2VydmljZUlkZW50aWZlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGF6eVNlcnZpY2VJZGVudGlmZXIoY2IpIHtcbiAgICAgICAgdGhpcy5fY2IgPSBjYjtcbiAgICB9XG4gICAgTGF6eVNlcnZpY2VJZGVudGlmZXIucHJvdG90eXBlLnVud3JhcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NiKCk7XG4gICAgfTtcbiAgICByZXR1cm4gTGF6eVNlcnZpY2VJZGVudGlmZXI7XG59KCkpO1xuZXhwb3J0cy5MYXp5U2VydmljZUlkZW50aWZlciA9IExhenlTZXJ2aWNlSWRlbnRpZmVyO1xuZnVuY3Rpb24gaW5qZWN0KHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl9tc2dzXzEuVU5ERUZJTkVEX0lOSkVDVF9BTk5PVEFUSU9OKHRhcmdldC5uYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLklOSkVDVF9UQUcsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUHJvcGVydHkodGFyZ2V0LCB0YXJnZXRLZXksIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmluamVjdCA9IGluamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SU19NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbmZ1bmN0aW9uIGluamVjdGFibGUoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBBUkFNX1RZUEVTLCB0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JTX01TR1MuRFVQTElDQVRFRF9JTkpFQ1RBQkxFX0RFQ09SQVRPUik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHR5cGVzID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuREVTSUdOX1BBUkFNX1RZUEVTLCB0YXJnZXQpIHx8IFtdO1xuICAgICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QQVJBTV9UWVBFUywgdHlwZXMsIHRhcmdldCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcbn1cbmV4cG9ydHMuaW5qZWN0YWJsZSA9IGluamVjdGFibGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIG11bHRpSW5qZWN0KHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUHJvcGVydHkodGFyZ2V0LCB0YXJnZXRLZXksIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLm11bHRpSW5qZWN0ID0gbXVsdGlJbmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIG5hbWVkKG5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShNRVRBREFUQV9LRVkuTkFNRURfVEFHLCBuYW1lKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUHJvcGVydHkodGFyZ2V0LCB0YXJnZXRLZXksIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLm5hbWVkID0gbmFtZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIG9wdGlvbmFsKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5PUFRJT05BTF9UQUcsIHRydWUpO1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQYXJhbWV0ZXIodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWNvcmF0b3JfdXRpbHNfMS50YWdQcm9wZXJ0eSh0YXJnZXQsIHRhcmdldEtleSwgbWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMub3B0aW9uYWwgPSBvcHRpb25hbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SU19NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xuZnVuY3Rpb24gcG9zdENvbnN0cnVjdCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIGlmIChSZWZsZWN0Lmhhc093bk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgdGFyZ2V0LmNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SU19NU0dTLk1VTFRJUExFX1BPU1RfQ09OU1RSVUNUX01FVEhPRFMpO1xuICAgICAgICB9XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoTUVUQURBVEFfS0VZLlBPU1RfQ09OU1RSVUNULCBtZXRhZGF0YSwgdGFyZ2V0LmNvbnN0cnVjdG9yKTtcbiAgICB9O1xufVxuZXhwb3J0cy5wb3N0Q29uc3RydWN0ID0gcG9zdENvbnN0cnVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi4vcGxhbm5pbmcvbWV0YWRhdGFcIik7XG52YXIgZGVjb3JhdG9yX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JfdXRpbHNcIik7XG5mdW5jdGlvbiB0YWdnZWQobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCkge1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1Byb3BlcnR5KHRhcmdldCwgdGFyZ2V0S2V5LCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy50YWdnZWQgPSB0YWdnZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciBkZWNvcmF0b3JfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcl91dGlsc1wiKTtcbmZ1bmN0aW9uIHRhcmdldE5hbWUobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5OQU1FX1RBRywgbmFtZSk7XG4gICAgICAgIGRlY29yYXRvcl91dGlsc18xLnRhZ1BhcmFtZXRlcih0YXJnZXQsIHRhcmdldEtleSwgaW5kZXgsIG1ldGFkYXRhKTtcbiAgICB9O1xufVxuZXhwb3J0cy50YXJnZXROYW1lID0gdGFyZ2V0TmFtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL21ldGFkYXRhXCIpO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9yX3V0aWxzXCIpO1xuZnVuY3Rpb24gdW5tYW5hZ2VkKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRLZXksIGluZGV4KSB7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5VTk1BTkFHRURfVEFHLCB0cnVlKTtcbiAgICAgICAgZGVjb3JhdG9yX3V0aWxzXzEudGFnUGFyYW1ldGVyKHRhcmdldCwgdGFyZ2V0S2V5LCBpbmRleCwgbWV0YWRhdGEpO1xuICAgIH07XG59XG5leHBvcnRzLnVubWFuYWdlZCA9IHVubWFuYWdlZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBpZF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2lkXCIpO1xudmFyIEJpbmRpbmcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmcoc2VydmljZUlkZW50aWZpZXIsIHNjb3BlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VydmljZUlkZW50aWZpZXIgPSBzZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkludmFsaWQ7XG4gICAgICAgIHRoaXMuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7IHJldHVybiB0cnVlOyB9O1xuICAgICAgICB0aGlzLmltcGxlbWVudGF0aW9uVHlwZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FjaGUgPSBudWxsO1xuICAgICAgICB0aGlzLmZhY3RvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLnByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbkFjdGl2YXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmR5bmFtaWNWYWx1ZSA9IG51bGw7XG4gICAgfVxuICAgIEJpbmRpbmcucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xvbmUgPSBuZXcgQmluZGluZyh0aGlzLnNlcnZpY2VJZGVudGlmaWVyLCB0aGlzLnNjb3BlKTtcbiAgICAgICAgY2xvbmUuYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgICAgIGNsb25lLmltcGxlbWVudGF0aW9uVHlwZSA9IHRoaXMuaW1wbGVtZW50YXRpb25UeXBlO1xuICAgICAgICBjbG9uZS5keW5hbWljVmFsdWUgPSB0aGlzLmR5bmFtaWNWYWx1ZTtcbiAgICAgICAgY2xvbmUuc2NvcGUgPSB0aGlzLnNjb3BlO1xuICAgICAgICBjbG9uZS50eXBlID0gdGhpcy50eXBlO1xuICAgICAgICBjbG9uZS5mYWN0b3J5ID0gdGhpcy5mYWN0b3J5O1xuICAgICAgICBjbG9uZS5wcm92aWRlciA9IHRoaXMucHJvdmlkZXI7XG4gICAgICAgIGNsb25lLmNvbnN0cmFpbnQgPSB0aGlzLmNvbnN0cmFpbnQ7XG4gICAgICAgIGNsb25lLm9uQWN0aXZhdGlvbiA9IHRoaXMub25BY3RpdmF0aW9uO1xuICAgICAgICBjbG9uZS5jYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nO1xufSgpKTtcbmV4cG9ydHMuQmluZGluZyA9IEJpbmRpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCaW5kaW5nQ291bnQgPSB7XG4gICAgTXVsdGlwbGVCaW5kaW5nc0F2YWlsYWJsZTogMixcbiAgICBOb0JpbmRpbmdzQXZhaWxhYmxlOiAwLFxuICAgIE9ubHlPbmVCaW5kaW5nQXZhaWxhYmxlOiAxXG59O1xuZXhwb3J0cy5CaW5kaW5nQ291bnQgPSBCaW5kaW5nQ291bnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRFVQTElDQVRFRF9JTkpFQ1RBQkxFX0RFQ09SQVRPUiA9IFwiQ2Fubm90IGFwcGx5IEBpbmplY3RhYmxlIGRlY29yYXRvciBtdWx0aXBsZSB0aW1lcy5cIjtcbmV4cG9ydHMuRFVQTElDQVRFRF9NRVRBREFUQSA9IFwiTWV0YWRhdGEga2V5IHdhcyB1c2VkIG1vcmUgdGhhbiBvbmNlIGluIGEgcGFyYW1ldGVyOlwiO1xuZXhwb3J0cy5OVUxMX0FSR1VNRU5UID0gXCJOVUxMIGFyZ3VtZW50XCI7XG5leHBvcnRzLktFWV9OT1RfRk9VTkQgPSBcIktleSBOb3QgRm91bmRcIjtcbmV4cG9ydHMuQU1CSUdVT1VTX01BVENIID0gXCJBbWJpZ3VvdXMgbWF0Y2ggZm91bmQgZm9yIHNlcnZpY2VJZGVudGlmaWVyOlwiO1xuZXhwb3J0cy5DQU5OT1RfVU5CSU5EID0gXCJDb3VsZCBub3QgdW5iaW5kIHNlcnZpY2VJZGVudGlmaWVyOlwiO1xuZXhwb3J0cy5OT1RfUkVHSVNURVJFRCA9IFwiTm8gbWF0Y2hpbmcgYmluZGluZ3MgZm91bmQgZm9yIHNlcnZpY2VJZGVudGlmaWVyOlwiO1xuZXhwb3J0cy5NSVNTSU5HX0lOSkVDVEFCTEVfQU5OT1RBVElPTiA9IFwiTWlzc2luZyByZXF1aXJlZCBAaW5qZWN0YWJsZSBhbm5vdGF0aW9uIGluOlwiO1xuZXhwb3J0cy5NSVNTSU5HX0lOSkVDVF9BTk5PVEFUSU9OID0gXCJNaXNzaW5nIHJlcXVpcmVkIEBpbmplY3Qgb3IgQG11bHRpSW5qZWN0IGFubm90YXRpb24gaW46XCI7XG5leHBvcnRzLlVOREVGSU5FRF9JTkpFQ1RfQU5OT1RBVElPTiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIFwiQGluamVjdCBjYWxsZWQgd2l0aCB1bmRlZmluZWQgdGhpcyBjb3VsZCBtZWFuIHRoYXQgdGhlIGNsYXNzIFwiICsgbmFtZSArIFwiIGhhcyBcIiArXG4gICAgICAgIFwiYSBjaXJjdWxhciBkZXBlbmRlbmN5IHByb2JsZW0uIFlvdSBjYW4gdXNlIGEgTGF6eVNlcnZpY2VJZGVudGlmZXIgdG8gIFwiICtcbiAgICAgICAgXCJvdmVyY29tZSB0aGlzIGxpbWl0YXRpb24uXCI7XG59O1xuZXhwb3J0cy5DSVJDVUxBUl9ERVBFTkRFTkNZID0gXCJDaXJjdWxhciBkZXBlbmRlbmN5IGZvdW5kOlwiO1xuZXhwb3J0cy5OT1RfSU1QTEVNRU5URUQgPSBcIlNvcnJ5LCB0aGlzIGZlYXR1cmUgaXMgbm90IGZ1bGx5IGltcGxlbWVudGVkIHlldC5cIjtcbmV4cG9ydHMuSU5WQUxJRF9CSU5ESU5HX1RZUEUgPSBcIkludmFsaWQgYmluZGluZyB0eXBlOlwiO1xuZXhwb3J0cy5OT19NT1JFX1NOQVBTSE9UU19BVkFJTEFCTEUgPSBcIk5vIHNuYXBzaG90IGF2YWlsYWJsZSB0byByZXN0b3JlLlwiO1xuZXhwb3J0cy5JTlZBTElEX01JRERMRVdBUkVfUkVUVVJOID0gXCJJbnZhbGlkIHJldHVybiB0eXBlIGluIG1pZGRsZXdhcmUuIE1pZGRsZXdhcmUgbXVzdCByZXR1cm4hXCI7XG5leHBvcnRzLklOVkFMSURfRlVOQ1RJT05fQklORElORyA9IFwiVmFsdWUgcHJvdmlkZWQgdG8gZnVuY3Rpb24gYmluZGluZyBtdXN0IGJlIGEgZnVuY3Rpb24hXCI7XG5leHBvcnRzLklOVkFMSURfVE9fU0VMRl9WQUxVRSA9IFwiVGhlIHRvU2VsZiBmdW5jdGlvbiBjYW4gb25seSBiZSBhcHBsaWVkIHdoZW4gYSBjb25zdHJ1Y3RvciBpcyBcIiArXG4gICAgXCJ1c2VkIGFzIHNlcnZpY2UgaWRlbnRpZmllclwiO1xuZXhwb3J0cy5JTlZBTElEX0RFQ09SQVRPUl9PUEVSQVRJT04gPSBcIlRoZSBAaW5qZWN0IEBtdWx0aUluamVjdCBAdGFnZ2VkIGFuZCBAbmFtZWQgZGVjb3JhdG9ycyBcIiArXG4gICAgXCJtdXN0IGJlIGFwcGxpZWQgdG8gdGhlIHBhcmFtZXRlcnMgb2YgYSBjbGFzcyBjb25zdHJ1Y3RvciBvciBhIGNsYXNzIHByb3BlcnR5LlwiO1xuZXhwb3J0cy5BUkdVTUVOVFNfTEVOR1RIX01JU01BVENIID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YWx1ZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIFwiVGhlIG51bWJlciBvZiBjb25zdHJ1Y3RvciBhcmd1bWVudHMgaW4gdGhlIGRlcml2ZWQgY2xhc3MgXCIgK1xuICAgICAgICAodmFsdWVzWzBdICsgXCIgbXVzdCBiZSA+PSB0aGFuIHRoZSBudW1iZXIgb2YgY29uc3RydWN0b3IgYXJndW1lbnRzIG9mIGl0cyBiYXNlIGNsYXNzLlwiKTtcbn07XG5leHBvcnRzLkNPTlRBSU5FUl9PUFRJT05TX01VU1RfQkVfQU5fT0JKRUNUID0gXCJJbnZhbGlkIENvbnRhaW5lciBjb25zdHJ1Y3RvciBhcmd1bWVudC4gQ29udGFpbmVyIG9wdGlvbnMgXCIgK1xuICAgIFwibXVzdCBiZSBhbiBvYmplY3QuXCI7XG5leHBvcnRzLkNPTlRBSU5FUl9PUFRJT05TX0lOVkFMSURfREVGQVVMVF9TQ09QRSA9IFwiSW52YWxpZCBDb250YWluZXIgb3B0aW9uLiBEZWZhdWx0IHNjb3BlIG11c3QgXCIgK1xuICAgIFwiYmUgYSBzdHJpbmcgKCdzaW5nbGV0b24nIG9yICd0cmFuc2llbnQnKS5cIjtcbmV4cG9ydHMuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9BVVRPX0JJTkRfSU5KRUNUQUJMRSA9IFwiSW52YWxpZCBDb250YWluZXIgb3B0aW9uLiBBdXRvIGJpbmQgaW5qZWN0YWJsZSBtdXN0IFwiICtcbiAgICBcImJlIGEgYm9vbGVhblwiO1xuZXhwb3J0cy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX1NLSVBfQkFTRV9DSEVDSyA9IFwiSW52YWxpZCBDb250YWluZXIgb3B0aW9uLiBTa2lwIGJhc2UgY2hlY2sgbXVzdCBcIiArXG4gICAgXCJiZSBhIGJvb2xlYW5cIjtcbmV4cG9ydHMuTVVMVElQTEVfUE9TVF9DT05TVFJVQ1RfTUVUSE9EUyA9IFwiQ2Fubm90IGFwcGx5IEBwb3N0Q29uc3RydWN0IGRlY29yYXRvciBtdWx0aXBsZSB0aW1lcyBpbiB0aGUgc2FtZSBjbGFzc1wiO1xuZXhwb3J0cy5QT1NUX0NPTlNUUlVDVF9FUlJPUiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFsdWVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBcIkBwb3N0Q29uc3RydWN0IGVycm9yIGluIGNsYXNzIFwiICsgdmFsdWVzWzBdICsgXCI6IFwiICsgdmFsdWVzWzFdO1xufTtcbmV4cG9ydHMuQ0lSQ1VMQVJfREVQRU5ERU5DWV9JTl9GQUNUT1JZID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YWx1ZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIFwiSXQgbG9va3MgbGlrZSB0aGVyZSBpcyBhIGNpcmN1bGFyIGRlcGVuZGVuY3kgXCIgK1xuICAgICAgICAoXCJpbiBvbmUgb2YgdGhlICdcIiArIHZhbHVlc1swXSArIFwiJyBiaW5kaW5ncy4gUGxlYXNlIGludmVzdGlnYXRlIGJpbmRpbmdzIHdpdGhcIikgK1xuICAgICAgICAoXCJzZXJ2aWNlIGlkZW50aWZpZXIgJ1wiICsgdmFsdWVzWzFdICsgXCInLlwiKTtcbn07XG5leHBvcnRzLlNUQUNLX09WRVJGTE9XID0gXCJNYXhpbXVtIGNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQmluZGluZ1Njb3BlRW51bSA9IHtcbiAgICBSZXF1ZXN0OiBcIlJlcXVlc3RcIixcbiAgICBTaW5nbGV0b246IFwiU2luZ2xldG9uXCIsXG4gICAgVHJhbnNpZW50OiBcIlRyYW5zaWVudFwiXG59O1xuZXhwb3J0cy5CaW5kaW5nU2NvcGVFbnVtID0gQmluZGluZ1Njb3BlRW51bTtcbnZhciBCaW5kaW5nVHlwZUVudW0gPSB7XG4gICAgQ29uc3RhbnRWYWx1ZTogXCJDb25zdGFudFZhbHVlXCIsXG4gICAgQ29uc3RydWN0b3I6IFwiQ29uc3RydWN0b3JcIixcbiAgICBEeW5hbWljVmFsdWU6IFwiRHluYW1pY1ZhbHVlXCIsXG4gICAgRmFjdG9yeTogXCJGYWN0b3J5XCIsXG4gICAgRnVuY3Rpb246IFwiRnVuY3Rpb25cIixcbiAgICBJbnN0YW5jZTogXCJJbnN0YW5jZVwiLFxuICAgIEludmFsaWQ6IFwiSW52YWxpZFwiLFxuICAgIFByb3ZpZGVyOiBcIlByb3ZpZGVyXCJcbn07XG5leHBvcnRzLkJpbmRpbmdUeXBlRW51bSA9IEJpbmRpbmdUeXBlRW51bTtcbnZhciBUYXJnZXRUeXBlRW51bSA9IHtcbiAgICBDbGFzc1Byb3BlcnR5OiBcIkNsYXNzUHJvcGVydHlcIixcbiAgICBDb25zdHJ1Y3RvckFyZ3VtZW50OiBcIkNvbnN0cnVjdG9yQXJndW1lbnRcIixcbiAgICBWYXJpYWJsZTogXCJWYXJpYWJsZVwiXG59O1xuZXhwb3J0cy5UYXJnZXRUeXBlRW51bSA9IFRhcmdldFR5cGVFbnVtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5BTUVEX1RBRyA9IFwibmFtZWRcIjtcbmV4cG9ydHMuTkFNRV9UQUcgPSBcIm5hbWVcIjtcbmV4cG9ydHMuVU5NQU5BR0VEX1RBRyA9IFwidW5tYW5hZ2VkXCI7XG5leHBvcnRzLk9QVElPTkFMX1RBRyA9IFwib3B0aW9uYWxcIjtcbmV4cG9ydHMuSU5KRUNUX1RBRyA9IFwiaW5qZWN0XCI7XG5leHBvcnRzLk1VTFRJX0lOSkVDVF9UQUcgPSBcIm11bHRpX2luamVjdFwiO1xuZXhwb3J0cy5UQUdHRUQgPSBcImludmVyc2lmeTp0YWdnZWRcIjtcbmV4cG9ydHMuVEFHR0VEX1BST1AgPSBcImludmVyc2lmeTp0YWdnZWRfcHJvcHNcIjtcbmV4cG9ydHMuUEFSQU1fVFlQRVMgPSBcImludmVyc2lmeTpwYXJhbXR5cGVzXCI7XG5leHBvcnRzLkRFU0lHTl9QQVJBTV9UWVBFUyA9IFwiZGVzaWduOnBhcmFtdHlwZXNcIjtcbmV4cG9ydHMuUE9TVF9DT05TVFJVQ1QgPSBcInBvc3RfY29uc3RydWN0XCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfMSA9IHJlcXVpcmUoXCIuLi9iaW5kaW5ncy9iaW5kaW5nXCIpO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBtZXRhZGF0YV9yZWFkZXJfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YV9yZWFkZXJcIik7XG52YXIgcGxhbm5lcl8xID0gcmVxdWlyZShcIi4uL3BsYW5uaW5nL3BsYW5uZXJcIik7XG52YXIgcmVzb2x2ZXJfMSA9IHJlcXVpcmUoXCIuLi9yZXNvbHV0aW9uL3Jlc29sdmVyXCIpO1xudmFyIGJpbmRpbmdfdG9fc3ludGF4XzEgPSByZXF1aXJlKFwiLi4vc3ludGF4L2JpbmRpbmdfdG9fc3ludGF4XCIpO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgc2VyaWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlcmlhbGl6YXRpb25cIik7XG52YXIgY29udGFpbmVyX3NuYXBzaG90XzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJfc25hcHNob3RcIik7XG52YXIgbG9va3VwXzEgPSByZXF1aXJlKFwiLi9sb29rdXBcIik7XG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoY29udGFpbmVyT3B0aW9ucykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGNvbnRhaW5lck9wdGlvbnMgfHwge307XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIgKyBFUlJPUl9NU0dTLkNPTlRBSU5FUl9PUFRJT05TX01VU1RfQkVfQU5fT0JKRUNUKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0U2NvcGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5kZWZhdWx0U2NvcGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bS5UcmFuc2llbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5kZWZhdWx0U2NvcGUgIT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbiAmJlxuICAgICAgICAgICAgb3B0aW9ucy5kZWZhdWx0U2NvcGUgIT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudCAmJlxuICAgICAgICAgICAgb3B0aW9ucy5kZWZhdWx0U2NvcGUgIT09IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlJlcXVlc3QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0RFRkFVTFRfU0NPUEUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmF1dG9CaW5kSW5qZWN0YWJsZSAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5DT05UQUlORVJfT1BUSU9OU19JTlZBTElEX0FVVE9fQklORF9JTkpFQ1RBQkxFKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcEJhc2VDbGFzc0NoZWNrcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIiArIEVSUk9SX01TR1MuQ09OVEFJTkVSX09QVElPTlNfSU5WQUxJRF9TS0lQX0JBU0VfQ0hFQ0spO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGF1dG9CaW5kSW5qZWN0YWJsZTogb3B0aW9ucy5hdXRvQmluZEluamVjdGFibGUsXG4gICAgICAgICAgICBkZWZhdWx0U2NvcGU6IG9wdGlvbnMuZGVmYXVsdFNjb3BlLFxuICAgICAgICAgICAgc2tpcEJhc2VDbGFzc0NoZWNrczogb3B0aW9ucy5za2lwQmFzZUNsYXNzQ2hlY2tzXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5ID0gbmV3IGxvb2t1cF8xLkxvb2t1cCgpO1xuICAgICAgICB0aGlzLl9zbmFwc2hvdHMgPSBbXTtcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZSA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGFSZWFkZXIgPSBuZXcgbWV0YWRhdGFfcmVhZGVyXzEuTWV0YWRhdGFSZWFkZXIoKTtcbiAgICB9XG4gICAgQ29udGFpbmVyLm1lcmdlID0gZnVuY3Rpb24gKGNvbnRhaW5lcjEsIGNvbnRhaW5lcjIpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBDb250YWluZXIoKTtcbiAgICAgICAgdmFyIGJpbmRpbmdEaWN0aW9uYXJ5ID0gcGxhbm5lcl8xLmdldEJpbmRpbmdEaWN0aW9uYXJ5KGNvbnRhaW5lcik7XG4gICAgICAgIHZhciBiaW5kaW5nRGljdGlvbmFyeTEgPSBwbGFubmVyXzEuZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyMSk7XG4gICAgICAgIHZhciBiaW5kaW5nRGljdGlvbmFyeTIgPSBwbGFubmVyXzEuZ2V0QmluZGluZ0RpY3Rpb25hcnkoY29udGFpbmVyMik7XG4gICAgICAgIGZ1bmN0aW9uIGNvcHlEaWN0aW9uYXJ5KG9yaWdpbiwgZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIG9yaWdpbi50cmF2ZXJzZShmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uYWRkKGJpbmRpbmcuc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmcuY2xvbmUoKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb3B5RGljdGlvbmFyeShiaW5kaW5nRGljdGlvbmFyeTEsIGJpbmRpbmdEaWN0aW9uYXJ5KTtcbiAgICAgICAgY29weURpY3Rpb25hcnkoYmluZGluZ0RpY3Rpb25hcnkyLCBiaW5kaW5nRGljdGlvbmFyeSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtb2R1bGVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBtb2R1bGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdldEhlbHBlcnMgPSB0aGlzLl9nZXRDb250YWluZXJNb2R1bGVIZWxwZXJzRmFjdG9yeSgpO1xuICAgICAgICBmb3IgKHZhciBfYSA9IDAsIG1vZHVsZXNfMSA9IG1vZHVsZXM7IF9hIDwgbW9kdWxlc18xLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRNb2R1bGUgPSBtb2R1bGVzXzFbX2FdO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMgPSBnZXRIZWxwZXJzKGN1cnJlbnRNb2R1bGUuaWQpO1xuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5yZWdpc3RyeShjb250YWluZXJNb2R1bGVIZWxwZXJzLmJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy51bmJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5pc2JvdW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMucmViaW5kRnVuY3Rpb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmxvYWRBc3luYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1vZHVsZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG1vZHVsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZ2V0SGVscGVycywgX2EsIG1vZHVsZXNfMiwgY3VycmVudE1vZHVsZSwgY29udGFpbmVyTW9kdWxlSGVscGVycztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEhlbHBlcnMgPSB0aGlzLl9nZXRDb250YWluZXJNb2R1bGVIZWxwZXJzRmFjdG9yeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSAwLCBtb2R1bGVzXzIgPSBtb2R1bGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShfYSA8IG1vZHVsZXNfMi5sZW5ndGgpKSByZXR1cm4gWzMsIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE1vZHVsZSA9IG1vZHVsZXNfMltfYV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJNb2R1bGVIZWxwZXJzID0gZ2V0SGVscGVycyhjdXJyZW50TW9kdWxlLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgY3VycmVudE1vZHVsZS5yZWdpc3RyeShjb250YWluZXJNb2R1bGVIZWxwZXJzLmJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy51bmJpbmRGdW5jdGlvbiwgY29udGFpbmVyTW9kdWxlSGVscGVycy5pc2JvdW5kRnVuY3Rpb24sIGNvbnRhaW5lck1vZHVsZUhlbHBlcnMucmViaW5kRnVuY3Rpb24pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbW9kdWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbW9kdWxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb25kaXRpb25GYWN0b3J5ID0gZnVuY3Rpb24gKGV4cGVjdGVkKSB7IHJldHVybiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubW9kdWxlSWQgPT09IGV4cGVjdGVkO1xuICAgICAgICB9OyB9O1xuICAgICAgICBtb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgICAgICAgICAgdmFyIGNvbmRpdGlvbiA9IGNvbmRpdGlvbkZhY3RvcnkobW9kdWxlLmlkKTtcbiAgICAgICAgICAgIF90aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5yZW1vdmVCeUNvbmRpdGlvbihjb25kaXRpb24pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLm9wdGlvbnMuZGVmYXVsdFNjb3BlIHx8IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudDtcbiAgICAgICAgdmFyIGJpbmRpbmcgPSBuZXcgYmluZGluZ18xLkJpbmRpbmcoc2VydmljZUlkZW50aWZpZXIsIHNjb3BlKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuYWRkKHNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5nKTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3RvX3N5bnRheF8xLkJpbmRpbmdUb1N5bnRheChiaW5kaW5nKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmViaW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHRoaXMudW5iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fYmluZGluZ0RpY3Rpb25hcnkucmVtb3ZlKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuQ0FOTk9UX1VOQklORCArIFwiIFwiICsgc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5ID0gbmV3IGxvb2t1cF8xLkxvb2t1cCgpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0JvdW5kID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHZhciBib3VuZCA9IHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5Lmhhc0tleShzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmICghYm91bmQgJiYgdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIGJvdW5kID0gdGhpcy5wYXJlbnQuaXNCb3VuZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0JvdW5kTmFtZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQm91bmRUYWdnZWQoc2VydmljZUlkZW50aWZpZXIsIE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuaXNCb3VuZFRhZ2dlZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgYm91bmQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5Lmhhc0tleShzZXJ2aWNlSWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIHZhciBiaW5kaW5ncyA9IHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LmdldChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdF8xID0gcGxhbm5lcl8xLmNyZWF0ZU1vY2tSZXF1ZXN0KHRoaXMsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGJvdW5kID0gYmluZGluZ3Muc29tZShmdW5jdGlvbiAoYikgeyByZXR1cm4gYi5jb25zdHJhaW50KHJlcXVlc3RfMSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYm91bmQgJiYgdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIGJvdW5kID0gdGhpcy5wYXJlbnQuaXNCb3VuZFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5zbmFwc2hvdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc25hcHNob3RzLnB1c2goY29udGFpbmVyX3NuYXBzaG90XzEuQ29udGFpbmVyU25hcHNob3Qub2YodGhpcy5fYmluZGluZ0RpY3Rpb25hcnkuY2xvbmUoKSwgdGhpcy5fbWlkZGxld2FyZSkpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc25hcHNob3QgPSB0aGlzLl9zbmFwc2hvdHMucG9wKCk7XG4gICAgICAgIGlmIChzbmFwc2hvdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OT19NT1JFX1NOQVBTSE9UU19BVkFJTEFCTEUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5ID0gc25hcHNob3QuYmluZGluZ3M7XG4gICAgICAgIHRoaXMuX21pZGRsZXdhcmUgPSBzbmFwc2hvdC5taWRkbGV3YXJlO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5jcmVhdGVDaGlsZCA9IGZ1bmN0aW9uIChjb250YWluZXJPcHRpb25zKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5ldyBDb250YWluZXIoY29udGFpbmVyT3B0aW9ucyB8fCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmFwcGx5TWlkZGxld2FyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1pZGRsZXdhcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBtaWRkbGV3YXJlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbml0aWFsID0gKHRoaXMuX21pZGRsZXdhcmUpID8gdGhpcy5fbWlkZGxld2FyZSA6IHRoaXMuX3BsYW5BbmRSZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuX21pZGRsZXdhcmUgPSBtaWRkbGV3YXJlcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHsgcmV0dXJuIGN1cnIocHJldik7IH0sIGluaXRpYWwpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hcHBseUN1c3RvbU1ldGFkYXRhUmVhZGVyID0gZnVuY3Rpb24gKG1ldGFkYXRhUmVhZGVyKSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhUmVhZGVyID0gbWV0YWRhdGFSZWFkZXI7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KGZhbHNlLCBmYWxzZSwgbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldFRhZ2dlZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KGZhbHNlLCBmYWxzZSwgbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldE5hbWVkID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUYWdnZWQoc2VydmljZUlkZW50aWZpZXIsIE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQodHJ1ZSwgdHJ1ZSwgbGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldEFsbFRhZ2dlZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KGZhbHNlLCB0cnVlLCBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uVmFyaWFibGUsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsTmFtZWQgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIsIG5hbWVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhZ2dlZChzZXJ2aWNlSWRlbnRpZmllciwgTUVUQURBVEFfS0VZLk5BTUVEX1RBRywgbmFtZWQpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIHRlbXBDb250YWluZXIgPSB0aGlzLmNyZWF0ZUNoaWxkKCk7XG4gICAgICAgIHRlbXBDb250YWluZXIuYmluZChjb25zdHJ1Y3RvckZ1bmN0aW9uKS50b1NlbGYoKTtcbiAgICAgICAgcmV0dXJuIHRlbXBDb250YWluZXIuZ2V0KGNvbnN0cnVjdG9yRnVuY3Rpb24pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVyTW9kdWxlSGVscGVyc0ZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzZXRNb2R1bGVJZCA9IGZ1bmN0aW9uIChiaW5kaW5nVG9TeW50YXgsIG1vZHVsZUlkKSB7XG4gICAgICAgICAgICBiaW5kaW5nVG9TeW50YXguX2JpbmRpbmcubW9kdWxlSWQgPSBtb2R1bGVJZDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldEJpbmRGdW5jdGlvbiA9IGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICAgICAgICAgIHZhciBfYmluZCA9IF90aGlzLmJpbmQuYmluZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGJpbmRpbmdUb1N5bnRheCA9IF9iaW5kKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICBzZXRNb2R1bGVJZChiaW5kaW5nVG9TeW50YXgsIG1vZHVsZUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmluZGluZ1RvU3ludGF4O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldFVuYmluZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF91bmJpbmQgPSBfdGhpcy51bmJpbmQuYmluZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgX3VuYmluZChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0SXNib3VuZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9pc0JvdW5kID0gX3RoaXMuaXNCb3VuZC5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2lzQm91bmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldFJlYmluZEZ1bmN0aW9uID0gZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZWJpbmQgPSBfdGhpcy5yZWJpbmQuYmluZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGJpbmRpbmdUb1N5bnRheCA9IF9yZWJpbmQoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHNldE1vZHVsZUlkKGJpbmRpbmdUb1N5bnRheCwgbW9kdWxlSWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nVG9TeW50YXg7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1JZCkgeyByZXR1cm4gKHtcbiAgICAgICAgICAgIGJpbmRGdW5jdGlvbjogZ2V0QmluZEZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICBpc2JvdW5kRnVuY3Rpb246IGdldElzYm91bmRGdW5jdGlvbihtSWQpLFxuICAgICAgICAgICAgcmViaW5kRnVuY3Rpb246IGdldFJlYmluZEZ1bmN0aW9uKG1JZCksXG4gICAgICAgICAgICB1bmJpbmRGdW5jdGlvbjogZ2V0VW5iaW5kRnVuY3Rpb24obUlkKVxuICAgICAgICB9KTsgfTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uIChhdm9pZENvbnN0cmFpbnRzLCBpc011bHRpSW5qZWN0LCB0YXJnZXRUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgdmFyIGRlZmF1bHRBcmdzID0ge1xuICAgICAgICAgICAgYXZvaWRDb25zdHJhaW50czogYXZvaWRDb25zdHJhaW50cyxcbiAgICAgICAgICAgIGNvbnRleHRJbnRlcmNlcHRvcjogZnVuY3Rpb24gKGNvbnRleHQpIHsgcmV0dXJuIGNvbnRleHQ7IH0sXG4gICAgICAgICAgICBpc011bHRpSW5qZWN0OiBpc011bHRpSW5qZWN0LFxuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBzZXJ2aWNlSWRlbnRpZmllcjogc2VydmljZUlkZW50aWZpZXIsXG4gICAgICAgICAgICB0YXJnZXRUeXBlOiB0YXJnZXRUeXBlLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9taWRkbGV3YXJlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9taWRkbGV3YXJlKGRlZmF1bHRBcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCB8fCByZXN1bHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX01JRERMRVdBUkVfUkVUVVJOKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3BsYW5BbmRSZXNvbHZlKCkoZGVmYXVsdEFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9wbGFuQW5kUmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHBsYW5uZXJfMS5wbGFuKF90aGlzLl9tZXRhZGF0YVJlYWRlciwgX3RoaXMsIGFyZ3MuaXNNdWx0aUluamVjdCwgYXJncy50YXJnZXRUeXBlLCBhcmdzLnNlcnZpY2VJZGVudGlmaWVyLCBhcmdzLmtleSwgYXJncy52YWx1ZSwgYXJncy5hdm9pZENvbnN0cmFpbnRzKTtcbiAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzLmNvbnRleHRJbnRlcmNlcHRvcihjb250ZXh0KTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXNvbHZlcl8xLnJlc29sdmUoY29udGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0oKSk7XG5leHBvcnRzLkNvbnRhaW5lciA9IENvbnRhaW5lcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgQ29udGFpbmVyTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250YWluZXJNb2R1bGUocmVnaXN0cnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICAgIH1cbiAgICByZXR1cm4gQ29udGFpbmVyTW9kdWxlO1xufSgpKTtcbmV4cG9ydHMuQ29udGFpbmVyTW9kdWxlID0gQ29udGFpbmVyTW9kdWxlO1xudmFyIEFzeW5jQ29udGFpbmVyTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0NvbnRhaW5lck1vZHVsZShyZWdpc3RyeSkge1xuICAgICAgICB0aGlzLmlkID0gaWRfMS5pZCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gcmVnaXN0cnk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0NvbnRhaW5lck1vZHVsZTtcbn0oKSk7XG5leHBvcnRzLkFzeW5jQ29udGFpbmVyTW9kdWxlID0gQXN5bmNDb250YWluZXJNb2R1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDb250YWluZXJTbmFwc2hvdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyU25hcHNob3QoKSB7XG4gICAgfVxuICAgIENvbnRhaW5lclNuYXBzaG90Lm9mID0gZnVuY3Rpb24gKGJpbmRpbmdzLCBtaWRkbGV3YXJlKSB7XG4gICAgICAgIHZhciBzbmFwc2hvdCA9IG5ldyBDb250YWluZXJTbmFwc2hvdCgpO1xuICAgICAgICBzbmFwc2hvdC5iaW5kaW5ncyA9IGJpbmRpbmdzO1xuICAgICAgICBzbmFwc2hvdC5taWRkbGV3YXJlID0gbWlkZGxld2FyZTtcbiAgICAgICAgcmV0dXJuIHNuYXBzaG90O1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRhaW5lclNuYXBzaG90O1xufSgpKTtcbmV4cG9ydHMuQ29udGFpbmVyU25hcHNob3QgPSBDb250YWluZXJTbmFwc2hvdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEVSUk9SX01TR1MgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgTG9va3VwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb29rdXAoKSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgTG9va3VwLnByb3RvdHlwZS5nZXRNYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXA7XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSBudWxsIHx8IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9tYXAuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKGVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVudHJ5LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fbWFwLnNldChzZXJ2aWNlSWRlbnRpZmllciwgZW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwLnNldChzZXJ2aWNlSWRlbnRpZmllciwgW3ZhbHVlXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciA9PT0gbnVsbCB8fCBzZXJ2aWNlSWRlbnRpZmllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5OVUxMX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9tYXAuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKGVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLktFWV9OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMb29rdXAucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgICAgICBpZiAoc2VydmljZUlkZW50aWZpZXIgPT09IG51bGwgfHwgc2VydmljZUlkZW50aWZpZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuTlVMTF9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9tYXAuZGVsZXRlKHNlcnZpY2VJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuS0VZX05PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUucmVtb3ZlQnlDb25kaXRpb24gPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyaWVzLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gIWNvbmRpdGlvbihlbnRyeSk7IH0pO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZWRFbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fbWFwLnNldChrZXksIHVwZGF0ZWRFbnRyaWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLl9tYXAuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5oYXNLZXkgPSBmdW5jdGlvbiAoc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VJZGVudGlmaWVyID09PSBudWxsIHx8IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLk5VTExfQVJHVU1FTlQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuaGFzKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3B5ID0gbmV3IExvb2t1cCgpO1xuICAgICAgICB0aGlzLl9tYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoYikgeyByZXR1cm4gY29weS5hZGQoa2V5LCBiLmNsb25lKCkpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS50cmF2ZXJzZSA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIHRoaXMuX21hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBmdW5jKGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBMb29rdXA7XG59KCkpO1xuZXhwb3J0cy5Mb29rdXAgPSBMb29rdXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBrZXlzID0gcmVxdWlyZShcIi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG5leHBvcnRzLk1FVEFEQVRBX0tFWSA9IGtleXM7XG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXIvY29udGFpbmVyXCIpO1xuZXhwb3J0cy5Db250YWluZXIgPSBjb250YWluZXJfMS5Db250YWluZXI7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG5leHBvcnRzLkJpbmRpbmdTY29wZUVudW0gPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1Njb3BlRW51bTtcbmV4cG9ydHMuQmluZGluZ1R5cGVFbnVtID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bTtcbmV4cG9ydHMuVGFyZ2V0VHlwZUVudW0gPSBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW07XG52YXIgY29udGFpbmVyX21vZHVsZV8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyL2NvbnRhaW5lcl9tb2R1bGVcIik7XG5leHBvcnRzLkFzeW5jQ29udGFpbmVyTW9kdWxlID0gY29udGFpbmVyX21vZHVsZV8xLkFzeW5jQ29udGFpbmVyTW9kdWxlO1xuZXhwb3J0cy5Db250YWluZXJNb2R1bGUgPSBjb250YWluZXJfbW9kdWxlXzEuQ29udGFpbmVyTW9kdWxlO1xudmFyIGluamVjdGFibGVfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vaW5qZWN0YWJsZVwiKTtcbmV4cG9ydHMuaW5qZWN0YWJsZSA9IGluamVjdGFibGVfMS5pbmplY3RhYmxlO1xudmFyIHRhZ2dlZF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi90YWdnZWRcIik7XG5leHBvcnRzLnRhZ2dlZCA9IHRhZ2dlZF8xLnRhZ2dlZDtcbnZhciBuYW1lZF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9uYW1lZFwiKTtcbmV4cG9ydHMubmFtZWQgPSBuYW1lZF8xLm5hbWVkO1xudmFyIGluamVjdF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9pbmplY3RcIik7XG5leHBvcnRzLmluamVjdCA9IGluamVjdF8xLmluamVjdDtcbmV4cG9ydHMuTGF6eVNlcnZpY2VJZGVudGlmZXIgPSBpbmplY3RfMS5MYXp5U2VydmljZUlkZW50aWZlcjtcbnZhciBvcHRpb25hbF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9vcHRpb25hbFwiKTtcbmV4cG9ydHMub3B0aW9uYWwgPSBvcHRpb25hbF8xLm9wdGlvbmFsO1xudmFyIHVubWFuYWdlZF8xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi91bm1hbmFnZWRcIik7XG5leHBvcnRzLnVubWFuYWdlZCA9IHVubWFuYWdlZF8xLnVubWFuYWdlZDtcbnZhciBtdWx0aV9pbmplY3RfMSA9IHJlcXVpcmUoXCIuL2Fubm90YXRpb24vbXVsdGlfaW5qZWN0XCIpO1xuZXhwb3J0cy5tdWx0aUluamVjdCA9IG11bHRpX2luamVjdF8xLm11bHRpSW5qZWN0O1xudmFyIHRhcmdldF9uYW1lXzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL3RhcmdldF9uYW1lXCIpO1xuZXhwb3J0cy50YXJnZXROYW1lID0gdGFyZ2V0X25hbWVfMS50YXJnZXROYW1lO1xudmFyIHBvc3RfY29uc3RydWN0XzEgPSByZXF1aXJlKFwiLi9hbm5vdGF0aW9uL3Bvc3RfY29uc3RydWN0XCIpO1xuZXhwb3J0cy5wb3N0Q29uc3RydWN0ID0gcG9zdF9jb25zdHJ1Y3RfMS5wb3N0Q29uc3RydWN0O1xudmFyIG1ldGFkYXRhX3JlYWRlcl8xID0gcmVxdWlyZShcIi4vcGxhbm5pbmcvbWV0YWRhdGFfcmVhZGVyXCIpO1xuZXhwb3J0cy5NZXRhZGF0YVJlYWRlciA9IG1ldGFkYXRhX3JlYWRlcl8xLk1ldGFkYXRhUmVhZGVyO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi91dGlscy9pZFwiKTtcbmV4cG9ydHMuaWQgPSBpZF8xLmlkO1xudmFyIGRlY29yYXRvcl91dGlsc18xID0gcmVxdWlyZShcIi4vYW5ub3RhdGlvbi9kZWNvcmF0b3JfdXRpbHNcIik7XG5leHBvcnRzLmRlY29yYXRlID0gZGVjb3JhdG9yX3V0aWxzXzEuZGVjb3JhdGU7XG52YXIgY29uc3RyYWludF9oZWxwZXJzXzEgPSByZXF1aXJlKFwiLi9zeW50YXgvY29uc3RyYWludF9oZWxwZXJzXCIpO1xuZXhwb3J0cy50cmF2ZXJzZUFuY2Vyc3RvcnMgPSBjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnM7XG5leHBvcnRzLnRhZ2dlZENvbnN0cmFpbnQgPSBjb25zdHJhaW50X2hlbHBlcnNfMS50YWdnZWRDb25zdHJhaW50O1xuZXhwb3J0cy5uYW1lZENvbnN0cmFpbnQgPSBjb25zdHJhaW50X2hlbHBlcnNfMS5uYW1lZENvbnN0cmFpbnQ7XG5leHBvcnRzLnR5cGVDb25zdHJhaW50ID0gY29uc3RyYWludF9oZWxwZXJzXzEudHlwZUNvbnN0cmFpbnQ7XG52YXIgc2VyaWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4vdXRpbHMvc2VyaWFsaXphdGlvblwiKTtcbmV4cG9ydHMuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyA9IHNlcmlhbGl6YXRpb25fMS5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nO1xudmFyIGJpbmRpbmdfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2JpbmRpbmdfdXRpbHNcIik7XG5leHBvcnRzLm11bHRpQmluZFRvU2VydmljZSA9IGJpbmRpbmdfdXRpbHNfMS5tdWx0aUJpbmRUb1NlcnZpY2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpZF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2lkXCIpO1xudmFyIENvbnRleHQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHQoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZF8xLmlkKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cbiAgICBDb250ZXh0LnByb3RvdHlwZS5hZGRQbGFuID0gZnVuY3Rpb24gKHBsYW4pIHtcbiAgICAgICAgdGhpcy5wbGFuID0gcGxhbjtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnNldEN1cnJlbnRSZXF1ZXN0ID0gZnVuY3Rpb24gKGN1cnJlbnRSZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFJlcXVlc3QgPSBjdXJyZW50UmVxdWVzdDtcbiAgICB9O1xuICAgIHJldHVybiBDb250ZXh0O1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dCA9IENvbnRleHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgTWV0YWRhdGEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1ldGFkYXRhKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgTWV0YWRhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5rZXkgPT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm5hbWVkOiBcIiArIHRoaXMudmFsdWUudG9TdHJpbmcoKSArIFwiIFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwidGFnZ2VkOiB7IGtleTpcIiArIHRoaXMua2V5LnRvU3RyaW5nKCkgKyBcIiwgdmFsdWU6IFwiICsgdGhpcy52YWx1ZSArIFwiIH1cIjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE1ldGFkYXRhO1xufSgpKTtcbmV4cG9ydHMuTWV0YWRhdGEgPSBNZXRhZGF0YTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbnZhciBNZXRhZGF0YVJlYWRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWV0YWRhdGFSZWFkZXIoKSB7XG4gICAgfVxuICAgIE1ldGFkYXRhUmVhZGVyLnByb3RvdHlwZS5nZXRDb25zdHJ1Y3Rvck1ldGFkYXRhID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yRnVuYykge1xuICAgICAgICB2YXIgY29tcGlsZXJHZW5lcmF0ZWRNZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUQURBVEFfS0VZLlBBUkFNX1RZUEVTLCBjb25zdHJ1Y3RvckZ1bmMpO1xuICAgICAgICB2YXIgdXNlckdlbmVyYXRlZE1ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuVEFHR0VELCBjb25zdHJ1Y3RvckZ1bmMpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tcGlsZXJHZW5lcmF0ZWRNZXRhZGF0YTogY29tcGlsZXJHZW5lcmF0ZWRNZXRhZGF0YSxcbiAgICAgICAgICAgIHVzZXJHZW5lcmF0ZWRNZXRhZGF0YTogdXNlckdlbmVyYXRlZE1ldGFkYXRhIHx8IHt9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNZXRhZGF0YVJlYWRlci5wcm90b3R5cGUuZ2V0UHJvcGVydGllc01ldGFkYXRhID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yRnVuYykge1xuICAgICAgICB2YXIgdXNlckdlbmVyYXRlZE1ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNRVRBREFUQV9LRVkuVEFHR0VEX1BST1AsIGNvbnN0cnVjdG9yRnVuYykgfHwgW107XG4gICAgICAgIHJldHVybiB1c2VyR2VuZXJhdGVkTWV0YWRhdGE7XG4gICAgfTtcbiAgICByZXR1cm4gTWV0YWRhdGFSZWFkZXI7XG59KCkpO1xuZXhwb3J0cy5NZXRhZGF0YVJlYWRlciA9IE1ldGFkYXRhUmVhZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUGxhbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGxhbihwYXJlbnRDb250ZXh0LCByb290UmVxdWVzdCkge1xuICAgICAgICB0aGlzLnBhcmVudENvbnRleHQgPSBwYXJlbnRDb250ZXh0O1xuICAgICAgICB0aGlzLnJvb3RSZXF1ZXN0ID0gcm9vdFJlcXVlc3Q7XG4gICAgfVxuICAgIHJldHVybiBQbGFuO1xufSgpKTtcbmV4cG9ydHMuUGxhbiA9IFBsYW47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBiaW5kaW5nX2NvdW50XzEgPSByZXF1aXJlKFwiLi4vYmluZGluZ3MvYmluZGluZ19jb3VudFwiKTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgZXhjZXB0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIik7XG52YXIgc2VyaWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlcmlhbGl6YXRpb25cIik7XG52YXIgY29udGV4dF8xID0gcmVxdWlyZShcIi4vY29udGV4dFwiKTtcbnZhciBtZXRhZGF0YV8xID0gcmVxdWlyZShcIi4vbWV0YWRhdGFcIik7XG52YXIgcGxhbl8xID0gcmVxdWlyZShcIi4vcGxhblwiKTtcbnZhciByZWZsZWN0aW9uX3V0aWxzXzEgPSByZXF1aXJlKFwiLi9yZWZsZWN0aW9uX3V0aWxzXCIpO1xudmFyIHJlcXVlc3RfMSA9IHJlcXVpcmUoXCIuL3JlcXVlc3RcIik7XG52YXIgdGFyZ2V0XzEgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XG5mdW5jdGlvbiBnZXRCaW5kaW5nRGljdGlvbmFyeShjbnRucikge1xuICAgIHJldHVybiBjbnRuci5fYmluZGluZ0RpY3Rpb25hcnk7XG59XG5leHBvcnRzLmdldEJpbmRpbmdEaWN0aW9uYXJ5ID0gZ2V0QmluZGluZ0RpY3Rpb25hcnk7XG5mdW5jdGlvbiBfY3JlYXRlVGFyZ2V0KGlzTXVsdGlJbmplY3QsIHRhcmdldFR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBuYW1lLCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIG1ldGFkYXRhS2V5ID0gaXNNdWx0aUluamVjdCA/IE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHIDogTUVUQURBVEFfS0VZLklOSkVDVF9UQUc7XG4gICAgdmFyIGluamVjdE1ldGFkYXRhID0gbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEobWV0YWRhdGFLZXksIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB2YXIgdGFyZ2V0ID0gbmV3IHRhcmdldF8xLlRhcmdldCh0YXJnZXRUeXBlLCBuYW1lLCBzZXJ2aWNlSWRlbnRpZmllciwgaW5qZWN0TWV0YWRhdGEpO1xuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgdGFnTWV0YWRhdGEgPSBuZXcgbWV0YWRhdGFfMS5NZXRhZGF0YShrZXksIHZhbHVlKTtcbiAgICAgICAgdGFyZ2V0Lm1ldGFkYXRhLnB1c2godGFnTWV0YWRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gX2dldEFjdGl2ZUJpbmRpbmdzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBjb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCB0YXJnZXQpIHtcbiAgICB2YXIgYmluZGluZ3MgPSBnZXRCaW5kaW5ncyhjb250ZXh0LmNvbnRhaW5lciwgdGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB2YXIgYWN0aXZlQmluZGluZ3MgPSBbXTtcbiAgICBpZiAoYmluZGluZ3MubGVuZ3RoID09PSBiaW5kaW5nX2NvdW50XzEuQmluZGluZ0NvdW50Lk5vQmluZGluZ3NBdmFpbGFibGUgJiZcbiAgICAgICAgY29udGV4dC5jb250YWluZXIub3B0aW9ucy5hdXRvQmluZEluamVjdGFibGUgJiZcbiAgICAgICAgdHlwZW9mIHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIG1ldGFkYXRhUmVhZGVyLmdldENvbnN0cnVjdG9yTWV0YWRhdGEodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKS5jb21waWxlckdlbmVyYXRlZE1ldGFkYXRhKSB7XG4gICAgICAgIGNvbnRleHQuY29udGFpbmVyLmJpbmQodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKS50b1NlbGYoKTtcbiAgICAgICAgYmluZGluZ3MgPSBnZXRCaW5kaW5ncyhjb250ZXh0LmNvbnRhaW5lciwgdGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9XG4gICAgaWYgKCFhdm9pZENvbnN0cmFpbnRzKSB7XG4gICAgICAgIGFjdGl2ZUJpbmRpbmdzID0gYmluZGluZ3MuZmlsdGVyKGZ1bmN0aW9uIChiaW5kaW5nKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyByZXF1ZXN0XzEuUmVxdWVzdChiaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCBiaW5kaW5nLCB0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmcuY29uc3RyYWludChyZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IGJpbmRpbmdzO1xuICAgIH1cbiAgICBfdmFsaWRhdGVBY3RpdmVCaW5kaW5nQ291bnQodGFyZ2V0LnNlcnZpY2VJZGVudGlmaWVyLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0LCBjb250ZXh0LmNvbnRhaW5lcik7XG4gICAgcmV0dXJuIGFjdGl2ZUJpbmRpbmdzO1xufVxuZnVuY3Rpb24gX3ZhbGlkYXRlQWN0aXZlQmluZGluZ0NvdW50KHNlcnZpY2VJZGVudGlmaWVyLCBiaW5kaW5ncywgdGFyZ2V0LCBjb250YWluZXIpIHtcbiAgICBzd2l0Y2ggKGJpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIGJpbmRpbmdfY291bnRfMS5CaW5kaW5nQ291bnQuTm9CaW5kaW5nc0F2YWlsYWJsZTpcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaXNPcHRpb25hbCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nID0gc2VyaWFsaXphdGlvbl8xLmdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmcoc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLk5PVF9SRUdJU1RFUkVEO1xuICAgICAgICAgICAgICAgIG1zZyArPSBzZXJpYWxpemF0aW9uXzEubGlzdE1ldGFkYXRhRm9yVGFyZ2V0KHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIG1zZyArPSBzZXJpYWxpemF0aW9uXzEubGlzdFJlZ2lzdGVyZWRCaW5kaW5nc0ZvclNlcnZpY2VJZGVudGlmaWVyKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIGdldEJpbmRpbmdzKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBiaW5kaW5nX2NvdW50XzEuQmluZGluZ0NvdW50Lk9ubHlPbmVCaW5kaW5nQXZhaWxhYmxlOlxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaXNBcnJheSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIGJpbmRpbmdfY291bnRfMS5CaW5kaW5nQ291bnQuTXVsdGlwbGVCaW5kaW5nc0F2YWlsYWJsZTpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmlzQXJyYXkoKSkge1xuICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllclN0cmluZyA9IHNlcmlhbGl6YXRpb25fMS5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gRVJST1JfTVNHUy5BTUJJR1VPVVNfTUFUQ0ggKyBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nO1xuICAgICAgICAgICAgICAgIG1zZyArPSBzZXJpYWxpemF0aW9uXzEubGlzdFJlZ2lzdGVyZWRCaW5kaW5nc0ZvclNlcnZpY2VJZGVudGlmaWVyKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXJTdHJpbmcsIGdldEJpbmRpbmdzKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5ncztcbiAgICAgICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfY3JlYXRlU3ViUmVxdWVzdHMobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIHNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBwYXJlbnRSZXF1ZXN0LCB0YXJnZXQpIHtcbiAgICB2YXIgYWN0aXZlQmluZGluZ3M7XG4gICAgdmFyIGNoaWxkUmVxdWVzdDtcbiAgICBpZiAocGFyZW50UmVxdWVzdCA9PT0gbnVsbCkge1xuICAgICAgICBhY3RpdmVCaW5kaW5ncyA9IF9nZXRBY3RpdmVCaW5kaW5ncyhtZXRhZGF0YVJlYWRlciwgYXZvaWRDb25zdHJhaW50cywgY29udGV4dCwgbnVsbCwgdGFyZ2V0KTtcbiAgICAgICAgY2hpbGRSZXF1ZXN0ID0gbmV3IHJlcXVlc3RfMS5SZXF1ZXN0KHNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBudWxsLCBhY3RpdmVCaW5kaW5ncywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIHRoZVBsYW4gPSBuZXcgcGxhbl8xLlBsYW4oY29udGV4dCwgY2hpbGRSZXF1ZXN0KTtcbiAgICAgICAgY29udGV4dC5hZGRQbGFuKHRoZVBsYW4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWN0aXZlQmluZGluZ3MgPSBfZ2V0QWN0aXZlQmluZGluZ3MobWV0YWRhdGFSZWFkZXIsIGF2b2lkQ29uc3RyYWludHMsIGNvbnRleHQsIHBhcmVudFJlcXVlc3QsIHRhcmdldCk7XG4gICAgICAgIGNoaWxkUmVxdWVzdCA9IHBhcmVudFJlcXVlc3QuYWRkQ2hpbGRSZXF1ZXN0KHRhcmdldC5zZXJ2aWNlSWRlbnRpZmllciwgYWN0aXZlQmluZGluZ3MsIHRhcmdldCk7XG4gICAgfVxuICAgIGFjdGl2ZUJpbmRpbmdzLmZvckVhY2goZnVuY3Rpb24gKGJpbmRpbmcpIHtcbiAgICAgICAgdmFyIHN1YkNoaWxkUmVxdWVzdCA9IG51bGw7XG4gICAgICAgIGlmICh0YXJnZXQuaXNBcnJheSgpKSB7XG4gICAgICAgICAgICBzdWJDaGlsZFJlcXVlc3QgPSBjaGlsZFJlcXVlc3QuYWRkQ2hpbGRSZXF1ZXN0KGJpbmRpbmcuc2VydmljZUlkZW50aWZpZXIsIGJpbmRpbmcsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5jYWNoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YkNoaWxkUmVxdWVzdCA9IGNoaWxkUmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmluZGluZy50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkluc3RhbmNlICYmIGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZGVwZW5kZW5jaWVzID0gcmVmbGVjdGlvbl91dGlsc18xLmdldERlcGVuZGVuY2llcyhtZXRhZGF0YVJlYWRlciwgYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgaWYgKCFjb250ZXh0LmNvbnRhaW5lci5vcHRpb25zLnNraXBCYXNlQ2xhc3NDaGVja3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50ID0gcmVmbGVjdGlvbl91dGlsc18xLmdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudChtZXRhZGF0YVJlYWRlciwgYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChkZXBlbmRlbmNpZXMubGVuZ3RoIDwgYmFzZUNsYXNzRGVwZW5kZW5jeUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IEVSUk9SX01TR1MuQVJHVU1FTlRTX0xFTkdUSF9NSVNNQVRDSChyZWZsZWN0aW9uX3V0aWxzXzEuZ2V0RnVuY3Rpb25OYW1lKGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goZnVuY3Rpb24gKGRlcGVuZGVuY3kpIHtcbiAgICAgICAgICAgICAgICBfY3JlYXRlU3ViUmVxdWVzdHMobWV0YWRhdGFSZWFkZXIsIGZhbHNlLCBkZXBlbmRlbmN5LnNlcnZpY2VJZGVudGlmaWVyLCBjb250ZXh0LCBzdWJDaGlsZFJlcXVlc3QsIGRlcGVuZGVuY3kpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldEJpbmRpbmdzKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICB2YXIgYmluZGluZ3MgPSBbXTtcbiAgICB2YXIgYmluZGluZ0RpY3Rpb25hcnkgPSBnZXRCaW5kaW5nRGljdGlvbmFyeShjb250YWluZXIpO1xuICAgIGlmIChiaW5kaW5nRGljdGlvbmFyeS5oYXNLZXkoc2VydmljZUlkZW50aWZpZXIpKSB7XG4gICAgICAgIGJpbmRpbmdzID0gYmluZGluZ0RpY3Rpb25hcnkuZ2V0KHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29udGFpbmVyLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBiaW5kaW5ncyA9IGdldEJpbmRpbmdzKGNvbnRhaW5lci5wYXJlbnQsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGJpbmRpbmdzO1xufVxuZnVuY3Rpb24gcGxhbihtZXRhZGF0YVJlYWRlciwgY29udGFpbmVyLCBpc011bHRpSW5qZWN0LCB0YXJnZXRUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwga2V5LCB2YWx1ZSwgYXZvaWRDb25zdHJhaW50cykge1xuICAgIGlmIChhdm9pZENvbnN0cmFpbnRzID09PSB2b2lkIDApIHsgYXZvaWRDb25zdHJhaW50cyA9IGZhbHNlOyB9XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgY29udGV4dF8xLkNvbnRleHQoY29udGFpbmVyKTtcbiAgICB2YXIgdGFyZ2V0ID0gX2NyZWF0ZVRhcmdldChpc011bHRpSW5qZWN0LCB0YXJnZXRUeXBlLCBzZXJ2aWNlSWRlbnRpZmllciwgXCJcIiwga2V5LCB2YWx1ZSk7XG4gICAgdHJ5IHtcbiAgICAgICAgX2NyZWF0ZVN1YlJlcXVlc3RzKG1ldGFkYXRhUmVhZGVyLCBhdm9pZENvbnN0cmFpbnRzLCBzZXJ2aWNlSWRlbnRpZmllciwgY29udGV4dCwgbnVsbCwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXhjZXB0aW9uc18xLmlzU3RhY2tPdmVyZmxvd0V4ZXB0aW9uKGVycm9yKSkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQucGxhbikge1xuICAgICAgICAgICAgICAgIHNlcmlhbGl6YXRpb25fMS5jaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbihjb250ZXh0LnBsYW4ucm9vdFJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbn1cbmV4cG9ydHMucGxhbiA9IHBsYW47XG5mdW5jdGlvbiBjcmVhdGVNb2NrUmVxdWVzdChjb250YWluZXIsIHNlcnZpY2VJZGVudGlmaWVyLCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIHRhcmdldCA9IG5ldyB0YXJnZXRfMS5UYXJnZXQobGl0ZXJhbF90eXBlc18xLlRhcmdldFR5cGVFbnVtLlZhcmlhYmxlLCBcIlwiLCBzZXJ2aWNlSWRlbnRpZmllciwgbmV3IG1ldGFkYXRhXzEuTWV0YWRhdGEoa2V5LCB2YWx1ZSkpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IGNvbnRleHRfMS5Db250ZXh0KGNvbnRhaW5lcik7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgcmVxdWVzdF8xLlJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIGNvbnRleHQsIG51bGwsIFtdLCB0YXJnZXQpO1xuICAgIHJldHVybiByZXF1ZXN0O1xufVxuZXhwb3J0cy5jcmVhdGVNb2NrUmVxdWVzdCA9IGNyZWF0ZU1vY2tSZXF1ZXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUXVlcnlhYmxlU3RyaW5nID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRdWVyeWFibGVTdHJpbmcoc3RyKSB7XG4gICAgICAgIHRoaXMuc3RyID0gc3RyO1xuICAgIH1cbiAgICBRdWVyeWFibGVTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ci5pbmRleE9mKHNlYXJjaFN0cmluZykgPT09IDA7XG4gICAgfTtcbiAgICBRdWVyeWFibGVTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZykge1xuICAgICAgICB2YXIgcmV2ZXJzZVN0cmluZyA9IFwiXCI7XG4gICAgICAgIHZhciByZXZlcnNlU2VhcmNoU3RyaW5nID0gc2VhcmNoU3RyaW5nLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgICAgICByZXZlcnNlU3RyaW5nID0gdGhpcy5zdHIuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0c1dpdGguY2FsbCh7IHN0cjogcmV2ZXJzZVN0cmluZyB9LCByZXZlcnNlU2VhcmNoU3RyaW5nKTtcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5zdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcpICE9PSAtMSk7XG4gICAgfTtcbiAgICBRdWVyeWFibGVTdHJpbmcucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChjb21wYXJlU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ciA9PT0gY29tcGFyZVN0cmluZztcbiAgICB9O1xuICAgIFF1ZXJ5YWJsZVN0cmluZy5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9O1xuICAgIHJldHVybiBRdWVyeWFibGVTdHJpbmc7XG59KCkpO1xuZXhwb3J0cy5RdWVyeWFibGVTdHJpbmcgPSBRdWVyeWFibGVTdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbmplY3RfMSA9IHJlcXVpcmUoXCIuLi9hbm5vdGF0aW9uL2luamVjdFwiKTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgc2VyaWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlcmlhbGl6YXRpb25cIik7XG5leHBvcnRzLmdldEZ1bmN0aW9uTmFtZSA9IHNlcmlhbGl6YXRpb25fMS5nZXRGdW5jdGlvbk5hbWU7XG52YXIgdGFyZ2V0XzEgPSByZXF1aXJlKFwiLi90YXJnZXRcIik7XG5mdW5jdGlvbiBnZXREZXBlbmRlbmNpZXMobWV0YWRhdGFSZWFkZXIsIGZ1bmMpIHtcbiAgICB2YXIgY29uc3RydWN0b3JOYW1lID0gc2VyaWFsaXphdGlvbl8xLmdldEZ1bmN0aW9uTmFtZShmdW5jKTtcbiAgICB2YXIgdGFyZ2V0cyA9IGdldFRhcmdldHMobWV0YWRhdGFSZWFkZXIsIGNvbnN0cnVjdG9yTmFtZSwgZnVuYywgZmFsc2UpO1xuICAgIHJldHVybiB0YXJnZXRzO1xufVxuZXhwb3J0cy5nZXREZXBlbmRlbmNpZXMgPSBnZXREZXBlbmRlbmNpZXM7XG5mdW5jdGlvbiBnZXRUYXJnZXRzKG1ldGFkYXRhUmVhZGVyLCBjb25zdHJ1Y3Rvck5hbWUsIGZ1bmMsIGlzQmFzZUNsYXNzKSB7XG4gICAgdmFyIG1ldGFkYXRhID0gbWV0YWRhdGFSZWFkZXIuZ2V0Q29uc3RydWN0b3JNZXRhZGF0YShmdW5jKTtcbiAgICB2YXIgc2VydmljZUlkZW50aWZpZXJzID0gbWV0YWRhdGEuY29tcGlsZXJHZW5lcmF0ZWRNZXRhZGF0YTtcbiAgICBpZiAoc2VydmljZUlkZW50aWZpZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG1zZyA9IEVSUk9SX01TR1MuTUlTU0lOR19JTkpFQ1RBQkxFX0FOTk9UQVRJT04gKyBcIiBcIiArIGNvbnN0cnVjdG9yTmFtZSArIFwiLlwiO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG4gICAgdmFyIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhID0gbWV0YWRhdGEudXNlckdlbmVyYXRlZE1ldGFkYXRhO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoY29uc3RydWN0b3JBcmdzTWV0YWRhdGEpO1xuICAgIHZhciBoYXNVc2VyRGVjbGFyZWRVbmtub3duSW5qZWN0aW9ucyA9IChmdW5jLmxlbmd0aCA9PT0gMCAmJiBrZXlzLmxlbmd0aCA+IDApO1xuICAgIHZhciBpdGVyYXRpb25zID0gKGhhc1VzZXJEZWNsYXJlZFVua25vd25JbmplY3Rpb25zKSA/IGtleXMubGVuZ3RoIDogZnVuYy5sZW5ndGg7XG4gICAgdmFyIGNvbnN0cnVjdG9yVGFyZ2V0cyA9IGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0cyhpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhLCBpdGVyYXRpb25zKTtcbiAgICB2YXIgcHJvcGVydHlUYXJnZXRzID0gZ2V0Q2xhc3NQcm9wc0FzVGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgZnVuYyk7XG4gICAgdmFyIHRhcmdldHMgPSBjb25zdHJ1Y3RvclRhcmdldHMuY29uY2F0KHByb3BlcnR5VGFyZ2V0cyk7XG4gICAgcmV0dXJuIHRhcmdldHM7XG59XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvckFyZ3NBc1RhcmdldChpbmRleCwgaXNCYXNlQ2xhc3MsIGNvbnN0cnVjdG9yTmFtZSwgc2VydmljZUlkZW50aWZpZXJzLCBjb25zdHJ1Y3RvckFyZ3NNZXRhZGF0YSkge1xuICAgIHZhciB0YXJnZXRNZXRhZGF0YSA9IGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhW2luZGV4LnRvU3RyaW5nKCldIHx8IFtdO1xuICAgIHZhciBtZXRhZGF0YSA9IGZvcm1hdFRhcmdldE1ldGFkYXRhKHRhcmdldE1ldGFkYXRhKTtcbiAgICB2YXIgaXNNYW5hZ2VkID0gbWV0YWRhdGEudW5tYW5hZ2VkICE9PSB0cnVlO1xuICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyc1tpbmRleF07XG4gICAgdmFyIGluamVjdElkZW50aWZpZXIgPSAobWV0YWRhdGEuaW5qZWN0IHx8IG1ldGFkYXRhLm11bHRpSW5qZWN0KTtcbiAgICBzZXJ2aWNlSWRlbnRpZmllciA9IChpbmplY3RJZGVudGlmaWVyKSA/IChpbmplY3RJZGVudGlmaWVyKSA6IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgIGlmIChzZXJ2aWNlSWRlbnRpZmllciBpbnN0YW5jZW9mIGluamVjdF8xLkxhenlTZXJ2aWNlSWRlbnRpZmVyKSB7XG4gICAgICAgIHNlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXIudW53cmFwKCk7XG4gICAgfVxuICAgIGlmIChpc01hbmFnZWQpIHtcbiAgICAgICAgdmFyIGlzT2JqZWN0ID0gc2VydmljZUlkZW50aWZpZXIgPT09IE9iamVjdDtcbiAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSBzZXJ2aWNlSWRlbnRpZmllciA9PT0gRnVuY3Rpb247XG4gICAgICAgIHZhciBpc1VuZGVmaW5lZCA9IHNlcnZpY2VJZGVudGlmaWVyID09PSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBpc1Vua25vd25UeXBlID0gKGlzT2JqZWN0IHx8IGlzRnVuY3Rpb24gfHwgaXNVbmRlZmluZWQpO1xuICAgICAgICBpZiAoIWlzQmFzZUNsYXNzICYmIGlzVW5rbm93blR5cGUpIHtcbiAgICAgICAgICAgIHZhciBtc2cgPSBFUlJPUl9NU0dTLk1JU1NJTkdfSU5KRUNUX0FOTk9UQVRJT04gKyBcIiBhcmd1bWVudCBcIiArIGluZGV4ICsgXCIgaW4gY2xhc3MgXCIgKyBjb25zdHJ1Y3Rvck5hbWUgKyBcIi5cIjtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0YXJnZXQgPSBuZXcgdGFyZ2V0XzEuVGFyZ2V0KGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5Db25zdHJ1Y3RvckFyZ3VtZW50LCBtZXRhZGF0YS50YXJnZXROYW1lLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHRhcmdldC5tZXRhZGF0YSA9IHRhcmdldE1ldGFkYXRhO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yQXJnc0FzVGFyZ2V0cyhpc0Jhc2VDbGFzcywgY29uc3RydWN0b3JOYW1lLCBzZXJ2aWNlSWRlbnRpZmllcnMsIGNvbnN0cnVjdG9yQXJnc01ldGFkYXRhLCBpdGVyYXRpb25zKSB7XG4gICAgdmFyIHRhcmdldHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZXJhdGlvbnM7IGkrKykge1xuICAgICAgICB2YXIgaW5kZXggPSBpO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZ2V0Q29uc3RydWN0b3JBcmdzQXNUYXJnZXQoaW5kZXgsIGlzQmFzZUNsYXNzLCBjb25zdHJ1Y3Rvck5hbWUsIHNlcnZpY2VJZGVudGlmaWVycywgY29uc3RydWN0b3JBcmdzTWV0YWRhdGEpO1xuICAgICAgICBpZiAodGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0cztcbn1cbmZ1bmN0aW9uIGdldENsYXNzUHJvcHNBc1RhcmdldHMobWV0YWRhdGFSZWFkZXIsIGNvbnN0cnVjdG9yRnVuYykge1xuICAgIHZhciBjbGFzc1Byb3BzTWV0YWRhdGEgPSBtZXRhZGF0YVJlYWRlci5nZXRQcm9wZXJ0aWVzTWV0YWRhdGEoY29uc3RydWN0b3JGdW5jKTtcbiAgICB2YXIgdGFyZ2V0cyA9IFtdO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoY2xhc3NQcm9wc01ldGFkYXRhKTtcbiAgICBmb3IgKHZhciBfaSA9IDAsIGtleXNfMSA9IGtleXM7IF9pIDwga2V5c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c18xW19pXTtcbiAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gY2xhc3NQcm9wc01ldGFkYXRhW2tleV07XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IGZvcm1hdFRhcmdldE1ldGFkYXRhKGNsYXNzUHJvcHNNZXRhZGF0YVtrZXldKTtcbiAgICAgICAgdmFyIHRhcmdldE5hbWUgPSBtZXRhZGF0YS50YXJnZXROYW1lIHx8IGtleTtcbiAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gKG1ldGFkYXRhLmluamVjdCB8fCBtZXRhZGF0YS5tdWx0aUluamVjdCk7XG4gICAgICAgIHZhciB0YXJnZXQgPSBuZXcgdGFyZ2V0XzEuVGFyZ2V0KGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5DbGFzc1Byb3BlcnR5LCB0YXJnZXROYW1lLCBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIHRhcmdldC5tZXRhZGF0YSA9IHRhcmdldE1ldGFkYXRhO1xuICAgICAgICB0YXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGJhc2VDb25zdHJ1Y3RvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjb25zdHJ1Y3RvckZ1bmMucHJvdG90eXBlKS5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoYmFzZUNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHtcbiAgICAgICAgdmFyIGJhc2VUYXJnZXRzID0gZ2V0Q2xhc3NQcm9wc0FzVGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgYmFzZUNvbnN0cnVjdG9yKTtcbiAgICAgICAgdGFyZ2V0cyA9IHRhcmdldHMuY29uY2F0KGJhc2VUYXJnZXRzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldHM7XG59XG5mdW5jdGlvbiBnZXRCYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQobWV0YWRhdGFSZWFkZXIsIGZ1bmMpIHtcbiAgICB2YXIgYmFzZUNvbnN0cnVjdG9yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGZ1bmMucHJvdG90eXBlKS5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoYmFzZUNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHtcbiAgICAgICAgdmFyIGJhc2VDb25zdHJ1Y3Rvck5hbWUgPSBzZXJpYWxpemF0aW9uXzEuZ2V0RnVuY3Rpb25OYW1lKGJhc2VDb25zdHJ1Y3Rvcik7XG4gICAgICAgIHZhciB0YXJnZXRzID0gZ2V0VGFyZ2V0cyhtZXRhZGF0YVJlYWRlciwgYmFzZUNvbnN0cnVjdG9yTmFtZSwgYmFzZUNvbnN0cnVjdG9yLCB0cnVlKTtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0gdGFyZ2V0cy5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0Lm1ldGFkYXRhLmZpbHRlcihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtLmtleSA9PT0gTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB1bm1hbmFnZWRDb3VudCA9IFtdLmNvbmNhdC5hcHBseShbXSwgbWV0YWRhdGEpLmxlbmd0aDtcbiAgICAgICAgdmFyIGRlcGVuZGVuY3lDb3VudCA9IHRhcmdldHMubGVuZ3RoIC0gdW5tYW5hZ2VkQ291bnQ7XG4gICAgICAgIGlmIChkZXBlbmRlbmN5Q291bnQgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVwZW5kZW5jeUNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdldEJhc2VDbGFzc0RlcGVuZGVuY3lDb3VudChtZXRhZGF0YVJlYWRlciwgYmFzZUNvbnN0cnVjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRCYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQgPSBnZXRCYXNlQ2xhc3NEZXBlbmRlbmN5Q291bnQ7XG5mdW5jdGlvbiBmb3JtYXRUYXJnZXRNZXRhZGF0YSh0YXJnZXRNZXRhZGF0YSkge1xuICAgIHZhciB0YXJnZXRNZXRhZGF0YU1hcCA9IHt9O1xuICAgIHRhcmdldE1ldGFkYXRhLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgdGFyZ2V0TWV0YWRhdGFNYXBbbS5rZXkudG9TdHJpbmcoKV0gPSBtLnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGluamVjdDogdGFyZ2V0TWV0YWRhdGFNYXBbTUVUQURBVEFfS0VZLklOSkVDVF9UQUddLFxuICAgICAgICBtdWx0aUluamVjdDogdGFyZ2V0TWV0YWRhdGFNYXBbTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUddLFxuICAgICAgICB0YXJnZXROYW1lOiB0YXJnZXRNZXRhZGF0YU1hcFtNRVRBREFUQV9LRVkuTkFNRV9UQUddLFxuICAgICAgICB1bm1hbmFnZWQ6IHRhcmdldE1ldGFkYXRhTWFwW01FVEFEQVRBX0tFWS5VTk1BTkFHRURfVEFHXVxuICAgIH07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpZF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2lkXCIpO1xudmFyIFJlcXVlc3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlcXVlc3Qoc2VydmljZUlkZW50aWZpZXIsIHBhcmVudENvbnRleHQsIHBhcmVudFJlcXVlc3QsIGJpbmRpbmdzLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICB0aGlzLnBhcmVudENvbnRleHQgPSBwYXJlbnRDb250ZXh0O1xuICAgICAgICB0aGlzLnBhcmVudFJlcXVlc3QgPSBwYXJlbnRSZXF1ZXN0O1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy5jaGlsZFJlcXVlc3RzID0gW107XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSAoQXJyYXkuaXNBcnJheShiaW5kaW5ncykgPyBiaW5kaW5ncyA6IFtiaW5kaW5nc10pO1xuICAgICAgICB0aGlzLnJlcXVlc3RTY29wZSA9IHBhcmVudFJlcXVlc3QgPT09IG51bGxcbiAgICAgICAgICAgID8gbmV3IE1hcCgpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuICAgIFJlcXVlc3QucHJvdG90eXBlLmFkZENoaWxkUmVxdWVzdCA9IGZ1bmN0aW9uIChzZXJ2aWNlSWRlbnRpZmllciwgYmluZGluZ3MsIHRhcmdldCkge1xuICAgICAgICB2YXIgY2hpbGQgPSBuZXcgUmVxdWVzdChzZXJ2aWNlSWRlbnRpZmllciwgdGhpcy5wYXJlbnRDb250ZXh0LCB0aGlzLCBiaW5kaW5ncywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5jaGlsZFJlcXVlc3RzLnB1c2goY2hpbGQpO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcbiAgICByZXR1cm4gUmVxdWVzdDtcbn0oKSk7XG5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUVUQURBVEFfS0VZID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9tZXRhZGF0YV9rZXlzXCIpO1xudmFyIGlkXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvaWRcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuL21ldGFkYXRhXCIpO1xudmFyIHF1ZXJ5YWJsZV9zdHJpbmdfMSA9IHJlcXVpcmUoXCIuL3F1ZXJ5YWJsZV9zdHJpbmdcIik7XG52YXIgVGFyZ2V0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUYXJnZXQodHlwZSwgbmFtZSwgc2VydmljZUlkZW50aWZpZXIsIG5hbWVkT3JUYWdnZWQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkXzEuaWQoKTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICB0aGlzLm5hbWUgPSBuZXcgcXVlcnlhYmxlX3N0cmluZ18xLlF1ZXJ5YWJsZVN0cmluZyhuYW1lIHx8IFwiXCIpO1xuICAgICAgICB0aGlzLm1ldGFkYXRhID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHZhciBtZXRhZGF0YUl0ZW0gPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIG5hbWVkT3JUYWdnZWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhSXRlbSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKE1FVEFEQVRBX0tFWS5OQU1FRF9UQUcsIG5hbWVkT3JUYWdnZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWVkT3JUYWdnZWQgaW5zdGFuY2VvZiBtZXRhZGF0YV8xLk1ldGFkYXRhKSB7XG4gICAgICAgICAgICBtZXRhZGF0YUl0ZW0gPSBuYW1lZE9yVGFnZ2VkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRhZGF0YUl0ZW0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubWV0YWRhdGEucHVzaChtZXRhZGF0YUl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFRhcmdldC5wcm90b3R5cGUuaGFzVGFnID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5tZXRhZGF0YTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBtID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKG0ua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1RhZyhNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRyk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLm1hdGNoZXNBcnJheSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoZXNUYWcoTUVUQURBVEFfS0VZLk1VTFRJX0lOSkVDVF9UQUcpKG5hbWUpO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5pc05hbWVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNUYWcoTUVUQURBVEFfS0VZLk5BTUVEX1RBRyk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzVGFnZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5zb21lKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICByZXR1cm4gKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuSU5KRUNUX1RBRykgJiZcbiAgICAgICAgICAgICAgICAobS5rZXkgIT09IE1FVEFEQVRBX0tFWS5NVUxUSV9JTkpFQ1RfVEFHKSAmJlxuICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk5BTUVfVEFHKSAmJlxuICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUcpICYmXG4gICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoZXNUYWcoTUVUQURBVEFfS0VZLk9QVElPTkFMX1RBRykodHJ1ZSk7XG4gICAgfTtcbiAgICBUYXJnZXQucHJvdG90eXBlLmdldE5hbWVkVGFnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc05hbWVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLmZpbHRlcihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5rZXkgPT09IE1FVEFEQVRBX0tFWS5OQU1FRF9UQUc7IH0pWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgVGFyZ2V0LnByb3RvdHlwZS5nZXRDdXN0b21UYWdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1RhZ2dlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5maWx0ZXIoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuSU5KRUNUX1RBRykgJiZcbiAgICAgICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTVVMVElfSU5KRUNUX1RBRykgJiZcbiAgICAgICAgICAgICAgICAgICAgKG0ua2V5ICE9PSBNRVRBREFUQV9LRVkuTkFNRV9UQUcpICYmXG4gICAgICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLlVOTUFOQUdFRF9UQUcpICYmXG4gICAgICAgICAgICAgICAgICAgIChtLmtleSAhPT0gTUVUQURBVEFfS0VZLk5BTUVEX1RBRyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUubWF0Y2hlc05hbWVkVGFnID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlc1RhZyhNRVRBREFUQV9LRVkuTkFNRURfVEFHKShuYW1lKTtcbiAgICB9O1xuICAgIFRhcmdldC5wcm90b3R5cGUubWF0Y2hlc1RhZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IF90aGlzLm1ldGFkYXRhOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBtID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIGlmIChtLmtleSA9PT0ga2V5ICYmIG0udmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBUYXJnZXQ7XG59KCkpO1xuZXhwb3J0cy5UYXJnZXQgPSBUYXJnZXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBlcnJvcl9tc2dzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2Vycm9yX21zZ3NcIik7XG52YXIgbGl0ZXJhbF90eXBlc18xID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9saXRlcmFsX3R5cGVzXCIpO1xudmFyIE1FVEFEQVRBX0tFWSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbWV0YWRhdGFfa2V5c1wiKTtcbmZ1bmN0aW9uIF9pbmplY3RQcm9wZXJ0aWVzKGluc3RhbmNlLCBjaGlsZFJlcXVlc3RzLCByZXNvbHZlUmVxdWVzdCkge1xuICAgIHZhciBwcm9wZXJ0eUluamVjdGlvbnNSZXF1ZXN0cyA9IGNoaWxkUmVxdWVzdHMuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZFJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIChjaGlsZFJlcXVlc3QudGFyZ2V0ICE9PSBudWxsICYmXG4gICAgICAgICAgICBjaGlsZFJlcXVlc3QudGFyZ2V0LnR5cGUgPT09IGxpdGVyYWxfdHlwZXNfMS5UYXJnZXRUeXBlRW51bS5DbGFzc1Byb3BlcnR5KTtcbiAgICB9KTtcbiAgICB2YXIgcHJvcGVydHlJbmplY3Rpb25zID0gcHJvcGVydHlJbmplY3Rpb25zUmVxdWVzdHMubWFwKHJlc29sdmVSZXF1ZXN0KTtcbiAgICBwcm9wZXJ0eUluamVjdGlvbnNSZXF1ZXN0cy5mb3JFYWNoKGZ1bmN0aW9uIChyLCBpbmRleCkge1xuICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgcHJvcGVydHlOYW1lID0gci50YXJnZXQubmFtZS52YWx1ZSgpO1xuICAgICAgICB2YXIgaW5qZWN0aW9uID0gcHJvcGVydHlJbmplY3Rpb25zW2luZGV4XTtcbiAgICAgICAgaW5zdGFuY2VbcHJvcGVydHlOYW1lXSA9IGluamVjdGlvbjtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5mdW5jdGlvbiBfY3JlYXRlSW5zdGFuY2UoRnVuYywgaW5qZWN0aW9ucykge1xuICAgIHJldHVybiBuZXcgKEZ1bmMuYmluZC5hcHBseShGdW5jLCBbdm9pZCAwXS5jb25jYXQoaW5qZWN0aW9ucykpKSgpO1xufVxuZnVuY3Rpb24gX3Bvc3RDb25zdHJ1Y3QoY29uc3RyLCByZXN1bHQpIHtcbiAgICBpZiAoUmVmbGVjdC5oYXNNZXRhZGF0YShNRVRBREFUQV9LRVkuUE9TVF9DT05TVFJVQ1QsIGNvbnN0cikpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEFEQVRBX0tFWS5QT1NUX0NPTlNUUlVDVCwgY29uc3RyKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdFtkYXRhLnZhbHVlXSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfbXNnc18xLlBPU1RfQ09OU1RSVUNUX0VSUk9SKGNvbnN0ci5uYW1lLCBlLm1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHJlc29sdmVJbnN0YW5jZShjb25zdHIsIGNoaWxkUmVxdWVzdHMsIHJlc29sdmVSZXF1ZXN0KSB7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKGNoaWxkUmVxdWVzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgY29uc3RydWN0b3JJbmplY3Rpb25zUmVxdWVzdHMgPSBjaGlsZFJlcXVlc3RzLmZpbHRlcihmdW5jdGlvbiAoY2hpbGRSZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gKGNoaWxkUmVxdWVzdC50YXJnZXQgIT09IG51bGwgJiYgY2hpbGRSZXF1ZXN0LnRhcmdldC50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuVGFyZ2V0VHlwZUVudW0uQ29uc3RydWN0b3JBcmd1bWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY29uc3RydWN0b3JJbmplY3Rpb25zID0gY29uc3RydWN0b3JJbmplY3Rpb25zUmVxdWVzdHMubWFwKHJlc29sdmVSZXF1ZXN0KTtcbiAgICAgICAgcmVzdWx0ID0gX2NyZWF0ZUluc3RhbmNlKGNvbnN0ciwgY29uc3RydWN0b3JJbmplY3Rpb25zKTtcbiAgICAgICAgcmVzdWx0ID0gX2luamVjdFByb3BlcnRpZXMocmVzdWx0LCBjaGlsZFJlcXVlc3RzLCByZXNvbHZlUmVxdWVzdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBuZXcgY29uc3RyKCk7XG4gICAgfVxuICAgIF9wb3N0Q29uc3RydWN0KGNvbnN0ciwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5yZXNvbHZlSW5zdGFuY2UgPSByZXNvbHZlSW5zdGFuY2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBleGNlcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiKTtcbnZhciBzZXJpYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VyaWFsaXphdGlvblwiKTtcbnZhciBpbnN0YW50aWF0aW9uXzEgPSByZXF1aXJlKFwiLi9pbnN0YW50aWF0aW9uXCIpO1xudmFyIGludm9rZUZhY3RvcnkgPSBmdW5jdGlvbiAoZmFjdG9yeVR5cGUsIHNlcnZpY2VJZGVudGlmaWVyLCBmbikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGV4Y2VwdGlvbnNfMS5pc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbihlcnJvcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLkNJUkNVTEFSX0RFUEVOREVOQ1lfSU5fRkFDVE9SWShmYWN0b3J5VHlwZSwgc2VydmljZUlkZW50aWZpZXIudG9TdHJpbmcoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG59O1xudmFyIF9yZXNvbHZlUmVxdWVzdCA9IGZ1bmN0aW9uIChyZXF1ZXN0U2NvcGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdC5wYXJlbnRDb250ZXh0LnNldEN1cnJlbnRSZXF1ZXN0KHJlcXVlc3QpO1xuICAgICAgICB2YXIgYmluZGluZ3MgPSByZXF1ZXN0LmJpbmRpbmdzO1xuICAgICAgICB2YXIgY2hpbGRSZXF1ZXN0cyA9IHJlcXVlc3QuY2hpbGRSZXF1ZXN0cztcbiAgICAgICAgdmFyIHRhcmdldElzQW5BcnJheSA9IHJlcXVlc3QudGFyZ2V0ICYmIHJlcXVlc3QudGFyZ2V0LmlzQXJyYXkoKTtcbiAgICAgICAgdmFyIHRhcmdldFBhcmVudElzTm90QW5BcnJheSA9ICFyZXF1ZXN0LnBhcmVudFJlcXVlc3QgfHxcbiAgICAgICAgICAgICFyZXF1ZXN0LnBhcmVudFJlcXVlc3QudGFyZ2V0IHx8XG4gICAgICAgICAgICAhcmVxdWVzdC50YXJnZXQgfHxcbiAgICAgICAgICAgICFyZXF1ZXN0LnBhcmVudFJlcXVlc3QudGFyZ2V0Lm1hdGNoZXNBcnJheShyZXF1ZXN0LnRhcmdldC5zZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmICh0YXJnZXRJc0FuQXJyYXkgJiYgdGFyZ2V0UGFyZW50SXNOb3RBbkFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGRSZXF1ZXN0cy5tYXAoZnVuY3Rpb24gKGNoaWxkUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIHZhciBfZiA9IF9yZXNvbHZlUmVxdWVzdChyZXF1ZXN0U2NvcGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfZihjaGlsZFJlcXVlc3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnRhcmdldC5pc09wdGlvbmFsKCkgJiYgYmluZGluZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBiaW5kaW5nXzEgPSBiaW5kaW5nc1swXTtcbiAgICAgICAgICAgIHZhciBpc1NpbmdsZXRvbiA9IGJpbmRpbmdfMS5zY29wZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uU2luZ2xldG9uO1xuICAgICAgICAgICAgdmFyIGlzUmVxdWVzdFNpbmdsZXRvbiA9IGJpbmRpbmdfMS5zY29wZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uUmVxdWVzdDtcbiAgICAgICAgICAgIGlmIChpc1NpbmdsZXRvbiAmJiBiaW5kaW5nXzEuYWN0aXZhdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdfMS5jYWNoZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1JlcXVlc3RTaW5nbGV0b24gJiZcbiAgICAgICAgICAgICAgICByZXF1ZXN0U2NvcGUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICByZXF1ZXN0U2NvcGUuaGFzKGJpbmRpbmdfMS5pZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdFNjb3BlLmdldChiaW5kaW5nXzEuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkNvbnN0YW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBiaW5kaW5nXzEuY2FjaGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5GdW5jdGlvbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGJpbmRpbmdfMS5jYWNoZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYmluZGluZ18xLmltcGxlbWVudGF0aW9uVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkR5bmFtaWNWYWx1ZSAmJiBiaW5kaW5nXzEuZHluYW1pY1ZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW52b2tlRmFjdG9yeShcInRvRHluYW1pY1ZhbHVlXCIsIGJpbmRpbmdfMS5zZXJ2aWNlSWRlbnRpZmllciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gYmluZGluZ18xLmR5bmFtaWNWYWx1ZShyZXF1ZXN0LnBhcmVudENvbnRleHQpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkZhY3RvcnkgJiYgYmluZGluZ18xLmZhY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbnZva2VGYWN0b3J5KFwidG9GYWN0b3J5XCIsIGJpbmRpbmdfMS5zZXJ2aWNlSWRlbnRpZmllciwgZnVuY3Rpb24gKCkgeyByZXR1cm4gYmluZGluZ18xLmZhY3RvcnkocmVxdWVzdC5wYXJlbnRDb250ZXh0KTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kaW5nXzEudHlwZSA9PT0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Qcm92aWRlciAmJiBiaW5kaW5nXzEucHJvdmlkZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbnZva2VGYWN0b3J5KFwidG9Qcm92aWRlclwiLCBiaW5kaW5nXzEuc2VydmljZUlkZW50aWZpZXIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJpbmRpbmdfMS5wcm92aWRlcihyZXF1ZXN0LnBhcmVudENvbnRleHQpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmRpbmdfMS50eXBlID09PSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkluc3RhbmNlICYmIGJpbmRpbmdfMS5pbXBsZW1lbnRhdGlvblR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbnN0YW50aWF0aW9uXzEucmVzb2x2ZUluc3RhbmNlKGJpbmRpbmdfMS5pbXBsZW1lbnRhdGlvblR5cGUsIGNoaWxkUmVxdWVzdHMsIF9yZXNvbHZlUmVxdWVzdChyZXF1ZXN0U2NvcGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllciA9IHNlcmlhbGl6YXRpb25fMS5nZXRTZXJ2aWNlSWRlbnRpZmllckFzU3RyaW5nKHJlcXVlc3Quc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NU0dTLklOVkFMSURfQklORElOR19UWVBFICsgXCIgXCIgKyBzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJpbmRpbmdfMS5vbkFjdGl2YXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGJpbmRpbmdfMS5vbkFjdGl2YXRpb24ocmVxdWVzdC5wYXJlbnRDb250ZXh0LCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU2luZ2xldG9uKSB7XG4gICAgICAgICAgICAgICAgYmluZGluZ18xLmNhY2hlID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGJpbmRpbmdfMS5hY3RpdmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzUmVxdWVzdFNpbmdsZXRvbiAmJlxuICAgICAgICAgICAgICAgIHJlcXVlc3RTY29wZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICFyZXF1ZXN0U2NvcGUuaGFzKGJpbmRpbmdfMS5pZCkpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0U2NvcGUuc2V0KGJpbmRpbmdfMS5pZCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmZ1bmN0aW9uIHJlc29sdmUoY29udGV4dCkge1xuICAgIHZhciBfZiA9IF9yZXNvbHZlUmVxdWVzdChjb250ZXh0LnBsYW4ucm9vdFJlcXVlc3QucmVxdWVzdFNjb3BlKTtcbiAgICByZXR1cm4gX2YoY29udGV4dC5wbGFuLnJvb3RSZXF1ZXN0KTtcbn1cbmV4cG9ydHMucmVzb2x2ZSA9IHJlc29sdmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBsaXRlcmFsX3R5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL2xpdGVyYWxfdHlwZXNcIik7XG52YXIgYmluZGluZ193aGVuX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ193aGVuX29uX3N5bnRheFwiKTtcbnZhciBCaW5kaW5nSW5TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdJblN5bnRheChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcgPSBiaW5kaW5nO1xuICAgIH1cbiAgICBCaW5kaW5nSW5TeW50YXgucHJvdG90eXBlLmluUmVxdWVzdFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnNjb3BlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdTY29wZUVudW0uUmVxdWVzdDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJblN5bnRheC5wcm90b3R5cGUuaW5TaW5nbGV0b25TY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbjtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJblN5bnRheC5wcm90b3R5cGUuaW5UcmFuc2llbnRTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5zY29wZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nU2NvcGVFbnVtLlRyYW5zaWVudDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nSW5TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nSW5TeW50YXggPSBCaW5kaW5nSW5TeW50YXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBiaW5kaW5nX2luX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ19pbl9zeW50YXhcIik7XG52YXIgYmluZGluZ19vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfb25fc3ludGF4XCIpO1xudmFyIGJpbmRpbmdfd2hlbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfd2hlbl9zeW50YXhcIik7XG52YXIgQmluZGluZ0luV2hlbk9uU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nSW5XaGVuT25TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICAgICAgdGhpcy5fYmluZGluZ1doZW5TeW50YXggPSBuZXcgYmluZGluZ193aGVuX3N5bnRheF8xLkJpbmRpbmdXaGVuU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nT25TeW50YXggPSBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdJblN5bnRheCA9IG5ldyBiaW5kaW5nX2luX3N5bnRheF8xLkJpbmRpbmdJblN5bnRheChiaW5kaW5nKTtcbiAgICB9XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5pblJlcXVlc3RTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdJblN5bnRheC5pblJlcXVlc3RTY29wZSgpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5pblNpbmdsZXRvblNjb3BlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ0luU3ludGF4LmluU2luZ2xldG9uU2NvcGUoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUuaW5UcmFuc2llbnRTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdJblN5bnRheC5pblRyYW5zaWVudFNjb3BlKCk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW4gPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbihjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXROYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldElzRGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5UYXJnZXRJc0RlZmF1bHQoKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0VGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuSW5qZWN0ZWRJbnRvID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkluamVjdGVkSW50byhwYXJlbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblBhcmVudE5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5QYXJlbnRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nSW5XaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9ySXMoYW5jZXN0b3IpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JOYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5BbnlBbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3Rvck5hbWVkKG5hbWUpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdJbldoZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JNYXRjaGVzKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JNYXRjaGVzKGNvbnN0cmFpbnQpO1xuICAgIH07XG4gICAgQmluZGluZ0luV2hlbk9uU3ludGF4LnByb3RvdHlwZS5vbkFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ09uU3ludGF4Lm9uQWN0aXZhdGlvbihoYW5kbGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nSW5XaGVuT25TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nSW5XaGVuT25TeW50YXggPSBCaW5kaW5nSW5XaGVuT25TeW50YXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBiaW5kaW5nX3doZW5fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX3doZW5fc3ludGF4XCIpO1xudmFyIEJpbmRpbmdPblN5bnRheCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmluZGluZ09uU3ludGF4KGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZyA9IGJpbmRpbmc7XG4gICAgfVxuICAgIEJpbmRpbmdPblN5bnRheC5wcm90b3R5cGUub25BY3RpdmF0aW9uID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5vbkFjdGl2YXRpb24gPSBoYW5kbGVyO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9zeW50YXhfMS5CaW5kaW5nV2hlblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nT25TeW50YXg7XG59KCkpO1xuZXhwb3J0cy5CaW5kaW5nT25TeW50YXggPSBCaW5kaW5nT25TeW50YXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xudmFyIGxpdGVyYWxfdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHMvbGl0ZXJhbF90eXBlc1wiKTtcbnZhciBiaW5kaW5nX2luX3doZW5fb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX2luX3doZW5fb25fc3ludGF4XCIpO1xudmFyIGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMSA9IHJlcXVpcmUoXCIuL2JpbmRpbmdfd2hlbl9vbl9zeW50YXhcIik7XG52YXIgQmluZGluZ1RvU3ludGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaW5kaW5nVG9TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICB9XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkluc3RhbmNlO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSA9IGNvbnN0cnVjdG9yO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfaW5fd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nSW5XaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvU2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9iaW5kaW5nLnNlcnZpY2VJZGVudGlmaWVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiICsgRVJST1JfTVNHUy5JTlZBTElEX1RPX1NFTEZfVkFMVUUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxmID0gdGhpcy5fYmluZGluZy5zZXJ2aWNlSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIHRoaXMudG8oc2VsZik7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvQ29uc3RhbnRWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLnR5cGUgPSBsaXRlcmFsX3R5cGVzXzEuQmluZGluZ1R5cGVFbnVtLkNvbnN0YW50VmFsdWU7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY2FjaGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5keW5hbWljVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmltcGxlbWVudGF0aW9uVHlwZSA9IG51bGw7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvRHluYW1pY1ZhbHVlID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5EeW5hbWljVmFsdWU7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY2FjaGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmR5bmFtaWNWYWx1ZSA9IGZ1bmM7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX2luX3doZW5fb25fc3ludGF4XzEuQmluZGluZ0luV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0NvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uQ29uc3RydWN0b3I7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlID0gY29uc3RydWN0b3I7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvRmFjdG9yeSA9IGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRmFjdG9yeTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5mYWN0b3J5ID0gZmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX3doZW5fb25fc3ludGF4XzEuQmluZGluZ1doZW5PblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdUb1N5bnRheC5wcm90b3R5cGUudG9GdW5jdGlvbiA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZnVuYyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTVNHUy5JTlZBTElEX0ZVTkNUSU9OX0JJTkRJTkcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBiaW5kaW5nV2hlbk9uU3ludGF4ID0gdGhpcy50b0NvbnN0YW50VmFsdWUoZnVuYyk7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRnVuY3Rpb247XG4gICAgICAgIHJldHVybiBiaW5kaW5nV2hlbk9uU3ludGF4O1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b0F1dG9GYWN0b3J5ID0gZnVuY3Rpb24gKHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcudHlwZSA9IGxpdGVyYWxfdHlwZXNfMS5CaW5kaW5nVHlwZUVudW0uRmFjdG9yeTtcbiAgICAgICAgdGhpcy5fYmluZGluZy5mYWN0b3J5ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciBhdXRvZmFjdG9yeSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbnRleHQuY29udGFpbmVyLmdldChzZXJ2aWNlSWRlbnRpZmllcik7IH07XG4gICAgICAgICAgICByZXR1cm4gYXV0b2ZhY3Rvcnk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ193aGVuX29uX3N5bnRheF8xLkJpbmRpbmdXaGVuT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nVG9TeW50YXgucHJvdG90eXBlLnRvUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy50eXBlID0gbGl0ZXJhbF90eXBlc18xLkJpbmRpbmdUeXBlRW51bS5Qcm92aWRlcjtcbiAgICAgICAgdGhpcy5fYmluZGluZy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfd2hlbl9vbl9zeW50YXhfMS5CaW5kaW5nV2hlbk9uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1RvU3ludGF4LnByb3RvdHlwZS50b1NlcnZpY2UgPSBmdW5jdGlvbiAoc2VydmljZSkge1xuICAgICAgICB0aGlzLnRvRHluYW1pY1ZhbHVlKGZ1bmN0aW9uIChjb250ZXh0KSB7IHJldHVybiBjb250ZXh0LmNvbnRhaW5lci5nZXQoc2VydmljZSk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEJpbmRpbmdUb1N5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdUb1N5bnRheCA9IEJpbmRpbmdUb1N5bnRheDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGJpbmRpbmdfb25fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX29uX3N5bnRheFwiKTtcbnZhciBiaW5kaW5nX3doZW5fc3ludGF4XzEgPSByZXF1aXJlKFwiLi9iaW5kaW5nX3doZW5fc3ludGF4XCIpO1xudmFyIEJpbmRpbmdXaGVuT25TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdXaGVuT25TeW50YXgoYmluZGluZykge1xuICAgICAgICB0aGlzLl9iaW5kaW5nID0gYmluZGluZztcbiAgICAgICAgdGhpcy5fYmluZGluZ1doZW5TeW50YXggPSBuZXcgYmluZGluZ193aGVuX3N5bnRheF8xLkJpbmRpbmdXaGVuU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgICAgICB0aGlzLl9iaW5kaW5nT25TeW50YXggPSBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfVxuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW4gPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbihjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5UYXJnZXROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0TmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0SXNEZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlblRhcmdldElzRGVmYXVsdCgpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuVGFyZ2V0VGFnZ2VkKHRhZywgdmFsdWUpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbkluamVjdGVkSW50byA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5JbmplY3RlZEludG8ocGFyZW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5QYXJlbnROYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuUGFyZW50TmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5QYXJlbnRUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9ySXMoYW5jZXN0b3IpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5PblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JJcyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbk5vQW5jZXN0b3JJcyhhbmNlc3Rvcik7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuQW55QW5jZXN0b3JOYW1lZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JOYW1lZChuYW1lKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuQW55QW5jZXN0b3JUYWdnZWQodGFnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdXaGVuU3ludGF4LndoZW5Ob0FuY2VzdG9yTmFtZWQobmFtZSk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvclRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3RvclRhZ2dlZCh0YWcsIHZhbHVlKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck1hdGNoZXMgPSBmdW5jdGlvbiAoY29uc3RyYWludCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ1doZW5TeW50YXgud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyhjb25zdHJhaW50KTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuT25TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5nV2hlblN5bnRheC53aGVuTm9BbmNlc3Rvck1hdGNoZXMoY29uc3RyYWludCk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlbk9uU3ludGF4LnByb3RvdHlwZS5vbkFjdGl2YXRpb24gPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ09uU3ludGF4Lm9uQWN0aXZhdGlvbihoYW5kbGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nV2hlbk9uU3ludGF4O1xufSgpKTtcbmV4cG9ydHMuQmluZGluZ1doZW5PblN5bnRheCA9IEJpbmRpbmdXaGVuT25TeW50YXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBiaW5kaW5nX29uX3N5bnRheF8xID0gcmVxdWlyZShcIi4vYmluZGluZ19vbl9zeW50YXhcIik7XG52YXIgY29uc3RyYWludF9oZWxwZXJzXzEgPSByZXF1aXJlKFwiLi9jb25zdHJhaW50X2hlbHBlcnNcIik7XG52YXIgQmluZGluZ1doZW5TeW50YXggPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpbmRpbmdXaGVuU3ludGF4KGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZyA9IGJpbmRpbmc7XG4gICAgfVxuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuID0gZnVuY3Rpb24gKGNvbnN0cmFpbnQpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gY29uc3RyYWludDtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuVGFyZ2V0TmFtZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50X2hlbHBlcnNfMS5uYW1lZENvbnN0cmFpbnQobmFtZSk7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldElzRGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRJc0RlZmF1bHQgPSAocmVxdWVzdC50YXJnZXQgIT09IG51bGwpICYmXG4gICAgICAgICAgICAgICAgKCFyZXF1ZXN0LnRhcmdldC5pc05hbWVkKCkpICYmXG4gICAgICAgICAgICAgICAgKCFyZXF1ZXN0LnRhcmdldC5pc1RhZ2dlZCgpKTtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRJc0RlZmF1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblRhcmdldFRhZ2dlZCA9IGZ1bmN0aW9uICh0YWcsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGNvbnN0cmFpbnRfaGVscGVyc18xLnRhZ2dlZENvbnN0cmFpbnQodGFnKSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkluamVjdGVkSW50byA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS50eXBlQ29uc3RyYWludChwYXJlbnQpKHJlcXVlc3QucGFyZW50UmVxdWVzdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlblBhcmVudE5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS5uYW1lZENvbnN0cmFpbnQobmFtZSkocmVxdWVzdC5wYXJlbnRSZXF1ZXN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuUGFyZW50VGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS50YWdnZWRDb25zdHJhaW50KHRhZykodmFsdWUpKHJlcXVlc3QucGFyZW50UmVxdWVzdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9ySXMgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludF9oZWxwZXJzXzEudHlwZUNvbnN0cmFpbnQoYW5jZXN0b3IpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3RvcklzID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50X2hlbHBlcnNfMS50eXBlQ29uc3RyYWludChhbmNlc3RvcikpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5BbnlBbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludF9oZWxwZXJzXzEubmFtZWRDb25zdHJhaW50KG5hbWUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIEJpbmRpbmdXaGVuU3ludGF4LnByb3RvdHlwZS53aGVuTm9BbmNlc3Rvck5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiAhY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnRfaGVscGVyc18xLm5hbWVkQ29uc3RyYWludChuYW1lKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yVGFnZ2VkID0gZnVuY3Rpb24gKHRhZywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYmluZGluZy5jb25zdHJhaW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludF9oZWxwZXJzXzEudGFnZ2VkQ29uc3RyYWludCh0YWcpKHZhbHVlKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbk5vQW5jZXN0b3JUYWdnZWQgPSBmdW5jdGlvbiAodGFnLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nLmNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuICFjb25zdHJhaW50X2hlbHBlcnNfMS50cmF2ZXJzZUFuY2Vyc3RvcnMocmVxdWVzdCwgY29uc3RyYWludF9oZWxwZXJzXzEudGFnZ2VkQ29uc3RyYWludCh0YWcpKHZhbHVlKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgYmluZGluZ19vbl9zeW50YXhfMS5CaW5kaW5nT25TeW50YXgodGhpcy5fYmluZGluZyk7XG4gICAgfTtcbiAgICBCaW5kaW5nV2hlblN5bnRheC5wcm90b3R5cGUud2hlbkFueUFuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RyYWludF9oZWxwZXJzXzEudHJhdmVyc2VBbmNlcnN0b3JzKHJlcXVlc3QsIGNvbnN0cmFpbnQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IGJpbmRpbmdfb25fc3ludGF4XzEuQmluZGluZ09uU3ludGF4KHRoaXMuX2JpbmRpbmcpO1xuICAgIH07XG4gICAgQmluZGluZ1doZW5TeW50YXgucHJvdG90eXBlLndoZW5Ob0FuY2VzdG9yTWF0Y2hlcyA9IGZ1bmN0aW9uIChjb25zdHJhaW50KSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmcuY29uc3RyYWludCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbnN0cmFpbnRfaGVscGVyc18xLnRyYXZlcnNlQW5jZXJzdG9ycyhyZXF1ZXN0LCBjb25zdHJhaW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBiaW5kaW5nX29uX3N5bnRheF8xLkJpbmRpbmdPblN5bnRheCh0aGlzLl9iaW5kaW5nKTtcbiAgICB9O1xuICAgIHJldHVybiBCaW5kaW5nV2hlblN5bnRheDtcbn0oKSk7XG5leHBvcnRzLkJpbmRpbmdXaGVuU3ludGF4ID0gQmluZGluZ1doZW5TeW50YXg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNRVRBREFUQV9LRVkgPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzL21ldGFkYXRhX2tleXNcIik7XG52YXIgbWV0YWRhdGFfMSA9IHJlcXVpcmUoXCIuLi9wbGFubmluZy9tZXRhZGF0YVwiKTtcbnZhciB0cmF2ZXJzZUFuY2Vyc3RvcnMgPSBmdW5jdGlvbiAocmVxdWVzdCwgY29uc3RyYWludCkge1xuICAgIHZhciBwYXJlbnQgPSByZXF1ZXN0LnBhcmVudFJlcXVlc3Q7XG4gICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gY29uc3RyYWludChwYXJlbnQpID8gdHJ1ZSA6IHRyYXZlcnNlQW5jZXJzdG9ycyhwYXJlbnQsIGNvbnN0cmFpbnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5leHBvcnRzLnRyYXZlcnNlQW5jZXJzdG9ycyA9IHRyYXZlcnNlQW5jZXJzdG9ycztcbnZhciB0YWdnZWRDb25zdHJhaW50ID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIGNvbnN0cmFpbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gcmVxdWVzdCAhPT0gbnVsbCAmJiByZXF1ZXN0LnRhcmdldCAhPT0gbnVsbCAmJiByZXF1ZXN0LnRhcmdldC5tYXRjaGVzVGFnKGtleSkodmFsdWUpO1xuICAgIH07XG4gICAgY29uc3RyYWludC5tZXRhRGF0YSA9IG5ldyBtZXRhZGF0YV8xLk1ldGFkYXRhKGtleSwgdmFsdWUpO1xuICAgIHJldHVybiBjb25zdHJhaW50O1xufTsgfTtcbmV4cG9ydHMudGFnZ2VkQ29uc3RyYWludCA9IHRhZ2dlZENvbnN0cmFpbnQ7XG52YXIgbmFtZWRDb25zdHJhaW50ID0gdGFnZ2VkQ29uc3RyYWludChNRVRBREFUQV9LRVkuTkFNRURfVEFHKTtcbmV4cG9ydHMubmFtZWRDb25zdHJhaW50ID0gbmFtZWRDb25zdHJhaW50O1xudmFyIHR5cGVDb25zdHJhaW50ID0gZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgdmFyIGJpbmRpbmcgPSBudWxsO1xuICAgIGlmIChyZXF1ZXN0ICE9PSBudWxsKSB7XG4gICAgICAgIGJpbmRpbmcgPSByZXF1ZXN0LmJpbmRpbmdzWzBdO1xuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlSWRlbnRpZmllciA9IGJpbmRpbmcuc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgICAgICByZXR1cm4gc2VydmljZUlkZW50aWZpZXIgPT09IHR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29uc3RydWN0b3IgPSByZXF1ZXN0LmJpbmRpbmdzWzBdLmltcGxlbWVudGF0aW9uVHlwZTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSBjb25zdHJ1Y3RvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59OyB9O1xuZXhwb3J0cy50eXBlQ29uc3RyYWludCA9IHR5cGVDb25zdHJhaW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm11bHRpQmluZFRvU2VydmljZSA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNlcnZpY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB0eXBlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGNvbnRhaW5lci5iaW5kKHQpLnRvU2VydmljZShzZXJ2aWNlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xuZnVuY3Rpb24gaXNTdGFja092ZXJmbG93RXhlcHRpb24oZXJyb3IpIHtcbiAgICByZXR1cm4gKGVycm9yIGluc3RhbmNlb2YgUmFuZ2VFcnJvciB8fFxuICAgICAgICBlcnJvci5tZXNzYWdlID09PSBFUlJPUl9NU0dTLlNUQUNLX09WRVJGTE9XKTtcbn1cbmV4cG9ydHMuaXNTdGFja092ZXJmbG93RXhlcHRpb24gPSBpc1N0YWNrT3ZlcmZsb3dFeGVwdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGlkQ291bnRlciA9IDA7XG5mdW5jdGlvbiBpZCgpIHtcbiAgICByZXR1cm4gaWRDb3VudGVyKys7XG59XG5leHBvcnRzLmlkID0gaWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFUlJPUl9NU0dTID0gcmVxdWlyZShcIi4uL2NvbnN0YW50cy9lcnJvcl9tc2dzXCIpO1xuZnVuY3Rpb24gZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhzZXJ2aWNlSWRlbnRpZmllcikge1xuICAgIGlmICh0eXBlb2Ygc2VydmljZUlkZW50aWZpZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgX3NlcnZpY2VJZGVudGlmaWVyID0gc2VydmljZUlkZW50aWZpZXI7XG4gICAgICAgIHJldHVybiBfc2VydmljZUlkZW50aWZpZXIubmFtZTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHNlcnZpY2VJZGVudGlmaWVyID09PSBcInN5bWJvbFwiKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlSWRlbnRpZmllci50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIF9zZXJ2aWNlSWRlbnRpZmllciA9IHNlcnZpY2VJZGVudGlmaWVyO1xuICAgICAgICByZXR1cm4gX3NlcnZpY2VJZGVudGlmaWVyO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyA9IGdldFNlcnZpY2VJZGVudGlmaWVyQXNTdHJpbmc7XG5mdW5jdGlvbiBsaXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXIoY29udGFpbmVyLCBzZXJ2aWNlSWRlbnRpZmllciwgZ2V0QmluZGluZ3MpIHtcbiAgICB2YXIgcmVnaXN0ZXJlZEJpbmRpbmdzTGlzdCA9IFwiXCI7XG4gICAgdmFyIHJlZ2lzdGVyZWRCaW5kaW5ncyA9IGdldEJpbmRpbmdzKGNvbnRhaW5lciwgc2VydmljZUlkZW50aWZpZXIpO1xuICAgIGlmIChyZWdpc3RlcmVkQmluZGluZ3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgPSBcIlxcblJlZ2lzdGVyZWQgYmluZGluZ3M6XCI7XG4gICAgICAgIHJlZ2lzdGVyZWRCaW5kaW5ncy5mb3JFYWNoKGZ1bmN0aW9uIChiaW5kaW5nKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IFwiT2JqZWN0XCI7XG4gICAgICAgICAgICBpZiAoYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gZ2V0RnVuY3Rpb25OYW1lKGJpbmRpbmcuaW1wbGVtZW50YXRpb25UeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgPSByZWdpc3RlcmVkQmluZGluZ3NMaXN0ICsgXCJcXG4gXCIgKyBuYW1lO1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcuY29uc3RyYWludC5tZXRhRGF0YSkge1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWRCaW5kaW5nc0xpc3QgPSByZWdpc3RlcmVkQmluZGluZ3NMaXN0ICsgXCIgLSBcIiArIGJpbmRpbmcuY29uc3RyYWludC5tZXRhRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3RlcmVkQmluZGluZ3NMaXN0O1xufVxuZXhwb3J0cy5saXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXIgPSBsaXN0UmVnaXN0ZXJlZEJpbmRpbmdzRm9yU2VydmljZUlkZW50aWZpZXI7XG5mdW5jdGlvbiBhbHJlYWR5RGVwZW5kZW5jeUNoYWluKHJlcXVlc3QsIHNlcnZpY2VJZGVudGlmaWVyKSB7XG4gICAgaWYgKHJlcXVlc3QucGFyZW50UmVxdWVzdCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlcXVlc3QucGFyZW50UmVxdWVzdC5zZXJ2aWNlSWRlbnRpZmllciA9PT0gc2VydmljZUlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYWxyZWFkeURlcGVuZGVuY3lDaGFpbihyZXF1ZXN0LnBhcmVudFJlcXVlc3QsIHNlcnZpY2VJZGVudGlmaWVyKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXBlbmRlbmN5Q2hhaW5Ub1N0cmluZyhyZXF1ZXN0KSB7XG4gICAgZnVuY3Rpb24gX2NyZWF0ZVN0cmluZ0FycihyZXEsIHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIHsgcmVzdWx0ID0gW107IH1cbiAgICAgICAgdmFyIHNlcnZpY2VJZGVudGlmaWVyID0gZ2V0U2VydmljZUlkZW50aWZpZXJBc1N0cmluZyhyZXEuc2VydmljZUlkZW50aWZpZXIpO1xuICAgICAgICByZXN1bHQucHVzaChzZXJ2aWNlSWRlbnRpZmllcik7XG4gICAgICAgIGlmIChyZXEucGFyZW50UmVxdWVzdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jcmVhdGVTdHJpbmdBcnIocmVxLnBhcmVudFJlcXVlc3QsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdmFyIHN0cmluZ0FyciA9IF9jcmVhdGVTdHJpbmdBcnIocmVxdWVzdCk7XG4gICAgcmV0dXJuIHN0cmluZ0Fyci5yZXZlcnNlKCkuam9pbihcIiAtLT4gXCIpO1xufVxuZnVuY3Rpb24gY2lyY3VsYXJEZXBlbmRlbmN5VG9FeGNlcHRpb24ocmVxdWVzdCkge1xuICAgIHJlcXVlc3QuY2hpbGRSZXF1ZXN0cy5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKGFscmVhZHlEZXBlbmRlbmN5Q2hhaW4oY2hpbGRSZXF1ZXN0LCBjaGlsZFJlcXVlc3Quc2VydmljZUlkZW50aWZpZXIpKSB7XG4gICAgICAgICAgICB2YXIgc2VydmljZXMgPSBkZXBlbmRlbmN5Q2hhaW5Ub1N0cmluZyhjaGlsZFJlcXVlc3QpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01TR1MuQ0lSQ1VMQVJfREVQRU5ERU5DWSArIFwiIFwiICsgc2VydmljZXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2lyY3VsYXJEZXBlbmRlbmN5VG9FeGNlcHRpb24oY2hpbGRSZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5jaXJjdWxhckRlcGVuZGVuY3lUb0V4Y2VwdGlvbiA9IGNpcmN1bGFyRGVwZW5kZW5jeVRvRXhjZXB0aW9uO1xuZnVuY3Rpb24gbGlzdE1ldGFkYXRhRm9yVGFyZ2V0KHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nLCB0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmlzVGFnZ2VkKCkgfHwgdGFyZ2V0LmlzTmFtZWQoKSkge1xuICAgICAgICB2YXIgbV8xID0gXCJcIjtcbiAgICAgICAgdmFyIG5hbWVkVGFnID0gdGFyZ2V0LmdldE5hbWVkVGFnKCk7XG4gICAgICAgIHZhciBvdGhlclRhZ3MgPSB0YXJnZXQuZ2V0Q3VzdG9tVGFncygpO1xuICAgICAgICBpZiAobmFtZWRUYWcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG1fMSArPSBuYW1lZFRhZy50b1N0cmluZygpICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3RoZXJUYWdzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvdGhlclRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgICAgICAgbV8xICs9IHRhZy50b1N0cmluZygpICsgXCJcXG5cIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIiBcIiArIHNlcnZpY2VJZGVudGlmaWVyU3RyaW5nICsgXCJcXG4gXCIgKyBzZXJ2aWNlSWRlbnRpZmllclN0cmluZyArIFwiIC0gXCIgKyBtXzE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCIgXCIgKyBzZXJ2aWNlSWRlbnRpZmllclN0cmluZztcbiAgICB9XG59XG5leHBvcnRzLmxpc3RNZXRhZGF0YUZvclRhcmdldCA9IGxpc3RNZXRhZGF0YUZvclRhcmdldDtcbmZ1bmN0aW9uIGdldEZ1bmN0aW9uTmFtZSh2KSB7XG4gICAgaWYgKHYubmFtZSkge1xuICAgICAgICByZXR1cm4gdi5uYW1lO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG5hbWVfMSA9IHYudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIG1hdGNoID0gbmFtZV8xLm1hdGNoKC9eZnVuY3Rpb25cXHMqKFteXFxzKF0rKS8pO1xuICAgICAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IFwiQW5vbnltb3VzIGZ1bmN0aW9uOiBcIiArIG5hbWVfMTtcbiAgICB9XG59XG5leHBvcnRzLmdldEZ1bmN0aW9uTmFtZSA9IGdldEZ1bmN0aW9uTmFtZTtcbiIsIiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKGUpO2Vsc2V7dmFyIHQ7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz90PXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP3Q9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYodD1zZWxmKSx0Lm9iamVjdEhhc2g9ZSgpfX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gbyh1LGEpe2lmKCFuW3VdKXtpZighdFt1XSl7dmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighYSYmZilyZXR1cm4gZih1LCEwKTtpZihpKXJldHVybiBpKHUsITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrdStcIidcIil9dmFyIHM9blt1XT17ZXhwb3J0czp7fX07dFt1XVswXS5jYWxsKHMuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W3VdWzFdW2VdO3JldHVybiBvKG4/bjplKX0scyxzLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bdV0uZXhwb3J0c31mb3IodmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSx1PTA7dTxyLmxlbmd0aDt1KyspbyhyW3VdKTtyZXR1cm4gb30oezE6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24ocixvLGksdSxhLGYscyxjLGwpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGQoZSx0KXtyZXR1cm4gdD1oKGUsdCksZyhlLHQpfWZ1bmN0aW9uIGgoZSx0KXtpZih0PXR8fHt9LHQuYWxnb3JpdGhtPXQuYWxnb3JpdGhtfHxcInNoYTFcIix0LmVuY29kaW5nPXQuZW5jb2Rpbmd8fFwiaGV4XCIsdC5leGNsdWRlVmFsdWVzPSEhdC5leGNsdWRlVmFsdWVzLHQuYWxnb3JpdGhtPXQuYWxnb3JpdGhtLnRvTG93ZXJDYXNlKCksdC5lbmNvZGluZz10LmVuY29kaW5nLnRvTG93ZXJDYXNlKCksdC5pZ25vcmVVbmtub3duPXQuaWdub3JlVW5rbm93bj09PSEwLHQucmVzcGVjdFR5cGU9dC5yZXNwZWN0VHlwZSE9PSExLHQucmVzcGVjdEZ1bmN0aW9uTmFtZXM9dC5yZXNwZWN0RnVuY3Rpb25OYW1lcyE9PSExLHQucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcz10LnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXMhPT0hMSx0LnVub3JkZXJlZEFycmF5cz10LnVub3JkZXJlZEFycmF5cz09PSEwLHQudW5vcmRlcmVkU2V0cz10LnVub3JkZXJlZFNldHMhPT0hMSx0LnVub3JkZXJlZE9iamVjdHM9dC51bm9yZGVyZWRPYmplY3RzIT09ITEsdC5yZXBsYWNlcj10LnJlcGxhY2VyfHx2b2lkIDAsdC5leGNsdWRlS2V5cz10LmV4Y2x1ZGVLZXlzfHx2b2lkIDAsXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IGFyZ3VtZW50IHJlcXVpcmVkLlwiKTtmb3IodmFyIG49MDtuPHYubGVuZ3RoOysrbil2W25dLnRvTG93ZXJDYXNlKCk9PT10LmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpJiYodC5hbGdvcml0aG09dltuXSk7aWYodi5pbmRleE9mKHQuYWxnb3JpdGhtKT09PS0xKXRocm93IG5ldyBFcnJvcignQWxnb3JpdGhtIFwiJyt0LmFsZ29yaXRobSsnXCIgIG5vdCBzdXBwb3J0ZWQuIHN1cHBvcnRlZCB2YWx1ZXM6ICcrdi5qb2luKFwiLCBcIikpO2lmKG0uaW5kZXhPZih0LmVuY29kaW5nKT09PS0xJiZcInBhc3N0aHJvdWdoXCIhPT10LmFsZ29yaXRobSl0aHJvdyBuZXcgRXJyb3IoJ0VuY29kaW5nIFwiJyt0LmVuY29kaW5nKydcIiAgbm90IHN1cHBvcnRlZC4gc3VwcG9ydGVkIHZhbHVlczogJyttLmpvaW4oXCIsIFwiKSk7cmV0dXJuIHR9ZnVuY3Rpb24gcChlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXJldHVybiExO3ZhciB0PS9eZnVuY3Rpb25cXHMrXFx3KlxccypcXChcXHMqXFwpXFxzKntcXHMrXFxbbmF0aXZlIGNvZGVcXF1cXHMrfSQvaTtyZXR1cm4gbnVsbCE9dC5leGVjKEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKX1mdW5jdGlvbiBnKGUsdCl7dmFyIG47bj1cInBhc3N0aHJvdWdoXCIhPT10LmFsZ29yaXRobT9iLmNyZWF0ZUhhc2godC5hbGdvcml0aG0pOm5ldyB3LFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLndyaXRlJiYobi53cml0ZT1uLnVwZGF0ZSxuLmVuZD1uLnVwZGF0ZSk7dmFyIHI9eSh0LG4pO2lmKHIuZGlzcGF0Y2goZSksbi51cGRhdGV8fG4uZW5kKFwiXCIpLG4uZGlnZXN0KXJldHVybiBuLmRpZ2VzdChcImJ1ZmZlclwiPT09dC5lbmNvZGluZz92b2lkIDA6dC5lbmNvZGluZyk7dmFyIG89bi5yZWFkKCk7cmV0dXJuXCJidWZmZXJcIj09PXQuZW5jb2Rpbmc/bzpvLnRvU3RyaW5nKHQuZW5jb2RpbmcpfWZ1bmN0aW9uIHkoZSx0LG4pe249bnx8W107dmFyIHI9ZnVuY3Rpb24oZSl7cmV0dXJuIHQudXBkYXRlP3QudXBkYXRlKGUsXCJ1dGY4XCIpOnQud3JpdGUoZSxcInV0ZjhcIil9O3JldHVybntkaXNwYXRjaDpmdW5jdGlvbih0KXtlLnJlcGxhY2VyJiYodD1lLnJlcGxhY2VyKHQpKTt2YXIgbj10eXBlb2YgdDtyZXR1cm4gbnVsbD09PXQmJihuPVwibnVsbFwiKSx0aGlzW1wiX1wiK25dKHQpfSxfb2JqZWN0OmZ1bmN0aW9uKHQpe3ZhciBvPS9cXFtvYmplY3QgKC4qKVxcXS9pLHU9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpLGE9by5leGVjKHUpO2E9YT9hWzFdOlwidW5rbm93bjpbXCIrdStcIl1cIixhPWEudG9Mb3dlckNhc2UoKTt2YXIgZj1udWxsO2lmKChmPW4uaW5kZXhPZih0KSk+PTApcmV0dXJuIHRoaXMuZGlzcGF0Y2goXCJbQ0lSQ1VMQVI6XCIrZitcIl1cIik7aWYobi5wdXNoKHQpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpJiZpLmlzQnVmZmVyJiZpLmlzQnVmZmVyKHQpKXJldHVybiByKFwiYnVmZmVyOlwiKSxyKHQpO2lmKFwib2JqZWN0XCI9PT1hfHxcImZ1bmN0aW9uXCI9PT1hKXt2YXIgcz1PYmplY3Qua2V5cyh0KTtlLnVub3JkZXJlZE9iamVjdHMmJihzPXMuc29ydCgpKSxlLnJlc3BlY3RUeXBlPT09ITF8fHAodCl8fHMuc3BsaWNlKDAsMCxcInByb3RvdHlwZVwiLFwiX19wcm90b19fXCIsXCJjb25zdHJ1Y3RvclwiKSxlLmV4Y2x1ZGVLZXlzJiYocz1zLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hZS5leGNsdWRlS2V5cyh0KX0pKSxyKFwib2JqZWN0OlwiK3MubGVuZ3RoK1wiOlwiKTt2YXIgYz10aGlzO3JldHVybiBzLmZvckVhY2goZnVuY3Rpb24obil7Yy5kaXNwYXRjaChuKSxyKFwiOlwiKSxlLmV4Y2x1ZGVWYWx1ZXN8fGMuZGlzcGF0Y2godFtuXSkscihcIixcIil9KX1pZighdGhpc1tcIl9cIithXSl7aWYoZS5pZ25vcmVVbmtub3duKXJldHVybiByKFwiW1wiK2ErXCJdXCIpO3Rocm93IG5ldyBFcnJvcignVW5rbm93biBvYmplY3QgdHlwZSBcIicrYSsnXCInKX10aGlzW1wiX1wiK2FdKHQpfSxfYXJyYXk6ZnVuY3Rpb24odCxvKXtvPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBvP286ZS51bm9yZGVyZWRBcnJheXMhPT0hMTt2YXIgaT10aGlzO2lmKHIoXCJhcnJheTpcIit0Lmxlbmd0aCtcIjpcIiksIW98fHQubGVuZ3RoPD0xKXJldHVybiB0LmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGkuZGlzcGF0Y2goZSl9KTt2YXIgdT1bXSxhPXQubWFwKGZ1bmN0aW9uKHQpe3ZhciByPW5ldyB3LG89bi5zbGljZSgpLGk9eShlLHIsbyk7cmV0dXJuIGkuZGlzcGF0Y2godCksdT11LmNvbmNhdChvLnNsaWNlKG4ubGVuZ3RoKSksci5yZWFkKCkudG9TdHJpbmcoKX0pO3JldHVybiBuPW4uY29uY2F0KHUpLGEuc29ydCgpLHRoaXMuX2FycmF5KGEsITEpfSxfZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImRhdGU6XCIrZS50b0pTT04oKSl9LF9zeW1ib2w6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJzeW1ib2w6XCIrZS50b1N0cmluZygpKX0sX2Vycm9yOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZXJyb3I6XCIrZS50b1N0cmluZygpKX0sX2Jvb2xlYW46ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJib29sOlwiK2UudG9TdHJpbmcoKSl9LF9zdHJpbmc6ZnVuY3Rpb24oZSl7cihcInN0cmluZzpcIitlLmxlbmd0aCtcIjpcIikscihlLnRvU3RyaW5nKCkpfSxfZnVuY3Rpb246ZnVuY3Rpb24odCl7cihcImZuOlwiKSxwKHQpP3RoaXMuZGlzcGF0Y2goXCJbbmF0aXZlXVwiKTp0aGlzLmRpc3BhdGNoKHQudG9TdHJpbmcoKSksZS5yZXNwZWN0RnVuY3Rpb25OYW1lcyE9PSExJiZ0aGlzLmRpc3BhdGNoKFwiZnVuY3Rpb24tbmFtZTpcIitTdHJpbmcodC5uYW1lKSksZS5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzJiZ0aGlzLl9vYmplY3QodCl9LF9udW1iZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJudW1iZXI6XCIrZS50b1N0cmluZygpKX0sX3htbDpmdW5jdGlvbihlKXtyZXR1cm4gcihcInhtbDpcIitlLnRvU3RyaW5nKCkpfSxfbnVsbDpmdW5jdGlvbigpe3JldHVybiByKFwiTnVsbFwiKX0sX3VuZGVmaW5lZDpmdW5jdGlvbigpe3JldHVybiByKFwiVW5kZWZpbmVkXCIpfSxfcmVnZXhwOmZ1bmN0aW9uKGUpe3JldHVybiByKFwicmVnZXg6XCIrZS50b1N0cmluZygpKX0sX3VpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50OGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQ4Y2xhbXBlZGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDhjbGFtcGVkYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDhhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50MTZhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQxNmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDE2YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MTZhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9mbG9hdDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJmbG9hdDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfZmxvYXQ2NGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwiZmxvYXQ2NGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2FycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiYXJyYXlidWZmZXI6XCIpLHRoaXMuZGlzcGF0Y2gobmV3IFVpbnQ4QXJyYXkoZSkpfSxfdXJsOmZ1bmN0aW9uKGUpe3JldHVybiByKFwidXJsOlwiK2UudG9TdHJpbmcoKSxcInV0ZjhcIil9LF9tYXA6ZnVuY3Rpb24odCl7cihcIm1hcDpcIik7dmFyIG49QXJyYXkuZnJvbSh0KTtyZXR1cm4gdGhpcy5fYXJyYXkobixlLnVub3JkZXJlZFNldHMhPT0hMSl9LF9zZXQ6ZnVuY3Rpb24odCl7cihcInNldDpcIik7dmFyIG49QXJyYXkuZnJvbSh0KTtyZXR1cm4gdGhpcy5fYXJyYXkobixlLnVub3JkZXJlZFNldHMhPT0hMSl9LF9ibG9iOmZ1bmN0aW9uKCl7aWYoZS5pZ25vcmVVbmtub3duKXJldHVybiByKFwiW2Jsb2JdXCIpO3Rocm93IEVycm9yKCdIYXNoaW5nIEJsb2Igb2JqZWN0cyBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZFxcbihzZWUgaHR0cHM6Ly9naXRodWIuY29tL3B1bGVvcy9vYmplY3QtaGFzaC9pc3N1ZXMvMjYpXFxuVXNlIFwib3B0aW9ucy5yZXBsYWNlclwiIG9yIFwib3B0aW9ucy5pZ25vcmVVbmtub3duXCJcXG4nKX0sX2RvbXdpbmRvdzpmdW5jdGlvbigpe3JldHVybiByKFwiZG9td2luZG93XCIpfSxfcHJvY2VzczpmdW5jdGlvbigpe3JldHVybiByKFwicHJvY2Vzc1wiKX0sX3RpbWVyOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ0aW1lclwiKX0sX3BpcGU6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInBpcGVcIil9LF90Y3A6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInRjcFwiKX0sX3VkcDpmdW5jdGlvbigpe3JldHVybiByKFwidWRwXCIpfSxfdHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ0dHlcIil9LF9zdGF0d2F0Y2hlcjpmdW5jdGlvbigpe3JldHVybiByKFwic3RhdHdhdGNoZXJcIil9LF9zZWN1cmVjb250ZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJzZWN1cmVjb250ZXh0XCIpfSxfY29ubmVjdGlvbjpmdW5jdGlvbigpe3JldHVybiByKFwiY29ubmVjdGlvblwiKX0sX3psaWI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInpsaWJcIil9LF9jb250ZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJjb250ZXh0XCIpfSxfbm9kZXNjcmlwdDpmdW5jdGlvbigpe3JldHVybiByKFwibm9kZXNjcmlwdFwiKX0sX2h0dHBwYXJzZXI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImh0dHBwYXJzZXJcIil9LF9kYXRhdmlldzpmdW5jdGlvbigpe3JldHVybiByKFwiZGF0YXZpZXdcIil9LF9zaWduYWw6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInNpZ25hbFwiKX0sX2ZzZXZlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImZzZXZlbnRcIil9LF90bHN3cmFwOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ0bHN3cmFwXCIpfX19ZnVuY3Rpb24gdygpe3JldHVybntidWY6XCJcIix3cml0ZTpmdW5jdGlvbihlKXt0aGlzLmJ1Zis9ZX0sZW5kOmZ1bmN0aW9uKGUpe3RoaXMuYnVmKz1lfSxyZWFkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYnVmfX19dmFyIGI9ZShcImNyeXB0b1wiKTtuPXQuZXhwb3J0cz1kLG4uc2hhMT1mdW5jdGlvbihlKXtyZXR1cm4gZChlKX0sbi5rZXlzPWZ1bmN0aW9uKGUpe3JldHVybiBkKGUse2V4Y2x1ZGVWYWx1ZXM6ITAsYWxnb3JpdGhtOlwic2hhMVwiLGVuY29kaW5nOlwiaGV4XCJ9KX0sbi5NRDU9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSx7YWxnb3JpdGhtOlwibWQ1XCIsZW5jb2Rpbmc6XCJoZXhcIn0pfSxuLmtleXNNRDU9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSx7YWxnb3JpdGhtOlwibWQ1XCIsZW5jb2Rpbmc6XCJoZXhcIixleGNsdWRlVmFsdWVzOiEwfSl9O3ZhciB2PWIuZ2V0SGFzaGVzP2IuZ2V0SGFzaGVzKCkuc2xpY2UoKTpbXCJzaGExXCIsXCJtZDVcIl07di5wdXNoKFwicGFzc3Rocm91Z2hcIik7dmFyIG09W1wiYnVmZmVyXCIsXCJoZXhcIixcImJpbmFyeVwiLFwiYmFzZTY0XCJdO24ud3JpdGVUb1N0cmVhbT1mdW5jdGlvbihlLHQsbil7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4mJihuPXQsdD17fSksdD1oKGUsdCkseSh0LG4pLmRpc3BhdGNoKGUpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2Zha2VfZTgxODBlZjUuanNcIixcIi9cIil9LHtidWZmZXI6MyxjcnlwdG86NSxsWXBvSTI6MTB9XSwyOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKGUsdCxyLG8saSx1LGEsZixzKXt2YXIgYz1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjshZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChlKXt2YXIgdD1lLmNoYXJDb2RlQXQoMCk7cmV0dXJuIHQ9PT1pfHx0PT09bD82Mjp0PT09dXx8dD09PWQ/NjM6dDxhPy0xOnQ8YSsxMD90LWErMjYrMjY6dDxzKzI2P3Qtczp0PGYrMjY/dC1mKzI2OnZvaWQgMH1mdW5jdGlvbiBuKGUpe2Z1bmN0aW9uIG4oZSl7c1tsKytdPWV9dmFyIHIsaSx1LGEsZixzO2lmKGUubGVuZ3RoJTQ+MCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0XCIpO3ZhciBjPWUubGVuZ3RoO2Y9XCI9XCI9PT1lLmNoYXJBdChjLTIpPzI6XCI9XCI9PT1lLmNoYXJBdChjLTEpPzE6MCxzPW5ldyBvKDMqZS5sZW5ndGgvNC1mKSx1PWY+MD9lLmxlbmd0aC00OmUubGVuZ3RoO3ZhciBsPTA7Zm9yKHI9MCxpPTA7cjx1O3IrPTQsaSs9MylhPXQoZS5jaGFyQXQocikpPDwxOHx0KGUuY2hhckF0KHIrMSkpPDwxMnx0KGUuY2hhckF0KHIrMikpPDw2fHQoZS5jaGFyQXQociszKSksbigoMTY3MTE2ODAmYSk+PjE2KSxuKCg2NTI4MCZhKT4+OCksbigyNTUmYSk7cmV0dXJuIDI9PT1mPyhhPXQoZS5jaGFyQXQocikpPDwyfHQoZS5jaGFyQXQocisxKSk+PjQsbigyNTUmYSkpOjE9PT1mJiYoYT10KGUuY2hhckF0KHIpKTw8MTB8dChlLmNoYXJBdChyKzEpKTw8NHx0KGUuY2hhckF0KHIrMikpPj4yLG4oYT4+OCYyNTUpLG4oMjU1JmEpKSxzfWZ1bmN0aW9uIHIoZSl7ZnVuY3Rpb24gdChlKXtyZXR1cm4gYy5jaGFyQXQoZSl9ZnVuY3Rpb24gbihlKXtyZXR1cm4gdChlPj4xOCY2MykrdChlPj4xMiY2MykrdChlPj42JjYzKSt0KDYzJmUpfXZhciByLG8saSx1PWUubGVuZ3RoJTMsYT1cIlwiO2ZvcihyPTAsaT1lLmxlbmd0aC11O3I8aTtyKz0zKW89KGVbcl08PDE2KSsoZVtyKzFdPDw4KStlW3IrMl0sYSs9bihvKTtzd2l0Y2godSl7Y2FzZSAxOm89ZVtlLmxlbmd0aC0xXSxhKz10KG8+PjIpLGErPXQobzw8NCY2MyksYSs9XCI9PVwiO2JyZWFrO2Nhc2UgMjpvPShlW2UubGVuZ3RoLTJdPDw4KStlW2UubGVuZ3RoLTFdLGErPXQobz4+MTApLGErPXQobz4+NCY2MyksYSs9dChvPDwyJjYzKSxhKz1cIj1cIn1yZXR1cm4gYX12YXIgbz1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheT9VaW50OEFycmF5OkFycmF5LGk9XCIrXCIuY2hhckNvZGVBdCgwKSx1PVwiL1wiLmNoYXJDb2RlQXQoMCksYT1cIjBcIi5jaGFyQ29kZUF0KDApLGY9XCJhXCIuY2hhckNvZGVBdCgwKSxzPVwiQVwiLmNoYXJDb2RlQXQoMCksbD1cIi1cIi5jaGFyQ29kZUF0KDApLGQ9XCJfXCIuY2hhckNvZGVBdCgwKTtlLnRvQnl0ZUFycmF5PW4sZS5mcm9tQnl0ZUFycmF5PXJ9KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuP3RoaXMuYmFzZTY0anM9e306bil9KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWJcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSwzOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHQscixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBvKGUsdCxuKXtpZighKHRoaXMgaW5zdGFuY2VvZiBvKSlyZXR1cm4gbmV3IG8oZSx0LG4pO3ZhciByPXR5cGVvZiBlO2lmKFwiYmFzZTY0XCI9PT10JiZcInN0cmluZ1wiPT09cilmb3IoZT1OKGUpO2UubGVuZ3RoJTQhPT0wOyllKz1cIj1cIjt2YXIgaTtpZihcIm51bWJlclwiPT09cilpPUYoZSk7ZWxzZSBpZihcInN0cmluZ1wiPT09cilpPW8uYnl0ZUxlbmd0aChlLHQpO2Vsc2V7aWYoXCJvYmplY3RcIiE9PXIpdGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy5cIik7aT1GKGUubGVuZ3RoKX12YXIgdTtvLl91c2VUeXBlZEFycmF5cz91PW8uX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkoaSkpOih1PXRoaXMsdS5sZW5ndGg9aSx1Ll9pc0J1ZmZlcj0hMCk7dmFyIGE7aWYoby5fdXNlVHlwZWRBcnJheXMmJlwibnVtYmVyXCI9PXR5cGVvZiBlLmJ5dGVMZW5ndGgpdS5fc2V0KGUpO2Vsc2UgaWYoTyhlKSlmb3IoYT0wO2E8aTthKyspby5pc0J1ZmZlcihlKT91W2FdPWUucmVhZFVJbnQ4KGEpOnVbYV09ZVthXTtlbHNlIGlmKFwic3RyaW5nXCI9PT1yKXUud3JpdGUoZSwwLHQpO2Vsc2UgaWYoXCJudW1iZXJcIj09PXImJiFvLl91c2VUeXBlZEFycmF5cyYmIW4pZm9yKGE9MDthPGk7YSsrKXVbYV09MDtyZXR1cm4gdX1mdW5jdGlvbiBsKGUsdCxuLHIpe249TnVtYmVyKG4pfHwwO3ZhciBpPWUubGVuZ3RoLW47cj8ocj1OdW1iZXIocikscj5pJiYocj1pKSk6cj1pO3ZhciB1PXQubGVuZ3RoOyQodSUyPT09MCxcIkludmFsaWQgaGV4IHN0cmluZ1wiKSxyPnUvMiYmKHI9dS8yKTtmb3IodmFyIGE9MDthPHI7YSsrKXt2YXIgZj1wYXJzZUludCh0LnN1YnN0cigyKmEsMiksMTYpOyQoIWlzTmFOKGYpLFwiSW52YWxpZCBoZXggc3RyaW5nXCIpLGVbbithXT1mfXJldHVybiBvLl9jaGFyc1dyaXR0ZW49MiphLGF9ZnVuY3Rpb24gZChlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhWKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiBoKGUsdCxuLHIpe3ZhciBpPW8uX2NoYXJzV3JpdHRlbj1XKHEodCksZSxuLHIpO3JldHVybiBpfWZ1bmN0aW9uIHAoZSx0LG4scil7cmV0dXJuIGgoZSx0LG4scil9ZnVuY3Rpb24gZyhlLHQsbixyKXt2YXIgaT1vLl9jaGFyc1dyaXR0ZW49VyhSKHQpLGUsbixyKTtyZXR1cm4gaX1mdW5jdGlvbiB5KGUsdCxuLHIpe3ZhciBpPW8uX2NoYXJzV3JpdHRlbj1XKFAodCksZSxuLHIpO3JldHVybiBpfWZ1bmN0aW9uIHcoZSx0LG4pe3JldHVybiAwPT09dCYmbj09PWUubGVuZ3RoP0cuZnJvbUJ5dGVBcnJheShlKTpHLmZyb21CeXRlQXJyYXkoZS5zbGljZSh0LG4pKX1mdW5jdGlvbiBiKGUsdCxuKXt2YXIgcj1cIlwiLG89XCJcIjtuPU1hdGgubWluKGUubGVuZ3RoLG4pO2Zvcih2YXIgaT10O2k8bjtpKyspZVtpXTw9MTI3PyhyKz1KKG8pK1N0cmluZy5mcm9tQ2hhckNvZGUoZVtpXSksbz1cIlwiKTpvKz1cIiVcIitlW2ldLnRvU3RyaW5nKDE2KTtyZXR1cm4gcitKKG8pfWZ1bmN0aW9uIHYoZSx0LG4pe3ZhciByPVwiXCI7bj1NYXRoLm1pbihlLmxlbmd0aCxuKTtmb3IodmFyIG89dDtvPG47bysrKXIrPVN0cmluZy5mcm9tQ2hhckNvZGUoZVtvXSk7cmV0dXJuIHJ9ZnVuY3Rpb24gbShlLHQsbil7cmV0dXJuIHYoZSx0LG4pfWZ1bmN0aW9uIF8oZSx0LG4pe3ZhciByPWUubGVuZ3RoOyghdHx8dDwwKSYmKHQ9MCksKCFufHxuPDB8fG4+cikmJihuPXIpO2Zvcih2YXIgbz1cIlwiLGk9dDtpPG47aSsrKW8rPUgoZVtpXSk7cmV0dXJuIG99ZnVuY3Rpb24gRShlLHQsbil7Zm9yKHZhciByPWUuc2xpY2UodCxuKSxvPVwiXCIsaT0wO2k8ci5sZW5ndGg7aSs9MilvKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHJbaV0rMjU2KnJbaSsxXSk7cmV0dXJuIG99ZnVuY3Rpb24gSShlLHQsbixyKXtyfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQrMTxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbz1lLmxlbmd0aDtpZighKHQ+PW8pKXt2YXIgaTtyZXR1cm4gbj8oaT1lW3RdLHQrMTxvJiYoaXw9ZVt0KzFdPDw4KSk6KGk9ZVt0XTw8OCx0KzE8byYmKGl8PWVbdCsxXSkpLGl9fWZ1bmN0aW9uIEEoZSx0LG4scil7cnx8KCQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG89ZS5sZW5ndGg7aWYoISh0Pj1vKSl7dmFyIGk7cmV0dXJuIG4/KHQrMjxvJiYoaT1lW3QrMl08PDE2KSx0KzE8byYmKGl8PWVbdCsxXTw8OCksaXw9ZVt0XSx0KzM8byYmKGkrPWVbdCszXTw8MjQ+Pj4wKSk6KHQrMTxvJiYoaT1lW3QrMV08PDE2KSx0KzI8byYmKGl8PWVbdCsyXTw8OCksdCszPG8mJihpfD1lW3QrM10pLGkrPWVbdF08PDI0Pj4+MCksaX19ZnVuY3Rpb24gQihlLHQsbixyKXtyfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQrMTxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbz1lLmxlbmd0aDtpZighKHQ+PW8pKXt2YXIgaT1JKGUsdCxuLCEwKSx1PTMyNzY4Jmk7cmV0dXJuIHU/KDY1NTM1LWkrMSkqLTE6aX19ZnVuY3Rpb24gTChlLHQsbixyKXtyfHwoJChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSwkKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbz1lLmxlbmd0aDtpZighKHQ+PW8pKXt2YXIgaT1BKGUsdCxuLCEwKSx1PTIxNDc0ODM2NDgmaTtyZXR1cm4gdT8oNDI5NDk2NzI5NS1pKzEpKi0xOml9fWZ1bmN0aW9uIFUoZSx0LG4scil7cmV0dXJuIHJ8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksUS5yZWFkKGUsdCxuLDIzLDQpfWZ1bmN0aW9uIHgoZSx0LG4scil7cmV0dXJuIHJ8fCgkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh0Kzc8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksUS5yZWFkKGUsdCxuLDUyLDgpfWZ1bmN0aW9uIFMoZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMTxlLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxLKHQsNjU1MzUpKTt2YXIgaT1lLmxlbmd0aDtpZighKG4+PWkpKWZvcih2YXIgdT0wLGE9TWF0aC5taW4oaS1uLDIpO3U8YTt1KyspZVtuK3VdPSh0JjI1NTw8OCoocj91OjEtdSkpPj4+OCoocj91OjEtdSl9ZnVuY3Rpb24gaihlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobiszPGUubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEsodCw0Mjk0OTY3Mjk1KSk7dmFyIGk9ZS5sZW5ndGg7aWYoIShuPj1pKSlmb3IodmFyIHU9MCxhPU1hdGgubWluKGktbiw0KTt1PGE7dSsrKWVbbit1XT10Pj4+OCoocj91OjMtdSkmMjU1fWZ1bmN0aW9uIEMoZSx0LG4scixvKXtvfHwoJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksJChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLCQodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSwkKG4rMTxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSx6KHQsMzI3NjcsLTMyNzY4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8KHQ+PTA/UyhlLHQsbixyLG8pOlMoZSw2NTUzNSt0KzEsbixyLG8pKX1mdW5jdGlvbiBrKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseih0LDIxNDc0ODM2NDcsLTIxNDc0ODM2NDgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHwodD49MD9qKGUsdCxuLHIsbyk6aihlLDQyOTQ5NjcyOTUrdCsxLG4scixvKSl9ZnVuY3Rpb24gVChlLHQsbixyLG8pe298fCgkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSwkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksJCh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLCQobiszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFgodCwzLjQwMjgyMzQ2NjM4NTI4ODZlMzgsLTMuNDAyODIzNDY2Mzg1Mjg4NmUzOCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fFEud3JpdGUoZSx0LG4sciwyMyw0KX1mdW5jdGlvbiBNKGUsdCxuLHIsbyl7b3x8KCQodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLCQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSwkKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksJChuKzc8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWCh0LDEuNzk3NjkzMTM0ODYyMzE1N2UzMDgsLTEuNzk3NjkzMTM0ODYyMzE1N2UzMDgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHxRLndyaXRlKGUsdCxuLHIsNTIsOCl9ZnVuY3Rpb24gTihlKXtyZXR1cm4gZS50cmltP2UudHJpbSgpOmUucmVwbGFjZSgvXlxccyt8XFxzKyQvZyxcIlwiKX1mdW5jdGlvbiBZKGUsdCxuKXtyZXR1cm5cIm51bWJlclwiIT10eXBlb2YgZT9uOihlPX5+ZSxlPj10P3Q6ZT49MD9lOihlKz10LGU+PTA/ZTowKSl9ZnVuY3Rpb24gRihlKXtyZXR1cm4gZT1+fk1hdGguY2VpbCgrZSksZTwwPzA6ZX1mdW5jdGlvbiBEKGUpe3JldHVybihBcnJheS5pc0FycmF5fHxmdW5jdGlvbihlKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9KShlKX1mdW5jdGlvbiBPKGUpe3JldHVybiBEKGUpfHxvLmlzQnVmZmVyKGUpfHxlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmXCJudW1iZXJcIj09dHlwZW9mIGUubGVuZ3RofWZ1bmN0aW9uIEgoZSl7cmV0dXJuIGU8MTY/XCIwXCIrZS50b1N0cmluZygxNik6ZS50b1N0cmluZygxNil9ZnVuY3Rpb24gVihlKXtmb3IodmFyIHQ9W10sbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lLmNoYXJDb2RlQXQobik7aWYocjw9MTI3KXQucHVzaChlLmNoYXJDb2RlQXQobikpO2Vsc2V7dmFyIG89bjtyPj01NTI5NiYmcjw9NTczNDMmJm4rKztmb3IodmFyIGk9ZW5jb2RlVVJJQ29tcG9uZW50KGUuc2xpY2UobyxuKzEpKS5zdWJzdHIoMSkuc3BsaXQoXCIlXCIpLHU9MDt1PGkubGVuZ3RoO3UrKyl0LnB1c2gocGFyc2VJbnQoaVt1XSwxNikpfX1yZXR1cm4gdH1mdW5jdGlvbiBxKGUpe2Zvcih2YXIgdD1bXSxuPTA7bjxlLmxlbmd0aDtuKyspdC5wdXNoKDI1NSZlLmNoYXJDb2RlQXQobikpO3JldHVybiB0fWZ1bmN0aW9uIFAoZSl7Zm9yKHZhciB0LG4scixvPVtdLGk9MDtpPGUubGVuZ3RoO2krKyl0PWUuY2hhckNvZGVBdChpKSxuPXQ+Pjgscj10JTI1NixvLnB1c2gociksby5wdXNoKG4pO3JldHVybiBvfWZ1bmN0aW9uIFIoZSl7cmV0dXJuIEcudG9CeXRlQXJyYXkoZSl9ZnVuY3Rpb24gVyhlLHQsbixyKXtmb3IodmFyIG89MDtvPHImJiEobytuPj10Lmxlbmd0aHx8bz49ZS5sZW5ndGgpO28rKyl0W28rbl09ZVtvXTtyZXR1cm4gb31mdW5jdGlvbiBKKGUpe3RyeXtyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGUpfWNhdGNoKHQpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1NTMzKX19ZnVuY3Rpb24gSyhlLHQpeyQoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLCQoZT49MCxcInNwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlXCIpLCQoZTw9dCxcInZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGVcIiksJChNYXRoLmZsb29yKGUpPT09ZSxcInZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50XCIpfWZ1bmN0aW9uIHooZSx0LG4peyQoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLCQoZTw9dCxcInZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZVwiKSwkKGU+PW4sXCJ2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlXCIpLCQoTWF0aC5mbG9vcihlKT09PWUsXCJ2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudFwiKX1mdW5jdGlvbiBYKGUsdCxuKXskKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSwkKGU8PXQsXCJ2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcIiksJChlPj1uLFwidmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVwiKX1mdW5jdGlvbiAkKGUsdCl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKHR8fFwiRmFpbGVkIGFzc2VydGlvblwiKX12YXIgRz1lKFwiYmFzZTY0LWpzXCIpLFE9ZShcImllZWU3NTRcIik7bi5CdWZmZXI9byxuLlNsb3dCdWZmZXI9byxuLklOU1BFQ1RfTUFYX0JZVEVTPTUwLG8ucG9vbFNpemU9ODE5MixvLl91c2VUeXBlZEFycmF5cz1mdW5jdGlvbigpe3RyeXt2YXIgZT1uZXcgQXJyYXlCdWZmZXIoMCksdD1uZXcgVWludDhBcnJheShlKTtyZXR1cm4gdC5mb289ZnVuY3Rpb24oKXtyZXR1cm4gNDJ9LDQyPT09dC5mb28oKSYmXCJmdW5jdGlvblwiPT10eXBlb2YgdC5zdWJhcnJheX1jYXRjaChuKXtyZXR1cm4hMX19KCksby5pc0VuY29kaW5nPWZ1bmN0aW9uKGUpe3N3aXRjaChTdHJpbmcoZSkudG9Mb3dlckNhc2UoKSl7Y2FzZVwiaGV4XCI6Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6Y2FzZVwiYXNjaWlcIjpjYXNlXCJiaW5hcnlcIjpjYXNlXCJiYXNlNjRcIjpjYXNlXCJyYXdcIjpjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpyZXR1cm4hMDtkZWZhdWx0OnJldHVybiExfX0sby5pc0J1ZmZlcj1mdW5jdGlvbihlKXtyZXR1cm4hKG51bGw9PT1lfHx2b2lkIDA9PT1lfHwhZS5faXNCdWZmZXIpfSxvLmJ5dGVMZW5ndGg9ZnVuY3Rpb24oZSx0KXt2YXIgbjtzd2l0Y2goZSs9XCJcIix0fHxcInV0ZjhcIil7Y2FzZVwiaGV4XCI6bj1lLmxlbmd0aC8yO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOm49VihlKS5sZW5ndGg7YnJlYWs7Y2FzZVwiYXNjaWlcIjpjYXNlXCJiaW5hcnlcIjpjYXNlXCJyYXdcIjpuPWUubGVuZ3RoO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm49UihlKS5sZW5ndGg7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6bj0yKmUubGVuZ3RoO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gbn0sby5jb25jYXQ9ZnVuY3Rpb24oZSx0KXtpZigkKEQoZSksXCJVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbmxpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LlwiKSwwPT09ZS5sZW5ndGgpcmV0dXJuIG5ldyBvKDApO2lmKDE9PT1lLmxlbmd0aClyZXR1cm4gZVswXTt2YXIgbjtpZihcIm51bWJlclwiIT10eXBlb2YgdClmb3IodD0wLG49MDtuPGUubGVuZ3RoO24rKyl0Kz1lW25dLmxlbmd0aDt2YXIgcj1uZXcgbyh0KSxpPTA7Zm9yKG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHU9ZVtuXTt1LmNvcHkocixpKSxpKz11Lmxlbmd0aH1yZXR1cm4gcn0sby5wcm90b3R5cGUud3JpdGU9ZnVuY3Rpb24oZSx0LG4scil7aWYoaXNGaW5pdGUodCkpaXNGaW5pdGUobil8fChyPW4sbj12b2lkIDApO2Vsc2V7dmFyIG89cjtyPXQsdD1uLG49b310PU51bWJlcih0KXx8MDt2YXIgaT10aGlzLmxlbmd0aC10O24/KG49TnVtYmVyKG4pLG4+aSYmKG49aSkpOm49aSxyPVN0cmluZyhyfHxcInV0ZjhcIikudG9Mb3dlckNhc2UoKTt2YXIgdTtzd2l0Y2gocil7Y2FzZVwiaGV4XCI6dT1sKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOnU9ZCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJhc2NpaVwiOnU9aCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJiaW5hcnlcIjp1PXAodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6dT1nKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnU9eSh0aGlzLGUsdCxuKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIHV9LG8ucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKGUsdCxuKXt2YXIgcj10aGlzO2lmKGU9U3RyaW5nKGV8fFwidXRmOFwiKS50b0xvd2VyQ2FzZSgpLHQ9TnVtYmVyKHQpfHwwLG49dm9pZCAwIT09bj9OdW1iZXIobik6bj1yLmxlbmd0aCxuPT09dClyZXR1cm5cIlwiO3ZhciBvO3N3aXRjaChlKXtjYXNlXCJoZXhcIjpvPV8ocix0LG4pO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOm89YihyLHQsbik7YnJlYWs7Y2FzZVwiYXNjaWlcIjpvPXYocix0LG4pO2JyZWFrO2Nhc2VcImJpbmFyeVwiOm89bShyLHQsbik7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6bz13KHIsdCxuKTticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpvPUUocix0LG4pO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gb30sby5wcm90b3R5cGUudG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJue3R5cGU6XCJCdWZmZXJcIixkYXRhOkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2Fycnx8dGhpcywwKX19LG8ucHJvdG90eXBlLmNvcHk9ZnVuY3Rpb24oZSx0LG4scil7dmFyIGk9dGhpcztpZihufHwobj0wKSxyfHwwPT09cnx8KHI9dGhpcy5sZW5ndGgpLHR8fCh0PTApLHIhPT1uJiYwIT09ZS5sZW5ndGgmJjAhPT1pLmxlbmd0aCl7JChyPj1uLFwic291cmNlRW5kIDwgc291cmNlU3RhcnRcIiksJCh0Pj0wJiZ0PGUubGVuZ3RoLFwidGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kc1wiKSwkKG4+PTAmJm48aS5sZW5ndGgsXCJzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzXCIpLCQocj49MCYmcjw9aS5sZW5ndGgsXCJzb3VyY2VFbmQgb3V0IG9mIGJvdW5kc1wiKSxyPnRoaXMubGVuZ3RoJiYocj10aGlzLmxlbmd0aCksZS5sZW5ndGgtdDxyLW4mJihyPWUubGVuZ3RoLXQrbik7dmFyIHU9ci1uO2lmKHU8MTAwfHwhby5fdXNlVHlwZWRBcnJheXMpZm9yKHZhciBhPTA7YTx1O2ErKyllW2ErdF09dGhpc1thK25dO2Vsc2UgZS5fc2V0KHRoaXMuc3ViYXJyYXkobixuK3UpLHQpfX0sby5wcm90b3R5cGUuc2xpY2U9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLmxlbmd0aDtpZihlPVkoZSxuLDApLHQ9WSh0LG4sbiksby5fdXNlVHlwZWRBcnJheXMpcmV0dXJuIG8uX2F1Z21lbnQodGhpcy5zdWJhcnJheShlLHQpKTtmb3IodmFyIHI9dC1lLGk9bmV3IG8ociwodm9pZCAwKSwoITApKSx1PTA7dTxyO3UrKylpW3VdPXRoaXNbdStlXTtyZXR1cm4gaX0sby5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGUpe3JldHVybiBjb25zb2xlLmxvZyhcIi5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLlwiKSx0aGlzLnJlYWRVSW50OChlKX0sby5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGNvbnNvbGUubG9nKFwiLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuXCIpLHRoaXMud3JpdGVVSW50OChlLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDg9ZnVuY3Rpb24oZSx0KXtpZih0fHwoJCh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQoZTx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGU+PXRoaXMubGVuZ3RoKSlyZXR1cm4gdGhpc1tlXX0sby5wcm90b3R5cGUucmVhZFVJbnQxNkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEkodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDE2QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gSSh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50MzJMRT1mdW5jdGlvbihlLHQpe3JldHVybiBBKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQzMkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEEodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50OD1mdW5jdGlvbihlLHQpe2lmKHR8fCgkKHZvaWQgMCE9PWUmJm51bGwhPT1lLFwibWlzc2luZyBvZmZzZXRcIiksJChlPHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZT49dGhpcy5sZW5ndGgpKXt2YXIgbj0xMjgmdGhpc1tlXTtyZXR1cm4gbj8oMjU1LXRoaXNbZV0rMSkqLTE6dGhpc1tlXX19LG8ucHJvdG90eXBlLnJlYWRJbnQxNkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEIodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBCKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZEludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gTCh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQzMkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkRmxvYXRMRT1mdW5jdGlvbihlLHQpe3JldHVybiBVKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZEZsb2F0QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gVSh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWREb3VibGVMRT1mdW5jdGlvbihlLHQpe3JldHVybiB4KHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZERvdWJsZUJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHgodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS53cml0ZVVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoJCh2b2lkIDAhPT1lJiZudWxsIT09ZSxcIm1pc3NpbmcgdmFsdWVcIiksJCh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLCQodDx0aGlzLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxLKGUsMjU1KSksdD49dGhpcy5sZW5ndGh8fCh0aGlzW3RdPWUpfSxvLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFPWZ1bmN0aW9uKGUsdCxuKXtTKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFPWZ1bmN0aW9uKGUsdCxuKXtTKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFPWZ1bmN0aW9uKGUsdCxuKXtqKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxuKXtqKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDg9ZnVuY3Rpb24oZSx0LG4pe258fCgkKHZvaWQgMCE9PWUmJm51bGwhPT1lLFwibWlzc2luZyB2YWx1ZVwiKSwkKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksJCh0PHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLHooZSwxMjcsLTEyOCkpLHQ+PXRoaXMubGVuZ3RofHwoZT49MD90aGlzLndyaXRlVUludDgoZSx0LG4pOnRoaXMud3JpdGVVSW50OCgyNTUrZSsxLHQsbikpfSxvLnByb3RvdHlwZS53cml0ZUludDE2TEU9ZnVuY3Rpb24oZSx0LG4pe0ModGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlSW50MTZCRT1mdW5jdGlvbihlLHQsbil7Qyh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQzMkxFPWZ1bmN0aW9uKGUsdCxuKXtrKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDMyQkU9ZnVuY3Rpb24oZSx0LG4pe2sodGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlRmxvYXRMRT1mdW5jdGlvbihlLHQsbil7VCh0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVGbG9hdEJFPWZ1bmN0aW9uKGUsdCxuKXtUKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZURvdWJsZUxFPWZ1bmN0aW9uKGUsdCxuKXtNKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZURvdWJsZUJFPWZ1bmN0aW9uKGUsdCxuKXtNKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS5maWxsPWZ1bmN0aW9uKGUsdCxuKXtpZihlfHwoZT0wKSx0fHwodD0wKSxufHwobj10aGlzLmxlbmd0aCksXCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPWUuY2hhckNvZGVBdCgwKSksJChcIm51bWJlclwiPT10eXBlb2YgZSYmIWlzTmFOKGUpLFwidmFsdWUgaXMgbm90IGEgbnVtYmVyXCIpLCQobj49dCxcImVuZCA8IHN0YXJ0XCIpLG4hPT10JiYwIT09dGhpcy5sZW5ndGgpeyQodD49MCYmdDx0aGlzLmxlbmd0aCxcInN0YXJ0IG91dCBvZiBib3VuZHNcIiksJChuPj0wJiZuPD10aGlzLmxlbmd0aCxcImVuZCBvdXQgb2YgYm91bmRzXCIpO2Zvcih2YXIgcj10O3I8bjtyKyspdGhpc1tyXT1lfX0sby5wcm90b3R5cGUuaW5zcGVjdD1mdW5jdGlvbigpe2Zvcih2YXIgZT1bXSx0PXRoaXMubGVuZ3RoLHI9MDtyPHQ7cisrKWlmKGVbcl09SCh0aGlzW3JdKSxyPT09bi5JTlNQRUNUX01BWF9CWVRFUyl7ZVtyKzFdPVwiLi4uXCI7YnJlYWt9cmV0dXJuXCI8QnVmZmVyIFwiK2Uuam9pbihcIiBcIikrXCI+XCJ9LG8ucHJvdG90eXBlLnRvQXJyYXlCdWZmZXI9ZnVuY3Rpb24oKXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSl7aWYoby5fdXNlVHlwZWRBcnJheXMpcmV0dXJuIG5ldyBvKHRoaXMpLmJ1ZmZlcjtmb3IodmFyIGU9bmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpLHQ9MCxuPWUubGVuZ3RoO3Q8bjt0Kz0xKWVbdF09dGhpc1t0XTtyZXR1cm4gZS5idWZmZXJ9dGhyb3cgbmV3IEVycm9yKFwiQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIil9O3ZhciBaPW8ucHJvdG90eXBlO28uX2F1Z21lbnQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGUuX2lzQnVmZmVyPSEwLGUuX2dldD1lLmdldCxlLl9zZXQ9ZS5zZXQsZS5nZXQ9Wi5nZXQsZS5zZXQ9Wi5zZXQsZS53cml0ZT1aLndyaXRlLGUudG9TdHJpbmc9Wi50b1N0cmluZyxlLnRvTG9jYWxlU3RyaW5nPVoudG9TdHJpbmcsZS50b0pTT049Wi50b0pTT04sZS5jb3B5PVouY29weSxlLnNsaWNlPVouc2xpY2UsZS5yZWFkVUludDg9Wi5yZWFkVUludDgsZS5yZWFkVUludDE2TEU9Wi5yZWFkVUludDE2TEUsZS5yZWFkVUludDE2QkU9Wi5yZWFkVUludDE2QkUsZS5yZWFkVUludDMyTEU9Wi5yZWFkVUludDMyTEUsZS5yZWFkVUludDMyQkU9Wi5yZWFkVUludDMyQkUsZS5yZWFkSW50OD1aLnJlYWRJbnQ4LGUucmVhZEludDE2TEU9Wi5yZWFkSW50MTZMRSxlLnJlYWRJbnQxNkJFPVoucmVhZEludDE2QkUsZS5yZWFkSW50MzJMRT1aLnJlYWRJbnQzMkxFLGUucmVhZEludDMyQkU9Wi5yZWFkSW50MzJCRSxlLnJlYWRGbG9hdExFPVoucmVhZEZsb2F0TEUsZS5yZWFkRmxvYXRCRT1aLnJlYWRGbG9hdEJFLGUucmVhZERvdWJsZUxFPVoucmVhZERvdWJsZUxFLGUucmVhZERvdWJsZUJFPVoucmVhZERvdWJsZUJFLGUud3JpdGVVSW50OD1aLndyaXRlVUludDgsZS53cml0ZVVJbnQxNkxFPVoud3JpdGVVSW50MTZMRSxlLndyaXRlVUludDE2QkU9Wi53cml0ZVVJbnQxNkJFLGUud3JpdGVVSW50MzJMRT1aLndyaXRlVUludDMyTEUsZS53cml0ZVVJbnQzMkJFPVoud3JpdGVVSW50MzJCRSxlLndyaXRlSW50OD1aLndyaXRlSW50OCxlLndyaXRlSW50MTZMRT1aLndyaXRlSW50MTZMRSxlLndyaXRlSW50MTZCRT1aLndyaXRlSW50MTZCRSxlLndyaXRlSW50MzJMRT1aLndyaXRlSW50MzJMRSxlLndyaXRlSW50MzJCRT1aLndyaXRlSW50MzJCRSxlLndyaXRlRmxvYXRMRT1aLndyaXRlRmxvYXRMRSxlLndyaXRlRmxvYXRCRT1aLndyaXRlRmxvYXRCRSxlLndyaXRlRG91YmxlTEU9Wi53cml0ZURvdWJsZUxFLGUud3JpdGVEb3VibGVCRT1aLndyaXRlRG91YmxlQkUsZS5maWxsPVouZmlsbCxlLmluc3BlY3Q9Wi5pbnNwZWN0LGUudG9BcnJheUJ1ZmZlcj1aLnRvQXJyYXlCdWZmZXIsZX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXJcIil9LHtcImJhc2U2NC1qc1wiOjIsYnVmZmVyOjMsaWVlZTc1NDoxMSxsWXBvSTI6MTB9XSw0OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKG4scixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBsKGUsdCl7aWYoZS5sZW5ndGglcCE9PTApe3ZhciBuPWUubGVuZ3RoKyhwLWUubGVuZ3RoJXApO2U9by5jb25jYXQoW2UsZ10sbil9Zm9yKHZhciByPVtdLGk9dD9lLnJlYWRJbnQzMkJFOmUucmVhZEludDMyTEUsdT0wO3U8ZS5sZW5ndGg7dSs9cClyLnB1c2goaS5jYWxsKGUsdSkpO3JldHVybiByfWZ1bmN0aW9uIGQoZSx0LG4pe2Zvcih2YXIgcj1uZXcgbyh0KSxpPW4/ci53cml0ZUludDMyQkU6ci53cml0ZUludDMyTEUsdT0wO3U8ZS5sZW5ndGg7dSsrKWkuY2FsbChyLGVbdV0sNCp1LCEwKTtyZXR1cm4gcn1mdW5jdGlvbiBoKGUsdCxuLHIpe28uaXNCdWZmZXIoZSl8fChlPW5ldyBvKGUpKTt2YXIgaT10KGwoZSxyKSxlLmxlbmd0aCp5KTtyZXR1cm4gZChpLG4scil9dmFyIG89ZShcImJ1ZmZlclwiKS5CdWZmZXIscD00LGc9bmV3IG8ocCk7Zy5maWxsKDApO3ZhciB5PTg7dC5leHBvcnRzPXtoYXNoOmh9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaGVscGVycy5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV0sNTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbih0LHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQsbil7by5pc0J1ZmZlcih0KXx8KHQ9bmV3IG8odCkpLG8uaXNCdWZmZXIobil8fChuPW5ldyBvKG4pKSx0Lmxlbmd0aD5tP3Q9ZSh0KTp0Lmxlbmd0aDxtJiYodD1vLmNvbmNhdChbdCxfXSxtKSk7Zm9yKHZhciByPW5ldyBvKG0pLGk9bmV3IG8obSksdT0wO3U8bTt1Kyspclt1XT01NF50W3VdLGlbdV09OTJedFt1XTt2YXIgYT1lKG8uY29uY2F0KFtyLG5dKSk7cmV0dXJuIGUoby5jb25jYXQoW2ksYV0pKX1mdW5jdGlvbiBkKGUsdCl7ZT1lfHxcInNoYTFcIjt2YXIgbj12W2VdLHI9W10saT0wO3JldHVybiBufHxoKFwiYWxnb3JpdGhtOlwiLGUsXCJpcyBub3QgeWV0IHN1cHBvcnRlZFwiKSx7dXBkYXRlOmZ1bmN0aW9uKGUpe3JldHVybiBvLmlzQnVmZmVyKGUpfHwoZT1uZXcgbyhlKSksci5wdXNoKGUpLGkrPWUubGVuZ3RoLHRoaXN9LGRpZ2VzdDpmdW5jdGlvbihlKXt2YXIgaT1vLmNvbmNhdChyKSx1PXQ/bChuLHQsaSk6bihpKTtyZXR1cm4gcj1udWxsLGU/dS50b1N0cmluZyhlKTp1fX19ZnVuY3Rpb24gaCgpe3ZhciBlPVtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKFwiIFwiKTt0aHJvdyBuZXcgRXJyb3IoW2UsXCJ3ZSBhY2NlcHQgcHVsbCByZXF1ZXN0c1wiLFwiaHR0cDovL2dpdGh1Yi5jb20vZG9taW5pY3RhcnIvY3J5cHRvLWJyb3dzZXJpZnlcIl0uam9pbihcIlxcblwiKSl9ZnVuY3Rpb24gcChlLHQpe2Zvcih2YXIgbiBpbiBlKXQoZVtuXSxuKX12YXIgbz1lKFwiYnVmZmVyXCIpLkJ1ZmZlcixnPWUoXCIuL3NoYVwiKSx5PWUoXCIuL3NoYTI1NlwiKSx3PWUoXCIuL3JuZ1wiKSxiPWUoXCIuL21kNVwiKSx2PXtzaGExOmcsc2hhMjU2OnksbWQ1OmJ9LG09NjQsXz1uZXcgbyhtKTtfLmZpbGwoMCksbi5jcmVhdGVIYXNoPWZ1bmN0aW9uKGUpe3JldHVybiBkKGUpfSxuLmNyZWF0ZUhtYWM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZChlLHQpfSxuLnJhbmRvbUJ5dGVzPWZ1bmN0aW9uKGUsdCl7aWYoIXR8fCF0LmNhbGwpcmV0dXJuIG5ldyBvKHcoZSkpO3RyeXt0LmNhbGwodGhpcyx2b2lkIDAsbmV3IG8odyhlKSkpfWNhdGNoKG4pe3Qobil9fSxwKFtcImNyZWF0ZUNyZWRlbnRpYWxzXCIsXCJjcmVhdGVDaXBoZXJcIixcImNyZWF0ZUNpcGhlcml2XCIsXCJjcmVhdGVEZWNpcGhlclwiLFwiY3JlYXRlRGVjaXBoZXJpdlwiLFwiY3JlYXRlU2lnblwiLFwiY3JlYXRlVmVyaWZ5XCIsXCJjcmVhdGVEaWZmaWVIZWxsbWFuXCIsXCJwYmtkZjJcIl0sZnVuY3Rpb24oZSl7bltlXT1mdW5jdGlvbigpe2goXCJzb3JyeSxcIixlLFwiaXMgbm90IGltcGxlbWVudGVkIHlldFwiKX19KX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vbWQ1XCI6NixcIi4vcm5nXCI6NyxcIi4vc2hhXCI6OCxcIi4vc2hhMjU2XCI6OSxidWZmZXI6MyxsWXBvSTI6MTB9XSw2OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKG4scixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBsKGUsdCl7ZVt0Pj41XXw9MTI4PDx0JTMyLGVbKHQrNjQ+Pj45PDw0KSsxNF09dDtmb3IodmFyIG49MTczMjU4NDE5MyxyPS0yNzE3MzM4Nzksbz0tMTczMjU4NDE5NCxpPTI3MTczMzg3OCx1PTA7dTxlLmxlbmd0aDt1Kz0xNil7dmFyIGE9bixmPXIscz1vLGM9aTtuPWgobixyLG8saSxlW3UrMF0sNywtNjgwODc2OTM2KSxpPWgoaSxuLHIsbyxlW3UrMV0sMTIsLTM4OTU2NDU4Niksbz1oKG8saSxuLHIsZVt1KzJdLDE3LDYwNjEwNTgxOSkscj1oKHIsbyxpLG4sZVt1KzNdLDIyLC0xMDQ0NTI1MzMwKSxuPWgobixyLG8saSxlW3UrNF0sNywtMTc2NDE4ODk3KSxpPWgoaSxuLHIsbyxlW3UrNV0sMTIsMTIwMDA4MDQyNiksbz1oKG8saSxuLHIsZVt1KzZdLDE3LC0xNDczMjMxMzQxKSxyPWgocixvLGksbixlW3UrN10sMjIsLTQ1NzA1OTgzKSxuPWgobixyLG8saSxlW3UrOF0sNywxNzcwMDM1NDE2KSxpPWgoaSxuLHIsbyxlW3UrOV0sMTIsLTE5NTg0MTQ0MTcpLG89aChvLGksbixyLGVbdSsxMF0sMTcsLTQyMDYzKSxyPWgocixvLGksbixlW3UrMTFdLDIyLC0xOTkwNDA0MTYyKSxuPWgobixyLG8saSxlW3UrMTJdLDcsMTgwNDYwMzY4MiksaT1oKGksbixyLG8sZVt1KzEzXSwxMiwtNDAzNDExMDEpLG89aChvLGksbixyLGVbdSsxNF0sMTcsLTE1MDIwMDIyOTApLHI9aChyLG8saSxuLGVbdSsxNV0sMjIsMTIzNjUzNTMyOSksbj1wKG4scixvLGksZVt1KzFdLDUsLTE2NTc5NjUxMCksaT1wKGksbixyLG8sZVt1KzZdLDksLTEwNjk1MDE2MzIpLG89cChvLGksbixyLGVbdSsxMV0sMTQsNjQzNzE3NzEzKSxyPXAocixvLGksbixlW3UrMF0sMjAsLTM3Mzg5NzMwMiksbj1wKG4scixvLGksZVt1KzVdLDUsLTcwMTU1ODY5MSksaT1wKGksbixyLG8sZVt1KzEwXSw5LDM4MDE2MDgzKSxvPXAobyxpLG4scixlW3UrMTVdLDE0LC02NjA0NzgzMzUpLHI9cChyLG8saSxuLGVbdSs0XSwyMCwtNDA1NTM3ODQ4KSxuPXAobixyLG8saSxlW3UrOV0sNSw1Njg0NDY0MzgpLGk9cChpLG4scixvLGVbdSsxNF0sOSwtMTAxOTgwMzY5MCksbz1wKG8saSxuLHIsZVt1KzNdLDE0LC0xODczNjM5NjEpLHI9cChyLG8saSxuLGVbdSs4XSwyMCwxMTYzNTMxNTAxKSxuPXAobixyLG8saSxlW3UrMTNdLDUsLTE0NDQ2ODE0NjcpLGk9cChpLG4scixvLGVbdSsyXSw5LC01MTQwMzc4NCksbz1wKG8saSxuLHIsZVt1KzddLDE0LDE3MzUzMjg0NzMpLHI9cChyLG8saSxuLGVbdSsxMl0sMjAsLTE5MjY2MDc3MzQpLG49ZyhuLHIsbyxpLGVbdSs1XSw0LC0zNzg1NTgpLGk9ZyhpLG4scixvLGVbdSs4XSwxMSwtMjAyMjU3NDQ2Myksbz1nKG8saSxuLHIsZVt1KzExXSwxNiwxODM5MDMwNTYyKSxyPWcocixvLGksbixlW3UrMTRdLDIzLC0zNTMwOTU1Niksbj1nKG4scixvLGksZVt1KzFdLDQsLTE1MzA5OTIwNjApLGk9ZyhpLG4scixvLGVbdSs0XSwxMSwxMjcyODkzMzUzKSxvPWcobyxpLG4scixlW3UrN10sMTYsLTE1NTQ5NzYzMikscj1nKHIsbyxpLG4sZVt1KzEwXSwyMywtMTA5NDczMDY0MCksbj1nKG4scixvLGksZVt1KzEzXSw0LDY4MTI3OTE3NCksaT1nKGksbixyLG8sZVt1KzBdLDExLC0zNTg1MzcyMjIpLG89ZyhvLGksbixyLGVbdSszXSwxNiwtNzIyNTIxOTc5KSxyPWcocixvLGksbixlW3UrNl0sMjMsNzYwMjkxODkpLG49ZyhuLHIsbyxpLGVbdSs5XSw0LC02NDAzNjQ0ODcpLGk9ZyhpLG4scixvLGVbdSsxMl0sMTEsLTQyMTgxNTgzNSksbz1nKG8saSxuLHIsZVt1KzE1XSwxNiw1MzA3NDI1MjApLHI9ZyhyLG8saSxuLGVbdSsyXSwyMywtOTk1MzM4NjUxKSxuPXkobixyLG8saSxlW3UrMF0sNiwtMTk4NjMwODQ0KSxpPXkoaSxuLHIsbyxlW3UrN10sMTAsMTEyNjg5MTQxNSksbz15KG8saSxuLHIsZVt1KzE0XSwxNSwtMTQxNjM1NDkwNSkscj15KHIsbyxpLG4sZVt1KzVdLDIxLC01NzQzNDA1NSksbj15KG4scixvLGksZVt1KzEyXSw2LDE3MDA0ODU1NzEpLGk9eShpLG4scixvLGVbdSszXSwxMCwtMTg5NDk4NjYwNiksbz15KG8saSxuLHIsZVt1KzEwXSwxNSwtMTA1MTUyMykscj15KHIsbyxpLG4sZVt1KzFdLDIxLC0yMDU0OTIyNzk5KSxuPXkobixyLG8saSxlW3UrOF0sNiwxODczMzEzMzU5KSxpPXkoaSxuLHIsbyxlW3UrMTVdLDEwLC0zMDYxMTc0NCksbz15KG8saSxuLHIsZVt1KzZdLDE1LC0xNTYwMTk4MzgwKSxyPXkocixvLGksbixlW3UrMTNdLDIxLDEzMDkxNTE2NDkpLG49eShuLHIsbyxpLGVbdSs0XSw2LC0xNDU1MjMwNzApLGk9eShpLG4scixvLGVbdSsxMV0sMTAsLTExMjAyMTAzNzkpLG89eShvLGksbixyLGVbdSsyXSwxNSw3MTg3ODcyNTkpLHI9eShyLG8saSxuLGVbdSs5XSwyMSwtMzQzNDg1NTUxKSxuPXcobixhKSxyPXcocixmKSxvPXcobyxzKSxpPXcoaSxjKX1yZXR1cm4gQXJyYXkobixyLG8saSl9ZnVuY3Rpb24gZChlLHQsbixyLG8saSl7cmV0dXJuIHcoYih3KHcodCxlKSx3KHIsaSkpLG8pLG4pfWZ1bmN0aW9uIGgoZSx0LG4scixvLGksdSl7cmV0dXJuIGQodCZufH50JnIsZSx0LG8saSx1KX1mdW5jdGlvbiBwKGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKHQmcnxuJn5yLGUsdCxvLGksdSl9ZnVuY3Rpb24gZyhlLHQsbixyLG8saSx1KXtyZXR1cm4gZCh0Xm5ecixlLHQsbyxpLHUpfWZ1bmN0aW9uIHkoZSx0LG4scixvLGksdSl7cmV0dXJuIGQobl4odHx+ciksZSx0LG8saSx1KX1mdW5jdGlvbiB3KGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KSxyPShlPj4xNikrKHQ+PjE2KSsobj4+MTYpO3JldHVybiByPDwxNnw2NTUzNSZufWZ1bmN0aW9uIGIoZSx0KXtyZXR1cm4gZTw8dHxlPj4+MzItdH12YXIgdj1lKFwiLi9oZWxwZXJzXCIpO3QuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4gdi5oYXNoKGUsbCwxNil9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvbWQ1LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjEwfV0sNzpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLG4scixvLGksdSxhLGYscyl7IWZ1bmN0aW9uKCl7dmFyIGUsbixyPXRoaXM7ZT1mdW5jdGlvbihlKXtmb3IodmFyIHQsdCxuPW5ldyBBcnJheShlKSxyPTA7cjxlO3IrKykwPT0oMyZyKSYmKHQ9NDI5NDk2NzI5NipNYXRoLnJhbmRvbSgpKSxuW3JdPXQ+Pj4oKDMmcik8PDMpJjI1NTtyZXR1cm4gbn0sci5jcnlwdG8mJmNyeXB0by5nZXRSYW5kb21WYWx1ZXMmJihuPWZ1bmN0aW9uKGUpe3ZhciB0PW5ldyBVaW50OEFycmF5KGUpO3JldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHQpLHR9KSx0LmV4cG9ydHM9bnx8ZX0oKX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3JuZy5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7YnVmZmVyOjMsbFlwb0kyOjEwfV0sODpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihuLHIsbyxpLHUsYSxmLHMsYyl7ZnVuY3Rpb24gbChlLHQpe2VbdD4+NV18PTEyODw8MjQtdCUzMixlWyh0KzY0Pj45PDw0KSsxNV09dDtmb3IodmFyIG49QXJyYXkoODApLHI9MTczMjU4NDE5MyxvPS0yNzE3MzM4NzksaT0tMTczMjU4NDE5NCx1PTI3MTczMzg3OCxhPS0xMDA5NTg5Nzc2LGY9MDtmPGUubGVuZ3RoO2YrPTE2KXtmb3IodmFyIHM9cixjPW8sbD1pLHk9dSx3PWEsYj0wO2I8ODA7YisrKXtiPDE2P25bYl09ZVtmK2JdOm5bYl09ZyhuW2ItM11ebltiLThdXm5bYi0xNF1ebltiLTE2XSwxKTt2YXIgdj1wKHAoZyhyLDUpLGQoYixvLGksdSkpLHAocChhLG5bYl0pLGgoYikpKTthPXUsdT1pLGk9ZyhvLDMwKSxvPXIscj12fXI9cChyLHMpLG89cChvLGMpLGk9cChpLGwpLHU9cCh1LHkpLGE9cChhLHcpfXJldHVybiBBcnJheShyLG8saSx1LGEpfWZ1bmN0aW9uIGQoZSx0LG4scil7cmV0dXJuIGU8MjA/dCZufH50JnI6ZTw0MD90Xm5ecjplPDYwP3Qmbnx0JnJ8biZyOnRebl5yfWZ1bmN0aW9uIGgoZSl7cmV0dXJuIGU8MjA/MTUxODUwMDI0OTplPDQwPzE4NTk3NzUzOTM6ZTw2MD8tMTg5NDAwNzU4ODotODk5NDk3NTE0fWZ1bmN0aW9uIHAoZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpLHI9KGU+PjE2KSsodD4+MTYpKyhuPj4xNik7cmV0dXJuIHI8PDE2fDY1NTM1Jm59ZnVuY3Rpb24gZyhlLHQpe3JldHVybiBlPDx0fGU+Pj4zMi10fXZhciB5PWUoXCIuL2hlbHBlcnNcIik7dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiB5Lmhhc2goZSxsLDIwLCEwKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSw5OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKG4scixvLGksdSxhLGYscyxjKXt2YXIgbD1lKFwiLi9oZWxwZXJzXCIpLGQ9ZnVuY3Rpb24oZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpLHI9KGU+PjE2KSsodD4+MTYpKyhuPj4xNik7cmV0dXJuIHI8PDE2fDY1NTM1Jm59LGg9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+PnR8ZTw8MzItdH0scD1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+dH0sZz1mdW5jdGlvbihlLHQsbil7cmV0dXJuIGUmdF5+ZSZufSx5PWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZSZ0XmUmbl50Jm59LHc9ZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSwyKV5oKGUsMTMpXmgoZSwyMik7XG59LGI9ZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSw2KV5oKGUsMTEpXmgoZSwyNSl9LHY9ZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSw3KV5oKGUsMTgpXnAoZSwzKX0sbT1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDE3KV5oKGUsMTkpXnAoZSwxMCl9LF89ZnVuY3Rpb24oZSx0KXt2YXIgbixyLG8saSx1LGEsZixzLGMsbCxoLHAsXz1uZXcgQXJyYXkoMTExNjM1MjQwOCwxODk5NDQ3NDQxLDMwNDkzMjM0NzEsMzkyMTAwOTU3Myw5NjE5ODcxNjMsMTUwODk3MDk5MywyNDUzNjM1NzQ4LDI4NzA3NjMyMjEsMzYyNDM4MTA4MCwzMTA1OTg0MDEsNjA3MjI1Mjc4LDE0MjY4ODE5ODcsMTkyNTA3ODM4OCwyMTYyMDc4MjA2LDI2MTQ4ODgxMDMsMzI0ODIyMjU4MCwzODM1MzkwNDAxLDQwMjIyMjQ3NzQsMjY0MzQ3MDc4LDYwNDgwNzYyOCw3NzAyNTU5ODMsMTI0OTE1MDEyMiwxNTU1MDgxNjkyLDE5OTYwNjQ5ODYsMjU1NDIyMDg4MiwyODIxODM0MzQ5LDI5NTI5OTY4MDgsMzIxMDMxMzY3MSwzMzM2NTcxODkxLDM1ODQ1Mjg3MTEsMTEzOTI2OTkzLDMzODI0MTg5NSw2NjYzMDcyMDUsNzczNTI5OTEyLDEyOTQ3NTczNzIsMTM5NjE4MjI5MSwxNjk1MTgzNzAwLDE5ODY2NjEwNTEsMjE3NzAyNjM1MCwyNDU2OTU2MDM3LDI3MzA0ODU5MjEsMjgyMDMwMjQxMSwzMjU5NzMwODAwLDMzNDU3NjQ3NzEsMzUxNjA2NTgxNywzNjAwMzUyODA0LDQwOTQ1NzE5MDksMjc1NDIzMzQ0LDQzMDIyNzczNCw1MDY5NDg2MTYsNjU5MDYwNTU2LDg4Mzk5Nzg3Nyw5NTgxMzk1NzEsMTMyMjgyMjIxOCwxNTM3MDAyMDYzLDE3NDc4NzM3NzksMTk1NTU2MjIyMiwyMDI0MTA0ODE1LDIyMjc3MzA0NTIsMjM2MTg1MjQyNCwyNDI4NDM2NDc0LDI3NTY3MzQxODcsMzIwNDAzMTQ3OSwzMzI5MzI1Mjk4KSxFPW5ldyBBcnJheSgxNzc5MDMzNzAzLDMxNDQxMzQyNzcsMTAxMzkwNDI0MiwyNzczNDgwNzYyLDEzNTk4OTMxMTksMjYwMDgyMjkyNCw1Mjg3MzQ2MzUsMTU0MTQ1OTIyNSksST1uZXcgQXJyYXkoNjQpO2VbdD4+NV18PTEyODw8MjQtdCUzMixlWyh0KzY0Pj45PDw0KSsxNV09dDtmb3IodmFyIGM9MDtjPGUubGVuZ3RoO2MrPTE2KXtuPUVbMF0scj1FWzFdLG89RVsyXSxpPUVbM10sdT1FWzRdLGE9RVs1XSxmPUVbNl0scz1FWzddO2Zvcih2YXIgbD0wO2w8NjQ7bCsrKWw8MTY/SVtsXT1lW2wrY106SVtsXT1kKGQoZChtKElbbC0yXSksSVtsLTddKSx2KElbbC0xNV0pKSxJW2wtMTZdKSxoPWQoZChkKGQocyxiKHUpKSxnKHUsYSxmKSksX1tsXSksSVtsXSkscD1kKHcobikseShuLHIsbykpLHM9ZixmPWEsYT11LHU9ZChpLGgpLGk9byxvPXIscj1uLG49ZChoLHApO0VbMF09ZChuLEVbMF0pLEVbMV09ZChyLEVbMV0pLEVbMl09ZChvLEVbMl0pLEVbM109ZChpLEVbM10pLEVbNF09ZCh1LEVbNF0pLEVbNV09ZChhLEVbNV0pLEVbNl09ZChmLEVbNl0pLEVbN109ZChzLEVbN10pfXJldHVybiBFfTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGwuaGFzaChlLF8sMzIsITApfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYTI1Ni5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDEwOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKGUsbixyLG8saSx1LGEsZixzKXtmdW5jdGlvbiBjKCl7fXZhciBlPXQuZXhwb3J0cz17fTtlLm5leHRUaWNrPWZ1bmN0aW9uKCl7dmFyIGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LnNldEltbWVkaWF0ZSx0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5wb3N0TWVzc2FnZSYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7aWYoZSlyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZSl9O2lmKHQpe3ZhciBuPVtdO3JldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixmdW5jdGlvbihlKXt2YXIgdD1lLnNvdXJjZTtpZigodD09PXdpbmRvd3x8bnVsbD09PXQpJiZcInByb2Nlc3MtdGlja1wiPT09ZS5kYXRhJiYoZS5zdG9wUHJvcGFnYXRpb24oKSxuLmxlbmd0aD4wKSl7dmFyIHI9bi5zaGlmdCgpO3IoKX19LCEwKSxmdW5jdGlvbihlKXtuLnB1c2goZSksd2luZG93LnBvc3RNZXNzYWdlKFwicHJvY2Vzcy10aWNrXCIsXCIqXCIpfX1yZXR1cm4gZnVuY3Rpb24oZSl7c2V0VGltZW91dChlLDApfX0oKSxlLnRpdGxlPVwiYnJvd3NlclwiLGUuYnJvd3Nlcj0hMCxlLmVudj17fSxlLmFyZ3Y9W10sZS5vbj1jLGUuYWRkTGlzdGVuZXI9YyxlLm9uY2U9YyxlLm9mZj1jLGUucmVtb3ZlTGlzdGVuZXI9YyxlLnJlbW92ZUFsbExpc3RlbmVycz1jLGUuZW1pdD1jLGUuYmluZGluZz1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZFwiKX0sZS5jd2Q9ZnVuY3Rpb24oKXtyZXR1cm5cIi9cIn0sZS5jaGRpcj1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWRcIil9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzc1wiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDExOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKGUsdCxyLG8saSx1LGEsZixzKXtuLnJlYWQ9ZnVuY3Rpb24oZSx0LG4scixvKXt2YXIgaSx1LGE9OCpvLXItMSxmPSgxPDxhKS0xLHM9Zj4+MSxjPS03LGw9bj9vLTE6MCxkPW4/LTE6MSxoPWVbdCtsXTtmb3IobCs9ZCxpPWgmKDE8PC1jKS0xLGg+Pj0tYyxjKz1hO2M+MDtpPTI1NippK2VbdCtsXSxsKz1kLGMtPTgpO2Zvcih1PWkmKDE8PC1jKS0xLGk+Pj0tYyxjKz1yO2M+MDt1PTI1Nip1K2VbdCtsXSxsKz1kLGMtPTgpO2lmKDA9PT1pKWk9MS1zO2Vsc2V7aWYoaT09PWYpcmV0dXJuIHU/TmFOOihoPy0xOjEpKigxLzApO3UrPU1hdGgucG93KDIsciksaS09c31yZXR1cm4oaD8tMToxKSp1Kk1hdGgucG93KDIsaS1yKX0sbi53cml0ZT1mdW5jdGlvbihlLHQsbixyLG8saSl7dmFyIHUsYSxmLHM9OCppLW8tMSxjPSgxPDxzKS0xLGw9Yz4+MSxkPTIzPT09bz9NYXRoLnBvdygyLC0yNCktTWF0aC5wb3coMiwtNzcpOjAsaD1yPzA6aS0xLHA9cj8xOi0xLGc9dDwwfHwwPT09dCYmMS90PDA/MTowO2Zvcih0PU1hdGguYWJzKHQpLGlzTmFOKHQpfHx0PT09MS8wPyhhPWlzTmFOKHQpPzE6MCx1PWMpOih1PU1hdGguZmxvb3IoTWF0aC5sb2codCkvTWF0aC5MTjIpLHQqKGY9TWF0aC5wb3coMiwtdSkpPDEmJih1LS0sZio9MiksdCs9dStsPj0xP2QvZjpkKk1hdGgucG93KDIsMS1sKSx0KmY+PTImJih1KyssZi89MiksdStsPj1jPyhhPTAsdT1jKTp1K2w+PTE/KGE9KHQqZi0xKSpNYXRoLnBvdygyLG8pLHUrPWwpOihhPXQqTWF0aC5wb3coMixsLTEpKk1hdGgucG93KDIsbyksdT0wKSk7bz49ODtlW24raF09MjU1JmEsaCs9cCxhLz0yNTYsby09OCk7Zm9yKHU9dTw8b3xhLHMrPW87cz4wO2VbbitoXT0yNTUmdSxoKz1wLHUvPTI1NixzLT04KTtlW24raC1wXXw9MTI4Kmd9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvaWVlZTc1NFwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dfSx7fSxbMV0pKDEpfSk7IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKEMpIE1pY3Jvc29mdC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbnZhciBSZWZsZWN0O1xyXG4oZnVuY3Rpb24gKFJlZmxlY3QpIHtcclxuICAgIC8vIE1ldGFkYXRhIFByb3Bvc2FsXHJcbiAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhL1xyXG4gICAgKGZ1bmN0aW9uIChmYWN0b3J5KSB7XHJcbiAgICAgICAgdmFyIHJvb3QgPSB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcclxuICAgICAgICAgICAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDpcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzID09PSBcIm9iamVjdFwiID8gdGhpcyA6XHJcbiAgICAgICAgICAgICAgICAgICAgRnVuY3Rpb24oXCJyZXR1cm4gdGhpcztcIikoKTtcclxuICAgICAgICB2YXIgZXhwb3J0ZXIgPSBtYWtlRXhwb3J0ZXIoUmVmbGVjdCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByb290LlJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcm9vdC5SZWZsZWN0ID0gUmVmbGVjdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGV4cG9ydGVyID0gbWFrZUV4cG9ydGVyKHJvb3QuUmVmbGVjdCwgZXhwb3J0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmYWN0b3J5KGV4cG9ydGVyKTtcclxuICAgICAgICBmdW5jdGlvbiBtYWtlRXhwb3J0ZXIodGFyZ2V0LCBwcmV2aW91cykge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgeyBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSkoZnVuY3Rpb24gKGV4cG9ydGVyKSB7XHJcbiAgICAgICAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbiAgICAgICAgLy8gZmVhdHVyZSB0ZXN0IGZvciBTeW1ib2wgc3VwcG9ydFxyXG4gICAgICAgIHZhciBzdXBwb3J0c1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIjtcclxuICAgICAgICB2YXIgdG9QcmltaXRpdmVTeW1ib2wgPSBzdXBwb3J0c1N5bWJvbCAmJiB0eXBlb2YgU3ltYm9sLnRvUHJpbWl0aXZlICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sLnRvUHJpbWl0aXZlIDogXCJAQHRvUHJpbWl0aXZlXCI7XHJcbiAgICAgICAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gc3VwcG9ydHNTeW1ib2wgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbC5pdGVyYXRvciA6IFwiQEBpdGVyYXRvclwiO1xyXG4gICAgICAgIHZhciBzdXBwb3J0c0NyZWF0ZSA9IHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSBcImZ1bmN0aW9uXCI7IC8vIGZlYXR1cmUgdGVzdCBmb3IgT2JqZWN0LmNyZWF0ZSBzdXBwb3J0XHJcbiAgICAgICAgdmFyIHN1cHBvcnRzUHJvdG8gPSB7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5OyAvLyBmZWF0dXJlIHRlc3QgZm9yIF9fcHJvdG9fXyBzdXBwb3J0XHJcbiAgICAgICAgdmFyIGRvd25MZXZlbCA9ICFzdXBwb3J0c0NyZWF0ZSAmJiAhc3VwcG9ydHNQcm90bztcclxuICAgICAgICB2YXIgSGFzaE1hcCA9IHtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIG9iamVjdCBpbiBkaWN0aW9uYXJ5IG1vZGUgKGEuay5hLiBcInNsb3dcIiBtb2RlIGluIHY4KVxyXG4gICAgICAgICAgICBjcmVhdGU6IHN1cHBvcnRzQ3JlYXRlXHJcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KE9iamVjdC5jcmVhdGUobnVsbCkpOyB9XHJcbiAgICAgICAgICAgICAgICA6IHN1cHBvcnRzUHJvdG9cclxuICAgICAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KHsgX19wcm90b19fOiBudWxsIH0pOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeSh7fSk7IH0sXHJcbiAgICAgICAgICAgIGhhczogZG93bkxldmVsXHJcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwobWFwLCBrZXkpOyB9XHJcbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4ga2V5IGluIG1hcDsgfSxcclxuICAgICAgICAgICAgZ2V0OiBkb3duTGV2ZWxcclxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBoYXNPd24uY2FsbChtYXAsIGtleSkgPyBtYXBba2V5XSA6IHVuZGVmaW5lZDsgfVxyXG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIG1hcFtrZXldOyB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gTG9hZCBnbG9iYWwgb3Igc2hpbSB2ZXJzaW9ucyBvZiBNYXAsIFNldCwgYW5kIFdlYWtNYXBcclxuICAgICAgICB2YXIgZnVuY3Rpb25Qcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRnVuY3Rpb24pO1xyXG4gICAgICAgIHZhciB1c2VQb2x5ZmlsbCA9IHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52W1wiUkVGTEVDVF9NRVRBREFUQV9VU0VfTUFQX1BPTFlGSUxMXCJdID09PSBcInRydWVcIjtcclxuICAgICAgICB2YXIgX01hcCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUuZW50cmllcyA9PT0gXCJmdW5jdGlvblwiID8gTWFwIDogQ3JlYXRlTWFwUG9seWZpbGwoKTtcclxuICAgICAgICB2YXIgX1NldCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgU2V0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFNldC5wcm90b3R5cGUuZW50cmllcyA9PT0gXCJmdW5jdGlvblwiID8gU2V0IDogQ3JlYXRlU2V0UG9seWZpbGwoKTtcclxuICAgICAgICB2YXIgX1dlYWtNYXAgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIFdlYWtNYXAgPT09IFwiZnVuY3Rpb25cIiA/IFdlYWtNYXAgOiBDcmVhdGVXZWFrTWFwUG9seWZpbGwoKTtcclxuICAgICAgICAvLyBbW01ldGFkYXRhXV0gaW50ZXJuYWwgc2xvdFxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5LW9iamVjdC1pbnRlcm5hbC1tZXRob2RzLWFuZC1pbnRlcm5hbC1zbG90c1xyXG4gICAgICAgIHZhciBNZXRhZGF0YSA9IG5ldyBfV2Vha01hcCgpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFwcGxpZXMgYSBzZXQgb2YgZGVjb3JhdG9ycyB0byBhIHByb3BlcnR5IG9mIGEgdGFyZ2V0IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0gZGVjb3JhdG9ycyBBbiBhcnJheSBvZiBkZWNvcmF0b3JzLlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSB0byBkZWNvcmF0ZS5cclxuICAgICAgICAgKiBAcGFyYW0gYXR0cmlidXRlcyAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciB0aGUgdGFyZ2V0IGtleS5cclxuICAgICAgICAgKiBAcmVtYXJrcyBEZWNvcmF0b3JzIGFyZSBhcHBsaWVkIGluIHJldmVyc2Ugb3JkZXIuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICBFeGFtcGxlID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiLFxyXG4gICAgICAgICAqICAgICAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIsXHJcbiAgICAgICAgICogICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKSkpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIsXHJcbiAgICAgICAgICogICAgICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIsXHJcbiAgICAgICAgICogICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIikpKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghSXNBcnJheShkZWNvcmF0b3JzKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChhdHRyaWJ1dGVzKSAmJiAhSXNVbmRlZmluZWQoYXR0cmlidXRlcykgJiYgIUlzTnVsbChhdHRyaWJ1dGVzKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNOdWxsKGF0dHJpYnV0ZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIERlY29yYXRlUHJvcGVydHkoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUlzQXJyYXkoZGVjb3JhdG9ycykpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc0NvbnN0cnVjdG9yKHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIERlY29yYXRlQ29uc3RydWN0b3IoZGVjb3JhdG9ycywgdGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImRlY29yYXRlXCIsIGRlY29yYXRlKTtcclxuICAgICAgICAvLyA0LjEuMiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI3JlZmxlY3QubWV0YWRhdGFcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGRlZmF1bHQgbWV0YWRhdGEgZGVjb3JhdG9yIGZhY3RvcnkgdGhhdCBjYW4gYmUgdXNlZCBvbiBhIGNsYXNzLCBjbGFzcyBtZW1iZXIsIG9yIHBhcmFtZXRlci5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgVGhlIGtleSBmb3IgdGhlIG1ldGFkYXRhIGVudHJ5LlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YVZhbHVlIFRoZSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGVudHJ5LlxyXG4gICAgICAgICAqIEByZXR1cm5zIEEgZGVjb3JhdG9yIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqIEByZW1hcmtzXHJcbiAgICAgICAgICogSWYgYG1ldGFkYXRhS2V5YCBpcyBhbHJlYWR5IGRlZmluZWQgZm9yIHRoZSB0YXJnZXQgYW5kIHRhcmdldCBrZXksIHRoZVxyXG4gICAgICAgICAqIG1ldGFkYXRhVmFsdWUgZm9yIHRoYXQga2V5IHdpbGwgYmUgb3ZlcndyaXR0ZW4uXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvciwgVHlwZVNjcmlwdCBvbmx5KVxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlLCBUeXBlU2NyaXB0IG9ubHkpXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgKiAgICAgICAgIHByb3BlcnR5O1xyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZCgpIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZCgpIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBtZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBkZWNvcmF0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpICYmICFJc1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcIm1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmUgYSB1bmlxdWUgbWV0YWRhdGEgZW50cnkgb24gdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhVmFsdWUgQSB2YWx1ZSB0aGF0IGNvbnRhaW5zIGF0dGFjaGVkIG1ldGFkYXRhLlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdG8gZGVmaW5lIG1ldGFkYXRhLlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGRlY29yYXRvciBmYWN0b3J5IGFzIG1ldGFkYXRhLXByb2R1Y2luZyBhbm5vdGF0aW9uLlxyXG4gICAgICAgICAqICAgICBmdW5jdGlvbiBNeUFubm90YXRpb24ob3B0aW9ucyk6IERlY29yYXRvciB7XHJcbiAgICAgICAgICogICAgICAgICByZXR1cm4gKHRhcmdldCwga2V5PykgPT4gUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIHRhcmdldCwga2V5KTtcclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJkZWZpbmVNZXRhZGF0YVwiLCBkZWZpbmVNZXRhZGF0YSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluIGhhcyB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG1ldGFkYXRhIGtleSB3YXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluOyBvdGhlcndpc2UsIGBmYWxzZWAuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcclxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcclxuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJoYXNNZXRhZGF0YVwiLCBoYXNNZXRhZGF0YSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdGFyZ2V0IG9iamVjdCBoYXMgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBrZXkgd2FzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Q7IG90aGVyd2lzZSwgYGZhbHNlYC5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBoYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xyXG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnRlcihcImhhc093bk1ldGFkYXRhXCIsIGhhc093bk1ldGFkYXRhKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluLlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQHJldHVybnMgVGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgbWV0YWRhdGEga2V5IGlmIGZvdW5kOyBvdGhlcndpc2UsIGB1bmRlZmluZWRgLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0TWV0YWRhdGFcIiwgZ2V0TWV0YWRhdGEpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IG9uIHRoZSB0YXJnZXQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXHJcbiAgICAgICAgICogQHJldHVybnMgVGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgbWV0YWRhdGEga2V5IGlmIGZvdW5kOyBvdGhlcndpc2UsIGB1bmRlZmluZWRgLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0T3duTWV0YWRhdGFcIiwgZ2V0T3duTWV0YWRhdGEpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIGtleXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluLlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB1bmlxdWUgbWV0YWRhdGEga2V5cy5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeU1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRNZXRhZGF0YUtleXNcIiwgZ2V0TWV0YWRhdGFLZXlzKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSB1bmlxdWUgbWV0YWRhdGEga2V5cyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXHJcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cclxuICAgICAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB1bmlxdWUgbWV0YWRhdGEga2V5cy5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxyXG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xyXG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cclxuICAgICAgICAgKiAgICAgfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0T3duTWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRPd25NZXRhZGF0YUtleXNcIiwgZ2V0T3duTWV0YWRhdGFLZXlzKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWxldGVzIHRoZSBtZXRhZGF0YSBlbnRyeSBmcm9tIHRoZSB0YXJnZXQgb2JqZWN0IHdpdGggdGhlIHByb3ZpZGVkIGtleS5cclxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cclxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEgZW50cnkgd2FzIGZvdW5kIGFuZCBkZWxldGVkOyBvdGhlcndpc2UsIGZhbHNlLlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XHJcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XHJcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XHJcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxyXG4gICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xyXG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKHRhcmdldCwgcHJvcGVydHlLZXksIC8qQ3JlYXRlKi8gZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIW1ldGFkYXRhTWFwLmRlbGV0ZShtZXRhZGF0YUtleSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YU1hcC5zaXplID4gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBNZXRhZGF0YS5nZXQodGFyZ2V0KTtcclxuICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEuZGVsZXRlKHByb3BlcnR5S2V5KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldE1ldGFkYXRhLnNpemUgPiAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIE1ldGFkYXRhLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwb3J0ZXIoXCJkZWxldGVNZXRhZGF0YVwiLCBkZWxldGVNZXRhZGF0YSk7XHJcbiAgICAgICAgZnVuY3Rpb24gRGVjb3JhdGVDb25zdHJ1Y3RvcihkZWNvcmF0b3JzLCB0YXJnZXQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRlZCA9IGRlY29yYXRvcih0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChkZWNvcmF0ZWQpICYmICFJc051bGwoZGVjb3JhdGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNDb25zdHJ1Y3RvcihkZWNvcmF0ZWQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZGVjb3JhdGVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIERlY29yYXRlUHJvcGVydHkoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRvciA9IGRlY29yYXRvcnNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdGVkID0gZGVjb3JhdG9yKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChkZWNvcmF0ZWQpICYmICFJc051bGwoZGVjb3JhdGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QoZGVjb3JhdGVkKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3IgPSBkZWNvcmF0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgQ3JlYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRNZXRhZGF0YSA9IE1ldGFkYXRhLmdldChPKTtcclxuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKHRhcmdldE1ldGFkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFDcmVhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhID0gbmV3IF9NYXAoKTtcclxuICAgICAgICAgICAgICAgIE1ldGFkYXRhLnNldChPLCB0YXJnZXRNZXRhZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gdGFyZ2V0TWV0YWRhdGEuZ2V0KFApO1xyXG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUNyZWF0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGFNYXAgPSBuZXcgX01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEuc2V0KFAsIG1ldGFkYXRhTWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFNYXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDMuMS4xLjEgT3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcclxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWhhc21ldGFkYXRhXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xyXG4gICAgICAgICAgICB2YXIgaGFzT3duID0gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XHJcbiAgICAgICAgICAgIGlmICghSXNOdWxsKHBhcmVudCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgcGFyZW50LCBQKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAzLjEuMi4xIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnloYXNvd25tZXRhZGF0YVxyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcclxuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIFRvQm9vbGVhbihtZXRhZGF0YU1hcC5oYXMoTWV0YWRhdGFLZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMy4xLjMuMSBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5Z2V0bWV0YWRhdGFcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XHJcbiAgICAgICAgICAgIHZhciBoYXNPd24gPSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcclxuICAgICAgICAgICAgaWYgKGhhc093bilcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XHJcbiAgICAgICAgICAgIGlmICghSXNOdWxsKHBhcmVudCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgcGFyZW50LCBQKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMy4xLjQuMSBPcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5Z2V0b3dubWV0YWRhdGFcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFNYXAuZ2V0KE1ldGFkYXRhS2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMy4xLjUuMSBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlLCBPLCBQKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5ZGVmaW5lb3dubWV0YWRhdGFcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlLCBPLCBQKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyB0cnVlKTtcclxuICAgICAgICAgICAgbWV0YWRhdGFNYXAuc2V0KE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gMy4xLjYuMSBPcmRpbmFyeU1ldGFkYXRhS2V5cyhPLCBQKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5bWV0YWRhdGFrZXlzXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlNZXRhZGF0YUtleXMoTywgUCkge1xyXG4gICAgICAgICAgICB2YXIgb3duS2V5cyA9IE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcclxuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBvd25LZXlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50S2V5cyA9IE9yZGluYXJ5TWV0YWRhdGFLZXlzKHBhcmVudCwgUCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnRLZXlzLmxlbmd0aCA8PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG93bktleXM7XHJcbiAgICAgICAgICAgIGlmIChvd25LZXlzLmxlbmd0aCA8PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudEtleXM7XHJcbiAgICAgICAgICAgIHZhciBzZXQgPSBuZXcgX1NldCgpO1xyXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIG93bktleXNfMSA9IG93bktleXM7IF9pIDwgb3duS2V5c18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IG93bktleXNfMVtfaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzS2V5ID0gc2V0LmhhcyhrZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXQuYWRkKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBwYXJlbnRLZXlzXzEgPSBwYXJlbnRLZXlzOyBfYSA8IHBhcmVudEtleXNfMS5sZW5ndGg7IF9hKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBwYXJlbnRLZXlzXzFbX2FdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc0tleSA9IHNldC5oYXMoa2V5KTtcclxuICAgICAgICAgICAgICAgIGlmICghaGFzS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAzLjEuNy4xIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlvd25tZXRhZGF0YWtleXNcclxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XHJcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcclxuICAgICAgICAgICAgdmFyIGtleXNPYmogPSBtZXRhZGF0YU1hcC5rZXlzKCk7XHJcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IEdldEl0ZXJhdG9yKGtleXNPYmopO1xyXG4gICAgICAgICAgICB2YXIgayA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IEl0ZXJhdG9yU3RlcChpdGVyYXRvcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5leHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlzLmxlbmd0aCA9IGs7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFZhbHVlID0gSXRlcmF0b3JWYWx1ZShuZXh0KTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5c1trXSA9IG5leHRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGsrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA2IEVDTUFTY3JpcHQgRGF0YSBUeXAwZXMgYW5kIFZhbHVlc1xyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtZGF0YS10eXBlcy1hbmQtdmFsdWVzXHJcbiAgICAgICAgZnVuY3Rpb24gVHlwZSh4KSB7XHJcbiAgICAgICAgICAgIGlmICh4ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLyogTnVsbCAqLztcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgeCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOiByZXR1cm4gMCAvKiBVbmRlZmluZWQgKi87XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gMiAvKiBCb29sZWFuICovO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gMyAvKiBTdHJpbmcgKi87XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic3ltYm9sXCI6IHJldHVybiA0IC8qIFN5bWJvbCAqLztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIDUgLyogTnVtYmVyICovO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOiByZXR1cm4geCA9PT0gbnVsbCA/IDEgLyogTnVsbCAqLyA6IDYgLyogT2JqZWN0ICovO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDYgLyogT2JqZWN0ICovO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDYuMS4xIFRoZSBVbmRlZmluZWQgVHlwZVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMtdW5kZWZpbmVkLXR5cGVcclxuICAgICAgICBmdW5jdGlvbiBJc1VuZGVmaW5lZCh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID09PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDYuMS4yIFRoZSBOdWxsIFR5cGVcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzLW51bGwtdHlwZVxyXG4gICAgICAgIGZ1bmN0aW9uIElzTnVsbCh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID09PSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA2LjEuNSBUaGUgU3ltYm9sIFR5cGVcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzLXN5bWJvbC10eXBlXHJcbiAgICAgICAgZnVuY3Rpb24gSXNTeW1ib2woeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDYuMS43IFRoZSBPYmplY3QgVHlwZVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC10eXBlXHJcbiAgICAgICAgZnVuY3Rpb24gSXNPYmplY3QoeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09IFwib2JqZWN0XCIgPyB4ICE9PSBudWxsIDogdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4xIFR5cGUgQ29udmVyc2lvblxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXR5cGUtY29udmVyc2lvblxyXG4gICAgICAgIC8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXHJcbiAgICAgICAgZnVuY3Rpb24gVG9QcmltaXRpdmUoaW5wdXQsIFByZWZlcnJlZFR5cGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChUeXBlKGlucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIFVuZGVmaW5lZCAqLzogcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxIC8qIE51bGwgKi86IHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBCb29sZWFuICovOiByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMgLyogU3RyaW5nICovOiByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQgLyogU3ltYm9sICovOiByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDUgLyogTnVtYmVyICovOiByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGhpbnQgPSBQcmVmZXJyZWRUeXBlID09PSAzIC8qIFN0cmluZyAqLyA/IFwic3RyaW5nXCIgOiBQcmVmZXJyZWRUeXBlID09PSA1IC8qIE51bWJlciAqLyA/IFwibnVtYmVyXCIgOiBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgdmFyIGV4b3RpY1RvUHJpbSA9IEdldE1ldGhvZChpbnB1dCwgdG9QcmltaXRpdmVTeW1ib2wpO1xyXG4gICAgICAgICAgICBpZiAoZXhvdGljVG9QcmltICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBleG90aWNUb1ByaW0uY2FsbChpbnB1dCwgaGludCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoSXNPYmplY3QocmVzdWx0KSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBoaW50ID09PSBcImRlZmF1bHRcIiA/IFwibnVtYmVyXCIgOiBoaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy4xLjEuMSBPcmRpbmFyeVRvUHJpbWl0aXZlKE8sIGhpbnQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxyXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5VG9QcmltaXRpdmUoTywgaGludCkge1xyXG4gICAgICAgICAgICBpZiAoaGludCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvU3RyaW5nXzEgPSBPLnRvU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodG9TdHJpbmdfMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdG9TdHJpbmdfMS5jYWxsKE8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZU9mID0gTy52YWx1ZU9mO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodmFsdWVPZikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdmFsdWVPZi5jYWxsKE8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZU9mID0gTy52YWx1ZU9mO1xyXG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodmFsdWVPZikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdmFsdWVPZi5jYWxsKE8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0b1N0cmluZ18yID0gTy50b1N0cmluZztcclxuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHRvU3RyaW5nXzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRvU3RyaW5nXzIuY2FsbChPKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjEuMiBUb0Jvb2xlYW4oYXJndW1lbnQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLzIwMTYvI3NlYy10b2Jvb2xlYW5cclxuICAgICAgICBmdW5jdGlvbiBUb0Jvb2xlYW4oYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhYXJndW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMS4xMiBUb1N0cmluZyhhcmd1bWVudClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3N0cmluZ1xyXG4gICAgICAgIGZ1bmN0aW9uIFRvU3RyaW5nKGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiICsgYXJndW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMS4xNCBUb1Byb3BlcnR5S2V5KGFyZ3VtZW50KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJvcGVydHlrZXlcclxuICAgICAgICBmdW5jdGlvbiBUb1Byb3BlcnR5S2V5KGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBUb1ByaW1pdGl2ZShhcmd1bWVudCwgMyAvKiBTdHJpbmcgKi8pO1xyXG4gICAgICAgICAgICBpZiAoSXNTeW1ib2woa2V5KSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgICAgIHJldHVybiBUb1N0cmluZyhrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjIgVGVzdGluZyBhbmQgQ29tcGFyaXNvbiBPcGVyYXRpb25zXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdGVzdGluZy1hbmQtY29tcGFyaXNvbi1vcGVyYXRpb25zXHJcbiAgICAgICAgLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc2FycmF5XHJcbiAgICAgICAgZnVuY3Rpb24gSXNBcnJheShhcmd1bWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheVxyXG4gICAgICAgICAgICAgICAgPyBBcnJheS5pc0FycmF5KGFyZ3VtZW50KVxyXG4gICAgICAgICAgICAgICAgOiBhcmd1bWVudCBpbnN0YW5jZW9mIE9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgID8gYXJndW1lbnQgaW5zdGFuY2VvZiBBcnJheVxyXG4gICAgICAgICAgICAgICAgICAgIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjIuMyBJc0NhbGxhYmxlKGFyZ3VtZW50KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzY2FsbGFibGVcclxuICAgICAgICBmdW5jdGlvbiBJc0NhbGxhYmxlKGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgaXMgYW4gYXBwcm94aW1hdGlvbiBhcyB3ZSBjYW5ub3QgY2hlY2sgZm9yIFtbQ2FsbF1dIGludGVybmFsIG1ldGhvZC5cclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJmdW5jdGlvblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjIuNCBJc0NvbnN0cnVjdG9yKGFyZ3VtZW50KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzY29uc3RydWN0b3JcclxuICAgICAgICBmdW5jdGlvbiBJc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgaXMgYW4gYXBwcm94aW1hdGlvbiBhcyB3ZSBjYW5ub3QgY2hlY2sgZm9yIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kLlxyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09PSBcImZ1bmN0aW9uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDcuMi43IElzUHJvcGVydHlLZXkoYXJndW1lbnQpXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNwcm9wZXJ0eWtleVxyXG4gICAgICAgIGZ1bmN0aW9uIElzUHJvcGVydHlLZXkoYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChUeXBlKGFyZ3VtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIFN0cmluZyAqLzogcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQgLyogU3ltYm9sICovOiByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjMgT3BlcmF0aW9ucyBvbiBPYmplY3RzXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3BlcmF0aW9ucy1vbi1vYmplY3RzXHJcbiAgICAgICAgLy8gNy4zLjkgR2V0TWV0aG9kKFYsIFApXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZ2V0bWV0aG9kXHJcbiAgICAgICAgZnVuY3Rpb24gR2V0TWV0aG9kKFYsIFApIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmMgPSBWW1BdO1xyXG4gICAgICAgICAgICBpZiAoZnVuYyA9PT0gdW5kZWZpbmVkIHx8IGZ1bmMgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoIUlzQ2FsbGFibGUoZnVuYykpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA3LjQgT3BlcmF0aW9ucyBvbiBJdGVyYXRvciBPYmplY3RzXHJcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3BlcmF0aW9ucy1vbi1pdGVyYXRvci1vYmplY3RzXHJcbiAgICAgICAgZnVuY3Rpb24gR2V0SXRlcmF0b3Iob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBHZXRNZXRob2Qob2JqLCBpdGVyYXRvclN5bWJvbCk7XHJcbiAgICAgICAgICAgIGlmICghSXNDYWxsYWJsZShtZXRob2QpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpOyAvLyBmcm9tIENhbGxcclxuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbWV0aG9kLmNhbGwob2JqKTtcclxuICAgICAgICAgICAgaWYgKCFJc09iamVjdChpdGVyYXRvcikpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy40LjQgSXRlcmF0b3JWYWx1ZShpdGVyUmVzdWx0KVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8yMDE2LyNzZWMtaXRlcmF0b3J2YWx1ZVxyXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yVmFsdWUoaXRlclJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlclJlc3VsdC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy40LjUgSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWl0ZXJhdG9yc3RlcFxyXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yU3RlcChpdGVyYXRvcikge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyBmYWxzZSA6IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pdGVyYXRvcmNsb3NlXHJcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JDbG9zZShpdGVyYXRvcikge1xyXG4gICAgICAgICAgICB2YXIgZiA9IGl0ZXJhdG9yW1wicmV0dXJuXCJdO1xyXG4gICAgICAgICAgICBpZiAoZilcclxuICAgICAgICAgICAgICAgIGYuY2FsbChpdGVyYXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIDkuMSBPcmRpbmFyeSBPYmplY3QgSW50ZXJuYWwgTWV0aG9kcyBhbmQgSW50ZXJuYWwgU2xvdHNcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcmRpbmFyeS1vYmplY3QtaW50ZXJuYWwtbWV0aG9kcy1hbmQtaW50ZXJuYWwtc2xvdHNcclxuICAgICAgICAvLyA5LjEuMS4xIE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTylcclxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcmRpbmFyeWdldHByb3RvdHlwZW9mXHJcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBPICE9PSBcImZ1bmN0aW9uXCIgfHwgTyA9PT0gZnVuY3Rpb25Qcm90b3R5cGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XHJcbiAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQgZG9lc24ndCBzZXQgX19wcm90b19fIGluIEVTNSwgYXMgaXQncyBub24tc3RhbmRhcmQuXHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBkZXRlcm1pbmUgdGhlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IuIENvbXBhdGlibGUgaW1wbGVtZW50YXRpb25zXHJcbiAgICAgICAgICAgIC8vIG11c3QgZWl0aGVyIHNldCBfX3Byb3RvX18gb24gYSBzdWJjbGFzcyBjb25zdHJ1Y3RvciB0byB0aGUgc3VwZXJjbGFzcyBjb25zdHJ1Y3RvcixcclxuICAgICAgICAgICAgLy8gb3IgZW5zdXJlIGVhY2ggY2xhc3MgaGFzIGEgdmFsaWQgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSBvbiBpdHMgcHJvdG90eXBlIHRoYXRcclxuICAgICAgICAgICAgLy8gcG9pbnRzIGJhY2sgdG8gdGhlIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIG5vdCB0aGUgc2FtZSBhcyBGdW5jdGlvbi5bW1Byb3RvdHlwZV1dLCB0aGVuIHRoaXMgaXMgZGVmaW5hdGVseSBpbmhlcml0ZWQuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGNhc2Ugd2hlbiBpbiBFUzYgb3Igd2hlbiB1c2luZyBfX3Byb3RvX18gaW4gYSBjb21wYXRpYmxlIGJyb3dzZXIuXHJcbiAgICAgICAgICAgIGlmIChwcm90byAhPT0gZnVuY3Rpb25Qcm90b3R5cGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBzdXBlciBwcm90b3R5cGUgaXMgT2JqZWN0LnByb3RvdHlwZSwgbnVsbCwgb3IgdW5kZWZpbmVkLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxyXG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gTy5wcm90b3R5cGU7XHJcbiAgICAgICAgICAgIHZhciBwcm90b3R5cGVQcm90byA9IHByb3RvdHlwZSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKTtcclxuICAgICAgICAgICAgaWYgKHByb3RvdHlwZVByb3RvID09IG51bGwgfHwgcHJvdG90eXBlUHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBjb25zdHJ1Y3RvciB3YXMgbm90IGEgZnVuY3Rpb24sIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXHJcbiAgICAgICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHByb3RvdHlwZVByb3RvLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XHJcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgc29tZSBraW5kIG9mIHNlbGYtcmVmZXJlbmNlLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxyXG4gICAgICAgICAgICBpZiAoY29uc3RydWN0b3IgPT09IE8pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XHJcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBwcmV0dHkgZ29vZCBndWVzcyBhdCB0aGUgaGVyaXRhZ2UuXHJcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbmFpdmUgTWFwIHNoaW1cclxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVNYXBQb2x5ZmlsbCgpIHtcclxuICAgICAgICAgICAgdmFyIGNhY2hlU2VudGluZWwgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGFycmF5U2VudGluZWwgPSBbXTtcclxuICAgICAgICAgICAgdmFyIE1hcEl0ZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hcEl0ZXJhdG9yKGtleXMsIHZhbHVlcywgc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGtleXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcclxuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xyXG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5faW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLl9rZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fc2VsZWN0b3IodGhpcy5fa2V5c1tpbmRleF0sIHRoaXMuX3ZhbHVlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggKyAxID49IHRoaXMuX2tleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogcmVzdWx0LCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLnRocm93ID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGFycmF5U2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiB0cnVlIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hcEl0ZXJhdG9yO1xyXG4gICAgICAgICAgICB9KCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hcCgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSAtMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNYXAucHJvdG90eXBlLCBcInNpemVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fa2V5cy5sZW5ndGg7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSkgPj0gMDsgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggPj0gMCA/IHRoaXMuX3ZhbHVlc1tpbmRleF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLl9rZXlzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGluZGV4ICsgMTsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5c1tpIC0gMV0gPSB0aGlzLl9rZXlzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2kgLSAxXSA9IHRoaXMuX3ZhbHVlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLmxlbmd0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IHRoaXMuX2NhY2hlS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IC0yO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldEtleSk7IH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldFZhbHVlKTsgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldEVudHJ5KTsgfTtcclxuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzKCk7IH07XHJcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZW50cmllcygpOyB9O1xyXG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5fZmluZCA9IGZ1bmN0aW9uIChrZXksIGluc2VydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWNoZUtleSAhPT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSB0aGlzLl9rZXlzLmluZGV4T2YodGhpcy5fY2FjaGVLZXkgPSBrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVJbmRleCA8IDAgJiYgaW5zZXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSB0aGlzLl9rZXlzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXA7XHJcbiAgICAgICAgICAgIH0oKSk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEtleShrZXksIF8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VmFsdWUoXywgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRFbnRyeShrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG5haXZlIFNldCBzaGltXHJcbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlU2V0UG9seWZpbGwoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gU2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcCA9IG5ldyBfTWFwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5zaXplOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuaGFzKHZhbHVlKTsgfTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuc2V0KHZhbHVlLCB2YWx1ZSksIHRoaXM7IH07XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdGhpcy5fbWFwLmRlbGV0ZSh2YWx1ZSk7IH07XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9tYXAuY2xlYXIoKTsgfTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5rZXlzKCk7IH07XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC52YWx1ZXMoKTsgfTtcclxuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5lbnRyaWVzKCk7IH07XHJcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMua2V5cygpOyB9O1xyXG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmtleXMoKTsgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTZXQ7XHJcbiAgICAgICAgICAgIH0oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG5haXZlIFdlYWtNYXAgc2hpbVxyXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZVdlYWtNYXBQb2x5ZmlsbCgpIHtcclxuICAgICAgICAgICAgdmFyIFVVSURfU0laRSA9IDE2O1xyXG4gICAgICAgICAgICB2YXIga2V5cyA9IEhhc2hNYXAuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciByb290S2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gV2Vha01hcCgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXkgPSBDcmVhdGVVbmlxdWVLZXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gSGFzaE1hcC5oYXModGFibGUsIHRoaXMuX2tleSkgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUgIT09IHVuZGVmaW5lZCA/IEhhc2hNYXAuZ2V0KHRhYmxlLCB0aGlzLl9rZXkpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlW3RoaXMuX2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUgIT09IHVuZGVmaW5lZCA/IGRlbGV0ZSB0YWJsZVt0aGlzLl9rZXldIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogbm90IGEgcmVhbCBjbGVhciwganVzdCBtYWtlcyB0aGUgcHJldmlvdXMgZGF0YSB1bnJlYWNoYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBXZWFrTWFwO1xyXG4gICAgICAgICAgICB9KCkpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBDcmVhdGVVbmlxdWVLZXkoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5O1xyXG4gICAgICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBcIkBAV2Vha01hcEBAXCIgKyBDcmVhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoSGFzaE1hcC5oYXMoa2V5cywga2V5KSk7XHJcbiAgICAgICAgICAgICAgICBrZXlzW2tleV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIGNyZWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24uY2FsbCh0YXJnZXQsIHJvb3RLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcm9vdEtleSwgeyB2YWx1ZTogSGFzaE1hcC5jcmVhdGUoKSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcm9vdEtleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gRmlsbFJhbmRvbUJ5dGVzKGJ1ZmZlciwgc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyW2ldID0gTWF0aC5yYW5kb20oKSAqIDB4ZmYgfCAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBHZW5SYW5kb21CeXRlcyhzaXplKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtc0NyeXB0byAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGxSYW5kb21CeXRlcyhuZXcgVWludDhBcnJheShzaXplKSwgc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRmlsbFJhbmRvbUJ5dGVzKG5ldyBBcnJheShzaXplKSwgc2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gQ3JlYXRlVVVJRCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gR2VuUmFuZG9tQnl0ZXMoVVVJRF9TSVpFKTtcclxuICAgICAgICAgICAgICAgIC8vIG1hcmsgYXMgcmFuZG9tIC0gUkZDIDQxMjIgwqcgNC40XHJcbiAgICAgICAgICAgICAgICBkYXRhWzZdID0gZGF0YVs2XSAmIDB4NGYgfCAweDQwO1xyXG4gICAgICAgICAgICAgICAgZGF0YVs4XSA9IGRhdGFbOF0gJiAweGJmIHwgMHg4MDtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgVVVJRF9TSVpFOyArK29mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBieXRlID0gZGF0YVtvZmZzZXRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IDQgfHwgb2Zmc2V0ID09PSA2IHx8IG9mZnNldCA9PT0gOClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiLVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChieXRlIDwgMTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gYnl0ZS50b1N0cmluZygxNikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdXNlcyBhIGhldXJpc3RpYyB1c2VkIGJ5IHY4IGFuZCBjaGFrcmEgdG8gZm9yY2UgYW4gb2JqZWN0IGludG8gZGljdGlvbmFyeSBtb2RlLlxyXG4gICAgICAgIGZ1bmN0aW9uIE1ha2VEaWN0aW9uYXJ5KG9iaikge1xyXG4gICAgICAgICAgICBvYmouX18gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvYmouX187XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKFJlZmxlY3QgfHwgKFJlZmxlY3QgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWZsZWN0LmpzLm1hcCIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5cbi8qKlxuICogQG5vdGUgVGhpcyBmaWxlIGV4aXN0cyBtZXJlbHkgYXMgYW4gZWFzeSByZWZlcmVuY2UgZm9yIGZvbGtzIGFkZGluZyBpdCB0byB0aGVpciBjb25maWd1cmF0aW9uIGVudHJpZXNcbiAqL1xuXG4oKCkgPT4ge1xuICBpZiAod2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUgPSB0cnVlO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBnbG9iYWwtcmVxdWlyZVxuICByZXF1aXJlKCcuL2xpYi9jbGllbnQnKTtcbn0pKCk7XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBlcnJvciwgaW5mbywgcmVmcmVzaCwgd2FybiB9ID0gcmVxdWlyZSgnLi9jbGllbnQtbG9nJyk7XG5cbmNvbnN0IHsgYXBwbHksIGNoZWNrLCBzdGF0dXMgfSA9IG1vZHVsZS5ob3Q7XG5sZXQgbGF0ZXN0ID0gdHJ1ZTtcblxuY29uc3QgaG1yID0ge1xuICBvblVuYWNjZXB0ZWQoZGF0YSkge1xuICAgIHdhcm4oJ0NoYW5nZSBpbiB1bmFjY2VwdGVkIG1vZHVsZShzKTpcXG4nLCBkYXRhKTtcbiAgICB3YXJuKGRhdGEpO1xuICB9LFxuICBvbkRlY2xpbmVkKGRhdGEpIHtcbiAgICB3YXJuKCdDaGFuZ2UgaW4gZGVjbGluZWQgbW9kdWxlKHMpOlxcbicsIGRhdGEpO1xuICB9LFxuICBvbkVycm9yZWQoZGF0YSkge1xuICAgIGVycm9yKCdFcnJvciBpbiBtb2R1bGUocyk6XFxuJywgZGF0YSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlcGxhY2UgPSBhc3luYyAoaGFzaCkgPT4ge1xuICBpZiAoaGFzaCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIGxhdGVzdCA9IGhhc2guaW5jbHVkZXMoX193ZWJwYWNrX2hhc2hfXyk7XG4gIH1cblxuICBpZiAoIWxhdGVzdCkge1xuICAgIGNvbnN0IGhtclN0YXR1cyA9IHN0YXR1cygpO1xuXG4gICAgaWYgKGhtclN0YXR1cyA9PT0gJ2Fib3J0JyB8fCBobXJTdGF0dXMgPT09ICdmYWlsJykge1xuICAgICAgd2FybihgQW4gSE1SIHVwZGF0ZSB3YXMgdHJpZ2dlcmVkLCBidXQgJHtobXJTdGF0dXN9ZWQuICR7cmVmcmVzaH1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbW9kdWxlcyA9IGF3YWl0IGNoZWNrKGZhbHNlKTtcblxuICAgIGlmICghbW9kdWxlcykge1xuICAgICAgd2FybihgTm8gbW9kdWxlcyBmb3VuZCBmb3IgcmVwbGFjZW1lbnQuICR7cmVmcmVzaH1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBtb2R1bGVzID0gYXdhaXQgYXBwbHkoaG1yKTtcblxuICAgIGlmIChtb2R1bGVzKSB7XG4gICAgICBsYXRlc3QgPSB0cnVlO1xuICAgICAgaW5mbyhgQnVpbGQgJHtoYXNoLnNsaWNlKDAsIDcpfSByZXBsYWNlZDpcXG5gLCBtb2R1bGVzKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyByZXBsYWNlIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBlcnJvciwgaW5mbywgd2FybiB9ID0gY29uc29sZTtcbmNvbnN0IGxvZyA9IHtcbiAgZXJyb3I6IGVycm9yLmJpbmQoY29uc29sZSwgJ+KsoSB3cHM6JyksXG4gIGluZm86IGluZm8uYmluZChjb25zb2xlLCAn4qyhIHdwczonKSxcbiAgcmVmcmVzaDogJ1BsZWFzZSByZWZyZXNoIHRoZSBwYWdlJyxcbiAgd2Fybjogd2Fybi5iaW5kKGNvbnNvbGUsICfirKEgd3BzOicpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZztcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IHJlcGxhY2UgfSA9IHJlcXVpcmUoJy4vY2xpZW50LWhtcicpO1xuY29uc3QgeyBlcnJvciwgaW5mbywgcmVmcmVzaCwgd2FybiB9ID0gcmVxdWlyZSgnLi9jbGllbnQtbG9nJyk7XG5jb25zdCB7IGluaXQ6IGluaXRQcm9ncmVzcyB9ID0gcmVxdWlyZSgnLi9vdmVybGF5cy9wcm9ncmVzcycpO1xuY29uc3QgeyBpbml0OiBpbml0TWluaW1hbFByb2dyZXNzIH0gPSByZXF1aXJlKCcuL292ZXJsYXlzL3Byb2dyZXNzLW1pbmltYWwnKTtcbmNvbnN0IHsgaW5pdDogaW5pdFN0YXR1cyB9ID0gcmVxdWlyZSgnLi9vdmVybGF5cy9zdGF0dXMnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmLCBuby11bnVzZWQtdmFyc1xuY29uc3Qgb3B0aW9ucyA9IMqOyZDJucmUb3PHncqMybnHnXM7XG5jb25zdCB7IGFkZHJlc3MsIGNsaWVudCwgcHJvZ3Jlc3MsIHNlY3VyZSwgc3RhdHVzIH0gPSBvcHRpb25zO1xuY29uc3QgcHJvdG9jb2wgPSBzZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG5jb25zdCBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KGAke3Byb3RvY29sfTovLyR7KGNsaWVudCB8fCB7fSkuYWRkcmVzcyB8fCBhZGRyZXNzfS93cHNgKTtcblxuLy8gcHJldmVudHMgRUNPTk5SRVNFVCBlcnJvcnMgb24gdGhlIHNlcnZlclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHNvY2tldC5jbG9zZSgpKTtcblxuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICBjb25zdCB7IGFjdGlvbiwgZGF0YSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICBjb25zdCB7IGVycm9ycywgaGFzaCA9ICc8Pz4nLCB3YXJuaW5ncyB9ID0gZGF0YSB8fCB7fTtcbiAgY29uc3Qgc2hvcnRIYXNoID0gaGFzaC5zbGljZSgwLCA3KTtcblxuICBzd2l0Y2ggKGFjdGlvbikge1xuICAgIGNhc2UgJ2Nvbm5lY3RlZCc6XG4gICAgICBpbmZvKCdXZWJTb2NrZXQgY29ubmVjdGVkJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlcnJvcnMnOlxuICAgICAgZXJyb3IoYEJ1aWxkICR7c2hvcnRIYXNofSBwcm9kdWNlZCBlcnJvcnM6XFxuYCwgZXJyb3JzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlbG9hZCc6XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgIHJlcGxhY2UoaGFzaCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd3YXJuaW5ncyc6XG4gICAgICB3YXJuKGBCdWlsZCAke3Nob3J0SGFzaH0gcHJvZHVjZWQgd2FybmluZ3M6XFxuYCwgd2FybmluZ3MpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgfVxufSk7XG5cbnNvY2tldC5vbmNsb3NlID0gKCkgPT4gd2FybihgVGhlIGNsaWVudCBXZWJTb2NrZXQgd2FzIGNsb3NlZC4gJHtyZWZyZXNofWApO1xuXG5pZiAocHJvZ3Jlc3MgPT09ICdtaW5pbWFsJykge1xuICBpbml0TWluaW1hbFByb2dyZXNzKG9wdGlvbnMsIHNvY2tldCk7XG59IGVsc2UgaWYgKHByb2dyZXNzKSB7XG4gIGluaXRQcm9ncmVzcyhvcHRpb25zLCBzb2NrZXQpO1xufVxuXG5pZiAoc3RhdHVzKSB7XG4gIGluaXRTdGF0dXMob3B0aW9ucywgc29ja2V0KTtcbn1cblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgaW5mbygnSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBhY3RpdmUnKTtcblxuICBpZiAob3B0aW9ucy5saXZlUmVsb2FkKSB7XG4gICAgaW5mbygnTGl2ZSBSZWxvYWQgdGFraW5nIHByZWNlZGVuY2Ugb3ZlciBIb3QgTW9kdWxlIFJlcGxhY2VtZW50Jyk7XG4gIH1cbn0gZWxzZSB7XG4gIHdhcm4oJ0hvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgaW5hY3RpdmUnKTtcbn1cblxuaWYgKCFtb2R1bGUuaG90ICYmIG9wdGlvbnMubGl2ZVJlbG9hZCkge1xuICBpbmZvKCdMaXZlIFJlbG9hZCBpcyBhY3RpdmUnKTtcbn1cbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGwsIE1hdGhldXMgR29uw6dhbHZlcyBkYSBTaWx2YVxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgYWRkQ3NzLCBhZGRIdG1sIH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgbnMgPSAnd3BzLXByb2dyZXNzLW1pbmltYWwnO1xuY29uc3QgaHRtbCA9IGBcbjxkaXYgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30taGlkZGVuXCI+XG4gIDxkaXYgaWQ9XCIke25zfS1iYXJcIj48L2Rpdj5cbjwvZGl2PlxuYDtcbmNvbnN0IGNzcyA9IGBcbiMke25zfSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDRweDtcbiAgd2lkdGg6IDEwMHZ3O1xufVxuXG4jJHtuc30tYmFyIHtcbiAgd2lkdGg6IDAlO1xuICBoZWlnaHQ6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NiwgMjIzLCAxNzIpO1xuICB0cmFuc2l0aW9uOiB3aWR0aCAxcyBlYXNlLWluLW91dDtcbn1cblxuLiR7bnN9LWhpZGRlbntcbiAgZGlzcGxheTogbm9uZTtcbn1cbmA7XG5cbmNvbnN0IHVwZGF0ZSA9IChwZXJjZW50KSA9PiB7XG4gIGNvbnN0IGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1iYXJgKTtcbiAgYmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcbn07XG5cbmNvbnN0IHJlc2V0ID0gKHdyYXBwZXIpID0+IHtcbiAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKGAke25zfS1oaWRkZW5gKTtcbiAgc2V0VGltZW91dCgoKSA9PiB1cGRhdGUoMCksIDFlMyk7XG59O1xuXG5jb25zdCBpbml0ID0gKG9wdGlvbnMsIHNvY2tldCkgPT4ge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGFkZEh0bWwoaHRtbCk7XG4gICAgYWRkQ3NzKGNzcyk7XG4gIH0pO1xuXG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgZGF0YSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuXG4gICAgaWYgKGFjdGlvbiAhPT0gJ3Byb2dyZXNzJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLmZsb29yKGRhdGEucGVyY2VudCAqIDEwMCk7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuXG4gICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1oaWRkZW5gKTtcblxuICAgIGlmIChkYXRhLnBlcmNlbnQgPT09IDEpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzZXQod3JhcHBlciksIDVlMyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKHBlcmNlbnQpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0XG59O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbCwgTWF0aGV1cyBHb27Dp2FsdmVzIGRhIFNpbHZhXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtcHJvZ3Jlc3MnO1xuY29uc3QgY3NzID0gYFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnM6NDAwLDcwMCcpO1xuXG4jJHtuc317XG4gIHdpZHRoOiAyMDBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNSU7XG4gIHRvcDogNSU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjI1cyBlYXNlLWluLW91dDtcbiAgei1pbmRleDogMTAwMDtcbn1cblxuIyR7bnN9LWJnIHtcbiAgZmlsbDogIzI4MmQzNTtcbn1cblxuIyR7bnN9LWZpbGwge1xuICBmaWxsOiByZ2JhKDAsIDAsIDAsIDApO1xuICBzdHJva2U6IHJnYigxODYsIDIyMywgMTcyKTtcbiAgc3Ryb2tlLWRhc2hhcnJheTogMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBzdHJva2UtZGFzaG9mZnNldDogLTIxOS45OTA3ODM2OTE0MDYyNTtcbiAgc3Ryb2tlLXdpZHRoOiAxMDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpdHJhbnNsYXRlKDBweCwgLTgwcHgpO1xuICB0cmFuc2l0aW9uOiBzdHJva2UtZGFzaG9mZnNldCAxcztcbn1cblxuIyR7bnN9LXBlcmNlbnQge1xuICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZmlsbDogI2ZmZmZmZjtcbn1cblxuIyR7bnN9LXBlcmNlbnQtdmFsdWUge1xuICBhbGlnbm1lbnQtYmFzZWxpbmU6IG1pZGRsZTtcbiAgdGV4dC1hbmNob3I6IG1pZGRsZTtcbn1cblxuIyR7bnN9LXBlcmNlbnQtc3VwZXIge1xuICBmaWxsOiAjYmRjM2M3O1xuICBmb250LXNpemU6IC40NWVtO1xuICBiYXNlbGluZS1zaGlmdDogMTAlO1xufVxuXG4uJHtuc30tbm9zZWxlY3Qge1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG5Aa2V5ZnJhbWVzICR7bnN9LWhpZGRlbi1kaXNwbGF5IHtcblx0MCUge1xuXHRcdG9wYWNpdHk6IDE7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgxKTtcblx0XHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XG5cdH1cblx0OTklIHtcblx0XHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcblx0XHRvcGFjaXR5OiAwO1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdFx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xuXHR9XG5cdDEwMCUge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0b3BhY2l0eTogMDtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDApO1xuXHRcdC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0fVxufVxuXG4uJHtuc30taGlkZGVue1xuICBhbmltYXRpb246ICR7bnN9LWhpZGRlbi1kaXNwbGF5IC4zcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkcztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5gO1xuXG5jb25zdCBodG1sID0gYFxuPHN2ZyBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1ub3NlbGVjdCAke25zfS1oaWRkZW5cIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIj5cbiAgPGNpcmNsZSBpZD1cIiR7bnN9LWJnXCIgY3g9XCI1MCVcIiBjeT1cIjUwJVwiIHI9XCIzNVwiPjwvY2lyY2xlPlxuICA8cGF0aCBpZD1cIiR7bnN9LWZpbGxcIiBkPVwiTTUsNDBhMzUsMzUgMCAxLDAgNzAsMGEzNSwzNSAwIDEsMCAtNzAsMFwiIC8+XG4gIDx0ZXh0IGlkPVwiJHtuc30tcGVyY2VudFwiIHg9XCI1MCVcIiB5PVwiNTElXCI+PHRzcGFuIGlkPVwiJHtuc30tcGVyY2VudC12YWx1ZVwiPjA8L3RzcGFuPjx0c3BhbiBpZD1cIiR7bnN9LXBlcmNlbnQtc3VwZXJcIj4lPC90c3Bhbj48L3RleHQ+XG48L3N2Zz5cbmA7XG5cbmNvbnN0IHVwZGF0ZSA9IChwZXJjZW50KSA9PiB7XG4gIGNvbnN0IG1heCA9IC0yMTkuOTkwNzgzNjkxNDA2MjU7XG4gIGNvbnN0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXBlcmNlbnQtdmFsdWVgKTtcbiAgY29uc3QgdHJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tZmlsbGApO1xuICBjb25zdCBvZmZzZXQgPSAoKDEwMCAtIHBlcmNlbnQpIC8gMTAwKSAqIG1heDtcblxuICB0cmFjay5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYHN0cm9rZS1kYXNob2Zmc2V0OiAke29mZnNldH1gKTtcbiAgdmFsdWUuaW5uZXJIVE1MID0gcGVyY2VudC50b1N0cmluZygpO1xufTtcblxuY29uc3QgcmVzZXQgPSAoc3ZnKSA9PiB7XG4gIHN2Zy5jbGFzc0xpc3QuYWRkKGAke25zfS1oaWRkZW5gKTtcbiAgc2V0VGltZW91dCgoKSA9PiB1cGRhdGUoMCksIDFlMyk7XG59O1xuXG5jb25zdCBpbml0ID0gKG9wdGlvbnMsIHNvY2tldCkgPT4ge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGFkZENzcyhjc3MpO1xuICAgIGFkZEh0bWwoaHRtbCk7XG4gIH0pO1xuXG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgZGF0YSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuXG4gICAgaWYgKGFjdGlvbiAhPT0gJ3Byb2dyZXNzJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLmZsb29yKGRhdGEucGVyY2VudCAqIDEwMCk7XG4gICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG5cbiAgICBpZiAoIXN2Zykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHdlIGNhbiBzYWZlbHkgY2FsbCB0aGlzIGV2ZW4gaWYgaXQgZG9lc24ndCBoYXZlIHRoZSBjbGFzc1xuICAgIHN2Zy5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1oaWRkZW5gKTtcblxuICAgIGlmIChkYXRhLnBlcmNlbnQgPT09IDEpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzZXQoc3ZnKSwgNWUzKTtcbiAgICB9XG5cbiAgICB1cGRhdGUocGVyY2VudCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQgfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGFkZENzcywgYWRkSHRtbCwgc29ja2V0TWVzc2FnZSB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IG5zID0gJ3dwcy1zdGF0dXMnO1xuY29uc3QgY3NzID0gYFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnM6NDAwLDcwMCcpO1xuXG4jJHtuc30ge1xuICBiYWNrZ3JvdW5kOiAjMjgyZDM1O1xuICBib3JkZXItcmFkaXVzOiAwLjZlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0Zm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuXHRmb250LXNpemU6IDEwcHg7XG4gIGhlaWdodDogOTAlO1xuICBtYXJnaW46IDAgYXV0bztcbiAgbWF4LWhlaWdodDogMjBlbTtcbiAgbWluLWhlaWdodDogMjBlbTtcbiAgb3BhY2l0eTogMTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZy1ib3R0b206IDNlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XG4gIHdpZHRoOiA5NSU7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30taGlkZGVuLWRpc3BsYXkge1xuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHQ5OSUge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cblx0MTAwJSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG59XG5cbiMke25zfS4ke25zfS1oaWRkZW4ge1xuICBhbmltYXRpb246ICR7bnN9LWhpZGRlbi1kaXNwbGF5IC4zcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkcztcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiB7XG4gIGFuaW1hdGlvbjogbWluaW1pemUgMTBzO1xuICBib3R0b206IDJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDZlbTtcbiAgbWluLWhlaWdodDogNmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMmVtO1xuICB3aWR0aDogNmVtO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS1iZWFjb24ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuIyR7bnN9LXRpdGxlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogMS4yZW07XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMC42ZW0gMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tdGl0bGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tdGl0bGUtZXJyb3JzIHtcbiAgY29sb3I6ICNmZjVmNTg7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgcGFkZGluZy1sZWZ0OiAxZW07XG59XG5cbiMke25zfS10aXRsZS13YXJuaW5ncyB7XG4gIGNvbG9yOiAjZmZiZDJlO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIHBhZGRpbmctbGVmdDogMWVtO1xufVxuXG4jJHtuc30tcHJvYmxlbXMge1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiAxZW0gMmVtO1xufVxuXG4jJHtuc30tcHJvYmxlbXMgcHJlIHtcbiAgY29sb3I6ICNkZGQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDEuM2VtO1xuXHRmb250LWZhbWlseTogJ09wZW4gU2FucycsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHByZSBlbSB7XG4gIGJhY2tncm91bmQ6ICNmZjVmNTg7XG4gIGJvcmRlci1yYWRpdXM6IDAuM2VtO1xuICBjb2xvcjogIzY0MWUxNjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBsaW5lLWhlaWdodDogM2VtO1xuICBtYXJnaW4tcmlnaHQ6IDAuNGVtO1xuICBwYWRkaW5nOiAwLjFlbSAwLjRlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxucHJlIyR7bnN9LXdhcm5pbmdzIGVtIHtcbiAgYmFja2dyb3VuZDogI2ZmYmQyZTtcbiAgY29sb3I6ICMzZTI3MjM7XG59XG5cbnByZSMke25zfS1zdWNjZXNzIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5wcmUjJHtuc30tc3VjY2VzcyBlbSB7XG4gIGJhY2tncm91bmQ6ICM3ZmI5MDA7XG4gIGNvbG9yOiAjMDA0ZDQwO1xufVxuXG4jJHtuc30tcHJvYmxlbXMuJHtuc30tc3VjY2VzcyAjJHtuc30tc3VjY2VzcyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS1wcm9ibGVtcyB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbiMke25zfS1uYXYge1xuICBvcGFjaXR5OiAwLjU7XG4gIHBhZGRpbmc6IDEuMmVtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LW5hdiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbiMke25zfS1uYXY6aG92ZXIge1xuICBvcGFjaXR5OiAxO1xufVxuXG4jJHtuc30tbmF2IGRpdiB7XG4gIGJhY2tncm91bmQ6ICNmZjVmNTg7XG4gIGJvcmRlci1yYWRpdXM6IDEuMmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiAxLjJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMS4yZW07XG59XG5cbmRpdiMke25zfS1taW4ge1xuICBiYWNrZ3JvdW5kOiAjZmZiZDJlO1xuICBtYXJnaW4tbGVmdDogMC44ZW07XG59XG5cbiMke25zfS1iZWFjb24ge1xuICBib3JkZXItcmFkaXVzOiAzZW07XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgaGVpZ2h0OiAzZW07XG4gIG1hcmdpbjogMS42ZW0gYXV0bztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogM2VtO1xufVxuXG4jJHtuc30tYmVhY29uOmJlZm9yZSwgIyR7bnN9LWJlYWNvbjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogcmdiYSgxMjcsMTg1LDAsIDAuMik7XG4gIGJvcmRlci1yYWRpdXM6IDNlbTtcbiAgb3BhY2l0eTogMDtcbn1cblxuIyR7bnN9LWJlYWNvbjpiZWZvcmUge1xuICBhbmltYXRpb246ICR7bnN9LXB1bHNlIDNzIGluZmluaXRlIGxpbmVhcjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbn1cblxuIyR7bnN9LWJlYWNvbjphZnRlciB7XG4gIGFuaW1hdGlvbjogJHtuc30tcHVsc2UgM3MgMnMgaW5maW5pdGUgbGluZWFyO1xufVxuXG5cbkBrZXlmcmFtZXMgJHtuc30tcHVsc2Uge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNik7XG4gIH1cbiAgMzMlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gIH1cbn1cblxuIyR7bnN9LWJlYWNvbiBtYXJrIHtcbiAgYmFja2dyb3VuZDogcmdiYSgxMjcsIDE4NSwgMCwgMSk7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCUgMTAwJTtcbiAgaGVpZ2h0OiAxZW07XG4gIGxlZnQ6IDFlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDFlbTtcbiAgd2lkdGg6IDFlbTtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS1lcnJvciBtYXJrIHtcbiAgYmFja2dyb3VuZDogI2ZmNWY1ODtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS1lcnJvcjpiZWZvcmUsICMke25zfS1iZWFjb24uZXJyb3I6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgOTUsIDg4LCAwLjIpO1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LXdhcm5pbmcgbWFyayB7XG4gIGJhY2tncm91bmQ6ICNmZmJkMmU7XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30td2FybmluZzpiZWZvcmUsICMke25zfS1iZWFjb24ud2FybmluZzphZnRlciB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAxODksIDQ2LCAwLjIpO1xufVxuYDtcblxuY29uc3QgaHRtbCA9IGBcbjxhc2lkZSBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1oaWRkZW5cIiB0aXRsZT1cImJ1aWxkIHN0YXR1c1wiPlxuICA8ZmlndXJlIGlkPVwiJHtuc30tYmVhY29uXCI+XG4gICAgPG1hcmsvPlxuICA8L2ZpZ3VyZT5cbiAgPG5hdiBpZD1cIiR7bnN9LW5hdlwiPlxuICAgIDxkaXYgaWQ9XCIke25zfS1jbG9zZVwiIHRpdGxlPVwiY2xvc2VcIj48L2Rpdj5cbiAgICA8ZGl2IGlkPVwiJHtuc30tbWluXCIgdGl0bGU9XCJtaW5taXplXCI+PC9kaXY+XG4gIDwvbmF2PlxuICA8aDEgaWQ9XCIke25zfS10aXRsZVwiPlxuICAgIGJ1aWxkIHN0YXR1c1xuICAgIDxlbSBpZD1cIiR7bnN9LXRpdGxlLWVycm9yc1wiPjwvZW0+XG4gICAgPGVtIGlkPVwiJHtuc30tdGl0bGUtd2FybmluZ3NcIj48L2VtPlxuICA8L2gxPlxuICA8YXJ0aWNsZSBpZD1cIiR7bnN9LXByb2JsZW1zXCI+XG4gICAgPHByZSBpZD1cIiR7bnN9LXN1Y2Nlc3NcIj48ZW0+QnVpbGQgU3VjY2Vzc2Z1bDwvZW0+PC9wcmU+XG4gICAgPHByZSBpZD1cIiR7bnN9LWVycm9yc1wiPjwvcHJlPlxuICAgIDxwcmUgaWQ9XCIke25zfS13YXJuaW5nc1wiPjwvcHJlPlxuICA8L2FydGljbGU+XG48L2FzaWRlPlxuYDtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgY29uc3QgaGlkZGVuID0gYCR7bnN9LWhpZGRlbmA7XG4gIGxldCBhc2lkZTtcbiAgbGV0IGJlYWNvbjtcbiAgbGV0IHByb2JsZW1zO1xuICBsZXQgcHJlRXJyb3JzO1xuICBsZXQgcHJlV2FybmluZ3M7XG4gIGxldCB0aXRsZUVycm9ycztcbiAgbGV0IHRpdGxlV2FybmluZ3M7XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgcHJlRXJyb3JzLmlubmVySFRNTCA9ICcnO1xuICAgIHByZVdhcm5pbmdzLmlubmVySFRNTCA9ICcnO1xuICAgIHByb2JsZW1zLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LXN1Y2Nlc3NgKTtcbiAgICBiZWFjb24uY2xhc3NOYW1lID0gJyc7XG4gIH07XG5cbiAgY29uc3QgYWRkRXJyb3JzID0gKGVycm9ycykgPT4ge1xuICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICBiZWFjb24uY2xhc3NMaXN0LmFkZChgJHtuc30tZXJyb3JgKTtcblxuICAgICAgZm9yIChjb25zdCBlcnJvciBvZiBlcnJvcnMpIHtcbiAgICAgICAgY29uc3QgbWFya3VwID0gYDxlbT5FcnJvcjwvZW0+IGluICR7ZXJyb3J9YDtcbiAgICAgICAgYWRkSHRtbChtYXJrdXAsIHByZUVycm9ycyk7XG4gICAgICB9XG5cbiAgICAgIHRpdGxlRXJyb3JzLmlubmVyVGV4dCA9IGAke2Vycm9ycy5sZW5ndGh9IEVycm9yKHMpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGVFcnJvcnMuaW5uZXJUZXh0ID0gJyc7XG4gICAgfVxuICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcbiAgfTtcblxuICBjb25zdCBhZGRXYXJuaW5ncyA9ICh3YXJuaW5ncykgPT4ge1xuICAgIGlmICh3YXJuaW5ncy5sZW5ndGgpIHtcbiAgICAgIGlmICghYmVhY29uLmNsYXNzTGlzdC5jb250YWlucyhgJHtuc30tZXJyb3JgKSkge1xuICAgICAgICBiZWFjb24uY2xhc3NMaXN0LmFkZChgJHtuc30td2FybmluZ2ApO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHdhcm5pbmcgb2Ygd2FybmluZ3MpIHtcbiAgICAgICAgY29uc3QgbWFya3VwID0gYDxlbT5XYXJuaW5nPC9lbT4gaW4gJHt3YXJuaW5nfWA7XG4gICAgICAgIGFkZEh0bWwobWFya3VwLCBwcmVXYXJuaW5ncyk7XG4gICAgICB9XG5cbiAgICAgIHRpdGxlV2FybmluZ3MuaW5uZXJUZXh0ID0gYCR7d2FybmluZ3MubGVuZ3RofSBXYXJuaW5nKHMpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGVXYXJuaW5ncy5pbm5lclRleHQgPSAnJztcbiAgICB9XG5cbiAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG4gIH07XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBhZGRDc3MoY3NzKTtcbiAgICBbYXNpZGVdID0gYWRkSHRtbChodG1sKTtcbiAgICBiZWFjb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tYmVhY29uYCk7XG4gICAgcHJvYmxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tcHJvYmxlbXNgKTtcbiAgICBwcmVFcnJvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tZXJyb3JzYCk7XG4gICAgcHJlV2FybmluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30td2FybmluZ3NgKTtcbiAgICB0aXRsZUVycm9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS10aXRsZS1lcnJvcnNgKTtcbiAgICB0aXRsZVdhcm5pbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXRpdGxlLXdhcm5pbmdzYCk7XG5cbiAgICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1jbG9zZWApO1xuICAgIGNvbnN0IG1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1taW5gKTtcblxuICAgIGFzaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tbWluYCk7XG4gICAgfSk7XG5cbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGFzaWRlLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWhpZGRlbmApO1xuICAgIH0pO1xuXG4gICAgbWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGFzaWRlLmNsYXNzTGlzdC5hZGQoYCR7bnN9LW1pbmApO1xuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgc29ja2V0TWVzc2FnZShzb2NrZXQsIChhY3Rpb24sIGRhdGEpID0+IHtcbiAgICBpZiAoIWFzaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJ3Byb2JsZW1zJzpcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgYWRkRXJyb3JzKGRhdGEuZXJyb3JzKTtcbiAgICAgICAgYWRkV2FybmluZ3MoZGF0YS53YXJuaW5ncyk7XG4gICAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgaWYgKCFwcmVFcnJvcnMuY2hpbGRyZW4ubGVuZ3RoICYmICFwcmVXYXJuaW5ncy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXNldCgpO1xuICAgICAgICBwcm9ibGVtcy5jbGFzc0xpc3QuYWRkKGAke25zfS1zdWNjZXNzYCk7XG4gICAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGFzaWRlLmNsYXNzTGlzdC5hZGQoaGlkZGVuKSwgM2UzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IGFkZEh0bWwgPSAoaHRtbCwgcGFyZW50KSA9PiB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBub2RlcyA9IFtdO1xuXG4gIGRpdi5pbm5lckhUTUwgPSBodG1sLnRyaW0oKTtcblxuICB3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcbiAgICBub2Rlcy5wdXNoKChwYXJlbnQgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpKTtcbiAgfVxuXG4gIHJldHVybiBub2Rlcztcbn07XG5cbmNvbnN0IGFkZENzcyA9IChjc3MpID0+IHtcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChjc3Muc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxuXG4gIC8vIGFwcGVuZCB0aGUgc3R5bGVzaGVldCBmb3IgdGhlIHN2Z1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn07XG5cbmNvbnN0IHNvY2tldE1lc3NhZ2UgPSAoc29ja2V0LCBoYW5kbGVyKSA9PiB7XG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgZGF0YSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgIGhhbmRsZXIoYWN0aW9uLCBkYXRhKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgYWRkQ3NzLCBhZGRIdG1sLCBzb2NrZXRNZXNzYWdlIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQG9uZS9jb3JlXCIpO1xudmFyIEFwcEJhY2tncm91bmRNb2R1bGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwQmFja2dyb3VuZE1vZHVsZSgpIHtcbiAgICB9XG4gICAgQXBwQmFja2dyb3VuZE1vZHVsZSA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBjb3JlXzEuTW9kdWxlKClcbiAgICBdLCBBcHBCYWNrZ3JvdW5kTW9kdWxlKTtcbiAgICByZXR1cm4gQXBwQmFja2dyb3VuZE1vZHVsZTtcbn0oKSk7XG5leHBvcnRzLkFwcEJhY2tncm91bmRNb2R1bGUgPSBBcHBCYWNrZ3JvdW5kTW9kdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF90aGlzID0gdGhpcztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb3JlXzEgPSByZXF1aXJlKFwiQG9uZS9jb3JlXCIpO1xudmFyIGFwcF9iYWNrZ3JvdW5kX21vZHVsZV8xID0gcmVxdWlyZShcIi4vYmFja2dyb3VuZC9hcHAuYmFja2dyb3VuZC5tb2R1bGVcIik7XG4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcHA7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYXBwID0gbmV3IGNvcmVfMS5PbmVGYWN0b3J5KGFwcF9iYWNrZ3JvdW5kX21vZHVsZV8xLkFwcEJhY2tncm91bmRNb2R1bGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGFwcC5zdGFydCgpXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfSk7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3R4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEdBO0FBQ0E7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM21DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUVBO0FBQ0E7QUFDQSxhQUVBOzs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=
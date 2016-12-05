/*! grafana - v1.7.0 - 2014-08-28
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","jquery","config","lodash","services/all"],function(a,b,c,d){var e=a.module("grafana.controllers");e.controller("DashboardCtrl",["$scope","$rootScope","dashboardKeybindings","filterSrv","dashboardSrv","dashboardViewStateSrv","panelMoveSrv","timer","$timeout",function(b,e,f,g,h,i,j,k,l){b.editor={index:0},b.panelNames=c.panels;var m;b.init=function(){b.availablePanels=c.panels,b.onAppEvent("setup-dashboard",b.setupDashboard),b.reset_row(),b.registerWindowResizeEvent()},b.registerWindowResizeEvent=function(){a.element(window).bind("resize",function(){l.cancel(m),m=l(function(){b.$broadcast("render")},200)})},b.setupDashboard=function(a,d){k.cancel_all(),e.performance.dashboardLoadStart=(new Date).getTime(),e.performance.panelsInitialized=0,e.performance.panelsRendered=0,b.dashboard=h.create(d),b.dashboardViewState=i.create(b),b.grafana.style=b.dashboard.style,b.filter=g,b.filter.init(b.dashboard);var l=j.create(b.dashboard);b.panelMoveDrop=l.onDrop,b.panelMoveStart=l.onStart,b.panelMoveStop=l.onStop,b.panelMoveOver=l.onOver,b.panelMoveOut=l.onOut,window.document.title=c.window_title_prefix+b.dashboard.title,b.dashboard.refresh&&b.dashboard.set_interval(b.dashboard.refresh),f.shortcuts(b),b.emitAppEvent("dashboard-loaded",b.dashboard)},b.isPanel=function(a){return d.isNull(a)||d.isUndefined(a)||d.isUndefined(a.type)?!1:!0},b.add_row=function(a,b){a.rows.push(b)},b.add_row_default=function(){b.reset_row(),b.row.title="New row",b.add_row(b.dashboard,b.row)},b.reset_row=function(){b.row={title:"",height:"250px",editable:!0}},b.panel_path=function(a){return a?"app/panels/"+a.replace(".","/"):!1},b.edit_path=function(a){var c=b.panel_path(a);return c?c+"/editor.html":!1},b.setEditorTabs=function(a){return b.editorTabs=["General","Panel"],d.isUndefined(a.editorTabs)||(b.editorTabs=d.union(b.editorTabs,d.pluck(a.editorTabs,"title"))),b.editorTabs},b.init()}])});
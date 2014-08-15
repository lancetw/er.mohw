/*! grafana - v1.7.0 - 2014-08-16
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular"],function(a){var b=a.module("grafana.routes");b.config(["$routeProvider",function(a){a.when("/dashboard/db/:id",{templateUrl:"app/partials/dashboard.html",controller:"DashFromDBProvider",reloadOnSearch:!1}).when("/dashboard/elasticsearch/:id",{templateUrl:"app/partials/dashboard.html",controller:"DashFromDBProvider"}).when("/dashboard/temp/:id",{templateUrl:"app/partials/dashboard.html",controller:"DashFromDBProvider"})}]),b.controller("DashFromDBProvider",["$scope","$rootScope","datasourceSrv","$routeParams","alertSrv",function(a,b,c,d,e){var f=c.getGrafanaDB(),g=-1!==window.location.href.indexOf("dashboard/temp");f.getDashboard(d.id,g).then(function(b){a.emitAppEvent("setup-dashboard",b)}).then(null,function(a){e.set("Error",a,"error")})}])});
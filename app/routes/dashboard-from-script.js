/*! grafana - v1.7.0 - 2014-08-16
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","jquery","config","lodash","kbn","moment"],function(a,b,c,d,e,f){var g=a.module("grafana.routes");g.config(["$routeProvider",function(a){a.when("/dashboard/script/:jsFile",{templateUrl:"app/partials/dashboard.html",controller:"DashFromScriptProvider"})}]),g.controller("DashFromScriptProvider",["$scope","$rootScope","$http","$routeParams","alertSrv","$q",function(a,c,g,h,i,j){var k=function(a){var g=new Function("ARGS","kbn","_","moment","window","document","$","jQuery",a.data),i=g(h,e,d,f,window,document,b,b);if(d.isFunction(i)){var k=j.defer();return i(function(a){c.$apply(function(){k.resolve({data:a})})}),k.promise}return{data:i}},l=function(a){var b="app/dashboards/"+a.replace(/\.(?!js)/,"/")+"?"+(new Date).getTime();return g({url:b,method:"GET"}).then(k).then(null,function(b){return console.log("Script dashboard error "+b),i.set("Error","Could not load <i>scripts/"+a+"</i>. Please make sure it exists and returns a valid dashboard","error"),!1})};l(h.jsFile).then(function(b){a.emitAppEvent("setup-dashboard",b.data)})}])});
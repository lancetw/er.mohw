/*! grafana - v1.7.0 - 2014-08-16
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["./lexer"],function(a){function b(b){this.expression=b,this.lexer=new a(b),this.tokens=this.lexer.tokenize(),this.index=0}return b.prototype={getAst:function(){return this.start()},start:function(){try{return this.functionCall()||this.metricExpression()}catch(a){return{type:"error",message:a.message,pos:a.pos}}},curlyBraceSegment:function(){if(this.match("identifier","{")||this.match("{")){for(var a="";!this.match("")&&!this.match("}");)a+=this.consumeToken().value;return this.match("}")||this.errorMark("Expected closing '}'"),a+=this.consumeToken().value,this.match("identifier")&&(a+=this.consumeToken().value),{type:"segment",value:a}}return null},metricSegment:function(){var a=this.curlyBraceSegment();if(a)return a;if(this.match("identifier")||this.match("number"))return{type:"segment",value:this.consumeToken().value};this.match("templateStart")||this.errorMark("Expected metric identifier"),this.consumeToken(),this.match("identifier")||this.errorMark("Expected identifier after templateStart");var b={type:"template",value:this.consumeToken().value};return this.match("templateEnd")||this.errorMark("Expected templateEnd"),this.consumeToken(),b},metricExpression:function(){if(!(this.match("templateStart")||this.match("identifier")||this.match("number")||this.match("{")))return null;var a={type:"metric",segments:[]};for(a.segments.push(this.metricSegment());this.match(".");){this.consumeToken();var b=this.metricSegment();b||this.errorMark("Expected metric identifier"),a.segments.push(b)}return a},functionCall:function(){if(!this.match("identifier","("))return null;var a={type:"function",name:this.consumeToken().value};return this.consumeToken(),a.params=this.functionParameters(),this.match(")")||this.errorMark("Expected closing paranthesis"),this.consumeToken(),a},functionParameters:function(){if(this.match(")")||this.match(""))return[];var a=this.functionCall()||this.numericLiteral()||this.metricExpression()||this.stringLiteral();return this.match(",")?(this.consumeToken(),[a].concat(this.functionParameters())):[a]},numericLiteral:function(){return this.match("number")?{type:"number",value:parseFloat(this.consumeToken().value)}:null},stringLiteral:function(){if(!this.match("string"))return null;var a=this.consumeToken();if(a.isUnclosed)throw{message:"Unclosed string parameter",pos:a.pos};return{type:"string",value:a.value}},errorMark:function(a){var b=this.tokens[this.index],c=b?b.type:"end of string";throw{message:a+" instead found "+c,pos:b?b.pos:this.lexer.char}},consumeToken:function(){return this.index++,this.tokens[this.index-1]},matchToken:function(a,b){var c=this.tokens[this.index+b];return void 0===c&&""===a||c&&c.type===a},match:function(a,b){return this.matchToken(a,0)&&(!b||this.matchToken(b,1))}},b});
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * <preference name="orientation" value="portrait" />
 */
function ajax(url, method, data, async){
    method = typeof method !== 'undefined' ? method : 'GET';
    async = typeof async !== 'undefined' ? async : false;
    if (window.XMLHttpRequest){
        var xhReq = new XMLHttpRequest();
    } else {
        var xhReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (method == 'POST') {
        xhReq.open(method, url, async);
        xhReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhReq.send(data);
    } else {
        if(typeof data !== 'undefined' && data !== null) {
            url = url+'?'+data;
        }
        xhReq.open(method, url, async);
        xhReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhReq.send(null);
    }
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function() {
        console.log('calling push init');
	var notificationOpenedCallback = function(jsonData) {
	    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
	};

	window.plugins.OneSignal
	    .startInit("cde4412e-5fea-4a54-9fae-7f138f525697")
	    .handleNotificationOpened(notificationOpenedCallback)
	    .endInit();
    }
};

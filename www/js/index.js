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
 */
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
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        document.getElementById("uuid").innerHTML = "UUID: "+device.uuid;        

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
    }
};

function getCode(){
  com.phonegap.plugins.barcodescanner.scan(
      function (result) {
          setData(result.text);
          /*alert("Datos obtenidos\n" +
            "Resultado: " + result.text + "\n" +
            "Formato: " + result.format + "\n" +
            "Estado: " + result.cancelled);*/
      },
      function (error) {
          alert("Scanning fallido: " + error);
      },
      {
              preferFrontCamera : false, // iOS and Android
              showFlipCameraButton : false, // iOS and Android
              showTorchButton : false, // iOS and Android
              torchOn: false, // Android, launch with the torch switched on (if available)
              saveHistory: true, // Android, save scan history (default false)
              prompt : "Ubicar código QR en el cuadro central", // Android
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations : true, // iOS
              disableSuccessBeep: false // iOS and Android
          }
          );
}
function setData(fUrl){ 
    //alert(device.uuid+" "+device.model+" "+device.manufacturer+" "+device.platform);
    var ev= $("input[name='chk_event']:checked").val();
    var res = fUrl.split("|");
    $.ajax({
      method: "GET",
      url: "https://agendar.com.co/personalID/lib/ajax_services.php?company="+res[1]+"&local="+res[2],
      data: { action:"register",evnt:ev,uuid:device.uuid,model:device.model,manufacturer:device.manufacturer,platform:device.platform }
  })
    .done(function( msg ) {
        var dat=JSON.parse(msg);
        alert( dat["msg"] );
    });
}
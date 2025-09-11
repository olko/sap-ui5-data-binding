sap.ui.require(
  ["sap/m/Text", "sap/ui/model/json/JSONModel"],
  function (Text, JSONModel) {
    "use strict";

    var oModel = sap.ui.getCore().attachInit(function () {
      var oModel = new JSONModel({
        greetingText: "Hi, my name is... Oliver",
      });

      new Text({
        text: "Hi, my name is... Oliver",
      }).placeAt("content");
    });
  },
);

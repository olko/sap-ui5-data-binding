sap.ui.require(["sap/m/Text"], function (Text) {
  "use strict";

  sap.ui.getCore().attachInit(function () {
    new Text({
      text: "Hi, my name is... Oliver",
    }).placeAt("content");
  });
});

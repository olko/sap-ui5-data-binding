sap.ui.require(
  ["sap/m/Text", "sap/ui/model/json/JSONModel", "sap/ui/core/mvc/XMLView"],
  function (Text, JSONModel, XMLView) {
    "use strict";

    sap.ui.getCore().attachInit(function () {
      var oModel = new JSONModel({
        panelHeaderText: "Data Binding",
        firstName: "Oliver",
        lastName: "Körber",
        enabled: true
      });
      sap.ui.getCore().setModel(oModel);

      new XMLView({
        viewName: "sap.ui.demo.db.view.App"
      }).placeAt("content");
    });
  },
);

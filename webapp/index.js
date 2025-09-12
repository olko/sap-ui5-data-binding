sap.ui.require(
  [
   "sap/m/Text",
   "sap/ui/model/json/JSONModel", 
   "sap/ui/core/mvc/XMLView",
   "sap/ui/model/BindingMode",
   "sap/ui/model/resource/ResourceModel"
  ],
  function (Text, JSONModel, XMLView, BindingMode, ResourceModel) {
    "use strict";

    sap.ui.getCore().attachInit(function () {
      var oModel = new JSONModel({
        panelHeaderText: "Data Binding",
        firstName: "Oliver",
        lastName: "Körber",
        enabled: true
      });

      var oResourceModel = new ResourceModel({
        bundleName: "sap.ui.demo.db.i18n.i18n",
        supportedLocales: ["", "de"],
        fallbackLocale: ""
      })
      // oModel.setDefaultBindingMode(BindingMode.OneWay);
      sap.ui.getCore().setModel(oModel);
      sap.ui.getCore().setModel(oResourceModel, "i18n");

      new XMLView({
        viewName: "sap.ui.demo.db.view.App"
      }).placeAt("content");
    });
  },
);

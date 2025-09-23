sap.ui.require(
  [
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/BindingMode",
    "sap/ui/model/resource/ResourceModel",
  ],
  function (Text, JSONModel, XMLView, BindingMode, ResourceModel) {
    "use strict";

    sap.ui.getCore().attachInit(function () {
      var oProductModel = new JSONModel();
      oProductModel.loadData("./model/Products.json");

      var oModel = new JSONModel({
        panelHeaderText: "Data Binding",
        firstName: "Oliver",
        lastName: "Körber",
        address: {
          street: "Weidmannstr. 2",
          city: "Rothenburg",
          zipcode: "91541",
          country: "Germany",
        },
        priceThreshold: 20,
        salesAmount: 12345.6789,
        currencyCode: "EUR",
        enabled: true,
      });

      var oResourceModel = new ResourceModel({
        bundleName: "sap.ui.demo.db.i18n.i18n",
        supportedLocales: ["", "de"],
        fallbackLocale: "",
      });
      // oModel.setDefaultBindingMode(BindingMode.OneWay);
      sap.ui.getCore().setModel(oModel);
      sap.ui.getCore().setModel(oResourceModel, "i18n");
      sap.ui.getCore().setModel(oProductModel, "products");

      var oView = new XMLView({
        viewName: "sap.ui.demo.db.view.App",
      });
      sap.ui.getCore().getMessageManager().registerObject(oView, true);
      oView.placeAt("content");
    });
  },
);

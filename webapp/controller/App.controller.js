sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/core/Locale",
    "sap/ui/core/LocaleData",
    "sap/ui/model/type/Currency",
    "sap/m/ObjectAttribute",
    "sap/base/Log"
  ],
  function (Controller, mobileLibrary, Locale, LocaleData, Currency, ObjectAttribute, Log) {
    "use strict";

    var replaceUmlauts = function (str) {
      const umlautMap = {
        ä: "ae",
        ö: "oe",
        ü: "ue",
        Ä: "Ae",
        Ö: "Oe",
        Ü: "Ue",
        ß: "ss",
      };
      return str.replace(/[äöüÄÖÜß]/g, (m) => umlautMap[m]);
    };

    return Controller.extend("sap.ui.demo.db.controller.App", {
      formatMail: function (sFirstName, sLastName) {
        var oBundle = this.getView().getModel("i18n").getResourceBundle();

        return mobileLibrary.URLHelper.normalizeEmail(
          replaceUmlauts(sFirstName) +
            "." +
            replaceUmlauts(sLastName) +
            "@it-forum.de",
          oBundle.getText("mailSubject", [sFirstName]),
          oBundle.getText("mailBody"),
        );
      },
      formatStockValue: function (fUnitPrice, iStockLevel, sCurrCode) {
        var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
        var oLocale = new Locale(sBrowserLocale);
        var oLocaleData = new LocaleData(oLocale);
        var oCurrency = new Currency(oLocaleData.mData.CurrencyFormat);
        return oCurrency.formatValue(
          [fUnitPrice * iStockLevel, sCurrCode],
          "string",
        );
      },
      onItemSelected: function (oEvent) {
        var oSelectedItem = oEvent.getSource();
        var oContext = oSelectedItem.getBindingContext("products");
        var sPath = oContext.getPath();
        var oProductDetailPanel = this.byId("productDetailsPanel");
        oProductDetailPanel.bindElement({ path: sPath, model: "products" });
      },
      productListFactory: function(sId, oContext) {
        var oUIControl;
        var bDiscontinued = oContext.getProperty("Discontinued");
        var sDiscontinued = bDiscontinued ? "Discontinued" : "Not discontinued";

        var sLogMessage = "App.controller (ID: " + sId + ", ProductID: " + oContext.getProperty("ProductID") + ") - " +
          oContext.getProperty("ProductName") + ", " +
          oContext.getProperty("UnitsInStock") + ", " +
          sDiscontinued;

        // Decide based on the data which dependent to clone
        if (oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")) {
          // the item is discontinued (and also not in stock anymore)
          // sLogMessage +=  oContext.getProperty("ProductName") + "Discontinued";
          oUIControl = this.byId("productSimple").clone(sId);
        } else {
          // sLogMessage += "App.controller" + sId + " - " + oContext.getProperty("ProductName") + "Not discontinued";
          oUIControl = this.byId("productExtended").clone(sId);

          // if the item is temporarily out of stock, we will add a status
          if (oContext.getProperty("UnitsInStock") < 1) {
            sLogMessage += " but out of stock!";
            oUIControl.addAttribute(new ObjectAttribute({
              text: {
                path: "i18n>outOfStock"
              }
            }))
          }
          Log.info(sLogMessage + "\n");
        }
        return oUIControl;
      }
    });
  },
);

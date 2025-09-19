sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/core/Locale",
    "sap/ui/core/LocaleData",
    "sap/ui/model/type/Currency",
  ],
  function (Controller, mobileLibrary, Locale, LocaleData, Currency) {
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
    });
  },
);

sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/library"],
  function (Controller, mobileLibrary) {
    "use strict";

    var replaceUmlauts = function(str) {
        const umlautMap = {
            ä: "ae", ö: "oe", ü: "ue",
            Ä: "Ae", Ö: "Oe", Ü: "Ue",
            ß: "ss"
          };
        return str.replace(/[äöüÄÖÜß]/g, m => umlautMap[m])
    }

    return Controller.extend("sap.ui.demo.db.controller.App", {
      formatMail: function (sFirstName, sLastName) {
        var oBundle = this.getView().getModel("i18n").getResourceBundle();

        return mobileLibrary.URLHelper.normalizeEmail(
          replaceUmlauts(sFirstName) + "." + replaceUmlauts(sLastName)+ "@it-forum.de",
          oBundle.getText("mailSubject", [sFirstName]),
          oBundle.getText("mailBody"),
        );
      },
    });
  },
);

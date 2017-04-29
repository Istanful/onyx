class SaveManager {
  static load() {
    save = this.decodeCookie(document.cookie) || SaveManager.newGame;
    console.log("loaded: " + save);
  }

  static get newGame() {
    return { balance: 0 };
  }

  static save() {
    let stats = tower.stats;
    for (let i = 0; i < stats.length; i++) {
      save[stats[i].name] = stats[i].level;
    }
    document.cookie = SaveManager.encodeCookie(save);
    return SaveManager.encodeCookie(save);
  }

  static encodeCookie(object) {
    let cookie = "";
    let expiryDate = new Date().setYear(2025);
    console.log(expiryDate)
    for (let key in object) {
      cookie += key + "=" + object[key] + ";"
    }
    cookie += "expires=" + expiryDate + ";path=/;";
    return cookie;
  }

  static decodeCookie(cookie) {
    if (!cookie) { return false; }
    let decodedCookie = {};
    let keyValuePairs = cookie.split(";");
    for (let i = 0; i < keyValuePairs.length; i++) {
      let splitPair = keyValuePairs[i].split("=");
      decodedCookie[splitPair[0]] = splitPair[1];
    }

    return decodedCookie;
  }
}

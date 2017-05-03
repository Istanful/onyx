class SaveManager {
  static autoSave() {
    window.addEventListener("onbeforeunload", function(e) {
      SaveManager.save();
      (e||window.event).returnValue = null;
    });
  }

  static load() {
    save = this.loadCookie() || SaveManager.newGame;
    let stats = tower.stats;
    for (let i = 0; i < stats.length; i++) {
      stats[i].setLevel(save[stats[i].name]);
    }
  }

  static get newGame() {
    let newGame = { balance: 0 }
    let stats = tower.stats;
    for (let i = 0; i < stats.length; i++)
      newGame[stats[i].name] = 1;
    return newGame;
  }

  static save() {
    let expiryDate = new Date().setYear(2025);
    let stats = tower.stats;

    for (let i = 0; i < stats.length; i++)
      save[stats[i].name] = stats[i].level;

    for (let key in save)
      document.cookie = key + "=" + save[key] + ";expires=" + expiryDate + ";path=/;";
  }

  static loadCookie() {
    let cookie = document.cookie;
    if (!cookie) { return false; }

    cookie = cookie.replace(/ /g,''); // Remove whitespace

    let decodedCookie = {};
    let keyValuePairs = cookie.split(";");
    for (let i = 0; i < keyValuePairs.length; i++) {
      let splitPair = keyValuePairs[i].split("=");
      decodedCookie[splitPair[0]] = splitPair[1];
    }

    return decodedCookie;
  }
}

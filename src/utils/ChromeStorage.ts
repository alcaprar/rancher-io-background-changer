export class ChromeStorage {
  constructor () {

  }

  async getOneAsync(key : string) {
    return new Promise<any>((resolve, reject) => {
      try {
        chrome.storage.local.get(key, function(value) {
          resolve(value[key]);
        });
      } catch (ex) {
        reject(ex);
      }
    });
  };

  async setOneAsync (key: string, value: any) {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.set({[key]: value}, function() {
          resolve();
        });
      } catch (ex) {
        reject(ex);
      }
    });
  }
}
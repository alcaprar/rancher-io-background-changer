import {ChromeStorage} from "./utils/ChromeStorage"
import {createLogger} from "./utils/Logger";
const storage = new ChromeStorage();
const logger = createLogger();

let items = [];
const currentHostname = window.location.hostname;

logger.debug("Content script started", currentHostname);
(async () => {
  items = await storage.getOneAsync('items') || [];
  logger.debug("Items found", items)
  const hostnameList = items.map((item) => {
    return item.baseUrl
  })

  logger.debug("Hostname list", hostnameList)
  for (const hostname of hostnameList) {
    logger.debug('Checking', hostname, currentHostname, currentHostname.includes(hostname))
    if (currentHostname.includes(hostname)) {
      logger.info("Hostname found")
      setTimeout(() => {
        startChecking();
      }, 1000)
      break;
    }
  }
})()


const startChecking = () => {
  logger.debug("Start checking")
  setInterval(() => {
    const pathname = window.location.pathname;
    
    for (const item of items) {
      if (currentHostname.includes(item.baseUrl) && pathname.includes(item.string)) {
        try {
          document.body.style.backgroundColor = item.backgroundColor;
        } catch (exc){
          console.log(exc)
        }
      }
    }
  }, 1000)
}
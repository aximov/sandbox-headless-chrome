const CDP = require("chrome-remote-interface");

CDP(async client => {
  const { Network, Page, Runtime } = client;
  try {
    await Network.enable();
    await Page.enable();
    await Network.setCacheDisabled({ cacheDisabled: true });
    await Page.navigate({ url: "https://github.com" });
    await Page.loadEventFired();
    const result = await Runtime.evaluate({
      expression: "document.documentElement.outerHTML"
    });
    const html = result.result.value;
    console.log(html);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}).on("error", err => {
  console.error(err);
});

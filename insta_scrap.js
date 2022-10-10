// const cheerio = require('cheerio');
// const request = require('request');
// const BASE_URL = 'https://www.instagram.com/';

// const getReport = (username) => {

// 	let url = BASE_URL+username;

// 	return new Promise(function(resolve, reject) {
// 		request(url, function(err,resp, body){
// 			if(err)
// 				throw err;

// 			$ =  cheerio.load(body);
// 			let content = $('meta').eq('16').attr('content');
// 			content = content.replace(/,/g , '');
// 			let followers = content.substring(0,content.indexOf("Followers")).trim();
// 			let following = content.substring(content.indexOf("Followers")+9,content.indexOf("Following")).trim();
// 			let posts = content.substring(content.indexOf("Following")+9,content.indexOf("Posts")).trim();

// 			let userInfo = {
// 				username: username,
// 				followers: followers,
// 				following: following,
// 				posts: posts,
// 				dateRequested: Date.now() //Unix time
// 			};

// 			resolve(userInfo);

// 			});
// 	});
//   }

// const getPerson = async() => {
// 	let report = await getReport("logic");
// 		console.log(report)
// }

// module.exports = {getReport};

const puppeteer = require("puppeteer");

async function scrapeIG(url) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url);

    const [e1] = await page.$x(
      '//*[@id="react-root"]/section/main/div/header/section/div[1]/h2'
    );
	console.log(e1)
    const txt1 = await e1.getProperty("textContent");
    const username = await txt1.jsonValue();

    const [e2] = await page.$x(
      '//*[@id="react-root"]/section/main/div/header/section/div[2]/h1'
    );
    const txt2 = await e2.getProperty("textContent");
    const name = await txt2.jsonValue();

    const [e3] = await page.$x(
      '//*[@id="react-root"]/section/main/div/header/section/div[2]/span'
    );
    const txt3 = await e3.getProperty("textContent");
    const bio = await txt3.jsonValue();

    const [e4] = await page.$x(
      '//*[@id="react-root"]/section/main/div/header/section/ul/li[2]/a/span'
    );
    const txt4 = await e4.getProperty("textContent");
    const followers = await txt4.jsonValue();

    const [e5] = await page.$x(
      '//*[@id="react-root"]/section/main/div/header/section/ul/li[3]/a/span'
    );
    const txt5 = await e5.getProperty("textContent");
    const followings = await txt5.jsonValue();

    const [e6] = await page.$x(
      '//*[@id="react-root"]/section/main/div/header/section/ul/li[1]/a/span'
    );
    const txt6 = await e6.getProperty("textContent");
    const posts = await txt6.jsonValue();

    console.log({ username, name, bio, followers, followings, posts });

    browser.close();
    console.log("Press Ctrl+C to close");
  } catch (err) {
    console.error(err.message);
  } finally {
    await browser.close();
  }
}

async function takeScreeshot(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Visiting dotnetcrunch.in and taking screenshot...");
  await page.goto(url);
  await page.screenshot({ path: "dotnetcrunch-web.png" });
  await browser.close();
  console.log("screenshot taken successfully!");
}

var standard_input = process.stdin;

standard_input.setEncoding("utf-8");

console.log("Enter the username: ");

standard_input.on("data", function (data) {
  if (data == "exit\n") {
    console.log("User input complete, program exit.");
    process.exit();
  } else {
    scrapeIG("https://www.instagram.com/developer_n_designer/");

    takeScreeshot("https://www.instagram.com/developer_n_designer/");
  }
});

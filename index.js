const  express = require('express')
const app = express()
const fs = require('fs')
const puppeteer = require("puppeteer");
const config = require('./config')
const axios = require('axios')

// Accept Form Submition
const bodyParser = require('body-parser');
const { getRandomValues } = require('crypto');
const generateHtml = require('./html/generateHtml');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Enable public resource
app.use(express.static('public'))
app.use('/assets', express.static('assets'))


// Ex: Report Template By Date
// - This route call when filters report
app.get('/templates/visa_type', async (req, res) => {
    
    // Filters 
    const query = req.query
    const filters = req.query

    // Headers
    const headers =  {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'device-id': 'F9615C43-E117-49F9-BA54-5F3FEA8062657',
        'access-token': 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJOakZpWlRkaU9URXRaamsxTXkwMVpEVmxMVGs1WTJFdFlUY3dNamRtTXpReE9HWmtkY1lqME5EUUM3YTJkeWJaRzFLVzhwZEJoakY1ak40QnVFWEkxM1lDbEQ4VFB6ZWhQWEN2WjB4ckdlaWQiLCJzdWIiOiI2MWJlN2I5MS1mOTUzLTVkNWUtOTljYS1hNzAyN2YzNDE4ZmQiLCJyb2xlIjoic3RhZmYiLCJwb3J0IjoiUEhOIiwiaWF0IjoxNjk1NzM5MDk2LCJleHAiOjE3MDgzNDM4OTZ9.COMLimV2l_C9G_nnCjeINK8BrexOB7Im1q3k_Kt-JgzIfX1GzY_LVbgEWHA5Zj2SoDM3tXpE5K7o2_fmOmHEPlzpXcIolyRCn9jdN3vMe3xX0qAP_Hia9pnofpZjdVrp-v5F5xDm8gAdLj5LBqktipD2f3z8RUkS4B6Qnr81vVUfi2zictuSbdNgvgkpBTFH2bYHAZInXHpX0NZqf41c3IFTYc_tzBLpToqxY73VFewgdvyYH0WHqPcNsgJX4OHoFP1M3xvPueQSd1y7Fw_EPXznkppGCzeFIRyuqU1RKgpcNDWC285PL0TFcW6ZpQ-D607EpCSbgfwS73uA92HobQ'
    }  

    // Get Visa Types
    const { data } = await axios.get(`http://192.168.1.10:3000/visa_types`, {'headers': headers})
    const visaType = await data.data
    
    // Generate HTML
    const html = generateHtml.visaType({visaType: visaType, filters: filters})

    // Write File                 
    fs.writeFileSync('./templates/visa_type/index.html', html, function (err) {
        if (err) throw err;
        console.log('Thanks, It\'s saved to the file!');
    });

    res.send({'message': 'success generated'})
})



// Read Report Visa Type
app.get('/read-report/visa_type', async (req, res) => {
    const page = fs.readFileSync('./templates/visa_type/index.html', { encoding: 'utf8', flag: 'r' });   
    return res.send(page)
})

// Read Report List Name
app.get('/read-report/name', async (req, res) => {
    const page = fs.readFileSync('./templates/name/index.html', { encoding: 'utf8', flag: 'r' });   
    return res.send(page)
})

// Read Report Nationality
app.get('/read-report/nationality', async (req, res) => {
    const page = fs.readFileSync('./templates/nationality/index.html', { encoding: 'utf8', flag: 'r' });   
    return res.send(page)
})

// Read Report Data
app.get('/read-report/date', async (req, res) => {
    const page = fs.readFileSync('./templates/date/index.html', { encoding: 'utf8', flag: 'r' });   
    return res.send(page)
})

// Read Report Data
app.get('/read-report/all', async (req, res) => {
    const page = fs.readFileSync('./templates/all/index.html', { encoding: 'utf8', flag: 'r' });   
    return res.send(page)
})


// Get PDF 
app.get('/pdf', async (req, res) => {
    const pathFile = __dirname
    console.log(process.cwd()+'/pdf-report/result.pdf')

    const filters = Object.assign({}, req.query)

    // Launch the browser and open a new blank page
    
    const browser = await puppeteer.launch({ headless: true });
    // Create a new page
    const page = await browser.newPage();

    // URL 
    if(filters){
        if(filters.report_by=='name') website_url = 'http://localhost:8080/read-report/name'; // Will change depend on report
        if(filters.report_by=='visa_type') website_url = 'http://localhost:8080/read-report/visa_type'; // Will change depend on report
        if(filters.report_by=='date') website_url = 'http://localhost:8080/read-report/date'; // Will change depend on report
        if(filters.report_by=='nationality') website_url = 'http://localhost:8080/read-report/nationality'; // Will change depend on report
        if(filters.report_by=='all') website_url = 'http://localhost:8080/read-report/nationality'; // Will change depend on report
    } 

    // Open URL in current page
    await page.goto(website_url); 

    //To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Downlaod the PDF
    const pdf = await page.pdf({
        path: 'pdf-report/result.pdf',
        margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
        printBackground: true,
        format: 'A4',
    });

    // Close the browser instance
    await browser.close();
    // Send File PDF
    res.status(200).sendFile(process.cwd()+'/pdf-report/result.pdf') 
})


app.listen(8080, console.log('server is running...'))
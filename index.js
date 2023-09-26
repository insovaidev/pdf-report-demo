const  express = require('express')
const app = express()
const fs = require('fs')
const puppeteer = require("puppeteer");
const config = require('./config')
const axios = require('axios')

// Accept Form Submition
const bodyParser = require('body-parser');
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

    const headers =  {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'device-id': 'F9615C43-E117-49F9-BA54-5F3FEA8062657',
            'access-token': 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJOakZpWlRkaU9URXRaamsxTXkwMVpEVmxMVGs1WTJFdFlUY3dNamRtTXpReE9HWms4UDU2aGZyVDh6WVZGRm1ET3VydlRBSkpiWWdqVU5TV3pPOWhuZlc1MFdQUkhNeUxEUm5ZdkdLZGhnUGgiLCJzdWIiOiI2MWJlN2I5MS1mOTUzLTVkNWUtOTljYS1hNzAyN2YzNDE4ZmQiLCJyb2xlIjoic3RhZmYiLCJwb3J0IjoiUEhOIiwiaWF0IjoxNjk1Njk3NDk0LCJleHAiOjE3MDgzMDIyOTR9.M9yAAXQPrSvt0COak3C9w2WRKb0V_G2B5leu6ds424EV29RGrR4sq5X4d57Duhei1NylAVSqYfQCd-8BvXz9yoUreZVJeBAwd8r8Qsy3LnLUju5gnlMCnYTcffzzB2Jwp4ZT7ELk9EkIBgLHy4kgTnJp4TbMKY_3byimpyXHGUb9SBw6uoP85w_A2Bp6elMRRQ1WSyVzfW7zCPHupa242GR4fAAS2XcjkQYhE66O5gttxwXwRR_p-FF1o2Q_eK7p4lV5mnDBshiDQQSpSvnt_jdVKQhB9PNl2rp8Z2rvFB3cps_Ch_etiWTKn_LSqeYLssX78Nxg4Au4-jnV9xkUGQ'
    }  
    // Get Visa Types
    const { data } = await axios.get(`http://192.168.88.209:5000/visa_types`, {'headers': headers})
    const visaType = await data.data

    // Sign For Replace
    const bq = '`';
    const ms = '$';
    const cll = '{';
    const clr = '}';
    
    // Literal Template Demo
    const html =`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Report Visa Type</title>
    </head>
    <style>
        @font-face {
            font-family: Khmer;
            src: url('../../assets/fonts/khmer/Khmer-Regular.ttf');
        }

        @font-face {
            font-family: Moul;
            src: url('../../assets/fonts/moul/Moul-Regular.ttf');
        }
    
        body {
            max-width: 920px;
            text-align: center;
            margin: 0 auto;
        }
    
        h2,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        span {
            margin: 0;
            padding: 0;
        }
    
        main {
            max-width: 920px;
            background-color: #fff;
        }
    
        /* font family */
        .khmer {
            font-family: 'Khmer', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
    
        .moul {
            font-family: 'Moul', cursive;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
    
        /* display */
        .d-flex {
            display: flex;
            flex-flow: row nowrap;
        }
    
        .items-start {
            align-items: start;
        }
    
        .items-center {
            align-items: center;
        }
    
        .justify-between {
            justify-content: space-between;
        }
    
        .justify-center {
            justify-content: center;
        }
    
        .justify-start {
            justify-content: center;
        }
    
        .flex-1 {
            flex: 1;
        }
    
        .flex-4 {
            flex: 4;
        }
    
        /* text color */
        .color-cyan {
            color: #0BACD5;
        }
    
        .color-cyan50 {
            color: #0BACD5;
            font-weight: 500;
        }
    
        /* text */
        .text-center {
            text-align: center;
        }
    
        .text-start {
            text-align: start;
        }
    
        .text-end {
            text-align: end;
        }
    
    
        /* padding */
        .p-8 {
            padding: 8px;
        }
    
        .p-10 {
            padding: 10px;
        }
    
        .p-20 {
            padding: 20px;
        }
    
        /* margin */
        .mb-8 {
            margin-bottom: 8px;
        }
    
    
        /* font size */
        .fs-8 {
            font-size: 0.8rem;
        }
    
        .fs-9 {
            font-size: 0.9rem;
        }
    
        .fs-10 {
            font-size: 1rem;
        }
    
        .fs-11 {
            font-size: 1.1rem;
        }
    
        .fs-12 {
            font-size: 1.2rem;
        }
    
        .fs-15 {
            font-size: 1.5rem;
        }
    
        /* font style */
        .italic {
            font-style: italic;
        }
    
        .underline {
            text-decoration: underline;
        }
    
        /* font weight */
        .fw-40 {
            font-weight: 400;
        }
    
        .fw-50 {
            font-weight: 500;
        }
    
        .fw-60 {
            font-weight: 600;
        }
    </style>
    
    <body>
        <main class="p-10">
            <!-- header -->
            <header class="d-flex items-start justify-between">
                <div class="text-center">
                    <h4 class="moul color-cyan50 fs-10">នាយកដ្ធានជនបរទេស</h4>
                    <h4 class="moul color-cyan50 fs-10">មិនមែនអន្តោប្រវេសន្តនិងបច្ចេកវិទ្យា</h4>
                    <p class="khmer color-cyan italic fs-10">ការិយាល័យ ផ្តល់ទិដ្ឋាការ</p>
                    <p class="khmer color-cyan fs-10">ក្រុមផ្តល់ទិដ្ឋាការ ប្រចាំ អ.ក ភ្នំពេញ</p>
                    <img width="80px" src="${config.baseUrl}assets/header-style.png" />
                </div>
                <div>
                    <div class="text-center">
                        <h4 class="moul color-cyan50 fs-11">ព្រះរាជាណាចក្រកម្ពុជា</h4>
                        <h4 class="moul color-cyan50 fs-11">ជាតិ សាសនា ព្រះមហាក្សត្រ</h4>
                        <img width="100px" src="${config.baseUrl}assets/header-style.png" />
                    </div>
                </div>
            </header>
    
            <!-- welcome -->
            <div class="text-center">
                <h4 class="moul fw-50 underline fs-10">គោរពជូន</h4>
                <h4 id="status-1" class="khmer fs-9">Text ...</h4>
            </div>
    
            <!-- body -->
            <div class="d-flex items-start justify-start">
                <div class="flex-1">
                    <h4 class="moul fw-50 underline fs-10">កម្មវត្តុៈ</h4>
                </div>
                <div class="flex-4">
    
                    <!-- status date -->
                    <p id="status-date" class="text-start khmer fs-9"></p>
    
                    <h4 class="text-start moul fw-50 underline fs-9 mb-8">ក. ប្រភេទទិដ្ឋាការបង់អាករ</h4>
                    <!-- visa 1 -->
                    <div id="visa-1"></div>
    
                    <h4 class="text-start moul fw-50 underline fs-9 mb-8">ខ. ប្រភេទទិដ្ឋាការមិនបង់អាករ</h4>
                    <!-- visa 2 -->
                    <div id="visa-2"></div>
    
                    <div class="d-flex mb-8">
                        <p class="text-end moul fw-50 fs-9" style="width: 360px;">សរុបភ្ញៀវចំនួន</p>
                        <p style="width: 30px;"></p>
                        <p id="total" class="text-center khmer fw-50 fs-9" style="width: 100px;">0</p>
                        <p class="text-start khmer fw-50 fs-9" style="width: 80px;">នាក់</p>
                    </div>
    
                    <div class="d-flex items-center justify-between">
                        <h4 class="text-start moul fw-50 underline fs-9 mb-8">គ. ចំណុចគួរអោយកត់សំគាល់ៈ</h4>
                        <h4 id="status-2" class="khmer fs-9" style="width: 300px;">Text ...</h4>
                    </div>
                    <p class="text-start khmer fs-9" style="width: 485px;">អាស្រ័យហេតុនេះសូម មេត្តា ពិនិត្យ និង ជ្រាបជា
                        របាយការណ៍ដ៏ខ្ពង់ខ្ពស់ ។</p>
                    <p class="khmer fs-9" style="width: 440px;">សូម មេត្តាទទួលនូវការគោរពដ៏ខ្ពង់ខ្ពស់ អំពីយើងខ្ញុំ ។</p>
    
                    <div class="d-flex items-start justify-between">
                        <h4></h4>
                        <div>
                            <h4 id="status-3" class="khmer fs-9" style="width: 300px;">Text ...</h4>
                            <p id="last-date" class="khmer fs-10"></p>
                            <h4 class="moul fw-50 fs-10">ប្រធានក្រុមផ្តល់ទិដ្ឋាការ</h4>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <script>
            var statusDate = document.querySelector("#status-date");
            var visaType1 = document.querySelector("#visa-1");
            var visaType2 = document.querySelector("#visa-2");
            var status1 = document.querySelector("#status-1");
            var status2 = document.querySelector("#status-2");
            var status3 = document.querySelector("#status-3");
            var lastDate = document.querySelector("#last-date");
            var total = document.querySelector("#total");

            const startDataString = '${filters.start_date}'
            const endDataString = '${filters.end_date}'
    
            const start = new Date(${bq}${ms}${cll}startDataString${clr}${bq});
            const end = new Date(${bq}${ms}${cll}endDataString${clr}${bq});
    
            var startDate = ${bq}${ms}${cll}start.getDate()${clr}-${ms}${cll}start.getMonth()+1${clr}-${ms}${cll}start.getFullYear()${clr}${bq};
            var endDate = ${bq}${ms}${cll}end.getDate()${clr}-${ms}${cll}end.getMonth()+1${clr}-${ms}${cll}end.getFullYear()${clr}${bq};
    
            var port = {
                "PHN": { "title": "ភ្នំពេញ", "status": "រាជធានី" },
                "PSN": { "title": "ព្រះសីហនុ", "status": "ក្រុង" },
                "SRP": { "title": "សៀមរាប", "status": "ក្រុង" },
            };

            var dataVisa = ${JSON.stringify(visaType)} 
            var filters_data = ${JSON.stringify(filters.data)}
            var visaList = JSON.parse(filters_data)
            var dataList = visaList["data"];
            dataVisa.sort(function (a, b) { return a.sort_reports - b.sort_reports });
    
            var noPrice = [];
            var price = [];
            dataVisa.forEach(val => {
                if (val["price"] != 0) {
                    price.push(val);
                } else {
                    noPrice.push(val);
                }
            });

            statusDate.innerHTML = ${bq}
            ស្តីពីចំនួនភ្ញៀវបរទេស ដែលបានមកសុំទិដ្ឋាការចូលព្រះរាជាណាចក្រកម្ពុជា
                        នៅអាកាសយាន្តដ្ធាន ${ms}${cll}port["SRP"]["title"]${clr} ចាប់ពីថ្ងៃទី ${ms}${cll}startDate${clr}
                        ដល់ថ្ងៃទី ${ms}${cll}endDate${clr} ។${bq};
    
            status1.innerHTML = ${bq}Status 1${bq};
            status2.innerHTML = ${bq}Status 2${bq};
            status3.innerHTML = ${bq}Status 3${bq};
            total.innerHTML = ${bq}${ms}${cll}visaList["total"]??0${clr}${bq};
    
            lastDate.innerHTML = ${bq}
            ${ms}${cll}port["SRP"]["status"]}${ms}${cll}port["SRP"]["title"]}. ថ្ងៃទី ${ms}${cll}end.getDate()} ខែ ${ms}${cll}end.getMonth()+1} ឆ្នាំ ${ms}${cll}end.getFullYear()${clr}
            ${bq};
    
            price.forEach((value, i) => {
                visaType1.innerHTML += ${bq}
                    <div class="d-flex mb-8">
                        <p class="text-start khmer fw-60 fs-9" style="width: 250px;">${ms}${cll}i + 1}. ${ms}${cll}value["label"]${clr}</p>
                        <p class="text-center khmer fw-60 fs-9" style="width: 60px;">${ms}${cll}value["type"]}</p>
                        <p class="text-start khmer fw-50 fs-9" style="width: 80px;">ចំនួន =</p>
                        <p class="text-center khmer fw-50 fs-9" style="width: 100px;">${ms}${cll}dataList[value["type"]] ?? 0${clr}</p>
                        <p class="text-start khmer fw-50 fs-9" style="width: 80px;">នាក់</p>
                    </div>
                    ${bq};
                ${clr});
    
            noPrice.forEach((value, i) => {
                visaType2.innerHTML += ${bq}
                    <div class="d-flex mb-8">
                        <p class="text-start khmer fw-60 fs-9" style="width: 250px;">${ms}${cll}i + 1}. ${ms}${cll}value["label"]${clr}</p>
                        <p class="text-center khmer fw-60 fs-9" style="width: 60px;">${ms}${cll}value["type"]}</p>
                        <p class="text-start khmer fw-50 fs-9" style="width: 80px;">ចំនួន =</p>
                        <p class="text-center khmer fw-50 fs-9" style="width: 100px;">${ms}${cll}dataList[value["type"]] ?? 0${clr}</p>
                        <p class="text-start khmer fw-50 fs-9" style="width: 80px;">នាក់</p>
                    </div>
                    ${bq};
                ${clr});
        </script>
    </body>
    </html>
    `
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

    const filters = Object.assign({}, req.query)

    // Launch the browser and open a new blank page
    
    const browser = await puppeteer.launch();
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
    res.status(200).sendFile('C:/Users/PC 1/Desktop/test/pdf-report/result.pdf') 
})


app.listen(8080, console.log('server is running...'))
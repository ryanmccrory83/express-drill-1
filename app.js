const express = require('express');
const app = express();
const port = parseInt(process.env.PORT || 3000);
const csvToJson = require('convert-csv-to-json');
const data = csvToJson.fieldDelimiter(',').getJsonFromCsv('cohorts.csv');
const cors = require('cors');

function findById(data, id){
    for (let i = 0; i < data.length; i++){
        let cohortString = data[i].id.toString();
        if (cohortString === id){
            return data[i];
        }
    }return null;
}

app.use(cors());

app.get('/', (request, response) => {
    response.json({data: data});
})

app.get('/:id', (request,response) => {
    const cohort = findById(data, request.params.id);
    if (!cohort){
        response.status(404).send({
            error: {
                message: "No record found!"
            }
        })
    }else {
        response.json({data: cohort});
    }
});

app.listen(port);

 
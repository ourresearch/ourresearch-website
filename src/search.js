import axios from 'axios'
import _ from 'lodash'

let makeObjectsFromRows = function(headerRow, rows){
    return rows.map(row => {
        let rowDict = {}
        headerRow.forEach((columnName, i)=>{
            rowDict[columnName] = row[i]
        })
        return rowDict
    })
}

class UserInput {
    constructor(opts){
        this.choices = opts.choices
        this.default = opts.default
        this.selected = opts.default
    }

    setFromUrl(newVal){
        if (!newVal){
            newVal = this.default
        }
        else if (newVal.indexOf(",") > -1) {
            newVal = newVal.split(",")
            newVal.sort()
        }
        else if (newVal === "false") {
            newVal = false
        }
        this.selected = newVal
    }

    getForUrl(){
        if (this.getString() === this.default.toString()){
            return
        }
        return this.getString()
    }

    getAsKey(){
        return this.getString().replace(/,/g, "_")
    }

    getString(){
        let selected
        if (Array.isArray(this.selected)){
            selected = this.selected.concat().sort().join()
        }
        else {
            selected = this.selected.slice()
        }
        return selected
    }

}

let userInputs = {
    year: new UserInput({
        choices: ["2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"],
        default: "2018"
    }),
    oa: new UserInput({
        choices: ["bronze","gold","green","hybrid"],
        default: ["bronze","gold","green","hybrid"],
    }),
    geoType: new UserInput({
        choices: ["country", "subcontinent", "continent", "global"],
        default: "country",
    })
}




export const search = {
    loading: false,
    results: [],
    db: [],
    userInputs: userInputs,


    getProcessedResults(){
        if (!this.db.length){
            return []
        }

        let filteredGeos = this.db
            .filter(geo => {
                return geo.level === this.userInputs.geoType.selected
            })
            .filter(geo => {
                return geo.year.toString() === this.userInputs.year.selected
            })
            .filter(geo => {
                return geo.num_distinct_articles > 100
            })

        let numFilteredArticles = filteredGeos
            .reduce((prev, cur)=>{
                return prev + cur.num_distinct_articles
            }, 0)


        let ret = filteredGeos
            .map(geo => {
                // find percent OA for the user-selected type of OA
                let key = this.userInputs.oa.getAsKey()

                let numSelectedArticles = geo[key]
                geo.percentOa = Math.round(100 * numSelectedArticles / geo.num_distinct_articles)

                // find percent global total articles for this geo
                geo.percentGlobal = Math.round(100 * geo.num_distinct_articles / numFilteredArticles)


                // done
                return geo
            })

        ret.sort((a, b) => {
            return b.percentOa - a.percentOa
        })

        let highestPercentOa = ret[0].percentOa

        ret = ret.map(geo => {
            geo.percentOaNormalized = geo.percentOa / highestPercentOa
            return geo
        })

        return ret
    },

    fetchResults: function(){
        this.db = []
        this.loading = true

        let url = "https://rickscafe-api.herokuapp.com/metrics/geo_all"
        let request = axios.get(url)
            .then(resp => {
                console.log("got country data back")
                this.db = makeObjectsFromRows(
                    resp.data.response.keys,
                    resp.data.response.values
                )

            })
            .catch(e=> {
                console.log("country API error", e)
            })
            .finally(() =>{
                this.loading = false
            })
        return request
    },

    setUserInputsFromUrl(queryObj){
        for (const k in this.userInputs){
            this.userInputs[k].setFromUrl(queryObj[k])
        }

    },

    getUserInputsForUrl(){
        let ret = {}
        Object.entries(this.userInputs).forEach( ([userInputName, userInput]) => {
            if (userInput.getForUrl()){
                ret[userInputName] = userInput.getForUrl()
            }
        })
        return ret

    },
    incrementYear(){
        let intYear = parseInt(userInputs.year.selected)
        if (intYear < 2018){
            intYear += 1
        }

        userInputs.year.selected = intYear.toString()
    },
    decrementYear(){
        let intYear = parseInt(userInputs.year.selected)
        if (intYear > 2009){
            intYear -= 1
        }
        console.log("intyear", intYear)
        userInputs.year.selected = intYear.toString()

    }











}
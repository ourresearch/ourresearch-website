import * as d3 from 'd3'
import Datamap from 'datamaps'


let d = {
    map: null
}
let colors = d3.scaleLinear().domain([1, 10]).range(["white", "orangered"])


function deleteMap() {
    d.map = null
    document.getElementById('map-container').innerHTML = ""
}


function updateMap(geosDict){
    for (let id in geosDict) {
        geosDict[id].color = colors(10 * geosDict[id].percentOaNormalized)
    }
    d.map.updateChoropleth(geosDict)
}



function drawMap(vueRouter, geoData) {

    d.map = new Datamap({
        element: document.getElementById('map-container'),
        fills: {
            defaultFill: "#ccc"
        },
        scope: "countries1",
        setProjection: function (element, options) {
            var projection = d3.geoEquirectangular()
                .center([0, 0]) // always in [East Latitude, North Longitude]
                .scale(element.offsetWidth / 6)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geoPath().projection(projection);
            return {path: path, projection: projection};
        },
        done: function (datamap) {
            d.map.updateChoropleth(geoData)
            datamap.svg.selectAll('.datamaps-subunit').on('click', function (geo) {
                console.log("click on geo", geo)
                vueRouter.push("loc/" + geo.id)
            })
        },
        geographyConfig: {
            // dataUrl: "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json",
            dataUrl: "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json",

            borderColor: '#ffffff',
            borderWidth: 1,
            popupTemplate: function (geography, data) {
                return '<div class="hoverinfo">' + geography.properties.name + ':<strong> ' + data.percentOa + '%</strong></div>';
            },
            highlightOnHover: true,
            highlightFillColor: 'orangered',
            highlightBorderColor: 'orangered',
            highlightBorderWidth: 1,
            highlightBorderOpacity: 1
        },
    });


}


export const datamap = {
    delete: deleteMap,
    update: updateMap,
    draw: drawMap




}
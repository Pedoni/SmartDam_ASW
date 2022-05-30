<template>
  <div class="panoramic">
        <div id="viewer"></div>
  </div>
</template>

<script>
import { Viewer } from 'photo-sphere-viewer';
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
/**
 * Longitude: , Latitude: 
 * Longitude: , Latitude: 
 */
export default {
  name: 'PanoramicComponent',
  data() {
        return {
            alertText: "ALERT",
            preAlertText: "PRE ALERT",
            normalText: "NORMAL",
            damHeight: 30,
            highPoint: {
                lat: -0.17741305282656916,
                lon: 5.016652578705191
            },
            lowPoint: {
                lat: -0.811019761355212,
                lon: 5.866500196608605
            }
        };
  },
  mounted() {
    const viewer = new Viewer({
        container: document.querySelector('#viewer'),
        panorama: 'https://i1.wp.com/www.samrohn.com/wp-content/uploads/hoover-dam-360-virtual-tour-01.jpg',
        defaultZoomLvl: 0,
        loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
        navbar: [
            'zoom',
            'caption',
            'fullscreen',
        ],
        plugins: [
            [MarkersPlugin, {
                markers: [
                    {
                        id: '1',
                        polylineRad: [[4.919, -0.2], [5.58, -0.08], [5.53, -0.21], [4.92, -0.40]],
                        svgStyle: {
                            fill: 'rgba(255, 0, 0, 0.2)',
                            strokeWidth: '10px'
                        },
                        tooltip: {
                            content: this.alertText,
                            position: 'right bottom'
                        },
                    },
                    {
                        id: '2',
                        polylineRad: [[4.92, -0.40], [5.53, -0.21], [5.59, -0.38], [5.06, -0.60]],
                        svgStyle: {
                            fill: 'rgba(0, 255, 0, 0.2)',
                            strokeWidth: '10px'
                        },
                        tooltip: {
                            content: this.preAlertText,
                            position: 'right bottom'
                        },
                    },
                    {
                        id: '3',
                        polylineRad: [[5.06, -0.60], [5.59, -0.38], [5.86, -0.72], [5.83, -0.78], [5.87, -0.87], [5.99, -0.96],
                        [0.015, -1.04], [0.042, -1.04], [0.36, -1.01], [1, -0.58], [1.05, -0.77]],
                        svgStyle: {
                            fill: 'rgba(0, 0, 255, 0.2)',
                            strokeWidth: '10px'
                        },
                        tooltip: {
                            content: this.normalText,
                            position: 'right bottom'
                        },
                    },
                    {
                        id: '4',
                        polylineRad: [[4.59, -0.38], [4.67, -0.26], [4.69, -0.38]],
                        svgStyle: {
                            fill: 'rgba(255, 0, 0, 0.2)',
                            strokeWidth: '10px'
                        },
                        tooltip: {
                            content: this.alertText,
                            position: 'right bottom'
                        },
                    },
                    {
                        id: '5',
                        polylineRad: [[1.11, -0.38], [1.23, -0.58], [1.05, -0.77], [1, -0.58], [1.07, -0.44], [1.08, -0.41]],
                        svgStyle: {
                            fill: 'rgba(0, 255, 0, 0.2)',
                            strokeWidth: '10px'
                        },
                        tooltip: {
                            content: this.preAlertText,
                            position: 'right bottom'
                        },
                    },
                    {
                        id: '6',
                        polylineRad: [[1.24, -0.13], [1.36, -0.23], [1.36, -0.4], [1.23, -0.58], [1.11, -0.38]],
                        svgStyle: {
                            fill: 'rgba(255, 0, 0, 0.2)',
                            strokeWidth: '10px'
                        },
                        tooltip: {
                            content: this.alertText,
                            position: 'right bottom'
                        },
                    },
                    {
                        id        : 'image',
                        imageLayer: 'https://cdn.iconscout.com/icon/free/png-256/sea-waves-2714064-2261636.png',
                        width     : 240,
                        height    : 150,
                        longitude : this.highPoint.lon,
                        latitude  : this.highPoint.lat,
                        tooltip   : 'Image embedded in the scene',
                        orientation: 90
                    },
                ]
            }]
        ]
    });

    const markersPlugin = viewer.getPlugin(MarkersPlugin);
    markersPlugin.on('select-marker', (e, marker) => {
        switch(marker.id){
            case "1":
                console.log("cliccata prima zona rossa");
                break;
        }
    });
    
    
    viewer.on('click', (e, position) => {
        console.log("Longitude: " + position.longitude + ", Latitude: " + position.latitude);
    });
    
   
    setInterval(() => {
        var [a, b] = this.midPoint(Math.random()*100);
        markersPlugin.updateMarker({
            id: "image",
            latitude: a,
            longitude: b
        });
        //console.log(this.midPoint());
        /*
        axios({
            method: 'GET',
            url: url,
        }).then(response => {
            data = data.slice(1, 10)
            data.push(response.data.sort(() => Math.random() - 0.5)[0].y/3);
            cat.push(cat.shift());
            chart.updateSeries([{
                name: 'Water level',
                data: data,
            }, 
            {
                name: 'Alarm',
                data: line,
            }]);
            chart.updateOptions({
                xaxis: {
                    categories: cat
                },
            });
        })
        */
    }, 1000);

  },
  methods: {
      midPoint(per){
          per = per/100;
          return [this.lowPoint.lat + (this.highPoint.lat - this.lowPoint.lat) * per, this.lowPoint.lon + (this.highPoint.lon - this.lowPoint.lon) * per];
      }
  }
    
}
</script>

<style scoped>
    @import "photo-sphere-viewer/dist/plugins/markers.css";
    /*@import "../css/panoramic.css";*/

    #viewer {
        width: 100%;
        height: 100%;
    }

    .panoramic {
        height: 75vh;
    }

    .panoramic div {
        width: 100%;
        height: 100%;
    }
</style>

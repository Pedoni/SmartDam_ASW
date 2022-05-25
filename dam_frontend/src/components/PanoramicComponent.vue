<template>
  <div class="panoramic">
    <div>
        <div id="viewer"></div>
    </div>
  </div>
</template>

<script>
import { Viewer } from 'photo-sphere-viewer';
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

export default {
  name: 'PanoramicComponent',
  data() {
        return {
            photoTip: "Cliked"
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
                    {//1 picture
                        id: '1',
                        polylineRad: [[4.019, 0.225], [4.288, 0.225], [4.288, -0.150], [4.019, -0.150]],
                        svgStyle: {
                            fill: 'rgba(255, 0, 0, 1)',
                            strokeWidth: '0px'
                        },
                        tooltip: {
                            content: this.photoTip,
                            position: 'right bottom'
                        },
                    },
                ]
            }]
        ]
    });

    const markersPlugin = viewer.getPlugin(MarkersPlugin);
    markersPlugin.on('select-marker', (e, marker) => {
        console.log(e + marker);
    });

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
        height: 80vh;
    }

    .panoramic div {
        width: 100%;
        height: 100%;
    }
</style>

<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>

export default {
  name: 'GoogleMap',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
      map: null,
      bounds: null,
      markers: [],
      voceMarker: {
            url: 'https://i.imgur.com/WwOjzsK.png',
            scaledSize: new google.maps.Size(32, 32)
      },
      gymMarker:{
          url: 'https://i.imgur.com/cmxXzw3.png',
          scaledSize: new google.maps.Size(32, 32),
      },
      rehabMarker:{
          url: 'https://i.imgur.com/BOsIrfF.png',
          scaledSize: new google.maps.Size(32, 32),
      },
      healthMarker:{
          url: 'https://i.imgur.com/MEZbIx0.png',
          scaledSize: new google.maps.Size(32, 32),
      }
    }
  },
    mounted: function () {
    this.directionsService = new google.maps.DirectionsService()       
    this.directionsDisplay = new google.maps.DirectionsRenderer()
    this.distanceService = new google.maps.DistanceMatrixService()
    this.bounds = new google.maps.LatLngBounds();
    var vue = this;
    this.geolocate().then( (position) => {
        const element = document.getElementById(this.mapName)
        this.options = {
            zoom: 15,
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        }
        this.map = new google.maps.Map(element, this.options);
        var marker = new google.maps.Marker({
            position: this.options.center,
            map: this.map,
            icon: vue.voceMarker
        });
        var infowindow = new google.maps.InfoWindow({
                        content: '<h1>Você</h1>'
                    });
        marker.addListener('click', function(){
            infowindow.open(this.map, marker)
        })
        this.markers.push(marker)
        this.getCentros();
    });
  },
  methods: {
        geolocate: function(options) {
            return new Promise( function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(resolve, reject, options)
                })
            },
        getCentros(){
            var vue = this;
            this.$http.get('http://192.168.15.12:3050/getAllpoints').then(function (response) {
                response.data.forEach((ponto) => {
                    var position = new google.maps.LatLng(ponto.coordenadas.coordinates[0], ponto.coordenadas.coordinates[1]);
                    var icon = (ponto.tipo == 'Reuniao')? vue.rehabMarker: (ponto.tipo == 'Academia')? vue.gymMarker: vue.healthMarker;
                    var marker = new google.maps.Marker({
                        position,
                        map: vue.map,
                        title: ponto.nome,
                        icon: icon
                    });
                    marker.addListener('click', function() {
                        vue.getRoute(this, ponto);
                    });
                    console.log(ponto);
                    vue.markers.push(marker)
                });
            })
        },getRoute(marker, ponto) {
            var vue = this;
            this.directionsDisplay.setMap(null);
            this.directionsDisplay.setMap(this.map)
            this.directionsDisplay.setOptions({suppressMarkers: true});
            this.directionsService.route({
                origin: vue.options.center,
                destination: marker.getPosition(),
                travelMode: 'WALKING'
            }, (response, status) => {
                var resposta = response;
                var stts = status;
                if (status === 'OK') {
                    vue.distanceService.getDistanceMatrix({
                        origins: [vue.options.center],
                        destinations: [marker.getPosition()],
                        travelMode: google.maps.TravelMode.WALKING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                    }, (response, status) => {
                        if(vue.infoWindow != undefined){
                            vue.infoWindow.close();
                        }
                        console.log(response.rows[0].elements[0].distance.text);
                        console.log(response.rows[0].elements[0].duration.text);
                        var conteudoHtml = 
                        "<h3>"+ponto.nome
                        +"</h3><h4>Endereco: "+ponto.endereco 
                        +"</h4><h4>Telefone: "+ponto.telefone
                        +"</h4><h4>Distancia: "+response.rows[0].elements[0].distance.text
                        +"</h4><h4>Tempo até o destino: "+response.rows[0].elements[0].duration.text+"</h4>"   
                        vue.directionsDisplay.setDirections(resposta)
                        var infowindow = new google.maps.InfoWindow({
                            content: conteudoHtml
                        });
                        vue.infoWindow = infowindow;
                        infowindow.open(vue.map, marker);  
                        })
                } else {
                    console.log('Falha devido a: ' + status)
                }
            })
        }
    }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 86vh;
  margin: 0 auto;
  background: gray;
}
</style>
<template>
    <div class="Tela">
        <Map :name="'Example'"/>
    </div>
</template>
<script>
import GoogleMap from './GoogleMap'

export default {
    name: 'Mapa',
    components: {
        Map: GoogleMap
    }
}
</script>

<style lang="scss" scoped>
    div{
        background: green;
        width: 100%;
        height: 100%;
    }
</style>

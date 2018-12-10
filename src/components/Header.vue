<template>
    <div>
        <div v-bind:class="{'Mobile V': Width < 505, 'Mobile H': Height < 480, 'Desktop': Height >= 505 && Width >= 505}">            
        <section class="texto">
            {{Tela}}
        </section>
        </div>
    </div>    
</template>
<script>
export default {
    name: 'Header',
    props: ['Height', 'Width', 'Tela']
}
</script>
<style lang="scss" scoped>
    .Mobile{
        background-image: url('../assets/HeaderBg.png');
        background-size: 100% 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        height: 7vh;
        width: 100%;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        .texto{
            position: absolute;
            left: 0.2vh;
            width: 60vw;
            color: #005876;
            bottom: -0.6vh;
            font-size: 6.4vw;
            text-align: left;
            padding-left: 4px;
        }
        z-index: 999;
    }
    .Desktop{
        background: black;
    }
</style>

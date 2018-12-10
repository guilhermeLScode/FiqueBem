<template>
    <div>
        <div v-bind:class="{'SideBar': Width > 600, 'Footer': Width < 600}">
            <img class='border left' v-if='Width < 600' src="../assets/footerBorda.png">
            <img class='border right' v-if='Width < 600' src="../assets/footerBorda.png">
            <img class='Link' @click="$router.push({name: 'Mapa'})" src="../assets/Ping.png">
            <img class='Link divisor' src="../assets/divisor.png">
            <img class='Link' @click="$router.push({name: 'Revista'})" src="../assets/Livro.png">
            <img class='Link divisor' src="../assets/divisor.png">
            <img class='Link' @click="$router.push({name: 'Habitos'})" src="../assets/Hábitos.png">
        </div>
    </div>    
</template>
<script>
export default {
    name: 'Footer',
    props: ['Height', 'Width', 'Tela']
}
</script>
<style lang="scss" scoped>
    .SideBar{
        position: fixed;
        left: 0;
        width: 7vw;
        height: 100%;
        top: 7vh;
    }
    .Footer{
        background: #F2F2F2;
        position: fixed;
        height: 7vh;
        width: 100%;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        bottom: 0;
        box-shadow: 0 -3px 6px rgba(0,0,0,0.16), 0 -3px 6px rgba(0,0,0,0.23);
        .Link{
            height: 6vh;
        }
        .divisor{
            width: 1px;
        }
        .border{
            height: 7vh;
        }
        .right{
            position: absolute;
            right: 0;
            top: 0;
            transform: scaleX(-1)
        }
        .left{
            position: absolute;
            left: 0;
            top: 0;
        }
    }
</style>

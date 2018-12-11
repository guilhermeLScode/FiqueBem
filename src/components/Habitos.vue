<template>
    <div class="Tela">
        <div class="Habito" v-for="habito in listaHabitos" v-bind:key="habito._id" @click="seleciona(habito._id)" v-bind:class="{sel : selecionado == habito._id}">
            <img src='../assets/habitoBorder.png' class="borda"/>
            <div class="title">{{habito.nome}}</div>
            <div class="texto">{{habito.desc}}</div>
            <div class="sombra"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Habitos',
    data() {
        return {
            listaHabitos: [],
            selecionado: ''
        }
    },
    mounted() {
        this.$http.get('http://192.168.15.12:3060/getHabitos').then((res) => {
            console.log(res);
            this.listaHabitos = res.data;
        })
    },
    methods: {
        seleciona(id){
            if(this.selecionado != id){
                this.selecionado = id;
            }else{
                this.selecionado = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .Habito{
        position: relative;
        &.sel{
            .sombra{
               display: none;
            } 
            .texto{
                height: 100%;
                margin-bottom: 3vw;
            }
            display: table;
        }
        background: #F2F2F2;
        &:nth-child(2n){
            .borda{
                transform: scaleX(1);
                left: 80vw;
            }
            .texto{
                margin: 0 11vw 0 6vw;
            }
            .sombra{
                left: 5vw;
            }
            margin-left: 15vw;
            
        }
        .title{
            font-size: 5vw;
            color: #005876;
        }
        .texto{
            text-indent: 4vw;
            text-align: justify;
            margin: 0 6vw 0 11vw;
            font-size: 3.5vw;
            height: 7vh;
            overflow: hidden;
        }
        .sombra{
            position: relative;
            bottom: -2px;
            left: 10vw;
            width: 70vw;
            height: 1px;
            box-shadow: 0 -10px 20px 5px #ffffff;
        }
        .borda{
            transform: scaleX(-1);
            height: 100%;
            width: 5vw;
            position: absolute;
            top: 0;
            left: 0;
        }
        width: 85vw;
        margin-top: 3vh;
        margin-bottom: 2vh;
        height: 12vh;
    }
    .Tela{
        display: flex;
        flex-direction: column;
        background-image: url('../assets/bgHabitos.png');
        background-size: 100vw 67.7vh;
        height: 150vh;
        overflow-y: scroll;
    }
</style>

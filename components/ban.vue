
<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
    <div class="slider">
        <img src="../assets/logo.png" alt="image" />
    </div>
</template>
<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'ban',
    mounted() {
                        var maining=document.querySelector("img");
        var image = ["../assets/cloud.jpg","../assets/CD1.jpg","../assets/1.jpg","../assets/font.jpg"];
        var num= 0;

         
            num++;
            if(num>=image.length){
                num=0;
                maining.src=image[num]
            }else{
                maining.src=image[num]
            }
        
        window.setInterval("",2000)
    },
}
</script>
<style>
.slider{
    width: 800px;
    height: 500px;
    position: relative;
}
.slider img{
    width: 100%;
    height: 100%;
    border-radius: 7px;
}
</style>
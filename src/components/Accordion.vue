<template>
    <div class="accordion-box">
        <a href="javascript:;" class="accordion-box__title" @click.prevent="active = !active">
            {{title}}
            <span :class="active ? 'accordion-down':'accordion-up'">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
            </span>
        </a>
        <div class="accordion-box__content" v-show="active">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default{
        props:[
            'title'
        ],
        data(){
            return{
                active:true  
            }
        }
    }
</script>
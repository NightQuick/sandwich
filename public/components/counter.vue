<script setup lang="ts">
import { ref, watch} from 'vue';
const props=defineProps<{startsFrom:number, class?:string}>(
)
let counterValue=ref(props.startsFrom)
function valueExtend(){
  counterValue.value+=1
}
function valueDecend(){
  if(counterValue.value>1){
    counterValue.value-=1
  }
}
function inputHandler(event:InputEvent){
  const input=event.target as HTMLInputElement
  counterValue.value = Math.abs(+counterValue.value)
}

const emit =defineEmits(['value-update'])
watch(counterValue,()=>{
  emit('value-update',counterValue.value)
})
</script>

<template>
  <button class="counter-buttons"><span class="counter-buttons-text" @click="valueDecend">-</span></button>  
  <input name="counter" class="product-counter-input" type="number" inputmode="numeric" v-model="counterValue" @input="inputHandler($event)"></input>
  <button class="counter-buttons"><span class="counter-buttons-text" @click="valueExtend">+</span></button>  
</template>

<style>
.product-counter {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
}

.counter-buttons {
  text-align: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 0px;
  margin: 10px;
  background: none;
  outline: none;
  color: black;

  font-weight: bold;
  box-shadow: 0px 0px 3px black;
}

.counter-buttons-text {
  margin: 0;
  font-size: 25px;
  position: relative;
  background-color: #565656;
  color: transparent;
  text-shadow: 0px 2px 3px rgba(255, 255, 255, 1);
  background-clip: text;
}

.product-counter-input {
  text-align: center;
  width: 45px;
  height: 30px;
  margin: 10px;
  margin-left: 15px;
  margin-right: 15px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
}

input[type='number'] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input:focus {
  outline: none;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  display: none;
}
</style>
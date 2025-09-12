<template>
<draggable 
  v-model="myArray" 
  group="people" 
  @start="drag=true" 
  @end="drag=false" 
  item-key="id">
  <template #item="{element}">
    <div class="border-2">{{element.name}}</div>
   </template>
</draggable>

<!-- <draggable v-model="myArray" tag="transition-group" item-key="id"
  group="people" 
  @start="drag=true" 
  @end="drag=false" 
>
  <template #item="{element}">
      <div class="border-2"> {{element.name}} </div>
  </template>
</draggable> -->
</template>

<script>
 import draggable from 'vuedraggable'
  export default {
        components: {
            draggable,
        },
        data() {
          return {
            drag: false,
            myArray: [
              { id: 1, name: 'John Doe' },
              { id: 2, name: 'Jane Doe' },
              { id: 3, name: 'Jake Doe' },
              { id: 4, name: 'Jim Doe' },
              { id: 5, name: 'Jen Doe' },
            ],
          }
        }
    }
</script>
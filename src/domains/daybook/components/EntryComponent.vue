<template>
  <div class="entry-container mb-3 p-2 pointer"
    @click="$router.push({ name: 'Daybook-Entry', params: { id: entry.id } })">
    
    <!-- Tittle -->
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ getDay }}</span>
      <span class="mx-1 fs-5">{{ getMonth }}</span>
      <span class="mx-2 fw-light">{{ getYearDay }}</span>
    </div>

    <!-- Entry Description -->
    <div class="entry-description">
      {{ getEntryText }}
    </div>
  </div>
</template>

<script>
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

export default {
  name: 'entry-component',
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    getEntryText() {
      return (this.entry.text.length > 130) 
        ? this.entry.text.substring(0, 130) + '...'
        : this.entry.text
    },
    getDay() {
      const date = new Date( this.entry.date )
      return date.getDate()
    },
    getMonth() {
      const date = new Date( this.entry.date )
      return months[ date.getMonth() ]
    },
    getYearDay() {
      const date = new Date( this.entry.date )
      return `${date.getFullYear()}, ${days[ date.getDay() ]} `
    }
  }
};
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description {
        font-size: 0.9rem;
    }
}
</style>
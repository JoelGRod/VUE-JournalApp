<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ getDay }}</span>
        <span class="mx-1 fs-3">{{ getMonth }}</span>
        <span class="mx-2 fs-4 fw-light">{{ getYearDay }}</span>
      </div>

      <div>
        <button class="btn btn-danger mx-2"
          @click="removeEntry()">
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary">
          Upload Image
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        class="entry-textarea"
        placeholder="What's happen?"
        v-model="entry.text"
      ></textarea>
    </div>

    <img
      src="https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?cs=srgb&dl=pexels-riccardo-bertolo-4245826.jpg&fm=jpg"
      alt="entry-photo"
      class="img-thumbnail entry-img"
    />
  </template>

  <FabComponent icon="fa-save" @on:click="saveEntry()"></FabComponent>
  
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";

export default {
  name: "entry-page",
  props: {
    entryId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
    };
  },
  methods: {
    ...mapActions('daybook', 
      ['updateEntry', 'createEntry', 'deleteEntry']
    ),
    loadEntry() {
      let entry = {}

      if( this.entryId === 'new' ) {
        entry = {
          date: new Date().getTime(),
          text: ''
        }
      } else {
        entry = this.getEntryById(this.entryId);
        if (entry === undefined)
          return this.$router.push({ name: "Daybook-No-Entry" });
      }

      this.entry = entry;
    },
    async saveEntry() {
      if( this.entry.id ) {
        await this.updateEntry(this.entry)
        // Confirmation alert
      } else {
        const id = await this.createEntry(this.entry)
        this.$router.push({ name: 'Daybook-Entry', params: { id } })
      }
    },
    async removeEntry() {
      if(this.entryId === 'new') return;
      await this.deleteEntry(this.entryId)
      // Navigate to no entry selected
    }
  },
  computed: {
    ...mapGetters("daybook", ["getEntryById"]),
    getDay() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    getMonth() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    getYearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  watch: {
    entryId() {
      this.loadEntry();
    },
  },
  components: {
    FabComponent: defineAsyncComponent(() =>
      import("../components/FabComponent")
    ),
  },
  created() {
    this.loadEntry();
  },
};
</script>

<style lang="scss" scoped>
.entry-textarea {
  font-size: 1.2rem;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

.entry-img {
  position: fixed;
  bottom: 9rem;
  right: 1rem;
  width: 12rem;
  box-shadow: 0px 5px 10px rgba($color: #333333, $alpha: 0.2);
}
</style>
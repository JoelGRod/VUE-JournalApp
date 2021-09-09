<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ getDay }}</span>
        <span class="mx-1 fs-3">{{ getMonth }}</span>
        <span class="mx-2 fs-4 fw-light">{{ getYearDay }}</span>
      </div>

      <div>
        <input type="file" 
          @change="selectedImage($event)" 
          multiple
          ref="selectImgButton"
          v-show="false"
          accept="image/png, image/jpeg">
        <button class="btn btn-danger mx-2"
          v-if="entry.id"
          @click="removeEntry()">
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary"
          @click="selectImage()">
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
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-photo"
      class="img-thumbnail entry-img"
    />
    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-photo"
      class="img-thumbnail entry-img"
    />
  </template>

  <FabComponent icon="fa-save" @on:click="saveEntry()"></FabComponent>
  
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core"
import { mapGetters, mapActions } from "vuex"
import * as swal from '@/infrastructure/shared/services/alertService'

import getDayMonthYear from "../helpers/getDayMonthYear"
import uploadImage from "@/infrastructure/shared/services/uploadImage"

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
      localImage: null,
      file: null
    };
  },
  methods: {
    ...mapActions('daybook', 
      ['updateEntry', 'createEntry', 'deleteEntry']
    ),
    loadEntry() {
      let entry = {}
      this.removeTempImg()

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
      swal.showLoader()

      if( this.localImage ){
        this.entry.picture = await uploadImage( this.file )
      }

      if( this.entry.id ) {
        await this.updateEntry(this.entry)
      } else {
        const id = await this.createEntry(this.entry)
        this.$router.push({ name: 'Daybook-Entry', params: { id } })
      }

      this.removeTempImg()
      swal.showSuccess('Saved', 'The entry has been saved')
    },
    async removeEntry() {
      const result = await swal.showDesicion(
        'Are you Sure?', 
        'Once deleted it cannot be recovered'
      )

      if(result) {
        swal.showLoader()
        await this.deleteEntry(this.entryId)
        this.$router.push({ name: 'Daybook-No-Entry' })
        swal.showSuccess('Deleted', 'The entry has been deleted')
      }
    },
    selectedImage(event) {
      const file = event.target.files[0]
      if( !file ) {
        this.removeTempImg()
        return
      }

      this.file = file

      const fr = new FileReader()                   // new fr
      fr.onload = () => this.localImage = fr.result // fr config
      fr.readAsDataURL( file )                      // load file in fr
    },
    selectImage() {
      this.$refs.selectImgButton.click()
    },
    removeTempImg() {
      this.localImage = null
      this.file = null
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
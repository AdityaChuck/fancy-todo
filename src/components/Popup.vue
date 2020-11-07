<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed v-bind="attrs" v-on="on"> Add a Project </v-btn>
    </template>

    <v-card>
      <v-card-title> Add a Project </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="formRef">
          <v-text-field
            label="Title"
            prepend-icon="mdi-folder"
            v-model="title"
            :rules="inputRules"
          ></v-text-field>
          <v-textarea
            class="mx-0"
            label="Information"
            v-model="content"
            prepend-icon="mdi-pencil"
            :rules="inputRules"
          ></v-textarea>

          <v-menu
          v-model="menu"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="formattedDate"
              prepend-icon="mdi-calendar"
              clearable
              label="Due date"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="due = null"
              :rules="inputRules"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="due"
            @change="menu = false"
          ></v-date-picker>
        </v-menu>

          <v-btn
            class="mx-0 mt-3"
            type="submit"
            outlined
            color="primary"
            @click.prevent="submit"
            :loading="isLoading"
            >Add Project</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import moment from "moment"
import db from "@/fb"

export default {
  name: "Popup" as string,
  data: () => ({
    dialog: false as boolean,
    title: "" as string,
    content: "" as string,
    due: null,
    menu: false as boolean,
    inputRules: [
      v => v.length >= 3 || "Minimum length is 3 character"
    ],
    isLoading: false as boolean
  }),
  computed:{
    formattedDate(): string {
      return this.due? moment(this.due).format("do MMM YYYY"):""
    }
  },
  methods:{
    async submit(){
      
      if((this.$refs.formRef as Vue & { validate: () => boolean }).validate()){

        this.isLoading = true

        const project= {
          title: this.title,
          content: this.content,
          due: moment(this.due).format("do MM YYYY"),
          person: 'The Chuck Spadina',
          status: 'ongoing'
        }

        const res = await db.collection('projects').add(project)
        if(res){
          console.log("added to db");
          this.title=""
          this.content=""
          this.due=""
          this.isLoading = false
          this.dialog=false
          this.$emit("toggleSnackbar")
        }
      }
    }
  }

};
</script>
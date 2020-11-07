<template>
  <div class="home">
    <h1>Homepage</h1>

    <v-container class="my-5">
      <v-layout row class="mb-5">
        <v-flex xs4 md1>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-on="on"
                v-bind="attrs"
                small
                block
                depressed
                @click="sortBy('title')"
              >
                <v-icon small left>mdi-folder</v-icon>
                <span class="caption text-lowercase">By Project name</span>
              </v-btn>
            </template>
            <span>Sort Project by project name</span>
          
          </v-tooltip>
        </v-flex>
        <v-flex xs1 />
        <v-flex xs4 md1>
           <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on"
                v-bind="attrs" small block depressed @click="sortBy('person')">
            <v-icon small left>mdi-account</v-icon>
            <span class="caption text-lowercase">By Person</span>
          </v-btn>
            </template>
            <span>Sort Project by Person</span>
           </v-tooltip>
        </v-flex>
      </v-layout>
      <v-card flat v-for="project in projectsWithColors" :key="project.title">
        <v-layout row wrap :class="`pa-5 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="float-right">
              <v-chip small :color="project.chipColor">{{
                project.status
              }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider />
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import db from "@/fb"

import { Data, DataChip } from "../types";

export default Vue.extend({
  name: "Home",
  components: {},
  data: () => ({
    projects: [] as firebase.firestore.DocumentData
  }),
  computed: {
    projectsWithColors(): DataChip[] {
      const modifiedColor = this.projects.map((project) => ({
        ...project,
        chipColor:
          project.status === "ongoing"
            ? "#ffaa2c"
            : project.status === "complete"
            ? "#3cd1c2"
            : "#f83e70",
      }));
      return modifiedColor;
    },
  },
  
  methods: {
    sortBy(text: string): void {
      this.projects.sort((a: Data, b: Data) =>
        a[text as keyof Data] < b[text as keyof Data] ? -1 : 1
      );
    },
  },
 created(){
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges()
      changes.forEach(change => {
        if(change.type === 'added'){
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
});
</script>


<style scoped>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
</style>

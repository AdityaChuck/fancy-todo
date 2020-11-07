<template>
  <div>
    <h1 class="subheading grey--text">My Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header>
            {{ project.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="caption">
              Due by: {{ project.due }}
            </div>
            <br/>
            <div>
              {{ project.content }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>
<script lang="ts">
import { Data } from "@/types";

import db from "@/fb"

export default {
  name: "Projects",
  data: () => ({
    projects: [] as firebase.firestore.DocumentData
  }),
  computed:{
    myProjects(): Data[]{
      return this.projects.filter((project: Data): boolean => project.person === "The Chuck Spadina")
    } 
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
};
</script>

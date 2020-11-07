<template>
  <div id="team">
    <h1 class="subheading grey--text">Team page</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-center ma-3 pa-3">
            <v-responsive class="pt-4"> 
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar" :alt="person.name"/>  
              </v-avatar>  
            </v-responsive>
            <v-card-text>
              <div class="subheading">
                {{ person.name }}
              </div>
              <div class="grey--text">
                {{ person.role }}
              </div>
            </v-card-text>
            <v-card-action>
              <v-btn depressed dark>
                <v-icon small left>
                  mdi-message
                </v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-action>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Team } from "../types";

export default {
  name: "Team" as string,
  data: () => ({
    team: [
      { name: "The Chuck Spadina", role: "Web developer",avatar: '/avatar-2.png' },
      { name: "Ryu", role: "Graphic designer",avatar: '/avatar-1.png' },
      { name: "Chun Li", role: "Web developer",avatar: '/avatar-3.png' },
      { name: "Gouken", role: "Social media maverick",avatar: '/avatar-4.png' },
      { name: "Yoshi", role: "Sales guru",avatar: '/avatar-5.png' },
    ] as Team[],
  }),
};
</script>

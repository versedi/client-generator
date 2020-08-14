<template>
  <div>
    <h1>New {{{title}}}</h1>

    <div
      v-if="isLoading"
      class="alert alert-info"
      role="status">Loading...</div>
    <div
      v-if="error"
      class="alert alert-danger"
      role="alert">
      <span
        class="fa fa-exclamation-triangle"
        aria-hidden="true">\{{ error }}</span>
    </div>

    <{{{titleUcFirst}}}Form
      :handle-submit="onSendForm"
      :values="item"
      :errors="violations" />

    <router-link
      :to="{ name: '{{{titleUcFirst}}}List' }"
      class="btn btn-default">Back to list</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
import { createHelpers } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import {{{titleUcFirst}}}Form from './Form';
import {{{title}}} from './/interfaces/{{{title}}}';

@Component({
name: {{{titleUcFirst}}}Create,
})
export default class {{{titleUcFirst}}}Create extends Vue {
  created: Boolean = false;
  item: {{{title}}} = null;

  components: {
    {{{titleUcFirst}}}Form,
  },


  @Action('create{{{title}}}')
  public new{{{titleUcFirst}}}!: void;

  @Watch('created')
  created: function(created) {
    if (!created) {
        return;
    }

    this.$router.push({ name: '{{{titleUcFirst}}}Update', params: { id: created['@id'] } });
  }



  create{{{titleUcFirst}}} (): void {

  },

};
</script>

import chalk from "chalk";
import BaseGenerator from "./BaseGenerator";

export default class extends BaseGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates(`vue-typescript/`, [
      // modules
      "store/modules/foo/index.ts",
      "store/modules/foo/create/actions.ts",
      "store/modules/foo/create/index.ts",
      "store/modules/foo/create/mutation_types.ts",
      "store/modules/foo/create/mutations.ts",
      "store/modules/foo/delete/actions.ts",
      "store/modules/foo/delete/index.ts",
      "store/modules/foo/delete/mutation_types.ts",
      "store/modules/foo/delete/mutations.ts",
      "store/modules/foo/list/actions.ts",
      "store/modules/foo/list/index.ts",
      "store/modules/foo/list/mutation_types.ts",
      "store/modules/foo/list/mutations.ts",
      "store/modules/foo/show/actions.ts",
      "store/modules/foo/show/index.ts",
      "store/modules/foo/show/mutation_types.ts",
      "store/modules/foo/show/mutations.ts",
      "store/modules/foo/update/actions.ts",
      "store/modules/foo/update/index.ts",
      "store/modules/foo/update/mutation_types.ts",
      "store/modules/foo/update/mutations.ts",

      // components
      "components/foo/Create.vue",
      "components/foo/Form.vue",
      "components/foo/List.vue",
      "components/foo/Update.vue",
      "components/foo/Show.vue",

      // routes
      "router/foo.ts",

      // error
      "error/SubmissionError.ts",

      // utils
      "utils/fetch.ts"
    ]);
  }

  help(resource) {
    const titleLc = resource.title.toLowerCase();

    console.log(
      'Code for the "%s" resource type has been generated!',
      resource.title
    );
    console.log(
      "Paste the following definitions in your application configuration:"
    );
    console.log(
      chalk.green(`
//import routes
import ${titleLc}Routes from './router/${titleLc}';

// Add routes to VueRouter
const router = new VueRouter({
  // ...
  routes: [
      ...${titleLc}Routes,
  ]
});

// Add the modules in the store
import ${titleLc} from './store/modules/${titleLc}/';

export const store = new Vuex.Store({
  // ...
  modules: {
    ${titleLc}
  }
});
`)
    );
  }

  generate(api, resource, dir) {
    const lc = resource.title.toLowerCase();
    const titleUcFirst =
      resource.title.charAt(0).toUpperCase() + resource.title.slice(1);

    const context = {
      title: resource.title,
      name: resource.name,
      lc,
      uc: resource.title.toUpperCase(),
      fields: resource.readableFields,
      formFields: this.buildFields(resource.writableFields),
      hydraPrefix: this.hydraPrefix,
      titleUcFirst
    };

    // Create directories
    // These directories may already exist
    for (let dir of [
      `${dir}/config`,
      `${dir}/error`,
      `${dir}/router`,
      `${dir}/utils`
    ]) {
      this.createDir(dir, false);
    }

    for (let dir of [
      `${dir}/store/modules/${lc}`,
      `${dir}/store/modules/${lc}/create`,
      `${dir}/store/modules/${lc}/delete`,
      `${dir}/store/modules/${lc}/list`,
      `${dir}/store/modules/${lc}/show`,
      `${dir}/store/modules/${lc}/update`,
      `${dir}/components/${lc}`
    ]) {
      this.createDir(dir);
    }

    for (let pattern of [
      // modules
      "store/modules/%s/index.ts",
      "store/modules/%s/create/actions.ts",
      "store/modules/%s/create/index.ts",
      "store/modules/%s/create/mutation_types.ts",
      "store/modules/%s/create/mutations.ts",
      "store/modules/%s/delete/actions.ts",
      "store/modules/%s/delete/index.ts",
      "store/modules/%s/delete/mutation_types.ts",
      "store/modules/%s/delete/mutations.ts",
      "store/modules/%s/list/actions.ts",
      "store/modules/%s/list/index.ts",
      "store/modules/%s/list/mutation_types.ts",
      "store/modules/%s/list/mutations.ts",
      "store/modules/%s/show/actions.ts",
      "store/modules/%s/show/index.ts",
      "store/modules/%s/show/mutation_types.ts",
      "store/modules/%s/show/mutations.ts",
      "store/modules/%s/update/actions.ts",
      "store/modules/%s/update/index.ts",
      "store/modules/%s/update/mutation_types.ts",
      "store/modules/%s/update/mutations.ts",

      // components
      "components/%s/Create.vue",
      "components/%s/Form.vue",
      "components/%s/List.vue",
      "components/%s/Update.vue",
      "components/%s/Show.vue",

      // routes
      "router/%s.ts"
    ]) {
      this.createFileFromPattern(pattern, dir, lc, context);
    }

    // error
    this.createFile(
      "error/SubmissionError.ts",
      `${dir}/error/SubmissionError.ts`,
      context,
      false
    );

    this.createEntrypoint(api.entrypoint, `${dir}/config/entrypoint.ts`);
    this.createFile(
      "utils/fetch.ts",
      `${dir}/utils/fetch.ts`,
      { hydraPrefix: this.hydraPrefix },
      false
    );
  }
}

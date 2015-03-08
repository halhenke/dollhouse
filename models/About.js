var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var About = new keystone.List('About', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

About.add({
  title: { type: String, required: true },
  // state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  // publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  publishedDate: { type: Types.Date },
  image: { type: Types.CloudinaryImage },
  content: {
    type: Types.Html, wysiwyg: true, height: 400
    // brief: { type: Types.Html, wysiwyg: true, height: 150 },
    // extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  // categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

// About.schema.virtual('content.full').get(function() {
// 	return this.content.extended || this.content.brief;
// });

About.defaultColumns = 'title, author|20%, publishedDate|20%';
// About.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
About.register();

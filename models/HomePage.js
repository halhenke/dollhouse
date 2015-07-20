var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */

var HomePage = new keystone.List('HomePage', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

HomePage.add({
  title: { type: String, required: true },
  // author: { type: Types.Relationship, ref: 'User', index: true },
  // publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  image: { type: Types.CloudinaryImage, select: true},
  // images: { type: Types.CloudinaryImages, folder: 'events'},
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  // categories: { type: Types.Relationship, ref: 'EventType', many: true }
});

// HomePage.schema.virtual('content.full').get(function() {
//   return this.content.extended || this.content.brief;
// });

// TODO: Something here to deal with whether startDate & endDate are the same?
// - problem is that momentjs stuff has to take place further down the line

// HomePage.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
HomePage.register();

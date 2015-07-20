var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */

var Event = new keystone.List('Event', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Event.add({
  title: { type: String, required: true },
  startDate: { type: Types.Date, required: true, initial: true },
  endDate: { type: Types.Date, required: true, initial: true },
  startTime: { type: Types.Datetime, required: true, initial: true },
  endTime: { type: Types.Datetime, required: true, initial: true },
  placeString: { type: String, required: true, initial: true },
  place: { type: Types.Location, required: true, initial: true },
  // state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  image: { type: Types.CloudinaryImage, folder: 'events'},
  images: { type: Types.CloudinaryImages, folder: 'events'},
  gallery: { type: Types.Relationship, ref: 'Gallery', index: true },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  // categories: { type: Types.Relationship, ref: 'EventType', many: true }
});

Event.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

// TODO: Something here to deal with whether startDate & endDate are the same?
// - problem is that momentjs stuff has to take place further down the line

Event.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Event.register();

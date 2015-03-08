var keystone = require('keystone'),
  config = require('../config'),
  Types = keystone.Field.Types;

/**
 * Doll Model
 * ==========
 */

var Doll = new keystone.List('Doll', {
  autokey: { path: 'slug', from: 'name owner', unique: true }
});

Doll.add({
  name: { type: String, required: true },
  owner: { type: Types.Relationship, ref: 'User', index: true },
  maker: { type: Types.Select, options: config.dolls.makers.join(', '), index: true },
  state: { type: Types.Select, options: 'private, public', default: 'public', index: true },
  // publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  image: { type: Types.CloudinaryImage },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },
});

Doll.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Doll.defaultColumns = 'name, owner|20%, maker|20%';
Doll.register();

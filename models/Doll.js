var keystone = require('keystone'),
  config = require('../config'),
  Types = keystone.Field.Types;

/**
 * Doll Model
 * ==========
 */

var Doll = new keystone.List('Doll', {
  track: true,
  autokey: { path: 'slug', from: 'name owner', unique: true }
});

Doll.add({
  name: { type: String, required: true },
  owner: { type: Types.Relationship, ref: 'User', index: true },
  maker: { type: Types.Select, options: config.dolls.makers.join(', '), index: true },
  sculpt: { type: Types.Text, index: true },
  image: { type: Types.CloudinaryImage, folder: 'dolls' },
  info: {
    description: { type: Types.Html, wysiwyg: true, height: 150 },
    biography: { type: Types.Html, wysiwyg: true, height: 400 }
  },
  gallery: { type: Types.CloudinaryImages }
});

Doll.defaultColumns = 'name, owner|20%, maker|20%';
Doll.register();

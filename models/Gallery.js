var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
  autokey: { from: 'name', path: 'key', unique: true }
});

Gallery.add({
  name: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  heroImage: { type: Types.CloudinaryImage, folder: 'galleries' },
  images: { type: Types.CloudinaryImages, folder: 'galleries' }
});

Gallery.register();

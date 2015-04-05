var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Profile Model
 * ==========
 */

var Profile = new keystone.List('Profile');

Profile.add({
  owner: { type: Types.Relationship, ref: 'User', index: true },
  // dolls: { type: Types.Relationship, ref: 'User', index: true },
  state: { type: Types.Select, options: 'private, public', default: 'public', required: true },
  userName: { type: Types.Name, required: true, initial: true, index: true },
  emailShow: { type: Boolean, label: 'Show email address?' },
  location_show: { type: Types.Boolean,  label: 'Show location?' },
  avatar: { type: Types.CloudinaryImage },
  about: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  }
});

/**
 * Relationships
 */

// Profile.relationship({ ref: 'User', path: 'users', refPath: 'author' });


/**
 * Registration
 */

Profile.defaultColumns = 'userName, avatar, about.brief';
Profile.register();
